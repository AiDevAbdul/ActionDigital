// src/components/Footer.tsx (CORRECTED)

import Link from 'next/link';
import AnimatedLogo from './AnimatedLogo';

// The Footer component does not need any props (like 'children')
const Footer = () => {
  return (
    <footer className="py-12 border-t border-default bg-surface transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Animated Logo */}
          <div className="mb-4 md:mb-0">
            <AnimatedLogo />
          </div>
          
          {/* Navigation Links */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link href="/" className="text-secondary hover:text-accent transition-colors">
              Home
            </Link>
            <Link href="/#about" className="text-secondary hover:text-accent transition-colors">
              About
            </Link>
            <Link href="/#experience" className="text-secondary hover:text-accent transition-colors">
              Experience
            </Link>
            <Link href="/#projects" className="text-secondary hover:text-accent transition-colors">
              Projects
            </Link>
            <Link href="/blog" className="text-secondary hover:text-accent transition-colors">
              Blog
            </Link>
          </div>
          
          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-secondary text-sm">
              &copy; {new Date().getFullYear()} Abdul Wahab. All rights reserved.
            </p>
            <p className="text-secondary text-xs mt-1">
              Crafted with Next.js, TypeScript & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;