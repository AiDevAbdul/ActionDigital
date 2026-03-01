'use client';

import { motion } from '@/lib/motion-shim';

type MotionSectionProps = {
  children: React.ReactNode;
  delay?: number;
  type?: 'fade' | 'slide';
};

export default function MotionSection({ children, delay = 0, type = 'slide' }: MotionSectionProps) {
  if (type === 'fade') {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {children}
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.section>
  );
}
