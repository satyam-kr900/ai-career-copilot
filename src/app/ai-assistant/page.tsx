'use client';

import React, { useState } from 'react';
import { Bot, Send } from 'lucide-react';

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Array<{ sender: 'USER' | 'AI'; text: string }>>([
    {
      sender: 'AI',
      text: 'Hello! I am your RAG Career Assistant grounded in your uploaded resume and job analysis context. Ask me anything about improving your ATS score, project explanations, or target job suitability.'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { sender: 'USER', text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });
      const json = await res.json();
      if (json.success) {
        setMessages(prev => [...prev, { sender: 'AI', text: json.answer }]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 px-3 sm:px-6 py-4 sm:py-6 pb-12">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 h-[calc(100vh-160px)] min-h-[480px] sm:min-h-[560px] flex flex-col justify-between">
        {/* Chat Messages */}
        <div className="space-y-3 sm:space-y-4 overflow-y-auto pr-1 sm:pr-2 flex-1">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex gap-2 sm:gap-3 ${m.sender === 'USER' ? 'justify-end' : 'justify-start'}`}>
              {m.sender === 'AI' && (
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                  <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              )}

              <div className={`p-3 sm:p-4 rounded-2xl text-xs max-w-[88%] sm:max-w-xl leading-relaxed ${
                m.sender === 'USER'
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-slate-850 border border-slate-800 text-slate-200 rounded-bl-none'
              }`}>
                {m.text}
              </div>

              {m.sender === 'USER' && (
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold text-[11px] sm:text-xs shrink-0">
                  SK
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Prompts & Input Bar */}
        <div className="pt-3 sm:pt-4 border-t border-slate-800 space-y-2.5 sm:space-y-3 shrink-0">
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {[
              "Why is my ATS score low?",
              "How can I improve my projects?",
              "Am I suitable for AI Developer jobs?",
              "What questions can interviewer ask from my resume?"
            ].map((q, i) => (
              <button
                key={i}
                onClick={() => setInput(q)}
                className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[10px] sm:text-[11px] text-indigo-300 border border-slate-700 transition text-left truncate max-w-full"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask your grounded career assistant..."
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 sm:py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 min-w-0"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition disabled:opacity-50 shrink-0"
            >
              {loading ? '...' : 'Send'} <Send className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
