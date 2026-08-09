import mammoth from 'mammoth';

export async function parseDocxBuffer(buffer: Buffer): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value || '';
  } catch (error) {
    console.error('Error parsing DOCX buffer:', error);
    throw new Error('Failed to extract text from DOCX file.');
  }
}
