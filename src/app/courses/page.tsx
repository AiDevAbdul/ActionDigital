import React from 'react';
import AnimatedPageWrapper from '@/components/AnimatedPageWrapper';
import CourseCard from '@/components/CourseCard';

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
      students: 850,
    },
    {
      id: 'artificial-intelligence',
      title: 'Artificial Intelligence',
      description: 'Deep dive into AI concepts, neural networks, and practical applications of artificial intelligence.',
      duration: '12 Weeks',
      level: 'Advanced',
      modules: 18,
      rating: 4.9,
      students: 620,
    }
  ];

  return (
    <AnimatedPageWrapper>
      <section className="min-h-screen section py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="section-title text-primary">Our Courses</h1>
            <p className="section-subtitle text-secondary max-w-3xl mx-auto">
              Explore our comprehensive course offerings designed to enhance your digital skills and prepare you for the future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allCourses.map((course, index) => (
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

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12">
            <a
              href="https://wa.me/923189532843"
              target="_blank"
              rel="noopener noreferrer"
              className="btn flex items-center"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </AnimatedPageWrapper>
  );
};

export default CoursesPage;