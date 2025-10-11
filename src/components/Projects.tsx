// src/components/Projects.tsx

'use client';

import { motion } from 'framer-motion';
import { LineChart, Code, ArrowUpRight } from 'lucide-react'; 
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
    <section id="projects" className="py-20 sm:py-32 border-t border-node-green/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-node-green">
            Select Work & Case Studies
          </p>
          <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-node-text-light sm:text-5xl">
            Featured Projects & Impact
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: project.delay }}
              className="flex flex-col rounded-xl p-6 bg-[#252525] border border-node-green/30 transform transition-all duration-500 hover:shadow-green-glow"
            >
              <div className="flex justify-between items-start">
                {/* Icon */}
                <project.icon className="h-8 w-8 text-node-light-green" />
                
                {/* External Link Button */}
                <Link 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full text-node-green hover:bg-node-green/10 transition-colors"
                  aria-label={`View ${project.title}`}
                >
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              </div>

              {/* Content */}
              <h3 className="mt-4 text-2xl font-bold text-node-text-light">
                {project.title}
              </h3>
              <p className="mt-2 flex-grow text-node-text-muted">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-node-green/10">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full bg-node-green/20 px-3 py-1 text-xs font-medium text-node-text-light/90"
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