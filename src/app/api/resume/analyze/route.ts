import { NextRequest, NextResponse } from 'next/server';
import { calculateATSScore } from '@/lib/engine/atsScorer';
import { calculateCareerReadiness } from '@/lib/engine/careerReadiness';
import { ParsedResume } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const resume: ParsedResume = body.resume;
    const jobDescription: string = body.jobDescription || 'Full Stack Software Engineer React Next.js TypeScript Node.js PostgreSQL AWS Docker';
    const jobTitle: string = body.jobTitle || 'Full Stack Engineer';

    if (!resume) {
      return NextResponse.json({ success: false, error: 'Resume object is required' }, { status: 400 });
    }

    const atsBreakdown = calculateATSScore(resume, jobDescription, jobTitle);
    const careerReadiness = calculateCareerReadiness(resume, atsBreakdown);

    return NextResponse.json({
      success: true,
      data: {
        ats: atsBreakdown,
        careerReadiness
      }
    });
  } catch (error: any) {
    console.error('Error in /api/resume/analyze:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
