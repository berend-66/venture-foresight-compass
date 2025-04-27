
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileTextIcon } from 'lucide-react';
import { toast } from 'sonner';
import { ProcessingStage } from '@/types';

interface TextInputSectionProps {
  textInput?: string;
  processingStage: ProcessingStage;
  onTextChange: (text: string) => void;
  onSubmit: () => void;
}

export const TextInputSection: React.FC<TextInputSectionProps> = ({
  textInput,
  processingStage,
  onTextChange,
  onSubmit
}) => {
  const handleSubmit = () => {
    if (!textInput?.trim()) {
      toast.error('Please enter a startup description');
      return;
    }
    onSubmit();
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="startup-description">Startup Description</Label>
      <Textarea
        id="startup-description"
        placeholder="Paste or enter the startup's description here..."
        className="min-h-[200px] font-mono text-sm"
        value={textInput || ''}
        onChange={(e) => onTextChange(e.target.value)}
      />
      <Button 
        onClick={handleSubmit}
        className="w-full bg-venture-blue-800 hover:bg-venture-blue-700"
        disabled={processingStage !== 'idle' || !textInput?.trim()}
      >
        <FileTextIcon className="w-4 h-4 mr-2" />
        Analyze Description
      </Button>
    </div>
  );
};

export default TextInputSection;
