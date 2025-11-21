export interface MetricData {
  metric: string;
  B0: number;
  B1: number;
  fullMark: number;
}

export interface SpeedData {
  model: string;
  time: number; // seconds per patch
}

export enum TabView {
  CONTEXT = 'Context',
  METHODOLOGY = 'Methodology',
  RESULTS = 'Results',
  DEMO = 'Demo'
}

export interface ArchitectureStep {
  id: string;
  title: string;
  description: string;
  details: string[];
}