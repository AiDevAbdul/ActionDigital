'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FolderOpen,
  BookOpen,
  GraduationCap,
  Users,
  MessageSquare,
  Star,
  Handshake,
  CalendarCheck,
  TrendingUp,
  Clock,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';

interface Stats {
  projects: number;
  blogs: number;
  courses: number;
  students: number;
  unreadMessages: number;
  totalMessages: number;
  sessionRegistrations: number;
  partners: number;
  testimonials: number;
  enrollments: number;
}

interface RecentMessage {
  id: string;
  name: string;
  subject: string;
  createdAt: string;
  read: boolean;
}

interface RecentBlog {
  id: string;
  title: string;
  status: string;
  createdAt: string;
}

interface RecentProject {
  id: string;
  title: string;
  createdAt: string;
}

interface DashboardData {
  stats: Stats;
  recent: {
    messages: RecentMessage[];
    blogs: RecentBlog[];
    projects: RecentProject[];
  };
}

const StatCard = ({
  label,
  value,
  icon: Icon,
  href,
  accent,
  sub,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  href: string;
  accent?: boolean;
  sub?: string;
}) => (
  <Link href={href} className="group block">
    <div className={`rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
      accent
        ? 'bg-orange-500/10 border-orange-500/25 hover:border-orange-500/40'
        : 'bg-white/4 border-white/8 hover:border-white/15 hover:bg-white/6'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
          accent ? 'bg-orange-500/20' : 'bg-white/8'
        }`}>
          <Icon size={18} className={accent ? 'text-orange-400' : 'text-white/60'} />
        </div>
        <ArrowRight size={14} className="text-white/20 group-hover:text-white/50 transition-colors mt-1" />
      </div>
      <p className="text-2xl font-bold text-white mb-0.5">{value.toLocaleString()}</p>
      <p className="text-xs text-white/50">{label}</p>
      {sub && <p className="text-[11px] text-orange-400/80 mt-1">{sub}</p>}
    </div>
  </Link>
);

function timeAgo(dateString: string) {
  const diff = Date.now() - new Date(dateString).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setData(d);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
        <AlertCircle size={18} />
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  const s = data!.stats;
  const r = data!.recent;

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-white/40 mt-1">Welcome back — here&apos;s what&apos;s happening.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        <StatCard label="Projects" value={s.projects} icon={FolderOpen} href="/admin/projects" />
        <StatCard label="Blog Posts" value={s.blogs} icon={BookOpen} href="/admin/blogs" />
        <StatCard label="Courses" value={s.courses} icon={GraduationCap} href="/admin/courses" />
        <StatCard label="Students" value={s.students} icon={Users} href="/admin/students" />
        <StatCard
          label="Messages"
          value={s.totalMessages}
          icon={MessageSquare}
          href="/admin/messages"
          accent={s.unreadMessages > 0}
          sub={s.unreadMessages > 0 ? `${s.unreadMessages} unread` : undefined}
        />
        <StatCard label="Enrollments" value={s.enrollments} icon={TrendingUp} href="/admin/students" />
        <StatCard label="Registrations" value={s.sessionRegistrations} icon={CalendarCheck} href="/admin/registrations" />
        <StatCard label="Partners" value={s.partners} icon={Handshake} href="/admin/partners" />
        <StatCard label="Testimonials" value={s.testimonials} icon={Star} href="/admin/testimonials" />
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent messages */}
        <div className="rounded-2xl bg-white/4 border border-white/8 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Recent Messages</h2>
            <Link href="/admin/messages" className="text-xs text-orange-400 hover:text-orange-300 transition-colors">
              View all
            </Link>
          </div>
          {r.messages.length === 0 ? (
            <p className="text-sm text-white/30 text-center py-4">No messages yet</p>
          ) : (
            <ul className="space-y-3">
              {r.messages.map((msg) => (
                <li key={msg.id} className="flex items-start gap-3">
                  <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${msg.read ? 'bg-white/20' : 'bg-orange-500'}`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-white/80 truncate">{msg.name}</p>
                    <p className="text-[11px] text-white/40 truncate">{msg.subject}</p>
                  </div>
                  <span className="text-[10px] text-white/30 shrink-0 flex items-center gap-1">
                    <Clock size={9} />
                    {timeAgo(msg.createdAt)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent blogs */}
        <div className="rounded-2xl bg-white/4 border border-white/8 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Recent Blog Posts</h2>
            <Link href="/admin/blogs" className="text-xs text-orange-400 hover:text-orange-300 transition-colors">
              View all
            </Link>
          </div>
          {r.blogs.length === 0 ? (
            <p className="text-sm text-white/30 text-center py-4">No blog posts yet</p>
          ) : (
            <ul className="space-y-3">
              {r.blogs.map((blog) => (
                <li key={blog.id} className="flex items-start gap-3">
                  <div className={`mt-1 px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wide shrink-0 ${
                    blog.status === 'PUBLISHED' ? 'bg-green-500/15 text-green-400' : 'bg-white/8 text-white/40'
                  }`}>
                    {blog.status === 'PUBLISHED' ? 'Live' : 'Draft'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-white/70 truncate">{blog.title}</p>
                    <p className="text-[10px] text-white/30">{timeAgo(blog.createdAt)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent projects */}
        <div className="rounded-2xl bg-white/4 border border-white/8 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Recent Projects</h2>
            <Link href="/admin/projects" className="text-xs text-orange-400 hover:text-orange-300 transition-colors">
              View all
            </Link>
          </div>
          {r.projects.length === 0 ? (
            <p className="text-sm text-white/30 text-center py-4">No projects yet</p>
          ) : (
            <ul className="space-y-3">
              {r.projects.map((proj) => (
                <li key={proj.id} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-orange-500/15 flex items-center justify-center shrink-0">
                    <FolderOpen size={13} className="text-orange-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-white/70 truncate">{proj.title}</p>
                    <p className="text-[10px] text-white/30">{timeAgo(proj.createdAt)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-sm font-semibold text-white mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-2">
          {[
            { label: '+ New Blog Post', href: '/admin/blogs/new' },
            { label: '+ New Project', href: '/admin/projects' },
            { label: '+ New Course', href: '/admin/courses/new' },
            { label: '+ New Team Member', href: '/admin/team' },
            { label: 'View Messages', href: '/admin/messages' },
          ].map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="px-4 py-2 rounded-xl text-xs font-medium bg-white/6 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
            >
              {a.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
