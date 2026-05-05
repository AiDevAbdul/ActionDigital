'use client';

import { useState, useEffect } from 'react';
import ProjectForm from '@/components/admin/ProjectForm';
import ProjectList from '@/components/admin/ProjectList';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link?: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProjectsAdminPage() {
  const [tab, setTab] = useState<'list' | 'add'>('list');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProjects = async () => {
    try {
      setError('');
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error('Failed to load projects');
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error('Invalid payload');
      setProjects(data);
    } catch (e) {
      setProjects([]);
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-sm text-white/40 mt-0.5">{projects.length} project{projects.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => setTab(tab === 'add' ? 'list' : 'add')}
          className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold transition-all"
        >
          {tab === 'add' ? '← Back to List' : '+ New Project'}
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>
      )}

      {tab === 'list' ? (
        loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-7 h-7 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
          </div>
        ) : (
          <ProjectList projects={projects} setProjects={setProjects} refreshProjects={fetchProjects} />
        )
      ) : (
        <ProjectForm
          mode="create"
          onSubmit={() => { fetchProjects(); setTab('list'); }}
        />
      )}
    </div>
  );
}
