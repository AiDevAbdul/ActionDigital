// src/components/Hero.tsx

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronsDown, Users, Zap, Code, Cpu, Bot } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="pt-24 min-h-[100vh] flex items-center justify-center relative overflow-hidden">
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-primary-gradient rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-60 h-60 bg-secondary-gradient rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 text-center">
        
        {/* Animated Main Headline */}
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 relative"
        >
          <span className="text-primary">
            Abdul Wahab
          </span>
          <motion.span
            className="block w-full h-1 bg-primary-gradient mt-2"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.8, delay: 1.0 }}
          ></motion.span>
        </motion.h1>

        {/* Animated Subtitle (Your Core Identity) */}
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-medium mb-8 text-secondary"
        >
          <span className="inline-flex flex-wrap justify-center gap-x-2">
            <span className="flex items-center gap-1">
              <Cpu className="text-accent" size={24} /> AI Engineer
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="flex items-center gap-1">
              <Code className="text-accent" size={24} /> Digital Strategist
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="flex items-center gap-1">
              <Bot className="text-accent" size={24} /> Skills Enabler
            </span>
          </span>
        </motion.h2>

        {/* Animated Professional Summary (Concise Version) */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.0 }}
          className="text-lg sm:text-xl text-secondary max-w-3xl mx-auto leading-relaxed mb-12"
        >
          Innovative and growth-driven expert specializing in integrating Artificial Intelligence, digital strategy, and education to empower individuals and organizations in the digital economy.
        </motion.p>

        {/* Animated CTAs (Call to Actions) */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 1.2 }}
          className="flex flex-col sm:flex-row justify-center gap-6"
        >
          <Link
            href="#projects"
            className="btn flex items-center justify-center group"
          >
            <Zap className="mr-2 h-5 w-5" /> 
            View Latest Projects
            <motion.span 
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 2 }}
            >
              →
            </motion.span>
          </Link>
          <Link
            href="#experience"
            className="btn btn-secondary flex items-center justify-center group"
          >
            <Users className="mr-2 h-5 w-5" /> 
            Detailed Experience
          </Link>
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: [10, 0, 10], opacity: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 2.0 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-accent cursor-pointer"
        onClick={() => {
            document.getElementById('expertise')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <ChevronsDown className="h-8 w-8" />
      </motion.div>
    </section>
  );
};

export default Hero;