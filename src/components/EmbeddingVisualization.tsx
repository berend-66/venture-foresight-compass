
import React from 'react';
import { cn } from '@/lib/utils';
import { Startup } from '@/types';
import VisualizationHeader from './visualization/VisualizationHeader';
import InvestingFirmsPanel from './visualization/InvestingFirmsPanel';
import StartupCard from './StartupCard';

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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-venture-gray-200 p-4">
            <h3 className="text-lg font-medium text-venture-blue-800 mb-4">
              Available Startups
            </h3>
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {startups.map((startup) => (
                <StartupCard 
                  key={startup.id}
                  startup={startup}
                  minimal
                  onClick={() => onSelectStartup(startup)}
                  className={cn(
                    "cursor-pointer transition-all",
                    selectedStartup?.id === startup.id ? "border-venture-blue-600 shadow-sm" : ""
                  )}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <InvestingFirmsPanel selectedStartup={selectedStartup} />
        </div>
      </div>
    </div>
  );
};

export default EmbeddingVisualization;
