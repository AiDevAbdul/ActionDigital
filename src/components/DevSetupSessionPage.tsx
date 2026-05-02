'use client';

import { useState, useEffect } from 'react';
import { motion } from '@/lib/motion-shim';
import RegistrationForm from '@/components/RegistrationForm';
import RegistrationSuccess from '@/components/RegistrationSuccess';
import { Users, Clock, Calendar, CheckCircle2, HelpCircle, MapPin, Package, GitBranch, Github, Monitor, Bot, Rocket, Code2, Award } from 'lucide-react';

const sessionTopics = [
  { icon: Package,   title: 'Node.js Installation', desc: 'Set up Node.js and npm on your machine' },
  { icon: GitBranch, title: 'Git Setup',             desc: 'Install and configure Git for version control' },
  { icon: Github,    title: 'GitHub Account',        desc: 'Create your GitHub account and understand basics' },
  { icon: Monitor,   title: 'VSCode Setup',          desc: 'Install and configure Visual Studio Code' },
  { icon: Bot,       title: 'Claude Code Setup',     desc: 'Get Claude Code running for AI-assisted development' },
  { icon: Rocket,    title: 'First Steps',           desc: 'Write your first code with AI assistance' },
];

const prerequisites = [
  'A computer (Windows, Mac, or Linux)',
  'Stable internet connection',
  '4GB RAM minimum (8GB recommended)',
  '2GB free disk space',
  'Willingness to learn and ask questions',
];

const faqs = [
  { q: 'Do I need coding experience?',            a: 'No! This session is designed for complete beginners. We start from scratch.' },
  { q: 'What if I get stuck during installation?', a: 'We\'ll help you in real-time. Plus, you\'ll have access to community groups for ongoing support.' },
  { q: 'Can I watch the recording?',               a: 'Yes! The session will be recorded and shared in the WhatsApp and Facebook groups.' },
  { q: 'Do I need to install anything before?',    a: 'No — we\'ll do everything together during the session. Just have your computer ready.' },
  { q: 'Is this session free?',                    a: 'Yes, absolutely free! We believe in making quality education accessible to everyone.' },
];

const statItems = [
  { icon: Calendar, label: 'Date',     value: 'Friday, May 9, 2026' },
  { icon: Clock,    label: 'Time',     value: '9:00 PM – 11:00 PM PKT' },
  { icon: Code2,    label: 'Duration', value: '2 Hours Live' },
];

export default function DevSetupSessionPage() {
  const [registrationCount, setRegistrationCount] = useState(0);
  const [isRegistered, setIsRegistered]           = useState(false);
  const [loading, setLoading]                     = useState(true);

  useEffect(() => {
    fetch('/api/session-registrations')
      .then(r => r.json())
      .then(d => setRegistrationCount(d.count || 0))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleRegistrationSuccess = () => {
    setIsRegistered(true);
    setRegistrationCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#090D1A' }}>

      {/* Ambient blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-60 -left-40 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]" style={{ background: 'radial-gradient(circle, #EF7E2E 0%, transparent 70%)' }} />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full opacity-15 blur-[120px]" style={{ background: 'radial-gradient(circle, #6366F1 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-xs font-bold uppercase tracking-widest" style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', color: '#A5B4FC' }}>
            <Bot className="w-3.5 h-3.5" />
            Free Online Session
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#F1F5FF' }}>
            AI-Driven Development{' '}
            <span style={{ background: 'linear-gradient(135deg, #EF7E2E, #F5A623)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Setup for Beginners
            </span>
          </h1>
          <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: '#8892A4' }}>
            Start your development journey with expert guidance and community support
          </p>
        </motion.div>

        {/* ── Session Details Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card rounded-2xl mb-8 overflow-hidden"
        >
          {/* Orange top accent */}
          <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #EF7E2E, #6366F1)' }} />

          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
              {statItems.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'rgba(239,126,46,0.12)', border: '1px solid rgba(239,126,46,0.2)' }}>
                    <Icon className="w-5 h-5" style={{ color: '#EF7E2E' }} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-semibold mb-0.5" style={{ color: '#8892A4' }}>{label}</p>
                    <p className="text-sm font-semibold" style={{ color: '#F1F5FF' }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t mb-5" style={{ borderColor: 'rgba(255,255,255,0.08)' }} />

            {/* Location + live count row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)' }}>
                  <MapPin className="w-4 h-4" style={{ color: '#818CF8' }} />
                </div>
                <span className="text-sm" style={{ color: '#8892A4' }}>
                  Online via Google Meet — <span style={{ color: '#F1F5FF' }}>link shared in WhatsApp group</span>
                </span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <Users className="w-4 h-4" style={{ color: '#34D399' }} />
                <span className="text-sm font-bold" style={{ color: '#34D399' }}>
                  {loading ? '—' : registrationCount} registered
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── What You'll Learn ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="glass-card rounded-2xl p-6 sm:p-8 mb-8"
        >
          <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#F1F5FF' }}>
            What You&apos;ll Learn
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {sessionTopics.map(({ icon: Icon, title, desc }, idx) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.05 }}
                className="flex items-start gap-4 p-4 rounded-xl transition-colors duration-200 group"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(239,126,46,0.12)', border: '1px solid rgba(239,126,46,0.2)' }}>
                  <Icon className="w-4 h-4" style={{ color: '#EF7E2E' }} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-0.5" style={{ color: '#F1F5FF' }}>{title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#8892A4' }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Why This Session Matters ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl p-6 sm:p-8 mb-8 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(239,126,46,0.12) 0%, rgba(99,102,241,0.12) 100%)', border: '1px solid rgba(239,126,46,0.2)' }}
        >
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: 'linear-gradient(90deg, #EF7E2E, #6366F1)' }} />
          <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#F1F5FF' }}>
            Why This Session Matters
          </h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: '#8892A4' }}>
            Starting your development journey can feel overwhelming — so many tools, so many steps.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: '#8892A4' }}>
            This session removes all the barriers. We&apos;ll walk through every installation step together, answer your questions in real-time, and connect you with a supportive community. By the end, you&apos;ll have everything set up and ready to start coding with AI assistance.
          </p>
        </motion.div>

        {/* ── What You Need ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="glass-card rounded-2xl p-6 sm:p-8 mb-8"
        >
          <h2 className="text-xl font-bold mb-5" style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#F1F5FF' }}>
            What You Need
          </h2>
          <div className="space-y-3">
            {prerequisites.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#10B981' }} />
                <span className="text-sm" style={{ color: '#8892A4' }}>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── About the Instructor ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card rounded-2xl p-6 sm:p-8 mb-8"
        >
          <h2 className="text-xl font-bold mb-5" style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#F1F5FF' }}>
            About the Instructor
          </h2>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-20 h-20 rounded-2xl flex-shrink-0 flex items-center justify-center text-white text-2xl font-black" style={{ background: 'linear-gradient(135deg, #EF7E2E, #6366F1)', fontFamily: 'Space Grotesk, sans-serif' }}>
              AW
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1" style={{ color: '#F1F5FF', fontFamily: 'Space Grotesk, sans-serif' }}>
                Abdul Wahab
              </h3>
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-3.5 h-3.5" style={{ color: '#EF7E2E' }} />
                <p className="text-xs font-medium" style={{ color: '#EF7E2E' }}>
                  Academia Incharge, Action Digital Institute (ADI)
                </p>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#8892A4' }}>
                With years of experience in web development and AI integration, Abdul is passionate about helping beginners start their coding journey. He believes that with the right guidance and tools, anyone can become a developer.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── FAQ ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="glass-card rounded-2xl p-6 sm:p-8 mb-8"
        >
          <div className="flex items-center gap-2 mb-5">
            <HelpCircle className="w-5 h-5" style={{ color: '#EF7E2E' }} />
            <h2 className="text-xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#F1F5FF' }}>
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + idx * 0.05 }}
                className="pl-4 py-1"
                style={{ borderLeft: '3px solid rgba(239,126,46,0.5)' }}
              >
                <h3 className="text-sm font-semibold mb-1" style={{ color: '#F1F5FF' }}>{faq.q}</h3>
                <p className="text-sm" style={{ color: '#8892A4' }}>{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Registration ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {!isRegistered ? (
            <RegistrationForm inline onSuccess={handleRegistrationSuccess} />
          ) : (
            <RegistrationSuccess />
          )}
        </motion.div>

        {/* ── Footer CTA ── */}
        {isRegistered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-10"
          >
            <p className="text-sm" style={{ color: '#8892A4' }}>
              See you on Friday, May 9 at 9:00 PM PKT!
            </p>
            <p className="text-xs mt-1" style={{ color: 'rgba(136,146,164,0.6)' }}>
              Questions? Join our Facebook group or WhatsApp community.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
