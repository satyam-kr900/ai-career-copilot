import { NextRequest, NextResponse } from 'next/server';
import { InterviewQuestionItem } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const roleTitle = body.roleTitle || 'AI Full Stack Developer';

    const sampleQuestions: InterviewQuestionItem[] = [
      {
        id: 'q-1',
        category: 'TECHNICAL',
        question: 'How do Next.js Server Components differ from standard React Client Components, and when should you choose one over the other?',
        whyAsked: 'Evaluates your modern React architecture understanding, performance optimization awareness, and SSR bundle size management skills.',
        expectedAnswerPoints: [
          'Server Components execute exclusively on the server and send 0KB JS bundle to the browser.',
          'Client Components use standard hydration and are required when using hooks (useState, useEffect) or DOM listeners.',
          'Selecting Server Components for data fetching and heavy rendering reduces client TTI (Time to Interactive).'
        ],
        sampleAnswer: 'React Server Components allow components to render on the server, keeping large dependencies out of the client JS bundle. Client Components should be used when interactive state or browser APIs like localStorage are required.',
        followUpQuestions: [
          'How do you pass data across the Server-Client component boundary without re-triggering hydration waterfalls?'
        ]
      },
      {
        id: 'q-2',
        category: 'PROJECT',
        question: 'In your project "KnowSamvidhan AI", how did you handle vector similarity search latency when processing legal queries?',
        whyAsked: 'Tests your practical experience with vector databases, embeddings indexing, and RAG retrieval pipelines.',
        expectedAnswerPoints: [
          'Used chunking strategy with overlap to preserve semantic context.',
          'Utilized pgvector HNSW/IVFFlat index in PostgreSQL to reduce nearest-neighbor query times.',
          'Cached frequent query embeddings in Redis.'
        ],
        sampleAnswer: 'We implemented document chunking combined with pgvector HNSW indexing in PostgreSQL. Frequent query responses were cached to achieve sub-100ms vector retrieval times.',
        followUpQuestions: [
          'What happens when chunk size is too small or too large in RAG applications?'
        ]
      },
      {
        id: 'q-3',
        category: 'SYSTEM_DESIGN',
        question: 'How would you design a scalable real-time notifications system for 100,000 concurrent WebSocket connections?',
        whyAsked: 'Assesses system architecture, scalability, pub/sub messaging patterns, and load balancing expertise.',
        expectedAnswerPoints: [
          'Decouple WebSocket gateways from backend workers using Redis Pub/Sub or Kafka.',
          'Use stateless API gateways with sticky sessions or Redis state store for connection mapping.',
          'Graceful fallback to Server-Sent Events (SSE) or long-polling.'
        ],
        sampleAnswer: 'I would set up stateless WebSocket gateway instances behind an AWS NLB, coupled with Redis Pub/Sub for cross-node message routing to handle horizontal scaling.',
        followUpQuestions: [
          'How do you manage reconnection storms when a gateway server restarts?'
        ]
      },
      {
        id: 'q-4',
        category: 'SQL',
        question: 'How do you diagnose and optimize a slow PostgreSQL query using EXPLAIN ANALYZE?',
        whyAsked: 'Checks database performance tuning capabilities and index optimization techniques.',
        expectedAnswerPoints: [
          'Look for Sequential Scans (Seq Scan) on large tables requiring Index Scans.',
          'Identify high execution costs and buffer read bottlenecks.',
          'Add composite or partial indexes tailored to WHERE/JOIN filter conditions.'
        ],
        sampleAnswer: 'I run EXPLAIN ANALYZE to identify sequential scans or high-cost hash joins. Adding indexes on filtered columns or rewriting subqueries to JOINs resolves execution bottlenecks.',
        followUpQuestions: [
          'What are the trade-offs of adding too many indexes on a write-heavy database?'
        ]
      },
      {
        id: 'q-5',
        category: 'BEHAVIORAL',
        question: 'Tell me about a time you encountered a major production bug during a deployment and how you resolved it.',
        whyAsked: 'Assesses crisis management, communication, rollbacks, and post-mortem accountability.',
        expectedAnswerPoints: [
          'STAR Method (Situation, Task, Action, Result).',
          'Immediate mitigation: feature flags or automated rollback.',
          'Root cause analysis and post-mortem prevention.'
        ],
        sampleAnswer: 'When an unexpected API schema mismatch broke client checkout calls post-deploy, I immediately initiated a rollback via automated CI/CD pipelines, identified the missing migration field, added regression tests, and redeployed within 15 minutes.',
        followUpQuestions: [
          'What process changes did you implement to prevent similar API contract breaks in future sprints?'
        ]
      }
    ];

    return NextResponse.json({
      success: true,
      data: {
        sessionId: 'session-' + Date.now(),
        roleTitle,
        totalQuestions: sampleQuestions.length,
        questions: sampleQuestions
      }
    });
  } catch (error: any) {
    console.error('Error in /api/interview/session:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
