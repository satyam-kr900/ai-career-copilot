'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Target,
  Sparkles,
  Layers,
  Mail,
  MessageSquare,
  Map,
  History,
  Bot,
  BarChart3,
  Briefcase,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

// ── Navigation grouped into logical sections ──────────────────────────────
const navSections = [
  {
    label: 'Overview',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Analyze',
    items: [
      { name: 'Resume Analyzer', href: '/resume-analyzer', icon: FileText },
      { name: 'Job Matcher',     href: '/job-matcher',     icon: Target   },
      { name: 'Skill Gap Engine',href: '/skill-gap',       icon: Layers   },
    ],
  },
  {
    label: 'Improve',
    items: [
      { name: 'Resume Optimizer', href: '/resume-optimizer', icon: Sparkles     },
      { name: 'Cover Letter',     href: '/cover-letter',     icon: Mail         },
    ],
  },
  {
    label: 'Prepare',
    items: [
      { name: 'Interview Prep', href: '/interview-prep', icon: MessageSquare },
      { name: 'Career Roadmap', href: '/career-roadmap', icon: Map           },
    ],
  },
  {
    label: 'Track',
    items: [
      { name: 'Resume History', href: '/resume-history', icon: History  },
      { name: 'AI Assistant',   href: '/ai-assistant',   icon: Bot      },
    ],
  },
  {
    label: 'Admin',
    items: [
      { name: 'Admin Analytics', href: '/admin', icon: BarChart3 },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  // Initially collapse all except the section that contains the active route
  const initialOpen: Record<string, boolean> = {};
  navSections.forEach(sec => {
    initialOpen[sec.label] = sec.items.some(
      item => pathname === item.href || (pathname === '/' && item.href === '/dashboard')
    );
  });
  // Always keep Overview open
  initialOpen['Overview'] = true;

  const [openSections, setOpenSections] = useState<Record<string, boolean>>(initialOpen);

  const toggle = (label: string) =>
    setOpenSections(prev => ({ ...prev, [label]: !prev[label] }));

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between h-screen sticky top-0">
      <div className="flex flex-col min-h-0">
        {/* ── Brand header ────────────────────────────────────── */}
        <div className="p-5 border-b border-slate-800 flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-white tracking-wide text-base leading-tight">Career Copilot</h1>
            <span className="text-xs text-indigo-400 font-medium">Production AI Platform</span>
          </div>
        </div>

        {/* ── Grouped navigation ──────────────────────────────── */}
        <nav
          className="px-3 py-3 space-y-1 overflow-y-auto flex-1"
          aria-label="Main navigation"
        >
          {navSections.map(section => {
            const isOpen = openSections[section.label] ?? false;
            const hasActive = section.items.some(
              item => pathname === item.href || (pathname === '/' && item.href === '/dashboard')
            );

            // Single-item sections (Overview, Admin) render flat
            if (section.items.length === 1) {
              const item = section.items[0];
              const isActive = pathname === item.href || (pathname === '/' && item.href === '/dashboard');
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  {item.name}
                </Link>
              );
            }

            // Multi-item sections get a collapsible group header
            return (
              <div key={section.label} className="space-y-0.5">
                <button
                  type="button"
                  onClick={() => toggle(section.label)}
                  aria-expanded={isOpen}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all ${
                    hasActive
                      ? 'text-indigo-400'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <span>{section.label}</span>
                  {isOpen
                    ? <ChevronDown className="w-3 h-3" />
                    : <ChevronRight className="w-3 h-3" />}
                </button>

                {isOpen && (
                  <div className="space-y-0.5 pl-2">
                    {section.items.map(item => {
                      const isActive = pathname === item.href;
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          aria-current={isActive ? 'page' : undefined}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                            isActive
                              ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                          }`}
                        >
                          <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* ── Profile footer ──────────────────────────────────────── */}
      <div className="p-4 border-t border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-semibold text-xs text-white">
            SK
          </div>
          <div>
            <p className="text-xs font-medium text-slate-200">Satyam Kumar</p>
            <p className="text-[10px] text-slate-500">Pro Developer</p>
          </div>
        </div>
        <span
          className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"
          title="AI Engine Active"
          aria-label="AI engine active"
        />
      </div>
    </aside>
  );
}
