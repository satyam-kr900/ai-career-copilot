import { ParsedResume, SkillGapResult } from '@/types';
import { calculateSemanticTermSimilarity } from '../ai/embeddings';

export function analyzeSkillGap(resume: ParsedResume, jobText: string): SkillGapResult {
  const candidateSkills = Array.from(new Set(
    (resume.technicalSkills || []).map(s => s.trim())
  ));

  const commonJobSkills = [
    "Python", "SQL", "React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Express",
    "PostgreSQL", "MongoDB", "Redis", "Docker", "AWS", "Kubernetes", "GraphQL", "REST APIs",
    "Tailwind CSS", "Prisma", "CI/CD", "Git", "Jest", "Microservices", "System Design"
  ];

  const normalizedJobText = jobText.toLowerCase();

  const requiredSkills = commonJobSkills.filter(skill => 
    normalizedJobText.includes(skill.toLowerCase())
  );

  // Default required skills if job text is short
  const finalRequiredSkills = requiredSkills.length > 0 ? requiredSkills : ["React", "TypeScript", "Node.js", "SQL", "Docker", "AWS"];

  const matchingSkills: string[] = [];
  const missingSkillsList: string[] = [];
  const relatedSkills: string[] = [];

  finalRequiredSkills.forEach(req => {
    const exactMatch = candidateSkills.find(cs => cs.toLowerCase() === req.toLowerCase());
    if (exactMatch) {
      matchingSkills.push(exactMatch);
    } else {
      // Check semantic match
      const highestSemanticMatch = candidateSkills.find(cs => calculateSemanticTermSimilarity(cs, req) >= 0.75);
      if (highestSemanticMatch) {
        matchingSkills.push(req);
        relatedSkills.push(`${req} (related to candidate's ${highestSemanticMatch})`);
      } else {
        missingSkillsList.push(req);
      }
    }
  });

  // Categorize missing skills into Critical, Important, Nice-to-have
  const critical = missingSkillsList.slice(0, 2);
  const important = missingSkillsList.slice(2, 4);
  const niceToHave = missingSkillsList.slice(4);

  // Truthful advice: Never force users to claim unpossessed skills
  const truthfulAdvice: string[] = [
    "Maintain strict integrity: Do not claim skills on your resume until you have built real projects with them.",
    ...missingSkillsList.map(skill => `You may consider learning ${skill} to strengthen your profile for target roles.`)
  ];

  return {
    candidateSkills,
    requiredSkills: finalRequiredSkills,
    matchingSkills,
    missingSkills: {
      critical: critical.length > 0 ? critical : ["Docker"],
      important: important.length > 0 ? important : ["AWS"],
      niceToHave: niceToHave.length > 0 ? niceToHave : ["Kubernetes"]
    },
    relatedSkills,
    truthfulAdvice
  };
}
