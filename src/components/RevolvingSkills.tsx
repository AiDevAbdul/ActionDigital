'use client';

import { motion } from '@/lib/motion-shim';
import {
  Code2,
  Globe,
  Cpu,
  Braces,
  FileCode,
  Brain,
  Github,
  Linkedin,
  Youtube,
  Network,
  Zap,
  Smartphone,
  Database,
  BarChart3,
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
  { Icon: Zap, color: '#f59e0b' },
  { Icon: Smartphone, color: '#8b5cf6' },
  { Icon: Database, color: '#0ea5e9' },
  { Icon: BarChart3, color: '#8b5cf6' },
];

export default function RevolvingSkills() {
  return (
    <div className="relative w-full h-full">
      {/* Central glowing core */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-orange-500/30 to-orange-400/10 blur-2xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Container with revolving effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
      >
        {/* Revolving icons with enhanced animations */}
        {icons.map(({ Icon, color }, index) => {
          const angle = (index / icons.length) * 2 * Math.PI;
          const radius = 180;
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
                scale: 0,
              }}
              animate={{
                x: [0, 0, initialX],
                y: [0, 0, initialY],
                opacity: [0, 1, 1, 1],
                scale: [0, 1.5, 1, 1],
                rotate: [0, 0, 360],
              }}
              transition={{
                x: { duration: 5, times: [0, 0.2, 1], ease: 'easeInOut', repeat: Infinity, repeatDelay: 5 },
                y: { duration: 5, times: [0, 0.2, 1], ease: 'easeInOut', repeat: Infinity, repeatDelay: 5 },
                opacity: { duration: 5, times: [0, 0.2, 0.25, 1], repeat: Infinity, repeatDelay: 5 },
                scale: { duration: 5, times: [0, 0.2, 0.25, 1], repeat: Infinity, repeatDelay: 5 },
                rotate: { duration: 25, repeat: Infinity, ease: 'linear', delay: index * 0.5 },
              }}
              whileHover={{ scale: 1.6 }}
            >
              <motion.div
                className="relative"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.1 }}
              >
                {/* Glow background */}
                <div
                  className="absolute inset-0 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `radial-gradient(circle, ${color}40, transparent)`,
                    width: '60px',
                    height: '60px',
                    left: '-12px',
                    top: '-12px',
                  }}
                />

                {/* Icon container */}
                <div className="relative z-10 flex items-center justify-center">
                  <Icon
                    size={36}
                    strokeWidth={1.7}
                    style={{
                      color,
                      filter: `drop-shadow(0 0 12px ${color}80) drop-shadow(0 4px 8px rgba(0,0,0,0.3))`,
                    }}
                    className="transition-all duration-300 hover:drop-shadow-lg"
                  />
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
