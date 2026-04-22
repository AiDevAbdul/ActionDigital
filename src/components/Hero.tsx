'use client';

import Link from 'next/link';
import { motion } from '@/lib/motion-shim';
import { ChevronsDown, Zap, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-[100dvh] overflow-hidden px-4 pt-20 pb-16"
    >

      {/* === Center Content === */}
      <div className="z-10 flex flex-col items-center justify-center px-2 py-4 text-center max-w-5xl">
        {/* === Animated Badge === */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-8"
        >
          <motion.div
            className="relative inline-flex items-center px-5 py-2.5 rounded-full bg-gradient-to-r from-accent/15 to-accent/5 border border-accent/40 backdrop-blur-md overflow-hidden group"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-accent/30 to-transparent"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <span className="text-sm font-semibold text-accent relative z-10">Empowering Digital Transformation</span>
          </motion.div>
        </motion.div>

        {/* === Main Headline === */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mb-6"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-4">
            <span className="block text-primary">Action Digital</span>
            <span className="block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Institute
            </span>
          </h1>

          {/* Animated underline */}
          <div
            className="h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mt-6 mx-auto"
            style={{ width: '80%' }}
          />
        </motion.div>

        {/* === Subtitle === */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 mb-8 max-w-3xl"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary leading-relaxed">
            Master In-Demand Tech Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Transform Your Future</span>
          </h2>
        </motion.div>

        {/* === Description === */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base sm:text-lg text-secondary max-w-2xl leading-relaxed mb-12"
        >
          Empowering individuals & businesses inclusively, especially women entrepreneurs, through transformative IT & AI skills. Transcending barriers to poverty and contributing meaningfully to communities and the economy.
        </motion.p>

        {/* === Enhanced Stats Section === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-3 gap-4 mb-12 w-full max-w-2xl"
        >
          {[
            { value: '10+', label: 'Digital Skills', icon: '🎓' },
            { value: '1500+', label: 'Trained Students', icon: '👥' },
            { value: '95%', label: 'Satisfaction', icon: '⭐' }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="relative p-5 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/30 backdrop-blur-sm text-center group hover:border-accent/60 transition-all overflow-hidden"
              whileHover={{ y: -6, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 + idx * 0.1 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <div className="relative z-10">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">{stat.value}</div>
                <div className="text-xs sm:text-sm text-secondary mt-2">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* === CTAs with enhanced styling === */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto"
        >
          <Link
            href="#courses"
            className="relative group px-8 py-4 rounded-xl font-semibold text-white overflow-hidden flex items-center justify-center gap-2 text-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 transition-all" />
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 blur-lg transition-all"
            />
            <Zap className="h-5 w-5 relative z-10" />
            <span className="relative z-10">Explore Courses</span>
            <motion.span
              className="relative z-10"
              animate={{ x: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 1.5 }}
            >
              <ArrowRight className="h-5 w-5" />
            </motion.span>
          </Link>

          <Link
            href="#contact"
            className="relative group px-8 py-4 rounded-xl font-semibold text-accent border-2 border-accent/50 overflow-hidden flex items-center justify-center gap-2 text-lg hover:border-accent transition-all"
          >
            <div className="absolute inset-0 bg-accent/5 group-hover:bg-accent/10 transition-all" />
            <span className="relative z-10">Get Started</span>
            <motion.span
              className="relative z-10"
              animate={{ x: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 1.5 }}
            >
              <ArrowRight className="h-5 w-5" />
            </motion.span>
          </Link>
        </motion.div>
      </div>

      {/* === Scroll Indicator === */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: [10, 0, 10], opacity: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-accent cursor-pointer z-30 hover:text-accent/80 transition-colors group"
        onClick={() => {
          document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronsDown className="h-7 w-7" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
