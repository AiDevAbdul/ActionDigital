'use client';

import Link from 'next/link';
import { motion } from '@/lib/motion-shim';
import { Clock, Users, Star, ArrowRight, BookOpen } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import PillBadge from '@/components/ui/PillBadge';

const courses = [
  {
    id: 'digital-literacy',
    title: 'Digital Literacy & AI Tools',
    description: 'Master essential digital skills and cutting-edge AI tools to thrive in the modern digital landscape.',
    duration: '16 Days',
    level: 'Beginner',
    modules: 16,
    rating: 4.9,
    students: 1250,
    badge: 'Most Popular',
  },
  {
    id: 'python-programming',
    title: 'Python Programming',
    description: 'Learn Python from basics to advanced concepts with hands-on projects and real-world applications.',
    duration: '8 Weeks',
    level: 'Beginner–Intermediate',
    modules: 12,
    rating: 4.8,
    students: 980,
    badge: null,
  },
  {
    id: 'ai-driven-development',
    title: 'AI Driven Development',
    description: 'Build intelligent applications using modern AI tools, machine learning, and automation techniques.',
    duration: '10 Weeks',
    level: 'Intermediate–Advanced',
    modules: 14,
    rating: 4.7,
    students: 750,
    badge: 'New',
  },
];

export default function CoursesSection() {
  return (
    <section id="courses" className="relative py-24 overflow-hidden bg-[#0E1426]">
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
            eyebrow="Digital Institute"
            heading="Featured Courses"
            subtext="Comprehensive courses designed to enhance your digital skills and prepare you for the future."
            accentColor="indigo"
          />
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {courses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassCard hover padding="p-6" className="h-full flex flex-col group">
                {/* Icon + badge row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[rgba(99,102,241,0.15)] flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-[#6366F1]" />
                  </div>
                  {course.badge && (
                    <PillBadge variant={course.badge === 'New' ? 'indigo' : 'orange'}>
                      {course.badge}
                    </PillBadge>
                  )}
                </div>

                {/* Title + desc */}
                <h3 className="font-heading font-semibold text-[#F1F5FF] text-lg leading-snug mb-2 group-hover:text-[#6366F1] transition-colors duration-200">
                  {course.title}
                </h3>
                <p className="text-[#8892A4] text-sm leading-relaxed flex-1 mb-4">
                  {course.description}
                </p>

                {/* Level pill */}
                <PillBadge variant="glass" className="mb-4 self-start">{course.level}</PillBadge>

                {/* Stats row */}
                <div className="flex items-center gap-4 text-xs text-[#8892A4] mb-5 pt-3 border-t border-white/8">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> {course.modules} modules
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" /> {course.students.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1 ml-auto text-[#F59E0B]">
                    <Star className="w-3 h-3 fill-[#F59E0B]" /> {course.rating}
                  </span>
                </div>

                {/* CTA */}
                <Link
                  href={`/courses/${course.id}`}
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-[10px] text-sm font-semibold text-[#6366F1] border border-[rgba(99,102,241,0.40)] hover:bg-[rgba(99,102,241,0.08)] hover:border-[rgba(99,102,241,0.70)] transition-all duration-[280ms]"
                >
                  View Course <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[12px] font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#818CF8] shadow-[0_0_28px_rgba(99,102,241,0.25)] hover:shadow-[0_0_44px_rgba(99,102,241,0.40)] transition-shadow duration-[280ms]"
          >
            View All Courses <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://wa.me/923189532843"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[12px] text-sm font-semibold text-[#F1F5FF] bg-white/8 border border-white/14 hover:bg-white/12 transition-all duration-[280ms]"
          >
            Contact via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
