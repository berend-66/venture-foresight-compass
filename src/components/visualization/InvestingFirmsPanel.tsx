
import React from 'react';
import { Startup } from '@/types';

interface InvestingFirmsPanelProps {
  selectedStartup?: Startup;
}

const InvestingFirmsPanel: React.FC<InvestingFirmsPanelProps> = ({ selectedStartup }) => {
  // Mock data for investing firms
  const mockFirms = [
    { name: 'Sequoia Capital', matchScore: 92, focus: 'Technology, Healthcare' },
    { name: 'Andreessen Horowitz', matchScore: 87, focus: 'Software, Fintech' },
    { name: 'Accel Partners', matchScore: 84, focus: 'Early-stage Tech' },
    { name: 'Khosla Ventures', matchScore: 81, focus: 'AI, Robotics' },
    { name: 'Founders Fund', matchScore: 78, focus: 'Breakthrough Tech' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-venture-gray-200 p-4 h-full">
      <h2 className="text-xl font-medium text-venture-blue-800 mb-4">
        Top Investing Firms
      </h2>
      
      {selectedStartup ? (
        <div className="space-y-4">
          <p className="text-sm text-venture-gray-600 mb-4">
            Based on {selectedStartup.name}'s profile, these firms are most likely to invest:
          </p>
          
          <div className="space-y-3 overflow-y-auto max-h-[400px]">
            {mockFirms.map((firm, index) => (
              <div 
                key={index}
                className="p-3 border border-venture-gray-200 rounded-md hover:bg-venture-gray-50 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{firm.name}</h3>
                  <span className="text-sm bg-venture-blue-100 text-venture-blue-800 px-2 py-1 rounded-full">
                    {firm.matchScore}% match
                  </span>
                </div>
                <p className="text-sm text-venture-gray-600 mt-1">
                  Focus: {firm.focus}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[300px] text-venture-gray-500">
          Select a startup to see matching investors
        </div>
      )}
    </div>
  );
};

export default InvestingFirmsPanel;
