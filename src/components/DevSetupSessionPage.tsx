'use client';

import { useState, useEffect } from 'react';
import { motion } from '@/lib/motion-shim';
import RegistrationForm from '@/components/RegistrationForm';
import RegistrationSuccess from '@/components/RegistrationSuccess';
import { Users, Clock, Calendar, CheckCircle2, HelpCircle } from 'lucide-react';

export default function DevSetupSessionPage() {
  const [registrationCount, setRegistrationCount] = useState(0);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrationCount();
  }, []);

  const fetchRegistrationCount = async () => {
    try {
      const response = await fetch('/api/session-registrations');
      const data = await response.json();
      setRegistrationCount(data.count || 0);
    } catch (error) {
      console.error('Failed to fetch registration count:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegistrationSuccess = () => {
    setIsRegistered(true);
    setRegistrationCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            AI-Driven Development Setup for Beginners
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Start your development journey with expert guidance and community support
          </p>
        </motion.div>

        {/* Session Card with Live Counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-8 mb-12 border-2 border-blue-500"
        >
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Date & Time */}
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Date & Time</p>
                <p className="font-semibold text-slate-900 dark:text-white">
                  Friday, April 24, 2026
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">9:00 PM - 11:00 PM PKT</p>
              </div>
            </div>

            {/* Duration */}
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Duration</p>
                <p className="font-semibold text-slate-900 dark:text-white">2 Hours</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Live Interactive Session</p>
              </div>
            </div>

            {/* Registered Count */}
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Registered</p>
                <p className="font-semibold text-slate-900 dark:text-white text-2xl">
                  {loading ? '...' : registrationCount}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">students joined</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
            <p className="text-blue-900 dark:text-blue-200">
              <strong>📍 Location:</strong> Online via Google Meet (link shared in WhatsApp group)
            </p>
          </div>
        </motion.div>

        {/* Session Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            What You'll Learn
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: '📦', title: 'Node.js Installation', desc: 'Set up Node.js and npm on your machine' },
              { icon: '🔧', title: 'Git Setup', desc: 'Install and configure Git for version control' },
              { icon: '👤', title: 'GitHub Account', desc: 'Create your GitHub account and understand basics' },
              { icon: '💻', title: 'VSCode Setup', desc: 'Install and configure Visual Studio Code' },
              { icon: '🤖', title: 'Claude Code Setup', desc: 'Get Claude Code running for AI-assisted development' },
              { icon: '🚀', title: 'First Steps', desc: 'Write your first code with AI assistance' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.05 }}
                className="flex space-x-4"
              >
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why This Matters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-8 mb-12 text-white"
        >
          <h2 className="text-2xl font-bold mb-4">Why This Session Matters</h2>
          <p className="text-lg mb-4">
            Starting your development journey can feel overwhelming. There are so many tools, so many steps, and it's easy to get stuck.
          </p>
          <p className="text-lg">
            This session removes all the barriers. We'll walk through every installation step together, answer your questions in real-time, and connect you with a supportive community of learners. By the end, you'll have everything set up and ready to start coding with AI assistance.
          </p>
        </motion.div>

        {/* Prerequisites */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            What You Need
          </h2>
          <div className="space-y-3">
            {[
              'A computer (Windows, Mac, or Linux)',
              'Stable internet connection',
              '4GB RAM minimum (8GB recommended)',
              '2GB free disk space',
              'Willingness to learn and ask questions',
            ].map((item, idx) => (
              <div key={idx} className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* About the Instructor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            About the Instructor
          </h2>
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold flex-shrink-0">
              AW
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Abdul Wahab
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-3">
                Academia Incharge, Action Digital Institute (ADI)
              </p>
              <p className="text-slate-700 dark:text-slate-300">
                With years of experience in web development and AI integration, Abdul is passionate about helping beginners start their coding journey. He believes that with the right guidance and tools, anyone can become a developer.
              </p>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center space-x-2">
            <HelpCircle className="w-6 h-6" />
            <span>Frequently Asked Questions</span>
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'Do I need coding experience?',
                a: 'No! This session is designed for complete beginners. We start from scratch.',
              },
              {
                q: 'What if I get stuck during installation?',
                a: 'We\'ll help you in real-time during the session. Plus, you\'ll have access to the community groups for ongoing support.',
              },
              {
                q: 'Can I watch the recording?',
                a: 'Yes! The session will be recorded and shared in the WhatsApp and Facebook groups.',
              },
              {
                q: 'Do I need to install anything before the session?',
                a: 'No, we\'ll do everything together during the session. Just have your computer ready.',
              },
              {
                q: 'Is this session free?',
                a: 'Yes, absolutely free! We believe in making quality education accessible to everyone.',
              },
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + idx * 0.05 }}
                className="border-l-4 border-blue-500 pl-4 py-2"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{faq.q}</h3>
                <p className="text-slate-600 dark:text-slate-400">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Registration Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {!isRegistered ? (
            <RegistrationForm onSuccess={handleRegistrationSuccess} />
          ) : (
            <RegistrationSuccess />
          )}
        </motion.div>

        {/* Footer CTA */}
        {isRegistered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              See you on Friday, April 24 at 9:00 PM PKT! 🚀
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500">
              Questions? Join our Facebook group or WhatsApp community
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
