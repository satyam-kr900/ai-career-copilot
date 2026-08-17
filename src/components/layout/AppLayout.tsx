'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function AppLayout({ children, title }: AppLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent background scroll when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <div className="bg-slate-950 text-slate-100 flex min-h-[100dvh] antialiased max-w-full overflow-x-hidden">
      {/* Desktop Sidebar (hidden below 768px `md`, visible on `md`+) */}
      <div className="hidden md:flex shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Drawer Overlay for All Handsets & Small Tablets (< 768px) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer container with safe area inset padding */}
          <div className="relative flex flex-col w-72 max-w-[85vw] bg-slate-900 h-[100dvh] shadow-2xl border-r border-slate-800 z-10 animate-in slide-in-from-left duration-200">
            <Sidebar onNavigate={() => setMobileMenuOpen(false)} isMobile={true} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-950 min-h-[100dvh] overflow-y-auto max-w-full">
        <Header
          title={title}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />
        <div className="flex-1 max-w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
