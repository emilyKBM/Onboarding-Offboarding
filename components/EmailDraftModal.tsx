
import React, { useState, useEffect } from 'react';
import { OnboardingUnit } from '../types';
import { STAFF_DIRECTORY } from '../constants';
import { draftMissingItemEmail } from '../services/geminiService';
import { Send, X, Loader2, Copy, Check } from 'lucide-react';

interface EmailDraftModalProps {
  unit: OnboardingUnit;
  taskId: string;
  taskLabel: string;
  assignee?: string;
  onClose: () => void;
}

export const EmailDraftModal: React.FC<EmailDraftModalProps> = ({
  unit,
  taskId,
  taskLabel,
  assignee,
  onClose
}) => {
  const [recipient, setRecipient] = useState(assignee || '');
  const [emailBody, setEmailBody] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Find the full contact info if available
  const contact = STAFF_DIRECTORY.find(s => s.name === recipient || s.department === recipient);
  const toEmail = contact ? contact.email : 'onboarding@kbmresorts.com';

  useEffect(() => {
    const generateDraft = async () => {
      const draft = await draftMissingItemEmail(unit, taskId, taskLabel, recipient);
      setEmailBody(draft);
      setIsLoading(false);
    };
    generateDraft();
  }, [unit, taskId, taskLabel, recipient]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`To: ${toEmail}\n\n${emailBody}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMock = () => {
    alert(`Email sent to ${toEmail}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-900">Request Missing Item</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recipient</label>
            <select 
              value={recipient} 
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="">Select Recipient...</option>
              {STAFF_DIRECTORY.map(staff => (
                <option key={staff.email} value={staff.name}>
                  {staff.name} - {staff.department}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">Sending to: <span className="font-mono text-indigo-600">{toEmail}</span></p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Draft</label>
            {isLoading ? (
              <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
                 <Loader2 size={24} className="animate-spin text-indigo-500" />
              </div>
            ) : (
              <textarea
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                className="w-full h-60 p-3 border border-gray-300 rounded-lg text-sm font-mono text-gray-800 leading-relaxed resize-none focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            )}
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-xl">
           <button 
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all text-sm font-medium"
          >
            {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy Text'}
          </button>
          <button 
            onClick={handleSendMock}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium shadow-sm"
          >
            <Send size={16} />
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
};
