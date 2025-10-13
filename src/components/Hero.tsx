// src/components/Hero.tsx

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronsDown, Users, Zap } from 'lucide-react';

const Hero = () => {
  return (
    // Add margin to push the content down below the fixed header
    <section id="home" className="pt-24 min-h-[90vh] flex items-center justify-center relative overflow-hidden">
      
      {/* Optional: Subtle technical pattern in background (if added later) */}
      <div className="absolute inset-0 opacity-10 bg-repeat [background-image:radial-gradient(var(--color-node-green)_1px,transparent_0)] [background-size:20px_20px]"></div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-16 text-center">
        
        {/* Animated Main Headline */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-node-text-light mb-4"
        >
          Abdul Wahab
        </motion.h1>

        {/* Animated Subtitle (Your Core Identity) */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-mono font-medium text-node-green mb-8"
        >
          AI Engineer | Digital Strategist | Skills Enabler
        </motion.h2>

        {/* Animated Professional Summary (Concise Version) */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.0 }}
          className="text-lg sm:text-xl text-node-text-muted max-w-3xl mx-auto leading-relaxed"
        >
          Innovative and growth-driven expert specializing in integrating Artificial Intelligence, digital strategy, and education to empower individuals and organizations in the digital economy.
        </motion.p>

        {/* Animated CTAs (Call to Actions) */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 1.2 }}
          className="mt-10 flex flex-col sm:flex-row justify-center gap-6"
        >
          <Link
            href="#projects"
            className="flex items-center justify-center rounded-lg px-8 py-3 text-lg font-semibold bg-node-green text-node-dark shadow-green-glow transition-all duration-300 hover:bg-node-light-green/90"
          >
            <Zap className="mr-2 h-5 w-5" /> View Latest Projects
          </Link>
          <Link
            href="#experience"
            className="flex items-center justify-center rounded-lg border border-node-green px-8 py-3 text-lg font-semibold text-node-green transition-colors duration-300 hover:bg-node-green/10"
          >
            <Users className="mr-2 h-5 w-5" /> Detailed Experience
          </Link>
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: [10, 0, 10], opacity: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 2.0 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-node-green cursor-pointer"
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