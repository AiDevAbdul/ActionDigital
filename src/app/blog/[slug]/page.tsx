'use client';

import { motion } from 'framer-motion';
import { posts } from '@/data/blogData';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BlogPostContent from '@/components/blog/BlogPostContent';

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} | techAI.pk`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

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
