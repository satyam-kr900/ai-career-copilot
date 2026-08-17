'use client';

import React from 'react';
import { Bell, Sparkles, Download, Menu } from 'lucide-react';

interface HeaderProps {
  title?: string;
  onOpenMobileMenu?: () => void;
}

export default function Header({ title = 'Career Copilot', onOpenMobileMenu }: HeaderProps) {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile Hamburger Menu Button */}
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            aria-label="Open navigation menu"
            className="md:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <h2 className="text-base sm:text-lg md:text-xl font-bold text-slate-100 tracking-tight truncate">
          {title}
        </h2>

        <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
          <Sparkles className="w-3 h-3" /> Grounded AI
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
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
          className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden xs:inline sm:inline">Export (PDF)</span>
        </button>

        <button
          aria-label="Notifications"
          className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700"
        >
          <Bell className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
