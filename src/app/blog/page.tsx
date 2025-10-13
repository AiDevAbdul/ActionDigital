'use client';

import { motion } from 'framer-motion';
import { posts } from '@/data/blogData';
import BlogCard from '@/components/BlogCard';

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.1 },
  },
};

export default function BlogPage() {
  return (
    <main className="pt-24 min-h-screen transition-colors duration-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Insights & Guides
          </p>
          <h1 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold">
            Blog & Tutorials
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My thoughts on the intersection of AI, technology, and digital innovation.
          </p>
        </motion.div>

        {/* Blog Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {posts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </motion.div>
      </div>
    </main>
  );
}
