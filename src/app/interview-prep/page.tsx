'use client';

import React, { useState } from 'react';
import MockInterviewChat from '@/components/interview/MockInterviewChat';
import { MessageSquare, Award, Sparkles } from 'lucide-react';

export default function InterviewPrepPage() {
  const [activeTab, setActiveTab] = useState<'mock' | 'project'>('mock');

  const initialQuestions = [
    {
      id: 'q-1',
      category: 'TECHNICAL' as const,
      question: 'How do Next.js Server Components differ from standard React Client Components, and when should you choose one over the other?',
      whyAsked: 'Evaluates your modern React architecture understanding, performance optimization awareness, and SSR bundle size management skills.',
      expectedAnswerPoints: [
        'Server Components execute exclusively on the server and send 0KB JS bundle to the browser.',
        'Client Components use standard hydration and are required when using hooks or DOM listeners.',
        'Selecting Server Components for data fetching and heavy rendering reduces client TTI.'
      ],
      sampleAnswer: 'React Server Components allow components to render on the server, keeping large dependencies out of the client JS bundle. Client Components should be used when interactive state or browser APIs like localStorage are required.',
      followUpQuestions: [
        'How do you pass data across the Server-Client component boundary without re-triggering hydration waterfalls?'
      ]
    },
    {
      id: 'q-2',
      category: 'PROJECT' as const,
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
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 px-3 sm:px-6 py-4 sm:py-6 pb-12">
      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 sm:gap-3 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('mock')}
          className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition ${
            activeTab === 'mock'
              ? 'bg-indigo-600 border-indigo-500 text-white'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <MessageSquare className="w-4 h-4 shrink-0" /> Interactive Mock Interview
        </button>

        <button
          onClick={() => setActiveTab('project')}
          className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition ${
            activeTab === 'project'
              ? 'bg-indigo-600 border-indigo-500 text-white'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Award className="w-4 h-4 shrink-0" /> Project Relevance Analyzer
        </button>
      </div>

      {activeTab === 'mock' ? (
        <MockInterviewChat questions={initialQuestions} />
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h3 className="font-bold text-slate-100 text-sm sm:text-base">Project Target Job Relevance Analyzer</h3>
              <p className="text-xs text-slate-400">Analyzes candidate projects against job specifications</p>
            </div>
            <div className="self-start sm:self-auto px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs sm:text-sm shrink-0">
              Project Relevance: 94%
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-xs">
            <div className="bg-slate-850 border border-slate-800 rounded-xl p-3.5 sm:p-4 space-y-2">
              <span className="font-bold text-indigo-300 block">Project: KnowSamvidhan AI</span>
              <p className="text-slate-400">Tech Stack: Next.js, TypeScript, Prisma, Supabase, AI Embeddings</p>
              <div className="pt-2">
                <span className="font-bold text-emerald-400 block mb-1">Matching Target Tech:</span>
                <p className="text-slate-300">• Next.js, TypeScript, Supabase, AI RAG Pipeline</p>
              </div>
            </div>

            <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-xl p-3.5 sm:p-4 space-y-2">
              <span className="font-bold text-indigo-300 block flex items-center gap-1">
                <Sparkles className="w-4 h-4 shrink-0" /> Interview Presentation Advice:
              </span>
              <p className="text-indigo-200 leading-relaxed">
                "When explaining this project to hiring managers, frame it around vector embedding latency and database indexing. Highlight how you optimized nearest-neighbor query times for instant user responses."
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
