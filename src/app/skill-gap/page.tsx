'use client';

import React from 'react';
import { Layers, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

export default function SkillGapPage() {
  const candidateSkills = ["Next.js", "React", "TypeScript", "JavaScript", "Node.js", "Express", "Python", "SQL", "PostgreSQL", "Prisma", "Git", "REST APIs", "Tailwind CSS"];
  const matchingSkills = ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"];
  
  const missingCategorized = {
    critical: ["Docker", "AWS"],
    important: ["Kubernetes"],
    niceToHave: ["GraphQL"]
  };

  return (
    <div className="space-y-4 sm:space-y-6 px-3 sm:px-6 py-4 sm:py-6 pb-12">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4">
        <h3 className="font-bold text-slate-100 text-xs sm:text-sm flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400 shrink-0" /> Candidate vs. Target Job Skill Matrix
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-slate-850 border border-slate-800 rounded-xl p-3.5 sm:p-4 space-y-2.5">
            <span className="text-xs font-bold text-emerald-400 block">Matching Skills ({matchingSkills.length}):</span>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {matchingSkills.map((s, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg text-[11px] sm:text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium">
                  ✓ {s}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-slate-850 border border-slate-800 rounded-xl p-3.5 sm:p-4 space-y-2.5">
            <span className="text-xs font-bold text-indigo-400 block">Candidate Tech Skills Pool ({candidateSkills.length}):</span>
            <div className="flex flex-wrap gap-1.5">
              {candidateSkills.map((s, i) => (
                <span key={i} className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[11px] sm:text-xs bg-slate-800 text-slate-300 border border-slate-700">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Categorized Missing Skills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-slate-900 border border-rose-500/30 rounded-2xl p-4 sm:p-5 space-y-3">
          <h4 className="font-bold text-rose-400 text-xs sm:text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" /> Critical Missing Skills
          </h4>
          <div className="space-y-2">
            {missingCategorized.critical.map((s, i) => (
              <div key={i} className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 text-xs text-rose-200">
                <span className="font-bold block">{s}</span>
                <span className="text-[11px] text-rose-300/80">You may consider learning this skill to qualify for core backend responsibilities.</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-4 sm:p-5 space-y-3">
          <h4 className="font-bold text-amber-400 text-xs sm:text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" /> Important Missing Skills
          </h4>
          <div className="space-y-2">
            {missingCategorized.important.map((s, i) => (
              <div key={i} className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-xs text-amber-200">
                <span className="font-bold block">{s}</span>
                <span className="text-[11px] text-amber-300/80">Recommended for advanced cloud microservices architecture.</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-4 sm:p-5 space-y-3 sm:col-span-2 lg:col-span-1">
          <h4 className="font-bold text-indigo-400 text-xs sm:text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" /> Nice-to-Have Skills
          </h4>
          <div className="space-y-2">
            {missingCategorized.niceToHave.map((s, i) => (
              <div key={i} className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-3 text-xs text-indigo-200">
                <span className="font-bold block">{s}</span>
                <span className="text-[11px] text-indigo-300/80">Adds extra polish to senior technical interviews.</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Truthful Guidance Note */}
      <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-2xl p-4 sm:p-5 text-xs text-indigo-200 space-y-1">
        <span className="font-bold text-indigo-300 block flex items-center gap-1">
          <HelpCircle className="w-4 h-4 shrink-0" /> Grounded Integrity Protocol:
        </span>
        <p className="text-[11px] sm:text-xs leading-relaxed">
          The Career Copilot will never recommend falsely adding unpossessed skills to your resume. Instead, learning path roadmaps are provided so you acquire genuine project experience before applying.
        </p>
      </div>
    </div>
  );
}
