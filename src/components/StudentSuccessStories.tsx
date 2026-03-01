// src/components/StudentSuccessStories.tsx

'use client';

/* eslint-disable react/no-unescaped-entities */

import Link from 'next/link';
import { motion } from '@/lib/motion-shim';
import { Star, GraduationCap, Briefcase, Award, Users, BriefcaseBusiness } from 'lucide-react';
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
      name: 'Taimur Khan',
      title: 'Freelancer & Digital Marketer',
      story: "Before joining ADI, I tried many online courses, but none of them gave real results. I started as a complete beginner with no experience and wanted to support myself as a student. When I joined Action Digital Institute, everything changed. I learned practical skills in Digital Marketing, Social Media Management, YouTube Automation, and Graphic Design — with real guidance and hands-on training.",
      result: "Within one year, I started getting real clients and earning online. Today, I’m working with 13 clients and making handsome income per month. ADI helped me gain skills, confidence, and a successful freelancing career.",
      program: 'Social Media Management & Marketing',
      rating: 5,
      delay: 0.2,
    },
    {
      id: '2',
      name: 'Fawad Khan Afridi',
      title: 'Freelancer & Digital Marketer',
      story: "At a time when I had no job and no clear path, I decided to learn a skill that could change my situation. I joined the Digital Marketing program at Action Agency, guided by Wahab Sir and Jehangir Sir, whose support gave me confidence. \n Within just a few days of starting the course, I secured my first client and began managing social media for his shop. Even with limited experience, I trusted Allah and put in my best effort — and that first opportunity became the start of my professional journey.",
      result: "Today, Alhamdulillah, I work with 15+ clients and manage digital marketing campaigns for multiple businesses. This skill has given me stability, direction, and a growing freelance career.",
      program: 'Social Media Management & Marketing',
      rating: 5,
      delay: 0.3,
    },
    {
      id: '3',
      name: 'Adil Ghafoor',
      title: 'Social Media Manager | Graphics Designer',
      story: "With a passion for creativity and digital growth, I joined the Social Media Management & Marketing program at ADI. There, I learned how to plan, manage, and grow brands online — from creating engaging content to running successful marketing campaigns and offering services worldwide through freelancing platforms.",
      result: "Today, I work as a freelance and onsite Social Media Manager, collaborating with international and local clients. The program not only boosted my skills but also gave me the confidence to build a strong online presence and grow as a successful digital professional.",
      program: 'Social Media Management & Marketing',
      rating: 5,
      delay: 0.4,
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
            <Users className="w-10 h-10 text-accent mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-primary">1000+</h3>
            <p className="text-secondary">Students Trained</p>
          </div>
          <div className="glass-card card p-6">
            <Briefcase className="w-10 h-10 text-accent mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-primary">95%</h3>
            <p className="text-secondary">Satisfaction Rate</p>
          </div>
          <div className="glass-card card p-6">
            <GraduationCap className="w-10 h-10 text-accent mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-primary">10+</h3>
            <p className="text-secondary">Skills</p>
          </div>
          <div className="glass-card card p-6">
            <BriefcaseBusiness className="w-10 h-10 text-accent mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-primary">50+</h3>
            <p className="text-secondary">Startups</p>
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
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/#contact"
              className="btn inline-flex items-center"
            >
              <GraduationCap className="mr-2 h-5 w-5" />
              Enroll Today
            </Link>

            <a
              href="https://wa.me/923189532843"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary inline-flex items-center"
            >
              Contact via WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StudentSuccessStories;
