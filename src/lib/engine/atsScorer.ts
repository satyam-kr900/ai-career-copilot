import { ParsedResume, ATSScoreBreakdown } from '@/types';
import { calculateSemanticTermSimilarity } from '../ai/embeddings';

export function calculateATSScore(resume: ParsedResume, jobText: string, jobTitle?: string): ATSScoreBreakdown {
  const normalizedJobText = jobText.toLowerCase();
  
  // Extract target job keywords
  const targetKeywords = Array.from(new Set(
    jobText.match(/\b[a-zA-Z0-9+#.-]{3,}\b/g) || []
  )).filter(w => !['the', 'and', 'with', 'from', 'this', 'that', 'have', 'your', 'will', 'for'].includes(w.toLowerCase()));

  // 1. Keyword Match Score
  let keywordHits = 0;
  const resumeText = JSON.stringify(resume).toLowerCase();
  
  targetKeywords.forEach(kw => {
    if (resumeText.includes(kw.toLowerCase())) {
      keywordHits++;
    }
  });

  const keywordMatch = Math.min(100, Math.round((keywordHits / Math.max(1, targetKeywords.length)) * 140));

  // 2. Technical Skills Match
  const candidateSkills = resume.technicalSkills.map(s => s.toLowerCase());
  let skillMatchesCount = 0;
  
  // Common key tech terms to test against job text
  const requiredTechSkills = [
    "react", "next.js", "typescript", "javascript", "node.js", "express",
    "python", "sql", "postgresql", "docker", "aws", "git", "rest", "graphql",
    "tailwind", "prisma", "mongodb", "ci/cd", "redis", "html", "css"
  ].filter(skill => normalizedJobText.includes(skill));

  const targetSkillList = requiredTechSkills.length > 0 ? requiredTechSkills : ["react", "typescript", "node.js", "sql", "git"];

  targetSkillList.forEach(reqSkill => {
    const hasExact = candidateSkills.some(cs => cs.includes(reqSkill) || reqSkill.includes(cs));
    if (hasExact) {
      skillMatchesCount += 1;
    } else {
      // Check semantic similarity
      const maxSemantic = Math.max(0, ...candidateSkills.map(cs => calculateSemanticTermSimilarity(cs, reqSkill)));
      if (maxSemantic > 0.75) {
        skillMatchesCount += 0.85;
      }
    }
  });

  const skillsMatch = Math.min(100, Math.round((skillMatchesCount / Math.max(1, targetSkillList.length)) * 100));

  // 3. Experience Match
  const yearsExp = (resume.experience?.length || 0) * 2;
  const expMatch = Math.min(100, Math.round((yearsExp / 4) * 85 + 15));

  // 4. Education Match
  const hasDegree = resume.education && resume.education.length > 0;
  const educationMatch = hasDegree ? 95 : 60;

  // 5. Project Relevance
  const hasProjects = resume.projects && resume.projects.length > 0;
  const projectRelevance = hasProjects ? 88 : 50;

  // 6. Job Title Match
  const targetTitleNorm = (jobTitle || "Software Engineer").toLowerCase();
  const expTitles = resume.experience.map(e => e.role.toLowerCase());
  const hasTitleMatch = expTitles.some(t => t.includes(targetTitleNorm) || targetTitleNorm.includes(t));
  const jobTitleMatch = hasTitleMatch ? 95 : 72;

  // 7. Resume Structure & Formatting
  const resumeStructure = resume.completenessScore;
  const formattingCompatibility = resume.formattingQuality;

  // Weighted Overall ATS Score calculation
  // Keywords (20%), Skills (25%), Exp (20%), Edu (10%), Projects (15%), Title (5%), Structure/Formatting (5%)
  const overallScore = Math.round(
    keywordMatch * 0.20 +
    skillsMatch * 0.25 +
    expMatch * 0.20 +
    educationMatch * 0.10 +
    projectRelevance * 0.15 +
    jobTitleMatch * 0.05 +
    formattingCompatibility * 0.05
  );

  // Positive & Negative Factor derivation
  const positiveFactors: string[] = [];
  const negativeFactors: string[] = [];
  const explanations: string[] = [];

  if (skillsMatch >= 80) {
    positiveFactors.push(`Strong alignment in key technical skills (${skillsMatch}% match).`);
  } else {
    negativeFactors.push(`Missing several core technical skills required in job description.`);
  }

  if (keywordMatch >= 75) {
    positiveFactors.push(`High density of relevant industry terms and action verbs.`);
  } else {
    negativeFactors.push(`Keyword match is ${keywordMatch}%; include more exact terms from job posting.`);
  }

  if (resume.projects && resume.projects.length >= 2) {
    positiveFactors.push(`Projects demonstrate practical application of required stack.`);
  } else {
    negativeFactors.push(`Add more detailed project bullet points matching target requirements.`);
  }

  if (formattingCompatibility >= 90) {
    positiveFactors.push(`Clean, standard section headings readable by standard ATS parsers (Workday, Greenhouse, Taleo).`);
  }

  explanations.push(`Overall ATS score of ${overallScore}/100 calculated using weighted keyword, skill, project, and experience evaluation.`);
  explanations.push(`Technical Skills match is ${skillsMatch}%, driven by strong matches in ${resume.technicalSkills.slice(0, 4).join(', ')}.`);
  explanations.push(`Resume structure scored ${resumeStructure}/100 with ${resume.detectedSections.length} clearly identified sections.`);

  return {
    overallScore,
    keywordMatch,
    skillsMatch,
    experienceMatch: expMatch,
    educationMatch,
    projectRelevance,
    jobTitleMatch,
    resumeStructure,
    formattingCompatibility,
    positiveFactors,
    negativeFactors,
    explanations
  };
}
