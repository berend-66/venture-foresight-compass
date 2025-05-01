import React, { useState } from 'react';
import NavigationBar from '@/components/NavigationBar';
import UploadScreen from '@/components/UploadScreen';
import EmbeddingVisualization from '@/components/EmbeddingVisualization';
import AnalyticalDashboard from '@/components/AnalyticalDashboard';
import { AppState, Startup } from '@/types';

// Sample data for demonstration
const mockStartups: Startup[] = [
  {
    id: 'startup-1',
    name: 'Antikythera',
    industry: 'Financial Technology',
    sector: 'Finance',
    fundingStage: 'Series B',
    founders: [
      { name: 'Jason Lee', background: 'Former Goldman Sachs Quant' },
      { name: 'Lisa Chen', background: 'Stanford Ph.D. in Financial Engineering' }
    ],
    description: 'Algorithmic trading platform that uses machine learning to identify market opportunities and execute trades with minimal latency.',
    coordinates: [0.2, 0.3],
    matchScore: 92,
    predictedSuccess: 89,
    recommendedAction: 'Priority for Investment',
    metrics: {
      marketPotential: 95,
      founderStrength: 88,
      productTraction: 82,
      competitiveAdvantage: 90,
      teamCredibility: 87
    }
  },
  {
    id: 'startup-2',
    name: 'CloudSecure',
    industry: 'Cybersecurity',
    sector: 'Enterprise Software',
    fundingStage: 'Series A',
    founders: [
      { name: 'Alex Wong', background: 'Ex-Microsoft Security Engineer' },
      { name: 'Rachel Thompson', background: 'PhD in Computer Security, MIT' }
    ],
    description: 'Zero-trust cloud security platform that provides real-time threat detection and automated response capabilities for enterprise environments.',
    coordinates: [0.7, 0.2],
    matchScore: 76,
    predictedSuccess: 80,
    recommendedAction: 'Schedule Call',
    metrics: {
      marketPotential: 85,
      founderStrength: 79,
      productTraction: 65,
      competitiveAdvantage: 82,
      teamCredibility: 75
    }
  },
  {
    id: 'startup-3',
    name: 'MedAI Diagnostics',
    industry: 'Healthcare',
    sector: 'Medical Technology',
    fundingStage: 'Seed',
    founders: [
      { name: 'Dr. James Wilson', background: 'Radiologist, Harvard Medical School' },
      { name: 'Dr. Priya Patel', background: 'PhD in Machine Learning, Stanford' }
    ],
    description: 'AI-powered diagnostic tool that can detect early signs of cancer from medical imaging with higher accuracy than human radiologists.',
    coordinates: [0.4, 0.8],
    matchScore: 88,
    predictedSuccess: 82,
    recommendedAction: 'Due Diligence Needed',
    metrics: {
      marketPotential: 93,
      founderStrength: 85,
      productTraction: 70,
      competitiveAdvantage: 95,
      teamCredibility: 90
    }
  },
  {
    id: 'startup-4',
    name: 'GreenLogistics',
    industry: 'Supply Chain',
    sector: 'Logistics',
    fundingStage: 'Series A',
    founders: [
      { name: 'Marcus Johnson', background: 'Former Operations Director at DHL' },
      { name: 'Sarah Zhang', background: 'MBA, Supply Chain Management' }
    ],
    description: 'Carbon-neutral logistics platform that optimizes shipping routes and modes of transportation to reduce emissions while maintaining efficiency.',
    coordinates: [0.6, 0.5],
    matchScore: 65,
    predictedSuccess: 72,
    recommendedAction: 'Monitoring',
    metrics: {
      marketPotential: 78,
      founderStrength: 72,
      productTraction: 58,
      competitiveAdvantage: 68,
      teamCredibility: 73
    }
  },
  {
    id: 'startup-5',
    name: 'NanoMaterials',
    industry: 'Materials Science',
    sector: 'Manufacturing',
    fundingStage: 'Series B',
    founders: [
      { name: 'Dr. Robert Chen', background: 'PhD in Materials Engineering, MIT' },
      { name: 'Emily Watson', background: 'Former CTO at 3M' }
    ],
    description: 'Developing next-generation nanomaterials with applications in batteries, solar cells, and structural components with unprecedented strength-to-weight ratios.',
    coordinates: [0.3, 0.6],
    matchScore: 79,
    predictedSuccess: 81,
    recommendedAction: 'Due Diligence Needed',
    metrics: {
      marketPotential: 85,
      founderStrength: 83,
      productTraction: 65,
      competitiveAdvantage: 92,
      teamCredibility: 80
    }
  },
  {
    id: 'startup-6',
    name: 'UrbanFarm',
    industry: 'Agriculture Technology',
    sector: 'Food & Sustainability',
    fundingStage: 'Seed',
    founders: [
      { name: 'Miguel Rodriguez', background: 'Agricultural Engineer' },
      { name: 'Hannah Kim', background: 'Plant Science Researcher' }
    ],
    description: 'Vertical farming technology that enables high-yield crop production in urban environments using 95% less water than traditional agriculture.',
    coordinates: [0.8, 0.7],
    matchScore: 71,
    predictedSuccess: 68,
    recommendedAction: 'Schedule Call',
    metrics: {
      marketPotential: 80,
      founderStrength: 65,
      productTraction: 55,
      competitiveAdvantage: 75,
      teamCredibility: 68
    }
  },
  {
    id: 'startup-7',
    name: 'DataSync',
    industry: 'Enterprise Software',
    sector: 'Data Infrastructure',
    fundingStage: 'Series A',
    founders: [
      { name: 'Thomas Wright', background: 'Ex-Snowflake Engineer' },
      { name: 'Sophia Lin', background: 'Former Product Manager at MongoDB' }
    ],
    description: 'Real-time data synchronization platform that enables seamless integration between disparate systems with minimal configuration and zero downtime.',
    coordinates: [0.5, 0.4],
    matchScore: 84,
    predictedSuccess: 78,
    recommendedAction: 'Priority for Investment',
    metrics: {
      marketPotential: 82,
      founderStrength: 80,
      productTraction: 75,
      competitiveAdvantage: 85,
      teamCredibility: 78
    }
  },
  {
    id: 'startup-8',
    name: 'NeuroLearn',
    industry: 'Education Technology',
    sector: 'Education',
    fundingStage: 'Seed',
    founders: [
      { name: 'David Kim', background: 'PhD in Cognitive Science' },
      { name: 'Julia Martinez', background: 'Former Principal & Education Policy Expert' }
    ],
    description: 'Adaptive learning platform that personalizes educational content based on individual student learning patterns and neural activity feedback.',
    coordinates: [0.2, 0.7],
    matchScore: 68,
    predictedSuccess: 65,
    recommendedAction: 'Monitoring',
    metrics: {
      marketPotential: 75,
      founderStrength: 70,
      productTraction: 50,
      competitiveAdvantage: 72,
      teamCredibility: 68
    }
  },
  {
    id: 'startup-9',
    name: 'RoboAssist',
    industry: 'Robotics',
    sector: 'Healthcare',
    fundingStage: 'Series B',
    founders: [
      { name: 'Dr. Andrew Park', background: 'Robotics Engineer, Carnegie Mellon' },
      { name: 'Dr. Olivia Johnson', background: 'Physician & Medical Device Innovator' }
    ],
    description: 'Assistive robotics platform for hospitals and elder care facilities that helps with patient mobility, monitoring, and routine care tasks.',
    coordinates: [0.7, 0.8],
    matchScore: 82,
    predictedSuccess: 86,
    recommendedAction: 'Due Diligence Needed',
    metrics: {
      marketPotential: 90,
      founderStrength: 85,
      productTraction: 72,
      competitiveAdvantage: 88,
      teamCredibility: 82
    }
  },
  {
    id: 'startup-10',
    name: 'AudioAI',
    industry: 'Artificial Intelligence',
    sector: 'Media & Entertainment',
    fundingStage: 'Series A',
    founders: [
      { name: 'Carlos Mendez', background: 'Ex-Spotify Machine Learning Engineer' },
      { name: 'Emma Wilson', background: 'PhD in Audio Signal Processing' }
    ],
    description: 'AI-powered audio production suite that can automatically master tracks, generate realistic instrument sounds, and create personalized music compositions.',
    coordinates: [0.4, 0.3],
    matchScore: 73,
    predictedSuccess: 70,
    recommendedAction: 'Schedule Call',
    metrics: {
      marketPotential: 78,
      founderStrength: 75,
      productTraction: 65,
      competitiveAdvantage: 80,
      teamCredibility: 72
    }
  }
];

const Index = () => {
  const [state, setState] = useState<AppState>({
    currentScreen: 'upload',
    uploadState: {
      processingStage: 'idle',
      progress: 0
    },
    startups: mockStartups,
    filters: {}
  });

  const handleUploadComplete = (startup: Startup) => {
    // Add the newly processed startup to the list
    const updatedStartups = [startup, ...state.startups];
    
    setState({
      ...state,
      currentScreen: 'visualization',
      startups: updatedStartups,
      selectedStartup: startup
    });
  };

  const handleNavigate = (screen: 'upload' | 'visualization' | 'dashboard') => {
    setState({
      ...state,
      currentScreen: screen
    });
  };

  const handleSelectStartup = (startup: Startup) => {
    setState({
      ...state,
      selectedStartup: startup
    });
  };

  const renderCurrentScreen = () => {
    switch (state.currentScreen) {
      case 'upload':
        return (
          <UploadScreen 
            onComplete={handleUploadComplete}
          />
        );
      case 'visualization':
        return (
          <EmbeddingVisualization 
            startups={state.startups}
            selectedStartup={state.selectedStartup}
            onSelectStartup={handleSelectStartup}
          />
        );
      case 'dashboard':
        return (
          <AnalyticalDashboard 
            startups={state.startups}
            selectedStartup={state.selectedStartup}
            onSelectStartup={handleSelectStartup}
          />
        );
      default:
        return null;
    }
  };

  const hasUploadedStartup = !!state.selectedStartup;

  return (
    <div className="min-h-screen bg-venture-gray-100">
      <NavigationBar 
        currentScreen={state.currentScreen}
        onNavigate={handleNavigate}
        uploadComplete={hasUploadedStartup}
      />
      
      <main className="container mx-auto py-4">
        {renderCurrentScreen()}
      </main>
    </div>
  );
};

export default Index;
