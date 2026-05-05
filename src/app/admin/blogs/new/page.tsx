import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import BlogForm from '@/components/admin/BlogForm';

export default function NewBlogPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/blogs"
          className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors mb-4"
        >
          <ChevronLeft size={14} />
          Back to Blog Posts
        </Link>
        <h1 className="text-2xl font-bold text-white">New Blog Post</h1>
      </div>
      <BlogForm mode="create" />
    </div>
  );
}
