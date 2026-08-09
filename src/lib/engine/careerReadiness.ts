import { ParsedResume, CareerReadinessScore, ATSScoreBreakdown } from '@/types';

export function calculateCareerReadiness(
  resume: ParsedResume,
  atsAnalysis?: ATSScoreBreakdown,
  interviewScore = 75
): CareerReadinessScore {
  const resumeQuality = Math.round(
    (resume.completenessScore * 0.4) + (resume.formattingQuality * 0.3) + (resume.atsReadability * 0.3)
  );

  const technicalSkills = Math.min(100, (resume.technicalSkills?.length || 0) * 6 + 40);

  const projects = Math.min(100, (resume.projects?.length || 0) * 25 + 30);

  const experience = Math.min(100, (resume.experience?.length || 0) * 30 + 35);

  const jobCompatibility = atsAnalysis ? atsAnalysis.overallScore : 82;

  const interviewReadiness = interviewScore;

  const overallScore = Math.round(
    resumeQuality * 0.20 +
    technicalSkills * 0.20 +
    projects * 0.20 +
    experience * 0.15 +
    jobCompatibility * 0.15 +
    interviewReadiness * 0.10
  );

  const recommendations: string[] = [];

  if (resumeQuality < 85) {
    recommendations.push("Enhance resume section descriptions and remove non-standard formatting elements.");
  }
  if (projects < 80) {
    recommendations.push("Add at least one more full-stack or AI project demonstrating backend architecture and cloud deployment.");
  }
  if (interviewReadiness < 80) {
    recommendations.push("Complete interactive mock interview practice rounds for System Design and HR questions.");
  }

  return {
    overallScore,
    resumeQuality,
    technicalSkills,
    projects,
    experience,
    jobCompatibility,
    interviewReadiness,
    recommendations
  };
}
