'use client';

import { motion } from '@/lib/motion-shim';
import { posts } from '@/data/blogData';
import BlogCard from '@/components/BlogCard';
import AmbientBlob from '@/components/ui/AmbientBlob';

export default function BlogPage() {
  return (
    <main className="relative min-h-screen bg-[#090D1A] overflow-hidden">
      <AmbientBlob color="indigo" animation="one"   size="w-[500px] h-[500px]" className="-top-20 -right-20"   opacity={0.07} />
      <AmbientBlob color="orange" animation="three" size="w-[400px] h-[400px]" className="bottom-0 left-0 -translate-x-1/4" opacity={0.06} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-widest rounded-full border text-[#6366F1] border-[rgba(99,102,241,0.30)] bg-[rgba(99,102,241,0.08)] mb-4">
            Insights &amp; Guides
          </span>
          <h1 className="font-heading font-bold text-[#F1F5FF] mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            Insights &amp; Learning Resources
          </h1>
          <p className="text-[#8892A4] max-w-2xl mx-auto leading-relaxed">
            Tutorials and insights on web development, AI/ML, digital marketing, and emerging technologies.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
