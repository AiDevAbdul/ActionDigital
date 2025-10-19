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
  {
    id: '4',
    title: 'Digital Marketing Campaign for Tech Startup',
    description: "Executed a comprehensive digital marketing strategy including SEO, social media, and PPC campaigns that increased traffic by 250% and conversions by 150% in 6 months.",
    tech: ['SEO', 'PPC', 'Social Media Marketing', 'Analytics'],
    link: '#',
    icon: 'Zap',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Corporate Website Development',
    description: "Designed and developed a responsive corporate website for a financial services company with integrated CRM and client portal functionality.",
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    link: '#',
    icon: 'Code',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Documentary: Tech Innovation in Rural Areas',
    description: "Produced and edited a documentary showcasing how technology is transforming rural communities, featuring interviews with local entrepreneurs and community leaders.",
    tech: ['Video Production', 'Editing', 'Documentary', 'Cinematography'],
    link: '#',
    icon: 'Zap',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    title: 'Mobile App for Educational Content',
    description: "Built a cross-platform mobile application for delivering educational content with offline capabilities, progress tracking, and gamification features.",
    tech: ['React Native', 'Firebase', 'Redux', 'UI/UX Design'],
    link: '#',
    icon: 'Code',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '8',
    title: 'Influencer Marketing Campaign',
    description: "Developed and managed an influencer marketing campaign that increased brand awareness and generated significant ROI through strategic partnerships.",
    tech: ['Influencer Marketing', 'Content Creation', 'Brand Strategy', 'Analytics'],
    link: '#',
    icon: 'Zap',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '9',
    title: 'Corporate Identity & Branding',
    description: "Created comprehensive branding materials for a tech startup including logo, brand guidelines, website design, and marketing collateral.",
    tech: ['Branding', 'UI/UX Design', 'Logo Design', 'Marketing Materials'],
    link: '#',
    icon: 'Zap',
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