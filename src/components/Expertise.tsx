// src/components/Courses.tsx

'use client';

import { motion } from 'framer-motion';
import { Code, Brain, Zap } from 'lucide-react';

// Define the data for the three course categories
const courseData = [
  {
    icon: Code,
    title: 'Web/App Development',
    description: "Learn to build responsive websites and mobile applications using modern technologies like React, Next.js, and React Native. Master both frontend and backend development with our comprehensive curriculum.",
    keywords: ['React', 'Next.js', 'React Native', 'Node.js', 'MongoDB'],
    delay: 0.2,
  },
  {
    icon: Brain,
    title: 'AI/ML Training Programs',
    description: "Comprehensive training in Artificial Intelligence and Machine Learning. Learn to build intelligent systems using Python, TensorFlow, and PyTorch with real-world projects.",
    keywords: ['Python', 'TensorFlow', 'PyTorch', 'Neural Networks', 'Data Science'],
    delay: 0.4,
  },
  {
    icon: Zap,
    title: 'Digital Marketing',
    description: "Master SEO, SMM, Content Marketing, and Analytics to grow your business in the digital landscape. Combine theory with practical applications for real results.",
    keywords: ['SEO', 'Social Media', 'Content Strategy', 'Analytics', 'PPC'],
    delay: 0.6,
  },
];

// Animation properties for the cards
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Courses = () => {
  return (
    <section id="courses" className="section">
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
            Core Programs
          </p>
          <h2 className="section-title text-primary">
            Our Three Core Learning Paths
          </h2>
          <p className="section-subtitle text-secondary">
            Comprehensive training programs designed to transform your career
          </p>
        </motion.div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {courseData.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: item.delay }}
              className="card glass-card group hover:shadow-card transition-all duration-300"
            >
              {/* Icon */}
              <div className="flex-shrink-0 flex justify-center mb-6">
                <div className="p-4 rounded-full bg-primary-gradient text-white">
                  <item.icon className="h-10 w-10" />
                </div>
              </div>

              {/* Title */}
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-3 text-primary group-hover:text-accent transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-secondary mb-6">
                  {item.description}
                </p>
                
                {/* Keywords/Tags */}
                <div className="flex flex-wrap justify-center gap-2">
                  {item.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="px-3 py-1 bg-primary-gradient text-white text-xs font-medium rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;