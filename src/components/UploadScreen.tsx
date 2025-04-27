
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ProcessingStage, Startup, UploadState } from '@/types';
import ProgressIndicator from './ProgressIndicator';
import StartupCard from './StartupCard';
import { toast } from 'sonner';

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
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file type
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'text/plain'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a PDF, PowerPoint, or text file');
      return;
    }
    
    setUploadState({
      ...uploadState,
      file,
      processingStage: 'uploading',
      progress: 0
    });
    
    // Simulate upload progress
    simulateProcessing();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    
    // Check file type
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'text/plain'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a PDF, PowerPoint, or text file');
      return;
    }
    
    setUploadState({
      ...uploadState,
      file,
      processingStage: 'uploading',
      progress: 0
    });
    
    // Simulate upload progress
    simulateProcessing();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
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
          
          toast.success('Analysis complete!');
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
  
  const handleProcessingComplete = () => {
    if (uploadState.processedStartup) {
      onComplete(uploadState.processedStartup);
    }
  };
  
  return (
    <div className={cn("p-6", className)}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold text-venture-blue-900 mb-2">
          Pitch Upload &amp; Analysis
        </h1>
        <p className="text-venture-gray-600 mb-6">
          Upload a startup pitch deck or memo to analyze its potential and predict which VC funds are most likely to invest.
        </p>
        
        {uploadState.processingStage === 'idle' ? (
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
              <svg className="w-16 h-16 mx-auto text-venture-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-venture-gray-600 mb-2">
              Drag and drop your pitch deck or memo here
            </p>
            <p className="text-venture-gray-500 text-sm">
              or click to browse files (PDF, PowerPoint, or Text)
            </p>
            <div className="mt-6">
              <Button 
                onClick={(e) => {
                  e.stopPropagation();
                  triggerFileInput();
                }}
                className="bg-venture-blue-800 hover:bg-venture-blue-700"
              >
                Upload File
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-venture-gray-100 rounded-lg p-6">
              <p className="text-center text-venture-blue-800 font-medium mb-4">
                {uploadState.file?.name}
              </p>
              <ProgressIndicator 
                stage={uploadState.processingStage}
                progress={uploadState.progress}
                onComplete={handleProcessingComplete}
              />
            </div>
            
            {uploadState.processedStartup && (
              <div className="animate-fade-in">
                <h2 className="text-lg font-medium text-venture-blue-900 mb-4">
                  Analysis Results
                </h2>
                <StartupCard startup={uploadState.processedStartup} />
                
                <div className="mt-6 text-center">
                  <Button 
                    onClick={() => {
                      if (uploadState.processedStartup) {
                        onComplete(uploadState.processedStartup);
                      }
                    }}
                    className="bg-venture-blue-800 hover:bg-venture-blue-700"
                  >
                    View Detailed Analysis
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadScreen;
