'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, Calendar, Clock, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

interface RegistrationFormProps {
  onSuccess: () => void;
  /** Render as an inline page section instead of a popup overlay */
  inline?: boolean;
}

const TOOLS = ['Node.js', 'Git', 'GitHub', 'VSCode', 'Claude Code'];

const STATS = [
  { icon: Calendar, label: 'When',     value: '9:00 PM PKT' },
  { icon: Clock,    label: 'Duration', value: '2 Hours'      },
  { icon: Users,    label: 'Format',   value: 'Live Q&A'     },
] as const;

// ── Shared input style ──────────────────────────────────────────────────────
const INPUT_BASE: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: '12px',
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.07)',
  color: '#F1F5FF',
  fontFamily: 'DM Sans, sans-serif',
  colorScheme: 'dark',
};

function focusIn(el: HTMLInputElement | HTMLSelectElement) {
  el.style.borderColor = 'rgba(239,126,46,0.55)';
  el.style.boxShadow  = '0 0 0 3px rgba(239,126,46,0.09)';
}
function focusOut(el: HTMLInputElement | HTMLSelectElement) {
  el.style.borderColor = 'rgba(255,255,255,0.07)';
  el.style.boxShadow  = 'none';
}

function FieldBlock({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block mb-2 text-[11px] font-semibold uppercase tracking-widest"
        style={{ color: '#8892A4' }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

// ── Shared inner card (poster + form) ───────────────────────────────────────
interface CardProps {
  success:    boolean;
  formData:   { name: string; email: string; phone: string; experience: string };
  loading:    boolean;
  error:      string;
  onChange:   (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit:   (e: React.FormEvent) => void;
  onClose?:   () => void;
}

function FormCard({ success, formData, loading, error, onChange, onSubmit, onClose }: CardProps) {
  return (
    <div
      className="relative overflow-hidden rounded-3xl"
      style={{
        background: 'linear-gradient(150deg, #0E1426 0%, #090D1A 100%)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 36px 110px rgba(0,0,0,0.75), 0 0 0 1px rgba(239,126,46,0.05)',
      }}
    >
      {/* Close button (popup only) */}
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 z-20 w-9 h-9 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 hover:bg-white/10"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}
        >
          <X className="w-4 h-4" style={{ color: 'rgba(241,245,255,0.45)' }} />
        </button>
      )}

      {/* Two-panel grid */}
      <div className="grid md:grid-cols-[1fr_1.08fr]">

        {/* ════════════ LEFT — Event Poster ════════════ */}
        <div
          className="relative overflow-hidden flex flex-col justify-between p-8 md:p-10"
          style={{
            background: 'linear-gradient(160deg, #0C1220 0%, #080F1B 100%)',
            borderRight: '1px solid rgba(255,255,255,0.05)',
            minHeight: '320px',
          }}
        >
          {/* Ambient glow orbs */}
          <div
            className="absolute -top-28 -right-28 w-72 h-72 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(239,126,46,0.17) 0%, transparent 68%)' }}
          />
          <div
            className="absolute -bottom-24 -left-24 w-60 h-60 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 68%)' }}
          />

          <div className="relative z-10">
            {/* Badges */}
            <div className="flex items-center gap-2 mb-7">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest"
                style={{ background: 'rgba(239,126,46,0.12)', border: '1px solid rgba(239,126,46,0.28)', color: '#EF7E2E' }}
              >
                <span className="w-1.5 h-1.5 rounded-full pulse-scale" style={{ background: '#EF7E2E' }} />
                Live
              </span>
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest"
                style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.22)', color: '#818CF8' }}
              >
                Free
              </span>
            </div>

            {/* Headline */}
            <h2
              className="text-3xl md:text-[2.6rem] font-black leading-[1.08] mb-3"
              style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#F1F5FF' }}
            >
              AI-Driven<br />
              <span className="shimmer-text">Dev&nbsp;Setup</span>
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: '#8892A4', maxWidth: '26ch' }}>
              Master Node.js, Git, GitHub &amp; Claude Code
              in a single focused 2-hour session.
            </p>

            {/* Tool chips */}
            <div className="flex flex-wrap gap-2">
              {TOOLS.map(tool => (
                <span
                  key={tool}
                  className="px-2.5 py-1 text-[12px] font-medium rounded-lg"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    color: 'rgba(241,245,255,0.6)',
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Stats row */}
          <div
            className="relative z-10 grid grid-cols-3 gap-4 mt-8 pt-6"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            {STATS.map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center">
                <Icon className="w-4 h-4 mx-auto mb-1.5" style={{ color: '#EF7E2E' }} />
                <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: '#8892A4' }}>{label}</p>
                <p className="text-sm font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#F1F5FF' }}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ════════════ RIGHT — Form ════════════ */}
        <div className="flex flex-col justify-center p-8 md:p-10">

          {success ? (
            <div className="flex flex-col items-center justify-center text-center py-10">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}
              >
                <CheckCircle2 className="w-8 h-8" style={{ color: '#10B981' }} />
              </div>
              <h3
                className="text-2xl font-black mb-2"
                style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#F1F5FF' }}
              >
                You&apos;re In!
              </h3>
              <p className="text-sm" style={{ color: '#8892A4' }}>
                Confirmed. Check your email for session details.
              </p>
            </div>

          ) : (
            <>
              <div className="mb-6">
                <h3
                  className="text-xl font-black mb-1"
                  style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#F1F5FF' }}
                >
                  Reserve Your Spot
                </h3>
                <p className="text-sm" style={{ color: '#8892A4' }}>
                  Free &nbsp;·&nbsp; Limited seats &nbsp;·&nbsp; Instant confirmation
                </p>
              </div>

              <form onSubmit={onSubmit} noValidate className="space-y-4">

                <FieldBlock label="Full Name" htmlFor="reg-name">
                  <input
                    id="reg-name" type="text" name="name"
                    value={formData.name} onChange={onChange}
                    required autoComplete="name" placeholder="Your name"
                    style={INPUT_BASE}
                    onFocus={e => focusIn(e.currentTarget)}
                    onBlur={e => focusOut(e.currentTarget)}
                  />
                </FieldBlock>

                <FieldBlock label="Email Address" htmlFor="reg-email">
                  <input
                    id="reg-email" type="email" name="email"
                    value={formData.email} onChange={onChange}
                    required autoComplete="email" placeholder="your@email.com"
                    style={INPUT_BASE}
                    onFocus={e => focusIn(e.currentTarget)}
                    onBlur={e => focusOut(e.currentTarget)}
                  />
                </FieldBlock>

                <FieldBlock label="WhatsApp Number" htmlFor="reg-phone">
                  <input
                    id="reg-phone" type="tel" name="phone"
                    value={formData.phone} onChange={onChange}
                    required autoComplete="tel" placeholder="+92 300 1234567"
                    style={INPUT_BASE}
                    onFocus={e => focusIn(e.currentTarget)}
                    onBlur={e => focusOut(e.currentTarget)}
                  />
                </FieldBlock>

                <FieldBlock label="Experience Level" htmlFor="reg-experience">
                  <select
                    id="reg-experience" name="experience"
                    value={formData.experience} onChange={onChange}
                    style={{ ...INPUT_BASE, cursor: 'pointer', appearance: 'none' }}
                    onFocus={e => focusIn(e.currentTarget)}
                    onBlur={e => focusOut(e.currentTarget)}
                  >
                    <option value="beginner"        style={{ background: '#090D1A' }}>Complete Beginner</option>
                    <option value="some-experience" style={{ background: '#090D1A' }}>Some Experience</option>
                    <option value="experienced"     style={{ background: '#090D1A' }}>Already Experienced</option>
                  </select>
                </FieldBlock>

                {error && (
                  <div
                    role="alert"
                    className="px-4 py-3 rounded-xl text-sm"
                    style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#FCA5A5' }}
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm cursor-pointer transition-all duration-200 glow-pulse"
                  style={{
                    background: loading ? 'rgba(239,126,46,0.35)' : 'linear-gradient(135deg, #EF7E2E 0%, #F5A623 100%)',
                    color: loading ? 'rgba(255,255,255,0.5)' : '#05070F',
                    fontFamily: 'Space Grotesk, sans-serif',
                    letterSpacing: '0.01em',
                  }}
                >
                  {loading ? (
                    <>
                      <span
                        className="w-4 h-4 rounded-full border-2 animate-spin"
                        style={{ borderColor: 'rgba(255,255,255,0.35)', borderTopColor: 'transparent' }}
                      />
                      Registering…
                    </>
                  ) : (
                    <>
                      Secure Your Spot
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center pt-0.5" style={{ color: 'rgba(136,146,164,0.55)' }}>
                  No credit card &nbsp;·&nbsp; 100% free &nbsp;·&nbsp; Instant confirmation
                </p>

              </form>
            </>
          )}
        </div>

      </div>
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────
export default function RegistrationForm({ onSuccess, inline = false }: RegistrationFormProps) {
  const [isOpen,   setIsOpen]   = useState(false);
  const [visible,  setVisible]  = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', experience: 'beginner' });
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');
  const [success,  setSuccess]  = useState(false);
  const [hasShown, setHasShown] = useState(false);

  // Popup only: auto-open after 500 ms (once)
  useEffect(() => {
    if (inline || hasShown) return;
    const t = setTimeout(() => { setIsOpen(true); setHasShown(true); }, 500);
    return () => clearTimeout(t);
  }, [inline, hasShown]);

  // Popup only: drive CSS transition
  useEffect(() => {
    if (inline) return;
    if (!isOpen) { setVisible(false); return; }
    const t = setTimeout(() => setVisible(true), 12);
    return () => clearTimeout(t);
  }, [inline, isOpen]);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(() => setIsOpen(false), 260);
  }, []);

  // Popup only: close on Escape
  useEffect(() => {
    if (inline || !isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [inline, isOpen, handleClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/session-registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Registration failed — please try again.');
      setSuccess(true);
      if (inline) {
        onSuccess();
      } else {
        setTimeout(() => { handleClose(); onSuccess(); }, 2600);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const cardProps: CardProps = { success, formData, loading, error, onChange: handleChange, onSubmit: handleSubmit };

  // ── Inline mode ─────────────────────────────────────────────────────────
  if (inline) {
    return <FormCard {...cardProps} />;
  }

  // ── Popup mode ───────────────────────────────────────────────────────────
  if (!isOpen) return null;

  return (
    <>
      <div
        aria-hidden="true"
        onClick={handleClose}
        className="fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          background: 'rgba(5,7,15,0.88)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          opacity: visible ? 1 : 0,
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          className="w-full max-w-4xl transition-all duration-300"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'scale(1) translateY(0)' : 'scale(0.93) translateY(22px)',
          }}
        >
          <FormCard {...cardProps} onClose={handleClose} />
        </div>
      </div>
    </>
  );
}
