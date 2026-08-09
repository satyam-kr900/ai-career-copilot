import { describe, it, expect } from 'vitest';
import { ATSAnalysisSchema, BulletOptimizationSchema } from '../lib/ai/zodSchemas';

describe('Zod Schema Validation Unit Tests', () => {
  it('validates ATS analysis output correctly', () => {
    const data = {
      overallScore: 85,
      keywordMatch: 80,
      skillsMatch: 90,
      experienceMatch: 85,
      educationMatch: 95,
      projectRelevance: 88,
      jobTitleMatch: 90,
      resumeStructure: 92,
      formattingCompatibility: 95,
      positiveFactors: ['Strong skill match'],
      negativeFactors: ['Missing AWS keyword'],
      explanations: ['Score is 85/100']
    };

    const validation = ATSAnalysisSchema.safeParse(data);
    expect(validation.success).toBe(true);
  });

  it('validates bullet point optimization format', () => {
    const bullet = {
      original: "Worked on website",
      improved: "Engineered responsive e-commerce web platform using React.",
      reasoning: "Action verb replacement",
      metricsSuggested: "[X]% performance gain"
    };

    const validation = BulletOptimizationSchema.safeParse(bullet);
    expect(validation.success).toBe(true);
  });
});
