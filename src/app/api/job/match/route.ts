import { NextRequest, NextResponse } from 'next/server';
import { analyzeSkillGap } from '@/lib/engine/skillGapAnalyzer';
import { calculateATSScore } from '@/lib/engine/atsScorer';
import { ParsedResume, LearningRoadmap } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const resume: ParsedResume = body.resume;
    const jobDescription: string = body.jobDescription || 'Looking for Senior Full Stack Engineer with React, Next.js, Node.js, Python, PostgreSQL, Docker, and AWS experience.';

    if (!resume) {
      return NextResponse.json({ success: false, error: 'Resume object required' }, { status: 400 });
    }

    const skillGap = analyzeSkillGap(resume, jobDescription);
    const atsScore = calculateATSScore(resume, jobDescription);

    // Job Recommendations list
    const jobRecommendations = [
      {
        id: 'job-1',
        title: 'Full Stack Software Engineer',
        company: 'ScaleTech Inc',
        matchScore: 91,
        requiredSkills: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Docker'],
        matchingSkills: ['React', 'Next.js', 'Node.js', 'PostgreSQL'],
        missingSkills: ['Docker'],
        whyMatches: 'Direct technical stack match with your experience in TypeScript, React micro-frontends, and REST APIs.'
      },
      {
        id: 'job-2',
        title: 'AI Platform Engineer',
        company: 'NextGen AI Labs',
        matchScore: 84,
        requiredSkills: ['Python', 'TypeScript', 'RAG', 'Vector DB', 'AWS'],
        matchingSkills: ['TypeScript', 'Python'],
        missingSkills: ['AWS', 'Vector DB'],
        whyMatches: 'High semantic match with your AI side-projects and vector retrieval implementations.'
      },
      {
        id: 'job-3',
        title: 'Senior Frontend Engineer',
        company: 'Vercel Ecosystem',
        matchScore: 88,
        requiredSkills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Web Vitals'],
        matchingSkills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
        missingSkills: ['Web Vitals'],
        whyMatches: 'Matches 90%+ of your primary frontend skills and modern component architecture.'
      }
    ];

    // Personalized Learning Roadmap based on missing skills
    const missingCrit = skillGap.missingSkills.critical.concat(skillGap.missingSkills.important);
    const roadmap: LearningRoadmap = {
      roleTitle: "Full Stack & AI Engineer",
      day7: [
        {
          id: 'task-1',
          topic: `Master ${missingCrit[0] || 'Docker'} Containerization Fundamentals`,
          description: `Learn how to write multi-stage Dockerfiles and set up docker-compose for local development.`,
          skill: missingCrit[0] || 'Docker',
          resources: ['Official Docker Documentation', 'Container Best Practices Guide'],
          completed: false
        }
      ],
      day30: [
        {
          id: 'task-2',
          topic: `Deploy Cloud Infrastructure with ${missingCrit[1] || 'AWS'} & Serverless`,
          description: `Set up automated deployment pipeline for backend services using AWS S3, ECS, and Lambda functions.`,
          skill: missingCrit[1] || 'AWS',
          resources: ['AWS Cloud Practitioner Course', 'Serverless Framework Docs'],
          completed: false
        }
      ],
      day60: [
        {
          id: 'task-3',
          topic: 'Build End-to-End Microservices Architecture Project',
          description: `Synthesize your Docker and AWS knowledge by deploying a containerized microservice project to production.`,
          skill: 'System Design & Cloud',
          resources: ['System Design Primer GitHub', 'Microservice Patterns Book'],
          completed: false
        }
      ]
    };

    return NextResponse.json({
      success: true,
      data: {
        skillGap,
        atsScore,
        jobRecommendations,
        roadmap
      }
    });
  } catch (error: any) {
    console.error('Error in /api/job/match:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
