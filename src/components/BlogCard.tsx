'use client';

import Link from 'next/link';
import { motion } from '@/lib/motion-shim';
import { ArrowRight, Calendar } from 'lucide-react';
import { Post, iconMap } from '@/data/blogData';
import GlassCard from '@/components/ui/GlassCard';
import PillBadge from '@/components/ui/PillBadge';

type BlogCardProps = {
  post: Post;
  index: number;
};

export default function BlogCard({ post, index }: BlogCardProps) {
  const Icon = iconMap[post.iconName];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="h-full"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full group">
        <GlassCard hover padding="p-6" className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            {Icon && (
              <div className="w-10 h-10 rounded-xl bg-[rgba(99,102,241,0.15)] flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-[#6366F1]" />
              </div>
            )}
            <span className="flex items-center gap-1.5 text-xs text-[#8892A4]">
              <Calendar className="w-3 h-3" />
              {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-heading font-semibold text-[#F1F5FF] text-base leading-snug mb-2 group-hover:text-[#EF7E2E] transition-colors duration-200">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-[#8892A4] text-sm leading-relaxed flex-1 mb-4">
            {post.excerpt}
          </p>

          {/* Tags + read link */}
          <div className="flex items-center justify-between pt-3 border-t border-white/8">
            <div className="flex flex-wrap gap-1.5">
              {post.tags.slice(0, 2).map((tag) => (
                <PillBadge key={tag} variant="indigo">#{tag}</PillBadge>
              ))}
            </div>
            <span className="text-xs text-[#EF7E2E] font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-200 shrink-0 ml-2">
              Read <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  );
}
