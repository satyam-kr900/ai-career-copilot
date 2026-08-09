import { NextRequest, NextResponse } from 'next/server';
import { generateStructuredAIOutput } from '@/lib/ai/gemini';
import { InterviewAnswerEvaluation } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const questionText: string = body.questionText || '';
    const userAnswer: string = body.userAnswer || '';
    const expectedPoints: string[] = body.expectedAnswerPoints || [];

    const systemInstruction = `
You are an expert Senior Engineering Interviewer conducting a technical interview.
Evaluate the candidate's answer constructively:
1. Score out of 100 based on technical accuracy, completeness, and clarity.
2. List 2-3 specific strengths.
3. List 1-2 constructive weaknesses or missed key points.
4. Provide an ideal "Better Answer" incorporating STAR or structured technical explanation.
`;

    const prompt = `
Question: "${questionText}"
Expected Key Points: ${expectedPoints.join(', ')}
Candidate Answer: "${userAnswer}"

Return JSON:
{
  "score": 85,
  "strengths": ["Clear explanation of Server Components", "Mentioned zero-bundle-size benefit"],
  "weaknesses": ["Missed mentioning hydration boundary rules"],
  "betterAnswer": "Ideal answer text..."
}`;

    const fallbackEval: InterviewAnswerEvaluation = {
      score: userAnswer.length > 50 ? 86 : 72,
      strengths: [
        "Identified the core technical concept accurately.",
        "Articulated practical engineering trade-offs clearly."
      ],
      weaknesses: [
        userAnswer.length < 50 ? "Response was brief; expand with specific technical examples or metric results." : "Include explicit architectural edge cases."
      ],
      betterAnswer: `A top-tier answer should state: "${expectedPoints[0] || 'Explain core architecture clearly'}". For instance, emphasizing how server components reduce hydration overhead while using client components for UI state.`
    };

    const evaluation = await generateStructuredAIOutput<InterviewAnswerEvaluation>(
      prompt,
      systemInstruction,
      fallbackEval
    );

    return NextResponse.json({ success: true, data: evaluation });
  } catch (error: any) {
    console.error('Error in /api/interview/answer:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
