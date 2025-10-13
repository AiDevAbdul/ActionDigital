'use client';

import { motion } from 'framer-motion';
import { Post } from '@/data/blogData';
import BlogPostContent from '@/components/blog/BlogPostContent';

export default function AnimatedBlogPost({ post }: { post: Post }) {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="pt-24 min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-500"
    >
      <BlogPostContent post={post} />
    </motion.main>
  );
}