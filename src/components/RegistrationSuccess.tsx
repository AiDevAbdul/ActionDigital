import { motion } from '@/lib/motion-shim';
import { CheckCircle } from 'lucide-react';

export default function RegistrationSuccess() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6 bg-white dark:bg-slate-900 p-8 rounded-lg shadow-lg text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center"
      >
        <CheckCircle className="w-16 h-16 text-green-500" />
      </motion.div>

      <div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Registration Successful! 🎉
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          You're all set for the session. Now join our groups to get the Google Meet link.
        </p>
      </div>

      <div className="space-y-3">
        <a
          href="https://chat.whatsapp.com/GuKcrD22NuS3Fm9bkcL6ep"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          📱 Join WhatsApp Group
        </a>

        <a
          href="https://www.facebook.com/groups/899448225084834"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          👥 Join Facebook Community
        </a>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
        <p className="text-sm text-blue-900 dark:text-blue-200">
          <strong>💡 Tip:</strong> Join the WhatsApp group first to get the Google Meet link before the session starts.
        </p>
      </div>
    </motion.div>
  );
}
