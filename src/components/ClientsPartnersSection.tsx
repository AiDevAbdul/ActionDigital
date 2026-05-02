'use client';

import { motion } from '@/lib/motion-shim';
import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';

type Partner = {
  id: string;
  name: string;
  logo: string;
};

type ClientFeedback = {
  id: string;
  name: string;
  company: string;
  feedback: string;
  rating: number;
  avatar?: string;
};

const PartnersSection = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await fetch('/api/partners');
        if (res.ok) {
          const data = await res.json();
          setPartners(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error('Error fetching partners:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  const fallbackPartners: Partner[] = [
    { id: '1', name: 'Bilal Cosmetics', logo: '/logos/bilalcosmetics.png' },
    { id: '2', name: 'BOK', logo: '/logos/bok.png' },
    { id: '3', name: 'CECOS', logo: '/logos/cecos.png' },
    { id: '4', name: 'Dynamic Builder', logo: '/logos/dynamicbuilder.png' },
    { id: '5', name: 'GGIP', logo: '/logos/ggip.png' },
    { id: '6', name: 'Hope87', logo: '/logos/hope87.png' },
    { id: '7', name: 'MeTech', logo: '/logos/metech.png' },
    { id: '8', name: 'Sana', logo: '/logos/sana.png' },
    { id: '9', name: 'TDAP', logo: '/logos/tdap.png' },
  ];

  const displayPartners = partners.length > 0 ? partners : fallbackPartners;

  if (loading) {
    return (
      <section className="section" style={{ background: '#090D1A' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Our Network
            </p>
            <h2 className="section-title" style={{ color: '#F1F5FF' }}>
              Partners & Collaborators
            </h2>
          </div>
          <div className="h-64 rounded-lg animate-pulse" style={{ background: 'rgba(255,255,255,0.06)' }}></div>
        </div>
      </section>
    );
  }

  return (
    <section className="section" style={{ background: '#090D1A' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Our Network
          </p>
          <h2 className="section-title text-primary">
            Partners & Collaborators
          </h2>
          <p className="section-subtitle text-secondary">
            Trusted partners and collaborators in our ecosystem
          </p>
        </motion.div>

        {/* Partners Carousel - Continuous Sliding Animation */}
        <div className="relative overflow-hidden w-full">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: -1000 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="flex gap-8 w-max"
          >
            {/* First set of logos */}
            {displayPartners.map((partner) => (
              <motion.div
                key={`${partner.id}-1`}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex-shrink-0 glass-card card p-8 flex items-center justify-center min-h-32 w-48 cursor-pointer"
              >
                <div className="relative w-28 h-28">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                    priority={false}
                  />
                </div>
              </motion.div>
            ))}

            {/* Duplicate set for seamless loop */}
            {displayPartners.map((partner) => (
              <motion.div
                key={`${partner.id}-2`}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex-shrink-0 glass-card card p-8 flex items-center justify-center min-h-32 w-48 cursor-pointer"
              >
                <div className="relative w-28 h-28">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                    priority={false}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ClientFeedbackSection = () => {
  const [feedback, setFeedback] = useState<ClientFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch('/api/client-feedback');
        if (res.ok) {
          const data = await res.json();
          setFeedback(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error('Error fetching client feedback:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const fallbackFeedback: ClientFeedback[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      company: 'Tech Innovations Inc',
      feedback: 'Exceptional service and attention to detail. The team delivered beyond our expectations.',
      rating: 5,
    },
    {
      id: '2',
      name: 'Michael Chen',
      company: 'Digital Solutions Ltd',
      feedback: 'Professional, reliable, and results-driven. Highly recommend for any project.',
      rating: 5,
    },
    {
      id: '3',
      name: 'Emma Rodriguez',
      company: 'Creative Agency Co',
      feedback: 'Outstanding collaboration and innovative solutions. A true partner in success.',
      rating: 5,
    },
  ];

  const displayFeedback = feedback.length > 0 ? feedback : fallbackFeedback;

  if (loading) {
    return (
      <section className="section" style={{ background: '#0E1426' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              What Our Clients Say
            </p>
            <h2 className="section-title" style={{ color: '#F1F5FF' }}>
              Client Feedback
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-48 rounded-lg animate-pulse" style={{ background: 'rgba(255,255,255,0.06)' }}></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
    hover: {
      y: -12,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section className="section relative overflow-hidden" style={{ background: '#0E1426' }}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-br from-accent/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-to-tl from-accent/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent px-4 py-2 rounded-full bg-accent/10 border border-accent/30">
              What Our Clients Say
            </p>
          </div>
          <h2 className="section-title text-primary mb-4">
            Client Feedback
          </h2>
          <p className="section-subtitle text-secondary max-w-2xl mx-auto">
            Real stories from clients who've transformed their business with our solutions
          </p>
        </motion.div>

        {/* Feedback Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {displayFeedback.map((item, index) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover="hover"
              onMouseEnter={() => setActiveIndex(index)}
              className="group cursor-pointer h-full"
            >
              <div className="relative h-full rounded-2xl overflow-hidden transition-all duration-300 hover:border-accent/50" style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)', border: '1px solid rgba(239,126,46,0.15)' }}>
                {/* Gradient accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Content */}
                <div className="relative p-8 h-full flex flex-col">
                  {/* Quote Icon & Rating */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-4xl text-accent/20 font-serif leading-none">"</div>
                    <div className="flex gap-1">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <Star
                            className="h-4 w-4 fill-accent text-accent"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Feedback Text */}
                  <p className="text-secondary mb-8 flex-grow leading-relaxed text-sm md:text-base">
                    {item.feedback}
                  </p>

                  {/* Divider */}
                  <div className="w-12 h-1 bg-gradient-to-r from-accent to-accent/30 rounded-full mb-6"></div>

                  {/* Client Info */}
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center text-white font-bold flex-shrink-0 shadow-lg"
                    >
                      {item.name.charAt(0)}
                    </motion.div>
                    <div className="min-w-0">
                      <p className="font-semibold text-primary text-sm truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-secondary truncate">
                        {item.company}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hover background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Navigation Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-2"
        >
          {displayFeedback.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? 'bg-accent w-8'
                  : 'bg-accent/30 w-2 hover:bg-accent/50'
              }`}
              aria-label={`Go to feedback ${index + 1}`}
            />
          ))}
        </motion.div>

        {/* Trust Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 pt-12 border-t border-accent/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-accent mb-2">100%</p>
              <p className="text-sm text-secondary">5-Star Ratings</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-accent mb-2">{displayFeedback.length}+</p>
              <p className="text-sm text-secondary">Happy Clients</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-accent mb-2">98%</p>
              <p className="text-sm text-secondary">Satisfaction Rate</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-accent mb-2">24/7</p>
              <p className="text-sm text-secondary">Support Available</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export { PartnersSection, ClientFeedbackSection };
