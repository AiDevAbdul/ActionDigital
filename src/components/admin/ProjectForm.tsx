// src/components/admin/ProjectForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

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

interface ProjectFormProps {
  onSubmit: () => void;
  mode: 'create' | 'edit';
  initialData?: Project;
}

export default function ProjectForm({ onSubmit, mode, initialData }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tech: [] as string[],
    link: '',
    icon: 'Code'
  });
  const [currentTech, setCurrentTech] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        tech: initialData.tech || [],
        link: initialData.link || '',
        icon: initialData.icon || 'Code'
      });
    }
  }, [mode, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTech = () => {
    if (currentTech.trim() && !formData.tech.includes(currentTech.trim())) {
      setFormData(prev => ({
        ...prev,
        tech: [...prev.tech, currentTech.trim()]
      }));
      setCurrentTech('');
    }
  };

  const handleRemoveTech = (techToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tech: prev.tech.filter(tech => tech !== techToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
      
      if (!token) {
        throw new Error('Not authenticated');
      }

      const response = mode === 'create' 
        ? await fetch('/api/projects', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
          })
        : await fetch(`/api/projects/${initialData!.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
          });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to ${mode} project`);
      }

      onSubmit();
      
      // Reset form for create mode
      if (mode === 'create') {
        setFormData({
          title: '',
          description: '',
          tech: [],
          link: '',
          icon: 'Code'
        });
      }
    } catch (err: unknown) {
      console.error(`Error ${mode}ing project:`, err);
      setError((err as Error)?.message || `Failed to ${mode} project`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface rounded-lg p-6 shadow-card">
      <h2 className="text-2xl font-bold text-primary mb-6">
        {mode === 'create' ? 'Add New Project' : 'Edit Project'}
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-secondary mb-2">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="input w-full"
            placeholder="Project title"
          />
        </div>
        
        <div>
          <label className="block text-secondary mb-2">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="input w-full"
            placeholder="Project description"
          />
        </div>
        
        <div>
          <label className="block text-secondary mb-2">Technologies</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={currentTech}
              onChange={(e) => setCurrentTech(e.target.value)}
              className="input flex-grow"
              placeholder="Add technology"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())}
            />
            <button
              type="button"
              onClick={handleAddTech}
              className="btn bg-green-500 hover:bg-green-600"
            >
              Add
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tech.map((tech, index) => (
              <div 
                key={index} 
                className="flex items-center bg-primary-gradient text-white px-3 py-1 rounded-full text-sm"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => handleRemoveTech(tech)}
                  className="ml-2 text-white hover:text-red-200"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-secondary mb-2">Link</label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="input w-full"
              placeholder="https://example.com"
            />
          </div>
          
          <div>
            <label className="block text-secondary mb-2">Icon</label>
            <select
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              className="input w-full"
            >
              <option value="Code">Code</option>
              <option value="LineChart">Line Chart</option>
              <option value="Cpu">CPU</option>
              <option value="Zap">Zap</option>
              <option value="Bot">Bot</option>
              <option value="BookOpen">Book Open</option>
              <option value="Globe">Globe</option>
              <option value="Terminal">Terminal</option>
              <option value="Brain">Brain</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => {
              setFormData({
                title: '',
                description: '',
                tech: [],
                link: '',
                icon: 'Code'
              });
            }}
            className="btn btn-secondary"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn"
          >
            {loading ? 'Processing...' : mode === 'create' ? 'Create Project' : 'Update Project'}
          </button>
        </div>
      </form>
    </div>
  );
}