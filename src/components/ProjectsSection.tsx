'use client';

import { motion } from '@/lib/motion-shim';
import { Code, Brain, Zap, ExternalLink, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import PillBadge from '@/components/ui/PillBadge';
import AmbientBlob from '@/components/ui/AmbientBlob';

type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string | null;
  icon: string;
  delay: number;
};

const fallbackProjects: Project[] = [
  { id: '1', title: 'Website Design & Development', description: 'Responsive websites for local businesses enhancing online presence and customer engagement.', tech: ['Next.js', 'WordPress', 'Tailwind'], link: '#', icon: 'Code',  delay: 0.1 },
  { id: '2', title: 'AI-Powered Chatbot',           description: 'Automated customer support chatbot integrated into client websites, improving response times by 80%.', tech: ['AI', 'n8n', 'API'],           link: '#', icon: 'Brain', delay: 0.2 },
  { id: '3', title: 'E-Commerce Platform',           description: 'Comprehensive e-commerce solution with inventory management, Stripe payments, and analytics.', tech: ['Next.js', 'Stripe', 'MongoDB'], link: '#', icon: 'Zap',   delay: 0.3 },
];

function iconFor(name: string) {
  switch (name) {
    case 'Brain': return Brain;
    case 'Zap':   return Zap;
    default:      return Code;
  }
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data: Project[]) => {
        if (Array.isArray(data)) {
          setProjects(data.map((p, i) => ({ ...p, delay: 0.1 + i * 0.08 })));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const visible = (loading ? fallbackProjects : (projects.length ? projects : fallbackProjects)).slice(0, 3);

  return (
    <section id="projects" className="relative py-24 overflow-hidden bg-[#090D1A]">
      <AmbientBlob color="orange" animation="two" size="w-[400px] h-[400px]" className="top-0 right-0 translate-x-1/3" opacity={0.07} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <SectionHeading
            eyebrow="Featured Projects"
            heading="Our Recent Work"
            subtext="Innovative solutions delivered to clients across industries."
          />
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {visible.map((project) => {
            const Icon = iconFor(project.icon);
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: project.delay }}
              >
                <GlassCard hover padding="p-6" className="h-full flex flex-col group">
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-[rgba(239,126,46,0.12)] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#EF7E2E]" />
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title}`}
                        className="w-8 h-8 rounded-lg bg-white/6 border border-white/10 flex items-center justify-center text-[#8892A4] hover:text-[#EF7E2E] hover:border-[rgba(239,126,46,0.40)] transition-all duration-200"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <h3 className="font-heading font-semibold text-[#F1F5FF] text-lg leading-snug mb-2 group-hover:text-[#EF7E2E] transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-[#8892A4] text-sm leading-relaxed flex-1 mb-5">
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/8">
                    {project.tech.map((t) => (
                      <PillBadge key={t} variant="orange">{t}</PillBadge>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[12px] font-semibold text-white bg-gradient-to-r from-[#EF7E2E] to-[#F5A623] shadow-[0_0_28px_rgba(239,126,46,0.25)] hover:shadow-[0_0_44px_rgba(239,126,46,0.40)] transition-shadow duration-[280ms]"
          >
            View All Projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
