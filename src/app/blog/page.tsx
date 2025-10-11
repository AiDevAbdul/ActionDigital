// src/app/blog/page.tsx

import { posts } from '@/data/blogData';
import BlogCard from '@/components/BlogCard';


// ... (metadata definition)

const BlogPage = () => {
  return (
    <main className="pt-24 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Page Header (This looks correct based on your image) */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-node-green">
            Insights & Guides
          </p>
          <h1 className="mt-2 text-5xl font-extrabold tracking-tight text-node-text-light sm:text-6xl">
            Blog & Tutorials
          </h1>
          <p className="mt-4 text-xl text-node-text-muted max-w-2xl mx-auto">
            My thoughts on the intersection of AI, technology, and career development.
          </p>
        </div>

        {/* Post Grid (THIS IS THE CRITICAL SECTION) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"> 
          {posts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>
        
      </div>
    </main>
  );
};

export default BlogPage;