import { GoogleGenAI, Type } from "@google/genai";
import { OnboardingUnit } from "../types";

let externalApiKey: string | null = null;

export const initializeGemini = (key: string) => {
  externalApiKey = key;
};

const getClient = () => {
  const apiKey = externalApiKey || process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key not found. Gemini features will be disabled.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const draftMissingItemEmail = async (
  unit: OnboardingUnit,
  taskId: string,
  taskLabel: string,
  assignee?: string
): Promise<string> => {
  const ai = getClient();
  if (!ai) return "API Key missing. Cannot draft email.";

  const prompt = `
    You are an Onboarding Manager at KBM Resorts. Draft a short, professional email to request a missing item.
    
    Context:
    - Unit: ${unit.unitCode} (${unit.ownerName})
    - Missing Item: ${taskLabel}
    - Recipient: ${assignee ? assignee : 'The appropriate department'}
    
    Instructions:
    - Keep it polite but direct.
    - Ask for the specific item clearly.
    - Subject line should be included.
    - Sign off as "KBM Onboarding Team".
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Could not generate draft.";
  } catch (error) {
    console.error("Gemini Email Draft Error:", error);
    return "Error generating draft.";
  }
};

export const analyzeUnitStatus = async (
  unit: OnboardingUnit,
  userQuery: string
): Promise<string> => {
  const ai = getClient();
  if (!ai) return "Please configure your API_KEY to use the AI Assistant.";

  // Serialize the unit state to give the model context
  const context = JSON.stringify({
    unitCode: unit.unitCode,
    owner: unit.ownerName,
    location: unit.location,
    status: unit.status,
    sections: unit.sections.map(s => ({
      title: s.title,
      tasks: s.tasks.map(t => ({
        label: t.label,
        value: t.value,
        status: t.status,
        notes: t.notes
      }))
    }))
  });

  const prompt = `
    You are an expert Real Estate Onboarding Manager Assistant.
    
    Here is the current data for Unit ${unit.unitCode} (${unit.location}) in JSON format:
    ${context}

    User Query: "${userQuery}"

    Instructions:
    1. Answer the user's query based strictly on the provided JSON data.
    2. If the user asks to draft an email (e.g., Welcome email, Ops update), draft it professionally using the available data.
    3. If identifying missing items, look for tasks with status "PENDING" or empty values.
    4. Be concise and helpful.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error analyzing the unit data.";
  }
};

export const extractDataFromDocument = async (
  imageBase64: string,
  mimeType: string,
  unit: OnboardingUnit
): Promise<{ [key: string]: string }> => {
  const ai = getClient();
  if (!ai) throw new Error("AI Client not initialized");

  // Simplify sections for the prompt to reduce token count but keep IDs
  const fieldMap = unit.sections.flatMap(s => 
    s.tasks.map(t => ({ id: t.id, label: t.label, currentValue: t.value }))
  );

  const locationContext = unit.location === 'Park City' 
    ? "This is a Utah property. Look for Utah Tax IDs and ignore Hawaii specific terms like GET/TAT if present."
    : "This is a Hawaii property. Look for GET (General Excise Tax) and TAT (Transient Accommodations Tax) numbers.";

  const prompt = `
    Analyze this document image and extract information to fill out the onboarding tracker.
    
    Location Context: ${locationContext}
    
    Here are the fields I need you to look for (mapped by ID):
    ${JSON.stringify(fieldMap)}

    Instructions:
    1. Return a JSON object where the keys are the 'id' from the list above and values are what you extracted from the image.
    2. Only return keys for fields you found confident data for.
    3. For dates, format as YYYY-MM-DD.
    4. For boolean fields (Yes/No), infer from the context (e.g. if a signature exists for a waiver, it's 'Yes').
    5. If a field is handwritten, try your best to transcribe it.
    6. For routing/account numbers, look for checks or direct deposit forms.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          { inlineData: { mimeType: mimeType, data: imageBase64 } },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            extractedFields: {
               type: Type.OBJECT,
               description: "Key-value pairs where key is the Task ID and value is the extracted string",
            }
          }
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    if (result.extractedFields) {
      return result.extractedFields;
    }
    return result;

  } catch (error) {
    console.error("Document Extraction Error:", error);
    throw error;
  }
};