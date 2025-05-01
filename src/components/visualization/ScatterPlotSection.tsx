
import React from 'react';
import { Startup } from '@/types';
import ScatterPlot from '../ScatterPlot';

interface ScatterPlotSectionProps {
  startups: Startup[];
  selectedStartup?: Startup;
  onSelectStartup: (startup: Startup) => void;
}

const ScatterPlotSection: React.FC<ScatterPlotSectionProps> = ({
  startups,
  selectedStartup,
  onSelectStartup
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-venture-gray-200 p-4">
      <h2 className="text-xl font-medium text-venture-blue-800 mb-4">
        Prediction Results
      </h2>
      <div className="h-[500px]">
        <ScatterPlot
          startups={startups}
          selectedStartup={selectedStartup}
          onSelectStartup={onSelectStartup}
          height={500}
        />
      </div>
    </div>
  );
};

export default ScatterPlotSection;
