import prisma from '@/lib/db';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import ContactMessagesTable from '@/components/admin/ContactMessagesTable';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Contact Messages - Admin' };

export default async function ContactMessagesPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('adi_admin')?.value;
  if (!token) redirect('/admin/login');

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Contact Messages</h1>
        <p className="text-sm text-white/40 mt-0.5">Submitted via the /contact page</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total', value: messages.length, color: 'text-white' },
          { label: 'Unread', value: unread, color: 'text-orange-400' },
          { label: 'Read', value: messages.length - unread, color: 'text-green-400' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-white/4 border border-white/8 p-4">
            <p className="text-xs text-white/40 mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <ContactMessagesTable messages={messages} />
    </div>
  );
}
