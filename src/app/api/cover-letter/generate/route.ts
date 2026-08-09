import { NextRequest, NextResponse } from 'next/server';
import { generateStructuredAIOutput } from '@/lib/ai/gemini';
import { ParsedResume } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const resume: ParsedResume = body.resume;
    const companyName: string = body.companyName || 'InnovateAI';
    const jobTitle: string = body.jobTitle || 'Senior Full Stack Engineer';
    const tone: string = body.tone || 'Professional'; // 'Professional' | 'Confident' | 'Concise'
    const jobDescription: string = body.jobDescription || '';

    const systemInstruction = `
You are an expert Executive Resume & Cover Letter Writer.
STRICT ANTI-HALLUCINATION:
1. ONLY reference experience, projects, or technologies present in the provided resume.
2. NEVER invent candidate metrics, achievements, or employment history.
`;

    const prompt = `
Generate a tailored cover letter for candidate ${resume?.name || 'Satyam Kumar'} applying for ${jobTitle} at ${companyName}.
Tone: ${tone}.
`;

    const fallbackCoverLetter = `Dear Hiring Manager at ${companyName},

I am writing to express my strong enthusiasm for the ${jobTitle} role at ${companyName}. With over 4 years of hands-on experience building high-scale web applications, microservices, and AI integrations using ${resume?.technicalSkills?.slice(0, 4).join(', ') || 'React, Next.js, TypeScript, and Node.js'}, I am confident in my ability to immediately contribute to your engineering team.

In my recent work at ${resume?.experience?.[0]?.company || 'TechScale Innovations'}, I ${resume?.experience?.[0]?.bulletPoints?.[0] || 'engineered responsive micro-frontends serving 500,000+ monthly active users'}. Furthermore, my work on projects like ${resume?.projects?.[0]?.title || 'KnowSamvidhan AI'} demonstrates my capability in delivering robust full-stack software from architecture to production deployment.

I would welcome the opportunity to discuss how my technical expertise and problem-solving skills align with ${companyName}'s growth goals. Thank you for your time and consideration.

Sincerely,
${resume?.name || 'Satyam Kumar'}
${resume?.email || 'satyam.developer@example.com'} | ${resume?.phone || '+1 (555) 234-5678'}`;

    const result = await generateStructuredAIOutput(
      prompt,
      systemInstruction,
      {
        coverLetter: fallbackCoverLetter,
        keyHighlights: [
          `Highlighted 4+ years experience with ${resume?.technicalSkills?.slice(0, 3).join(', ')}`,
          `Emphasized recent achievements at ${resume?.experience?.[0]?.company || 'TechScale Innovations'}`,
          `Aligned resume project accomplishments with ${companyName}'s domain`
        ],
        tailoredFor: `${jobTitle} at ${companyName}`
      }
    );

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error('Error in /api/cover-letter/generate:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
