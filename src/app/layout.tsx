import './globals.css';
import Sidebar from '@/components/layout/Sidebar';

export const metadata = {
  title: 'AI Career Copilot - Advanced Resume Analyzer & Career Platform',
  description: 'Production AI Career Copilot for ATS scoring, semantic job matching, bullet optimization, RAG career assistant, and mock interview prep.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 flex min-h-screen antialiased">
        <Sidebar />
        <main className="flex-1 flex flex-col min-w-0 bg-slate-950 overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
