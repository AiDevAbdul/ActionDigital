// src/components/Services.tsx

'use client';

import { motion } from '@/lib/motion-shim';
import { Code, Brain, Zap, Palette, Globe, MessageCircle } from 'lucide-react';
import { useState } from 'react';

const servicesData = [
  {
    icon: Code,
    title: 'Software Solutions',
    color: 'from-blue-500 to-cyan-500',
    accentColor: 'bg-blue-500/20 border-blue-500/50',
    details: [
      "Web Design and Development",
      "AI/Python Programming",
      "Software Development",
      "Mobile Application Development",
    ],
  },
  {
    icon: Zap,
    title: 'Digital Marketing',
    color: 'from-amber-500 to-orange-500',
    accentColor: 'bg-amber-500/20 border-amber-500/50',
    details: [
      "Digital Marketing Strategy",
      "Search Engine Optimization",
      "Social Media Management",
      "PPC Advertising",
    ],
  },
  {
    icon: Palette,
    title: 'Creative Services',
    color: 'from-pink-500 to-rose-500',
    accentColor: 'bg-pink-500/20 border-pink-500/50',
    details: [
      "3D Animation",
      "Video Editing",
      "Graphic Designing",
      "Audio & Voice Over",
    ],
  },
  {
    icon: Globe,
    title: 'Physical Marketing',
    color: 'from-emerald-500 to-teal-500',
    accentColor: 'bg-emerald-500/20 border-emerald-500/50',
    details: [
      "Hoarding & SMDs",
      "Newspaper Advertisements",
      "Steamers & Banners",
      "Promotional Materials",
    ],
  },
  {
    icon: Brain,
    title: 'AI Training',
    color: 'from-purple-500 to-indigo-500',
    accentColor: 'bg-purple-500/20 border-purple-500/50',
    details: [
      "AI Content Creation",
      "Data Analysis Tools",
      "Data-Driven Decisions",
      "AI Implementation",
    ],
  },
  {
    icon: MessageCircle,
    title: 'Social & E-Commerce',
    color: 'from-red-500 to-pink-500',
    accentColor: 'bg-red-500/20 border-red-500/50',
    details: [
      "Social Media Management",
      "E-Commerce Solutions",
      "YouTube Management",
      "Freelancing Training",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  hover: {
    y: -8,
    transition: {
      duration: 0.3,
    },
  },
};

const Services = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="services" className="section bg-surface relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent px-4 py-2 rounded-full bg-accent/10 border border-accent/30">
              Professional Services
            </p>
          </div>
          <h2 className="section-title text-primary mb-4">
            Services We Offer
          </h2>
          <p className="section-subtitle text-secondary max-w-2xl mx-auto">
            Comprehensive technology and marketing solutions tailored to elevate your business
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="group cursor-pointer"
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <div className={`relative h-full rounded-2xl border backdrop-blur-sm transition-all duration-300 overflow-hidden ${service.accentColor}`}>
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                {/* Content */}
                <div className="relative p-8 h-full flex flex-col">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Details - Always visible on mobile, expandable on desktop */}
                  <div className={`flex-1 transition-all duration-300 ${expandedIndex === index ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
                    <ul className="space-y-3">
                      {service.details.map((detail, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="text-secondary text-sm flex items-start gap-3"
                        >
                          <span className={`inline-block w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color} flex-shrink-0 mt-2`}></span>
                          <span>{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Expand indicator - Mobile only */}
                  <div className="md:hidden mt-4 pt-4 border-t border-accent/20">
                    <p className="text-xs text-accent font-semibold">
                      {expandedIndex === index ? 'Tap to collapse' : 'Tap to expand'}
                    </p>
                  </div>
                </div>

                {/* Hover border animation */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <p className="text-secondary mb-6">
            Ready to transform your business with our services?
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-accent to-accent/80 text-white font-semibold hover:shadow-lg transition-shadow duration-300"
          >
            Get Started Today
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;