
import React from 'react';
import { FileTextIcon } from 'lucide-react';
import { toast } from 'sonner';
import { ProcessingStage } from '@/types';

interface FileUploadSectionProps {
  processingStage: ProcessingStage;
  onFileSelect: (file: File) => void;
}

export const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  processingStage,
  onFileSelect
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    validateAndProcessFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    
    validateAndProcessFile(file);
  };

  const validateAndProcessFile = (file: File) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'text/plain'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a PDF, PowerPoint, or text file');
      return;
    }
    
    onFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (processingStage !== 'idle') {
    return null;
  }

  return (
    <div 
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="border-2 border-dashed border-venture-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-venture-blue-600 transition-colors bg-venture-gray-100"
      onClick={triggerFileInput}
    >
      <input 
        type="file" 
        ref={fileInputRef}
        className="hidden" 
        onChange={handleFileChange}
        accept=".pdf,.pptx,.txt"
      />
      <div className="mb-4">
        <FileTextIcon className="w-16 h-16 mx-auto text-venture-gray-400" />
      </div>
      <p className="text-venture-gray-600 mb-2">
        Drag and drop your pitch deck here
      </p>
      <p className="text-venture-gray-500 text-sm">
        or click to browse files (PDF, PowerPoint, or Text)
      </p>
    </div>
  );
};

export default FileUploadSection;
