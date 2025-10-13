// src/components/Header.tsx
'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Code, Menu, X } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';

type NavLink = {
  name: string;
  href: string;
};

const navLinks: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#about' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Blog', href: '/blog' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.2 }}
        className="sticky top-0 z-50 w-full backdrop-blur-sm border-b border-default bg-surface text-[var(--text-color)] transition-colors duration-300"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-xl font-extrabold">
              techAI.<span className="h-6 w-6 text-accent transition-transform duration-300 group-hover:scale-110">pk</span>
            </span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-muted hover:text-accent transition-colors duration-200 text-lg font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/#contact"
                className="btn hidden sm:inline-flex items-center justify-center rounded-lg"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Get in Touch
              </Link>
            </motion.div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-accent hover:bg-[var(--accent-color)]/10 transition-colors"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute w-full z-40 overflow-hidden shadow-xl bg-surface border-b border-default"
          >
            <div className="flex flex-col p-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="py-3 px-4 rounded-lg text-lg font-medium transition-colors duration-200 text-[var(--text-color)] hover:bg-[var(--accent-color)]/10"
                >
                  {link.name}
                </Link>
              ))}

              <Link
                href="/#contact"
                onClick={() => setIsMenuOpen(false)}
                className="btn flex items-center justify-center mt-3"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Get in Touch
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
