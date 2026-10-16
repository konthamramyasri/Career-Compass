
export type CareerField = 'ai' | 'cyber' | 'software' | 'data';

export interface FormData {
  careerInterest: CareerField;
  studyField: string;
  educationLevel: string;
  academicPerformance: string;
  careerGoal: string;
  timeDedication: string;
  workEnvironment: string;
  currentSkills: string[];
}

export interface JobRecommendation {
  title: string;
  description: string;
  skills: string[];
  companies: string[];
  salary: string;
  growth: string;
}

export interface LearningPhase {
  title: string;
  description: string;
  tasks: string[];
}

export interface RecommendedResource {
  title: string;
  type: string;
  platform: string;
  link: string;
  description: string;
}

export interface CareerPlan {
  summary: string;
  jobRecommendations: JobRecommendation[];
  learningPathway: LearningPhase[];
  skillsToDevelop: string[];
  recommendedResources: RecommendedResource[];
  resumeTips: string[];
}
