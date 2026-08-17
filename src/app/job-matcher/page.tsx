'use client';

import React, { useState } from 'react';
import { Target, CheckCircle2, AlertCircle, Briefcase, Sparkles } from 'lucide-react';

export default function JobMatcherPage() {
  const [jobs] = useState([
    {
      title: 'Senior Full Stack Software Engineer',
      company: 'ScaleTech Inc.',
      matchScore: 91,
      requiredSkills: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Docker'],
      matchingSkills: ['React', 'Next.js', 'Node.js', 'PostgreSQL'],
      missingSkills: ['Docker'],
      whyMatches: 'Direct technical stack match with your experience in TypeScript, React micro-frontends, and REST APIs.'
    },
    {
      title: 'AI Platform & RAG Developer',
      company: 'NextGen AI Labs',
      matchScore: 84,
      requiredSkills: ['Python', 'TypeScript', 'RAG', 'Vector DB', 'AWS'],
      matchingSkills: ['TypeScript', 'Python'],
      missingSkills: ['AWS', 'Vector DB'],
      whyMatches: 'High semantic match with your AI side-projects and vector retrieval implementations.'
    },
    {
      title: 'Frontend Lead Engineer',
      company: 'Vercel Ecosystem Partner',
      matchScore: 88,
      requiredSkills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Web Vitals'],
      matchingSkills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      missingSkills: ['Web Vitals'],
      whyMatches: 'Matches 90%+ of your primary frontend skills and modern component architecture.'
    }
  ]);

  return (
    <div className="space-y-4 sm:space-y-6 px-3 sm:px-6 py-4 sm:py-6 pb-12">
      <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-2xl p-4 sm:p-6 space-y-2">
        <h3 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 shrink-0" /> Vector Cosine Semantic Matching
        </h3>
        <p className="text-xs text-indigo-200/80 leading-relaxed">
          Does not rely on simple text keyword matching. Uses vector embeddings to match semantically equivalent requirements (e.g. "Built RESTful APIs in Express" ↔ "Backend API development experience").
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {jobs.map((job, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-4 sm:p-6 space-y-4 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3 sm:pb-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                  <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-100 text-sm sm:text-base truncate">{job.title}</h4>
                  <span className="text-xs text-slate-400 font-medium block truncate">{job.company}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
                <div className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-black text-sm sm:text-lg">
                  Match: {job.matchScore}%
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs">
              <div>
                <span className="font-bold text-emerald-400 flex items-center gap-1 mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> Matching Candidate Skills:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {job.matchingSkills.map((s, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium text-[11px] sm:text-xs">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-bold text-amber-400 flex items-center gap-1 mb-2">
                  <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> Missing / Learning Recommended:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {job.missingSkills.map((s, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium text-[11px] sm:text-xs">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-850 rounded-xl p-3 text-xs text-slate-300 border border-slate-800 leading-relaxed">
              <span className="font-bold text-indigo-300">Why This Job Matches: </span>
              <span>{job.whyMatches}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
