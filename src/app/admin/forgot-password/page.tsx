'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.error || 'Failed to send reset email');
      }

      setStatus('success');
    } catch (err: unknown) {
      setErrorMsg((err as Error)?.message || 'An error occurred');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <div className="w-full max-w-md bg-card rounded-xl shadow-card p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Forgot Password</h1>
          <p className="text-secondary">
            Enter your admin email and we&apos;ll send you a reset link.
          </p>
        </div>

        {status === 'success' ? (
          <div className="text-center">
            <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-lg">
              If that email is registered, a reset link has been sent. Check your inbox.
            </div>
            <Link href="/admin/login" className="text-sm text-blue-600 hover:underline">
              Back to login
            </Link>
          </div>
        ) : (
          <>
            {status === 'error' && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{errorMsg}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
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

              <button type="submit" disabled={status === 'loading'} className="btn w-full">
                {status === 'loading' ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/admin/login" className="text-sm text-secondary hover:text-primary">
                Back to login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
