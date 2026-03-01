// src/components/admin/ProjectList.tsx
'use client';

import { useState } from 'react';
import { Edit3, Trash2, ExternalLink } from 'lucide-react';
import ProjectForm from './ProjectForm';

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

interface ProjectListProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  refreshProjects: () => void;
}

export default function ProjectList({ projects, refreshProjects }: ProjectListProps) {
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete project');
      }

      refreshProjects();
    } catch (err: unknown) {
      console.error('Error deleting project:', err);
      setError((err as Error)?.message || 'Failed to delete project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface rounded-lg p-6 shadow-card">
      <h2 className="text-2xl font-bold text-primary mb-6">Manage Projects</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      {editingProject ? (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-primary">Edit Project</h3>
            <button
              onClick={() => setEditingProject(null)}
              className="text-secondary hover:text-primary"
            >
              Cancel
            </button>
          </div>
          <ProjectForm 
            onSubmit={() => {
              setEditingProject(null);
              refreshProjects();
            }} 
            mode="edit" 
            initialData={editingProject} 
          />
        </div>
      ) : null}
      
      {projects.length === 0 ? (
        <div className="text-center py-12 text-secondary">
          <p>No projects found. Add your first project!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-default text-secondary">
              <tr>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Technologies</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-default hover:bg-default/20">
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-primary">{project.title}</div>
                      <div className="text-sm text-secondary mt-1 line-clamp-2">
                        {project.description}
                      </div>
                      {project.link && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs text-accent mt-2"
                        >
                          View Project <ExternalLink size={12} className="ml-1" />
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech: string, index: number) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-primary-gradient text-white text-xs font-medium rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingProject(project)}
                        className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
                        title="Edit"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        disabled={loading}
                        className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
