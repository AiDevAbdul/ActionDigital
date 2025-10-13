// src/components/Contact.tsx

'use client';

import { motion } from 'framer-motion';
import { Mail, Smartphone, Linkedin, Send } from 'lucide-react';
import Link from 'next/link';

const contactInfo = [
  { icon: Mail, title: 'Email Address', value: 'wahab.sh.pk@gmail.com', href: 'mailto:wahab.sh.pk@gmail.com' },
  { icon: Smartphone, title: 'Phone/WhatsApp', value: '+92 348 9848136', href: 'tel:+923489848136' },
  { icon: Linkedin, title: 'LinkedIn Profile', value: 'in/abdulpk', href: 'https://linkedin.com/in/abdulpk' },
];

const Contact = () => {
  return (
    <section id="contact" className="section bg-surface">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Connect with Me
          </p>
          <h2 className="section-title text-primary">
            Let's Work Together
          </h2>
          <p className="section-subtitle text-secondary">
            Have a project in mind? Reach out and let's discuss how we can bring your ideas to life.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Contact Information (Left Column) */}
          <div className="lg:w-1/3 space-y-6">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="glass-card card p-6 group hover:shadow-card transition-all duration-300"
              >
                <Link href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-primary-gradient text-white flex-shrink-0">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-1">{item.title}</h3>
                    <p className="text-secondary group-hover:text-accent transition-colors">{item.value}</p>
                  </div>
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
            className="lg:w-2/3"
          >
            <div className="glass-card card p-8">
              <form action="#" method="POST" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-secondary">Name</label>
                    <input 
                      id="name"
                      type="text" 
                      placeholder="Your Name" 
                      className="input w-full" 
                      required 
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-secondary">Email</label>
                    <input 
                      id="email"
                      type="email" 
                      placeholder="Your Email" 
                      className="input w-full" 
                      required 
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2 text-secondary">Subject</label>
                  <input 
                    id="subject"
                    type="text" 
                    placeholder="Subject" 
                    className="input w-full" 
                    required 
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-secondary">Message</label>
                  <textarea 
                    id="message"
                    placeholder="Your Message" 
                    rows={5} 
                    className="input w-full" 
                    required 
                  />
                </div>
                
                <motion.button 
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;