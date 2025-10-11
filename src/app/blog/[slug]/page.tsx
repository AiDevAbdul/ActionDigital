// src/app/blog/[slug]/page.tsx

import { posts, iconMap } from '@/data/blogData'; // <-- CRITICAL: Import iconMap
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';

// NOTE: This file is a Server Component, but the final output is dynamic HTML.

// Function to generate static params for all posts (for static generation)
export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Function to generate dynamic metadata for each page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = posts.find((p) => p.slug === params.slug);
  
  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | techAI.pk`,
    description: post.excerpt,
  };
}

const BlogPostPage = ({ params }: { params: { slug: string } }) => {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }
  
  // CRITICAL FIX: Look up the component using the string name (post.iconName)
  // The Post object passed to this Server Component only contains serializable data.
  // We use iconMap to convert the string identifier back into the Lucide Icon component.
  const Icon = iconMap[post.iconName]; 

  if (!Icon) {
    // Fallback if the iconName string in the data file is incorrect
    return notFound(); 
  }

  return (
    <main className="pt-24 min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        
        <Link href="/blog" className="text-node-text-muted hover:text-node-green transition-colors mb-8 inline-block">
            &larr; Back to all articles
        </Link>
        
        {/* Post Header */}
        <header className="mb-10 border-b border-node-green/20 pb-6">
          <Icon className="h-10 w-10 text-node-green mb-3" />
          <h1 className="text-4xl font-extrabold text-node-text-light mb-2">
            {post.title}
          </h1>
          <p className="text-lg text-node-text-muted">{post.excerpt}</p>
          <p className="text-sm mt-3 text-node-text-muted">
            Published: {post.date}
          </p>
        </header>
        
        {/* Post Content */}
        <div className="prose prose-invert max-w-none text-node-text-light">
          <p className="text-lg">
            This is the detailed content for **{post.title}**. 
            In a production application, this content would be fetched from a database or parsed from a Markdown file 
            to create rich, structured articles. The implementation is ready for your detailed write-ups!
          </p>
          <h2 className="text-2xl mt-8 text-node-green">Technical Tags</h2>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center rounded-full bg-node-green/20 px-3 py-1 text-sm font-medium text-node-text-light/90">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogPostPage;