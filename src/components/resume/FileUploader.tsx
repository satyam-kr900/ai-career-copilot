'use client';

import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { ParsedResume } from '@/types';

interface FileUploaderProps {
  onParsed: (resume: ParsedResume) => void;
}

export default function FileUploader({ onParsed }: FileUploaderProps) {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    setFileName(file.name);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/resume/parse', {
        method: 'POST',
        body: formData
      });

      const json = await res.json();
      if (json.success && json.data) {
        onParsed(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-2xl p-8 bg-slate-900/50 text-center transition-all cursor-pointer relative group">
      <input
        type="file"
        accept=".pdf,.docx,.doc,.txt"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleFileUpload(e.target.files[0]);
          }
        }}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />

      <div className="flex flex-col items-center justify-center space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-indigo-600/10 text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600/20 transition-all flex items-center justify-center">
          {loading ? (
            <Loader2 className="w-7 h-7 animate-spin text-indigo-400" />
          ) : fileName ? (
            <CheckCircle className="w-7 h-7 text-emerald-400" />
          ) : (
            <UploadCloud className="w-7 h-7" />
          )}
        </div>

        <div>
          <h3 className="font-semibold text-slate-200 text-sm">
            {fileName ? `Uploaded: ${fileName}` : 'Drag & Drop your Resume here'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">Supports PDF, DOCX, DOC files up to 10MB</p>
        </div>

        <button className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-200 border border-slate-700 pointer-events-none group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 transition">
          Browse Resume File
        </button>
      </div>
    </div>
  );
}
