'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Pencil, GraduationCap, AlertCircle, Users } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  accessType: 'FREE' | 'PAID' | 'SUBSCRIPTION';
  priceCents: number | null;
  currency: string | null;
  createdAt: string;
  _count?: { enrollments: number };
}

const statusColor = (s: Course['status']) => ({
  DRAFT: 'bg-white/8 text-white/40',
  PUBLISHED: 'bg-green-500/15 text-green-400',
  ARCHIVED: 'bg-red-500/10 text-red-400/70',
}[s]);

const accessLabel = (a: Course['accessType'], priceCents: number | null, currency: string | null) => {
  if (a === 'FREE') return 'Free';
  if (a === 'PAID' && priceCents) return `${(priceCents / 100).toFixed(2)} ${currency ?? 'USD'}`;
  return a;
};

export default function CoursesAdminPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/lms/courses')
      .then((r) => r.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setCourses(d);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Courses</h1>
          <p className="text-sm text-white/40 mt-0.5">{courses.length} course{courses.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/admin/courses/new"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold transition-all"
        >
          <Plus size={16} />
          New Course
        </Link>
      </div>

      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-7 h-7 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
        </div>
      ) : courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 gap-3">
          <GraduationCap size={36} className="text-white/15" />
          <p className="text-white/40 text-sm">No courses yet.</p>
          <Link href="/admin/courses/new" className="text-orange-400 text-sm hover:text-orange-300 transition-colors">
            Create your first course →
          </Link>
        </div>
      ) : (
        <div className="grid gap-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className="rounded-2xl bg-white/4 border border-white/8 p-5 hover:border-white/15 hover:bg-white/5 transition-all group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center shrink-0">
                    <GraduationCap size={18} className="text-orange-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-white">{course.title}</h3>
                      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-medium ${statusColor(course.status)}`}>
                        {course.status}
                      </span>
                      <span className="px-2 py-0.5 rounded-lg text-[10px] bg-white/6 text-white/40">
                        {accessLabel(course.accessType, course.priceCents, course.currency)}
                      </span>
                    </div>
                    <p className="text-xs text-white/40 mt-1 font-mono">{course.slug}</p>
                    <p className="text-xs text-white/50 mt-1 line-clamp-1">{course.description}</p>
                    {course._count && (
                      <div className="flex items-center gap-1 mt-2 text-[11px] text-white/30">
                        <Users size={11} />
                        {course._count.enrollments} enrolled
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/admin/courses/${course.id}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/6 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 text-xs transition-all"
                  >
                    <Pencil size={12} />
                    Manage
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
