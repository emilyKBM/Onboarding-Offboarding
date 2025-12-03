import React, { useState, useCallback } from 'react';
import { Upload, FileText, Check, Loader2, AlertCircle } from 'lucide-react';
import { extractDataFromDocument } from '../services/geminiService';
import { OnboardingUnit } from '../types';

interface DocumentUploaderProps {
  unit: OnboardingUnit;
  onDataExtracted: (data: { [key: string]: string }) => void;
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({ unit, onDataExtracted }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadStatus('error');
      setMessage('Please upload an image file (PNG, JPG) of the document.');
      return;
    }

    setIsProcessing(true);
    setUploadStatus('idle');
    setMessage('AI is analyzing document...');

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = (reader.result as string).split(',')[1];
        
        try {
          const extractedData = await extractDataFromDocument(base64String, file.type, unit);
          const fieldCount = Object.keys(extractedData).length;
          
          if (fieldCount > 0) {
            onDataExtracted(extractedData);
            setUploadStatus('success');
            setMessage(`Successfully extracted ${fieldCount} fields!`);
          } else {
            setUploadStatus('error');
            setMessage('Could not identify relevant data in this document.');
          }
        } catch (err) {
          setUploadStatus('error');
          setMessage('Failed to process document.');
        } finally {
          setIsProcessing(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setIsProcessing(false);
      setUploadStatus('error');
      setMessage('Error reading file.');
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="mb-6">
      <div 
        className={`relative border-2 border-dashed rounded-xl p-6 transition-all text-center ${
          isDragging 
            ? 'border-indigo-500 bg-indigo-50' 
            : uploadStatus === 'error'
            ? 'border-red-200 bg-red-50'
            : uploadStatus === 'success'
            ? 'border-green-200 bg-green-50'
            : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileInput}
          accept="image/*"
          disabled={isProcessing}
        />

        <div className="flex flex-col items-center gap-2">
          {isProcessing ? (
            <>
              <Loader2 size={32} className="text-indigo-600 animate-spin" />
              <p className="text-indigo-600 font-medium">{message}</p>
            </>
          ) : uploadStatus === 'success' ? (
            <>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <Check size={20} />
              </div>
              <p className="text-green-800 font-medium">{message}</p>
              <p className="text-xs text-green-600">Drag another document to continue</p>
            </>
          ) : uploadStatus === 'error' ? (
            <>
               <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                <AlertCircle size={20} />
              </div>
              <p className="text-red-800 font-medium">{message}</p>
              <p className="text-xs text-red-600">Try uploading a clearer image</p>
            </>
          ) : (
            <>
              <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                <Upload size={20} />
              </div>
              <div>
                <p className="text-gray-700 font-medium">Drop onboarding documents here</p>
                <p className="text-xs text-gray-400 mt-1">Supports Images of PDFs (PMA, Tax Forms, Voided Checks)</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};