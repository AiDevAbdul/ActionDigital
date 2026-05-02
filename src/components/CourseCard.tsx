import Link from 'next/link';
import { ArrowRight, Users, Clock, Star, BookOpen, MessageCircle } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import PillBadge from '@/components/ui/PillBadge';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  modules: number;
  rating: number;
  students: number;
  level?: string;
  badge?: string | null;
}

export default function CourseCard({
  id,
  title,
  description,
  duration,
  modules,
  rating,
  students,
  level,
  badge,
}: CourseCardProps) {
  const progress = Math.min(100, Math.round((modules / 20) * 100));

  return (
    <GlassCard hover padding="p-6" className="h-full flex flex-col group">
      {/* Icon + badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-xl bg-[rgba(99,102,241,0.15)] flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-[#6366F1]" />
        </div>
        {badge && (
          <PillBadge variant={badge === 'New' ? 'indigo' : 'orange'}>{badge}</PillBadge>
        )}
      </div>

      {/* Title + desc */}
      <h3 className="font-heading font-semibold text-[#F1F5FF] text-lg leading-snug mb-2 group-hover:text-[#6366F1] transition-colors duration-200">
        {title}
      </h3>
      <p className="text-[#8892A4] text-sm leading-relaxed flex-1 mb-4">{description}</p>

      {/* Level pill */}
      {level && <PillBadge variant="glass" className="mb-4 self-start">{level}</PillBadge>}

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-[#8892A4]">{modules} modules</span>
          <span className="text-xs text-[#8892A4]">{progress}%</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-white/8">
          <div
            className="h-1.5 rounded-full bg-gradient-to-r from-[#6366F1] to-[#818CF8]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-4 text-xs text-[#8892A4] mb-5 pt-3 border-t border-white/8">
        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {duration}</span>
        <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {students.toLocaleString()}</span>
        <span className="flex items-center gap-1 ml-auto text-[#F59E0B]">
          <Star className="w-3 h-3 fill-[#F59E0B]" /> {rating}
        </span>
      </div>

      {/* CTAs */}
      <div className="flex gap-3">
        <Link
          href={`/courses/${id}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-[10px] text-sm font-semibold text-[#6366F1] border border-[rgba(99,102,241,0.40)] hover:bg-[rgba(99,102,241,0.08)] hover:border-[rgba(99,102,241,0.70)] transition-all duration-[280ms] min-h-[40px]"
        >
          View <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <a
          href="https://wa.me/923189532843"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-[10px] text-sm font-semibold text-white bg-gradient-to-r from-[#EF7E2E] to-[#F5A623] min-h-[40px] hover:shadow-[0_0_20px_rgba(239,126,46,0.30)] transition-shadow duration-[280ms]"
        >
          <MessageCircle className="w-3.5 h-3.5" /> Enroll
        </a>
      </div>
    </GlassCard>
  );
}
