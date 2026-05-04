'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from '@/lib/motion-shim';
import { Menu, X, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import AnimatedLogo from '@/components/AnimatedLogo';

type NavLink = { name: string; href: string };

const navLinks: NavLink[] = [
  { name: 'About',    href: '/about' },
  { name: 'Courses',  href: '/courses' },
  { name: 'Pricing',  href: '/pricing' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Events',   href: '/events' },
  { name: 'AI Dev',   href: '/aidev' },
  { name: 'Blog',     href: '/blog' },
  { name: 'Team',     href: '/team' },
  { name: 'FAQ',      href: '/faq' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 140, damping: 22, delay: 0.1 }}
        className={[
          'sticky top-0 z-50 w-full transition-all duration-[280ms]',
          scrolled
            ? 'bg-[rgba(9,13,26,0.92)] backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.35)]'
            : 'bg-[rgba(5,7,15,0.55)] backdrop-blur-md border-b border-white/[0.06]',
        ].join(' ')}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16 md:h-[70px]">

          {/* Logo */}
          <Link href="/" aria-label="Go to homepage">
            <AnimatedLogo />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative px-3 py-2 text-sm font-medium text-[#8892A4] hover:text-[#F1F5FF] transition-colors duration-[280ms] group rounded-lg hover:bg-white/4"
              >
                {link.name}
                <span className="absolute bottom-1 left-3 right-3 h-px bg-[#EF7E2E] scale-x-0 group-hover:scale-x-100 transition-transform duration-[280ms] origin-left rounded-full" />
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-[10px] text-sm font-semibold text-white bg-gradient-to-r from-[#EF7E2E] to-[#F5A623] shadow-[0_0_24px_rgba(239,126,46,0.25)] hover:shadow-[0_0_40px_rgba(239,126,46,0.40)] transition-shadow duration-[280ms] min-h-[40px]"
              >
                <Zap className="w-4 h-4" />
                Get Started
              </Link>
            </motion.div>

            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg text-[#8892A4] hover:text-[#F1F5FF] hover:bg-white/6 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed top-16 inset-x-0 z-40 bg-[rgba(9,13,26,0.96)] backdrop-blur-2xl border-b border-white/8 shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
          >
            <div className="flex flex-col p-4 gap-1 max-w-7xl mx-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-base font-medium text-[#8892A4] hover:text-[#F1F5FF] hover:bg-white/6 transition-all duration-200 min-h-[44px] flex items-center"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-[10px] font-semibold text-white bg-gradient-to-r from-[#EF7E2E] to-[#F5A623] shadow-[0_0_24px_rgba(239,126,46,0.25)] min-h-[44px]"
              >
                <Zap className="w-4 h-4" />
                Get Started
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
