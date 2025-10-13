// src/components/Header.tsx
'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Code, Menu, X, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '@/context/ThemeProvider';

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
  const { theme, toggleTheme } = useTheme();

  // Clean class string: no inline // comments inside
  const headerStyles = `sticky top-0 z-50 w-full backdrop-blur-sm border-b
    bg-white border-gray-300 text-gray-800
    dark:bg-node-dark dark:border-node-green/20 dark:text-node-text-light`;

  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.2 }}
        className={headerStyles}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center space-x-2 group">
            {/* <Code className="text-node-green" /> */}
            <span className="text-xl font-extrabold">
              techAI.<span className="h-6 w-6 text-node-green transition-transform duration-300 group-hover:scale-110">pk</span>
            </span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-node-text-muted hover:text-node-green transition-colors duration-200 text-lg font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-full text-node-green hover:bg-node-green/20 transition-colors"
              aria-label="Toggle Dark/Light Mode"
            >
              {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/#contact"
                className="hidden sm:inline-flex items-center justify-center rounded-lg border border-node-green bg-node-green px-4 py-2 text-sm font-semibold text-node-dark shadow-green-glow transition-all duration-300 hover:bg-node-light-green/90"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Get in Touch
              </Link>
            </motion.div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-node-green hover:bg-node-green/20 transition-colors"
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
            className="md:hidden absolute w-full z-40 overflow-hidden shadow-xl bg-node-dark border-b border-node-green/30"
          >
            <div className="flex flex-col p-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="py-3 px-4 rounded-lg text-lg font-medium transition-colors duration-200 text-node-text-light hover:bg-node-green/10"
                >
                  {link.name}
                </Link>
              ))}

              <Link
                href="/#contact"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center mt-3 rounded-lg bg-node-green px-4 py-3 text-lg font-semibold text-node-dark transition-all duration-300 hover:bg-node-light-green/90 shadow-green-glow"
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
