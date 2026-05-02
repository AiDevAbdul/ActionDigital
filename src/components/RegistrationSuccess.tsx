import { motion } from '@/lib/motion-shim';
import { CheckCircle2 } from 'lucide-react';

export default function RegistrationSuccess() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-8 rounded-2xl text-center space-y-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="flex justify-center"
      >
        <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}>
          <CheckCircle2 className="w-10 h-10" style={{ color: '#10B981' }} />
        </div>
      </motion.div>

      <div>
        <h3 className="text-2xl font-bold mb-2" style={{ color: '#F1F5FF', fontFamily: 'Space Grotesk, sans-serif' }}>
          Registration Successful!
        </h3>
        <p style={{ color: '#8892A4' }}>
          You&apos;re all set for the session. Join our groups to receive the Google Meet link.
        </p>
      </div>

      <div className="space-y-3">
        <a
          href="https://chat.whatsapp.com/GuKcrD22NuS3Fm9bkcL6ep"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
          style={{ background: 'rgba(37,211,102,0.15)', border: '1px solid rgba(37,211,102,0.3)', color: '#25D366' }}
        >
          Join WhatsApp Group
        </a>

        <a
          href="https://www.facebook.com/groups/899448225084834"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
          style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', color: '#60A5FA' }}
        >
          Join Facebook Community
        </a>
      </div>

      <div className="p-4 rounded-xl text-sm" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', color: '#8892A4' }}>
        <strong style={{ color: '#A5B4FC' }}>Tip:</strong> Join the WhatsApp group first to get the Google Meet link before the session starts.
      </div>
    </motion.div>
  );
}
