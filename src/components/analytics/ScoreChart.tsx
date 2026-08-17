'use client';

import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { ScoreHistoryPoint } from '@/types';
import { TrendingUp, UploadCloud } from 'lucide-react';
import Link from 'next/link';

const defaultData: ScoreHistoryPoint[] = [
  { month: 'May',    atsScore: 62, skillMatch: 58, resumeQuality: 65 },
  { month: 'June',   atsScore: 68, skillMatch: 64, resumeQuality: 72 },
  { month: 'July',   atsScore: 78, skillMatch: 75, resumeQuality: 82 },
  { month: 'August', atsScore: 86, skillMatch: 84, resumeQuality: 92 },
];

interface ScoreChartProps {
  data?: ScoreHistoryPoint[];
  hasHistory?: boolean;
}

export default function ScoreChart({ data = defaultData, hasHistory = true }: ScoreChartProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-100 text-xs sm:text-sm flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-400 shrink-0" />
            Resume Score Improvement Over Time
          </h3>
          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
            Tracks ATS score, Skill match %, and Quality progression across uploads
          </p>
        </div>
      </div>

      {!hasHistory ? (
        <div className="flex flex-col items-center justify-center min-h-[200px] sm:min-h-[240px] rounded-xl border border-dashed border-slate-700 bg-slate-800/30 gap-4 text-center px-4 py-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-400 shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-slate-200">No score history yet</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
              Upload your first resume to start tracking how your ATS score, skill match, and resume quality improve over time.
            </p>
          </div>
          <Link
            href="/resume-analyzer"
            className="min-h-[44px] flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
          >
            <UploadCloud className="w-4 h-4 shrink-0" /> Upload My First Resume
          </Link>
        </div>
      ) : (
        <div className="h-48 xs:h-56 sm:h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
              <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '0.75rem',
                  fontSize: '11px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="atsScore"     name="ATS Score"      stroke="#818cf8" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="skillMatch"   name="Skill Match %"  stroke="#22d3ee" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="resumeQuality"name="Resume Quality" stroke="#34d399" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
