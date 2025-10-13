// src/components/Contact.tsx

'use client';

import { motion } from 'framer-motion';
import { Mail, Smartphone, Linkedin } from 'lucide-react';
import Link from 'next/link'; // <-- ADD THIS IMPORT
// ... (rest of the file content)

const contactInfo = [
  { icon: Mail, title: 'Email Address', value: 'wahab.sh.pk@gmail.com', href: 'mailto:wahab.sh.pk@gmail.com' },
  { icon: Smartphone, title: 'Phone/WhatsApp', value: '+92 348 9848136', href: 'tel:+923489848136' },
  { icon: Linkedin, title: 'LinkedIn Profile', value: 'in/abdulpk', href: 'https://linkedin.com/in/abdulpk' },
];

const Contact = () => {
  return (
    <section id="contact" className="py-20 sm:py-32 border-t border-node-green/10 dark:border-node-green/10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-node-green dark:text-node-green">
            Connect with US
          </p>
          <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-node-text-light dark:text-node-text-light sm:text-5xl">
            Get in Touch with techAI.pk
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Contact Information (Left Column) */}
          <div className="lg:w-1/3 space-y-8">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="p-4 rounded-lg bg-[#252525] dark:bg-[#252525] border border-node-green/20 dark:border-node-green/20 hover:border-node-green transition-all duration-300"
              >
                <Link href={item.href} target="_blank" rel="noopener noreferrer">
                  <item.icon className="w-6 h-6 text-node-green dark:text-node-green mb-2" />
                  <h3 className="text-lg font-bold text-node-text-light dark:text-node-text-light">{item.title}</h3>
                  <p className="text-node-text-muted dark:text-node-text-muted text-sm break-words">{item.value}</p>
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* Contact Form (Right Column) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:w-2/3 bg-[#252525] dark:bg-[#252525] p-8 rounded-xl border border-node-green/30 dark:border-node-green/30"
          >
            <form action="#" method="POST" className="space-y-6">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full p-3 rounded-lg bg-node-dark dark:bg-node-dark border border-node-text-muted/30 dark:border-node-text-muted/30 focus:border-node-green focus:ring-1 focus:ring-node-green transition-colors text-node-text-light dark:text-node-text-light" 
                required 
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full p-3 rounded-lg bg-node-dark dark:bg-node-dark border border-node-text-muted/30 dark:border-node-text-muted/30 focus:border-node-green focus:ring-1 focus:ring-node-green transition-colors text-node-text-light dark:text-node-text-light" 
                required 
              />
              <textarea 
                placeholder="Your Message" 
                rows={5} 
                className="w-full p-3 rounded-lg bg-node-dark dark:bg-node-dark border border-node-text-muted/30 dark:border-node-text-muted/30 focus:border-node-green focus:ring-1 focus:ring-node-green transition-colors text-node-text-light dark:text-node-text-light" 
                required 
              />
              
              <motion.button 
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-3 rounded-lg text-lg font-semibold bg-node-green text-node-dark shadow-green-glow transition-all duration-300 hover:bg-node-light-green/90"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;