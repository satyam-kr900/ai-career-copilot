/**
 * Vector Embeddings & Cosine Similarity Service
 * Provides lightweight vector math and semantic similarity calculation
 */

// Simple deterministic hash-based embedding generator for local/offline fallback
// Converts string text into a normalized 64-dimensional float vector
export function generateLocalEmbedding(text: string): number[] {
  const normalized = text.toLowerCase().trim();
  const vector = new Array(64).fill(0);
  
  if (!normalized) return vector;

  const words = normalized.split(/\W+/).filter(Boolean);
  
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    for (let j = 0; j < word.length; j++) {
      const charCode = word.charCodeAt(j);
      const index = (charCode + j * 7 + i * 13) % 64;
      vector[index] += (charCode % 10) + 1;
    }
  }

  // L2 Normalize vector
  const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  if (magnitude > 0) {
    for (let i = 0; i < vector.length; i++) {
      vector[i] = vector[i] / magnitude;
    }
  }

  return vector;
}

// Calculate Cosine Similarity between two embedding vectors
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (!vecA.length || !vecB.length || vecA.length !== vecB.length) return 0;
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  if (normA === 0 || normB === 0) return 0;
  
  const score = dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  return Math.max(0, Math.min(1, score));
}

// Common tech domain synomym mapping for semantic fallback
const SEMANTIC_SYNONYMS: Record<string, string[]> = {
  "express": ["restful apis", "backend api", "node.js api", "web service", "express.js"],
  "react": ["frontend framework", "ui development", "client-side rendering", "next.js", "component design"],
  "python": ["django", "flask", "fastapi", "scripting", "data processing", "ai development"],
  "postgresql": ["postgres", "relational database", "sql", "pgvector", "prisma"],
  "aws": ["cloud deployment", "amazon web services", "serverless", "s3", "ec2"],
  "docker": ["containerization", "kubernetes", "microservices", "devops"]
};

// Check if two skill/term strings are semantically related
export function calculateSemanticTermSimilarity(termA: string, termB: string): number {
  const normA = termA.toLowerCase().trim();
  const normB = termB.toLowerCase().trim();

  if (normA === normB) return 1.0;
  if (normA.includes(normB) || normB.includes(normA)) return 0.85;

  // Check synonym map
  for (const [key, synonyms] of Object.entries(SEMANTIC_SYNONYMS)) {
    const isAInGroup = normA.includes(key) || synonyms.some(s => normA.includes(s));
    const isBInGroup = normB.includes(key) || synonyms.some(s => normB.includes(s));
    if (isAInGroup && isBInGroup) {
      return 0.80;
    }
  }

  // Vector embedding cosine match fallback
  const vecA = generateLocalEmbedding(normA);
  const vecB = generateLocalEmbedding(normB);
  return cosineSimilarity(vecA, vecB);
}
