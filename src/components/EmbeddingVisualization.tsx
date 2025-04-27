
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
              {selectedStartup ? 'Selected Startup' : 'Similarity Analysis'}
            </h2>
            
            {selectedStartup ? (
              <div className="space-y-4">
                <StartupCard startup={selectedStartup} />
                
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-venture-gray-600 mb-2">Similar Startups</h3>
                  <div className="space-y-2">
                    {getSimilarStartups(startups, selectedStartup).map(startup => (
                      <StartupCard 
                        key={startup.id}
                        startup={startup}
                        minimal
                        className="cursor-pointer hover:border-venture-blue-500"
                        onClick={() => onSelectStartup(startup)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-venture-gray-500 text-center p-6">
                  Select a startup on the map to view details and find similar companies.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get similar startups based on coordinate proximity
function getSimilarStartups(startups: Startup[], target: Startup): Startup[] {
  if (!target) return [];
  
  // Calculate distance between each startup and the target
  const withDistance = startups
    .filter(s => s.id !== target.id)
    .map(startup => {
      const [x1, y1] = target.coordinates;
      const [x2, y2] = startup.coordinates;
      const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      return { startup, distance };
    });
  
  // Sort by distance (closest first) and take top 3
  return withDistance
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 3)
    .map(item => item.startup);
}

export default EmbeddingVisualization;
