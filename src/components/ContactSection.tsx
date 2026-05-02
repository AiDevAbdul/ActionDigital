'use client';

import { motion } from '@/lib/motion-shim';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import AmbientBlob from '@/components/ui/AmbientBlob';

const CONTACT_INFO = [
  { icon: Mail,  label: 'Email',        value: 'MD_ADI@OUTLOOK.COM',                href: 'mailto:MD_ADI@OUTLOOK.COM' },
  { icon: Phone, label: 'Phone',        value: '+92 318 9532843',                   href: 'tel:+923189532843' },
  { icon: MapPin,label: 'Address',      value: 'House 98F, Zaryab Colony, Faqirabad No 2, Peshawar, KPK, Pakistan', href: null },
  { icon: Clock, label: 'Office Hours', value: 'Mon–Fri: 9 AM–6 PM · Sat: 10 AM–2 PM · Sun: Closed', href: null },
];

const SOCIAL = [
  { label: 'WhatsApp', href: 'https://wa.me/923189532843',
    icon: () => (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.177-.008-.366-.01-.558-.01-.188 0-.543.025-.83.3-.284.276-.749.75-.749 1.842 0 1.093.792 2.105.916 2.28.124.172 2.14 3.282 5.304 4.551.702.3.99.45.916 1.024-.042.318-.188.418-.51.566-.3.14-.678.218-1.051.22-.373.002-.746-.075-1.078-.15-.347-.078-.744-.225-1.125-.45-.359-.21-.767-.53-1.162-.924-.396-.396-.71-.79-.924-1.162-.225-.381-.372-.778-.45-1.125-.075-.332-.15-.705-.15-1.078 0-.373.078-.746.22-1.078.148-.332.248-.678.566-.916.578-.198.926-.198 1.024-.198.574.074 1.05.767 1.024.916z" />
      </svg>
    ) },
  { label: 'Facebook', href: 'https://facebook.com/ActionDigitalinstitute',
    icon: () => (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
      </svg>
    ) },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/ActionDigitalinstitute',
    icon: () => (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ) },
  { label: 'Instagram', href: 'https://instagram.com/ActionDigitalinstitute',
    icon: () => (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
      </svg>
    ) },
];

const inputCls = [
  'w-full px-4 py-3 rounded-[10px] text-sm text-[#F1F5FF] placeholder-[#8892A4] outline-none',
  'bg-white/6 border border-white/10',
  'focus:border-[rgba(239,126,46,0.60)] focus:ring-2 focus:ring-[rgba(239,126,46,0.12)]',
  'transition-all duration-[280ms]',
].join(' ');

export default function ContactSection() {
  const [form, setForm]           = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess]       = useState(false);
  const [error, setError]           = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await new Promise((r) => setTimeout(r, 1400));
      setSuccess(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 6000);
    } catch {
      setError('Failed to send message. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative bg-[#090D1A] overflow-hidden">
      <AmbientBlob color="orange" animation="one"   size="w-[500px] h-[500px]" className="-top-20 right-0 translate-x-1/3" opacity={0.07} />
      <AmbientBlob color="indigo" animation="three" size="w-[400px] h-[400px]" className="bottom-0 left-0 -translate-x-1/3" opacity={0.07} />

      {/* Hero */}
      <div className="relative py-24 px-4">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <SectionHeading
              eyebrow="Get In Touch"
              heading="Contact Us"
              subtext="Have questions about our programs or services? We'd love to hear from you."
            />
          </motion.div>
        </div>
      </div>

      {/* Split layout */}
      <div className="relative py-10 pb-24 px-4">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-5"
          >
            <GlassCard padding="p-8">
              <h3 className="font-heading font-bold text-[#F1F5FF] text-xl mb-6">Contact Information</h3>
              <div className="flex flex-col gap-6">
                {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[rgba(239,126,46,0.12)] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[#EF7E2E]" />
                    </div>
                    <div>
                      <p className="text-[#F1F5FF] text-sm font-semibold mb-0.5">{label}</p>
                      {href
                        ? <a href={href} className="text-[#8892A4] text-sm hover:text-[#EF7E2E] transition-colors">{value}</a>
                        : <p className="text-[#8892A4] text-sm leading-relaxed">{value}</p>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Social icons */}
            <GlassCard padding="p-6">
              <h4 className="font-heading font-semibold text-[#F1F5FF] text-sm mb-4">Follow Us</h4>
              <div className="flex gap-3 flex-wrap">
                {SOCIAL.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-xl bg-white/6 border border-white/10 flex items-center justify-center text-[#8892A4] hover:text-[#EF7E2E] hover:border-[rgba(239,126,46,0.40)] hover:bg-[rgba(239,126,46,0.08)] transition-all duration-200"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Right — glass form */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <GlassCard strong padding="p-8">
              <h3 className="font-heading font-bold text-[#F1F5FF] text-xl mb-6">Send us a message</h3>

              {success && (
                <div className="flex items-center gap-2 bg-[rgba(16,185,129,0.10)] border border-[rgba(16,185,129,0.30)] text-[#10B981] p-4 rounded-xl mb-5 text-sm">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  Message sent successfully! We&apos;ll get back to you soon.
                </div>
              )}
              {error && (
                <div className="flex items-center gap-2 bg-[rgba(239,68,68,0.10)] border border-[rgba(239,68,68,0.30)] text-[#EF4444] p-4 rounded-xl mb-5 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-[#8892A4] text-xs font-medium mb-1.5">Full Name</label>
                    <input id="name" name="name" type="text" required placeholder="John Doe" value={form.name} onChange={handleChange} className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[#8892A4] text-xs font-medium mb-1.5">Email Address</label>
                    <input id="email" name="email" type="email" required placeholder="john@example.com" value={form.email} onChange={handleChange} className={inputCls} />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-[#8892A4] text-xs font-medium mb-1.5">Subject</label>
                  <input id="subject" name="subject" type="text" required placeholder="How can we help?" value={form.subject} onChange={handleChange} className={inputCls} />
                </div>

                <div>
                  <label htmlFor="message" className="block text-[#8892A4] text-xs font-medium mb-1.5">Message</label>
                  <textarea id="message" name="message" required rows={5} placeholder="Your message here..." value={form.message} onChange={handleChange} className={inputCls + ' resize-none'} />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-[12px] font-semibold text-white bg-gradient-to-r from-[#EF7E2E] to-[#F5A623] shadow-[0_0_28px_rgba(239,126,46,0.25)] hover:shadow-[0_0_44px_rgba(239,126,46,0.40)] transition-all duration-[280ms] disabled:opacity-50 disabled:cursor-not-allowed min-h-[52px]"
                >
                  {submitting
                    ? <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Sending…</>
                    : <><Send className="w-4 h-4" /> Send Message</>
                  }
                </button>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
