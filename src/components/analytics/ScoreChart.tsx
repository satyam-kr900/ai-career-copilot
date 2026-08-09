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
  Legend 
} from 'recharts';
import { ScoreHistoryPoint } from '@/types';

const defaultData: ScoreHistoryPoint[] = [
  { month: 'May', atsScore: 62, skillMatch: 58, resumeQuality: 65 },
  { month: 'June', atsScore: 68, skillMatch: 64, resumeQuality: 72 },
  { month: 'July', atsScore: 78, skillMatch: 75, resumeQuality: 82 },
  { month: 'August', atsScore: 86, skillMatch: 84, resumeQuality: 92 },
];

export default function ScoreChart({ data = defaultData }: { data?: ScoreHistoryPoint[] }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-100 text-sm">Resume Score Improvement Over Time</h3>
          <p className="text-xs text-slate-400">Tracks ATS score, Skill match %, and Quality progression</p>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
            <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={12} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Line type="monotone" dataKey="atsScore" name="ATS Score" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="skillMatch" name="Skill Match %" stroke="#06b6d4" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="resumeQuality" name="Resume Quality" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
