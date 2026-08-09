'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { Bot, Send, User, Sparkles } from 'lucide-react';

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
    <div className="space-y-6 pb-12">
      <Header title="RAG-Powered AI Career Assistant" />

      <div className="px-6 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-[600px] flex flex-col justify-between">
          {/* Chat Messages */}
          <div className="space-y-4 overflow-y-auto pr-2">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex gap-3 ${m.sender === 'USER' ? 'justify-end' : 'justify-start'}`}>
                {m.sender === 'AI' && (
                  <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`p-4 rounded-2xl text-xs max-w-xl leading-relaxed ${
                  m.sender === 'USER'
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-slate-850 border border-slate-800 text-slate-200 rounded-bl-none'
                }`}>
                  {m.text}
                </div>

                {m.sender === 'USER' && (
                  <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold text-xs shrink-0">
                    SK
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Prompts & Input Bar */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="flex flex-wrap gap-2">
              {[
                "Why is my ATS score low?",
                "How can I improve my projects?",
                "Am I suitable for AI Developer jobs?",
                "What questions can interviewer ask from my resume?"
              ].map((q, i) => (
                <button
                  key={i}
                  onClick={() => setInput(q)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-indigo-300 border border-slate-700 transition"
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
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 transition disabled:opacity-50"
              >
                {loading ? 'Thinking...' : 'Send'} <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
