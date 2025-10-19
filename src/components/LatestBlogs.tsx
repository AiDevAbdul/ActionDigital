// src/components/LatestBlogs.tsx
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

// Get the 3 most recent posts
const latestPosts = posts.slice(0, 3);

export default function LatestBlogs() {
  return (
    <section id="blog" className="section bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Latest Insights
          </p>
          <h2 className="section-title text-primary">
            From Our Blog
          </h2>
          <p className="section-subtitle text-secondary">
            Stay updated with the latest trends in technology and digital education
          </p>
        </motion.div>

        {/* Blog Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {latestPosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <motion.a
            href="/blog"
            className="btn btn-secondary inline-flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Articles
          </motion.a>
        </div>
      </div>
    </section>
  );
}