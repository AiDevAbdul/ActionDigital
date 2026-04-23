'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from '@/lib/motion-shim';
import { X, Calendar, Clock, Users } from 'lucide-react';
import Link from 'next/link';

export default function SessionBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show banner after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-4 py-4 sm:py-5">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white/20">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-white font-semibold text-sm sm:text-base truncate">
                    🚀 Free Session: AI-Driven Development Setup for Beginners
                  </p>
                  <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm mt-1">
                    <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>April 24, 9:00 PM PKT</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  href="/aidev"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors text-sm sm:text-base whitespace-nowrap"
                >
                  <Users className="h-4 w-4" />
                  <span>Register Now</span>
                </Link>
                <button
                  onClick={() => setIsVisible(false)}
                  className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
                  aria-label="Close banner"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
