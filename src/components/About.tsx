// src/components/About.tsx

'use client';

import { motion } from 'framer-motion';
import { Target, Heart, Award, Users } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="section">
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
            About Our Institute
          </p>
          <h2 className="section-title text-primary">
            Empowering Digital Transformation
          </h2>
          <p className="section-subtitle text-secondary">
            Vision, mission, and journey of our digital institute
          </p>
        </motion.div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-3xl font-bold text-primary mb-6">Our Story</h3>
            <p className="text-secondary mb-4">
              Founded with a vision to bridge the digital skills gap, Action Digital Institute was established to empower individuals and businesses with cutting-edge technology knowledge. Our founder, Abdul Wahab, recognized the growing need for practical, industry-relevant training in AI, web development, and digital marketing.
            </p>
            <p className="text-secondary mb-4">
              Starting as a small training initiative, we've grown into a comprehensive digital learning platform serving thousands of students worldwide. Our approach combines theoretical knowledge with practical application, ensuring our students are job-ready upon completion of their programs.
            </p>
            <p className="text-secondary">
              Today, we continue to evolve and expand our curriculum to stay ahead of technological advancements, ensuring our students receive the most relevant and up-to-date training in the digital domain.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-card card p-8"
          >
            <div className="bg-primary-gradient p-4 rounded-lg mb-6 inline-block">
              <Heart className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
            <p className="text-secondary">
              To democratize access to cutting-edge digital education and empower individuals to build successful careers in technology. We're committed to providing high-quality, practical training that bridges the gap between academic knowledge and industry requirements.
            </p>
          </motion.div>
        </div>

        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card card p-8 mb-20"
        >
          <div className="flex items-center mb-6">
            <Target className="w-10 h-10 text-accent mr-4" />
            <h3 className="text-3xl font-bold text-primary">Our Vision</h3>
          </div>
          <p className="text-secondary text-lg">
            To be the leading global institute for digital transformation education, fostering innovation and creating technology leaders who shape the future of digital industries. We envision a world where quality digital education is accessible to all, regardless of their geographic or economic circumstances.
          </p>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-primary text-center mb-12">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass-card card p-6 text-center">
              <Award className="w-12 h-12 text-accent mx-auto mb-4" />
              <h4 className="text-xl font-bold text-primary mb-3">Excellence</h4>
              <p className="text-secondary">We strive for the highest standards in everything we do.</p>
            </div>
            <div className="glass-card card p-6 text-center">
              <Users className="w-12 h-12 text-accent mx-auto mb-4" />
              <h4 className="text-xl font-bold text-primary mb-3">Collaboration</h4>
              <p className="text-secondary">We believe in the power of teamwork and community.</p>
            </div>
            <div className="glass-card card p-6 text-center">
              <Heart className="w-12 h-12 text-accent mx-auto mb-4" />
              <h4 className="text-xl font-bold text-primary mb-3">Integrity</h4>
              <p className="text-secondary">We maintain honesty and ethical practices.</p>
            </div>
            <div className="glass-card card p-6 text-center">
              <Target className="w-12 h-12 text-accent mx-auto mb-4" />
              <h4 className="text-xl font-bold text-primary mb-3">Innovation</h4>
              <p className="text-secondary">We embrace creativity and new solutions.</p>
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold text-primary mb-6">Leadership Team</h3>
          <p className="text-secondary max-w-3xl mx-auto mb-10">
            Our leadership team brings together decades of expertise in technology, education, and business. We're passionate about equipping the next generation of digital professionals with the skills needed to succeed in an ever-evolving technological landscape.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;