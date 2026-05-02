'use client';

import Link from 'next/link';
import { motion } from '@/lib/motion-shim';
import {
  BookOpen, Zap, Bot,
  Code, Palette, Globe,
  Brain, MessageSquare, ArrowRight,
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import AmbientBlob from '@/components/ui/AmbientBlob';

const PILLARS = [
  {
    icon: BookOpen,
    title: 'Digital Institute',
    tagline: 'Learn in-demand skills',
    description:
      'Structured learning paths from digital literacy to advanced AI engineering. Industry-recognised certifications for students and professionals.',
    href: '/courses',
    glow: 'indigo' as const,
    accent: '#6366F1',
    badge: 'indigo' as const,
    features: ['Web & App Development', 'AI & Python', 'Digital Literacy', 'Certifications'],
  },
  {
    icon: Zap,
    title: 'Marketing Agency',
    tagline: 'Grow with purpose',
    description:
      'Bold, results-driven campaigns — SEO, social media, branding, PPC, and creative production tailored for sustainable business growth.',
    href: '/services',
    glow: 'orange' as const,
    accent: '#EF7E2E',
    badge: 'orange' as const,
    features: ['SEO & PPC', 'Social Media', 'Brand Identity', 'Video Production'],
  },
  {
    icon: Bot,
    title: 'AI Automation',
    tagline: 'Work smarter, scale faster',
    description:
      'Custom AI workflows, chatbots, and n8n automations that eliminate repetitive work and help your business operate at intelligence-scale.',
    href: '/aidev',
    glow: 'none' as const,
    accent: '#818CF8',
    badge: 'indigo' as const,
    features: ['Workflow Automation', 'AI Chatbots', 'Data Analysis', 'API Integrations'],
  },
];

const EXTRA_SERVICES = [
  { icon: Code,         title: 'Software Development',  desc: 'Full-stack web & mobile applications built for scale.' },
  { icon: Palette,      title: 'Creative Design',        desc: 'Motion graphics, 3D animation, and brand collateral.' },
  { icon: Globe,        title: 'Physical Marketing',     desc: 'Hoardings, SMDs, banners, and print materials.' },
  { icon: Brain,        title: 'AI Training',            desc: 'Hands-on workshops to embed AI in your organisation.' },
  { icon: MessageSquare,title: 'E-Commerce & Social',    desc: 'End-to-end store setup and community management.' },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 overflow-hidden bg-[#090D1A]">
      <AmbientBlob color="orange" animation="three" size="w-[500px] h-[500px]" className="top-10 right-0 translate-x-1/3" opacity={0.06} />
      <AmbientBlob color="indigo" animation="one"   size="w-[400px] h-[400px]" className="bottom-0 left-0 -translate-x-1/4"   opacity={0.07} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <SectionHeading
            eyebrow="What We Do"
            heading="One Platform. Three Pillars."
            subtext="Education, marketing, and automation — built to work together so your growth compounds."
          />
        </motion.div>

        {/* 3-pillar bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <GlassCard
                  glow={pillar.glow}
                  hover
                  padding="p-7"
                  className="h-full flex flex-col"
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `rgba(${pillar.glow === 'indigo' ? '99,102,241' : pillar.glow === 'orange' ? '239,126,46' : '129,140,248'}, 0.15)` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: pillar.accent }} />
                  </div>

                  {/* Text */}
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-2"
                    style={{ color: pillar.accent }}
                  >
                    {pillar.tagline}
                  </p>
                  <h3 className="font-heading font-bold text-[#F1F5FF] text-xl mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-[#8892A4] text-sm leading-relaxed mb-5 flex-1">
                    {pillar.description}
                  </p>

                  {/* Feature list */}
                  <ul className="flex flex-col gap-2 mb-6">
                    {pillar.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-[#8892A4]">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: pillar.accent }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={pillar.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 mt-auto"
                    style={{ color: pillar.accent }}
                  >
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Extra services row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-center font-heading font-semibold text-[#F1F5FF] text-lg mb-6 opacity-80">
            Also in our toolkit
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {EXTRA_SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i }}
                >
                  <GlassCard padding="p-5" hover className="text-center h-full flex flex-col items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/6 border border-white/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#8892A4]" />
                    </div>
                    <div>
                      <p className="text-[#F1F5FF] text-sm font-semibold mb-1">{s.title}</p>
                      <p className="text-[#8892A4] text-xs leading-relaxed">{s.desc}</p>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[12px] font-semibold text-white bg-gradient-to-r from-[#EF7E2E] to-[#F5A623] shadow-[0_0_32px_rgba(239,126,46,0.25)] hover:shadow-[0_0_48px_rgba(239,126,46,0.40)] transition-shadow duration-[280ms]"
          >
            Get Started Today
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
