
import React from 'react';
import { Startup } from '@/types';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { Info } from 'lucide-react';

interface InvestingFirmsPanelProps {
  selectedStartup?: Startup;
  startups?: Startup[];
  onSelectStartup?: (startup: Startup) => void;
}

const InvestingFirmsPanel: React.FC<InvestingFirmsPanelProps> = ({ 
  selectedStartup,
  startups,
  onSelectStartup
}) => {
  // Mock data for investing firms
  const mockFirms = [
    { name: 'Sequoia Capital', matchScore: 92, focus: 'Technology, Healthcare', description: 'A leading venture capital firm that has backed companies like Apple, Google, and Airbnb.' },
    { name: 'Andreessen Horowitz', matchScore: 87, focus: 'Software, Fintech', description: 'Known as "a16z", this firm focuses on software eating the world with investments in Facebook, GitHub, and Slack.' },
    { name: 'Accel Partners', matchScore: 84, focus: 'Early-stage Tech', description: 'Early-stage investors who helped build companies like Facebook, Dropbox, and Slack.' },
    { name: 'Khosla Ventures', matchScore: 81, focus: 'AI, Robotics', description: 'Founded by Sun Microsystems co-founder Vinod Khosla, this firm focuses on transformative technology and clean tech.' },
    { name: 'Founders Fund', matchScore: 78, focus: 'Breakthrough Tech', description: 'Founded by Peter Thiel, this fund looks for companies with revolutionary technologies and ambitious goals.' },
  ];

  return (
    <Card className="overflow-hidden shadow-md transition-shadow hover:shadow-lg">
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
                  className="p-4 hover:bg-venture-gray-50 transition-all duration-300"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-venture-blue-900">
                      {firm.name}
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <button className="ml-1.5 inline-flex items-center justify-center rounded-full h-4 w-4 text-venture-blue-600 hover:text-venture-blue-800 transition-colors">
                            <Info size={14} />
                          </button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80 p-4">
                          <p className="text-sm">{firm.description}</p>
                        </HoverCardContent>
                      </HoverCard>
                    </h3>
                    <span className="text-sm bg-venture-blue-100 text-venture-blue-800 px-3 py-1 rounded-full font-medium transition-transform hover:scale-105 duration-200">
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
