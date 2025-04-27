import React from 'react';
import { Startup } from '@/types';
import { cn } from '@/lib/utils';

interface StartupCardProps {
  startup: Startup;
  className?: string;
  minimal?: boolean;
  onClick?: () => void;
}

export const StartupCard: React.FC<StartupCardProps> = ({ 
  startup, 
  className,
  minimal = false,
  onClick
}) => {
  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return "text-venture-accent-success";
    if (score >= 60) return "text-venture-accent-info";
    if (score >= 40) return "text-venture-accent-warning";
    return "text-venture-accent-danger";
  };

  const getActionColor = (action?: string) => {
    switch (action) {
      case 'Priority for Investment': return "bg-venture-accent-success bg-opacity-10 text-venture-accent-success";
      case 'Schedule Call': return "bg-venture-accent-info bg-opacity-10 text-venture-accent-info";
      case 'Due Diligence Needed': return "bg-venture-accent-warning bg-opacity-10 text-venture-accent-warning";
      case 'Monitoring': return "bg-venture-gray-500 bg-opacity-10 text-venture-gray-600";
      case 'Pass': return "bg-venture-accent-danger bg-opacity-10 text-venture-accent-danger";
      default: return "bg-venture-gray-200 text-venture-gray-600";
    }
  };

  if (minimal) {
    return (
      <div 
        className={cn(
          "bg-white rounded-lg shadow-sm border border-venture-gray-200 p-4 transition-all duration-200",
          className
        )}
        onClick={onClick}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-venture-blue-900 truncate">{startup.name}</h3>
          <span className={cn(
            "text-sm font-medium",
            getMatchScoreColor(startup.matchScore)
          )}>
            {startup.matchScore}%
          </span>
        </div>
        <div className="text-xs text-venture-gray-600 mt-1">
          {startup.industry} · {startup.fundingStage}
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "bg-white rounded-lg shadow-md border border-venture-gray-200 p-4 transition-all duration-200 hover:shadow-lg",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-venture-blue-900 text-lg">{startup.name}</h3>
        <div className="text-sm">
          <span className={cn(
            "inline-block font-semibold text-base",
            getMatchScoreColor(startup.matchScore)
          )}>
            {startup.matchScore}% Match
          </span>
        </div>
      </div>
      
      <div className="flex items-center text-sm text-venture-gray-600 mb-3">
        <span className="mr-2">{startup.industry}</span>
        <span className="w-1 h-1 rounded-full bg-venture-gray-400 mr-2"></span>
        <span>{startup.fundingStage}</span>
      </div>
      
      <div className="mb-3">
        <p className="text-sm text-venture-gray-700 line-clamp-2">{startup.description}</p>
      </div>
      
      <div className="mb-3">
        <h4 className="text-xs uppercase text-venture-gray-500 font-medium mb-1">Founders</h4>
        <div className="flex flex-wrap gap-1">
          {startup.founders.map((founder, index) => (
            <span 
              key={index} 
              className="inline-flex items-center bg-venture-gray-100 rounded-md px-2 py-0.5 text-xs text-venture-blue-800"
            >
              {founder.name}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-xs text-venture-gray-600 mr-1">Success Prediction:</span>
          <span className="font-medium text-sm">{startup.predictedSuccess}%</span>
        </div>
        
        {startup.recommendedAction && (
          <span className={cn(
            "text-xs px-2 py-1 rounded-full",
            getActionColor(startup.recommendedAction)
          )}>
            {startup.recommendedAction}
          </span>
        )}
      </div>
    </div>
  );
};

export default StartupCard;
