
import React from 'react';
import { cn } from '@/lib/utils';
import ScatterPlot from '../ScatterPlot';
import { Startup } from '@/types';

interface ScatterPlotSectionProps {
  startups: Startup[];
  selectedStartup?: Startup;
  onSelectStartup: (startup: Startup) => void;
  className?: string;
}

export const ScatterPlotSection: React.FC<ScatterPlotSectionProps> = ({
  startups,
  selectedStartup,
  onSelectStartup,
  className
}) => {
  return (
    <div className={cn("bg-white rounded-lg border border-venture-gray-200 p-4 h-[600px]", className)}>
      <ScatterPlot 
        startups={startups}
        selectedStartup={selectedStartup}
        onSelectStartup={onSelectStartup}
        height={560}
      />
    </div>
  );
};

export default ScatterPlotSection;
