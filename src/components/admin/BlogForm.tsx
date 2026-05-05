'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Save, Eye, EyeOff, Plus } from 'lucide-react';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  iconName: string;
  status: 'DRAFT' | 'PUBLISHED';
  publishedAt: string | null;
}

interface BlogFormProps {
  initialData?: BlogPost;
  mode: 'create' | 'edit';
}

const ICON_OPTIONS = ['Code', 'Cpu', 'Zap', 'Bot', 'BookOpen', 'Globe', 'Terminal', 'Brain', 'Smartphone', 'BarChart3'];

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export default function BlogForm({ initialData, mode }: BlogFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    slug: initialData?.slug ?? '',
    title: initialData?.title ?? '',
    excerpt: initialData?.excerpt ?? '',
    content: initialData?.content ?? '',
    tags: initialData?.tags ?? [] as string[],
    iconName: initialData?.iconName ?? 'Code',
    status: initialData?.status ?? 'DRAFT' as 'DRAFT' | 'PUBLISHED',
  });
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (mode === 'create' && form.title && !form.slug) {
      setForm((f) => ({ ...f, slug: slugify(f.title) }));
    }
  }, [form.title, mode, form.slug]);

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !form.tags.includes(tag)) {
      setForm((f) => ({ ...f, tags: [...f.tags, tag] }));
      setTagInput('');
    }
  };

  const removeTag = (t: string) => setForm((f) => ({ ...f, tags: f.tags.filter((x) => x !== t) }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const url = mode === 'create' ? '/api/admin/blogs' : `/api/admin/blogs/${initialData!.id}`;
      const method = mode === 'create' ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save');
      router.push('/admin/blogs');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-5">
          <div>
            <label className="block text-xs font-medium text-white/50 mb-1.5">Title *</label>
            <input
              required
              className="w-full bg-white/6 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-orange-500/50 focus:bg-white/8 transition-all"
              placeholder="Post title"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-white/50 mb-1.5">Slug *</label>
            <input
              required
              pattern="^[a-z0-9-]+$"
              className="w-full bg-white/6 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm font-mono placeholder:text-white/25 focus:outline-none focus:border-orange-500/50 focus:bg-white/8 transition-all"
              placeholder="post-slug"
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') }))}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-white/50 mb-1.5">Excerpt *</label>
            <textarea
              required
              rows={3}
              className="w-full bg-white/6 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-orange-500/50 focus:bg-white/8 transition-all resize-none"
              placeholder="Short description shown in blog listing..."
              value={form.excerpt}
              onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-white/50">Content * (Markdown)</label>
              <button
                type="button"
                onClick={() => setPreview(!preview)}
                className="flex items-center gap-1.5 text-xs text-white/40 hover:text-orange-400 transition-colors"
              >
                {preview ? <EyeOff size={13} /> : <Eye size={13} />}
                {preview ? 'Edit' : 'Preview'}
              </button>
            </div>
            {preview ? (
              <div
                className="w-full min-h-[320px] bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-white/80 text-sm prose prose-invert max-w-none overflow-y-auto"
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {form.content || <span className="text-white/20">Nothing to preview yet…</span>}
              </div>
            ) : (
              <textarea
                required
                rows={14}
                className="w-full bg-white/6 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm font-mono placeholder:text-white/25 focus:outline-none focus:border-orange-500/50 focus:bg-white/8 transition-all resize-y"
                placeholder="# Heading&#10;&#10;Write your post content in Markdown..."
                value={form.content}
                onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              />
            )}
          </div>
        </div>

        {/* Sidebar settings */}
        <div className="space-y-5">
          <div className="rounded-2xl bg-white/4 border border-white/8 p-4 space-y-4">
            <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wide">Settings</h3>

            {/* Status */}
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5">Status</label>
              <div className="flex rounded-xl overflow-hidden border border-white/10">
                {(['DRAFT', 'PUBLISHED'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, status: s }))}
                    className={`flex-1 py-2 text-xs font-medium transition-all ${
                      form.status === s
                        ? s === 'PUBLISHED'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-white/10 text-white'
                        : 'text-white/35 hover:text-white/60'
                    }`}
                  >
                    {s === 'PUBLISHED' ? 'Published' : 'Draft'}
                  </button>
                ))}
              </div>
            </div>

            {/* Icon */}
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5">Icon</label>
              <select
                value={form.iconName}
                onChange={(e) => setForm((f) => ({ ...f, iconName: e.target.value }))}
                className="w-full bg-white/6 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500/50 transition-all"
              >
                {ICON_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#0a0f1e]">{opt}</option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5">Tags</label>
              <div className="flex gap-2 mb-2">
                <input
                  className="flex-1 bg-white/6 border border-white/10 rounded-xl px-3 py-2 text-white text-xs placeholder:text-white/25 focus:outline-none focus:border-orange-500/50 transition-all"
                  placeholder="Add tag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="w-8 h-8 rounded-xl bg-orange-500/15 border border-orange-500/20 text-orange-400 hover:bg-orange-500/25 transition-all flex items-center justify-center"
                >
                  <Plus size={14} />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {form.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-orange-500/10 border border-orange-500/15 text-orange-300 text-[11px]"
                  >
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)}>
                      <X size={10} className="hover:text-red-400 transition-colors" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={15} />
              {loading ? 'Saving…' : mode === 'create' ? 'Create Post' : 'Update Post'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/admin/blogs')}
              className="w-full py-2.5 rounded-xl bg-white/6 border border-white/10 text-white/60 text-sm hover:text-white hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
