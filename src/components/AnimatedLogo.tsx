'use client';

import { motion } from 'framer-motion';

export default function AnimatedLogo() {
  return (
    <motion.div
      className="flex items-center justify-center select-none"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <motion.h1
        className="text-2.5xl sm:text-3xl md:text-3.5xl font-extrabold font-mono"
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <motion.span
          className="text-gray-800 dark:text-gray-200"
          animate={{
            textShadow: [
              '0 0 0px #ccc',
              '0 0 6px #ccc',
              '0 0 0px #ccc',
            ],
          }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        >
          Tech
        </motion.span>
        <motion.span
          className="text-emerald-500 ml-1"
          animate={{
            textShadow: [
              '0 0 5px #10b981',
              '0 0 15px #10b981',
              '0 0 5px #10b981',
            ],
            scale: [1, 1.05, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            ease: 'easeInOut',
          }}
        >
          AI
        </motion.span>
      </motion.h1>
    </motion.div>
  );
}
