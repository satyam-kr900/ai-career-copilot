'use client';

import React from 'react';
import { Bell, Sparkles, Download } from 'lucide-react';

export default function Header({ title }: { title: string }) {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/60 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold text-slate-100 tracking-tight">{title}</h2>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Grounded AI Mode
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={async () => {
            const res = await fetch('/api/export', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ format: 'pdf' })
            });
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Analysis_Report.pdf';
            a.click();
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
        >
          <Download className="w-3.5 h-3.5" /> Export Report (PDF)
        </button>

        <button className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700">
          <Bell className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
