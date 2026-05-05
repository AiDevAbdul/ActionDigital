'use client';

import { useState, useEffect } from 'react';
import { Users, Search, AlertCircle, Mail } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  _count?: { enrollments: number };
}

export default function StudentsAdminPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/lms/students')
      .then((r) => r.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setStudents(d);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Students</h1>
        <p className="text-sm text-white/40 mt-0.5">{students.length} registered students</p>
      </div>

      <div className="relative max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          className="w-full bg-white/6 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-orange-500/40 transition-all"
          placeholder="Search students…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-7 h-7 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 gap-3">
          <Users size={36} className="text-white/15" />
          <p className="text-white/40 text-sm">{search ? 'No students match your search.' : 'No students yet.'}</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-white/8 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/8 bg-white/3">
                <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-white/35">Student</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-white/35 hidden sm:table-cell">Email</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-white/35 hidden md:table-cell">Enrollments</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-white/35 hidden lg:table-cell">Joined</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((student, i) => (
                <tr key={student.id} className={`border-b border-white/5 hover:bg-white/3 transition-colors ${i === filtered.length - 1 ? 'border-b-0' : ''}`}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-orange-500/15 flex items-center justify-center text-orange-400 text-xs font-bold shrink-0">
                        {student.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-white">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 hidden sm:table-cell">
                    <a href={`mailto:${student.email}`} className="flex items-center gap-1.5 text-xs text-white/50 hover:text-orange-400 transition-colors">
                      <Mail size={12} />
                      {student.email}
                    </a>
                  </td>
                  <td className="px-4 py-3.5 hidden md:table-cell">
                    <span className="text-sm text-white/60">{student._count?.enrollments ?? 0}</span>
                  </td>
                  <td className="px-4 py-3.5 hidden lg:table-cell">
                    <span className="text-xs text-white/35">
                      {new Date(student.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
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
