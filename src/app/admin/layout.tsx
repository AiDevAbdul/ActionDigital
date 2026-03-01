// src/app/admin/layout.tsx
import { ReactNode } from 'react';

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
      
      <main className="max-w-7xl mx-auto p-4">
        {children}
      </main>
    </div>
  );
}
