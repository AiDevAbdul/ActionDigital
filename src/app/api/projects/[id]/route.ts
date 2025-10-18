// src/app/api/projects/[id]/route.ts
import { NextRequest } from 'next/server';

// Mock data for projects - in a real implementation, this would come from a database
let mockProjects = [
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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const project = mockProjects.find(p => p.id === params.id);
    
    if (!project) {
      return Response.json({ error: 'Project not found' }, { status: 404 });
    }
    
    return Response.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return Response.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  // Check for admin authentication
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { title, description, tech, link, icon } = await request.json();
    
    const projectIndex = mockProjects.findIndex(p => p.id === params.id);
    
    if (projectIndex === -1) {
      return Response.json({ error: 'Project not found' }, { status: 404 });
    }
    
    mockProjects[projectIndex] = {
      ...mockProjects[projectIndex],
      title,
      description,
      tech: Array.isArray(tech) ? tech : [tech],
      link: link || null,
      icon: icon || 'Code',
      updatedAt: new Date().toISOString(),
    };
    
    return Response.json(mockProjects[projectIndex]);
  } catch (error) {
    console.error('Error updating project:', error);
    return Response.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  // Check for admin authentication
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const initialLength = mockProjects.length;
    mockProjects = mockProjects.filter(p => p.id !== params.id);
    
    if (mockProjects.length === initialLength) {
      return Response.json({ error: 'Project not found' }, { status: 404 });
    }
    
    return Response.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return Response.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}