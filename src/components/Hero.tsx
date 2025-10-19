'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronsDown, Users, Zap, Code, Cpu, Bot } from 'lucide-react';
import RevolvingSkills from './RevolvingSkills';

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex flex-col md:flex-row items-center justify-center min-h-[100dvh] overflow-hidden text-center px-4 pt-20 pb-16"
    >
      {/* === Animated background blobs === */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent rounded-full mix-blend-soft-light blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-primary-gradient rounded-full mix-blend-soft-light blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-60 h-60 bg-secondary-gradient rounded-full mix-blend-soft-light blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* === Left side content === */}
      <div className="z-10 flex flex-col items-center md:items-start justify-center px-2 py-4 text-center md:text-left mb-6 md:mb-0 md:mr-2">
        {/* === Headline === */}
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
        >
          <span className="text-primary">Action Digital Institute</span>
          <motion.span
            className="block w-full h-1 bg-primary-gradient mt-2"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.8, delay: 1.0 }}
          />
        </motion.h1>

        {/* === Subtitle === */}
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg sm:text-xl lg:text-2xl font-medium text-secondary flex flex-wrap justify-center md:justify-start gap-x-2 gap-y-1 mt-4"
        >
          <span className="flex items-center gap-1">
            <Code className="text-accent" size={18} /> Web/App Development
          </span>
          <span className="hidden sm:inline">|</span>
          <span className="flex items-center gap-1">
            <Bot className="text-accent" size={18} /> AI/ML Training
          </span>
          <span className="hidden sm:inline">|</span>
          <span className="flex items-center gap-1">
            <Zap className="text-accent" size={18} /> Digital Marketing
          </span>
        </motion.h2>

        {/* === Summary === */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.0 }}
          className="text-sm sm:text-base text-secondary max-w-[320px] mx-auto md:mx-0 mt-4 leading-relaxed"
        >
          Leading institute for cutting-edge technology education in Web/App Development, AI/ML, and Digital Marketing.
          Transform your digital future with our comprehensive programs.
        </motion.p>

        {/* === CTAs (with extra spacing to prevent overlap) === */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 1.2 }}
          className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mt-6 mb-16"
        >
          <Link href="#courses" className="btn flex items-center justify-center group text-sm py-2 px-4">
            <Zap className="mr-2 h-4 w-4" />
            Explore Courses
            <motion.span
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 2 }}
            >
              →
            </motion.span>
          </Link>

          <Link
            href="#contact"
            className="btn btn-secondary flex items-center justify-center group text-sm py-2 px-4"
          >
            <Users className="mr-2 h-4 w-4" />
            Contact Us
          </Link>
        </motion.div>
      </div>

      {/* === Right side - Revolving Skills Component === */}
      <div className="z-10 flex items-center justify-center p-2 md:ml-2">
        <div className="relative w-[320px] h-[320px]"> {/* Reduced size and adjusted spacing */}
          <RevolvingSkills />
        </div>
      </div>

      {/* === Scroll Indicator === */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: [10, 0, 10], opacity: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 2.0 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-accent cursor-pointer z-30"
        onClick={() => {
          document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <ChevronsDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
};

export default Hero;
