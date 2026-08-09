import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial demo database...');

  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@career-copilot.ai' },
    update: {},
    create: {
      id: 'demo-user-id',
      email: 'demo@career-copilot.ai',
      name: 'Satyam Kumar'
    }
  });

  const demoResume = await prisma.resume.upsert({
    where: { id: 'demo-resume-id' },
    update: {},
    create: {
      id: 'demo-resume-id',
      userId: demoUser.id,
      title: 'Senior Full Stack Software Engineer Resume',
      fileType: 'pdf',
      parsedContent: JSON.stringify({
        name: 'Satyam Kumar',
        email: 'demo@career-copilot.ai',
        summary: 'Senior Full Stack Engineer with 4+ years building high scale cloud and AI systems.',
        technicalSkills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS']
      }),
      completenessScore: 94,
      sectionQuality: 92,
      formattingQuality: 96,
      atsReadability: 94,
      overallAtsScore: 86
    }
  });

  await prisma.jobDescription.upsert({
    where: { id: 'demo-job-id' },
    update: {},
    create: {
      id: 'demo-job-id',
      userId: demoUser.id,
      jobTitle: 'AI Full Stack Developer',
      company: 'InnovateAI Labs',
      rawText: 'Looking for a Senior Full Stack Engineer experienced with React, Next.js, Node.js, Python, PostgreSQL, Docker, AWS, RAG, and OpenAI APIs.',
      requiredSkills: JSON.stringify(['React', 'Next.js', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'AWS', 'RAG'])
    }
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
