'use client';

import Image from 'next/image';
import { motion } from '@/lib/motion-shim';
import { MapPin, Calendar, Users, Building2 } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { Event, categoryColors } from '@/data/eventsData';

const categoryIcons: Record<string, string> = {
  Corporate:  '🏦',
  Government: '🏛️',
  University: '🎓',
  College:    '📚',
  School:     '🏫',
  Community:  '🤝',
  Online:     '💻',
};

type EventCardProps = {
  event: Event;
  index: number;
};

export default function EventCard({ event, index }: EventCardProps) {
  const colors = categoryColors[event.category];
  const icon   = categoryIcons[event.category] ?? '📌';

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <GlassCard hover padding="p-0" className="overflow-hidden h-full flex flex-col">

        {/* Photo / Fallback */}
        <div className="relative w-full h-52 shrink-0 overflow-hidden">
          {event.image ? (
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0D1225] via-[#111827] to-[#0D1225]">
              <span className="text-5xl mb-3 select-none" role="img" aria-label={event.category}>{icon}</span>
              <span className="text-[#8892A4] text-xs font-medium tracking-widest uppercase">Photo coming soon</span>
            </div>
          )}

          {/* Category badge overlay */}
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold backdrop-blur-sm ${colors.pill}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
              {event.category}
            </span>
          </div>

          {/* Featured ribbon */}
          {event.featured && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-semibold bg-[rgba(239,126,46,0.20)] border-[rgba(239,126,46,0.50)] text-[#EF7E2E] backdrop-blur-sm">
                ★ Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <p className="text-[#8892A4] text-xs font-medium uppercase tracking-widest mb-1">{event.subtitle}</p>
          <h3 className="font-heading font-bold text-[#F1F5FF] text-lg leading-snug mb-3">{event.title}</h3>

          {/* Meta row */}
          <div className="flex flex-col gap-1.5 mb-4 text-xs text-[#8892A4]">
            <span className="flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 shrink-0 text-[#EF7E2E]" />
              {event.venue}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-[#EF7E2E]" />
              {event.city}
            </span>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 shrink-0 text-[#EF7E2E]" />
                {new Date(event.date).toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#6366F1]" />
                <span className="text-[#6366F1] font-semibold">{event.attendees}+</span>
                <span>attendees</span>
              </span>
            </div>
          </div>

          <p className="text-[#8892A4] text-sm leading-relaxed flex-1 mb-4">{event.description}</p>

          {/* Highlights */}
          <ul className="flex flex-col gap-1.5 mb-4">
            {event.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-xs text-[#8892A4]">
                <span className="mt-0.5 text-[#10B981]">✓</span>
                {h}
              </li>
            ))}
          </ul>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/8">
            {event.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-full bg-white/6 border border-white/10 text-[#8892A4] text-xs">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </GlassCard>
    </motion.article>
  );
}
