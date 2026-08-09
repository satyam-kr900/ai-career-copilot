'use client';

import React from 'react';
import { ATSScoreBreakdown } from '@/types';
import { CheckCircle2, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';

export default function ATSScoreCard({ ats }: { ats: ATSScoreBreakdown }) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (score >= 65) return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Score */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-6">
          <div className={`w-24 h-24 rounded-2xl border-2 flex flex-col items-center justify-center shadow-lg ${getScoreColor(ats.overallScore)}`}>
            <span className="text-3xl font-black">{ats.overallScore}</span>
            <span className="text-[10px] font-semibold tracking-wider uppercase opacity-80">ATS SCORE</span>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-100">Weighted ATS Compatibility Score</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md">
              Calculated using weighted keyword matching, skill vector alignment, project relevance, and ATS section readability.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 text-center">
            <span className="text-xs text-slate-400 block font-medium">Keyword Match</span>
            <span className="text-base font-bold text-indigo-400">{ats.keywordMatch}%</span>
          </div>
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 text-center">
            <span className="text-xs text-slate-400 block font-medium">Skills Match</span>
            <span className="text-base font-bold text-cyan-400">{ats.skillsMatch}%</span>
          </div>
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 text-center">
            <span className="text-xs text-slate-400 block font-medium">Exp Match</span>
            <span className="text-base font-bold text-emerald-400">{ats.experienceMatch}%</span>
          </div>
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 text-center">
            <span className="text-xs text-slate-400 block font-medium">Project Match</span>
            <span className="text-base font-bold text-amber-400">{ats.projectRelevance}%</span>
          </div>
        </div>
      </div>

      {/* Detail Itemized Progress Bars */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h4 className="font-bold text-slate-200 text-sm flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-400" /> Itemized ATS Component Breakdown
        </h4>

        <div className="space-y-3">
          {[
            { label: 'Keyword Match', score: ats.keywordMatch, weight: '20%' },
            { label: 'Technical Skills Match', score: ats.skillsMatch, weight: '25%' },
            { label: 'Experience Alignment', score: ats.experienceMatch, weight: '20%' },
            { label: 'Education Compatibility', score: ats.educationMatch, weight: '10%' },
            { label: 'Project Relevance', score: ats.projectRelevance, weight: '15%' },
            { label: 'Formatting & Readability', score: ats.formattingCompatibility, weight: '10%' },
          ].map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-300">{item.label} <span className="text-slate-500">({item.weight} weight)</span></span>
                <span className="text-slate-200 font-bold">{item.score}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    item.score >= 80 ? 'bg-emerald-500' : item.score >= 65 ? 'bg-amber-500' : 'bg-rose-500'
                  }`} 
                  style={{ width: `${item.score}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Positive & Negative Factors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <h4 className="font-bold text-emerald-400 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Positive ATS Factors
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            {ats.positiveFactors.map((pf, i) => (
              <li key={i} className="flex items-start gap-2 bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-2.5">
                <span className="text-emerald-400 mt-0.5">•</span>
                <span>{pf}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <h4 className="font-bold text-rose-400 text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Areas for ATS Improvement
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            {ats.negativeFactors.map((nf, i) => (
              <li key={i} className="flex items-start gap-2 bg-rose-500/5 border border-rose-500/10 rounded-lg p-2.5">
                <span className="text-rose-400 mt-0.5">•</span>
                <span>{nf}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Why Score was generated explanation */}
      <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-2xl p-5 text-xs space-y-2">
        <h4 className="font-bold text-indigo-300 text-sm flex items-center gap-2">
          <HelpCircle className="w-4 h-4" /> Why This Score Was Generated
        </h4>
        {ats.explanations.map((exp, i) => (
          <p key={i} className="text-indigo-200/90 leading-relaxed">• {exp}</p>
        ))}
      </div>
    </div>
  );
}
