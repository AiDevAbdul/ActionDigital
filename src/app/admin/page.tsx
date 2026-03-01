// src/app/admin/page.tsx
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

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'list' | 'add'>('list');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setError('');
      const response = await fetch('/api/projects');
      if (!response.ok) {
        throw new Error('Failed to load projects');
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('Invalid projects payload');
      }
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
      setError((error as Error)?.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex border-b border-default mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'list'
              ? 'text-accent border-b-2 border-accent'
              : 'text-secondary hover:text-primary'
          }`}
          onClick={() => setActiveTab('list')}
        >
          Manage Projects
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'add'
              ? 'text-accent border-b-2 border-accent'
              : 'text-secondary hover:text-primary'
          }`}
          onClick={() => setActiveTab('add')}
        >
          Add New Project
        </button>
      </div>

      {activeTab === 'list' ? (
        <>
          {error ? (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          ) : null}
          <ProjectList 
            projects={projects} 
            setProjects={setProjects}
            refreshProjects={fetchProjects}
          />
        </>
      ) : (
        <ProjectForm 
          onSubmit={fetchProjects} 
          mode="create"
        />
      )}
    </div>
  );
}
