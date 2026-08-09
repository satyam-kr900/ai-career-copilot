import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      totalUsers: 1420,
      totalAnalyses: 8940,
      averageAtsScore: 78.4,
      mostCommonMissingSkills: [
        { skill: 'Docker', count: 620 },
        { skill: 'AWS', count: 540 },
        { skill: 'System Design', count: 410 },
        { skill: 'Kubernetes', count: 380 },
        { skill: 'GraphQL', count: 290 }
      ],
      topTargetRoles: [
        { role: 'Full Stack Software Engineer', percentage: 38 },
        { role: 'AI / Machine Learning Engineer', percentage: 27 },
        { role: 'Frontend React Developer', percentage: 20 },
        { role: 'Backend Node.js / Python Developer', percentage: 15 }
      ],
      aiUsageStats: {
        totalTokensProcessed: '14.2M',
        avgLatencyMs: 420,
        zodValidationSuccessRate: '99.8%'
      }
    }
  });
}
