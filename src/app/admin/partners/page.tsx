'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Save, Handshake, AlertCircle } from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  logo: string;
  createdAt: string;
}

const emptyForm = { name: '', logo: '' };

export default function PartnersAdminPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Partner | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchPartners = async () => {
    try {
      const res = await fetch('/api/partners');
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setPartners(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPartners(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setShowForm(true); };
  const openEdit = (p: Partner) => { setEditing(p); setForm({ name: p.name, logo: p.logo }); setShowForm(true); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editing ? `/api/partners/${editing.id}` : '/api/partners';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save');
      setShowForm(false);
      await fetchPartners();
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Remove partner "${name}"?`)) return;
    setDeleting(id);
    try {
      await fetch(`/api/partners/${id}`, { method: 'DELETE' });
      setPartners((p) => p.filter((x) => x.id !== id));
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Partners</h1>
          <p className="text-sm text-white/40 mt-0.5">{partners.length} partner{partners.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold transition-all">
          <Plus size={16} /> Add Partner
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
          <form onSubmit={handleSave} className="relative bg-[#0d1425] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-semibold text-white">{editing ? 'Edit Partner' : 'Add Partner'}</h2>
              <button type="button" onClick={() => setShowForm(false)} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/8 transition-all">
                <X size={16} />
              </button>
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1">Partner Name *</label>
              <input required className="w-full bg-white/6 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-orange-500/50 transition-all" placeholder="Company name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1">Logo (emoji or URL) *</label>
              <input required className="w-full bg-white/6 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-orange-500/50 transition-all" placeholder="🚀 or https://..." value={form.logo} onChange={(e) => setForm((f) => ({ ...f, logo: e.target.value }))} />
            </div>
            {form.logo && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/4 border border-white/6">
                <div className="text-2xl">{form.logo.startsWith('http') ? '🖼️' : form.logo}</div>
                <span className="text-sm text-white/60">{form.name || 'Preview'}</span>
              </div>
            )}
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
      ) : partners.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 gap-3">
          <Handshake size={36} className="text-white/15" />
          <p className="text-white/40 text-sm">No partners yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {partners.map((partner) => (
            <div key={partner.id} className="rounded-2xl bg-white/4 border border-white/8 p-4 flex flex-col items-center gap-2 hover:border-white/15 transition-all group">
              <div className="text-3xl">{partner.logo.startsWith('http') ? '🖼️' : partner.logo}</div>
              <p className="text-sm font-medium text-white text-center">{partner.name}</p>
              <div className="flex items-center gap-1.5 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(partner)} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all">
                  <Pencil size={13} />
                </button>
                <button onClick={() => handleDelete(partner.id, partner.name)} disabled={deleting === partner.id} className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
