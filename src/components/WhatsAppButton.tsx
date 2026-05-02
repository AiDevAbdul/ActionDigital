'use client';

import { motion } from '@/lib/motion-shim';
import Link from 'next/link';

const WHATSAPP_NUMBER  = '+923189532843';
const WHATSAPP_MESSAGE = 'Hello! I came from the ActionDigital website and would like to learn more about your courses and programs.';

export default function WhatsAppButton() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-[0_4px_24px_rgba(37,211,102,0.35)] hover:shadow-[0_4px_32px_rgba(37,211,102,0.55)] hover:scale-110 transition-all duration-[280ms] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
      >
        <motion.svg
          viewBox="0 0 24 24"
          fill="white"
          className="w-7 h-7"
          aria-hidden="true"
          animate={{ rotate: [0, 6, 0], y: [0, -2, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.177-.008-.366-.01-.558-.01-.188 0-.543.025-.83.3-.284.276-.749.75-.749 1.842 0 1.093.792 2.105.916 2.28.124.172 2.14 3.282 5.304 4.551.702.3.99.45.916 1.024-.042.318-.188.418-.51.566-.3.14-.678.218-1.051.22-.373.002-.746-.075-1.078-.15-.347-.078-.744-.225-1.125-.45-.359-.21-.767-.53-1.162-.924-.396-.396-.71-.79-.924-1.162-.225-.381-.372-.778-.45-1.125-.075-.332-.15-.705-.15-1.078 0-.373.078-.746.22-1.078.148-.332.248-.678.566-.916.578-.198.926-.198 1.024-.198.574.074 1.05.767 1.024.916zM12 2C6.477 2 2 6.484 2 12.017c0 1.988.585 3.84 1.588 5.389L2 22l4.73-1.562A9.963 9.963 0 0012 22c5.523 0 10-4.484 10-10S17.523 2 12 2z" />
        </motion.svg>
      </Link>
    </motion.div>
  );
}
