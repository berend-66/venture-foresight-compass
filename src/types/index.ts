
export interface Startup {
  id: string;
  name: string;
  industry: string;
  sector: string;
  fundingStage: string;
  founders: Founder[];
  description: string;
  coordinates: [number, number]; // [x, y] for the 2D embedding
  matchScore: number; // 0-100
  predictedSuccess: number; // 0-100
  recommendedAction?: RecommendedAction;
  metrics: StartupMetrics;
}

export interface Founder {
  name: string;
  background: string;
  linkedIn?: string;
}

export interface StartupMetrics {
  marketPotential: number; // 0-100
  founderStrength: number; // 0-100
  productTraction: number; // 0-100
  competitiveAdvantage: number; // 0-100
  teamCredibility: number; // 0-100
}

export type RecommendedAction = 
  | 'Priority for Investment'
  | 'Schedule Call'
  | 'Due Diligence Needed'
  | 'Monitoring'
  | 'Pass';

export type ProcessingStage = 
  | 'idle'
  | 'uploading'
  | 'processing'
  | 'analyzing'
  | 'complete'
  | 'error';

export interface IndustryCluster {
  id: string;
  name: string;
  color: string;
}

export interface UploadState {
  file?: File;
  processingStage: ProcessingStage;
  progress: number; // 0-100
  processedStartup?: Startup;
  error?: string;
}

export interface AppState {
  currentScreen: 'upload' | 'visualization' | 'dashboard';
  uploadState: UploadState;
  startups: Startup[];
  selectedStartup?: Startup;
  filters: {
    industry?: string;
    fundingStage?: string;
    minMatchScore?: number;
  }
}
