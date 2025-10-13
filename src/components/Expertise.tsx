// src/components/Expertise.tsx

'use client';

import { motion } from 'framer-motion';
import { Brain, TrendingUp, BookOpen } from 'lucide-react';

// Define the data for the three expertise cards
const expertiseData = [
  {
    icon: Brain,
    title: 'AI Engineering & Automation',
    description: "Designing and implementing intelligent systems using ChatGPT, Python, and n8n. Focused on automating workflows and creating PyQt-based applications for efficiency.",
    keywords: ['Python', 'ChatGPT', 'n8n', 'Automation', 'PyQt'],
    delay: 0.2,
  },
  {
    icon: TrendingUp,
    title: 'Digital Marketing Strategy',
    description: "Developing data-driven strategies for brand growth, content creation, and social media campaigns. Expertise in SEO, Ad Management, and e-commerce enablement for SMEs.",
    keywords: ['Social Media', 'SEO', 'Ad Management', 'E-commerce', 'Brand Strategy'],
    delay: 0.4,
  },
  {
    icon: BookOpen,
    title: 'Skills Development & Training',
    description: "Capacity building through digital skills training, curriculum design, and mentorship. Empowering youth and professionals in AI and digital transformation technologies.",
    keywords: ['Curriculum Design', 'Training of Trainers (TOT)', 'Digital Skills', 'Leadership'],
    delay: 0.6,
  },
];

// Animation properties for the cards
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Expertise = () => {
  return (
    <section id="expertise" className="section">
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
            Core Competencies
          </p>
          <h2 className="section-title text-primary">
            My Three Pillars of Expertise
          </h2>
          <p className="section-subtitle text-secondary">
            Leveraging cutting-edge technology to solve real-world challenges
          </p>
        </motion.div>

        {/* Expertise Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {expertiseData.map((item) => (
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

export default Expertise;