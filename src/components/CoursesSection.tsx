// src/components/Programs.tsx

'use client';

import { motion } from 'framer-motion';
import { Code, Brain, Zap, ExternalLink } from 'lucide-react'; 
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Define types for our programs
type Program = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string | null;
  icon: string;
  delay: number;
};

// Animation properties for the program cards
const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const Programs = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch('/api/programs');
        const data = await response.json();
        // Add delay property for animation
        const programsWithDelay = data.map((program: Program, index: number) => ({
          ...program,
          delay: 0.2 + (index * 0.1)
        }));
        setPrograms(programsWithDelay);
      } catch (error) {
        console.error('Error fetching programs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  // Function to get icon component by name
  const getIconComponent = (iconName: string) => {
    switch(iconName) {
      case 'Code':
        return Code;
      case 'Brain':
        return Brain;
      default:
        return Zap;
    }
  };

  // Fallback program data to show if API call fails
  const fallbackPrograms = [
    {
      id: '1',
      title: 'AI Masterclass Program',
      description: "Effective Use of AI tools for business growth and personal productivity. Hands-on projects include automating workflows, content creation, and data analysis using AI technologies.",
      tech: ['AI', 'Prompting', 'Automation', 'Content Creation', 'Data Analysis'],
      link: '#',
      icon: 'Brain',
      delay: 0.2,
    },
    {
      id: '2',
      title: 'AI & Machine Learning Mastery',
      description: "In-depth program covering Python, TensorFlow, neural networks, and practical applications of AI. Students work on projects including computer vision, natural language processing, and predictive analytics.",
      tech: ['Python', 'TensorFlow', 'PyTorch', 'Neural Networks', 'Data Science'],
      link: '#',
      icon: 'Brain',
      delay: 0.3,
    },
    {
      id: '3',
      title: 'Digital Marketing & Analytics',
      description: "Complete digital marketing program covering SEO, SMM, content strategy, email marketing, and analytics. Includes hands-on projects with real client campaigns and performance tracking.",
      tech: ['SEO', 'Social Media', 'Content Strategy', 'Analytics', 'PPC'],
      link: '#',
      icon: 'Zap',
      delay: 0.4,
    },
  ];

  if (loading) {
    return (
      <section id="programs" className="section bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Featured Programs
            </p>
            <h2 className="section-title text-primary">
              Our Top Training Programs
            </h2>
            <p className="section-subtitle text-secondary">
              Career-focused education that delivers measurable results
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

  // If no programs are fetched, show the fallback programs
  const displayPrograms = programs.length > 0 ? programs : fallbackPrograms;

  return (
    <section id="programs" className="section bg-surface">
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
            Featured Programs
          </p>
          <h2 className="section-title text-primary">
            Our Top Training Programs
          </h2>
          <p className="section-subtitle text-secondary">
            Career-focused education that delivers measurable results
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayPrograms.map((program) => {
            const IconComponent = getIconComponent(program.icon);
            return (
              <motion.div
                key={program.id || program.title}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: program.delay }}
                className="glass-card card group hover:shadow-card transition-all duration-300 flex flex-col"
              >
                <div className="flex justify-between items-start mb-6">
                  {/* Icon */}
                  <div className="p-3 rounded-lg bg-primary-gradient text-white">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  
                  {/* External Link Button */}
                  {program.link && (
                    <Link 
                      href={program.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-primary-gradient text-white opacity-70 hover:opacity-100 transition-opacity"
                      aria-label={`View ${program.title}`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  )}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 text-primary group-hover:text-accent transition-colors duration-300">
                  {program.title}
                </h3>
                <p className="text-secondary mb-6 flex-grow">
                  {program.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-default">
                  {program.tech.map((t) => (
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

export default Programs;