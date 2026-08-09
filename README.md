# AI Career Copilot — Production AI Platform

> **AI Career Copilot** is a production-grade AI-powered Resume Analyzer, Job Matcher, Resume Optimizer, Cover Letter Generator, RAG Career Assistant, and Interactive Mock Interview platform.

---

## 🏗️ System Architecture

```
                                  ┌───────────────────────────────────────────────┐
                                  │          AI Career Copilot Frontend           │
                                  │ (Next.js 14 App Router, Tailwind, Lucide, Recharts)│
                                  └───────────────────────┬───────────────────────┘
                                                          │
                    ┌─────────────────────────────────────┼─────────────────────────────────────┐
                    ▼                                     ▼                                     ▼
        ┌──────────────────────┐              ┌──────────────────────┐              ┌──────────────────────┐
        │    Resume Parser     │              │   ATS & Skill Engine │              │    RAG Vector Store  │
        │ (pdf-parse, mammoth, │              │ (Weighted Scoring,   │              │ (pgvector / Local    │
        │  Zod Schema Engine)  │              │  Skill Gap Matrix)   │              │  Cosine Embeddings)  │
        └───────────┬──────────┘              └───────────┬──────────┘              └───────────┬──────────┘
                    │                                     │                                     │
                    └─────────────────────────────────────┼─────────────────────────────────────┘
                                                          ▼
                                  ┌───────────────────────────────────────────────┐
                                  │            AI & Generation Engine            │
                                  │  (Resume Optimizer, Tailor, Cover Letter,    │
                                  │   Interactive Mock Interview, AI Chatbot)     │
                                  └───────────────────────┬───────────────────────┘
                                                          ▼
                                  ┌───────────────────────────────────────────────┐
                                  │            PostgreSQL + Prisma ORM            │
                                  └───────────────────────────────────────────────┘
```

---

## 🌟 Core Features & Modules

1. **Advanced 18+ Section Resume Parser**: Extract Name, Email, Phone, Location, Social URLs, Summary, Education, Experience, Internships, Projects, Technical & Soft Skills, Certifications, Achievements, Publications, and Languages automatically from PDF/DOCX files.
2. **Weighted ATS Scoring Engine**: Scores Keywords (20%), Technical Skills (25%), Experience (20%), Education (10%), Project Relevance (15%), Job Title (5%), and Formatting (5%) with explicit positive/negative factor breakdowns.
3. **Semantic Job Matching**: Uses vector embeddings and cosine similarity to match semantically equivalent requirements (e.g., "RESTful APIs in Express" ↔ "Backend API development").
4. **Skill Gap Engine**: Categorizes candidate vs missing skills into Critical, Important, and Nice-to-have with grounded truthful recommendations.
5. **AI Resume Bullet Optimizer**: Improves bullet points with strong action verbs, reasoning, and metric placeholders (`[X]%`) to avoid inventing false candidate metrics.
6. **Job-Specific Resume Tailoring**: Generates tailored summaries, optimized project bullets, and aligned key skills for targeted job descriptions.
7. **AI Cover Letter Generator**: Generates customized cover letters in Professional, Confident, or Concise tones.
8. **Interactive AI Mock Interviewer**: 7 question categories (Technical, Project, System Design, SQL, HR, Behavioral, Coding) with step-by-step scoring, strength/weakness analysis, and follow-up questions.
9. **Personalized 7 / 30 / 60-Day Learning Roadmap**: Creates structured learning schedules based on missing critical skills.
10. **Resume Version Control & Analytics**: Maintains multiple resume versions and visual score history over time using Recharts.
11. **RAG-Powered AI Career Assistant**: Grounded chatbot retrieving relevant resume context blocks to answer career questions.
12. **PDF & DOCX Export**: One-click download of optimized resumes and analysis reports.
13. **Instant Zero-Config Demo Mode**: Pre-loaded sample resume and job description datasets for immediate testing without API key setup.

---

## 🛠️ Technology Stack

- **Core Framework**: Next.js 14 (App Router) & React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Lucide React Icons
- **Data Visualization**: Recharts
- **Database & ORM**: PostgreSQL / SQLite & Prisma ORM
- **Parsing Libraries**: `pdf-parse`, `mammoth`
- **Export Libraries**: `jspdf`, `docx`
- **Validation**: Zod
- **AI / Embeddings**: Gemini AI API & Local Vector Cosine Similarity
- **Testing**: Vitest & Testing Library

---

## 🚀 Environment Setup & Installation

### 1. Clone & Install Dependencies

```bash
cd /Users/satyamkumar/.gemini/antigravity/scratch/ai-career-copilot
npm install
```

### 2. Configure Environment Variables (`.env`)

```env
DATABASE_URL="file:./dev.db" # Or postgresql://user:password@localhost:5432/career_copilot
GEMINI_API_KEY="your-gemini-api-key-here"
NODE_ENV="development"
```

### 3. Database Initialization

```bash
# Push Prisma schema to SQLite / PostgreSQL
npm run db:push

# Generate Prisma Client
npm run db:generate

# Seed sample demo database
npm run db:seed
```

---

## 🧪 Testing & Verification

Run unit tests for ATS scoring algorithm, Zod validation, and skill gap categorization:

```bash
npm run test
```

Build production bundle:

```bash
npm run build
```

---

## 🏃 Running the Application

Start Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📡 API Endpoints Summary

- `POST /api/resume/parse` — Upload & parse PDF/DOCX file into 18+ fields
- `POST /api/resume/analyze` — Compute weighted ATS score breakdown
- `POST /api/resume/optimize` — Improve bullet points & job tailoring
- `POST /api/job/match` — Semantic job matching & skill gap roadmap
- `POST /api/cover-letter/generate` — Generate tailored cover letter
- `POST /api/interview/session` — Initialize mock interview question bank
- `POST /api/interview/answer` — Evaluate candidate answer in real-time
- `POST /api/chat` — Grounded RAG Career Assistant
- `POST /api/export` — Download PDF / DOCX file
- `GET /api/analytics` — Platform admin analytics
