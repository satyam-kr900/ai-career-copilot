'use client';

import React, { useState } from 'react';
import { Mail, Sparkles, Copy, Check } from 'lucide-react';

export default function CoverLetterPage() {
  const [company, setCompany] = useState('InnovateAI Labs');
  const [role, setRole] = useState('Senior Full Stack Developer');
  const [tone, setTone] = useState<'Professional' | 'Confident' | 'Concise'>('Professional');
  const [loading, setLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/cover-letter/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: company,
          jobTitle: role,
          tone
        })
      });
      const json = await res.json();
      if (json.success && json.data) {
        setCoverLetter(json.data.coverLetter);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 px-3 sm:px-6 py-4 sm:py-6 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
          <h3 className="font-bold text-slate-100 text-xs sm:text-sm flex items-center gap-2">
            <Mail className="w-4 h-4 text-indigo-400 shrink-0" /> Target Position Details
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-300">Company Name:</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Target Role Title:</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Desired Tone:</label>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mt-1">
                {(['Professional', 'Confident', 'Concise'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`py-2 px-1 rounded-xl text-[11px] sm:text-xs font-semibold border transition text-center truncate ${
                      tone === t
                        ? 'bg-indigo-600 border-indigo-500 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Generating...' : 'Generate Customized Cover Letter'} <Sparkles className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          {coverLetter ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4 relative">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Tailored Cover Letter ({tone} Tone)</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(coverLetter);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-medium text-slate-300 hover:text-white border border-slate-700 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy Text'}
                </button>
              </div>

              <pre className="whitespace-pre-wrap font-sans text-xs text-slate-200 leading-relaxed bg-slate-850 p-3.5 sm:p-4 rounded-xl border border-slate-800 overflow-x-auto max-w-full">
                {coverLetter}
              </pre>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-12 text-center text-slate-400 space-y-3">
              <Mail className="w-10 h-10 sm:w-12 sm:h-12 text-slate-600 mx-auto" />
              <h4 className="font-bold text-slate-200 text-sm sm:text-base">No Cover Letter Generated</h4>
              <p className="text-xs max-w-xs mx-auto">Enter company details and click generate to create a grounded cover letter tailored to your resume.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
