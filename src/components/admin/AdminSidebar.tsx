'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FolderOpen,
  BookOpen,
  GraduationCap,
  Users,
  MessageSquare,
  Star,
  Handshake,
  UserCheck,
  CalendarCheck,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: number;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Content',
    items: [
      { label: 'Projects', href: '/admin/projects', icon: FolderOpen },
      { label: 'Blog Posts', href: '/admin/blogs', icon: BookOpen },
      { label: 'Courses', href: '/admin/courses', icon: GraduationCap },
    ],
  },
  {
    title: 'People',
    items: [
      { label: 'Students', href: '/admin/students', icon: Users },
      { label: 'Team Members', href: '/admin/team', icon: UserCheck },
    ],
  },
  {
    title: 'Engagement',
    items: [
      { label: 'Messages', href: '/admin/messages', icon: MessageSquare },
      { label: 'Testimonials', href: '/admin/testimonials', icon: Star },
      { label: 'Partners', href: '/admin/partners', icon: Handshake },
      { label: 'Registrations', href: '/admin/registrations', icon: CalendarCheck },
    ],
  },
];

interface AdminSidebarProps {
  unreadMessages?: number;
}

export default function AdminSidebar({ unreadMessages = 0 }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
            AD
          </div>
          <div>
            <p className="font-bold text-white text-sm leading-tight">Action Digital</p>
            <p className="text-xs text-white/40">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-6">
        {navGroups.map((group) => (
          <div key={group.title}>
            <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/30">
              {group.title}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href);
                const showBadge = item.href === '/admin/messages' && unreadMessages > 0;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                        active
                          ? 'bg-orange-500/15 text-orange-400 shadow-sm'
                          : 'text-white/55 hover:text-white hover:bg-white/6'
                      }`}
                    >
                      <item.icon
                        size={16}
                        className={active ? 'text-orange-400' : 'text-white/40 group-hover:text-white/70'}
                      />
                      <span className="flex-1">{item.label}</span>
                      {showBadge && (
                        <span className="text-[10px] font-bold bg-orange-500 text-white px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                          {unreadMessages > 99 ? '99+' : unreadMessages}
                        </span>
                      )}
                      {active && <ChevronRight size={12} className="text-orange-400/60" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/10">
        <div className="px-3 py-2 mb-2 rounded-xl bg-white/4">
          <p className="text-xs font-medium text-white/70">Administrator</p>
          <p className="text-[11px] text-white/35 truncate">admin@actiondigital.com</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
        >
          <LogOut size={15} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 min-h-screen bg-[#0a0f1e] border-r border-white/8">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-[#0a0f1e]/95 backdrop-blur border-b border-white/10 flex items-center justify-between px-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-xs">
            AD
          </div>
          <span className="font-bold text-white text-sm">Admin Panel</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-white/60 hover:text-white"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-[#0a0f1e] border-r border-white/10 flex flex-col pt-14">
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}
