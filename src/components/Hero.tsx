'use client';

import Link from 'next/link';
import { motion } from '@/lib/motion-shim';
import { ArrowRight, Zap, BookOpen, Bot } from 'lucide-react';
import { useState, useEffect } from 'react';
import AmbientBlob from '@/components/ui/AmbientBlob';

const ROTATING_WORDS = ['Brands', 'Solutions', 'Futures', 'Leaders', 'Impact'];

const STATS = [
  { value: '1,500+', label: 'Students Trained' },
  { value: '50+',    label: 'Projects Delivered' },
  { value: '3-in-1', label: 'Platform' },
  { value: '95%',    label: 'Satisfaction Rate' },
];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible]     = useState(true);

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
        setVisible(true);
      }, 300);
    }, 2400);
    return () => clearInterval(cycle);
  }, []);

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-[100dvh] overflow-hidden px-4 pt-24 pb-20 bg-[#090D1A]"
    >
      {/* Ambient blobs */}
      <AmbientBlob
        color="orange"
        animation="one"
        size="w-[700px] h-[700px]"
        className="-top-40 -left-40"
        opacity={0.09}
      />
      <AmbientBlob
        color="indigo"
        animation="two"
        size="w-[600px] h-[600px]"
        className="-bottom-20 -right-32"
        opacity={0.08}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl w-full">

        {/* Eyebrow badge */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(239,126,46,0.35)] bg-[rgba(239,126,46,0.08)] text-[#EF7E2E] text-sm font-semibold">
            <Zap className="w-3.5 h-3.5" />
            Empowering Digital Transformation
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading font-bold text-[#F1F5FF] leading-[1.1] tracking-tight mb-4"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
        >
          We Build{' '}
          <span
            className="inline-block gradient-text-orange transition-all duration-300"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(12px)',
              minWidth: '3ch',
            }}
          >
            {ROTATING_WORDS[wordIndex]}
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[#8892A4] max-w-2xl leading-relaxed mb-4"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}
        >
          ActionDigital unites a{' '}
          <span className="text-[#F1F5FF] font-medium">Digital Institute</span>,{' '}
          <span className="text-[#EF7E2E] font-medium">Marketing Agency</span>, and{' '}
          <span className="text-[#6366F1] font-medium">AI Automation</span> studio
          — one platform to educate, grow, and automate.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[12px] font-semibold text-white bg-gradient-to-r from-[#EF7E2E] to-[#F5A623] shadow-[0_0_32px_rgba(239,126,46,0.30)] hover:shadow-[0_0_50px_rgba(239,126,46,0.45)] transition-shadow duration-[280ms] min-h-[52px] text-base"
            >
              <BookOpen className="w-4 h-4" />
              Explore Courses
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[12px] font-semibold text-[#F1F5FF] bg-white/8 backdrop-blur-md border border-white/14 hover:bg-white/12 hover:border-white/22 transition-all duration-[280ms] min-h-[52px] text-base"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="glass-card px-4 py-4 text-center"
              style={{ animationDelay: `${0.8 + i * 0.08}s` }}
            >
              <div
                className="font-heading font-bold text-[#EF7E2E] mb-1"
                style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}
              >
                {stat.value}
              </div>
              <div className="text-[#8892A4] text-xs font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* 3 Pillars row */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="flex flex-wrap justify-center gap-3 mt-8"
        >
          {[
            { icon: BookOpen, label: 'Digital Institute', color: 'text-[#6366F1] bg-[rgba(99,102,241,0.10)] border-[rgba(99,102,241,0.25)]' },
            { icon: Zap,      label: 'Marketing Agency',  color: 'text-[#EF7E2E] bg-[rgba(239,126,46,0.10)] border-[rgba(239,126,46,0.25)]' },
            { icon: Bot,      label: 'AI Automation',     color: 'text-[#818CF8] bg-[rgba(129,140,248,0.10)] border-[rgba(129,140,248,0.25)]' },
          ].map(({ icon: Icon, label, color }) => (
            <span
              key={label}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${color}`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        aria-hidden="true"
      >
        <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-[#EF7E2E]" />
        </div>
      </motion.div>
    </section>
  );
}
