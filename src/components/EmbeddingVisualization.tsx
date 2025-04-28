import React from 'react';
import { cn } from '@/lib/utils';
import ScatterPlot from './ScatterPlot';
import StartupCard from './StartupCard';
import { Startup } from '@/types';

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
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-venture-blue-900 mb-2">
          Startup Similarity Visualization
        </h1>
        <p className="text-venture-gray-600">
          This 2D embedding map visualizes startup similarities. Each dot represents a startup, with proximity indicating similarity based on business model, technology, market, and potential.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-venture-gray-200 p-4 h-[600px]">
            <ScatterPlot 
              startups={startups}
              selectedStartup={selectedStartup}
              onSelectStartup={onSelectStartup}
              height={560}
            />
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-venture-gray-200 p-4 h-[600px] overflow-y-auto">
            <h2 className="text-lg font-medium text-venture-blue-900 mb-4">
              {selectedStartup ? 'Potential Investment Firms' : 'Investment Analysis'}
            </h2>
            
            {selectedStartup ? (
              <div className="space-y-4">
                <StartupCard startup={selectedStartup} />
                
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-venture-gray-600 mb-2">Top Recommended VCs</h3>
                  <div className="space-y-2">
                    {getRecommendedVCs().map((vc, index) => (
                      <div 
                        key={vc.id}
                        className="bg-white rounded-lg shadow-sm border border-venture-gray-200 p-4"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-venture-blue-900">{vc.name}</h3>
                          <span className="text-sm font-medium text-venture-accent-success">
                            {vc.probability}%
                          </span>
                        </div>
                        <div className="text-xs text-venture-gray-600 mt-1">
                          {vc.focus}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-venture-gray-500 text-center p-6">
                  Select a startup on the map to view potential investors.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get recommended VCs with realistic probabilities
function getRecommendedVCs() {
  return [
    { id: '1', name: 'Sequoia Capital', focus: 'Deep Tech · Enterprise Software', probability: 25 },
    { id: '2', name: 'Andreessen Horowitz', focus: 'AI · Enterprise', probability: 22 },
    { id: '3', name: 'Accel', focus: 'Enterprise Software · SaaS', probability: 15 },
    { id: '4', name: 'NEA', focus: 'Deep Tech · Software', probability: 13 },
    { id: '5', name: 'Lightspeed', focus: 'Enterprise · Deep Tech', probability: 10 }
  ];
}

export default EmbeddingVisualization;
