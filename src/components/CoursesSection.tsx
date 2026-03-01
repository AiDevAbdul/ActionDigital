'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from '@/lib/motion-shim';
import CourseCard from '@/components/CourseCard';

const CoursesSection = () => {
  const courses = [
    {
      id: 'digital-literacy',
      title: 'Digital Literacy & AI Tools',
      description: 'Master essential digital skills and cutting-edge AI tools to thrive in the modern digital landscape.',
      duration: '16 Days',
      level: 'Beginner to Intermediate',
      modules: 16,
      rating: 4.9,
      students: 1250,
    },
    {
      id: 'python-programming',
      title: 'Python Programming',
      description: 'Learn Python from basics to advanced concepts with hands-on projects and real-world applications.',
      duration: '8 Weeks',
      level: 'Beginner to Intermediate',
      modules: 12,
      rating: 4.8,
      students: 980,
    },
    {
      id: 'ai-driven-development',
      title: 'AI Driven Development',
      description: 'Build intelligent applications using modern AI tools, machine learning, and automation techniques.',
      duration: '10 Weeks',
      level: 'Intermediate to Advanced',
      modules: 14,
      rating: 4.7,
      students: 750,
    }
  ];

  return (
    <section id="courses" className="section">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-primary">Our Featured Courses</h2>
          <p className="section-subtitle text-secondary">
            Explore our comprehensive courses designed to enhance your digital skills and prepare you for the future.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <CourseCard
                id={course.id}
                title={course.title}
                description={course.description}
                duration={course.duration}
                level={course.level}
                modules={course.modules}
                rating={course.rating}
                students={course.students}
              />
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
          <Link
            href="/courses"
            className="btn"
          >
            View All Courses
          </Link>

          <a
            href="https://wa.me/923189532843"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary flex items-center"
          >
            Contact via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
