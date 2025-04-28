import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Startup, RecommendedAction } from '@/types';
import RadarChart from './RadarChart';
import StartupCard from './StartupCard';

interface AnalyticalDashboardProps {
  startups: Startup[];
  selectedStartup?: Startup;
  className?: string;
}

export const AnalyticalDashboard: React.FC<AnalyticalDashboardProps> = ({
  startups,
  selectedStartup,
  className
}) => {
  const [sortBy, setSortBy] = useState<'matchScore' | 'predictedSuccess'>('matchScore');
  const [filterIndustry, setFilterIndustry] = useState<string | undefined>(undefined);
  const [filterStage, setFilterStage] = useState<string | undefined>(undefined);
  
  if (!selectedStartup) {
    return (
      <div className={cn("p-6 text-center", className)}>
        <p className="text-venture-gray-600">
          Please upload and analyze a startup pitch to view the analytical dashboard.
        </p>
      </div>
    );
  }

  // Create benchmark data based on average metrics of top performers
  const benchmarkData = {
    marketPotential: 85,
    founderStrength: 80,
    productTraction: 75,
    competitiveAdvantage: 82,
    teamCredibility: 88
  };
  
  // Extract unique industries and stages for filters
  const industries = Array.from(new Set(startups.map(s => s.industry)));
  const stages = Array.from(new Set(startups.map(s => s.fundingStage)));
  
  // Apply filters and sorting
  const filteredStartups = startups.filter(startup => {
    if (filterIndustry && startup.industry !== filterIndustry) return false;
    if (filterStage && startup.fundingStage !== filterStage) return false;
    return true;
  });
  
  const sortedStartups = [...filteredStartups].sort((a, b) => {
    return b[sortBy] - a[sortBy];
  });
  
  // Get action color for recommended actions
  const getActionColor = (action?: RecommendedAction) => {
    switch (action) {
      case 'Priority for Investment': return "bg-venture-accent-success";
      case 'Schedule Call': return "bg-venture-accent-info";
      case 'Due Diligence Needed': return "bg-venture-accent-warning";
      case 'Monitoring': return "bg-venture-gray-500";
      case 'Pass': return "bg-venture-accent-danger";
      default: return "bg-venture-gray-400";
    }
  };

  return (
    <div className={cn("p-6", className)}>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-venture-blue-900 mb-2">
          Analytical Dashboard
        </h1>
        <p className="text-venture-gray-600">
          Comprehensive analysis of the startup's potential and key performance metrics.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main metrics and radar chart */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-venture-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-medium text-venture-blue-900 mb-4">
                  {selectedStartup.name}
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-venture-gray-600 text-sm">Match Score</span>
                    <div className="flex items-center">
                      <div className="text-2xl font-semibold text-venture-blue-900 mr-2">
                        {selectedStartup.matchScore}%
                      </div>
                      <div className={cn(
                        "text-xs px-2 py-1 rounded-full text-white",
                        selectedStartup.matchScore >= 80 ? "bg-venture-accent-success" :
                        selectedStartup.matchScore >= 60 ? "bg-venture-accent-info" :
                        selectedStartup.matchScore >= 40 ? "bg-venture-accent-warning" :
                        "bg-venture-accent-danger"
                      )}>
                        {selectedStartup.matchScore >= 80 ? "Excellent" :
                         selectedStartup.matchScore >= 60 ? "Good" :
                         selectedStartup.matchScore >= 40 ? "Fair" :
                         "Poor"}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-venture-gray-600 text-sm">Success Probability</span>
                    <div className="flex items-center">
                      <div className="text-2xl font-semibold text-venture-blue-900 mr-2">
                        {selectedStartup.predictedSuccess}%
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-venture-gray-600 text-sm">Recommended Action</span>
                    <div className="flex items-center mt-1">
                      <div className={cn(
                        "px-3 py-1.5 rounded-md text-white text-sm font-medium",
                        getActionColor(selectedStartup.recommendedAction)
                      )}>
                        {selectedStartup.recommendedAction}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-venture-gray-600 text-sm">Industry & Stage</span>
                    <div className="flex items-center mt-1">
                      <span className="bg-venture-gray-100 px-2 py-1 rounded text-sm text-venture-blue-800 mr-2">
                        {selectedStartup.industry}
                      </span>
                      <span className="bg-venture-gray-100 px-2 py-1 rounded text-sm text-venture-blue-800">
                        {selectedStartup.fundingStage}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-venture-gray-600 mb-3">
                  Comparative Analysis
                </h3>
                <RadarChart 
                  startup={selectedStartup}
                  benchmarkData={benchmarkData}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Startups listing with filters */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-venture-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-venture-blue-900">
                Similar Startups
              </h3>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <select
                className="text-sm border border-venture-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-venture-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="matchScore">Sort by Match Score</option>
                <option value="predictedSuccess">Sort by Success Probability</option>
              </select>
              
              <select
                className="text-sm border border-venture-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-venture-blue-500"
                value={filterIndustry || ''}
                onChange={(e) => setFilterIndustry(e.target.value || undefined)}
              >
                <option value="">All Industries</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
              
              <select
                className="text-sm border border-venture-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-venture-blue-500"
                value={filterStage || ''}
                onChange={(e) => setFilterStage(e.target.value || undefined)}
              >
                <option value="">All Stages</option>
                {stages.map(stage => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
              
              {(filterIndustry || filterStage) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFilterIndustry(undefined);
                    setFilterStage(undefined);
                  }}
                  className="text-xs"
                >
                  Clear Filters
                </Button>
              )}
            </div>
            
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {sortedStartups.slice(0, 10).map(startup => (
                <StartupCard 
                  key={startup.id} 
                  startup={startup}
                  minimal
                  className={cn(
                    "transition-all",
                    startup.id === selectedStartup.id ? "border-venture-blue-600 shadow-sm" : ""
                  )}
                />
              ))}
              
              {sortedStartups.length === 0 && (
                <div className="text-center py-8 text-venture-gray-500">
                  No startups match the selected filters
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to format metric names
function formatMetricName(metric: string): string {
  const words = metric.replace(/([A-Z])/g, ' $1').trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export default AnalyticalDashboard;
