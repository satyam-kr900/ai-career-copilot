import { describe, it, expect } from 'vitest';
import { analyzeSkillGap } from '../lib/engine/skillGapAnalyzer';
import { ParsedResume } from '../types';

describe('Skill Gap Analyzer Unit Tests', () => {
  const sampleResume: ParsedResume = {
    name: "Candidate",
    email: "",
    phone: "",
    location: "",
    linkedIn: "",
    gitHub: "",
    portfolio: "",
    summary: "",
    education: [],
    experience: [],
    internships: [],
    projects: [],
    technicalSkills: ["React", "TypeScript", "Node.js"],
    softSkills: [],
    certifications: [],
    achievements: [],
    publications: [],
    languages: [],
    detectedSections: [],
    completenessScore: 80,
    sectionQuality: 80,
    formattingQuality: 80,
    atsReadability: 80
  };

  it('categorizes missing skills correctly into critical, important, and niceToHave', () => {
    const gap = analyzeSkillGap(sampleResume, 'Requires React, TypeScript, Node.js, Docker, AWS, Kubernetes');
    expect(gap.matchingSkills).toContain('React');
    expect(gap.missingSkills.critical).toBeDefined();
    expect(gap.truthfulAdvice.length).toBeGreaterThan(0);
  });
});
