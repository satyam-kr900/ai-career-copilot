import { describe, it, expect } from 'vitest';
import { calculateATSScore } from '../lib/engine/atsScorer';
import { ParsedResume } from '../types';

describe('ATS Scoring Engine Unit Tests', () => {
  const sampleResume: ParsedResume = {
    name: "Satyam Kumar",
    email: "satyam@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    linkedIn: "",
    gitHub: "",
    portfolio: "",
    summary: "Senior Full Stack Software Engineer experienced in React, Next.js, Node.js, and TypeScript.",
    education: [{ institution: "Stanford", degree: "BS", fieldOfStudy: "CS" }],
    experience: [
      {
        company: "TechScale",
        role: "Full Stack Engineer",
        bulletPoints: ["Engineered React web apps."],
        technologiesUsed: ["React", "TypeScript", "Node.js"]
      }
    ],
    internships: [],
    projects: [
      {
        title: "KnowSamvidhan",
        description: "AI RAG app",
        technologies: ["Next.js", "TypeScript"],
        bulletPoints: ["Built Next.js app"]
      }
    ],
    technicalSkills: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    softSkills: ["Problem Solving"],
    certifications: ["AWS Certified"],
    achievements: [],
    publications: [],
    languages: ["English"],
    detectedSections: ["SUMMARY", "EXPERIENCE", "SKILLS"],
    completenessScore: 90,
    sectionQuality: 88,
    formattingQuality: 92,
    atsReadability: 90
  };

  it('calculates weighted ATS score above 80 for strong matching resume', () => {
    const result = calculateATSScore(sampleResume, 'Looking for Senior Full Stack Engineer with React, Next.js, TypeScript, and Node.js');
    expect(result.overallScore).toBeGreaterThanOrEqual(75);
    expect(result.positiveFactors.length).toBeGreaterThan(0);
    expect(result.explanations.length).toBeGreaterThan(0);
  });
});
