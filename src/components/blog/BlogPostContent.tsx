'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { iconMap, tagStyles, Post } from '@/data/blogData';

export default function BlogPostContent({ post }: { post: Post }) {
  const Icon = iconMap[post.iconName];

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <Link
        href="/blog"
        className="text-accent hover:text-[var(--accent-color)]/80 transition-colors text-sm font-medium mb-8 inline-block"
      >
        ← Back to all articles
      </Link>

      {/* Post Header */}
      <motion.header
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10 border-b border-default pb-6 transition-colors duration-300"
      >
        <Icon className="h-10 w-10 text-accent mb-3" />
        <h1 className="text-4xl font-extrabold text-[var(--text-color)] mb-2">
          {post.title}
        </h1>
        <p className="text-lg text-muted">{post.excerpt}</p>
        <p className="text-sm mt-3 text-muted">
          Published: {post.date}
        </p>
      </motion.header>

      {/* Post Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="prose max-w-none text-[var(--text-color)] prose-headings:text-[var(--text-color)] prose-p:text-[var(--text-color)] prose-strong:text-[var(--text-color)] prose-a:text-accent transition-colors duration-300"
      >
        <p className="text-lg leading-relaxed">
          This is the detailed content for <strong>{post.title}</strong>.  
          In production, this would be your Markdown or database content.
        </p>

        <h2 className="text-2xl font-semibold mt-10 text-accent">
          Technical Tags
        </h2>

        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium 
              ${tagStyles?.[tag] ?? 'bg-[var(--card-bg)] text-[var(--text-color)] border border-default'}`}
            >
              #{tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
