import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY || '';

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function generateStructuredAIOutput<T>(
  prompt: string,
  systemInstruction: string,
  fallbackData: T
): Promise<T> {
  if (!genAI || !apiKey) {
    console.log('[AI Service] Operating in Demo / Zero-Config Fallback Mode');
    return fallbackData;
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: `${systemInstruction}\nIMPORTANT: Output ONLY valid JSON. No markdown code blocks, no trailing comments, no text before or after JSON.`
    });

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();
    
    // Clean potential markdown fencing
    const cleanedJson = responseText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    return JSON.parse(cleanedJson) as T;
  } catch (error) {
    console.warn('[AI Service] Generation error, utilizing grounded fallback:', error);
    return fallbackData;
  }
}
