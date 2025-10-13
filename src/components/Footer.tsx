// src/components/Footer.tsx (CORRECTED)

import Link from 'next/link';

// The Footer component does not need any props (like 'children')
const Footer = () => {
  return (
    <footer className="py-12 border-t border-default bg-surface transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Logo/Domain */}
        <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-xl font-bold text-[var(--text-color)]">techAI.pk</span>
        </Link>
        
        {/* Copyright and Credits */}
        <p className="text-muted text-sm">
          &copy; {new Date().getFullYear()} Abdul Wahab. All rights reserved.
        </p>
        
        {/* Technical Stack Credits */}
        <p className="text-muted text-xs mt-2">
          Built with <span className="text-accent">Next.js</span>, <span className="text-accent">TypeScript</span>, <span className="text-accent">Tailwind CSS V4</span>, and <span className="text-accent">Framer Motion</span>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;