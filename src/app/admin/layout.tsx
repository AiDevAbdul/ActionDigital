import { ReactNode } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#05070F]">
      <AdminSidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <div className="lg:hidden h-14 shrink-0" />
        <div className="flex-1 p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
