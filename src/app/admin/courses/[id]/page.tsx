'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { ChevronLeft, Plus, Trash2, GripVertical, ChevronDown, ChevronRight, AlertCircle, Save } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  type: string;
  position: number;
  isFree: boolean;
}

interface Module {
  id: string;
  title: string;
  position: number;
  lessons: Lesson[];
}

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  status: string;
  accessType: string;
  priceCents: number | null;
  currency: string | null;
  modules: Module[];
}

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [addingModule, setAddingModule] = useState(false);
  const [showModuleForm, setShowModuleForm] = useState(false);

  const [addingLesson, setAddingLesson] = useState<string | null>(null);
  const [newLesson, setNewLesson] = useState({ title: '', type: 'TEXT', isFree: false });

  const fetchCourse = async () => {
    try {
      const res = await fetch(`/api/lms/courses/${id}`);
      if (!res.ok) throw new Error('Course not found');
      const data = await res.json();
      setCourse(data);
      setExpandedModules(new Set(data.modules.map((m: Module) => m.id)));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCourse(); }, [id]);

  const toggleModule = (mid: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      next.has(mid) ? next.delete(mid) : next.add(mid);
      return next;
    });
  };

  const addModule = async () => {
    if (!newModuleTitle.trim()) return;
    setAddingModule(true);
    try {
      const res = await fetch('/api/lms/modules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: id, title: newModuleTitle, position: (course?.modules.length ?? 0) + 1 }),
      });
      if (!res.ok) throw new Error('Failed to add module');
      setNewModuleTitle('');
      setShowModuleForm(false);
      await fetchCourse();
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setAddingModule(false);
    }
  };

  const deleteModule = async (mid: string) => {
    if (!confirm('Delete this module and all its lessons?')) return;
    await fetch(`/api/lms/modules/${mid}`, { method: 'DELETE' });
    await fetchCourse();
  };

  const addLesson = async (moduleId: string) => {
    if (!newLesson.title.trim()) return;
    setAddingLesson(moduleId);
    try {
      const mod = course!.modules.find((m) => m.id === moduleId)!;
      const res = await fetch('/api/lms/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId, title: newLesson.title, type: newLesson.type, isFree: newLesson.isFree, position: mod.lessons.length + 1 }),
      });
      if (!res.ok) throw new Error('Failed to add lesson');
      setNewLesson({ title: '', type: 'TEXT', isFree: false });
      await fetchCourse();
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setAddingLesson(null);
    }
  };

  const deleteLesson = async (lid: string) => {
    if (!confirm('Delete this lesson?')) return;
    await fetch(`/api/lms/lessons/${lid}`, { method: 'DELETE' });
    await fetchCourse();
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-7 h-7 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
    </div>
  );

  if (error || !course) return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
      <AlertCircle size={16} /> {error || 'Course not found'}
    </div>
  );

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <Link href="/admin/courses" className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors mb-4">
          <ChevronLeft size={14} /> Back to Courses
        </Link>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">{course.title}</h1>
            <p className="text-sm text-white/40 mt-0.5">{course.modules.length} modules · {totalLessons} lessons</p>
          </div>
          <span className={`px-3 py-1 rounded-xl text-xs font-medium mt-1 ${
            course.status === 'PUBLISHED' ? 'bg-green-500/15 text-green-400' :
            course.status === 'ARCHIVED' ? 'bg-red-500/10 text-red-400/70' :
            'bg-white/8 text-white/40'
          }`}>
            {course.status}
          </span>
        </div>
      </div>

      {/* Course info */}
      <div className="rounded-2xl bg-white/4 border border-white/8 p-5">
        <p className="text-sm text-white/60">{course.description}</p>
        <div className="flex flex-wrap gap-3 mt-3">
          <span className="text-xs text-white/40 bg-white/6 px-3 py-1 rounded-lg">/{course.slug}</span>
          <span className="text-xs text-white/40 bg-white/6 px-3 py-1 rounded-lg">{course.accessType}</span>
          {course.priceCents && (
            <span className="text-xs text-orange-400 bg-orange-500/10 px-3 py-1 rounded-lg">
              {(course.priceCents / 100).toFixed(2)} {course.currency}
            </span>
          )}
        </div>
      </div>

      {/* Curriculum */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-white">Curriculum</h2>
          <button
            onClick={() => setShowModuleForm(!showModuleForm)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/15 border border-orange-500/20 text-orange-400 text-xs hover:bg-orange-500/25 transition-all"
          >
            <Plus size={13} /> Add Module
          </button>
        </div>

        {showModuleForm && (
          <div className="mb-4 flex gap-2">
            <input
              autoFocus
              className="flex-1 bg-white/6 border border-white/10 rounded-xl px-4 py-2 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-orange-500/50 transition-all"
              placeholder="Module title"
              value={newModuleTitle}
              onChange={(e) => setNewModuleTitle(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') addModule(); }}
            />
            <button onClick={addModule} disabled={addingModule} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-sm font-medium transition-all disabled:opacity-50">
              <Save size={14} /> {addingModule ? 'Saving…' : 'Save'}
            </button>
            <button onClick={() => setShowModuleForm(false)} className="px-3 py-2 rounded-xl bg-white/6 text-white/50 text-sm hover:bg-white/10 transition-all">
              Cancel
            </button>
          </div>
        )}

        <div className="space-y-3">
          {course.modules.length === 0 && (
            <div className="text-center py-12 text-white/30 text-sm">No modules yet. Add your first module above.</div>
          )}
          {course.modules.map((mod, mi) => (
            <div key={mod.id} className="rounded-2xl border border-white/8 overflow-hidden">
              {/* Module header */}
              <div
                className="flex items-center gap-3 px-4 py-3 bg-white/4 cursor-pointer hover:bg-white/6 transition-colors"
                onClick={() => toggleModule(mod.id)}
              >
                <GripVertical size={14} className="text-white/20 shrink-0" />
                <span className="text-xs font-semibold text-white/40 shrink-0 w-5">M{mi + 1}</span>
                <span className="flex-1 text-sm font-medium text-white">{mod.title}</span>
                <span className="text-xs text-white/30">{mod.lessons.length} lesson{mod.lessons.length !== 1 ? 's' : ''}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); deleteModule(mod.id); }}
                  className="p-1 rounded-lg text-white/25 hover:text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <Trash2 size={13} />
                </button>
                {expandedModules.has(mod.id) ? <ChevronDown size={14} className="text-white/30" /> : <ChevronRight size={14} className="text-white/30" />}
              </div>

              {/* Lessons */}
              {expandedModules.has(mod.id) && (
                <div className="border-t border-white/6">
                  {mod.lessons.map((lesson, li) => (
                    <div key={lesson.id} className="flex items-center gap-3 px-4 py-2.5 border-b border-white/5 last:border-b-0 hover:bg-white/2 transition-colors group">
                      <GripVertical size={13} className="text-white/15 shrink-0" />
                      <span className="text-[11px] text-white/25 shrink-0 w-5">{li + 1}</span>
                      <span className="flex-1 text-sm text-white/70">{lesson.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/6 text-white/35">{lesson.type}</span>
                      {lesson.isFree && <span className="text-[10px] px-2 py-0.5 rounded-md bg-green-500/10 text-green-400/70">Free preview</span>}
                      <button
                        onClick={() => deleteLesson(lesson.id)}
                        className="p-1 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}

                  {/* Add lesson form */}
                  <div className="px-4 py-3 border-t border-white/5 bg-white/2">
                    <div className="flex gap-2">
                      <input
                        className="flex-1 bg-white/6 border border-white/10 rounded-xl px-3 py-1.5 text-white text-xs placeholder:text-white/25 focus:outline-none focus:border-orange-500/40 transition-all"
                        placeholder="New lesson title…"
                        value={addingLesson === mod.id ? newLesson.title : ''}
                        onChange={(e) => setNewLesson((l) => ({ ...l, title: e.target.value }))}
                        onFocus={() => setAddingLesson(mod.id)}
                        onKeyDown={(e) => { if (e.key === 'Enter') addLesson(mod.id); }}
                      />
                      <select
                        className="bg-white/6 border border-white/10 rounded-xl px-2 py-1.5 text-white text-xs focus:outline-none transition-all"
                        value={newLesson.type}
                        onChange={(e) => setNewLesson((l) => ({ ...l, type: e.target.value }))}
                      >
                        {['TEXT', 'VIDEO', 'PDF', 'QUIZ', 'ASSIGNMENT'].map((t) => (
                          <option key={t} value={t} className="bg-[#0a0f1e]">{t}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => addLesson(mod.id)}
                        disabled={addingLesson === mod.id && !newLesson.title.trim()}
                        className="px-3 py-1.5 rounded-xl bg-orange-500/15 border border-orange-500/20 text-orange-400 text-xs hover:bg-orange-500/25 transition-all disabled:opacity-40"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
