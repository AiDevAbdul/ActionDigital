// src/app/admin/login/page.tsx
'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // In a real implementation, you would make an API call to authenticate
      // For this demo, we'll use a simple approach with a hardcoded admin key
      // Check if the provided credentials match the expected admin credentials
      if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        // Store the admin token in session storage (or localStorage)
        // For this demo, we'll use the API key as the "token"
        sessionStorage.setItem('adminToken', process.env.ADMIN_API_KEY || '');
        router.push('/admin');
      } else {
        setError('Invalid email or password');
      }
    } catch (err: unknown) {
      console.error('Login error:', err);
      setError((err as Error)?.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <div className="w-full max-w-md bg-card rounded-xl shadow-card p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Admin Login</h1>
          <p className="text-secondary">Sign in to your admin panel</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-secondary mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input w-full"
              placeholder="admin@example.com"
            />
          </div>

          <div className="mb-6">
            <label className="block text-secondary mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input w-full"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn w-full"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-secondary">
          <p>Note: For demo purposes, use the admin credentials set in environment variables</p>
        </div>
      </div>
    </div>
  );
}