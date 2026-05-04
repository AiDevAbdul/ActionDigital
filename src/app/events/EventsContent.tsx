'use client';

import { useState } from 'react';
import { motion } from '@/lib/motion-shim';
import { MessageCircle, Sparkles, Globe, Users, CalendarDays } from 'lucide-react';
import Link from 'next/link';
import EventCard from '@/components/EventCard';
import SectionHeading from '@/components/ui/SectionHeading';
import AmbientBlob from '@/components/ui/AmbientBlob';
import GlassCard from '@/components/ui/GlassCard';
import { events, upcomingSession, type EventCategory } from '@/data/eventsData';

const ALL = 'All' as const;
type FilterTab = typeof ALL | EventCategory;

const tabs: FilterTab[] = [ALL, 'Corporate', 'Government', 'University', 'College', 'School', 'Online'];

const stats = [
  { icon: CalendarDays, value: `${events.length}+`, label: 'Events Conducted' },
  { icon: Users,        value: `${events.reduce((s, e) => s + e.attendees, 0)}+`, label: 'People Reached' },
  { icon: Globe,        value: '5+',  label: 'Cities Covered' },
  { icon: Sparkles,     value: '100%', label: 'Free Community Sessions' },
];

export default function EventsContent() {
  const [active, setActive] = useState<FilterTab>(ALL);

  const filtered = active === ALL ? events : events.filter((e) => e.category === active);
  const featured = events.filter((e) => e.featured);

  return (
    <main className="relative min-h-screen bg-[#090D1A] overflow-hidden">
      <AmbientBlob color="orange" animation="one"   size="w-[600px] h-[600px]" className="-top-24 -right-24"          opacity={0.07} />
      <AmbientBlob color="indigo" animation="three" size="w-[500px] h-[500px]" className="top-1/2 -left-32"           opacity={0.06} />
      <AmbientBlob color="orange" animation="two"   size="w-[400px] h-[400px]" className="bottom-0 right-0 translate-x-1/3" opacity={0.05} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-16 px-4">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <SectionHeading
              eyebrow="Community Impact"
              heading="Events & Workshops"
              subtext="From bank boardrooms to school classrooms — we take AI education everywhere. Here's a glimpse of the sessions, workshops, and awareness drives we've conducted across Pakistan."
            />
          </motion.div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section className="relative px-4 pb-16">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <GlassCard key={label} padding="p-5" className="text-center">
                <div className="w-10 h-10 rounded-xl bg-[rgba(239,126,46,0.10)] flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-[#EF7E2E]" />
                </div>
                <p className="font-heading font-bold text-[#F1F5FF] text-2xl mb-0.5">{value}</p>
                <p className="text-[#8892A4] text-xs leading-snug">{label}</p>
              </GlassCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Featured events ───────────────────────────────────────────────── */}
      {featured.length > 0 && active === ALL && (
        <section className="relative px-4 pb-16">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="font-heading font-bold text-[#F1F5FF] text-xl flex items-center gap-2">
                <span className="text-[#EF7E2E]">★</span> Featured Events
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featured.map((event, i) => (
                <EventCard key={event.slug} event={event} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Filter tabs + full grid ───────────────────────────────────────── */}
      <section className="relative px-4 pb-24">
        <div className="mx-auto max-w-7xl">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <h2 className="font-heading font-bold text-[#F1F5FF] text-xl">All Events</h2>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActive(tab)}
                  className={[
                    'px-3 py-1.5 rounded-full border text-xs font-semibold transition-all duration-200',
                    active === tab
                      ? 'bg-[rgba(239,126,46,0.15)] border-[rgba(239,126,46,0.50)] text-[#EF7E2E]'
                      : 'bg-white/4 border-white/10 text-[#8892A4] hover:text-[#F1F5FF] hover:border-white/20',
                  ].join(' ')}
                >
                  {tab}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Cards */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((event, i) => (
                <EventCard key={event.slug} event={event} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-[#8892A4]">No events in this category yet.</div>
          )}
        </div>
      </section>

      {/* ── Upcoming free sessions CTA ───────────────────────────────────── */}
      <section className="relative px-4 pb-24">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard strong padding="p-10" glow="orange" className="text-center relative overflow-hidden">
              {/* Decorative glow */}
              <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-[rgba(239,126,46,0.06)] to-transparent pointer-events-none rounded-[inherit]" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[rgba(239,126,46,0.15)] flex items-center justify-center mx-auto mb-5">
                  <Sparkles className="w-7 h-7 text-[#EF7E2E]" />
                </div>

                <h2 className="font-heading font-bold text-[#F1F5FF] text-2xl md:text-3xl mb-3">
                  {upcomingSession.title}
                </h2>
                <p className="text-[#EF7E2E] font-semibold text-sm mb-4">{upcomingSession.date}</p>
                <p className="text-[#8892A4] leading-relaxed max-w-xl mx-auto mb-8">
                  {upcomingSession.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href={upcomingSession.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[12px] font-semibold text-white bg-gradient-to-r from-[#EF7E2E] to-[#F5A623] shadow-[0_0_28px_rgba(239,126,46,0.30)] hover:shadow-[0_0_44px_rgba(239,126,46,0.45)] transition-all duration-[280ms]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Join via WhatsApp
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[12px] font-semibold text-[#F1F5FF] bg-white/6 border border-white/12 hover:bg-white/10 hover:border-white/20 transition-all duration-[280ms]"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
