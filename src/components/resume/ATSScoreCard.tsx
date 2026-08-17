'use client';

import React from 'react';
import { ATSScoreBreakdown } from '@/types';
import { CheckCircle2, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';

const SECTION_ANCHOR_MAP: Record<string, string> = {
  'skill':        '#resume-section-skills',
  'keyword':      '#resume-section-skills',
  'experience':   '#resume-section-experience',
  'project':      '#resume-section-projects',
  'education':    '#resume-section-education',
  'format':       '#resume-section-summary',
  'structure':    '#resume-section-summary',
};

function resolveSectionLink(explanation: string): string | null {
  const lower = explanation.toLowerCase();
  for (const [key, anchor] of Object.entries(SECTION_ANCHOR_MAP)) {
    if (lower.includes(key)) return anchor;
  }
  return null;
}

export default function ATSScoreCard({ ats }: { ats: ATSScoreBreakdown }) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-300 border-emerald-500/40 bg-emerald-500/10';
    if (score >= 65) return 'text-amber-300  border-amber-500/40  bg-amber-500/10';
    return              'text-rose-300   border-rose-500/40   bg-rose-500/10';
  };

  const barColor = (score: number) =>
    score >= 80 ? 'bg-emerald-400' : score >= 65 ? 'bg-amber-400' : 'bg-rose-400';

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Top Banner Score */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left w-full md:w-auto">
          <div
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 flex flex-col items-center justify-center shadow-lg shrink-0 ${getScoreColor(ats.overallScore)}`}
            role="img"
            aria-label={`ATS Score ${ats.overallScore} out of 100`}
          >
            <span className="text-2xl sm:text-3xl font-black">{ats.overallScore}</span>
            <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase opacity-80">ATS SCORE</span>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-100">Weighted ATS Compatibility Score</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md">
              Calculated using weighted keyword matching, skill vector alignment, project relevance, and ATS section readability.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 w-full md:w-auto">
          {[
            { label: 'Keyword Match', value: `${ats.keywordMatch}%`,      color: 'text-indigo-300' },
            { label: 'Skills Match',  value: `${ats.skillsMatch}%`,       color: 'text-cyan-300'   },
            { label: 'Exp Match',     value: `${ats.experienceMatch}%`,   color: 'text-emerald-300'},
            { label: 'Project Match', value: `${ats.projectRelevance}%`,  color: 'text-amber-300'  },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-2.5 sm:p-3 text-center">
              <span className="text-[11px] sm:text-xs text-slate-400 block font-medium truncate">{label}</span>
              <span className={`text-sm sm:text-base font-bold ${color}`}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Itemised Progress Bars */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4">
        <h4 className="font-bold text-slate-200 text-xs sm:text-sm flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-400" /> Itemized ATS Component Breakdown
        </h4>

        <div className="space-y-3">
          {[
            { label: 'Keyword Match',           score: ats.keywordMatch,          weight: '20%', section: '#resume-section-skills'     },
            { label: 'Technical Skills Match',  score: ats.skillsMatch,           weight: '25%', section: '#resume-section-skills'     },
            { label: 'Experience Alignment',    score: ats.experienceMatch,       weight: '20%', section: '#resume-section-experience' },
            { label: 'Education Compatibility', score: ats.educationMatch,        weight: '10%', section: '#resume-section-education'  },
            { label: 'Project Relevance',       score: ats.projectRelevance,      weight: '15%', section: '#resume-section-projects'   },
            { label: 'Formatting & Readability',score: ats.formattingCompatibility, weight: '10%', section: '#resume-section-summary' },
          ].map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <a
                  href={item.section}
                  title={`View ${item.label} in your resume`}
                  className="text-slate-300 hover:text-indigo-300 underline-offset-2 hover:underline transition truncate pr-2"
                >
                  {item.label}
                  <span className="text-slate-500 ml-1">({item.weight})</span>
                </a>
                <span className={`font-bold shrink-0 ${item.score >= 80 ? 'text-emerald-300' : item.score >= 65 ? 'text-amber-300' : 'text-rose-300'}`}>
                  {item.score}%
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden" role="progressbar" aria-valuenow={item.score} aria-valuemin={0} aria-valuemax={100}>
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${barColor(item.score)}`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Positive & Negative Factors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
          <h4 className="font-bold text-emerald-300 text-xs sm:text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Positive ATS Factors
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            {ats.positiveFactors.map((pf, i) => (
              <li key={i} className="flex items-start gap-2 bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-2.5">
                <span className="text-emerald-400 mt-0.5 shrink-0">•</span>
                <span>{pf}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
          <h4 className="font-bold text-rose-300 text-xs sm:text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Areas for ATS Improvement
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            {ats.negativeFactors.map((nf, i) => (
              <li key={i} className="flex items-start gap-2 bg-rose-500/5 border border-rose-500/10 rounded-lg p-2.5">
                <span className="text-rose-400 mt-0.5 shrink-0">•</span>
                <span>{nf}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Why This Score */}
      <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-2xl p-4 sm:p-5 text-xs space-y-3">
        <h4 className="font-bold text-indigo-300 text-xs sm:text-sm flex items-center gap-2">
          <HelpCircle className="w-4 h-4" /> Why This Score Was Generated
        </h4>
        <p className="text-indigo-200/70 text-[11px] leading-relaxed">
          Each bullet below is linked to the resume section that directly influenced that part of the score.
        </p>
        {ats.explanations.map((exp, i) => {
          const link = resolveSectionLink(exp);
          return (
            <div key={i} className="flex items-start gap-2">
              <span className="text-indigo-500 mt-0.5 shrink-0">•</span>
              {link ? (
                <a
                  href={link}
                  className="text-indigo-200/90 leading-relaxed hover:text-indigo-100 underline underline-offset-2 transition"
                >
                  {exp}
                </a>
              ) : (
                <p className="text-indigo-200/90 leading-relaxed">{exp}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
