
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
    <div className={cn("p-6", className)}>
      <VisualizationHeader />
      
      <div className="mx-auto max-w-3xl">
        <InvestingFirmsPanel selectedStartup={selectedStartup} />
      </div>
    </div>
  );
};

export default EmbeddingVisualization;
