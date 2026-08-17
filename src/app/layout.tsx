import './globals.css';
import AppLayout from '@/components/layout/AppLayout';

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
      <body className="bg-slate-950 text-slate-100 min-h-screen antialiased">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
