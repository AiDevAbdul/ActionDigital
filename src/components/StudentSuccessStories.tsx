// src/components/StudentSuccessStories.tsx

'use client';

import { motion } from 'framer-motion';
import { Star, GraduationCap, Briefcase, Award, ShoppingBag, Users } from 'lucide-react';
import { useState } from 'react';

type SuccessStory = {
  id: string;
  name: string;
  title: string;
  story: string;
  result: string;
  program: string;
  rating: number;
  delay: number;
};

const StudentSuccessStories = () => {
  const [successStories] = useState<SuccessStory[]>([
    {
      id: '1',
      name: 'Sadia Khan',
      title: 'E-commerce Entrepreneur',
      story: "I had no experience in online business, but after completing the E-commerce and Digital Marketing program at ADI, I learned how to start and run an online store effectively.",
      result: "Successfully launched my own online clothing store earning $3,000+ monthly. The skills helped me transcend barriers to poverty and build a sustainable business from home.",
      program: 'E-Commerce & Digital Marketing',
      rating: 5,
      delay: 0.2,
    },
    {
      id: '2',
      name: 'Ali Raza',
      title: 'Freelancer & Digital Marketer',
      story: "As a graduate student, I wanted to earn while learning. ADI's freelancing and social media management program taught me practical skills to generate online income.",
      result: "Now working as a full-time freelancer earning $2,500+ monthly. Helped 15+ local businesses improve their online presence through digital marketing services.",
      program: 'Freelancing & Social Media Management',
      rating: 5,
      delay: 0.3,
    },
    {
      id: '3',
      name: 'Ayesha Bibi',
      title: 'YouTube Content Creator',
      title: 'YouTube Content Creator & Manager',
      story: "As a woman entrepreneur, I needed skills that could help me work from home. The YouTube Channel Management and Video Editing program at ADI was exactly what I was looking for.",
      result: "Built a successful YouTube channel with 100K+ subscribers and $1,800+ monthly income. Now managing channels for other clients as well.",
      program: 'YouTube Channel Management & Video Editing',
      rating: 5,
      delay: 0.4,
    },
    {
      id: '4',
      name: 'Kamran Ahmed',
      title: 'AI/Python Developer',
      story: "I was working a low-paying job and wanted to transition into the tech industry. The AI/Python Programming course at ADI provided the skills I needed to make a change.",
      result: "Now working as an AI developer with a 200% salary increase. I've helped several startups implement AI solutions for their business challenges.",
      program: 'AI/Python Programming',
      rating: 5,
      delay: 0.5,
    },
    {
      id: '5',
      name: 'Farah Javed',
      title: 'Graphic Designer & 3D Animator',
      story: "As a creative person, I wanted to turn my passion for design into a career. ADI's 3D Animation and Graphic Designing program equipped me with industry-relevant skills.",
      result: "Now running my own design business from home, creating visual content for clients globally. My animations have been featured in multiple local brands' campaigns.",
      program: '3D Animation & Graphic Designing',
      rating: 5,
      delay: 0.6,
    },
    {
      id: '6',
      name: 'Hassan Ali',
      title: 'Web & App Developer',
      story: "I wanted to learn web development to start my own tech business. ADI's Web Development program provided comprehensive training with practical projects and mentorship.",
      result: "Successfully launched 3 web applications that serve over 10,000 users. Also developed mobile apps for local businesses, generating significant revenue streams.",
      program: 'Web & Mobile App Development',
      rating: 5,
      delay: 0.7,
    },
  ]);

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
    <section id="success-stories" className="section bg-surface">
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
            Success Stories
          </p>
          <h2 className="section-title text-primary">
            Our Students' Journeys
          </h2>
          <p className="section-subtitle text-secondary">
            Real results from our 10+ essential digital skills training programs with incubation support
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-20"
        >
          <div className="glass-card card p-6">
            <GraduationCap className="w-10 h-10 text-accent mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-primary">1500+</h3>
            <p className="text-secondary">Students Trained</p>
          </div>
          <div className="glass-card card p-6">
            <Briefcase className="w-10 h-10 text-accent mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-primary">85%</h3>
            <p className="text-secondary">Employment Rate</p>
          </div>
          <div className="glass-card card p-6">
            <ShoppingBag className="w-10 h-10 text-accent mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-primary">78%</h3>
            <p className="text-secondary">Business Startup Success</p>
          </div>
          <div className="glass-card card p-6">
            <Users className="w-10 h-10 text-accent mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-primary">90%</h3>
            <p className="text-secondary">Women Entrepreneurs</p>
          </div>
        </motion.div>

        {/* Success Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {successStories.map((story) => (
            <motion.div
              key={story.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: story.delay }}
              className="glass-card card p-6 flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-primary">{story.name}</h3>
                  <p className="text-accent font-medium">{story.title}</p>
                  <span className="text-sm text-secondary italic">Completed: {story.program}</span>
                </div>
                <div className="flex">
                  {renderStars(story.rating)}
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-bold text-primary mb-2">Journey:</h4>
                <p className="text-secondary">{story.story}</p>
              </div>
              
              <div className="mb-4">
                <h4 className="font-bold text-primary mb-2">Results:</h4>
                <p className="text-secondary">{story.result}</p>
              </div>
              
              <div className="mt-auto pt-4 border-t border-default">
                <div className="flex items-center text-accent">
                  <Award className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Featured Success Story</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-primary mb-4">Ready to Start Your Success Story?</h3>
          <p className="text-secondary max-w-2xl mx-auto mb-8">
            Join hundreds of students who have transformed their lives with our comprehensive training programs and 1-month incubation support. We empower individuals and businesses, especially women entrepreneurs, through transformative IT & AI skills that transcend barriers to poverty and help emerge as visionary business leaders of the digital age.
          </p>
          <a 
            href="/#contact" 
            className="btn inline-flex items-center"
          >
            <GraduationCap className="mr-2 h-5 w-5" />
            Enroll Today
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default StudentSuccessStories;