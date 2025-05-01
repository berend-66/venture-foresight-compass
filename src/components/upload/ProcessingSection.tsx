
import React from 'react';
import { Button } from '@/components/ui/button';
import { ProcessingStage, Startup } from '@/types';
import ProgressIndicator from '../ProgressIndicator';
import StartupCard from '../StartupCard';

interface ProcessingSectionProps {
  file?: File;
  progress: number;
  stage: ProcessingStage;
  processedStartup?: Startup;
  onComplete: (startup: Startup) => void;
}

export const ProcessingSection: React.FC<ProcessingSectionProps> = ({
  file,
  progress,
  stage,
  processedStartup,
  onComplete
}) => {
  return (
    <div className="space-y-8">
      <div className="bg-venture-gray-100 rounded-lg p-6">
        {file && (
          <p className="text-center text-venture-blue-800 font-medium mb-4">
            {file.name}
          </p>
        )}
        <ProgressIndicator 
          stage={stage}
          progress={progress}
          onComplete={() => processedStartup && onComplete(processedStartup)}
        />
      </div>
      
      {processedStartup && stage === 'complete' && (
        <div className="mt-6 text-center">
          <Button 
            onClick={() => onComplete(processedStartup)}
            className="bg-venture-blue-800 hover:bg-venture-blue-700"
          >
            View Prediction Results
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProcessingSection;
