import { posts } from '@/data/blogData';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import AnimatedBlogPost from './AnimatedBlogPost';

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} | Action Digital Institute`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <AnimatedBlogPost post={post} />
  );
}
