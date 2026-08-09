import { z } from 'zod';

export const ParsedResumeSchema = z.object({
  name: z.string().default("Candidate"),
  email: z.string().default(""),
  phone: z.string().default(""),
  location: z.string().default(""),
  linkedIn: z.string().default(""),
  gitHub: z.string().default(""),
  portfolio: z.string().default(""),
  summary: z.string().default(""),
  education: z.array(z.object({
    institution: z.string(),
    degree: z.string(),
    fieldOfStudy: z.string().default(""),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    gpa: z.string().optional(),
    highlights: z.array(z.string()).default([])
  })).default([]),
  experience: z.array(z.object({
    company: z.string(),
    role: z.string(),
    location: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    current: z.boolean().default(false),
    bulletPoints: z.array(z.string()).default([]),
    technologiesUsed: z.array(z.string()).default([])
  })).default([]),
  internships: z.array(z.object({
    company: z.string(),
    role: z.string(),
    location: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    bulletPoints: z.array(z.string()).default([])
  })).default([]),
  projects: z.array(z.object({
    title: z.string(),
    description: z.string(),
    technologies: z.array(z.string()).default([]),
    liveUrl: z.string().optional(),
    githubUrl: z.string().optional(),
    bulletPoints: z.array(z.string()).default([])
  })).default([]),
  technicalSkills: z.array(z.string()).default([]),
  softSkills: z.array(z.string()).default([]),
  certifications: z.array(z.string()).default([]),
  achievements: z.array(z.string()).default([]),
  publications: z.array(z.string()).default([]),
  languages: z.array(z.string()).default([]),
  detectedSections: z.array(z.string()).default([]),
  completenessScore: z.number().default(75),
  sectionQuality: z.number().default(80),
  formattingQuality: z.number().default(85),
  atsReadability: z.number().default(80)
});

export const ATSAnalysisSchema = z.object({
  overallScore: z.number().min(0).max(100),
  keywordMatch: z.number().min(0).max(100),
  skillsMatch: z.number().min(0).max(100),
  experienceMatch: z.number().min(0).max(100),
  educationMatch: z.number().min(0).max(100),
  projectRelevance: z.number().min(0).max(100),
  jobTitleMatch: z.number().min(0).max(100),
  resumeStructure: z.number().min(0).max(100),
  formattingCompatibility: z.number().min(0).max(100),
  positiveFactors: z.array(z.string()),
  negativeFactors: z.array(z.string()),
  explanations: z.array(z.string())
});

export const BulletOptimizationSchema = z.object({
  original: z.string(),
  improved: z.string(),
  reasoning: z.string(),
  metricsSuggested: z.string().optional()
});

export const CoverLetterSchema = z.object({
  coverLetter: z.string(),
  keyHighlights: z.array(z.string()),
  tailoredFor: z.string()
});

export const InterviewQuestionSchema = z.object({
  id: z.string(),
  category: z.enum(['TECHNICAL', 'PROJECT', 'HR', 'BEHAVIORAL', 'CODING', 'SQL', 'SYSTEM_DESIGN']),
  question: z.string(),
  whyAsked: z.string(),
  expectedAnswerPoints: z.array(z.string()),
  sampleAnswer: z.string(),
  followUpQuestions: z.array(z.string())
});

export const InterviewQuestionsListSchema = z.array(InterviewQuestionSchema);

export const InterviewAnswerEvaluationSchema = z.object({
  score: z.number().min(0).max(100),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  betterAnswer: z.string()
});
