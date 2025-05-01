
import React from 'react';
import { Startup } from '@/types';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

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
    <Card className="overflow-hidden shadow-md">
      <CardHeader className="bg-gradient-to-r from-venture-blue-50 to-venture-blue-100 pb-4">
        <h2 className="text-xl font-semibold text-venture-blue-800">
          Top Investing Firms
        </h2>
      </CardHeader>
      
      <CardContent className="p-0">
        {selectedStartup ? (
          <div>
            <p className="p-4 text-sm text-venture-gray-600 border-b border-venture-gray-100">
              Based on {selectedStartup.name}'s profile, these firms are most likely to invest:
            </p>
            
            <div className="divide-y divide-venture-gray-100">
              {mockFirms.map((firm, index) => (
                <div 
                  key={index}
                  className="p-4 hover:bg-venture-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-venture-blue-900">{firm.name}</h3>
                    <span className="text-sm bg-venture-blue-100 text-venture-blue-800 px-3 py-1 rounded-full font-medium">
                      {firm.matchScore}% score
                    </span>
                  </div>
                  <p className="text-sm text-venture-gray-600 mt-2">
                    Focus: {firm.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[300px] text-venture-gray-500 bg-venture-gray-50">
            Select a startup to see matching investors
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InvestingFirmsPanel;
