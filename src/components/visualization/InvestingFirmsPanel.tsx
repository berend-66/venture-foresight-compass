
import React from 'react';
import { cn } from '@/lib/utils';
import StartupCard from '../StartupCard';
import { Startup } from '@/types';

interface InvestingFirmsPanelProps {
  selectedStartup?: Startup;
  className?: string;
}

interface VCFirm {
  id: string;
  name: string;
  focus: string;
  probability: number;
}

export const InvestingFirmsPanel: React.FC<InvestingFirmsPanelProps> = ({
  selectedStartup,
  className
}) => {
  // Helper function to get recommended VCs with realistic probabilities
  const getRecommendedVCs = (): VCFirm[] => {
    return [
      { id: '1', name: 'Sequoia Capital', focus: 'Deep Tech · Enterprise Software', probability: 25 },
      { id: '2', name: 'Andreessen Horowitz', focus: 'AI · Enterprise', probability: 22 },
      { id: '3', name: 'Accel', focus: 'Enterprise Software · SaaS', probability: 15 },
      { id: '4', name: 'NEA', focus: 'Deep Tech · Software', probability: 13 },
      { id: '5', name: 'Lightspeed', focus: 'Enterprise · Deep Tech', probability: 10 }
    ];
  };

  return (
    <div className={cn("bg-white rounded-lg border border-venture-gray-200 p-4 h-[600px] overflow-y-auto", className)}>
      <h2 className="text-lg font-medium text-venture-blue-900 mb-4">
        {selectedStartup ? 'Top Investing Firms' : 'Investment Analysis'}
      </h2>
      
      {selectedStartup ? (
        <div className="space-y-4">
          <StartupCard startup={selectedStartup} />
          
          <div className="mt-4">
            <div className="space-y-2">
              {getRecommendedVCs().map((vc) => (
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
  );
};

export default InvestingFirmsPanel;
