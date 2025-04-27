
import React, { useEffect, useRef } from 'react';
import { ResponsiveContainer, RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, Radar, Legend, Tooltip } from 'recharts';
import { Startup, StartupMetrics } from '@/types';
import { cn } from '@/lib/utils';

interface RadarChartProps {
  startup: Startup;
  benchmarkData: StartupMetrics;
  className?: string;
}

export const RadarChart: React.FC<RadarChartProps> = ({ 
  startup, 
  benchmarkData,
  className
}) => {
  const chartData = [
    {
      metric: 'Market Potential',
      startup: startup.metrics.marketPotential,
      benchmark: benchmarkData.marketPotential,
    },
    {
      metric: 'Founder Strength',
      startup: startup.metrics.founderStrength,
      benchmark: benchmarkData.founderStrength,
    },
    {
      metric: 'Product Traction',
      startup: startup.metrics.productTraction,
      benchmark: benchmarkData.productTraction,
    },
    {
      metric: 'Competitive Advantage',
      startup: startup.metrics.competitiveAdvantage,
      benchmark: benchmarkData.competitiveAdvantage,
    },
    {
      metric: 'Team Credibility',
      startup: startup.metrics.teamCredibility,
      benchmark: benchmarkData.teamCredibility,
    }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="radar-chart-tooltip">
          <p className="font-medium text-venture-blue-800">{data.metric}</p>
          <p className="text-venture-blue-700">
            {startup.name}: {data.startup}
          </p>
          <p className="text-venture-gray-600">
            Benchmark: {data.benchmark}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={cn("w-full h-[300px]", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart 
          data={chartData} 
          margin={{ top: 10, right: 30, bottom: 10, left: 30 }}
        >
          <PolarGrid stroke="#E2E8F0" />
          <PolarAngleAxis 
            dataKey="metric"
            tick={{ fill: '#4A5568', fontSize: 12 }}
          />
          <Radar
            name={startup.name}
            dataKey="startup"
            stroke="#2A4365"
            fill="#2A4365"
            fillOpacity={0.6}
          />
          <Radar
            name="Benchmark"
            dataKey="benchmark"
            stroke="#718096"
            fill="#718096"
            fillOpacity={0.3}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChart;
