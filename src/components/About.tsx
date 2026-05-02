'use client';

import { motion } from '@/lib/motion-shim';
import { Target, Heart, Award, Users, Lightbulb, Handshake } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import AmbientBlob from '@/components/ui/AmbientBlob';

const VALUES = [
  { icon: Award,      title: 'Client-Centric',              desc: 'Prioritizing client needs to deliver tailored solutions that drive real results and create lasting value.' },
  { icon: Lightbulb,  title: 'Innovation',                  desc: 'Staying ahead of industry trends and continuously evolving our training and marketing strategies.' },
  { icon: Heart,      title: 'Experienced Team',             desc: 'A team of experts with extensive experience ensuring the highest quality of service delivery.' },
  { icon: Handshake,  title: 'Collaborative Partnerships',   desc: 'Working with leaders, institutions, and community organizations to amplify our collective impact.' },
  { icon: Users,      title: 'Inclusive Access',             desc: 'Breaking barriers to education for women entrepreneurs and underserved communities nationwide.' },
  { icon: Target,     title: 'Purposeful Growth',            desc: 'Aligning every initiative with measurable social and economic outcomes for Pakistan.' },
];

export default function About() {
  return (
    <section id="about" className="relative bg-[#090D1A] overflow-hidden">
      <AmbientBlob color="indigo" animation="one"   size="w-[600px] h-[600px]" className="-top-40 -right-40"   opacity={0.07} />
      <AmbientBlob color="orange" animation="three" size="w-[400px] h-[400px]" className="bottom-0 left-0 -translate-x-1/4" opacity={0.06} />

      {/* ── HERO BAND ───────────────────────────────── */}
      <div className="relative min-h-[40vh] flex items-center py-24 px-4">
        <div className="mx-auto max-w-7xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <SectionHeading
              eyebrow="About ActionDigital"
              heading="Empowering Digital Transformation"
              subtext="Vision, mission, and journey of a 3-in-1 platform built to educate, grow, and automate."
            />
          </motion.div>
        </div>
      </div>

      {/* ── STORY + MISSION ─────────────────────────── */}
      <div className="relative py-16 px-4 bg-[#0E1426]">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <GlassCard padding="p-8" className="h-full flex flex-col">
              <h3 className="font-heading font-bold text-[#F1F5FF] text-2xl mb-5">Our Story</h3>
              <div className="flex flex-col gap-4 text-[#8892A4] text-sm leading-relaxed flex-1">
                <p>
                  Founded to bridge the digital skills gap, ActionDigital (ADI) was established to empower individuals and businesses with cutting-edge technology knowledge. We are committed to providing inclusive, comprehensive, and transformative IT skills training to help people overcome poverty, initiate business ventures, and contribute meaningfully to society.
                </p>
                <p>
                  Our programs cultivate inclusive business leadership, fostering a diverse entrepreneurial ecosystem that drives sustainable socio-economic development. Through strategic technical guidance and cutting-edge marketing, we accelerate economic growth for startups and SMBs nationwide.
                </p>
                <p>
                  We have trained students in 10+ essential digital skills, supported by a 1-month incubation program where students work on real client projects — earning while learning.
                </p>
              </div>
            </GlassCard>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <GlassCard glow="orange" padding="p-8" className="h-full flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-[rgba(239,126,46,0.15)] flex items-center justify-center mb-5">
                <Heart className="w-6 h-6 text-[#EF7E2E]" />
              </div>
              <h3 className="font-heading font-bold text-[#F1F5FF] text-2xl mb-5">Our Mission</h3>
              <p className="text-[#8892A4] text-sm leading-relaxed flex-1">
                Provide inclusive, comprehensive, and transformative IT skills training to individuals — empowering them to overcome poverty, initiate and excel in business, and contribute meaningfully to society. We aim to cultivate inclusive business leadership that fosters a diverse entrepreneurial ecosystem driving sustainable socio-economic development across Pakistan.
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </div>

      {/* ── VISION ──────────────────────────────────── */}
      <div className="relative py-16 px-4 bg-[#090D1A]">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <GlassCard glow="indigo" padding="p-10" className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-14 h-14 rounded-xl bg-[rgba(99,102,241,0.15)] flex items-center justify-center shrink-0">
                <Target className="w-7 h-7 text-[#6366F1]" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-[#F1F5FF] text-2xl mb-3">Our Vision</h3>
                <p className="text-[#8892A4] leading-relaxed max-w-3xl">
                  Empower individuals and businesses inclusively — especially women entrepreneurs — through transformative IT and AI skills, transcending barriers to poverty, contributing meaningfully to communities and the economy, and emerging as visionary business leaders of the digital age.
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>

      {/* ── VALUES BENTO ────────────────────────────── */}
      <div className="relative py-20 px-4 bg-[#0E1426]">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <SectionHeading
              eyebrow="What Drives Us"
              heading="Our Core Values"
              subtext="Six principles that guide everything we build, teach, and deliver."
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                >
                  <GlassCard hover padding="p-6" className="flex flex-col gap-4 h-full">
                    <div className="w-10 h-10 rounded-lg bg-[rgba(239,126,46,0.12)] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#EF7E2E]" />
                    </div>
                    <h4 className="font-heading font-semibold text-[#F1F5FF] text-base">{v.title}</h4>
                    <p className="text-[#8892A4] text-sm leading-relaxed">{v.desc}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
