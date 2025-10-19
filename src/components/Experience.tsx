// src/components/Services.tsx

'use client';

import { motion } from 'framer-motion';
import { Code, Brain, Zap, Wrench } from 'lucide-react';

const servicesData = [
  {
    icon: Code,
    title: 'Custom Software Development',
    company: 'Action Digital Institute',
    duration: 'Full Cycle Development',
    details: [
      "Full-stack application development for businesses of all sizes.",
      "Enterprise-level solutions tailored to specific requirements.",
      "API development and system integration services.",
    ],
    type: 'service',
  },
  {
    icon: Brain,
    title: 'AI/ML Implementation Services',
    company: 'Action Digital Institute',
    duration: 'Advanced Solutions',
    details: [
      "Implement artificial intelligence and machine learning solutions for automation.",
      "Predictive analytics and data insights for business intelligence.",
      "Custom AI model development and deployment.",
    ],
    type: 'service',
  },
  {
    icon: Zap,
    title: 'Digital Marketing Solutions',
    company: 'Action Digital Institute',
    duration: 'Growth Strategy',
    details: [
      "Comprehensive SEO, SMM, and PPC campaigns.",
      "Content marketing and social media management.",
      "Analytics and reporting for data-driven decisions.",
    ],
    type: 'service',
  },
  {
    icon: Wrench,
    title: 'IT Consulting & Support',
    company: 'Action Digital Institute',
    duration: 'Ongoing Support',
    details: [
      "Technology strategy and implementation planning.",
      "System architecture design and optimization.",
      "24/7 technical support and maintenance services.",
    ],
    type: 'service',
  },
];

// Animation for timeline items
const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const Services = () => {
  return (
    <section id="services" className="section bg-surface">
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
            Professional Services
          </p>
          <h2 className="section-title text-primary">
            Services We Offer
          </h2>
          <p className="section-subtitle text-secondary">
            Comprehensive technology solutions for your business needs
          </p>
        </motion.div>

        {/* Vertical Timeline Container */}
        <div className="relative pl-8 md:pl-16"> 
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-6 w-0.5 bg-accent h-full"></div> 
          
          {servicesData.map((item, index) => (
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

export default Services;