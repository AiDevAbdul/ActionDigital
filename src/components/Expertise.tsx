// src/components/Expertise.tsx

'use client';

import { motion } from 'framer-motion';
import { Brain, TrendingUp, BookOpen } from 'lucide-react'; // Icons for the three pillars

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
    <section id="expertise" className="py-20 sm:py-32 bg-node-dark">
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
            Core Competencies
          </p>
          <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-node-text-light sm:text-5xl">
            My Three Pillars of Expertise
          </h2>
        </motion.div>

        {/* Expertise Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {expertiseData.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }} // Trigger when 40% of the card is visible
              transition={{ duration: 0.6, delay: item.delay }}
              className="group flex flex-col p-6 rounded-xl border border-node-green/30 bg-[#252525] shadow-xl hover:shadow-green-glow transition-all duration-500 ease-in-out"
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                <item.icon className="h-10 w-10 text-node-green" />
              </div>

              {/* Title */}
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-node-text-light transition-colors duration-300 group-hover:text-node-light-green">
                  {item.title}
                </h3>
                <p className="mt-2 text-node-text-muted">
                  {item.description}
                </p>
              </div>

              {/* Keywords/Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {item.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="inline-flex items-center rounded-full bg-node-green/10 px-3 py-1 text-xs font-medium text-node-green transition-colors duration-300 group-hover:bg-node-green/20"
                  >
                    {keyword}
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

export default Expertise;