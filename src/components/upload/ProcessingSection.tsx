
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
      
      {processedStartup && (
        <div className="animate-fade-in">
          <h2 className="text-lg font-medium text-venture-blue-900 mb-4">
            Analysis Results
          </h2>
          <StartupCard startup={processedStartup} />
          
          <div className="mt-6 text-center">
            <Button 
              onClick={() => onComplete(processedStartup)}
              className="bg-venture-blue-800 hover:bg-venture-blue-700"
            >
              View Detailed Analysis
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessingSection;
