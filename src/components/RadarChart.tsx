
import React from 'react';
import { Radar, RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Startup } from '@/types';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { Radar as RadarIcon } from 'lucide-react';

interface RadarChartProps {
  startup: Startup;
  benchmarkData: {
    marketPotential: number;
    founderStrength: number;
    productTraction: number;
    competitiveAdvantage: number;
    teamCredibility: number;
  };
}

const RadarChart: React.FC<RadarChartProps> = ({ startup, benchmarkData }) => {
  // Descriptions for each metric
  const metricDescriptions = {
    Market: "Evaluates the total addressable market size and growth potential of the startup's industry.",
    Founders: "Assesses the expertise, experience, and track record of the founding team.",
    Traction: "Measures the current user growth, revenue, or other key performance indicators.",
    Advantage: "Evaluates the uniqueness and defensibility of the startup's technology or business model.",
    Team: "Assesses the overall team composition, skills, and ability to execute on the vision."
  };

  // Format metrics data for the radar chart
  const data = [
    { metric: 'Market', startup: startup.metrics.marketPotential, benchmark: benchmarkData.marketPotential },
    { metric: 'Founders', startup: startup.metrics.founderStrength, benchmark: benchmarkData.founderStrength },
    { metric: 'Traction', startup: startup.metrics.productTraction, benchmark: benchmarkData.productTraction },
    { metric: 'Advantage', startup: startup.metrics.competitiveAdvantage, benchmark: benchmarkData.competitiveAdvantage },
    { metric: 'Team', startup: startup.metrics.teamCredibility, benchmark: benchmarkData.teamCredibility }
  ];

  // Custom tooltip content
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      return (
        <div className="bg-white p-3 shadow-lg rounded-md border border-venture-gray-200">
          <p className="font-medium text-venture-blue-800">{data.metric}</p>
          <p className="text-sm text-venture-blue-700">
            {startup.name}: <span className="font-semibold">{data.startup}</span>
          </p>
          <p className="text-sm text-venture-gray-600">
            Benchmark: <span className="font-semibold">{data.benchmark}</span>
          </p>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="relative">
      <div className="absolute top-0 right-0 z-10">
        <HoverCard>
          <HoverCardTrigger asChild>
            <button className="flex items-center text-xs text-venture-blue-700 hover:text-venture-blue-900 transition-colors">
              <RadarIcon size={14} className="mr-1" /> Chart Info
            </button>
          </HoverCardTrigger>
          <HoverCardContent className="w-72 p-4">
            <h4 className="font-medium mb-2 text-venture-blue-800">Radar Chart Analysis</h4>
            <p className="text-sm mb-2">
              This chart compares {startup.name}'s performance across key metrics against industry benchmarks.
            </p>
            <div className="text-xs space-y-2">
              {Object.entries(metricDescriptions).map(([metric, description]) => (
                <div key={metric} className="pb-1 border-b border-venture-gray-100 last:border-0">
                  <span className="font-medium">{metric}:</span> {description}
                </div>
              ))}
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>

      <ResponsiveContainer width="100%" height={250} className="mt-6">
        <RechartsRadarChart outerRadius={90} data={data} className="transition-all duration-200 hover:scale-[1.02]">
          <PolarGrid className="animate-pulse" />
          <PolarAngleAxis 
            dataKey="metric" 
            tick={{ fontSize: 12, fill: '#4B5563' }} 
            className="transition-opacity duration-300"
          />
          <Tooltip content={<CustomTooltip />} />
          <Radar
            name={startup.name}
            dataKey="startup"
            stroke="#1E40AF"
            fill="#1E40AF"
            fillOpacity={0.3}
            className="transition-all duration-300"
          />
          <Radar
            name="Industry Benchmark"
            dataKey="benchmark"
            stroke="#6B7280"
            fill="#6B7280"
            fillOpacity={0.2}
            className="transition-all duration-300"
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChart;
