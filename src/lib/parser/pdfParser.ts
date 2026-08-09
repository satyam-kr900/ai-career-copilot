import pdfParse from 'pdf-parse';

export async function parsePdfBuffer(buffer: Buffer): Promise<string> {
  try {
    const data = await pdfParse(buffer);
    return data.text || '';
  } catch (error) {
    console.error('Error parsing PDF buffer:', error);
    throw new Error('Failed to extract text from PDF file.');
  }
}
