// src/components/Experience.tsx

'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar, GraduationCap } from 'lucide-react';

const experienceData = [
  {
    icon: Briefcase,
    title: 'AI Engineer | IT Instructor | Supervisor',
    company: 'Action Digital Institute',
    duration: 'April 2024 – Present',
    details: [
      "Designed and implemented AI-powered learning and automation tools for digital training programs.",
      "Trained students and professionals in AI, automation, and digital transformation technologies.",
      "Supervised technology-based projects and ensured alignment with institute goals and outcomes.",
    ],
    type: 'work',
  },
  {
    icon: Briefcase,
    title: 'Chief Operating Officer (COO)',
    company: 'Ennovators Pakistan',
    duration: 'January 2023 – April 2024',
    details: [
      "Led operations for a growing IT firm offering graphic design, video editing, animation, and ad production.",
      "Supervised creative and technical teams to deliver digital content for education and advertising sectors.",
      "Implemented AI tools to enhance production efficiency and digital outreach.",
    ],
    type: 'work',
  },
  {
    icon: Briefcase,
    title: 'Social Media Manager | Digital Marketing Consultant',
    company: 'Freelance',
    duration: 'June 2021 – Present',
    details: [
      "Managed and grew multiple social media accounts, achieving measurable increases in reach and conversions.",
      "Designed marketing strategies and automated workflows using AI-driven tools.",
    ],
    type: 'work',
  },
  {
    icon: Briefcase,
    title: 'Marketing & Training Officer',
    company: 'Character Education Foundation',
    duration: 'June 2022 – December 2022',
    details: [
      "Organized digital skills and awareness training programs for youth and educators.",
      "Assisted in branding, outreach, and digital communication strategies.",
    ],
    type: 'work',
  },
  {
    icon: GraduationCap,
    title: 'Master’s in Social Sciences',
    company: 'Bacha Khan University, Charsadda',
    duration: '2020–2022',
    details: [],
    type: 'education',
  },
];

// Animation for timeline items
const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const Experience = () => {
  return (
    <section id="experience" className="section bg-surface">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Work Experience
          </p>
          <h2 className="section-title text-primary">
            Professional Journey & Education
          </h2>
          <p className="section-subtitle text-secondary">
            A timeline of my professional growth and achievements
          </p>
        </motion.div>

        {/* Vertical Timeline Container */}
        <div className="relative pl-8 md:pl-16"> 
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-6 w-0.5 bg-accent h-full"></div> 
          
          {experienceData.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 + (index * 0.1) }}
              className="mb-12 flex items-start"
            >
                {/* Timeline Dot & Icon Container */}
                <div className="flex-shrink-0 relative mr-6 -ml-10 md:-ml-12">
                    {/* Timeline Dot */}
                    <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-primary-gradient text-white shadow-glow">
                      <item.icon className="w-5 h-5" />
                    </div>
                </div>

                {/* Content Card */}
                <div className="flex-grow">
                  <div className="glass-card card transition-colors duration-300 p-6">
                    
                    <div className="flex items-center text-sm font-semibold uppercase text-accent mb-2">
                        <Calendar className="w-3 h-3 mr-2" />
                        <span>{item.duration}</span>
                    </div>

                    <h3 className="text-xl font-bold mb-1 text-primary">
                      {item.title}
                    </h3>
                    <p className={`font-medium mb-3 ${item.type === 'education' ? 'text-secondary-gradient' : 'text-accent'}`}>
                      {item.company}
                    </p>
                    
                    {item.details.length > 0 && (
                      <ul className="space-y-2">
                        {item.details.map((detail, idx) => (
                          <li key={idx} className="text-secondary flex items-start">
                            <span className="inline-block mr-2 text-accent mt-1.5">•</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;