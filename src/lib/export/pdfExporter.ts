import jsPDF from 'jspdf';

export function generateAnalysisPdfReport(
  candidateName: string,
  atsScore: number,
  positiveFactors: string[],
  negativeFactors: string[],
  missingSkills: string[]
): Buffer {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(22);
  doc.setTextColor(30, 41, 59); // Slate 800
  doc.text('AI CAREER COPILOT - RESUME & ATS ANALYSIS', 14, 20);

  doc.setFontSize(12);
  doc.setTextColor(100);
  doc.text(`Candidate: ${candidateName}`, 14, 30);
  doc.text(`Generated Date: ${new Date().toLocaleDateString()}`, 14, 37);

  // ATS Score Box
  doc.setFillColor(241, 245, 249);
  doc.rect(14, 45, 180, 25, 'F');
  
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  doc.text(`Overall ATS Score: ${atsScore} / 100`, 20, 61);

  // Positive Factors
  let yPos = 80;
  doc.setFontSize(14);
  doc.setTextColor(16, 185, 129); // Emerald 500
  doc.text('Positive Strengths:', 14, yPos);
  
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);
  yPos += 8;
  positiveFactors.forEach(pf => {
    doc.text(`• ${pf}`, 18, yPos);
    yPos += 7;
  });

  // Areas to Improve
  yPos += 5;
  doc.setFontSize(14);
  doc.setTextColor(239, 68, 68); // Red 500
  doc.text('Areas for Improvement:', 14, yPos);

  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);
  yPos += 8;
  negativeFactors.forEach(nf => {
    doc.text(`• ${nf}`, 18, yPos);
    yPos += 7;
  });

  // Recommended Learning Skills
  yPos += 5;
  doc.setFontSize(14);
  doc.setTextColor(99, 102, 241); // Indigo 500
  doc.text('Recommended Target Skills:', 14, yPos);

  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);
  yPos += 8;
  missingSkills.forEach(ms => {
    doc.text(`• ${ms}`, 18, yPos);
    yPos += 7;
  });

  const arrayBuffer = doc.output('arraybuffer');
  return Buffer.from(arrayBuffer);
}
