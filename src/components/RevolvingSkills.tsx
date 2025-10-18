'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Code2,
  Globe,
  Cpu,
  Braces,
  FileCode,
  Brain,
  Github,
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  Network,
} from 'lucide-react';

const icons = [
  { Icon: Code2, color: '#f59e0b' },
  { Icon: Braces, color: '#2563eb' },
  { Icon: Brain, color: '#a855f7' },
  { Icon: Cpu, color: '#10b981' },
  { Icon: FileCode, color: '#ef4444' },
  { Icon: Network, color: '#f43f5e' },
  { Icon: Globe, color: '#3b82f6' },
  { Icon: Github, color: '#111827' },
  { Icon: Facebook, color: '#2563eb' },
  { Icon: Linkedin, color: '#0a66c2' },
  { Icon: Instagram, color: '#e1306c' },
  { Icon: Youtube, color: '#ff0000' },
];

export default function RevolvingSkills() {
  return (
    <div className="relative w-full h-full">
      {/* Central profile image - perfectly centered with absolute positioning */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-48 h-48 rounded-full overflow-hidden ring-4 ring-[var(--color-accent)] shadow-[var(--shadow-accent)]">
        <Image
          src="/profile.jpg"
          alt="Abdul Wahab"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Container with revolving effect - positioned with the same center point */}
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
      >
        {/* Revolving icons with complex animation */}
        {icons.map(({ Icon, color }, index) => {
          const angle = (index / icons.length) * 2 * Math.PI;
          const radius = 180; // Radius of the circle
          const initialX = Math.round(Math.cos(angle) * radius * 100) / 100;
          const initialY = Math.round(Math.sin(angle) * radius * 100) / 100;

          return (
            <motion.div
              key={index}
              className="absolute"
              initial={{ 
                left: '50%', 
                top: '50%', 
                x: `${initialX}px`, 
                y: `${initialY}px`,
                opacity: 0,
                scale: 0
              }}
              animate={{
                x: [0, 0, initialX], // Move to center, stay, then return to orbit
                y: [0, 0, initialY], // Move to center, stay, then return to orbit
                opacity: [0, 1, 1, 1],
                scale: [0, 1.5, 1, 1],
                rotate: [0, 0, 360],
              }}
              transition={{ 
                x: { duration: 5, times: [0, 0.2, 1], ease: "easeInOut", repeat: Infinity, repeatDelay: 5 },
                y: { duration: 5, times: [0, 0.2, 1], ease: "easeInOut", repeat: Infinity, repeatDelay: 5 },
                opacity: { duration: 5, times: [0, 0.2, 0.25, 1], repeat: Infinity, repeatDelay: 5 },
                scale: { duration: 5, times: [0, 0.2, 0.25, 1], repeat: Infinity, repeatDelay: 5 },
                rotate: { duration: 25, repeat: Infinity, ease: "linear", delay: index * 0.5 },
              }}
              whileHover={{ scale: 1.4 }}
            >
              <Icon
                size={36}
                strokeWidth={1.7}
                style={{
                  color,
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                }}
                className="transition-transform duration-300"
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
