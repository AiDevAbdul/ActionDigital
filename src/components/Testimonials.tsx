'use client';

import { motion } from '@/lib/motion-shim';
import { Star, Quote, Users, Handshake } from 'lucide-react';
import { useState, useMemo } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';

const mockTestimonials = [
  { id: '1', content: "Working with ActionDigital was exceptional. Their AI-powered tools transformed our training programs and significantly increased student engagement.", author: "Sarah Johnson",  role: "CEO",             company: "EduTech Solutions",                       rating: 5, type: 'testimonial' },
  { id: '2', content: "Their expertise in AI and digital marketing automation delivered real results. Our social media reach increased 300% in just 3 months.",            author: "Michael Chen",  role: "Marketing Dir",  company: "GrowthMasters Inc",                       rating: 5, type: 'testimonial' },
  { id: '5', content: "The custom software solution exceeded our expectations. Attention to detail and commitment to quality was remarkable.",                              author: "Emma Thompson", role: "Product Manager", company: "StartUp Ventures",                        rating: 5, type: 'testimonial' },
  { id: '12', content: "Professional web development project that transformed our online presence and increased user engagement by 200%.",                                  author: "James Morris",  role: "Client",         company: "Business Corp",                           rating: 5, type: 'testimonial' },
  { id: '3', content: "Strategic partner for our AI integration projects. Technical expertise and project management skills are top-notch.",                               author: "TechInnovate",  role: "Partner",        company: "TechInnovate Alliance",                   rating: 5, type: 'partner' },
  { id: '7', content: "Partnership with ActionDigital has enabled us to provide cutting-edge tech education to underprivileged communities.",                              author: "HOPE87",        role: "Partner",        company: "HOPE87",                                  rating: 5, type: 'partner' },
  { id: '9', content: "Technical expertise from ActionDigital has enhanced our gemology programs significantly.",                                                          author: "GGI Peshawar", role: "Partner",        company: "Gems & Gemological Institute of Peshawar", rating: 5, type: 'partner' },
  { id: '4', content: "Seamless collaboration on the workflow automation project. Expertise in n8n and API integration was crucial to our success.",                       author: "David Rodriguez",role: "CTO",            company: "AutomatePro",                             rating: 5, type: 'collaborator' },
  { id: '6', content: "Official technology training partner. Our joint workshops have delivered great value to the community.",                                            author: "Digital Academy",role: "Collaborator",  company: "Digital Academy Network",                 rating: 5, type: 'collaborator' },
  { id: '10', content: "Our collaboration has strengthened Pakistan's trade sector by providing digital skills training to exporters.",                                    author: "TDA Pakistan",  role: "Collaborator",   company: "Trade Development Authority of Pakistan",  rating: 5, type: 'collaborator' },
];

type TabKey = 'testimonial' | 'partner' | 'collaborator';

const TABS: { key: TabKey; label: string; icon: typeof Star }[] = [
  { key: 'testimonial',  label: 'Client Reviews', icon: Quote },
  { key: 'partner',      label: 'Partners',       icon: Handshake },
  { key: 'collaborator', label: 'Collaborators',  icon: Users },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < n ? 'text-[#F59E0B] fill-[#F59E0B]' : 'text-white/20'}`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState<TabKey>('testimonial');

  const filtered = useMemo(
    () => mockTestimonials.filter((t) => t.type === active),
    [active]
  );

  return (
    <section id="testimonials" className="relative py-24 overflow-hidden bg-[#0E1426]">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <SectionHeading
            eyebrow="Social Proof"
            heading="Trusted by Clients & Partners"
            subtext="Hear from the organisations and individuals we've worked with around the world."
          />
        </motion.div>

        {/* Tab pills */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex gap-1 p-1 rounded-[14px] bg-white/6 border border-white/10 backdrop-blur-md">
            {TABS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={[
                  'inline-flex items-center gap-2 px-4 py-2 rounded-[10px] text-sm font-medium transition-all duration-[280ms]',
                  active === key
                    ? 'bg-gradient-to-r from-[#EF7E2E] to-[#F5A623] text-white shadow-[0_0_20px_rgba(239,126,46,0.25)]'
                    : 'text-[#8892A4] hover:text-[#F1F5FF] hover:bg-white/6',
                ].join(' ')}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <GlassCard hover className="h-full flex flex-col gap-4">
                {/* Stars */}
                <Stars n={t.rating} />

                {/* Quote */}
                <p className="text-[#8892A4] text-sm leading-relaxed flex-1">
                  &ldquo;{t.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-3 border-t border-white/8">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#EF7E2E] to-[#F5A623] flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[#F1F5FF] text-sm font-semibold">{t.author}</p>
                    <p className="text-[#8892A4] text-xs">{t.role} · {t.company}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
