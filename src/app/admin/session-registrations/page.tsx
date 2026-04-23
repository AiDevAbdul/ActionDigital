import prisma from '@/lib/db';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import SessionRegistrationsTable from '@/components/admin/SessionRegistrationsTable';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Session Registrations - Admin',
};

export default async function SessionRegistrationsPage() {
  // Check if user is authenticated
  const cookieStore = await cookies();
  const token = cookieStore.get('adi_admin')?.value;

  if (!token) {
    redirect('/admin/login');
  }

  // Fetch all registrations
  const registrations = await prisma.sessionRegistration.findMany({
    orderBy: { registeredAt: 'desc' },
  });

  const stats = {
    total: registrations.length,
    beginner: registrations.filter((r) => r.experience === 'beginner').length,
    someExperience: registrations.filter((r) => r.experience === 'some-experience').length,
    experienced: registrations.filter((r) => r.experience === 'experienced').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Session Registrations
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Manage registrations for AI-Driven Development Setup session
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <p className="text-sm text-slate-600 dark:text-slate-400">Total Registrations</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.total}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <p className="text-sm text-slate-600 dark:text-slate-400">Beginners</p>
          <p className="text-3xl font-bold text-blue-600">{stats.beginner}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <p className="text-sm text-slate-600 dark:text-slate-400">Some Experience</p>
          <p className="text-3xl font-bold text-purple-600">{stats.someExperience}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <p className="text-sm text-slate-600 dark:text-slate-400">Experienced</p>
          <p className="text-3xl font-bold text-green-600">{stats.experienced}</p>
        </div>
      </div>

      {/* Registrations Table */}
      <SessionRegistrationsTable registrations={registrations} />
    </div>
  );
}
