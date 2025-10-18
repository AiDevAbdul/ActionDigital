// src/app/api/projects/route.ts
import { NextRequest } from 'next/server';

// Mock data for projects - in a real implementation, this would come from a database
const mockProjects = [
  {
    id: '1',
    title: 'AI-Driven Social Media Growth & Automation',
    description: "Designed marketing strategies and automated workflows integrating n8n, ChatGPT, and marketing APIs to achieve measurable increases in social media reach and conversions.",
    tech: ['ChatGPT', 'n8n', 'APIs', 'Digital Marketing', 'Workflow Automation'],
    link: '#',
    icon: 'LineChart',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'AI-Powered Institute Learning Tools',
    description: "Engineered AI-powered learning and operational tools for digital training programs at Action Digital Institute, enhancing both student engagement and administrative efficiency.",
    tech: ['AI Integration', 'Digital Training', 'Project Supervision', 'IT Instruction'],
    link: '#',
    icon: 'Code',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'AI-Powered Learning Tools',
    description: "Engineered AI-powered learning and operational tools for digital training programs at Action Digital Institute, enhancing both student engagement and administrative efficiency.",
    tech: ['AI Integration', 'Digital Training', 'Project Supervision', 'IT Instruction'],
    link: '#',
    icon: 'Code',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function GET() {
  try {
    // Simulate a delay to mimic network request
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return mock data
    return Response.json(mockProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return Response.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // Check for admin authentication (simplified for now)
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { title, description, tech, link, icon } = await request.json();
    
    const newProject = {
      id: Date.now().toString(), // Mock ID
      title,
      description,
      tech: Array.isArray(tech) ? tech : [tech],
      link: link || null,
      icon: icon || 'Code',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // In a real implementation, we would save to database
    // For now, we'll just return the new project
    return Response.json(newProject);
  } catch (error) {
    console.error('Error creating project:', error);
    return Response.json({ error: 'Failed to create project' }, { status: 500 });
  }
}