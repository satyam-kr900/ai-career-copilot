'use client';

import React from 'react';
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
  Briefcase
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Resume Analyzer', href: '/resume-analyzer', icon: FileText },
  { name: 'Job Matcher', href: '/job-matcher', icon: Target },
  { name: 'Resume Optimizer', href: '/resume-optimizer', icon: Sparkles },
  { name: 'Skill Gap Engine', href: '/skill-gap', icon: Layers },
  { name: 'Cover Letter', href: '/cover-letter', icon: Mail },
  { name: 'Interview Prep', href: '/interview-prep', icon: MessageSquare },
  { name: 'Career Roadmap', href: '/career-roadmap', icon: Map },
  { name: 'Resume History', href: '/resume-history', icon: History },
  { name: 'AI Assistant', href: '/ai-assistant', icon: Bot },
  { name: 'Admin Analytics', href: '/admin', icon: BarChart3 },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between h-screen sticky top-0">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-white tracking-wide text-base leading-tight">Career Copilot</h1>
            <span className="text-xs text-indigo-400 font-medium">Production AI Platform</span>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="px-3 py-4 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
          {navigation.map((item) => {
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
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Profile Footer */}
      <div className="p-4 border-t border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-semibold text-xs text-white">
            SK
          </div>
          <div>
            <p className="text-xs font-medium text-slate-200">Satyam Kumar</p>
            <p className="text-[10px] text-slate-500">Pro Developer</p>
          </div>
        </div>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="AI Engine Active" />
      </div>
    </aside>
  );
}
