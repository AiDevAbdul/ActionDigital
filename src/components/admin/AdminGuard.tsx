// src/components/admin/AdminGuard.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      // Check if admin token exists in session/local storage
      const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
      const expectedToken = process.env.NEXT_PUBLIC_ADMIN_API_KEY;
      
      if (token && token === expectedToken) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-primary text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Redirect happens in useEffect
  }

  return <>{children}</>;
}