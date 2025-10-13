'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Post, iconMap } from '@/data/blogData';
import { tagStyles } from '@/data/blogData'; // 🔹 Import tag styles

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
      className="group rounded-2xl border border-gray-200 dark:border-emerald-800 bg-white dark:bg-[#111] 
                 p-6 shadow-sm hover:shadow-lg hover:shadow-emerald-100/50 dark:hover:shadow-emerald-900/30 
                 transition-all duration-500 flex flex-col h-full"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="flex justify-between items-start mb-4">
          <Icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400 transition-transform group-hover:scale-110" />
          <span className="text-sm text-gray-500 dark:text-gray-400">{post.date}</span>
        </div>

        <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white 
                       group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
          {post.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">
          {post.excerpt}
        </p>

        <div className="mt-5 flex flex-wrap gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium 
                          ${tagStyles[tag] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'}`}
            >
              #{tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
