'use client';

import React, { useState } from 'react';
import FileUploader from '@/components/resume/FileUploader';
import ATSScoreCard from '@/components/resume/ATSScoreCard';
import { ParsedResume, ATSScoreBreakdown } from '@/types';
import { FileText, Mail, Phone, MapPin } from 'lucide-react';

export default function ResumeAnalyzerPage() {
  const [parsedResume, setParsedResume] = useState<ParsedResume | null>(null);
  const [jobDescription, setJobDescription] = useState<string>(
    'Looking for Senior Full Stack Engineer with React, Next.js, TypeScript, Node.js, PostgreSQL, Docker, AWS, and REST API experience.'
  );
  const [loading, setLoading] = useState(false);
  const [atsResult, setAtsResult] = useState<ATSScoreBreakdown | null>(null);

  const handleAnalyze = async () => {
    if (!parsedResume) return;
    setLoading(true);

    try {
      const res = await fetch('/api/resume/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resume: parsedResume,
          jobDescription
        })
      });

      const json = await res.json();
      if (json.success) {
        setAtsResult(json.data.ats);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 px-4 sm:px-6 py-4 sm:py-6 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" /> Upload Resume Document
            </h3>
            <FileUploader onParsed={(data) => setParsedResume(data)} />
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
            <h3 className="font-bold text-slate-100 text-sm">Target Job Description</h3>
            <textarea
              rows={5}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={handleAnalyze}
              disabled={!parsedResume || loading}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition disabled:opacity-50"
            >
              {loading ? 'Analyzing ATS Alignment...' : 'Calculate ATS Compatibility'}
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {parsedResume ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-100">{parsedResume.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{parsedResume.summary}</p>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <span className="text-xl sm:text-2xl font-black text-indigo-400">{parsedResume.completenessScore}%</span>
                  <span className="block text-[10px] text-slate-400 font-semibold uppercase">Completeness</span>
                </div>
              </div>

              {/* Contact Info Pills */}
              <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                {parsedResume.email && <span className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700"><Mail className="w-3.5 h-3.5 text-indigo-400" /> {parsedResume.email}</span>}
                {parsedResume.phone && <span className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700"><Phone className="w-3.5 h-3.5 text-emerald-400" /> {parsedResume.phone}</span>}
                {parsedResume.location && <span className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700"><MapPin className="w-3.5 h-3.5 text-rose-400" /> {parsedResume.location}</span>}
              </div>

              {/* Technical Skills Extracted */}
              <div>
                <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider mb-2">Technical Skills Extracted ({parsedResume.technicalSkills.length}):</h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {parsedResume.technicalSkills.map((skill, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Work Experience Extracted */}
              <div>
                <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider mb-3">Extracted Experience:</h4>
                <div className="space-y-3">
                  {parsedResume.experience.map((exp, idx) => (
                    <div key={idx} className="bg-slate-850 border border-slate-800 rounded-xl p-3.5 sm:p-4 space-y-2">
                      <div className="flex flex-col sm:flex-row justify-between text-xs gap-1">
                        <span className="font-bold text-slate-200">{exp.role} <span className="text-indigo-400">@ {exp.company}</span></span>
                        <span className="text-slate-400">{exp.startDate} - {exp.endDate || 'Present'}</span>
                      </div>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {exp.bulletPoints.map((b, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-indigo-400 mt-0.5 shrink-0">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-12 text-center text-slate-400 space-y-3">
              <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-slate-600 mx-auto" />
              <h4 className="font-bold text-slate-200 text-sm sm:text-base">No Resume Parsed Yet</h4>
              <p className="text-xs max-w-sm mx-auto">Upload a PDF or DOCX resume to test 18+ section automatic field extraction.</p>
            </div>
          )}

          {atsResult && <ATSScoreCard ats={atsResult} />}
        </div>
      </div>
    </div>
  );
}
