// src/components/BlogCard.tsx

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Post, iconMap } from '@/data/blogData'; 
type BlogCardProps = {
  post: Post;
  index: number;
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const BlogCard = ({ post, index }: BlogCardProps) => {
  const Icon = iconMap[post.iconName];
  
  if (!Icon) return null; 

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      // CRITICAL: Ensure card background is set here (bg-[#252525] or similar)
      className="rounded-xl p-6 bg-[#252525] border border-node-green/30 transform transition-all duration-500 hover:shadow-green-glow flex flex-col h-full"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="flex justify-between items-start mb-4">
          <Icon className="h-8 w-8 text-node-light-green" /> 
          <span className="text-sm text-node-text-muted">{post.date}</span>
        </div>
        
        {/* CRITICAL FIX: Add Title and Excerpt with Text Colors */}
        <h3 className="text-2xl font-bold text-node-text-light transition-colors duration-300 hover:text-node-light-green mb-3">
          {post.title}
        </h3>
        <p className="flex-grow text-node-text-muted text-sm">
          {post.excerpt}
        </p>
        
        {/* Tags Section */}
        <div className="mt-4 flex flex-wrap gap-2 pt-4 border-t border-node-green/10">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-node-green/20 px-3 py-1 text-xs font-medium text-node-text-light/90"
            >
              {tag}
            </span>
          ))}
        </div>
        
      </Link>
    </motion.div>
  );
};

export default BlogCard;