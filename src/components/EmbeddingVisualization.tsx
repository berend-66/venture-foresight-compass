
import React from 'react';
import { cn } from '@/lib/utils';
import { Startup } from '@/types';
import VisualizationHeader from './visualization/VisualizationHeader';
import InvestingFirmsPanel from './visualization/InvestingFirmsPanel';

interface EmbeddingVisualizationProps {
  startups: Startup[];
  selectedStartup?: Startup;
  onSelectStartup: (startup: Startup) => void;
  className?: string;
}

export const EmbeddingVisualization: React.FC<EmbeddingVisualizationProps> = ({
  startups,
  selectedStartup,
  onSelectStartup,
  className
}) => {
  return (
    <div className={cn("p-6 max-w-4xl mx-auto", className)}>
      <VisualizationHeader />
      
      <div className="mt-8">
        <InvestingFirmsPanel 
          selectedStartup={selectedStartup} 
          onSelectStartup={onSelectStartup}
          startups={startups}
        />
      </div>
    </div>
  );
};

export default EmbeddingVisualization;
