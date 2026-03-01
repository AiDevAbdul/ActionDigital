'use client';

import { useState } from 'react';
import { motion } from '@/lib/motion-shim';
import { Mail, Smartphone, Linkedin, Github, Facebook, Youtube, Send } from 'lucide-react';
import Link from 'next/link';
import emailjs from '@emailjs/browser';

const socialLinks = [
  { icon: Mail, href: 'mailto:info@actiondigitalinstitute.com', label: 'Email' },
  { icon: Smartphone, href: 'tel:+15551234567', label: 'Phone' },
  { icon: Linkedin, href: 'https://linkedin.com/company/actiondigitalinstitute', label: 'LinkedIn' },
  { icon: Facebook, href: 'https://facebook.com/actiondigitalinstitute', label: 'Facebook' },
  { icon: Youtube, href: 'https://youtube.com/actiondigitalinstitute', label: 'YouTube' },
  { icon: Github, href: 'https://github.com/actiondigitalinstitute', label: 'GitHub' },
];

export default function Contact() {
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setStatus(null);
    const form = e.currentTarget;

    try {
      const result = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      console.log('EmailJS result:', result.text);
      setStatus('✅ Message sent successfully!');
      form.reset();
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus('❌ Failed to send message. Please try again later.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-surface text-center">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">
          Get In Touch
        </p>
        <h2 className="text-3xl font-bold text-[var(--text-color)] mt-2">
          Contact Action Digital Institute
        </h2>
        <p className="text-secondary max-w-2xl mx-auto mt-2">
          Have questions about our programs or services? Reach out to us and our team will get back to you as soon as possible.
        </p>
      </motion.div>

      {/* --- Social Icons --- */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex justify-center flex-wrap gap-6 mb-12"
      >
        {socialLinks.map(({ icon: Icon, href, label }, i) => (
          <Link
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-4 bg-[var(--card-bg)] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            aria-label={label}
          >
            <Icon className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
          </Link>
        ))}
      </motion.div>

      {/* --- Minimal Email Form --- */}
      <motion.form
        onSubmit={sendEmail}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="max-w-xl mx-auto bg-[var(--card-bg)] p-6 rounded-2xl shadow-lg space-y-4"
      >
        <input
          name="user_name"
          type="text"
          placeholder="Full Name"
          required
          className="input w-full"
        />
        <input
          name="user_email"
          type="email"
          placeholder="Email Address"
          required
          className="input w-full"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows={4}
          required
          className="input w-full"
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={isSending}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300
            ${isSending
              ? 'bg-gray-400 cursor-not-allowed text-gray-700'
              : 'bg-accent text-white hover:bg-accent-dark shadow-md hover:shadow-lg'
            }`}
        >
          <Send className="w-4 h-4" />
          {isSending ? 'Sending...' : 'Send Message'}
        </motion.button>

        {status && (
          <p
            className={`text-sm mt-2 ${
              status.startsWith('✅') ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {status}
          </p>
        )}
      </motion.form>
    </section>
  );
}
