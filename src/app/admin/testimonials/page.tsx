'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Save, Star, AlertCircle } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  company: string;
  feedback: string;
  rating: number;
  avatar: string | null;
  createdAt: string;
}

const emptyForm = { name: '', company: '', feedback: '', rating: 5, avatar: '' };

const StarRating = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((s) => (
      <button
        key={s}
        type="button"
        onClick={() => onChange(s)}
        className="transition-colors"
      >
        <Star
          size={20}
          className={s <= value ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}
        />
      </button>
    ))}
  </div>
);

export default function TestimonialsAdminPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/client-feedback');
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setItems(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setShowForm(true); };
  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setForm({ name: t.name, company: t.company, feedback: t.feedback, rating: t.rating, avatar: t.avatar ?? '' });
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editing ? `/api/client-feedback/${editing.id}` : '/api/client-feedback';
      const method = editing ? 'PUT' : 'POST';
      const payload = { ...form, avatar: form.avatar || null };
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save');
      setShowForm(false);
      await fetchItems();
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete testimonial from ${name}?`)) return;
    setDeleting(id);
    try {
      await fetch(`/api/client-feedback/${id}`, { method: 'DELETE' });
      setItems((i) => i.filter((x) => x.id !== id));
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Testimonials</h1>
          <p className="text-sm text-white/40 mt-0.5">{items.length} testimonial{items.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold transition-all">
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <form onSubmit={handleSave} className="relative bg-[#0d1425] border border-white/10 rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-semibold text-white">{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
              <button type="button" onClick={() => setShowForm(false)} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/8 transition-all">
                <X size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-white/40 mb-1">Name *</label>
                <input required className="w-full bg-white/6 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500/50 transition-all" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1">Company *</label>
                <input required className="w-full bg-white/6 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500/50 transition-all" value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} />
              </div>
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1">Feedback *</label>
              <textarea required rows={4} className="w-full bg-white/6 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500/50 transition-all resize-none" value={form.feedback} onChange={(e) => setForm((f) => ({ ...f, feedback: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-2">Rating</label>
              <StarRating value={form.rating} onChange={(v) => setForm((f) => ({ ...f, rating: v }))} />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1">Avatar URL (optional)</label>
              <input className="w-full bg-white/6 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500/50 transition-all" placeholder="https://..." value={form.avatar} onChange={(e) => setForm((f) => ({ ...f, avatar: e.target.value }))} />
            </div>
            <div className="flex gap-2 pt-1">
              <button type="submit" disabled={saving} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold transition-all disabled:opacity-50">
                <Save size={14} /> {saving ? 'Saving…' : editing ? 'Update' : 'Add'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-xl bg-white/6 border border-white/10 text-white/60 text-sm hover:bg-white/10 transition-all">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-7 h-7 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 gap-3">
          <Star size={36} className="text-white/15" />
          <p className="text-white/40 text-sm">No testimonials yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl bg-white/4 border border-white/8 p-5 hover:border-white/15 transition-all group">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center shrink-0 overflow-hidden">
                    {item.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-orange-400 font-bold">{item.name.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.name}</p>
                    <p className="text-xs text-white/40">{item.company}</p>
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg text-white/35 hover:text-white hover:bg-white/10 transition-all">
                    <Pencil size={13} />
                  </button>
                  <button onClick={() => handleDelete(item.id, item.name)} disabled={deleting === item.id} className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={12} className={s <= item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/15'} />
                ))}
              </div>
              <p className="text-xs text-white/55 leading-relaxed line-clamp-3">{item.feedback}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
