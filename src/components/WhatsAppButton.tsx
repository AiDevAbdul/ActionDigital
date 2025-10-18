// src/components/WhatsAppButton.tsx
'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

const WhatsAppButton = () => {
  const whatsappNumber = '+923489848136';
  const whatsappMessage = 'Hello! I came from your website and would like to discuss...';

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, ease: 'easeOut' }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact on WhatsApp"
        className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, 0], 
            y: [0, -5, 0] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <MessageCircle 
            size={32} 
            className="text-white p-1" 
            style={{ strokeWidth: '2.5' }} 
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default WhatsAppButton;