'use client';

import React, { useState, useRef, useCallback, KeyboardEvent } from 'react';
import { UploadCloud, FileText, CheckCircle2, Loader2, AlertCircle, X } from 'lucide-react';
import { ParsedResume } from '@/types';

interface FileUploaderProps {
  onParsed: (resume: ParsedResume) => void;
}

type UploadState = 'idle' | 'dragging' | 'uploading' | 'success' | 'error-type' | 'error-size';

const MAX_FILE_SIZE_MB = 10;
const ACCEPTED_EXTENSIONS = ['.pdf', '.docx', '.doc'];

export default function FileUploader({ onParsed }: FileUploaderProps) {
  const [state, setState] = useState<UploadState>('idle');
  const [fileName, setFileName] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(async (file: File) => {
    // Validate file type
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!ACCEPTED_EXTENSIONS.includes(ext)) {
      setState('error-type');
      return;
    }
    // Validate file size
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setState('error-size');
      return;
    }

    setFileName(file.name);
    setState('uploading');
    setProgress(0);

    // Animate progress bar
    const interval = setInterval(() => {
      setProgress(p => (p < 85 ? p + 12 : p));
    }, 180);

    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/resume/parse', { method: 'POST', body: formData });
      const json = await res.json();
      clearInterval(interval);
      setProgress(100);
      if (json.success && json.data) {
        setState('success');
        onParsed(json.data);
      } else {
        setState('error-type');
      }
    } catch {
      clearInterval(interval);
      setState('error-type');
    }
  }, [onParsed]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setState('idle');
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setState('dragging'); };
  const handleDragLeave = () => { if (state === 'dragging') setState('idle'); };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  // Keyboard accessibility: press Enter or Space to open file picker
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      inputRef.current?.click();
    }
  };

  const reset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setState('idle');
    setFileName(null);
    setProgress(0);
    if (inputRef.current) inputRef.current.value = '';
  };

  // ── Styling per state ──────────────────────────────────────────────
  const containerStyle: Record<UploadState, string> = {
    idle:       'border-slate-700 bg-slate-900/50 hover:border-indigo-500',
    dragging:   'border-indigo-400 bg-indigo-950/40 scale-[1.01]',
    uploading:  'border-indigo-500 bg-slate-900/60',
    success:    'border-emerald-500/70 bg-emerald-950/20',
    'error-type': 'border-rose-500/70 bg-rose-950/20',
    'error-size': 'border-rose-500/70 bg-rose-950/20',
  };

  const IconEl = () => {
    if (state === 'uploading') return <Loader2 className="w-7 h-7 animate-spin text-indigo-400" />;
    if (state === 'success')   return <CheckCircle2 className="w-7 h-7 text-emerald-400" />;
    if (state === 'error-type' || state === 'error-size') return <AlertCircle className="w-7 h-7 text-rose-400" />;
    if (state === 'dragging')  return <UploadCloud className="w-7 h-7 text-indigo-300 animate-bounce" />;
    return <UploadCloud className="w-7 h-7 text-indigo-400" />;
  };

  const headingText = () => {
    if (state === 'dragging')    return 'Release to upload your resume';
    if (state === 'uploading')   return `Parsing "${fileName}"…`;
    if (state === 'success')     return `Parsed successfully: ${fileName}`;
    if (state === 'error-type')  return 'Unsupported file type';
    if (state === 'error-size')  return 'File too large (max 10 MB)';
    return 'Drag & Drop your Resume here';
  };

  const subText = () => {
    if (state === 'error-type') return 'Please upload a PDF, DOCX, or DOC file.';
    if (state === 'error-size') return 'Your file exceeds 10 MB. Try a compressed version.';
    if (state === 'success')    return 'Your resume has been parsed. Scores are updated above.';
    return 'Supports PDF, DOCX, DOC — up to 10 MB';
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Upload resume file — press Enter or Space to browse"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onKeyDown={handleKeyDown}
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer relative transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${containerStyle[state]}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx,.doc,.txt"
        onChange={handleChange}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />

      <div className="flex flex-col items-center justify-center space-y-3">
        {/* Icon area */}
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 ${
          state === 'success'    ? 'bg-emerald-500/15' :
          state === 'dragging'   ? 'bg-indigo-500/25 scale-110' :
          state === 'uploading'  ? 'bg-indigo-500/15' :
          (state === 'error-type' || state === 'error-size') ? 'bg-rose-500/15' :
          'bg-indigo-600/10 hover:bg-indigo-600/20'
        }`}>
          <IconEl />
        </div>

        <div>
          <h3 className={`font-semibold text-sm ${
            state === 'success'                           ? 'text-emerald-300' :
            (state === 'error-type' || state === 'error-size') ? 'text-rose-300' :
            state === 'dragging'                          ? 'text-indigo-200' :
            'text-slate-200'
          }`}>
            {headingText()}
          </h3>
          <p className="text-xs text-slate-400 mt-1">{subText()}</p>
        </div>

        {/* Progress bar (uploading only) */}
        {state === 'uploading' && (
          <div className="w-full max-w-xs">
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-indigo-500 h-1.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1 text-right">{progress}%</p>
          </div>
        )}

        {/* Idle / dragging CTA button */}
        {(state === 'idle' || state === 'dragging') && (
          <button
            type="button"
            className={`px-4 py-2 rounded-xl text-xs font-semibold border pointer-events-none transition ${
              state === 'dragging'
                ? 'bg-indigo-600 text-white border-indigo-500'
                : 'bg-slate-800 text-slate-200 border-slate-700'
            }`}
          >
            Browse Resume File
          </button>
        )}

        {/* Error retry button */}
        {(state === 'error-type' || state === 'error-size') && (
          <button
            type="button"
            onClick={reset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700 hover:border-rose-500 hover:text-rose-300 transition"
          >
            <X className="w-3.5 h-3.5" /> Try Another File
          </button>
        )}

        {/* Success reset */}
        {state === 'success' && (
          <button
            type="button"
            onClick={reset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700 hover:border-indigo-500 transition"
          >
            <UploadCloud className="w-3.5 h-3.5" /> Upload Different Resume
          </button>
        )}
      </div>
    </div>
  );
}
