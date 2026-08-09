'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import ScoreChart from '@/components/analytics/ScoreChart';
import { History, TrendingUp, Layers, Award } from 'lucide-react';

export default function ResumeHistoryPage() {
  const versions = [
    {
      id: 'v-4',
      name: 'AI & Full Stack Engineer Resume v4',
      targetJob: 'AI Engineer / Full Stack',
      beforeScore: 68,
      afterScore: 86,
      date: 'August 2026',
      changes: 'Optimized action bullet points with metric placeholders, added vector search project details.'
    },
    {
      id: 'v-3',
      name: 'Frontend Developer Tailored Resume v3',
      targetJob: 'Senior Frontend Engineer',
      beforeScore: 62,
      afterScore: 78,
      date: 'July 2026',
      changes: 'Added Next.js 14 server component highlights and web vitals optimization metrics.'
    },
    {
      id: 'v-2',
      name: 'General Software Engineer Resume v2',
      targetJob: 'Software Engineer',
      beforeScore: 58,
      afterScore: 68,
      date: 'June 2026',
      changes: 'Reformatted education and added technical skills section.'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      <Header title="Resume Version Control & Score History" />

      <div className="px-6 space-y-6">
        <ScoreChart />

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
            <History className="w-4 h-4 text-indigo-400" /> Target Role Resume Versions
          </h3>

          <div className="space-y-3">
            {versions.map((ver) => (
              <div key={ver.id} className="bg-slate-850 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-100 text-sm">{ver.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold">
                      {ver.targetJob}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{ver.changes}</p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
                    <span className="text-slate-400">Before: <span className="font-bold text-rose-400">{ver.beforeScore}</span></span>
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-slate-400">After: <span className="font-bold text-emerald-400">{ver.afterScore}</span></span>
                  </div>
                  <span className="text-xs text-slate-500">{ver.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
