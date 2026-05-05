'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Save, UserCheck, AlertCircle } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  avatar: string | null;
  linkedIn: string | null;
  twitter: string | null;
  position: number;
}

const emptyForm = { name: '', role: '', bio: '', avatar: '', linkedIn: '', twitter: '', position: 0 };

export default function TeamAdminPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchMembers = async () => {
    try {
      const res = await fetch('/api/admin/team');
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMembers(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMembers(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyForm, position: members.length });
    setShowForm(true);
  };

  const openEdit = (m: TeamMember) => {
    setEditing(m);
    setForm({ name: m.name, role: m.role, bio: m.bio ?? '', avatar: m.avatar ?? '', linkedIn: m.linkedIn ?? '', twitter: m.twitter ?? '', position: m.position });
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editing ? `/api/admin/team/${editing.id}` : '/api/admin/team';
      const method = editing ? 'PUT' : 'POST';
      const payload = { ...form, bio: form.bio || null, avatar: form.avatar || null, linkedIn: form.linkedIn || null, twitter: form.twitter || null };
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save');
      setShowForm(false);
      setEditing(null);
      await fetchMembers();
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete ${name}?`)) return;
    setDeleting(id);
    try {
      await fetch(`/api/admin/team/${id}`, { method: 'DELETE' });
      setMembers((m) => m.filter((x) => x.id !== id));
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
          <h1 className="text-2xl font-bold text-white">Team Members</h1>
          <p className="text-sm text-white/40 mt-0.5">{members.length} member{members.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold transition-all">
          <Plus size={16} /> Add Member
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <form onSubmit={handleSave} className="relative bg-[#0d1425] border border-white/10 rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-semibold text-white">{editing ? 'Edit Member' : 'New Team Member'}</h2>
              <button type="button" onClick={() => setShowForm(false)} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/8 transition-all">
                <X size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-white/40 mb-1">Name *</label>
                <input required className="w-full bg-white/6 border border-white/10 rounded-xl px-3 py-2 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-orange-500/50 transition-all" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1">Role *</label>
                <input required className="w-full bg-white/6 border border-white/10 rounded-xl px-3 py-2 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-orange-500/50 transition-all" placeholder="e.g. Lead Developer" value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} />
              </div>
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1">Bio</label>
              <textarea rows={3} className="w-full bg-white/6 border border-white/10 rounded-xl px-3 py-2 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-orange-500/50 transition-all resize-none" value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1">Avatar URL</label>
              <input className="w-full bg-white/6 border border-white/10 rounded-xl px-3 py-2 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-orange-500/50 transition-all" placeholder="https://..." value={form.avatar} onChange={(e) => setForm((f) => ({ ...f, avatar: e.target.value }))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-white/40 mb-1">LinkedIn URL</label>
                <input className="w-full bg-white/6 border border-white/10 rounded-xl px-3 py-2 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-orange-500/50 transition-all" placeholder="https://linkedin.com/in/..." value={form.linkedIn} onChange={(e) => setForm((f) => ({ ...f, linkedIn: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1">Twitter/X Handle</label>
                <input className="w-full bg-white/6 border border-white/10 rounded-xl px-3 py-2 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-orange-500/50 transition-all" placeholder="@username" value={form.twitter} onChange={(e) => setForm((f) => ({ ...f, twitter: e.target.value }))} />
              </div>
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1">Display Order</label>
              <input type="number" min={0} className="w-24 bg-white/6 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500/50 transition-all" value={form.position} onChange={(e) => setForm((f) => ({ ...f, position: parseInt(e.target.value) || 0 }))} />
            </div>
            <div className="flex gap-2 pt-1">
              <button type="submit" disabled={saving} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold transition-all disabled:opacity-50">
                <Save size={14} /> {saving ? 'Saving…' : editing ? 'Update' : 'Create'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-xl bg-white/6 border border-white/10 text-white/60 text-sm hover:bg-white/10 transition-all">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-7 h-7 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
        </div>
      ) : members.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 gap-3">
          <UserCheck size={36} className="text-white/15" />
          <p className="text-white/40 text-sm">No team members yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {members.map((member) => (
            <div key={member.id} className="rounded-2xl bg-white/4 border border-white/8 p-4 hover:border-white/15 transition-all group">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-orange-500/15 flex items-center justify-center shrink-0 overflow-hidden">
                  {member.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-orange-400 font-bold text-base">{member.name.charAt(0)}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{member.name}</p>
                  <p className="text-xs text-orange-400/80 truncate">{member.role}</p>
                  {member.bio && <p className="text-[11px] text-white/35 mt-1 line-clamp-2">{member.bio}</p>}
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-white/6">
                <button onClick={() => openEdit(member)} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/6 text-white/50 hover:text-white hover:bg-white/10 text-xs transition-all">
                  <Pencil size={12} /> Edit
                </button>
                <button onClick={() => handleDelete(member.id, member.name)} disabled={deleting === member.id} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 text-xs transition-all disabled:opacity-50">
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
