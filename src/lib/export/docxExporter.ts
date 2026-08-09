import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { ParsedResume } from '@/types';

export async function generateDocxResume(resume: ParsedResume): Promise<Buffer> {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Candidate Name Header
          new Paragraph({
            text: resume.name,
            heading: HeadingLevel.TITLE,
            spacing: { after: 100 }
          }),

          // Contact Details
          new Paragraph({
            children: [
              new TextRun({ text: `${resume.email} | ${resume.phone} | ${resume.location}`, italics: true }),
              new TextRun({ text: `\nLinkedIn: ${resume.linkedIn} | GitHub: ${resume.gitHub}`, italics: true })
            ],
            spacing: { after: 200 }
          }),

          // Summary Section
          new Paragraph({
            text: "PROFESSIONAL SUMMARY",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 100 }
          }),
          new Paragraph({
            text: resume.summary,
            spacing: { after: 200 }
          }),

          // Technical Skills Section
          new Paragraph({
            text: "TECHNICAL SKILLS",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 100 }
          }),
          new Paragraph({
            text: resume.technicalSkills.join(" • "),
            spacing: { after: 200 }
          }),

          // Experience Section
          new Paragraph({
            text: "WORK EXPERIENCE",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 100 }
          }),
          ...resume.experience.flatMap(exp => [
            new Paragraph({
              children: [
                new TextRun({ text: exp.role, bold: true }),
                new TextRun({ text: ` - ${exp.company} (${exp.startDate || ''} - ${exp.endDate || 'Present'})`, italics: true })
              ],
              spacing: { before: 100, after: 50 }
            }),
            ...exp.bulletPoints.map(bullet => 
              new Paragraph({
                text: `• ${bullet}`,
                indent: { left: 288 }
              })
            )
          ]),

          // Projects Section
          new Paragraph({
            text: "PROJECTS",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 100 }
          }),
          ...resume.projects.flatMap(proj => [
            new Paragraph({
              children: [
                new TextRun({ text: proj.title, bold: true }),
                new TextRun({ text: ` (${proj.technologies.join(', ')})`, italics: true })
              ],
              spacing: { before: 100, after: 50 }
            }),
            ...proj.bulletPoints.map(bullet => 
              new Paragraph({
                text: `• ${bullet}`,
                indent: { left: 288 }
              })
            )
          ])
        ]
      }
    ]
  });

  return await Packer.toBuffer(doc);
}
