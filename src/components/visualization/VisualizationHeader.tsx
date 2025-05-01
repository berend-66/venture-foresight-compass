
import React from 'react';

const VisualizationHeader: React.FC = () => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold text-venture-blue-900 mb-2">
        Prediction Results
      </h1>
      <p className="text-venture-gray-600">
        This map visualizes startup data with each dot representing a startup. Proximity indicates similarity based on business model, technology, market, and potential.
      </p>
    </div>
  );
};

export default VisualizationHeader;
