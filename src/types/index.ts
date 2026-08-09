export interface ParsedResume {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedIn: string;
  gitHub: string;
  portfolio: string;
  summary: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  internships: ExperienceEntry[];
  projects: ProjectEntry[];
  technicalSkills: string[];
  softSkills: string[];
  certifications: string[];
  achievements: string[];
  publications: string[];
  languages: string[];
  detectedSections: string[];
  completenessScore: number;
  sectionQuality: number;
  formattingQuality: number;
  atsReadability: number;
}

export interface EducationEntry {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate?: string;
  endDate?: string;
  gpa?: string;
  highlights?: string[];
}

export interface ExperienceEntry {
  company: string;
  role: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  bulletPoints: string[];
  technologiesUsed?: string[];
}

export interface ProjectEntry {
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  bulletPoints: string[];
}

export interface ATSScoreBreakdown {
  overallScore: number;
  keywordMatch: number;
  skillsMatch: number;
  experienceMatch: number;
  educationMatch: number;
  projectRelevance: number;
  jobTitleMatch: number;
  resumeStructure: number;
  formattingCompatibility: number;
  positiveFactors: string[];
  negativeFactors: string[];
  explanations: string[];
}

export interface SkillGapResult {
  candidateSkills: string[];
  requiredSkills: string[];
  matchingSkills: string[];
  missingSkills: {
    critical: string[];
    important: string[];
    niceToHave: string[];
  };
  relatedSkills: string[];
  truthfulAdvice: string[];
}

export interface BulletOptimization {
  original: string;
  improved: string;
  reasoning: string;
  metricsSuggested?: string;
}

export interface JobTailoringResult {
  targetJobTitle: string;
  targetedSummary: string;
  relevantSkills: string[];
  optimizedProjects: {
    title: string;
    originalBullets: string[];
    improvedBullets: string[];
  }[];
  optimizedExperience: {
    company: string;
    role: string;
    originalBullets: string[];
    improvedBullets: string[];
  }[];
  recommendedKeywords: string[];
}

export interface ProjectRelevanceResult {
  projectTitle: string;
  relevanceScore: number;
  matchingTechnologies: string[];
  missingTechnologies: string[];
  interviewTips: string[];
}

export interface CareerReadinessScore {
  overallScore: number;
  resumeQuality: number;
  technicalSkills: number;
  projects: number;
  experience: number;
  jobCompatibility: number;
  interviewReadiness: number;
  recommendations: string[];
}

export interface LearningRoadmap {
  roleTitle: string;
  day7: RoadmapTask[];
  day30: RoadmapTask[];
  day60: RoadmapTask[];
}

export interface RoadmapTask {
  id: string;
  topic: string;
  description: string;
  skill: string;
  resources: string[];
  completed: boolean;
}

export interface InterviewQuestionItem {
  id: string;
  category: 'TECHNICAL' | 'PROJECT' | 'HR' | 'BEHAVIORAL' | 'CODING' | 'SQL' | 'SYSTEM_DESIGN';
  question: string;
  whyAsked: string;
  expectedAnswerPoints: string[];
  sampleAnswer: string;
  followUpQuestions: string[];
}

export interface InterviewAnswerEvaluation {
  score: number;
  strengths: string[];
  weaknesses: string[];
  betterAnswer: string;
  nextQuestion?: InterviewQuestionItem;
}

export interface ResumeVersionItem {
  id: string;
  versionName: string;
  targetJob: string;
  atsScore: number;
  previousScore?: number;
  lastUpdated: string;
  changes: string;
}

export interface ScoreHistoryPoint {
  month: string;
  atsScore: number;
  skillMatch: number;
  resumeQuality: number;
}
