
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Startup, UploadState, ProcessingStage } from '@/types';
import TextInputSection from './upload/TextInputSection';
import FileUploadSection from './upload/FileUploadSection';
import ProcessingSection from './upload/ProcessingSection';

interface UploadScreenProps {
  onComplete: (startup: Startup) => void;
  className?: string;
}

export const UploadScreen: React.FC<UploadScreenProps> = ({ 
  onComplete,
  className
}) => {
  const [uploadState, setUploadState] = useState<UploadState>({
    processingStage: 'idle',
    progress: 0
  });

  const handleTextChange = (text: string) => {
    setUploadState({
      ...uploadState,
      textInput: text,
      processingStage: 'idle',
      progress: 0
    });
  };

  const handleTextSubmit = () => {
    setUploadState({
      ...uploadState,
      processingStage: 'processing',
      progress: 0
    });
    
    simulateProcessing();
  };

  const handleFileSelect = (file: File) => {
    setUploadState({
      ...uploadState,
      file,
      processingStage: 'uploading',
      progress: 0
    });
    
    simulateProcessing();
  };
  
  const simulateProcessing = () => {
    // Mock processing steps with realistic timing
    let progress = 0;
    let currentStage: ProcessingStage = 'uploading';
    
    const stages: ProcessingStage[] = ['uploading', 'processing', 'analyzing', 'complete'];
    const stageProgress = [25, 60, 90, 100]; // Progress thresholds for each stage
    
    const interval = setInterval(() => {
      progress += Math.random() * 3 + 1; // Random progress between 1-4%
      
      if (progress >= stageProgress[0] && currentStage === 'uploading') {
        currentStage = 'processing';
      } else if (progress >= stageProgress[1] && currentStage === 'processing') {
        currentStage = 'analyzing';
      } else if (progress >= stageProgress[2] && currentStage === 'analyzing') {
        currentStage = 'complete';
      }
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Generate mock processed startup data
        const mockStartup: Startup = {
          id: 'new-startup',
          name: 'QuantEdge AI',
          industry: 'Artificial Intelligence',
          sector: 'Enterprise Software',
          fundingStage: 'Series A',
          founders: [
            { name: 'Sarah Chen', background: 'Former Google AI Researcher' },
            { name: 'Michael Rodriguez', background: 'Ex-Stripe Engineering Lead' }
          ],
          description: 'QuantEdge AI builds sophisticated machine learning models that help financial institutions optimize their investment strategies and risk management processes.',
          coordinates: [0.7, 0.65],
          matchScore: 85,
          predictedSuccess: 78,
          recommendedAction: 'Priority for Investment',
          metrics: {
            marketPotential: 92,
            founderStrength: 85,
            productTraction: 70,
            competitiveAdvantage: 88,
            teamCredibility: 82
          }
        };
        
        setTimeout(() => {
          setUploadState({
            ...uploadState,
            processingStage: 'complete',
            progress: 100,
            processedStartup: mockStartup
          });
        }, 500);
      } else {
        setUploadState({
          ...uploadState,
          processingStage: currentStage,
          progress: Math.min(progress, 99) // Keep at 99% until complete
        });
      }
    }, 200);
  };

  return (
    <div className={cn("p-6", className)}>
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-venture-blue-900 mb-2">
            Startup Analysis
          </h1>
          <p className="text-venture-gray-600 mb-6">
            Enter a startup description or upload a pitch deck to analyze its potential and predict which VC funds are most likely to invest.
          </p>
        </div>

        <div className="space-y-4">
          <TextInputSection 
            textInput={uploadState.textInput}
            processingStage={uploadState.processingStage}
            onTextChange={handleTextChange}
            onSubmit={handleTextSubmit}
          />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-venture-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-venture-gray-500">
                Or upload a document
              </span>
            </div>
          </div>

          {uploadState.processingStage === 'idle' ? (
            <FileUploadSection 
              processingStage={uploadState.processingStage}
              onFileSelect={handleFileSelect}
            />
          ) : (
            <ProcessingSection 
              file={uploadState.file}
              progress={uploadState.progress}
              stage={uploadState.processingStage}
              processedStartup={uploadState.processedStartup}
              onComplete={onComplete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadScreen;
