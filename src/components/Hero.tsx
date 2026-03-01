'use client';

import Link from 'next/link';
import { motion } from '@/lib/motion-shim';
import { ChevronsDown, Users, Zap, Code, Cpu, Bot, Target, Award } from 'lucide-react';
import RevolvingSkills from './RevolvingSkills';

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex flex-col md:flex-row items-center justify-center min-h-[100dvh] overflow-hidden text-center px-4 pt-20 pb-16"
    >


      {/* === Left side content === */}
      <div className="z-10 flex flex-col items-center md:items-start justify-center px-2 py-4 text-center md:text-left mb-6 md:mb-0 md:mr-2">
        {/* === Tagline === */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center mb-4"
        >
          <div className="flex items-center px-3 py-1.5 bg-primary-gradient rounded-full text-white text-sm font-medium">
            <Award className="mr-2 h-4 w-4" />
            Empowering Digital Transformation
          </div>
        </motion.div>

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
            <Target className="text-accent" size={18} /> Bridging the Digital Skills Gap
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
          className="text-sm sm:text-base text-secondary max-w-[400px] mx-auto md:mx-0 mt-4 leading-relaxed"
        >
          Empowering individuals & businesses inclusively, especially women entrepreneurs, through transformative IT & AI skills. Transcending barriers to poverty and contributing meaningfully to communities and the economy.
        </motion.p>

        {/* === Stats Section === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="flex flex-wrap justify-center md:justify-start gap-6 mt-6"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">10+</div>
            <div className="text-xs text-secondary">Digital Skills</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">1500+</div>
            <div className="text-xs text-secondary">Trained Students</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">95%</div>
            <div className="text-xs text-secondary">Satisfaction Rate</div>
          </div>
        </motion.div>

        {/* === CTAs (with extra spacing to prevent overlap) === */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 1.4 }}
          className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mt-8 mb-16"
        >
          <Link href="#courses" className="btn flex items-center justify-center group text-sm py-3 px-6">
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
            className="btn btn-secondary flex items-center justify-center group text-sm py-3 px-6"
          >
            <Users className="mr-2 h-4 w-4" />
            Contact Us
          </Link>

          {/* <a
            href="https://wa.me/923189532843"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline flex items-center justify-center group text-sm py-3 px-6"
          >
            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.177-.008-.366-.01-.558-.01-.188 0-.543.025-.83.3-.284.276-.749.75-.749 1.842 0 1.093.792 2.105.916 2.28.124.172 2.14 3.282 5.304 4.551.702.3.99.45.916 1.024-.042.318-.188.418-.51.566-.3.14-.678.218-1.051.22-.373.002-.746-.075-1.078-.15-.347-.078-.744-.225-1.125-.45-.359-.21-.767-.53-1.162-.924-.396-.396-.71-.79-.924-1.162-.225-.381-.372-.778-.45-1.125-.075-.332-.15-.705-.15-1.078 0-.373.078-.746.22-1.078.148-.332.248-.678.566-.916.578-.198.926-.198 1.024-.198.574.074 1.05.767 1.024.916z"/>
            </svg>
            Contact Us
          </a> */}
        </motion.div>
      </div>

      {/* === Right side - Revolving Skills Component === */}
      <div className="z-10 flex items-center justify-center p-2 md:ml-2">
        <div className="relative w-[350px] h-[350px]"> {/* Increased size for better visibility */}
          <RevolvingSkills />
        </div>
      </div>

      {/* === Scroll Indicator === */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: [10, 0, 10], opacity: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 2.2 }}
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
