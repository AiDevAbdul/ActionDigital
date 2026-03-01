'use client';

import Link from 'next/link';
import { motion } from '@/lib/motion-shim';
import { Post, iconMap, tagStyles } from '@/data/blogData';

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
      className="glass-card card group rounded-xl p-6 transition-all duration-500 flex flex-col h-full hover:shadow-card"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 rounded-lg bg-primary-gradient text-white">
            <Icon className="h-6 w-6" />
          </div>
          <span className="text-sm text-secondary">{post.date}</span>
        </div>

        <h3 className="text-xl font-bold mb-3 text-primary group-hover:text-accent transition-colors duration-300">
          {post.title}
        </h3>

        <p className="text-secondary leading-relaxed flex-grow mb-4">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => {
            // Use the tag-specific styles or default styles if the tag isn't defined
            const tagStyle = tagStyles[tag] || tagStyles['Default'];
            return (
              <span
                key={tag}
                className={`px-2 py-1 text-xs font-medium rounded ${tagStyle}`}
              >
                #{tag}
              </span>
            );
          })}
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
