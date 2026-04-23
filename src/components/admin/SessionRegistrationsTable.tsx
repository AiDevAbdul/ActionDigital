'use client';

import { useState } from 'react';
import { motion } from '@/lib/motion-shim';
import { Download, Mail } from 'lucide-react';
import type { SessionRegistration } from '@prisma/client';

interface SessionRegistrationsTableProps {
  registrations: SessionRegistration[];
}

export default function SessionRegistrationsTable({
  registrations,
}: SessionRegistrationsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('all');

  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch =
      reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.phone.includes(searchTerm);

    const matchesExperience =
      experienceFilter === 'all' || reg.experience === experienceFilter;

    return matchesSearch && matchesExperience;
  });

  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Experience', 'Registered At'];
    const rows = filteredRegistrations.map(reg => [
      reg.name,
      reg.email,
      reg.phone,
      reg.experience,
      new Date(reg.registeredAt).toLocaleString(),
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `session-registrations-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleSendEmails = () => {
    const emails = filteredRegistrations.map(reg => reg.email).join(';');
    window.location.href = `mailto:?bcc=${emails}&subject=Session Reminder: AI-Driven Development Setup&body=Hi,%0A%0AThis is a reminder about our upcoming session on Friday, April 24, 2026 at 9:00 PM PKT.%0A%0AJoin our WhatsApp group for the Google Meet link: https://chat.whatsapp.com/GuKcrD22NuS3Fm9bkcL6ep%0A%0ASee you there!`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden"
    >
      {/* Toolbar */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-700 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={experienceFilter}
            onChange={e => setExperienceFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Experience Levels</option>
            <option value="beginner">Beginner</option>
            <option value="some-experience">Some Experience</option>
            <option value="experienced">Experienced</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleSendEmails}
            className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Send Emails</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100 dark:bg-slate-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                Experience
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                Registered
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {filteredRegistrations.length > 0 ? (
              filteredRegistrations.map((reg, idx) => (
                <motion.tr
                  key={reg.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-slate-900 dark:text-white font-medium">
                    {reg.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                    {reg.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                    {reg.phone}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        reg.experience === 'beginner'
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                          : reg.experience === 'some-experience'
                            ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200'
                            : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200'
                      }`}
                    >
                      {reg.experience === 'beginner'
                        ? 'Beginner'
                        : reg.experience === 'some-experience'
                          ? 'Some Experience'
                          : 'Experienced'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                    {new Date(reg.registeredAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-600 dark:text-slate-400">
                  No registrations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-200 dark:border-slate-700">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Showing {filteredRegistrations.length} of {registrations.length} registrations
        </p>
      </div>
    </motion.div>
  );
}
