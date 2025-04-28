
import React from 'react';

interface VisualizationHeaderProps {
  className?: string;
}

export const VisualizationHeader: React.FC<VisualizationHeaderProps> = ({
  className
}) => {
  return (
    <div className={className}>
      <h1 className="text-2xl font-semibold text-venture-blue-900 mb-2">
        Startup Similarity Visualization
      </h1>
      <p className="text-venture-gray-600">
        This 2D embedding map visualizes startup similarities. Each dot represents a startup, with proximity indicating similarity based on business model, technology, market, and potential.
      </p>
    </div>
  );
};

export default VisualizationHeader;
