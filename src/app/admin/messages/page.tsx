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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Contact Messages</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Messages submitted via the /contact page
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <p className="text-sm text-slate-600 dark:text-slate-400">Total</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{messages.length}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <p className="text-sm text-slate-600 dark:text-slate-400">Unread</p>
          <p className="text-3xl font-bold text-blue-600">{unread}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <p className="text-sm text-slate-600 dark:text-slate-400">Read</p>
          <p className="text-3xl font-bold text-green-600">{messages.length - unread}</p>
        </div>
      </div>

      <ContactMessagesTable messages={messages} />
    </div>
  );
}
