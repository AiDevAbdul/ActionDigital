// src/components/Courses.tsx

'use client';

import { motion } from 'framer-motion';
import { Code, Brain, Zap, Palette, Video, ShoppingBag, Users, Globe } from 'lucide-react';

// Define the data for the course categories based on business profile
const courseData = [
  {
    icon: Zap,
    title: 'Digital Marketing, Advertising & Promotion',
    description: "Comprehensive courses covering social media marketing, search engine optimization (SEO), email marketing, PPC advertising, content marketing, and more. Complete with strategic digital marketing approaches using cutting-edge techniques.",
    keywords: ['SEO', 'Social Media', 'Content Strategy', 'Analytics', 'PPC', 'Email Marketing'],
    delay: 0.2,
  },
  {
    icon: Code,
    title: 'Web & Software Development',
    description: "Complete web design and development training including frontend and backend technologies, mobile application development, and comprehensive software solutions. Learn AI/Python programming for advanced business applications.",
    keywords: ['Web Design', 'App Development', 'Python', 'AI', 'JavaScript', 'Full-Stack'],
    delay: 0.4,
  },
  {
    icon: Palette,
    title: '3D Animation & Graphic Designing',
    description: "Professional training in 3D animation, video editing, graphic designing, and multimedia production. Master industry-standard tools and creative techniques to produce compelling visual content.",
    keywords: ['3D Animation', 'Video Editing', 'Graphic Design', 'Multimedia', 'Adobe Suite', 'Animation'],
    delay: 0.6,
  },
  {
    icon: Video,
    title: 'Audio/Video Editing & Voice Over',
    description: "This comprehensive course includes full-fledged training on video and audio editing with professional voice-over techniques. Learn to create high-quality content for digital platforms and commercial purposes.",
    keywords: ['Video Editing', 'Audio Editing', 'Voice Over', 'Post-Production', 'Content Creation', 'Podcasting'],
    delay: 0.8,
  },
  {
    icon: ShoppingBag,
    title: 'E-Commerce & Freelancing',
    description: "Essential skills for selling products online and offering freelance services. Learn to start and manage e-commerce businesses, work with international clients, and develop sustainable online income streams.",
    keywords: ['E-Commerce', 'Freelancing', 'Online Business', 'International Clients', 'Marketing', 'Shopify'],
    delay: 1.0,
  },
  {
    icon: Users,
    title: 'Social Media Management & YouTube Channel Management',
    description: "This important component helps students earn online instantly. Learn to manage social media effectively and build profitable YouTube channels. Many success stories from our students in these areas.",
    keywords: ['Social Media', 'YouTube', 'Channel Management', 'Monetization', 'Online Earning', 'Community Building'],
    delay: 1.2,
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
            Comprehensive Training Programs
          </h2>
          <p className="section-subtitle text-secondary">
            10+ essential digital skills with specialization in one specific area
          </p>
        </motion.div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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