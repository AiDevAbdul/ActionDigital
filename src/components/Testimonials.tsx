'use client';

/* eslint-disable react/no-unescaped-entities */

import { motion } from '@/lib/motion-shim';
import { Star, Users, Handshake, Quote } from 'lucide-react';
import { useMemo, useState } from 'react';

// Define mock testimonials outside the component to prevent re-creation on every render
const mockTestimonials = [
  {
    id: '1',
    content: "Working with Abdul has been an exceptional experience. The AI-powered learning tools transformed our training programs and significantly increased student engagement.",
    author: "Sarah Johnson",
    role: "CEO",
    company: "EduTech Solutions",
    rating: 5,
    type: 'testimonial',
    delay: 0.2,
  },
  {
    id: '2',
    content: "Their expertise in AI implementation and digital marketing automation brought tangible results to our business. Our social media reach increased by 300% in just 3 months.",
    author: "Michael Chen",
    role: "Marketing Director",
    company: "GrowthMasters Inc",
    rating: 5,
    type: 'testimonial',
    delay: 0.3,
  },
  {
    id: '3',
    content: "Strategic partner for our AI integration projects. Their technical expertise and project management skills are top-notch.",
    author: "TechInnovate",
    role: "Partner",
    company: "TechInnovate Alliance",
    rating: 5,
    type: 'partner',
    delay: 0.4,
  },
  {
    id: '4',
    content: "Collaboration on the workflow automation project was seamless. Their team's expertise in n8n and API integration was crucial to our success.",
    author: "David Rodriguez",
    role: "CTO",
    company: "AutomatePro",
    rating: 5,
    type: 'collaborator',
    delay: 0.5,
  },
  {
    id: '5',
    content: "The custom software solution delivered exceeded our expectations. The team's attention to detail and commitment to quality was remarkable.",
    author: "Emma Thompson",
    role: "Product Manager",
    company: "StartUp Ventures",
    rating: 5,
    type: 'testimonial',
    delay: 0.6,
  },
  {
    id: '6',
    content: "Official technology training partner. Our joint workshops have delivered great value to the community.",
    author: "Digital Academy",
    role: "Collaborator",
    company: "Digital Academy Network",
    rating: 5,
    type: 'collaborator',
    delay: 0.7,
  },
  {
    id: '7',
    content: "Partnership with Action Digital Institute has enabled us to provide cutting-edge tech education to underprivileged communities.",
    author: "HOPE87",
    role: "Partner",
    company: "HOPE87",
    rating: 5,
    type: 'partner',
    delay: 0.8,
  },
  {
    id: '8',
    content: "Their comprehensive training programs have equipped our students with the technical skills needed in today's job market. A valuable educational partner.",
    author: "Skills Academy",
    role: "Collaborator",
    company: "Skills Academy for Needy Aspirants",
    rating: 5,
    type: 'collaborator',
    delay: 0.9,
  },
  {
    id: '9',
    content: "The technical expertise and educational resources provided by Action Digital Institute have enhanced our gemology programs significantly.",
    author: "Gems & Gemological Institute",
    role: "Partner",
    company: "Gems & Gemological Institute of Peshawar",
    rating: 5,
    type: 'partner',
    delay: 1.0,
  },
  {
    id: '10',
    content: "Our collaboration has strengthened Pakistan's trade sector by providing digital skills training to exporters and trade professionals.",
    author: "TDA Pakistan",
    role: "Collaborator",
    company: "Trade Development Authority of Pakistan",
    rating: 5,
    type: 'collaborator',
    delay: 1.1,
  },
  {
    id: '11',
    content: "Comprehensive digital marketing strategy that increased our online visibility and customer acquisition significantly.",
    author: "Marketing Pro",
    role: "Partner",
    company: "Digital Growth Agency",
    rating: 5,
    type: 'partner',
    delay: 1.2,
  },
  {
    id: '12',
    content: "Professional web development project that transformed our online presence and increased user engagement by 200%.",
    author: "Project Manager",
    role: "Client",
    company: "Business Corp",
    rating: 5,
    type: 'testimonial',
    delay: 1.3,
  },
  {
    id: '13',
    content: "Excellently produced documentary that beautifully captured our organizational values and mission.",
    author: "Communications Lead",
    role: "Collaborator",
    company: "NGO Foundation",
    rating: 5,
    type: 'collaborator',
    delay: 1.4,
  },
  {
    id: '14',
    content: "Outstanding mobile app development that revolutionized our customer engagement and service delivery.",
    author: "CTO",
    role: "Client",
    company: "Tech Startup",
    rating: 5,
    type: 'testimonial',
    delay: 1.5,
  },
  {
    id: '15',
    content: "Collaborative partnership for developing innovative e-learning solutions for higher education.",
    author: "University Partner",
    role: "Partner",
    company: "Higher Education Institute",
    rating: 5,
    type: 'partner',
    delay: 1.6,
  },
];

type Testimonial = typeof mockTestimonials[number];

const Testimonials = () => {
  const [activeTab, setActiveTab] = useState('client-reviews');

  // Use useMemo to prevent unnecessary recalculations
  const { clientReviews, partners, collaborators } = useMemo(() => {
    const clientReviews = mockTestimonials.filter(item => item.type === 'testimonial');
    const partners = mockTestimonials.filter(item => item.type === 'partner');
    const collaborators = mockTestimonials.filter(item => item.type === 'collaborator');
    return { clientReviews, partners, collaborators };
  }, []);

  // Function to render star ratings
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  // Animation properties for the cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="testimonials" className="section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            What They Say
          </p>
          <h2 className="section-title text-primary">
            Satisfied Clients & Partners
          </h2>
          <p className="section-subtitle text-secondary">
            Testimonials, partnerships, and collaborations
          </p>
        </motion.div>

        {/* Testimonials Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-lg border border-default p-1 bg-surface">
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'client-reviews' 
                  ? 'bg-primary-gradient text-white' 
                  : 'text-secondary hover:text-primary'
              }`}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('client-reviews');
                document.getElementById('client-reviews')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Client Reviews
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'partners' 
                  ? 'bg-primary-gradient text-white' 
                  : 'text-secondary hover:text-primary'
              }`}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('partners');
                document.getElementById('partners')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Partners
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'collaborators' 
                  ? 'bg-primary-gradient text-white' 
                  : 'text-secondary hover:text-primary'
              }`}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('collaborators');
                document.getElementById('collaborators')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Collaborators
            </button>
          </div>
        </div>

        {/* Client Reviews Section */}
        <div id="client-reviews" className="mb-16">
          <div className="flex items-center mb-8">
            <Quote className="text-accent mr-3" />
            <h3 className="text-2xl font-bold text-primary">Client Reviews</h3>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {clientReviews.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: testimonial.delay }}
                className="glass-card card p-6 flex flex-col"
              >
                <div className="flex mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-secondary mb-6 flex-grow">"{testimonial.content}"</p>
                
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-primary-gradient flex items-center justify-center text-white font-bold">
                      {testimonial.author.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-primary">{testimonial.author}</p>
                    <p className="text-sm text-secondary">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Partners Section */}
        <div id="partners" className="mb-16">
          <div className="flex items-center mb-8">
            <Handshake className="text-accent mr-3" />
            <h3 className="text-2xl font-bold text-primary">Partners</h3>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner) => (
              <motion.div
                key={partner.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: partner.delay }}
                className="glass-card card p-6 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary-gradient flex items-center justify-center text-white mb-4">
                  <Handshake className="w-8 h-8" />
                </div>
                <p className="text-secondary mb-4 flex-grow">"{partner.content}"</p>
                
                <div>
                  <p className="font-bold text-primary">{partner.author}</p>
                  <p className="text-sm text-secondary">{partner.role}, {partner.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Collaborators Section */}
        <div id="collaborators" className="mb-16">
          <div className="flex items-center mb-8">
            <Users className="text-accent mr-3" />
            <h3 className="text-2xl font-bold text-primary">Collaborators</h3>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {collaborators.map((collaborator) => (
              <motion.div
                key={collaborator.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: collaborator.delay }}
                className="glass-card card p-6 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary-gradient flex items-center justify-center text-white mb-4">
                  <Users className="w-8 h-8" />
                </div>
                <p className="text-secondary mb-4 flex-grow">"{collaborator.content}"</p>
                
                <div>
                  <p className="font-bold text-primary">{collaborator.author}</p>
                  <p className="text-sm text-secondary">{collaborator.role}, {collaborator.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
