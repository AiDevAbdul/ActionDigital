// src/components/Projects.tsx

'use client';

import { motion } from 'framer-motion';
import { LineChart, Code, ArrowUpRight, ExternalLink } from 'lucide-react'; 
import Link from 'next/link';

const projectsData = [
  {
    icon: LineChart,
    title: 'AI-Driven Social Media Growth & Automation',
    description: "Designed marketing strategies and automated workflows integrating n8n, ChatGPT, and marketing APIs to achieve measurable increases in social media reach and conversions.",
    tech: ['ChatGPT', 'n8n', 'APIs', 'Digital Marketing', 'Workflow Automation'],
    link: '#',
    delay: 0.2,
  },
  {
    icon: Code,
    title: 'AI-Powered Institute Learning Tools',
    description: "Engineered AI-powered learning and operational tools for digital training programs at Action Digital Institute, enhancing both student engagement and administrative efficiency.",
    tech: ['AI Integration', 'Digital Training', 'Project Supervision', 'IT Instruction'],
    link: '#',
    delay: 0.3,
  },
  {
    icon: Code,
    title: 'AI-Powered Learning Tools',
    description: "Engineered AI-powered learning and operational tools for digital training programs at Action Digital Institute, enhancing both student engagement and administrative efficiency.",
    tech: ['AI Integration', 'Digital Training', 'Project Supervision', 'IT Instruction'],
    link: '#',
    delay: 0.3,
  },
];

// Animation properties for the project cards
const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const Projects = () => {
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
          {projectsData.map((project) => (
            <motion.div
              key={project.title}
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
                  <project.icon className="h-6 w-6" />
                </div>
                
                {/* External Link Button */}
                <Link 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-primary-gradient text-white opacity-70 hover:opacity-100 transition-opacity"
                  aria-label={`View ${project.title}`}
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;