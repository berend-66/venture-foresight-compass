
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ProcessingStage } from '@/types';

interface ProgressIndicatorProps {
  stage: ProcessingStage;
  progress: number;
  onComplete?: () => void;
  className?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  stage,
  progress,
  onComplete,
  className
}) => {
  const [steps, setSteps] = useState([
    { id: 'uploading', label: 'Uploading', completed: false },
    { id: 'processing', label: 'Processing Data', completed: false },
    { id: 'analyzing', label: 'Running Algorithm', completed: false },
    { id: 'complete', label: 'Prediction Complete', completed: false },
  ]);

  useEffect(() => {
    // Update steps based on current stage
    if (stage === 'idle' || stage === 'error') return;
    
    const stageIndex = steps.findIndex(step => step.id === stage);
    if (stageIndex === -1) return;
    
    const newSteps = steps.map((step, i) => ({
      ...step,
      completed: i < stageIndex || (i === stageIndex && progress === 100)
    }));
    
    setSteps(newSteps);
    
    // Call onComplete when all steps are completed
    if (stage === 'complete' && progress === 100 && onComplete) {
      const timeoutId = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(timeoutId);
    }
  }, [stage, progress, onComplete]);

  if (stage === 'idle') return null;
  if (stage === 'error') {
    return (
      <div className={cn("text-center py-4", className)}>
        <div className="text-venture-accent-danger font-medium">
          An error occurred during processing. Please try again.
        </div>
      </div>
    );
  }

  const currentStepIndex = Math.max(
    0,
    steps.findIndex(step => step.id === stage)
  );

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      <div className="flex justify-between mb-4">
        {steps.map((step, index) => (
          <div 
            key={step.id} 
            className={cn(
              "flex flex-col items-center relative",
              (index <= currentStepIndex) ? "text-venture-blue-800" : "text-venture-gray-400"
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center mb-1 transition-all duration-300",
              step.completed 
                ? "bg-venture-blue-800 text-white" 
                : index === currentStepIndex
                ? "border-2 border-venture-blue-700 text-venture-blue-800"
                : "border border-venture-gray-400 text-venture-gray-400"
            )}>
              {step.completed ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <span className="text-xs font-medium absolute -bottom-5 whitespace-nowrap">
              {step.label}
            </span>
          </div>
        ))}
      </div>
      
      <div className="relative pt-1 mt-6">
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-venture-gray-200">
          <div 
            style={{ width: `${progress}%` }} 
            className={cn(
              "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-300",
              stage === 'complete' ? "bg-venture-accent-success" : "bg-venture-blue-700"
            )}
          />
        </div>
        <div className="text-center text-sm text-venture-gray-600">
          {stage === 'complete' 
            ? "Analysis complete" 
            : `${Math.round(progress)}% complete`}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
