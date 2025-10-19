'use client';

import { motion } from 'framer-motion';
import Image from 'next/image'; // Import the Image component for optimized images

export default function AnimatedLogo() {
  return (
    <motion.div
      // Use Framer Motion for the container's entrance animation
      className="flex items-center justify-center select-none"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Instead of complex text, we use the optimized Image component 
        to load the logo.svg file from the public folder.
      */}
      <Image
        src="/logo.svg"
        alt="Action Digital Institute Logo"
        // Set specific dimensions for the logo
        width={200} // Adjust width as needed for your Navbar size
        height={40} // Adjust height as needed
        priority // Helps load the logo quickly
        className="w-auto h-8 sm:h-10 md:h-12" // Use Tailwind for responsive sizing
      />
    </motion.div>
  );
}