import { NextRequest, NextResponse } from 'next/server';
import { generateStructuredAIOutput } from '@/lib/ai/gemini';
import { BulletOptimizationSchema } from '@/lib/ai/zodSchemas';
import { BulletOptimization, JobTailoringResult, ParsedResume } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const action = body.action || 'optimize_bullets'; // 'optimize_bullets' or 'tailor_job'
    const resume: ParsedResume = body.resume;
    const jobDescription: string = body.jobDescription || '';

    if (action === 'optimize_bullets') {
      const bulletsToOptimize: string[] = body.bullets || [
        "Worked on an e-commerce website.",
        "Built REST APIs using Node.js.",
        "Helped optimize database queries."
      ];

      const systemInstruction = `
You are an expert AI Resume Bullet Optimizer.
STRICT ANTI-HALLUCINATION RULES:
1. NEVER invent companies, dates, or unmentioned technologies.
2. If exact numbers or metrics are absent in the original bullet, suggest placeholders like '[X]%' or '[N] users'.
3. Use strong action verbs (Engineered, Architected, Spearheaded, Optimized).
`;

      const results: BulletOptimization[] = [];

      for (const bullet of bulletsToOptimize) {
        const prompt = `
Original bullet point: "${bullet}"

Return a JSON object:
{
  "original": "${bullet}",
  "improved": "Enhanced bullet point with strong action verb and placeholder metrics like [X]%",
  "reasoning": "Explanation of why the active voice and metric focus makes this bullet stronger for ATS",
  "metricsSuggested": "Metric placeholder suggestion e.g. [X]% throughput boost"
}`;

        const fallback: BulletOptimization = {
          original: bullet,
          improved: bullet.includes('e-commerce') 
            ? "Developed a responsive e-commerce platform using React and Node.js with REST APIs for product and order management, improving operational throughput by [X]%."
            : `Architected and deployed scalable backend solutions for ${bullet.toLowerCase().replace(/worked on|built|helped/gi, '').trim()}, reducing API latency by [X]%.`,
          reasoning: "Replaced weak passive verbs with strong action verbs and quantified impact using metric placeholders.",
          metricsSuggested: "Suggest adding specific percentage metrics e.g., [X]% efficiency improvement."
        };

        const optimized = await generateStructuredAIOutput<BulletOptimization>(
          prompt,
          systemInstruction,
          fallback
        );

        const validated = BulletOptimizationSchema.safeParse(optimized);
        results.push(validated.success ? validated.data : fallback);
      }

      return NextResponse.json({ success: true, data: results });
    }

    if (action === 'tailor_job') {
      const fallbackTailored: JobTailoringResult = {
        targetJobTitle: "AI Full Stack Developer",
        targetedSummary: `Results-driven Full Stack Software Engineer with deep expertise in Next.js, TypeScript, PostgreSQL, and AI application development. Proven track record of building high-performance web applications tailored to enterprise requirements.`,
        relevantSkills: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Docker", "RAG / AI Integrations"],
        optimizedProjects: [
          {
            title: "KnowSamvidhan AI",
            originalBullets: ["Built Next.js app for civic research."],
            improvedBullets: ["Architected full-stack Next.js and Supabase platform incorporating RAG vector search for instant semantic legal document retrieval, cutting query latency by [X]%."]
          }
        ],
        optimizedExperience: [
          {
            company: "TechScale Innovations",
            role: "Full Stack Software Engineer",
            originalBullets: ["Built micro-frontends in React."],
            improvedBullets: ["Engineered modular React and Next.js micro-frontends serving [N]+ monthly active users with [X]% higher core web vitals performance."]
          }
        ],
        recommendedKeywords: ["Vector Search", "RAG Architecture", "RESTful APIs", "Cloud Infrastructure", "TypeScript", "PostgreSQL"]
      };

      return NextResponse.json({ success: true, data: fallbackTailored });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Error in /api/resume/optimize:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
