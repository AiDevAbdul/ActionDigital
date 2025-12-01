// src/components/ProjectsSection.tsx

'use client';

import { motion } from 'framer-motion';
import { Code, Brain, Zap, ExternalLink } from 'lucide-react'; 
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Define types for our projects
type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string | null;
  icon: string;
  delay: number;
};

// Animation properties for the project cards
const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        // Add delay property for animation
        const projectsWithDelay = data.map((project: Project, index: number) => ({
          ...project,
          delay: 0.2 + (index * 0.1)
        }));
        setProjects(projectsWithDelay);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Function to get icon component by name
  const getIconComponent = (iconName: string) => {
    switch(iconName) {
      case 'Code':
        return Code;
      case 'Brain':
        return Brain;
      case 'Zap':
        return Zap;
      default:
        return Code;
    }
  };

  // Fallback project data to show if API call fails
  const fallbackProjects = [
    {
      id: '1',
      title: 'Website Design & Development',
      description: "Designed and developed responsive websites for a local business, enhancing their online presence and customer engagement.",
      tech: ['website', 'wordpress', 'html', 'tailwindcss'],
      link: '#',
      icon: 'Website',
      delay: 0.2,
    },
    {
      id: '2',
      title: 'AI-Powered Chatbot',
      description: "Automated customer support using an AI-powered chatbot integrated into the client's website, improving response times and customer satisfaction.",
      tech: ['AI Integration', 'Chatbot', 'customer support', 'automation'],
      link: '#',
      icon: 'Chatbot',
      delay: 0.3,
    },
    {
      id: '3',
      title: 'E-commerce Platform Development',
      description: "Developed a comprehensive e-commerce solution with custom features for inventory management, payment processing, and customer analytics.",
      tech: ['Next.js', 'Node.js', 'Stripe', 'MongoDB'],
      link: '#',
      icon: 'Zap',
      delay: 0.4,
    },
    {
      id: '4',
      title: 'Digital Marketing Campaign for Tech Startup',
      description: "Executed a comprehensive digital marketing strategy including SEO, social media, and PPC campaigns that increased traffic by 250% and conversions by 150% in 6 months.",
      tech: ['SEO', 'PPC', 'Social Media Marketing', 'Analytics'],
      link: '#',
      icon: 'Zap',
      delay: 0.5,
    },
    {
      id: '5',
      title: 'Corporate Website Development',
      description: "Designed and developed a responsive corporate website for a financial services company with integrated CRM and client portal functionality.",
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
      link: '#',
      icon: 'Code',
      delay: 0.6,
    },
    {
      id: '6',
      title: 'Documentary: Tech Innovation in Rural Areas',
      description: "Produced and edited a documentary showcasing how technology is transforming rural communities, featuring interviews with local entrepreneurs and community leaders.",
      tech: ['Video Production', 'Editing', 'Documentary', 'Cinematography'],
      link: '#',
      icon: 'Zap',
      delay: 0.7,
    },
    {
      id: '7',
      title: 'Mobile App for Educational Content',
      description: "Built a cross-platform mobile application for delivering educational content with offline capabilities, progress tracking, and gamification features.",
      tech: ['React Native', 'Firebase', 'Redux', 'UI/UX Design'],
      link: '#',
      icon: 'Code',
      delay: 0.8,
    },
    {
      id: '8',
      title: 'Influencer Marketing Campaign',
      description: "Developed and managed an influencer marketing campaign that increased brand awareness and generated significant ROI through strategic partnerships.",
      tech: ['Influencer Marketing', 'Content Creation', 'Brand Strategy', 'Analytics'],
      link: '#',
      icon: 'Zap',
      delay: 0.9,
    },
    {
      id: '9',
      title: 'Corporate Identity & Branding',
      description: "Created comprehensive branding materials for a tech startup including logo, brand guidelines, website design, and marketing collateral.",
      tech: ['Branding', 'UI/UX Design', 'Logo Design', 'Marketing Materials'],
      link: '#',
      icon: 'Zap',
      delay: 1.0,
    },
  ];

  if (loading) {
    return (
      <section id="projects" className="section bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Featured Projects
            </p>
            <h2 className="section-title text-primary">
              Our Recent Work
            </h2>
            <p className="section-subtitle text-secondary">
              Innovative solutions delivered to our valued clients
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div 
                key={item} 
                className="glass-card card flex flex-col animate-pulse"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700">
                    <div className="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>
                  <div className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
                    <div className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
                </div>
                <div className="pt-4 mt-auto">
                  <div className="flex flex-wrap gap-2">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // If no projects are fetched, show the fallback projects
  const displayProjects = projects.length > 0 ? projects : fallbackProjects;

  return (
    <section id="projects" className="section bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Featured Projects
          </p>
          <h2 className="section-title text-primary">
            Our Recent Work
          </h2>
          <p className="section-subtitle text-secondary">
            Innovative solutions delivered to our valued clients
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayProjects.map((project) => {
            const IconComponent = getIconComponent(project.icon);
            return (
              <motion.div
                key={project.id || project.title}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: project.delay }}
                className="glass-card card group hover:shadow-card transition-all duration-300 flex flex-col"
              >
                <div className="flex justify-between items-start mb-6">
                  {/* Icon */}
                  <div className="p-3 rounded-lg bg-primary-gradient text-white">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  
                  {/* External Link Button */}
                  {project.link && (
                    <Link 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-primary-gradient text-white opacity-70 hover:opacity-100 transition-opacity"
                      aria-label={`View ${project.title}`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  )}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 text-primary group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-secondary mb-6 flex-grow">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-default">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 bg-primary-gradient text-white text-xs font-medium rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;