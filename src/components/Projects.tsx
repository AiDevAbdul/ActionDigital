// src/components/Projects.tsx

'use client';

import { motion } from 'framer-motion';
import { LineChart, Code, ExternalLink } from 'lucide-react'; 
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

const Projects = () => {
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
      case 'LineChart':
        return LineChart;
      default:
        return Code;
    }
  };

  // Fallback project data to show if API call fails
  const fallbackProjects = [
    {
      id: '1',
      title: 'AI-Driven Social Media Growth & Automation',
      description: "Designed marketing strategies and automated workflows integrating n8n, ChatGPT, and marketing APIs to achieve measurable increases in social media reach and conversions.",
      tech: ['ChatGPT', 'n8n', 'APIs', 'Digital Marketing', 'Workflow Automation'],
      link: '#',
      icon: 'LineChart',
      delay: 0.2,
    },
    {
      id: '2',
      title: 'AI-Powered Institute Learning Tools',
      description: "Engineered AI-powered learning and operational tools for digital training programs at Action Digital Institute, enhancing both student engagement and administrative efficiency.",
      tech: ['AI Integration', 'Digital Training', 'Project Supervision', 'IT Instruction'],
      link: '#',
      icon: 'Code',
      delay: 0.3,
    },
    {
      id: '3',
      title: 'AI-Powered Learning Tools',
      description: "Engineered AI-powered learning and operational tools for digital training programs at Action Digital Institute, enhancing both student engagement and administrative efficiency.",
      tech: ['AI Integration', 'Digital Training', 'Project Supervision', 'IT Instruction'],
      link: '#',
      icon: 'Code',
      delay: 0.3,
    },
  ];

  if (loading) {
    return (
      <section id="projects" className="section bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Select Work & Case Studies
            </p>
            <h2 className="section-title text-primary">
              Featured Projects & Impact
            </h2>
            <p className="section-subtitle text-secondary">
              Real-world solutions that deliver measurable results
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
            Select Work & Case Studies
          </p>
          <h2 className="section-title text-primary">
            Featured Projects & Impact
          </h2>
          <p className="section-subtitle text-secondary">
            Real-world solutions that deliver measurable results
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

export default Projects;