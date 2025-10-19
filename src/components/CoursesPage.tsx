// src/components/CoursesPage.tsx

'use client';

import { motion } from 'framer-motion';
import { Code, Brain, Zap, Palette, Video, BookOpen, Users, Globe, Smartphone, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';

type Course = {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  prerequisites: string[];
  skills: string[];
  icon: string;
  delay: number;
};

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Define mock course data
    const mockCourses: Course[] = [
      {
        id: '1',
        title: 'Social Media Marketing',
        description: 'Master the art of promoting brands and products through various social media platforms. Learn content strategy, community management, and advertising.',
        duration: '6 weeks',
        level: 'Beginner',
        prerequisites: ['Basic computer skills', 'Understanding of social media'],
        skills: ['Facebook Ads', 'Instagram Marketing', 'Twitter Strategy', 'LinkedIn Marketing'],
        icon: 'Globe',
        delay: 0.1
      },
      {
        id: '2',
        title: 'Social Media Management',
        description: 'Learn to manage social media accounts for businesses, including content creation, scheduling, engagement, and analytics.',
        duration: '8 weeks',
        level: 'Beginner',
        prerequisites: ['Basic social media knowledge'],
        skills: ['Content Planning', 'Community Management', 'Analytics', 'Brand Consistency'],
        icon: 'Users',
        delay: 0.2
      },
      {
        id: '3',
        title: 'Low-Code AI Development',
        description: 'Build AI-powered applications with minimal coding using visual development platforms and pre-built AI components.',
        duration: '10 weeks',
        level: 'Intermediate',
        prerequisites: ['Basic programming concepts', 'Understanding of AI'],
        skills: ['Microsoft Power Platform', 'Google AppSheet', 'OutSystems', 'Mendix'],
        icon: 'Code',
        delay: 0.3
      },
      {
        id: '4',
        title: 'No-Code AI Development',
        description: 'Create sophisticated AI applications without writing a single line of code using no-code development platforms.',
        duration: '8 weeks',
        level: 'Beginner',
        prerequisites: ['Basic computer skills'],
        skills: ['Bubble', 'Adalo', 'Glide', 'AI Integration'],
        icon: 'Zap',
        delay: 0.4
      },
      {
        id: '5',
        title: 'Video Editing',
        description: 'Master professional video editing techniques using industry-standard software for content creation and marketing.',
        duration: '12 weeks',
        level: 'Beginner',
        prerequisites: ['Basic computer skills'],
        skills: ['Adobe Premiere Pro', 'Final Cut Pro', 'After Effects', 'Color Grading'],
        icon: 'Video',
        delay: 0.5
      },
      {
        id: '6',
        title: 'Graphics Designing',
        description: 'Learn design principles and master graphic design tools to create compelling visual content for digital platforms.',
        duration: '10 weeks',
        level: 'Beginner',
        prerequisites: ['Basic computer skills'],
        skills: ['Adobe Photoshop', 'Illustrator', 'InDesign', 'Branding'],
        icon: 'Palette',
        delay: 0.6
      },
      {
        id: '7',
        title: 'Content Creation With AI',
        description: 'Leverage AI tools to create high-quality content efficiently, including articles, social media posts, and marketing copy.',
        duration: '6 weeks',
        level: 'Intermediate',
        prerequisites: ['Basic writing skills'],
        skills: ['ChatGPT', 'Copy.ai', 'Jasper', 'Content Strategy'],
        icon: 'BookOpen',
        delay: 0.7
      },
      {
        id: '8',
        title: 'E-commerce Marketing',
        description: 'Specialized marketing strategies for online stores, including product listings, conversion optimization, and customer retention.',
        duration: '8 weeks',
        level: 'Intermediate',
        prerequisites: ['Basic marketing knowledge'],
        skills: ['Shopify', 'Google Shopping', 'Email Marketing', 'Conversion Rate Optimization'],
        icon: 'ShoppingCart',
        delay: 0.8
      },
      {
        id: '9',
        title: 'Mobile App Development',
        description: 'Build cross-platform mobile applications using modern frameworks and best practices.',
        duration: '14 weeks',
        level: 'Intermediate',
        prerequisites: ['JavaScript basics', 'Programming fundamentals'],
        skills: ['React Native', 'Flutter', 'App Store Optimization', 'UI/UX Design'],
        icon: 'Smartphone',
        delay: 0.9
      },
      {
        id: '10',
        title: 'SEO & SEM Mastery',
        description: 'Comprehensive training on search engine optimization and marketing to boost online visibility.',
        duration: '10 weeks',
        level: 'Intermediate',
        prerequisites: ['Basic web knowledge'],
        skills: ['Google Analytics', 'Google Ads', 'Keyword Research', 'Link Building'],
        icon: 'Globe',
        delay: 1.0
      },
      {
        id: '11',
        title: 'Data Analytics',
        description: 'Learn to collect, analyze, and interpret data to drive business decisions and strategies.',
        duration: '12 weeks',
        level: 'Intermediate',
        prerequisites: ['Basic math skills'],
        skills: ['Excel', 'SQL', 'Tableau', 'Python for Data Analysis'],
        icon: 'Brain',
        delay: 1.1
      },
      {
        id: '12',
        title: 'Cloud Computing',
        description: 'Deploy and manage applications on cloud platforms with a focus on scalability and security.',
        duration: '10 weeks',
        level: 'Advanced',
        prerequisites: ['Basic networking knowledge'],
        skills: ['AWS', 'Azure', 'Google Cloud', 'DevOps'],
        icon: 'Zap',
        delay: 1.2
      },
      {
        id: '13',
        title: 'Cybersecurity Fundamentals',
        description: 'Learn essential security concepts to protect digital assets and maintain privacy in online operations.',
        duration: '8 weeks',
        level: 'Intermediate',
        prerequisites: ['Basic IT knowledge'],
        skills: ['Network Security', 'Encryption', 'Risk Assessment', 'Incident Response'],
        icon: 'Zap',
        delay: 1.3
      },
      {
        id: '14',
        title: 'Digital Branding',
        description: 'Create and maintain a strong digital brand identity across all online platforms.',
        duration: '6 weeks',
        level: 'Beginner',
        prerequisites: ['Basic marketing concepts'],
        skills: ['Brand Strategy', 'Visual Identity', 'Brand Voice', 'Brand Management'],
        icon: 'Palette',
        delay: 1.4
      },
      {
        id: '15',
        title: 'Affiliate Marketing',
        description: 'Build a profitable affiliate marketing business by promoting products and earning commissions.',
        duration: '8 weeks',
        level: 'Beginner',
        prerequisites: ['Basic marketing knowledge'],
        skills: ['Niche Selection', 'Content Creation', 'Email Marketing', 'Conversion Tracking'],
        icon: 'Globe',
        delay: 1.5
      },
      {
        id: '16',
        title: 'AI Prompt Engineering',
        description: 'Master the art of crafting effective prompts to maximize AI tool output and efficiency.',
        duration: '4 weeks',
        level: 'Intermediate',
        prerequisites: ['Experience with AI tools'],
        skills: ['Prompt Techniques', 'AI Training', 'Optimization', 'Quality Control'],
        icon: 'Brain',
        delay: 1.6
      }
    ];

    // Add delay property for animation
    const coursesWithDelay = mockCourses.map((course, index) => ({
      ...course,
      delay: 0.1 + (index * 0.1)
    }));

    setCourses(coursesWithDelay);
    setLoading(false);
  }, []);

  // Function to get icon component by name
  const getIconComponent = (iconName: string) => {
    switch(iconName) {
      case 'Code':
        return Code;
      case 'Brain':
        return Brain;
      case 'Zap':
        return Zap;
      case 'Palette':
        return Palette;
      case 'Video':
        return Video;
      case 'BookOpen':
        return BookOpen;
      case 'Users':
        return Users;
      case 'Globe':
        return Globe;
      case 'Smartphone':
        return Smartphone;
      case 'ShoppingCart':
        return ShoppingCart;
      default:
        return Zap;
    }
  };

  // Filter courses by category
  const filteredCourses = selectedCategory === 'All' 
    ? courses 
    : courses.filter(course => course.level === selectedCategory);

  // Animation properties for the course cards
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  // Get unique categories for filter
  const categories = ['All', ...Array.from(new Set(courses.map(course => course.level)))];

  if (loading) {
    return (
      <section id="courses" className="section bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Our Programs
            </p>
            <h2 className="section-title text-primary">
              Comprehensive Learning Paths
            </h2>
            <p className="section-subtitle text-secondary">
              Transform your skills with our industry-leading courses
            </p>
          </div>
          
          <div className="flex justify-center mb-10">
            <div className="inline-flex rounded-lg border border-default p-1 bg-surface">
              {categories.map((category) => (
                <button 
                  key={category}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    selectedCategory === category 
                      ? 'bg-primary-gradient text-white' 
                      : 'text-secondary hover:text-primary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div 
                key={item} 
                className="glass-card card p-6 animate-pulse"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700">
                    <div className="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>
                  <div className="text-sm px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
                </div>
                <div className="pt-4 mt-4 border-t border-default">
                  <div className="flex flex-wrap gap-2">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="courses" className="section bg-surface">
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
            Our Programs
          </p>
          <h2 className="section-title text-primary">
            Comprehensive Learning Paths
          </h2>
          <p className="section-subtitle text-secondary">
            Transform your skills with our industry-leading courses
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-lg border border-default p-1 bg-surface">
            {categories.map((category) => (
              <button 
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  selectedCategory === category 
                    ? 'bg-primary-gradient text-white' 
                    : 'text-secondary hover:text-primary hover:bg-default/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => {
            const IconComponent = getIconComponent(course.icon);
            return (
              <motion.div
                key={course.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: course.delay }}
                className="glass-card card group hover:shadow-card transition-all duration-300 flex flex-col"
              >
                <div className="flex justify-between items-start mb-4">
                  {/* Icon */}
                  <div className="p-3 rounded-lg bg-primary-gradient text-white">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  
                  {/* Level Badge */}
                  <div className={`text-xs px-3 py-1 rounded-full font-medium ${
                    course.level === 'Beginner' ? 'bg-green-500/20 text-green-500' :
                    course.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-500' :
                    'bg-red-500/20 text-red-500'
                  }`}>
                    {course.level}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 text-primary group-hover:text-accent transition-colors duration-300">
                  {course.title}
                </h3>
                <p className="text-secondary mb-6 flex-grow">
                  {course.description}
                </p>

                {/* Duration and Prerequisites */}
                <div className="mb-4">
                  <div className="text-sm text-accent mb-1">Duration: {course.duration}</div>
                  <div className="text-xs text-secondary">
                    <span className="font-medium">Prerequisites:</span> {course.prerequisites.join(', ')}
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-default">
                  {course.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary-gradient text-white text-xs font-medium rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-primary mb-4">Ready to Start Your Learning Journey?</h3>
          <p className="text-secondary max-w-2xl mx-auto mb-8">
            Choose from our diverse range of courses and start transforming your career today. Our expert instructors and practical curriculum ensure you gain real-world skills that employers value.
          </p>
          <a 
            href="/contact" 
            className="btn inline-flex items-center"
          >
            <BookOpen className="mr-2 h-5 w-5" />
            Enroll Now
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CoursesPage;