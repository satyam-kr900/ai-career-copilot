import { NextRequest, NextResponse } from 'next/server';
import { RAGVectorStore } from '@/lib/ai/rag';
import { generateStructuredAIOutput } from '@/lib/ai/gemini';
import { ParsedResume } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userMessage: string = body.message || 'Why is my ATS score low?';
    const resume: ParsedResume = body.resume;

    // Build RAG vector store from resume sections
    const vectorStore = new RAGVectorStore();
    
    if (resume) {
      vectorStore.indexText('Summary', resume.summary || '');
      vectorStore.indexText('Skills', resume.technicalSkills?.join(', ') || '');
      vectorStore.indexText('Experience', JSON.stringify(resume.experience || []));
      vectorStore.indexText('Projects', JSON.stringify(resume.projects || []));
    } else {
      vectorStore.indexText('General', 'Senior Full Stack Software Engineer experienced in React, Next.js, Node.js, TypeScript, PostgreSQL, and Docker.');
    }

    // Retrieve relevant context chunks using vector similarity
    const retrievedChunks = vectorStore.retrieveRelevantContext(userMessage, 3);
    const retrievedText = retrievedChunks.map(c => `[${c.section}]: ${c.text}`).join('\n\n');

    const systemInstruction = `
You are an expert AI Career Coach and Resume Assistant.
Grounded Context from User's Resume:
${retrievedText}

GROUNDING RULES:
1. Ground your answer strictly in the candidate's resume context provided above.
2. If information is not in the resume, explicitly say: "Not mentioned in your resume, but here is general advice..."
3. Give concise, actionable, professional career advice.
`;

    const prompt = `User asks: "${userMessage}"`;

    let reply = "";

    if (userMessage.toLowerCase().includes('ats score')) {
      reply = `Based on your uploaded resume, your ATS score is affected by keyword density and skill alignments. Incorporating specific target job skills like ${resume?.technicalSkills?.slice(0, 3).join(', ') || 'Docker, AWS, and Next.js'} into your project bullet points will boost your ATS keyword score by 15-20%.`;
    } else if (userMessage.toLowerCase().includes('project')) {
      reply = `To improve your project section, frame your accomplishments with measurable outcomes using placeholders if exact figures are unavailable. For example, change "${resume?.projects?.[0]?.bulletPoints?.[0] || 'Built Next.js app'}" to "Architected responsive full-stack platform using Next.js, achieving [X]% faster response times."`;
    } else if (userMessage.toLowerCase().includes('skills') || userMessage.toLowerCase().includes('learn')) {
      reply = `Based on current market demand for your target role, prioritize learning Docker containerization and AWS deployment fundamentals. These are highly valued alongside your existing ${resume?.technicalSkills?.slice(0, 3).join(', ') || 'React and TypeScript'} expertise.`;
    } else {
      reply = `I have analyzed your candidate profile. Your experience at ${resume?.experience?.[0]?.company || 'TechScale Innovations'} and your skills in ${resume?.technicalSkills?.slice(0, 4).join(', ') || 'Next.js, TypeScript, and PostgreSQL'} position you strongly for Senior Software Engineer roles. Is there a specific job description you would like to compare your resume against?`;
    }

    const aiResult = await generateStructuredAIOutput<{ answer: string }>(
      prompt,
      systemInstruction,
      { answer: reply }
    );

    return NextResponse.json({
      success: true,
      answer: aiResult.answer || reply,
      retrievedContextCount: retrievedChunks.length
    });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
