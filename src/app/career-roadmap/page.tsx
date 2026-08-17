'use client';

import React from 'react';
import { Map, Calendar, CheckCircle2, Clock } from 'lucide-react';

export default function CareerRoadmapPage() {
  const roadmaps = {
    day7: [
      {
        topic: "Docker Containerization Fundamentals",
        desc: "Learn to write multi-stage Dockerfiles and docker-compose.yml files for Next.js and Node.js microservices.",
        skill: "Docker",
        status: "7-Day Goal"
      }
    ],
    day30: [
      {
        topic: "Deploy Cloud Infrastructure using AWS S3 & ECS",
        desc: "Set up automated CI/CD pipeline deploying Docker containers to AWS ECS with CloudFront CDN distribution.",
        skill: "AWS Cloud",
        status: "30-Day Goal"
      }
    ],
    day60: [
      {
        topic: "Build Microservices Architecture Portfolio Project",
        desc: "Synthesize Docker containerization and AWS infrastructure into a production microservice project.",
        skill: "System Design",
        status: "60-Day Goal"
      }
    ]
  };

  return (
    <div className="space-y-4 sm:space-y-6 px-3 sm:px-6 py-4 sm:py-6 pb-12">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-2">
        <h3 className="font-bold text-slate-100 text-xs sm:text-sm flex items-center gap-2">
          <Map className="w-4 h-4 text-indigo-400 shrink-0" /> Targeted Skill Acquisition Schedule
        </h3>
        <p className="text-xs text-slate-400">
          Roadmap generated based on missing critical skills required for Senior Full Stack & AI Engineer positions.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* 7-Day Plan */}
        <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-4 sm:p-5 space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="font-bold text-indigo-400 text-xs sm:text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4 shrink-0" /> 7-Day Quick Start
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-500/20 text-indigo-300 font-bold">Week 1</span>
          </div>

          {roadmaps.day7.map((item, idx) => (
            <div key={idx} className="bg-slate-850 border border-slate-800 rounded-xl p-3.5 sm:p-4 space-y-2">
              <span className="font-bold text-xs text-slate-200 block">{item.topic}</span>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                Target Skill: {item.skill}
              </span>
            </div>
          ))}
        </div>

        {/* 30-Day Plan */}
        <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-4 sm:p-5 space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="font-bold text-cyan-400 text-xs sm:text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 shrink-0" /> 30-Day Mid-Term Goal
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 font-bold">Month 1</span>
          </div>

          {roadmaps.day30.map((item, idx) => (
            <div key={idx} className="bg-slate-850 border border-slate-800 rounded-xl p-3.5 sm:p-4 space-y-2">
              <span className="font-bold text-xs text-slate-200 block">{item.topic}</span>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                Target Skill: {item.skill}
              </span>
            </div>
          ))}
        </div>

        {/* 60-Day Plan */}
        <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="font-bold text-emerald-400 text-xs sm:text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" /> 60-Day Mastery
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-bold">Month 2</span>
          </div>

          {roadmaps.day60.map((item, idx) => (
            <div key={idx} className="bg-slate-850 border border-slate-800 rounded-xl p-3.5 sm:p-4 space-y-2">
              <span className="font-bold text-xs text-slate-200 block">{item.topic}</span>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                Target Skill: {item.skill}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
