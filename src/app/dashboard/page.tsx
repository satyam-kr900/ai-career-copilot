'use client';

import React, { useState } from 'react';
import DemoBanner from '@/components/common/DemoBanner';
import FileUploader from '@/components/resume/FileUploader';
import ATSScoreCard from '@/components/resume/ATSScoreCard';
import ScoreChart from '@/components/analytics/ScoreChart';
import { ParsedResume, ATSScoreBreakdown } from '@/types';
import { Award, Target, Sparkles, FileText, ArrowRight, Info } from 'lucide-react';
import Link from 'next/link';

const DEMO_RESUME: ParsedResume = {
  name: 'Satyam Kumar',
  email: 'satyam.developer@example.com',
  phone: '+1 (555) 234-5678',
  location: 'San Francisco, CA',
  linkedIn: 'https://linkedin.com/in/satyam-kumar',
  gitHub: 'https://github.com/satyam-dev',
  portfolio: 'https://satyam.dev',
  summary: 'Senior Full Stack Software Engineer with 4+ years of experience building high-scale web applications, microservices, and AI integrations using React, Next.js, TypeScript, Node.js, and PostgreSQL.',
  education: [
    { institution: 'Stanford University', degree: 'Bachelor of Science', fieldOfStudy: 'Computer Science', startDate: '2018', endDate: '2022', gpa: '3.8/4.0', highlights: ["Dean's List"] },
  ],
  experience: [
    {
      company: 'TechScale Innovations',
      role: 'Full Stack Software Engineer',
      location: 'San Francisco, CA',
      startDate: '2022-06',
      endDate: 'Present',
      current: true,
      bulletPoints: [
        'Engineered responsive React and Next.js micro-frontends serving 500,000+ monthly active users.',
        'Designed RESTful and GraphQL APIs using Node.js and TypeScript, reducing average latency by 35%.',
        'Implemented database query optimization and Prisma ORM indexing in PostgreSQL.',
      ],
      technologiesUsed: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Docker'],
    },
  ],
  internships: [],
  projects: [
    {
      title: 'KnowSamvidhan AI',
      description: 'AI civic research platform using RAG and vector embeddings.',
      technologies: ['Next.js', 'TypeScript', 'Prisma', 'Supabase', 'OpenAI API'],
      bulletPoints: ['Built Next.js app with vector similarity search for instant semantic legal document retrieval.'],
    },
  ],
  technicalSkills: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Python', 'SQL', 'PostgreSQL', 'Prisma', 'Docker', 'AWS'],
  softSkills: ['Problem Solving', 'System Architecture', 'Agile Methodologies'],
  certifications: ['AWS Certified Solutions Architect'],
  achievements: ['Winner of HackStanford 2021'],
  publications: [],
  languages: ['English (Native)'],
  detectedSections: ['SUMMARY', 'EXPERIENCE', 'EDUCATION', 'PROJECTS', 'SKILLS'],
  completenessScore: 92,
  sectionQuality: 90,
  formattingQuality: 95,
  atsReadability: 92,
};

const DEMO_ATS: ATSScoreBreakdown = {
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
    'Strong technical skill alignment in React, Next.js, and TypeScript.',
    'High density of industry action verbs and quantifiable bullet points.',
    'Clean section structure compatible with Taleo & Greenhouse ATS.',
  ],
  negativeFactors: [
    'Include explicit percentage numbers in project descriptions.',
    'Add Docker & AWS cloud infrastructure bullet references.',
  ],
  explanations: [
    'Score of 86/100 calculated using weighted 25% skill vector match and 20% experience match.',
    'Resume structure scored 92/100 with 5 verified ATS sections.',
  ],
};

const METRIC_TOOLTIPS: Record<string, string> = {
  'ATS Score':        'Overall weighted compatibility of your resume with Applicant Tracking Systems, combining keyword density, skill coverage, and formatting (0–100).',
  'Career Readiness': 'Composite score across resume quality, project depth, experience, and interview preparedness — not limited to one job posting.',
  'Skill Match':      'Percentage of technical skills in your resume that directly appear in or semantically match the target job description.',
  'Job Match':        'Semantic similarity between your full profile and the best-matching open role found in the job recommendation engine.',
  'Resume Quality':   'Structural completeness of your resume — section coverage, action verbs, completeness, and ATS readability formatting.',
};

function MetricTooltip({ text }: { text: string }) {
  const [visible, setVisible] = useState(false);
  return (
    <span className="relative inline-flex">
      <button
        type="button"
        aria-label="More information"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        className="min-h-[32px] min-w-[32px] flex items-center justify-center text-slate-500 hover:text-slate-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 rounded"
      >
        <Info className="w-3.5 h-3.5" />
      </button>
      {visible && (
        <span
          role="tooltip"
          className="absolute z-50 left-4 -top-1 w-52 xs:w-60 sm:w-64 bg-slate-800 border border-slate-700 rounded-xl p-3 text-[11px] text-slate-300 leading-relaxed shadow-xl pointer-events-none"
        >
          {text}
        </span>
      )}
    </span>
  );
}

function DataSourceBadge({ isDemo }: { isDemo: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border ${
        isDemo
          ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
          : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isDemo ? 'bg-amber-400' : 'bg-emerald-400'}`} />
      {isDemo ? 'Demo Data' : 'Your Uploaded Resume'}
    </span>
  );
}

function MetricCard({
  label, value, unit, color, barColor, tooltipText, icon: Icon,
}: {
  label: string; value: number; unit?: string; color: string; barColor: string;
  tooltipText: string; icon: React.ElementType;
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 sm:p-5 space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1 text-xs font-medium text-slate-400 min-w-0">
          <span className="truncate">{label}</span>
          <MetricTooltip text={tooltipText} />
        </div>
        <Icon className={`w-4 h-4 ${color} shrink-0`} />
      </div>
      <div className="flex items-baseline gap-1">
        <span className={`text-xl sm:text-2xl font-black ${color}`}>{value}</span>
        <span className="text-xs text-slate-400">{unit ?? '/ 100'}</span>
      </div>
      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
        <div className={`${barColor} h-1.5 rounded-full transition-all duration-500`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [isDemo, setIsDemo] = useState(true);
  const [parsed, setParsed] = useState<ParsedResume>(DEMO_RESUME);
  const [atsAnalysis] = useState<ATSScoreBreakdown>(DEMO_ATS);

  const handleParsed = (resume: ParsedResume) => {
    setParsed(resume);
    setIsDemo(false);
  };

  return (
    <div className="space-y-4 sm:space-y-6 px-3 sm:px-6 py-4 sm:py-6 pb-12">
      <DemoBanner />

      {/* Data Source Indicator */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
        <DataSourceBadge isDemo={isDemo} />
        {isDemo && (
          <span className="text-[11px] sm:text-xs text-slate-500">
            Upload your own resume below to replace demo scores with your real data.
          </span>
        )}
      </div>

      {/* Overview Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4">
        <MetricCard
          label="ATS Score"
          value={atsAnalysis.overallScore}
          color="text-indigo-300"
          barColor="bg-indigo-500"
          tooltipText={METRIC_TOOLTIPS['ATS Score']}
          icon={Award}
        />
        <MetricCard
          label="Career Readiness"
          value={84}
          color="text-emerald-300"
          barColor="bg-emerald-500"
          tooltipText={METRIC_TOOLTIPS['Career Readiness']}
          icon={Target}
        />
        <MetricCard
          label="Skill Match"
          value={atsAnalysis.skillsMatch}
          unit="%"
          color="text-cyan-300"
          barColor="bg-cyan-500"
          tooltipText={METRIC_TOOLTIPS['Skill Match']}
          icon={Sparkles}
        />
        <MetricCard
          label="Job Match"
          value={91}
          unit="%"
          color="text-amber-300"
          barColor="bg-amber-500"
          tooltipText={METRIC_TOOLTIPS['Job Match']}
          icon={Target}
        />
        <MetricCard
          label="Resume Quality"
          value={parsed.completenessScore}
          color="text-indigo-300"
          barColor="bg-indigo-400"
          tooltipText={METRIC_TOOLTIPS['Resume Quality']}
          icon={FileText}
        />
      </div>

      {/* Upload + ATS Card + Chart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm">Upload New Resume Version</h3>
            <FileUploader onParsed={handleParsed} />
          </div>

          {/* Quick Actions Links (44px tap target height) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
            <h3 className="font-bold text-slate-100 text-sm">Copilot Quick Tools</h3>
            <div className="space-y-2">
              {[
                { name: 'Job-Specific Tailoring',   href: '/resume-optimizer', icon: Sparkles },
                { name: 'Missing Skills Gap Matrix', href: '/skill-gap',        icon: Target   },
                { name: 'AI Cover Letter Generator', href: '/cover-letter',     icon: FileText },
                { name: 'Start AI Mock Interview',   href: '/interview-prep',   icon: Award    },
              ].map((act, i) => {
                const Icon = act.icon;
                return (
                  <Link
                    key={i}
                    href={act.href}
                    className="min-h-[44px] flex items-center justify-between p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-xs font-medium text-slate-200 transition"
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-indigo-400 shrink-0" /> {act.name}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <div id="resume-section-summary">
            <ATSScoreCard ats={atsAnalysis} />
          </div>

          <div id="resume-section-history">
            <ScoreChart hasHistory={!isDemo} />
          </div>
        </div>
      </div>
    </div>
  );
}
