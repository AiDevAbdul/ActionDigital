'use client';

import Link from 'next/link';
import { motion } from '@/lib/motion-shim';
import { ArrowRight, Calendar } from 'lucide-react';
import { posts } from '@/data/blogData';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import PillBadge from '@/components/ui/PillBadge';
import AmbientBlob from '@/components/ui/AmbientBlob';

const latestPosts = posts.slice(0, 3);

export default function LatestBlogs() {
  return (
    <section id="blog" className="relative py-24 overflow-hidden bg-[#090D1A]">
      <AmbientBlob color="indigo" animation="three" size="w-[500px] h-[500px]" className="-top-20 left-1/2" opacity={0.06} />

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
            eyebrow="Latest Insights"
            heading="From Our Blog"
            subtext="Stay ahead with the latest thinking on tech, AI, and digital growth."
          />
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {latestPosts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassCard hover padding="p-6" className="h-full flex flex-col group">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 2).map((tag: string) => (
                    <PillBadge key={tag} variant="indigo">{tag}</PillBadge>
                  ))}
                </div>

                <h3 className="font-heading font-semibold text-[#F1F5FF] text-base leading-snug mb-2 group-hover:text-[#EF7E2E] transition-colors duration-200">
                  {post.title}
                </h3>
                <p className="text-[#8892A4] text-sm leading-relaxed flex-1 mb-4">
                  {post.excerpt}
                </p>

                {/* Meta + link */}
                <div className="flex items-center justify-between pt-4 border-t border-white/8">
                  <span className="flex items-center gap-1.5 text-xs text-[#8892A4]">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs text-[#EF7E2E] font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all duration-200"
                  >
                    Read <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* View all CTA */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] text-sm font-semibold text-[#EF7E2E] border border-[rgba(239,126,46,0.40)] hover:bg-[rgba(239,126,46,0.08)] hover:border-[rgba(239,126,46,0.70)] transition-all duration-[280ms]"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
