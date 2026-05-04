'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!token) {
      setErrorMsg('Missing reset token. Please use the link from your email.');
      setStatus('error');
      return;
    }

    if (password !== confirm) {
      setErrorMsg('Passwords do not match');
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || 'Failed to reset password');
      }

      setStatus('success');
      setTimeout(() => router.push('/admin/login'), 2000);
    } catch (err: unknown) {
      setErrorMsg((err as Error)?.message || 'An error occurred');
      setStatus('error');
    }
  };

  if (!token) {
    return (
      <div className="text-center">
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          Invalid reset link. Please request a new one.
        </div>
        <Link href="/admin/forgot-password" className="text-sm text-blue-600 hover:underline">
          Request new link
        </Link>
      </div>
    );
  }

  return (
    <>
      {status === 'success' ? (
        <div className="text-center">
          <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-lg">
            Password reset successfully. Redirecting to login...
          </div>
        </div>
      ) : (
        <>
          {status === 'error' && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{errorMsg}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-secondary mb-2">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="input w-full"
                placeholder="At least 8 characters"
              />
            </div>

            <div className="mb-6">
              <label className="block text-secondary mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                minLength={8}
                className="input w-full"
                placeholder="Re-enter your new password"
              />
            </div>

            <button type="submit" disabled={status === 'loading'} className="btn w-full">
              {status === 'loading' ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/admin/login" className="text-sm text-secondary hover:text-primary">
              Back to login
            </Link>
          </div>
        </>
      )}
    </>
  );
}

export default function ResetPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <div className="w-full max-w-md bg-card rounded-xl shadow-card p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Reset Password</h1>
          <p className="text-secondary">Enter your new admin password below.</p>
        </div>
        <Suspense fallback={<div className="text-center text-secondary">Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
