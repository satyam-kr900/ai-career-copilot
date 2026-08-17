'use client';

import React from 'react';
import BulletOptimizer from '@/components/resume/BulletOptimizer';
import { Target } from 'lucide-react';

export default function ResumeOptimizerPage() {
  return (
    <div className="space-y-4 sm:space-y-6 px-3 sm:px-6 py-4 sm:py-6 pb-12">
      <BulletOptimizer />

      {/* Job Specific Tailoring Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4">
        <h3 className="text-sm sm:text-base font-bold text-slate-100 flex items-center gap-2">
          <Target className="w-4 h-4 text-indigo-400 shrink-0" /> Job-Specific Resume Tailoring
        </h3>
        <p className="text-xs text-slate-400">
          Paste a target Job Description to generate a tailored summary, aligned skill focus, and optimized bullet points truthful to your experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Target Job Description:</label>
            <textarea
              rows={5}
              placeholder="Paste job posting text here..."
              defaultValue="Looking for a Full Stack Engineer with strong Next.js, TypeScript, PostgreSQL, and Docker containerization skills."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="bg-indigo-950/20 border border-indigo-500/30 rounded-xl p-4 space-y-3">
            <span className="text-xs font-bold text-indigo-300 block">AI Generated Tailored Summary Preview:</span>
            <p className="text-xs text-slate-200 leading-relaxed italic">
              "Results-driven Senior Full Stack Engineer with 4+ years specializing in Next.js, TypeScript, microservices, and PostgreSQL database query optimization. Experienced in developing high-throughput web APIs and micro-frontend architectures aligned with target platform standards."
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {["Next.js", "TypeScript", "Node.js", "PostgreSQL", "REST APIs"].map((s, i) => (
                <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
