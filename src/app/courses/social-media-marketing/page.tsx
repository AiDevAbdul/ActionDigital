'use client';

import React from 'react';
import AnimatedPageWrapper from '@/components/AnimatedPageWrapper';
import Link from 'next/link';
import { Star, CheckCircle, Award, Download, BookOpen } from 'lucide-react';
import { jsPDF } from 'jspdf';

const modules = [
  {
    number: 1,
    title: 'Marketing, Market Research & Personal Branding',
    goal: 'Build a solid foundation in marketing principles, research, and personal positioning.',
    topics: [
      'Core principles of modern marketing',
      'Understanding branding and its impact on business success',
      'Market research fundamentals: analyzing industries, products, and audiences',
      'Making strategies and marketing plans for different business goals',
      'Building your personal brand as a marketer',
      'Client hunting strategies: how to find and attract high-value clients',
      'Effective communication: how to deal with clients professionally',
      'Social media management as a service (overview and tools)',
      'Self-growth strategies: scaling your skills and career',
      'AI-powered tools for personal branding, research, and faster learning',
    ],
  },
  {
    number: 2,
    title: 'Business Setup on Meta Platforms',
    goal: 'Learn to create a professional advertising infrastructure on Facebook & Instagram.',
    topics: [
      'Understanding the Facebook ads ecosystem',
      'Creating and optimizing Facebook Pages for business',
      'Setting up personal ad accounts and payment methods',
      'Creating and managing Meta Business Manager',
      'Creating ad accounts inside Business Manager',
      'Understanding Ads Manager vs. Business Manager',
      'Installing and configuring MetaPixel for tracking and analytics',
      'Using Commerce Manager & Catalogs for e-commerce businesses',
    ],
  },
  {
    number: 3,
    title: 'Campaign Strategy & Creative Development',
    goal: 'Design high-performing ad campaigns and master creative strategies.',
    topics: [
      'Campaign, Ad Set, and Ad structure explained',
      'All ad objectives: Awareness, Reach, Traffic, Engagement, Leads, Sales',
      'Crafting powerful ad creatives: images, videos, and UGC',
      'Writing high-converting ad copy with AI tools for speed',
      'Budget strategy: setting, testing, and scaling ads',
      'Understanding the Facebook algorithm and ad frequency control',
      'Ad delivery optimization techniques',
      'Messages, Engagement, Traffic, Lead generation, and Carousel ads',
      'Instagram ads and cross-platform strategies',
      'Using Canva and AI design tools for faster creative production',
    ],
  },
  {
    number: 4,
    title: 'Advanced Targeting, Analytics & Problem Solving',
    goal: 'Learn precision targeting, troubleshoot ad issues, and measure results like a pro.',
    topics: [
      'Types of audiences: custom, lookalike, and saved audiences',
      'Detailed targeting & building strong interest-based targeting strategies',
      'Using Page Transparency and Facebook Ads Library for research',
      'Competitor analysis: finding winning ads and replicating success',
      'Understanding the Facebook ads auction and how to win bids',
      'Common issues: ad account disabled problems and rejected ads',
      'Crafting strategies for different business types and industries',
      'Facebook ad metrics and KPIs: what to track and why',
      'Marketing audits to evaluate performance',
    ],
  },
  {
    number: 5,
    title: 'Scaling, Productivity & Career Mastery',
    goal: 'Scale ad campaigns, manage clients professionally, and future-proof your career.',
    topics: [
      'E-commerce overview and sales funnels explained',
      'Scaling campaigns profitably without wasting ad spend',
      'Reporting best practices to maintain long-term clients',
      'Conducting marketing audits with AI and automation',
      'Using AI tools for time-saving workflows and higher productivity',
      'Career roadmap: becoming a high-demand digital marketer',
      'Self-learning frameworks to stay updated in the ever-changing ad industry',
      'Building a personal system to scale your skills, income, and network',
    ],
  },
];

const outcomes = [
  'Conduct market research and create winning marketing strategies',
  'Professionally set up and manage Meta Ads for any business',
  'Design high-performing campaigns with AI-powered efficiency',
  'Solve ad-related problems (disabled accounts, rejected ads, low performance)',
  'Manage clients, conduct audits, and report results confidently',
  'Build your own brand as a digital marketing expert',
  'Continuously scale your skills, income, and career path',
];

const whoShouldAttend = [
  'Aspiring digital marketers who want a job-ready skill set',
  'Entrepreneurs running or launching a business online',
  'Freelancers looking to offer Meta Ads as a professional service',
  'Marketing professionals upskilling for AI-powered workflows',
  'Students seeking a career in digital advertising',
];

export default function SocialMediaMarketingPage() {
  const downloadPDF = () => {
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();

      pdf.setFontSize(20);
      pdf.setTextColor(239, 126, 46);
      pdf.text('Mastering Digital Marketing with Meta Ads & AI', pageWidth / 2, 20, { align: 'center' });

      pdf.setFontSize(13);
      pdf.setTextColor(0, 0, 0);
      pdf.text('A Complete Professional Training Program', pageWidth / 2, 30, { align: 'center' });

      let yPos = 45;
      modules.forEach((mod) => {
        if (yPos > 260) { pdf.addPage(); yPos = 20; }
        pdf.setFontSize(13);
        pdf.setTextColor(99, 102, 241);
        pdf.text(`Module ${mod.number}: ${mod.title}`, 20, yPos);
        yPos += 7;
        pdf.setFontSize(10);
        pdf.setTextColor(60, 60, 60);
        mod.topics.forEach((t) => {
          if (yPos > 280) { pdf.addPage(); yPos = 20; }
          const lines = pdf.splitTextToSize(`• ${t}`, pageWidth - 45);
          pdf.text(lines, 28, yPos);
          yPos += lines.length * 6;
        });
        yPos += 5;
      });

      pdf.save('social-media-marketing-with-ai-course.pdf');
    } catch {
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <AnimatedPageWrapper>
      <section className="section py-8 md:py-12 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">

            {/* Top bar */}
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <Link href="/courses" className="flex items-center text-accent font-medium hover:text-primary transition-colors text-sm md:text-base">
                ← Back to All Courses
              </Link>
              <button onClick={downloadPDF} className="flex items-center gap-1 md:gap-2 bg-primary-gradient text-white font-medium py-2 px-3 md:px-4 rounded-full hover:shadow-glow transition-all text-sm">
                <Download size={16} />
                <span className="hidden sm:inline">PDF</span>
              </button>
            </div>

            {/* Hero */}
            <div className="text-center mb-8 md:mb-12 px-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3 md:mb-4">
                Mastering Digital Marketing with Meta Ads &amp; AI
              </h1>
              <p className="text-lg md:text-xl text-secondary max-w-3xl mx-auto">
                A complete professional training program covering Meta Ads strategy, AI-powered creative workflows, and career mastery
              </p>
            </div>

            {/* Overview + Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 md:mb-12">
              <div className="lg:col-span-2">
                <div className="glass-card card h-full bg-card border border-default p-5 md:p-6 lg:p-8">
                  <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">Course Overview</h2>
                  <p className="text-secondary mb-4">
                    This professional training program is designed for anyone who wants to become a high-demand digital marketer
                    using the world&apos;s most powerful advertising platform — Meta (Facebook &amp; Instagram). You&apos;ll learn not
                    just how to run ads, but how to think strategically, create compelling content, analyze data, and scale results
                    using AI-powered tools.
                  </p>
                  <p className="text-secondary mb-6 text-sm md:text-base">
                    <span className="font-semibold">Delivery:</span> Live sessions via Zoom with recordings available on the LMS, plus personalised mentorship throughout.
                  </p>

                  <h3 className="text-lg md:text-xl font-bold text-primary mb-3">What You&apos;ll Learn</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {outcomes.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="text-accent mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-secondary text-sm md:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-lg md:text-xl font-bold text-primary mb-3">Who Should Attend</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {whoShouldAttend.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="text-accent mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-secondary text-sm md:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="glass-card card bg-card border border-default p-5 md:p-6 lg:p-8 h-full">
                <div className="flex justify-center mb-4 md:mb-6">
                  <div className="bg-primary-gradient rounded-xl w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
                    <span className="text-white text-2xl md:text-3xl font-bold">MM</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                  {[
                    { label: 'Duration', value: '6 Weeks' },
                    { label: 'Modules', value: '5 Modules' },
                    { label: 'Format', value: 'Live / LMS' },
                    { label: 'Certificate', value: 'Available' },
                    { label: 'Level', value: 'Intermediate' },
                    { label: 'Mentorship', value: 'Personalised' },
                  ].map((item) => (
                    <div key={item.label} className="bg-card p-3 rounded-lg border border-default">
                      <h3 className="font-semibold text-accent text-xs md:text-sm">{item.label}</h3>
                      <p className="text-primary text-sm md:text-base">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mb-4 md:mb-6">
                  <h3 className="text-sm md:text-lg font-bold text-primary mb-2">Course Rating</h3>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-yellow-500" fill="currentColor" size={16} />
                    ))}
                    <span className="ml-2 text-secondary text-xs md:text-sm">4.8 (250+ students)</span>
                  </div>
                </div>

                <a href="https://wa.me/923189532843" target="_blank" rel="noopener noreferrer"
                  className="w-full bg-primary-gradient text-white font-medium py-2.5 px-4 rounded-full hover:shadow-glow transition-all mb-3 inline-block text-center text-sm">
                  Enroll via WhatsApp
                </a>
                <button onClick={downloadPDF} className="w-full btn btn-secondary text-sm py-2.5">
                  Download Syllabus
                </button>
              </div>
            </div>

            {/* Curriculum */}
            <div className="glass-card card bg-card border border-default p-5 md:p-6 lg:p-8 mb-8 md:mb-12">
              <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 md:mb-6 text-center">Course Curriculum</h2>
              <div className="space-y-6">
                {modules.map((mod) => (
                  <div key={mod.number} className="border border-default rounded-xl p-4 md:p-6 bg-card">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-primary-gradient flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">{mod.number}</span>
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-primary">Module {mod.number}: {mod.title}</h3>
                        <p className="text-accent text-sm mt-1"><span className="font-medium">Goal:</span> {mod.goal}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-11">
                      {mod.topics.map((topic, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <BookOpen className="text-accent mt-0.5 flex-shrink-0" size={14} />
                          <span className="text-secondary text-sm">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Outcomes */}
            <div className="glass-card card bg-card border border-default p-5 md:p-6 lg:p-8 mb-8 md:mb-12">
              <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 md:mb-6 text-center">Course Outcomes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {outcomes.map((item, i) => (
                  <div key={i} className="flex items-start p-3 bg-card rounded-lg border border-default">
                    <Award className="text-accent mr-2 mt-1 flex-shrink-0" size={16} />
                    <span className="text-secondary text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-primary-gradient rounded-xl md:rounded-2xl shadow-xl p-6 md:p-8 text-white text-center">
              <h2 className="text-xl md:text-2xl font-bold mb-3">Ready to Master Meta Ads?</h2>
              <p className="mb-4 md:mb-6 max-w-2xl mx-auto text-sm md:text-base">
                Join hundreds of marketers who have built profitable ad careers with our comprehensive Meta Ads &amp; AI program. Live sessions, LMS recordings, and personal mentorship included.
              </p>
              <a href="https://wa.me/923189532843" target="_blank" rel="noopener noreferrer"
                className="bg-white text-accent font-medium py-2.5 px-6 md:px-8 rounded-full hover:bg-card transition-colors inline-block text-sm">
                Contact via WhatsApp
              </a>
            </div>

          </div>
        </div>
      </section>
    </AnimatedPageWrapper>
  );
}
