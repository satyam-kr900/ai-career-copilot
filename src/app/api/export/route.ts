import { NextRequest, NextResponse } from 'next/server';
import { generateAnalysisPdfReport } from '@/lib/export/pdfExporter';
import { generateDocxResume } from '@/lib/export/docxExporter';
import { ParsedResume } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const format: string = body.format || 'pdf'; // 'pdf' | 'docx'
    const resume: ParsedResume = body.resume;
    const atsScore: number = body.atsScore || 86;

    if (format === 'docx') {
      const docxBuffer = await generateDocxResume(resume);
      return new NextResponse(new Uint8Array(docxBuffer), {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'Content-Disposition': `attachment; filename="${resume?.name || 'Resume'}_Optimized.docx"`
        }
      });
    }

    // PDF Analysis Report export
    const pdfBuffer = generateAnalysisPdfReport(
      resume?.name || 'Candidate',
      atsScore,
      ['Strong technical skill alignment', 'Clean section formatting', 'Proven project application'],
      ['Include explicit metric numbers', 'Add target cloud infrastructure keywords'],
      ['Docker', 'AWS', 'Kubernetes']
    );

    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${resume?.name || 'Candidate'}_Analysis_Report.pdf"`
      }
    });
  } catch (error: any) {
    console.error('Error in /api/export:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
