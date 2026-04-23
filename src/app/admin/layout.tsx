// src/app/admin/layout.tsx
import { ReactNode } from 'react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface">
      <header className="bg-surface border-b border-default p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
          <div className="text-secondary">
            Welcome, Admin
          </div>
        </div>
      </header>

      <nav className="bg-surface border-b border-default">
        <div className="max-w-7xl mx-auto px-4 flex gap-6">
          <Link
            href="/admin"
            className="py-3 px-2 text-secondary hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors"
          >
            Projects
          </Link>
          <Link
            href="/admin/session-registrations"
            className="py-3 px-2 text-secondary hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors"
          >
            Session Registrations
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4">
        {children}
      </main>
    </div>
  );
}
