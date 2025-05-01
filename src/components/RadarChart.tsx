
import React from 'react';
import { Radar, RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Startup } from '@/types';

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
  // Format metrics data for the radar chart
  const formatMetricName = (metric: string): string => {
    return metric.replace(/([A-Z])/g, ' $1').trim();
  };

  const data = [
    { metric: 'Market', startup: startup.metrics.marketPotential, benchmark: benchmarkData.marketPotential },
    { metric: 'Founders', startup: startup.metrics.founderStrength, benchmark: benchmarkData.founderStrength },
    { metric: 'Traction', startup: startup.metrics.productTraction, benchmark: benchmarkData.productTraction },
    { metric: 'Advantage', startup: startup.metrics.competitiveAdvantage, benchmark: benchmarkData.competitiveAdvantage },
    { metric: 'Team', startup: startup.metrics.teamCredibility, benchmark: benchmarkData.teamCredibility }
  ];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <RechartsRadarChart outerRadius={90} data={data}>
        <PolarGrid />
        <PolarAngleAxis 
          dataKey="metric" 
          tick={{ fontSize: 12, fill: '#4B5563' }} 
        />
        <Radar
          name={startup.name}
          dataKey="startup"
          stroke="#1E40AF"
          fill="#1E40AF"
          fillOpacity={0.3}
        />
        <Radar
          name="Industry Benchmark"
          dataKey="benchmark"
          stroke="#6B7280"
          fill="#6B7280"
          fillOpacity={0.2}
        />
      </RechartsRadarChart>
    </ResponsiveContainer>
  );
};

export default RadarChart;
