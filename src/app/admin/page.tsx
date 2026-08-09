'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import { BarChart3, Users, FileCheck, Award, Zap } from 'lucide-react';

export default function AdminPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(json => json.success && setStats(json.data));
  }, []);

  return (
    <div className="space-y-6 pb-12">
      <Header title="System Admin & Platform Analytics" />

      <div className="px-6 space-y-6">
        {stats ? (
          <>
            {/* Metric Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
                <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
                  <span>Total Platform Users</span>
                  <Users className="w-4 h-4 text-indigo-400" />
                </div>
                <span className="text-2xl font-black text-white">{stats.totalUsers}</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
                <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
                  <span>Total Analyses Run</span>
                  <FileCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-2xl font-black text-emerald-400">{stats.totalAnalyses}</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
                <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
                  <span>Average ATS Score</span>
                  <Award className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-2xl font-black text-cyan-400">{stats.averageAtsScore} / 100</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
                <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
                  <span>AI Latency & Validation</span>
                  <Zap className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-2xl font-black text-amber-400">{stats.aiUsageStats.avgLatencyMs}ms</span>
                <span className="text-[10px] text-slate-400 font-medium">Zod Success: {stats.aiUsageStats.zodValidationSuccessRate}</span>
              </div>
            </div>

            {/* Most Common Missing Skills & Top Roles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="font-bold text-slate-200 text-sm">Most Common Missing Candidate Skills</h4>
                <div className="space-y-2">
                  {stats.mostCommonMissingSkills.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between items-center bg-slate-850 p-3 rounded-xl border border-slate-800 text-xs">
                      <span className="font-bold text-slate-200">{item.skill}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-300 font-semibold">{item.count} users missing</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="font-bold text-slate-200 text-sm">Top Analyzed Target Roles</h4>
                <div className="space-y-2">
                  {stats.topTargetRoles.map((item: any, i: number) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium text-slate-300">
                        <span>{item.role}</span>
                        <span className="font-bold text-indigo-400">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-slate-400 text-xs">Loading admin platform metrics...</div>
        )}
      </div>
    </div>
  );
}
