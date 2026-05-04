'use client';

import Link from 'next/link';
import { motion } from '@/lib/motion-shim';
import { ArrowRight, MapPin, Calendar, Users, Building2 } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import AmbientBlob from '@/components/ui/AmbientBlob';
import { events, categoryColors, type Event } from '@/data/eventsData';

// Pull featured first, then fill to 3 from remaining
const featured = events.filter((e) => e.featured);
const rest     = events.filter((e) => !e.featured);
const preview: Event[] = [...featured, ...rest].slice(0, 3);

const stats = [
  { value: `${events.length}+`,  label: 'Events & Workshops' },
  { value: `${events.reduce((s, e) => s + e.attendees, 0)}+`, label: 'Attendees Reached' },
  { value: '5+',  label: 'Cities Covered' },
  { value: '3+',  label: 'Sectors Served' },
];

const categoryIcons: Record<string, string> = {
  Corporate:  '🏦',
  Government: '🏛️',
  University: '🎓',
  College:    '📚',
  School:     '🏫',
  Community:  '🤝',
  Online:     '💻',
};

export default function EventsStrip() {
  return (
    <section id="events" className="relative py-24 overflow-hidden bg-[#090D1A]">
      <AmbientBlob color="orange" animation="two"   size="w-[500px] h-[500px]" className="-top-20 -right-24"    opacity={0.06} />
      <AmbientBlob color="indigo" animation="three" size="w-[400px] h-[400px]" className="bottom-0 -left-20"   opacity={0.05} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Heading ───────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <SectionHeading
            eyebrow="Community Impact"
            heading="Taking AI Everywhere"
            subtext="From the boardrooms of Bank of Khyber to school classrooms across KPK — we bring free AI education to every sector of society."
          />
        </motion.div>

        {/* ── Stats bar ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-14"
        >
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="text-center py-5 px-3 rounded-2xl border border-white/8 bg-white/3"
            >
              <p className="font-heading font-bold text-[#EF7E2E] text-3xl leading-none mb-1">{value}</p>
              <p className="text-[#8892A4] text-xs leading-snug">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Event cards ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {preview.map((event, i) => {
            const colors = categoryColors[event.category];
            const icon   = categoryIcons[event.category] ?? '📌';

            return (
              <motion.div
                key={event.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <GlassCard hover padding="p-6" className="h-full flex flex-col group">

                  {/* Top row — icon + category badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-white/6 flex items-center justify-center text-2xl select-none">
                      {icon}
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${colors.pill}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                      {event.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-bold text-[#F1F5FF] text-base leading-snug mb-1 group-hover:text-[#EF7E2E] transition-colors duration-200">
                    {event.title}
                  </h3>
                  <p className="text-[#8892A4] text-xs mb-4">{event.subtitle}</p>

                  {/* Meta */}
                  <div className="flex flex-col gap-1.5 text-xs text-[#8892A4] mb-4 flex-1">
                    <span className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 shrink-0 text-[#EF7E2E]" />
                      {event.venue}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-[#EF7E2E]" />
                      {event.city}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 shrink-0 text-[#EF7E2E]" />
                      {new Date(event.date).toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/8">
                    <span className="flex items-center gap-1.5 text-xs text-[#6366F1] font-semibold">
                      <Users className="w-3.5 h-3.5" />
                      {event.attendees}+ attendees
                    </span>
                    <Link
                      href="/events"
                      className="text-xs text-[#EF7E2E] font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-200"
                    >
                      Details <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] text-sm font-semibold text-[#EF7E2E] border border-[rgba(239,126,46,0.40)] hover:bg-[rgba(239,126,46,0.08)] hover:border-[rgba(239,126,46,0.70)] transition-all duration-[280ms]"
          >
            View All Events &amp; Workshops
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
