
import React from 'react';
import { cn } from '@/lib/utils';
import { Startup } from '@/types';
import VisualizationHeader from './visualization/VisualizationHeader';
import ScatterPlotSection from './visualization/ScatterPlotSection';
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
      <VisualizationHeader className="mb-6" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ScatterPlotSection 
            startups={startups}
            selectedStartup={selectedStartup}
            onSelectStartup={onSelectStartup}
          />
        </div>
        
        <div className="lg:col-span-1">
          <InvestingFirmsPanel selectedStartup={selectedStartup} />
        </div>
      </div>
    </div>
  );
};

export default EmbeddingVisualization;
