import { NextRequest, NextResponse } from 'next/server';
import { parsePdfBuffer } from '@/lib/parser/pdfParser';
import { parseDocxBuffer } from '@/lib/parser/docxParser';
import { parseResumeContent } from '@/lib/parser/sectionExtractor';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      // Fallback demo parsing if no file uploaded directly
      const defaultParsed = await parseResumeContent('');
      return NextResponse.json({ success: true, data: defaultParsed });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let rawText = '';

    if (file.name.toLowerCase().endsWith('.pdf')) {
      rawText = await parsePdfBuffer(buffer);
    } else if (file.name.toLowerCase().endsWith('.docx') || file.name.toLowerCase().endsWith('.doc')) {
      rawText = await parseDocxBuffer(buffer);
    } else {
      rawText = buffer.toString('utf-8');
    }

    const parsedResume = await parseResumeContent(rawText);

    return NextResponse.json({
      success: true,
      data: parsedResume,
      rawTextLength: rawText.length
    });
  } catch (error: any) {
    console.error('Error in /api/resume/parse:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to parse resume.' }, { status: 500 });
  }
}
