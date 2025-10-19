'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { iconMap, tagStyles, Post } from '@/data/blogData';

export default function BlogPostContent({ post }: { post: Post }) {
  const Icon = iconMap[post.iconName];

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <Link
        href="/blog"
        className="text-accent hover:text-accent/80 transition-colors text-sm font-medium mb-8 inline-block"
      >
        ← Back to all articles
      </Link>

      {/* Post Header */}
      <motion.header
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10 border-b border-default pb-6 transition-colors duration-300"
      >
        <Icon className="h-10 w-10 text-accent mb-3" />
        <h1 className="text-4xl font-extrabold text-primary mb-2">
          {post.title}
        </h1>
        <p className="text-lg text-secondary">{post.excerpt}</p>
        <p className="text-sm mt-3 text-secondary">
          Published: {post.date}
        </p>
      </motion.header>

      {/* Post Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="prose prose-headings:text-primary prose-p:text-secondary prose-strong:text-primary prose-a:text-accent prose-img:rounded-lg max-w-none transition-colors duration-300 dark:prose-invert"
      >
        {post.slug === 'beginners-guide-web-development' && (
          <>
            <p className="text-lg leading-relaxed">
              Web development has evolved significantly over the past few years, and understanding the fundamentals is crucial for anyone looking to enter this field. This comprehensive guide will take you through the journey from basic HTML structure to building dynamic, interactive applications with React.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 text-accent">
              Understanding the Web Development Landscape
            </h2>
            
            <p>
              The modern web development landscape consists of multiple layers: front-end, back-end, and databases. Each layer has its own set of technologies and frameworks that work together to create web applications.
            </p>
            
            <p>
              HTML (HyperText Markup Language) provides the structure of web pages, CSS (Cascading Style Sheets) handles the presentation and styling, while JavaScript adds interactivity and dynamic behavior.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 text-accent">
              Modern JavaScript Frameworks
            </h2>
            
            <p>
              React, developed by Facebook, revolutionized how developers approach building user interfaces. With its component-based architecture, virtual DOM, and extensive ecosystem, React has become one of the most popular choices for building modern web applications.
            </p>
            
            <p>
              Understanding React requires mastering concepts like JSX, components, props, state, hooks, and the component lifecycle. These fundamentals will set the foundation for more advanced patterns and libraries.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 text-accent">
              Learning Path Recommendation
            </h2>
            
            <p>
              Start with HTML and CSS to understand web structure and styling. Then move to JavaScript fundamentals before transitioning to React. Practice by building small projects like todo apps, weather apps, and e-commerce components to solidify your understanding.
            </p>
          </>
        )}
        
        {post.slug === 'machine-learning-demystified' && (
          <>
            <p className="text-lg leading-relaxed">
              Machine Learning (ML) has become one of the most transformative technologies of our time. This post breaks down the complex concepts into digestible, practical applications you can implement in your own projects.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 text-accent">
              What is Machine Learning?
            </h2>
            
            <p>
              Machine Learning is a subset of artificial intelligence that enables computers to learn and make decisions from data without being explicitly programmed for every action. Instead of following static instructions, ML algorithms adapt to patterns in data.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 text-accent">
              Common ML Applications
            </h2>
            
            <p>
              From recommendation systems on Netflix to fraud detection in banking, ML powers many of the services we use daily. Understanding these real-world applications can provide insights into how you might implement ML in your own projects.
            </p>
            
            <p>
              Computer vision enables self-driving cars and facial recognition, while natural language processing powers virtual assistants like Siri and language translation services.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 text-accent">
              Getting Started with ML
            </h2>
            
            <p>
              Start with Python and libraries like scikit-learn and pandas. These tools provide a gentle introduction to ML concepts without getting bogged down in complex mathematical implementations initially.
            </p>
          </>
        )}
        
        {post.slug === 'digital-marketing-strategies-2025' && (
          <>
            <p className="text-lg leading-relaxed">
              The digital marketing landscape is constantly evolving, with new strategies, platforms, and technologies emerging every year. Understanding the trends that will shape 2025 is crucial for businesses looking to stay competitive.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 text-accent">
              AI-Powered Marketing
            </h2>
            
            <p>
              Artificial intelligence is revolutionizing how marketers approach customer personalization, content creation, and campaign optimization. AI can analyze vast amounts of consumer data to identify patterns and predict behavior.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 text-accent">
              Privacy-First Marketing
            </h2>
            
            <p>
              With increasing privacy regulations and changes to third-party cookies, marketers must adapt their strategies to rely more on first-party data and privacy-conscious approaches.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 text-accent">
              Video Content Dominance
            </h2>
            
            <p>
              Video content continues to dominate digital marketing channels. Short-form videos on platforms like TikTok and Instagram Reels are becoming increasingly important for brand visibility and engagement.
            </p>
          </>
        )}
        
        {post.slug === 'mobile-app-development-trends' && (
          <>
            <p className="text-lg leading-relaxed">
              Mobile app development is constantly evolving with new frameworks, tools, and paradigms. Staying updated with the latest trends is essential for developers and businesses looking to build successful mobile applications.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 text-accent">
              Cross-Platform Development
            </h2>
            
            <p>
              Frameworks like React Native, Flutter, and Xamarin are gaining popularity as they allow developers to write code once and deploy to multiple platforms, reducing development time and costs significantly.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 text-accent">
              Progressive Web Apps (PWAs)
            </h2>
            
            <p>
              PWAs bridge the gap between web and native applications, offering app-like experiences through web technologies. They work across devices and platforms without requiring installation from app stores.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 text-accent">
              UI/UX Innovations
            </h2>
            
            <p>
              The focus on user experience continues to grow, with trends like dark mode, gesture-based navigation, and micro-interactions becoming standard expectations for modern mobile apps.
            </p>
          </>
        )}
        
        {post.slug === 'cloud-computing-fundamentals' && (
          <>
            <p className="text-lg leading-relaxed">
              Cloud computing has fundamentally transformed how businesses deploy, manage, and scale their applications. Understanding the fundamentals of major cloud platforms is essential for modern IT professionals.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 text-accent">
              Cloud Service Models
            </h2>
            
            <p>
              Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS) represent different levels of abstraction and management in cloud computing. Understanding these models helps determine the right approach for specific projects.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 text-accent">
              Major Cloud Providers
            </h2>
            
            <p>
              Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP) dominate the cloud market. Each offers unique services and pricing models that cater to different business needs and technical requirements.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 text-accent">
              Benefits of Cloud Computing
            </h2>
            
            <p>
              Scalability, cost-effectiveness, global reach, and automatic updates are among the primary benefits of moving to cloud infrastructure. These advantages make cloud computing a strategic choice for businesses of all sizes.
            </p>
          </>
        )}
        
        {post.slug === 'data-analytics-career-path' && (
          <>
            <p className="text-lg leading-relaxed">
              The field of data analytics is experiencing unprecedented growth, with organizations increasingly relying on data to make strategic decisions. This post outlines the essential skills and career pathways in this growing field.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 text-accent">
              Essential Tools and Technologies
            </h2>
            
            <p>
              SQL remains the fundamental language for data querying, while Python and R are essential for advanced analytics. Familiarity with visualization tools like Tableau or Power BI is also crucial for effectively communicating insights.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 text-accent">
              Career Pathways
            </h2>
            
            <p>
              Data analytics offers various specialization tracks including business intelligence, data science, and machine learning engineering. Each path requires different combinations of technical and business skills.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 text-accent">
              Getting Started
            </h2>
            
            <p>
              Begin with SQL for data querying, then learn Python for data manipulation and visualization. Build a portfolio of projects, earn relevant certifications, and consider formal education or bootcamps to accelerate your career.
            </p>
          </>
        )}
        
        {!['beginners-guide-web-development', 'machine-learning-demystified', 'digital-marketing-strategies-2025', 'mobile-app-development-trends', 'cloud-computing-fundamentals', 'data-analytics-career-path'].includes(post.slug) && (
          <p className="text-lg leading-relaxed">
            This is the detailed content for <strong>{post.title}</strong>. 
            In production, this would be your Markdown or database content.
          </p>
        )}

        <h2 className="text-2xl font-semibold mt-10 text-accent">
          Technical Tags
        </h2>

        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => {
            // Use the tag-specific styles or default styles if the tag isn't defined
            const tagStyle = tagStyles[tag] || tagStyles['Default'];
            return (
              <span
                key={tag}
                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${tagStyle}`}
              >
                #{tag}
              </span>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}