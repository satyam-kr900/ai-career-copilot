'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import DemoBanner from '@/components/common/DemoBanner';
import FileUploader from '@/components/resume/FileUploader';
import ATSScoreCard from '@/components/resume/ATSScoreCard';
import ScoreChart from '@/components/analytics/ScoreChart';
import { ParsedResume, ATSScoreBreakdown } from '@/types';
import { Award, Target, Sparkles, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [parsed, setParsed] = useState<ParsedResume | null>({
    name: "Satyam Kumar",
    email: "satyam.developer@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    linkedIn: "https://linkedin.com/in/satyam-kumar",
    gitHub: "https://github.com/satyam-dev",
    portfolio: "https://satyam.dev",
    summary: "Senior Full Stack Software Engineer with 4+ years of experience building high-scale web applications, microservices, and AI integrations using React, Next.js, TypeScript, Node.js, and PostgreSQL.",
    education: [
      { institution: "Stanford University", degree: "Bachelor of Science", fieldOfStudy: "Computer Science", startDate: "2018", endDate: "2022", gpa: "3.8/4.0", highlights: ["Dean's List"] }
    ],
    experience: [
      {
        company: "TechScale Innovations",
        role: "Full Stack Software Engineer",
        location: "San Francisco, CA",
        startDate: "2022-06",
        endDate: "Present",
        current: true,
        bulletPoints: [
          "Engineered responsive React and Next.js micro-frontends serving 500,000+ monthly active users.",
          "Designed RESTful and GraphQL APIs using Node.js and TypeScript, reducing average latency by 35%.",
          "Implemented database query optimization and Prisma ORM indexing in PostgreSQL."
        ],
        technologiesUsed: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Docker"]
      }
    ],
    internships: [],
    projects: [
      {
        title: "KnowSamvidhan AI",
        description: "AI civic research platform using RAG and vector embeddings.",
        technologies: ["Next.js", "TypeScript", "Prisma", "Supabase", "OpenAI API"],
        bulletPoints: ["Built Next.js app with vector similarity search for instant semantic legal document retrieval."]
      }
    ],
    technicalSkills: ["Next.js", "React", "TypeScript", "Node.js", "Python", "SQL", "PostgreSQL", "Prisma", "Docker", "AWS"],
    softSkills: ["Problem Solving", "System Architecture", "Agile Methodologies"],
    certifications: ["AWS Certified Solutions Architect"],
    achievements: ["Winner of HackStanford 2021"],
    publications: [],
    languages: ["English (Native)"],
    detectedSections: ["SUMMARY", "EXPERIENCE", "EDUCATION", "PROJECTS", "SKILLS"],
    completenessScore: 92,
    sectionQuality: 90,
    formattingQuality: 95,
    atsReadability: 92
  });

  const [atsAnalysis, setAtsAnalysis] = useState<ATSScoreBreakdown>({
    overallScore: 86,
    keywordMatch: 82,
    skillsMatch: 91,
    experienceMatch: 85,
    educationMatch: 95,
    projectRelevance: 88,
    jobTitleMatch: 90,
    resumeStructure: 92,
    formattingCompatibility: 95,
    positiveFactors: [
      "Strong technical skill alignment in React, Next.js, and TypeScript.",
      "High density of industry action verbs and quantifiable bullet points.",
      "Clean section structure compatible with Taleo & Greenhouse ATS."
    ],
    negativeFactors: [
      "Include explicit percentage numbers in project descriptions.",
      "Add Docker & AWS cloud infrastructure bullet references."
    ],
    explanations: [
      "Score of 86/100 calculated using weighted 25% skill vector match and 20% experience match.",
      "Resume structure scored 92/100 with 5 verified ATS sections."
    ]
  });

  return (
    <div className="space-y-6 pb-12">
      <Header title="Career Copilot Dashboard" />

      <div className="px-6 space-y-6">
        <DemoBanner />

        {/* Overview Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
              <span>ATS Score</span>
              <Award className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-indigo-400">{atsAnalysis.overallScore}</span>
              <span className="text-xs text-slate-400">/ 100</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${atsAnalysis.overallScore}%` }} />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
              <span>Career Readiness</span>
              <Target className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-emerald-400">84</span>
              <span className="text-xs text-slate-400">/ 100</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '84%' }} />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
              <span>Skill Match</span>
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-cyan-400">{atsAnalysis.skillsMatch}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-cyan-500 h-1.5 rounded-full" style={{ width: `${atsAnalysis.skillsMatch}%` }} />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
              <span>Job Match</span>
              <Target className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-amber-400">91%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '91%' }} />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
              <span>Resume Quality</span>
              <FileText className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-indigo-300">92</span>
              <span className="text-xs text-slate-400">/ 100</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-indigo-400 h-1.5 rounded-full" style={{ width: '92%' }} />
            </div>
          </div>
        </div>

        {/* Upload & Score Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="font-bold text-slate-100 text-sm">Upload New Resume Version</h3>
              <FileUploader onParsed={(newResume) => setParsed(newResume)} />
            </div>

            {/* Quick Actions Links */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="font-bold text-slate-100 text-sm">Copilot Quick Tools</h3>
              
              <div className="space-y-2">
                {[
                  { name: 'Job-Specific Tailoring', href: '/resume-optimizer', icon: Sparkles },
                  { name: 'Missing Skills Gap Matrix', href: '/skill-gap', icon: Target },
                  { name: 'AI Cover Letter Generator', href: '/cover-letter', icon: FileText },
                  { name: 'Start AI Mock Interview', href: '/interview-prep', icon: Award }
                ].map((act, i) => {
                  const Icon = act.icon;
                  return (
                    <Link
                      key={i}
                      href={act.href}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-xs font-medium text-slate-200 transition"
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-indigo-400" /> {act.name}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {/* ATS Score Card Component */}
            <ATSScoreCard ats={atsAnalysis} />

            {/* Score History Graph */}
            <ScoreChart />
          </div>
        </div>
      </div>
    </div>
  );
}
