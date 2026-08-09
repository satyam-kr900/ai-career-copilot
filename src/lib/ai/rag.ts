import { generateLocalEmbedding, cosineSimilarity } from './embeddings';

export interface DocumentChunk {
  id: string;
  section: string;
  text: string;
  embedding: number[];
}

export class RAGVectorStore {
  private chunks: DocumentChunk[] = [];

  // Add document chunks to vector index
  public indexText(sectionName: string, fullText: string, maxChunkSize = 300) {
    const sentences = fullText.split(/(?<=[.!?])\s+/);
    let currentChunk = '';
    let chunkIdCounter = 1;

    for (const sentence of sentences) {
      if ((currentChunk + ' ' + sentence).length > maxChunkSize && currentChunk) {
        this.addChunk(`${sectionName}-${chunkIdCounter++}`, sectionName, currentChunk);
        currentChunk = sentence;
      } else {
        currentChunk = currentChunk ? `${currentChunk} ${sentence}` : sentence;
      }
    }

    if (currentChunk) {
      this.addChunk(`${sectionName}-${chunkIdCounter}`, sectionName, currentChunk);
    }
  }

  private addChunk(id: string, section: string, text: string) {
    const embedding = generateLocalEmbedding(text);
    this.chunks.push({ id, section, text, embedding });
  }

  // Retrieve top-K most semantically relevant text chunks for a query
  public retrieveRelevantContext(query: string, topK = 4): DocumentChunk[] {
    const queryEmbedding = generateLocalEmbedding(query);
    
    const scoredChunks = this.chunks.map(chunk => ({
      chunk,
      score: cosineSimilarity(queryEmbedding, chunk.embedding)
    }));

    // Sort by cosine score descending
    scoredChunks.sort((a, b) => b.score - a.score);

    return scoredChunks.slice(0, topK).map(sc => sc.chunk);
  }

  public getAllChunks(): DocumentChunk[] {
    return this.chunks;
  }
}
