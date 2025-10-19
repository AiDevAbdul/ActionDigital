// src/components/StudentSuccessStories.tsx

'use client';

import { motion } from 'framer-motion';
import { Star, GraduationCap, Briefcase, Award } from 'lucide-react';
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
      name: 'Ahmed Khan',
      title: 'Senior AI Engineer',
      story: "Before joining Action Digital Institute, I had a basic understanding of Python but no real experience in AI development. The AI/ML program completely transformed my career path.",
      result: "Now working as a Senior AI Engineer at a leading tech company with a 300% salary increase. Developed an NLP solution that's used by millions of users.",
      program: 'AI/ML Mastery Program',
      rating: 5,
      delay: 0.2,
    },
    {
      id: '2',
      name: 'Fatima Ali',
      title: 'Digital Marketing Director',
      story: "As a marketing professional, I wanted to transition into digital marketing. The digital marketing program gave me the practical skills and confidence I needed.",
      result: "Successfully transitioned to a leadership role as Digital Marketing Director. Managed campaigns worth $2M+ annually with a 40% improvement in ROI.",
      program: 'Digital Marketing Mastery',
      rating: 5,
      delay: 0.3,
    },
    {
      id: '3',
      name: 'Omar Hassan',
      title: 'Full-Stack Developer',
      story: "I was a traditional web designer looking to expand my skills. The Full-Stack Development program taught me modern technologies and best practices.",
      result: "Now employed as a Full-Stack Developer with a tech startup. Built applications used by over 100,000 users and promoted twice in the past 18 months.",
      program: 'Full-Stack Web Development',
      rating: 5,
      delay: 0.4,
    },
    {
      id: '4',
      name: 'Zara Ahmed',
      title: 'Entrepreneur',
      story: "I wanted to build my own tech startup but lacked the technical skills. The comprehensive program taught me everything from development to digital marketing.",
      result: "Successfully launched my own SaaS startup that now serves 500+ clients. Raised $500K in seed funding based on the MVP I built during the course.",
      program: 'Complete Tech Entrepreneurship',
      rating: 5,
      delay: 0.5,
    },
    {
      id: '5',
      name: 'Yusuf Mir',
      title: 'Data Science Lead',
      story: "With a background in statistics, I wanted to transition to data science. The program connected my theoretical knowledge with practical applications.",
      result: "Now leading a team of 8 data scientists in a Fortune 500 company. Implemented ML models that improved operational efficiency by 25%.",
      program: 'Data Science & Analytics',
      rating: 5,
      delay: 0.6,
    },
    {
      id: '6',
      name: 'Ayesha Khan',
      title: 'Project Manager',
      story: "I was already in tech but wanted to understand modern development practices to be a better project manager. The program filled crucial gaps in my knowledge.",
      result: "Promoted to Senior Project Manager overseeing high-impact projects involving AI and web development. Successfully managed 15+ projects with 98% on-time delivery.",
      program: 'Agile Development Practices',
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
            Real results from our training programs
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
            <h3 className="text-3xl font-bold text-primary">2500+</h3>
            <p className="text-secondary">Students Trained</p>
          </div>
          <div className="glass-card card p-6">
            <Briefcase className="w-10 h-10 text-accent mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-primary">92%</h3>
            <p className="text-secondary">Employment Rate</p>
          </div>
          <div className="glass-card card p-6">
            <Award className="w-10 h-10 text-accent mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-primary">$50M+</h3>
            <p className="text-secondary">Combined Salary Increase</p>
          </div>
          <div className="glass-card card p-6">
            <Star className="w-10 h-10 text-accent mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-primary">4.9/5</h3>
            <p className="text-secondary">Average Rating</p>
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
            Join thousands of students who have transformed their careers with our comprehensive training programs. Whether you're looking to advance in your current career or make a complete switch, we have a program for you.
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