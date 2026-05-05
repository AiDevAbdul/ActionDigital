'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Save } from 'lucide-react';

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

export default function NewCoursePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    status: 'DRAFT',
    accessType: 'FREE',
    priceCents: '',
    currency: 'USD',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setForm((f) => ({ ...f, title, slug: slugify(title) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = {
        title: form.title,
        slug: form.slug,
        description: form.description,
        status: form.status,
        accessType: form.accessType,
        ...(form.accessType === 'PAID' && form.priceCents ? { priceCents: parseInt(form.priceCents) * 100 } : {}),
        currency: form.currency,
      };
      const res = await fetch('/api/lms/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create course');
      router.push(`/admin/courses/${data.id}`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Link href="/admin/courses" className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors mb-4">
          <ChevronLeft size={14} />
          Back to Courses
        </Link>
        <h1 className="text-2xl font-bold text-white">New Course</h1>
      </div>

      {error && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="rounded-2xl bg-white/4 border border-white/8 p-6 space-y-5">
        <div>
          <label className="block text-xs font-medium text-white/50 mb-1.5">Course Title *</label>
          <input required className="w-full bg-white/6 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-orange-500/50 transition-all" placeholder="e.g. Python for Beginners" value={form.title} onChange={handleTitleChange} />
        </div>
        <div>
          <label className="block text-xs font-medium text-white/50 mb-1.5">Slug *</label>
          <input required pattern="^[a-z0-9-]+$" className="w-full bg-white/6 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm font-mono placeholder:text-white/25 focus:outline-none focus:border-orange-500/50 transition-all" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') }))} />
        </div>
        <div>
          <label className="block text-xs font-medium text-white/50 mb-1.5">Description *</label>
          <textarea required rows={4} className="w-full bg-white/6 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-orange-500/50 transition-all resize-none" placeholder="What will students learn?" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-white/50 mb-1.5">Status</label>
            <select className="w-full bg-white/6 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500/50 transition-all" value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}>
              <option value="DRAFT" className="bg-[#0a0f1e]">Draft</option>
              <option value="PUBLISHED" className="bg-[#0a0f1e]">Published</option>
              <option value="ARCHIVED" className="bg-[#0a0f1e]">Archived</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-white/50 mb-1.5">Access Type</label>
            <select className="w-full bg-white/6 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500/50 transition-all" value={form.accessType} onChange={(e) => setForm((f) => ({ ...f, accessType: e.target.value }))}>
              <option value="FREE" className="bg-[#0a0f1e]">Free</option>
              <option value="PAID" className="bg-[#0a0f1e]">Paid</option>
              <option value="SUBSCRIPTION" className="bg-[#0a0f1e]">Subscription</option>
            </select>
          </div>
        </div>
        {form.accessType === 'PAID' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5">Price (USD)</label>
              <input type="number" min="0" step="0.01" className="w-full bg-white/6 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500/50 transition-all" placeholder="29.99" value={form.priceCents} onChange={(e) => setForm((f) => ({ ...f, priceCents: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5">Currency</label>
              <input className="w-full bg-white/6 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500/50 transition-all" value={form.currency} onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value.toUpperCase() }))} maxLength={3} />
            </div>
          </div>
        )}
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold transition-all disabled:opacity-50">
            <Save size={15} />
            {loading ? 'Creating…' : 'Create Course'}
          </button>
          <Link href="/admin/courses" className="px-5 py-2.5 rounded-xl bg-white/6 border border-white/10 text-white/60 text-sm hover:text-white hover:bg-white/10 transition-all">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
