import React from 'react';
import AnimatedPageWrapper from '@/components/AnimatedPageWrapper';
import CourseCard from '@/components/CourseCard';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Courses',
  description:
    'Browse Action Digital Institute courses in AI, web development, and digital marketing with hands-on modules.',
  alternates: {
    canonical: '/courses',
  },
};

const CoursesPage = () => {
  const allCourses = [
    {
      id: 'digital-literacy',
      title: 'Digital Literacy & AI Tools',
      description: 'Master essential digital skills and cutting-edge AI tools to thrive in the modern digital landscape.',
      duration: '16 Days',
      level: 'Beginner to Intermediate',
      modules: 16,
      rating: 4.9,
      students: 50,
    },
    {
      id: 'python-programming',
      title: 'Python Programming',
      description: 'Learn Python from basics to advanced concepts with hands-on projects and real-world applications.',
      duration: '8 Weeks',
      level: 'Beginner to Intermediate',
      modules: 12,
      rating: 4.8,
      students: 120,
    },
    {
      id: 'ai-driven-development',
      title: 'AI Driven Development',
      description: 'Build intelligent applications using modern AI tools, machine learning, and automation techniques.',
      duration: '10 Weeks',
      level: 'Intermediate to Advanced',
      modules: 14,
      rating: 4.7,
      students: 30,
    },
    {
      id: 'social-media-management',
      title: 'Social Media Management',
      description: 'Master the art of managing social media accounts, creating engaging content, and growing your audience.',
      duration: '6 Weeks',
      level: 'Beginner to Intermediate',
      modules: 10,
      rating: 4.6,
      students: 1100,
    },
    {
      id: 'social-media-marketing',
      title: 'Social Media Marketing',
      description: 'Learn effective strategies to promote brands, products, and services across various social platforms.',
      duration: '6 Weeks',
      level: 'Intermediate',
      modules: 11,
      rating: 4.5,
      students: 250,
    },
    {
      id: 'artificial-intelligence',
      title: 'Artificial Intelligence',
      description: 'Deep dive into AI concepts, neural networks, and practical applications of artificial intelligence.',
      duration: '12 Weeks',
      level: 'Advanced',
      modules: 18,
      rating: 4.9,
      students: 50,
    }
  ];

  const coursesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: allCourses.map((course, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Course',
        name: course.title,
        description: course.description,
        provider: {
          '@type': 'Organization',
          name: siteConfig.name,
          url: siteConfig.url,
        },
      },
    })),
  };

  return (
    <AnimatedPageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(coursesJsonLd) }}
      />
      <section className="min-h-screen bg-[#090D1A] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-widest rounded-full border text-[#6366F1] border-[rgba(99,102,241,0.30)] bg-[rgba(99,102,241,0.08)] mb-4">
              Digital Institute
            </span>
            <h1 className="font-heading font-bold text-[#F1F5FF] mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Our Courses
            </h1>
            <p className="text-[#8892A4] max-w-2xl mx-auto leading-relaxed mb-8">
              Comprehensive courses designed to enhance your digital skills and prepare you for the future.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[10px] font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#818CF8] shadow-[0_0_24px_rgba(99,102,241,0.25)] hover:shadow-[0_0_40px_rgba(99,102,241,0.40)] transition-shadow duration-[280ms]">
                Talk to Admissions
              </a>
              <a href="https://wa.me/923189532843" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[10px] font-semibold text-[#F1F5FF] bg-white/8 border border-white/14 hover:bg-white/12 transition-all duration-[280ms]">
                WhatsApp Inquiry
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCourses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                description={course.description}
                duration={course.duration}
                level={course.level}
                modules={course.modules}
                rating={course.rating}
                students={course.students}
              />
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <a href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[12px] font-semibold text-white bg-gradient-to-r from-[#6366F1] to-[#818CF8] shadow-[0_0_28px_rgba(99,102,241,0.25)] hover:shadow-[0_0_44px_rgba(99,102,241,0.40)] transition-shadow duration-[280ms]">
              Apply or Request Info
            </a>
          </div>
        </div>
      </section>
    </AnimatedPageWrapper>
  );
};

export default CoursesPage;
