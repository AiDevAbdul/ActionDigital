// src/components/Header.tsx

'use client'; 

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Code, Menu } from 'lucide-react'; 

// CORRECTED: Anchor links now start with '/' to force navigation back to the root page (/)
const navLinks = [
  { name: 'Expertise', href: '/#expertise' }, // Fixed path
  { name: 'Projects', href: '/#projects' },   // Fixed path
  { name: 'Experience', href: '/#experience' }, // Fixed path
  { name: 'Blog', href: '/blog' }, 
];

const Header = () => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.2 }}
      className="sticky top-0 z-50 w-full bg-node-dark/95 backdrop-blur-sm border-b border-node-green/20"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4 sm:px-6 lg:px-8">
        
        {/* Logo/Branding: techAI.pk / Abdul Wahab */}
        <Link href="/" className="flex items-center space-x-2 group">
          {/* <Code className="h-6 w-6 text-node-green transition-transform duration-300 group-hover:scale-110" /> */}
          <span className="text-xl font-extrabold text-node-text-light">
            TechAI. <span className="text-node-green">pk</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href} // Uses the corrected absolute path
              className="text-node-text-muted hover:text-node-light-green transition-colors duration-200 text-lg font-medium"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button + CTA Wrapper */}
        <div className="flex items-center space-x-4">
            {/* Mobile Menu Button (Visible only on small screens) */}
            <button className="md:hidden p-2 rounded-lg text-node-green hover:bg-node-green/10 transition-colors">
                <Menu className="w-6 h-6" />
            </button>
            
            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/#contact" // Fixed path for the CTA as well
                className="hidden sm:inline-flex items-center justify-center rounded-lg border border-node-green bg-node-green px-4 py-2 text-sm font-semibold text-node-dark shadow-green-glow transition-all duration-300 hover:bg-node-light-green/90"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Get in Touch
              </Link>
            </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;