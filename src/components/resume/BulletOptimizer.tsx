'use client';

import React, { useState } from 'react';
import { BulletOptimization } from '@/types';
import { Sparkles, ArrowRight, Check, Copy } from 'lucide-react';

export default function BulletOptimizer() {
  const [bullets, setBullets] = useState<string[]>([
    "Worked on an e-commerce website.",
    "Built REST APIs using Node.js.",
    "Helped optimize database queries."
  ]);

  const [optimizations, setOptimizations] = useState<BulletOptimization[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleOptimize = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/resume/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'optimize_bullets', bullets })
      });
      const json = await res.json();
      if (json.success) {
        setOptimizations(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" /> AI Resume Bullet Point Optimizer
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Transforms weak bullet points into high-impact ATS bullet points using action verbs and metric placeholders.
          </p>
        </div>

        <button
          onClick={handleOptimize}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 transition disabled:opacity-50"
        >
          {loading ? 'Optimizing...' : 'Improve My Resume Bullets'}
        </button>
      </div>

      {/* Editable Bullets Input */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-slate-300">Original Bullet Points:</label>
        {bullets.map((bullet, idx) => (
          <input
            key={idx}
            type="text"
            value={bullet}
            onChange={(e) => {
              const updated = [...bullets];
              updated[idx] = e.target.value;
              setBullets(updated);
            }}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        ))}
      </div>

      {/* Results Comparison View */}
      {optimizations && (
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h4 className="text-sm font-bold text-slate-200">Before vs. After Optimization:</h4>
          {optimizations.map((item, idx) => (
            <div key={idx} className="bg-slate-850 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block mb-1">ORIGINAL</span>
                  <p className="text-xs text-slate-400">{item.original}</p>
                </div>

                <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-3 relative group">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">AI IMPROVED VERSION</span>
                  <p className="text-xs text-emerald-200 font-medium leading-relaxed">{item.improved}</p>
                  
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(item.improved);
                      setCopiedIdx(idx);
                      setTimeout(() => setCopiedIdx(null), 2000);
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white text-xs flex items-center gap-1 transition"
                  >
                    {copiedIdx === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="bg-slate-900/60 rounded-lg p-3 text-xs border border-slate-800/60">
                <span className="font-semibold text-indigo-300">Why It Is Better: </span>
                <span className="text-slate-400">{item.reasoning}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
