'use client';

import React, { useState } from 'react';
import { InterviewQuestionItem, InterviewAnswerEvaluation } from '@/types';
import { MessageSquare, Send, CheckCircle, AlertCircle, Award, ArrowRight } from 'lucide-react';

interface MockInterviewChatProps {
  questions: InterviewQuestionItem[];
}

export default function MockInterviewChat({ questions }: MockInterviewChatProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<{ question: InterviewQuestionItem; answer: string; evalResult: InterviewAnswerEvaluation }[]>([]);

  const currentQ = questions[currentIdx];

  const handleSubmitAnswer = async () => {
    if (!userAnswer.trim()) return;
    setLoading(true);

    try {
      const res = await fetch('/api/interview/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText: currentQ.question,
          userAnswer,
          expectedAnswerPoints: currentQ.expectedAnswerPoints
        })
      });

      const json = await res.json();
      if (json.success && json.data) {
        setHistory(prev => [...prev, {
          question: currentQ,
          answer: userAnswer,
          evalResult: json.data
        }]);
        setUserAnswer('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-base">Interactive AI Mock Interviewer</h3>
            <p className="text-xs text-slate-400">Step-by-step interview questions with instant evaluation</p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
          Question {currentIdx + 1} of {questions.length}
        </span>
      </div>

      {/* Active Question Box */}
      {currentQ && (
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              {currentQ.category}
            </span>
            <span className="text-xs text-slate-400">Why Asked: {currentQ.whyAsked}</span>
          </div>

          <h4 className="text-sm font-bold text-white leading-snug">{currentQ.question}</h4>

          <div className="space-y-2 pt-2">
            <textarea
              rows={3}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your structured answer here (e.g. STAR method)..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={handleSubmitAnswer}
                disabled={loading || !userAnswer.trim()}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 transition disabled:opacity-50"
              >
                {loading ? 'Evaluating...' : 'Submit Answer'} <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History & Evaluation Cards */}
      {history.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h4 className="font-bold text-slate-200 text-sm">Evaluation History:</h4>

          {history.map((item, idx) => (
            <div key={idx} className="bg-slate-850 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">Q: {item.question.question}</span>
                <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  item.evalResult.score >= 80 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  Score: {item.evalResult.score}/100
                </span>
              </div>

              <div className="bg-slate-900 rounded-xl p-3 text-xs text-slate-300">
                <span className="font-bold text-slate-400 block mb-1">Your Answer:</span>
                "{item.answer}"
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-3 space-y-1">
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Strengths
                  </span>
                  {item.evalResult.strengths.map((s, i) => (
                    <p key={i} className="text-emerald-200">• {s}</p>
                  ))}
                </div>

                <div className="bg-rose-950/20 border border-rose-500/20 rounded-xl p-3 space-y-1">
                  <span className="font-bold text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> Areas to Improve
                  </span>
                  {item.evalResult.weaknesses.map((w, i) => (
                    <p key={i} className="text-rose-200">• {w}</p>
                  ))}
                </div>
              </div>

              <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-xl p-3 text-xs space-y-1">
                <span className="font-bold text-indigo-300 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" /> Recommended Better Answer:
                </span>
                <p className="text-indigo-200 leading-relaxed">{item.evalResult.betterAnswer}</p>
              </div>

              {idx === history.length - 1 && currentIdx < questions.length - 1 && (
                <button
                  onClick={() => setCurrentIdx(prev => prev + 1)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700 transition"
                >
                  Proceed to Next Question <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
