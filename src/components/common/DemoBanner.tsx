'use client';

import React from 'react';
import { Info } from 'lucide-react';

export default function DemoBanner() {
  return (
    <div className="bg-gradient-to-r from-indigo-900/60 via-slate-900 to-indigo-950/60 border border-indigo-500/30 rounded-xl p-3.5 sm:p-4 text-xs text-indigo-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg shadow-indigo-950/40">
      <div className="flex items-start sm:items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5 sm:mt-0">
          <Info className="w-4 h-4" />
        </div>
        <div>
          <span className="font-semibold text-white">Instant Demo & Grounded Mode Active: </span>
          <span className="text-indigo-200/90">Pre-loaded with sample developer resume & job description data. All AI features work offline with zero-config fallback.</span>
        </div>
      </div>
      <button
        onClick={() => alert("Preloaded sample datasets ready for immediate review!")}
        className="w-full sm:w-auto px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition shadow shrink-0 text-center"
      >
        Load Demo Data
      </button>
    </div>
  );
}
