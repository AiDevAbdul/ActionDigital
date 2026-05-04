'use client';

import { useState, useTransition } from 'react';
import { motion } from '@/lib/motion-shim';
import { Download, Mail, MailOpen, Search, Circle } from 'lucide-react';
import type { ContactMessage } from '@prisma/client';

interface Props {
  messages: ContactMessage[];
}

export default function ContactMessagesTable({ messages: initial }: Props) {
  const [messages, setMessages]   = useState(initial);
  const [search, setSearch]       = useState('');
  const [filter, setFilter]       = useState<'all' | 'unread' | 'read'>('all');
  const [isPending, startTransition] = useTransition();

  const filtered = messages.filter((m) => {
    const q = search.toLowerCase();
    const matchSearch =
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.subject.toLowerCase().includes(q);
    const matchFilter =
      filter === 'all' ||
      (filter === 'unread' && !m.read) ||
      (filter === 'read' && m.read);
    return matchSearch && matchFilter;
  });

  const unreadCount = messages.filter((m) => !m.read).length;

  const toggleRead = (id: string, current: boolean) => {
    startTransition(async () => {
      await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: !current }),
      });
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, read: !current } : m))
      );
    });
  };

  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Subject', 'Message', 'Read', 'Received'];
    const rows = filtered.map((m) => [
      m.name,
      m.email,
      m.subject,
      m.message.replace(/"/g, '""'),
      m.read ? 'Yes' : 'No',
      new Date(m.createdAt).toLocaleString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(new Blob([csv], { type: 'text/csv' })),
      download: `contact-messages-${new Date().toISOString().split('T')[0]}.csv`,
    });
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden"
    >
      {/* Toolbar */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-700 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email or subject…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="all">All messages</option>
            <option value="unread">Unread ({unreadCount})</option>
            <option value="read">Read</option>
          </select>

          {/* Export */}
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 dark:bg-slate-700">
            <tr>
              {['', 'Name', 'Email', 'Subject', 'Message', 'Received', 'Actions'].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {filtered.length > 0 ? (
              filtered.map((msg, i) => (
                <motion.tr
                  key={msg.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className={`transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50 ${!msg.read ? 'bg-blue-50/40 dark:bg-blue-900/10' : ''}`}
                >
                  {/* Unread dot */}
                  <td className="pl-4 pr-2 py-4 w-6">
                    {!msg.read && (
                      <Circle className="w-2 h-2 fill-blue-500 text-blue-500" />
                    )}
                  </td>

                  <td className="px-4 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap">
                    {msg.name}
                  </td>

                  <td className="px-4 py-4 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                    <a href={`mailto:${msg.email}`} className="hover:text-blue-500 transition-colors">
                      {msg.email}
                    </a>
                  </td>

                  <td className="px-4 py-4 text-slate-700 dark:text-slate-300 max-w-[180px] truncate">
                    {msg.subject}
                  </td>

                  <td className="px-4 py-4 text-slate-600 dark:text-slate-400 max-w-[260px]">
                    <p className="line-clamp-2 leading-relaxed">{msg.message}</p>
                  </td>

                  <td className="px-4 py-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {new Date(msg.createdAt).toLocaleDateString('en-PK', {
                      day: 'numeric', month: 'short', year: 'numeric',
                    })}
                    <br />
                    <span className="text-xs">
                      {new Date(msg.createdAt).toLocaleTimeString('en-PK', {
                        hour: '2-digit', minute: '2-digit',
                      })}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <a
                        href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                        title="Reply"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => toggleRead(msg.id, msg.read)}
                        disabled={isPending}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors disabled:opacity-40"
                        title={msg.read ? 'Mark as unread' : 'Mark as read'}
                      >
                        <MailOpen className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                  {search || filter !== 'all' ? 'No messages match your filter.' : 'No messages yet.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-200 dark:border-slate-700">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Showing {filtered.length} of {messages.length} messages &mdash; {unreadCount} unread
        </p>
      </div>
    </motion.div>
  );
}
