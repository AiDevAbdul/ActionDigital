import prisma from '@/lib/db';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import SessionRegistrationsTable from '@/components/admin/SessionRegistrationsTable';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Session Registrations - Admin' };

export default async function RegistrationsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('adi_admin')?.value;
  if (!token) redirect('/admin/login');

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
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Session Registrations</h1>
        <p className="text-sm text-white/40 mt-0.5">AI-Driven Development Setup session</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total', value: stats.total, color: 'text-white' },
          { label: 'Beginners', value: stats.beginner, color: 'text-blue-400' },
          { label: 'Some Experience', value: stats.someExperience, color: 'text-purple-400' },
          { label: 'Experienced', value: stats.experienced, color: 'text-green-400' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-white/4 border border-white/8 p-4">
            <p className="text-xs text-white/40 mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <SessionRegistrationsTable registrations={registrations} />
    </div>
  );
}
