
import React, { useEffect, useRef, useState } from 'react';
import { IndustryCluster, Startup } from '@/types';

interface ScatterPlotProps {
  startups: Startup[];
  selectedStartup?: Startup;
  onSelectStartup: (startup: Startup) => void;
  width?: number;
  height?: number;
  className?: string;
}

export const ScatterPlot: React.FC<ScatterPlotProps> = ({
  startups,
  selectedStartup,
  onSelectStartup,
  width = 800,
  height = 600,
  className
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredStartup, setHoveredStartup] = useState<Startup | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width, height });

  // Create industry clusters based on startups
  const industries = Array.from(new Set(startups.map(s => s.industry)));
  const clusters: IndustryCluster[] = industries.map((name, index) => ({
    id: `cluster-${index}`,
    name,
    color: getColorForIndustry(name)
  }));

  // Calculate min/max for coordinates to determine scale
  const xValues = startups.map(s => s.coordinates[0]);
  const yValues = startups.map(s => s.coordinates[1]);
  const xMin = Math.min(...xValues);
  const xMax = Math.max(...xValues);
  const yMin = Math.min(...yValues);
  const yMax = Math.max(...yValues);
  
  // Add padding to the ranges
  const xRange = xMax - xMin + 0.1; // +10% padding
  const yRange = yMax - yMin + 0.1; // +10% padding

  const canvasToDataX = (x: number) => {
    const padding = dimensions.width * 0.1;
    return xMin + (x - padding) / (dimensions.width - 2 * padding) * xRange;
  };

  const canvasToDataY = (y: number) => {
    const padding = dimensions.height * 0.1;
    return yMin + (y - padding) / (dimensions.height - 2 * padding) * yRange;
  };

  const dataToCanvasX = (x: number) => {
    const padding = dimensions.width * 0.1;
    return padding + (x - xMin) / xRange * (dimensions.width - 2 * padding);
  };

  const dataToCanvasY = (y: number) => {
    const padding = dimensions.height * 0.1;
    return padding + (y - yMin) / yRange * (dimensions.height - 2 * padding);
  };

  const drawScatterPlot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    // Draw subtle grid lines
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 0.5;
    
    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {
      const x = dimensions.width * 0.1 + (dimensions.width * 0.8) * (i / 10);
      ctx.beginPath();
      ctx.moveTo(x, dimensions.height * 0.1);
      ctx.lineTo(x, dimensions.height * 0.9);
      ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let i = 0; i <= 10; i++) {
      const y = dimensions.height * 0.1 + (dimensions.height * 0.8) * (i / 10);
      ctx.beginPath();
      ctx.moveTo(dimensions.width * 0.1, y);
      ctx.lineTo(dimensions.width * 0.9, y);
      ctx.stroke();
    }

    // Draw dots for each startup
    startups.forEach(startup => {
      const [x, y] = startup.coordinates;
      const canvasX = dataToCanvasX(x);
      const canvasY = dataToCanvasY(y);
      
      // Determine dot color based on industry
      const industry = clusters.find(c => c.name === startup.industry);
      const dotColor = industry ? industry.color : '#CBD5E0';
      
      // Draw circle
      ctx.beginPath();
      ctx.arc(canvasX, canvasY, startup === selectedStartup ? 8 : 6, 0, 2 * Math.PI);
      ctx.fillStyle = startup === hoveredStartup || startup === selectedStartup 
        ? dotColor 
        : `${dotColor}99`; // Add transparency for non-selected dots
      ctx.fill();
      
      // Add border for selected or hovered startup
      if (startup === selectedStartup || startup === hoveredStartup) {
        ctx.strokeStyle = startup === selectedStartup ? '#4A5568' : '#718096';
        ctx.lineWidth = startup === selectedStartup ? 2 : 1;
        ctx.stroke();
      }
    });

    // Add animation for newly added startup if it's selected
    if (selectedStartup && startups.includes(selectedStartup)) {
      const [x, y] = selectedStartup.coordinates;
      const canvasX = dataToCanvasX(x);
      const canvasY = dataToCanvasY(y);
      
      // Add highlight effect
      ctx.beginPath();
      ctx.arc(canvasX, canvasY, 20, 0, 2 * Math.PI);
      ctx.strokeStyle = '#3182CE';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      
      // Add pulsating circle
      ctx.beginPath();
      ctx.arc(canvasX, canvasY, 30, 0, 2 * Math.PI);
      ctx.strokeStyle = '#3182CE66';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  };

  // Handle resizing
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ 
          width: Math.max(width, 300), 
          height: Math.max(height, 300) 
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Handle canvas rendering
  useEffect(() => {
    drawScatterPlot();
  }, [dimensions, startups, hoveredStartup, selectedStartup]);

  // Handle mouse interactions
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Convert to data coordinates
    const dataX = canvasToDataX(mouseX);
    const dataY = canvasToDataY(mouseY);
    
    // Find closest startup within a certain radius
    const HOVER_RADIUS = 0.2; // Adjust as needed
    let closestStartup: Startup | null = null;
    let minDistance = HOVER_RADIUS;
    
    startups.forEach(startup => {
      const [x, y] = startup.coordinates;
      const distance = Math.sqrt((x - dataX) ** 2 + (y - dataY) ** 2);
      
      if (distance < minDistance) {
        closestStartup = startup;
        minDistance = distance;
      }
    });
    
    // Update hovered startup and tooltip position
    setHoveredStartup(closestStartup);
    setTooltipPos({ x: mouseX, y: mouseY });
  };

  const handleMouseLeave = () => {
    setHoveredStartup(null);
  };

  const handleClick = () => {
    if (hoveredStartup) {
      onSelectStartup(hoveredStartup);
    }
  };

  // Helper function to generate colors for industries
  function getColorForIndustry(industry: string): string {
    // Predefined professional color palette
    const colors = [
      '#2A4365', // blue
      '#2C7A7B', // teal
      '#276749', // green
      '#744210', // yellow
      '#975A16', // amber
      '#702459', // pink
      '#553C9A', // purple
      '#1A365D', // dark blue
    ];
    
    // Hash the industry string to determine color index
    let hash = 0;
    for (let i = 0; i < industry.length; i++) {
      hash = ((hash << 5) - hash) + industry.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  }

  // Create legend for industry clusters
  const renderLegend = () => {
    return (
      <div className="absolute top-4 right-4 bg-white bg-opacity-90 p-3 rounded-md shadow-sm border border-venture-gray-200">
        <div className="text-xs font-medium text-venture-gray-600 mb-2">Industries</div>
        <div className="space-y-1">
          {clusters.map(cluster => (
            <div key={cluster.id} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: cluster.color }}
              ></div>
              <span className="text-xs text-venture-gray-700">{cluster.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden bg-white rounded-lg border border-venture-gray-200 ${className}`}
      style={{ height }}
    >
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="cursor-pointer"
      />
      
      {renderLegend()}
      
      {hoveredStartup && (
        <div 
          className="scatter-plot-tooltip absolute"
          style={{ 
            left: tooltipPos.x + 15,
            top: tooltipPos.y - 15,
            transform: 'translateY(-100%)',
            zIndex: 10
          }}
        >
          <div className="font-medium">{hoveredStartup.name}</div>
          <div className="text-sm text-venture-gray-600">{hoveredStartup.industry}</div>
          <div className="text-sm text-venture-gray-600">Match: {hoveredStartup.matchScore}%</div>
        </div>
      )}
    </div>
  );
};

export default ScatterPlot;
