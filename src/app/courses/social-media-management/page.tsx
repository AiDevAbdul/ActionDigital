'use client';

import React from 'react';
import AnimatedPageWrapper from '@/components/AnimatedPageWrapper';
import Link from 'next/link';
import { Star, CheckCircle, Award, Download, BookOpen } from 'lucide-react';
import { jsPDF } from 'jspdf';

const modules = [
  {
    number: 1,
    title: 'Social Media Landscape & Strategy',
    goal: 'Understand every major platform and how to build a strategy that drives real business results.',
    topics: [
      'Platform deep-dives: Instagram, Facebook, TikTok, LinkedIn, Twitter/X, YouTube Shorts',
      'Choosing the right platforms for different business types and target audiences',
      'Social media marketing vs. social media management: key differences',
      'The brand-audience relationship: building trust and community over time',
      'Setting SMART goals: reach, engagement, leads, sales, and brand awareness',
      'Competitive analysis: researching competitors and identifying content gaps',
      'Building a social media strategy document from scratch',
    ],
  },
  {
    number: 2,
    title: 'Content Creation & Visual Design',
    goal: 'Create compelling, on-brand content efficiently using professional tools and AI.',
    topics: [
      'Content pillars: educational, entertaining, promotional, and community content',
      'Canva mastery: templates, brand kits, animations, and social media formats',
      'CapCut for Reels and TikTok: cuts, transitions, text overlays, trending audio',
      'Graphic design principles: contrast, alignment, hierarchy, color psychology',
      'Photography basics: lighting, composition, and editing for social media',
      'AI content tools: generating captions, repurposing content, and speed workflows',
      'Batch content creation: producing 1 month of content in 1 day',
    ],
  },
  {
    number: 3,
    title: 'Content Planning & Calendar Management',
    goal: 'Build a repeatable content system that never runs dry and always posts on time.',
    topics: [
      'Building a 30-day content calendar for any niche',
      'Content batching and scheduling workflows',
      'Scheduling tools: Buffer, Later, Meta Business Suite, and Hootsuite',
      'Optimal posting times and frequency for each platform',
      'Content repurposing: turning one idea into 5 formats',
      'Trending topics: how to stay relevant without chasing every trend',
      'Managing multiple client accounts simultaneously',
    ],
  },
  {
    number: 4,
    title: 'Community Management & Engagement',
    goal: 'Build and nurture an active, loyal community that drives organic growth.',
    topics: [
      'Responding to comments, DMs, and mentions professionally and on-brand',
      'Engagement tactics: polls, Q&As, stories, live sessions, and challenges',
      'Managing negative feedback and online criticism effectively',
      'Building brand voice and tone guidelines for consistent communication',
      'Turning followers into advocates: user-generated content (UGC) strategies',
      'Influencer outreach: finding micro-influencers and managing collaborations',
      'Community moderation: setting rules and maintaining a safe, positive space',
    ],
  },
  {
    number: 5,
    title: 'Analytics, Insights & Reporting',
    goal: 'Turn platform data into actionable insights that improve performance over time.',
    topics: [
      'Key metrics for each platform: reach, impressions, engagement rate, saves, CTR',
      'Meta Business Suite Insights: reading and interpreting your analytics',
      'Instagram, TikTok, LinkedIn, and Twitter native analytics deep-dives',
      'Google Analytics for tracking social media traffic to your website',
      'Building professional monthly performance reports for clients',
      'A/B testing content: how to run experiments and interpret results',
      'Setting benchmarks and tracking growth over 30/60/90 day periods',
    ],
  },
  {
    number: 6,
    title: 'Paid Promotion & Ad Boosting Basics',
    goal: 'Amplify organic content with strategic paid promotion without overspending.',
    topics: [
      'Boosting posts vs. running proper ad campaigns: when to use each',
      'Setting up and running basic Meta boost campaigns',
      'Audience targeting for boosted posts: demographics, interests, and lookalikes',
      'Budget management: daily vs. lifetime budgets, testing with small spend',
      'Understanding ad metrics: CPC, CPM, CTR, ROAS basics',
      'Running promotions for product launches, events, and offers',
    ],
  },
  {
    number: 7,
    title: 'Brand Building & Storytelling',
    goal: 'Develop a strong, memorable brand presence across all social platforms.',
    topics: [
      'Personal branding vs. business branding on social media',
      'Developing a unique brand voice and visual identity',
      'Storytelling frameworks: hero, problem-solution, before-and-after',
      'Building authority and trust through consistent, valuable content',
      'Instagram Highlights and profile optimization for first impressions',
      'LinkedIn professional presence and thought leadership strategies',
      'YouTube channel branding and thumbnail design principles',
    ],
  },
  {
    number: 8,
    title: 'Crisis Communication & Reputation Management',
    goal: 'Protect and recover brand reputation when challenges arise online.',
    topics: [
      'Identifying a social media crisis before it escalates',
      'Crisis response framework: acknowledge, apologize, act, update',
      'Managing negative reviews, viral complaints, and PR situations',
      'Setting up Google Alerts and social listening for brand monitoring',
      'When to respond publicly vs. take conversations to DMs',
      'Rebuilding trust after a brand crisis with content strategy',
    ],
  },
  {
    number: 9,
    title: 'Tools, Automation & Workflow Efficiency',
    goal: 'Work smarter with the right stack of tools and automated workflows.',
    topics: [
      'The essential SMM tool stack: Canva, Buffer, Notion, Later, Google Analytics',
      'Zapier automations: connecting tools to auto-post, notify, and log',
      'AI writing tools for faster caption writing and content ideas (ChatGPT, Claude)',
      'Project management for social media: Trello, Notion, or Asana for client workflows',
      'Creating SOPs (Standard Operating Procedures) for every recurring task',
      'Time tracking and productivity for freelance SMM work',
    ],
  },
  {
    number: 10,
    title: 'Freelancing, Pricing & Career Development',
    goal: 'Launch or grow a successful social media management freelance career.',
    topics: [
      'Setting up your freelance social media management business',
      'Pricing strategies: retainer packages, hourly rates, and project pricing',
      'Client onboarding process: contracts, questionnaires, and strategy calls',
      'Building a portfolio with case studies that demonstrate real results',
      'Finding clients: Upwork, direct outreach, referrals, and LinkedIn',
      'Client communication, monthly reporting, and retention strategies',
      'Scaling from solo freelancer to agency: hiring and delegating',
    ],
  },
];

const outcomes = [
  'Manage social media accounts for any business type professionally',
  'Create a full 30-day content calendar with visuals and captions',
  'Design on-brand graphics and videos using Canva and CapCut',
  'Analyze performance metrics and produce client-ready reports',
  'Manage communities, handle crises, and grow organic engagement',
  'Run basic paid promotions and boosted post campaigns',
  'Onboard clients, set pricing, and deliver professional SMM services',
  'Use automation tools to manage multiple accounts efficiently',
];

export default function SocialMediaManagementPage() {
  const downloadPDF = () => {
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();

      pdf.setFontSize(20);
      pdf.setTextColor(239, 126, 46);
      pdf.text('Social Media Management', pageWidth / 2, 20, { align: 'center' });
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Complete Professional Training — 6 Weeks, 10 Modules', pageWidth / 2, 29, { align: 'center' });

      let yPos = 42;
      modules.forEach((mod) => {
        if (yPos > 255) { pdf.addPage(); yPos = 20; }
        pdf.setFontSize(13);
        pdf.setTextColor(239, 126, 46);
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
        yPos += 6;
      });

      pdf.save('social-media-management-course.pdf');
    } catch {
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <AnimatedPageWrapper>
      <section className="section py-8 md:py-12 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">

            <div className="flex justify-between items-center mb-6 md:mb-8">
              <Link href="/courses" className="flex items-center text-accent font-medium hover:text-primary transition-colors text-sm md:text-base">
                ← Back to All Courses
              </Link>
              <button onClick={downloadPDF} className="flex items-center gap-1 md:gap-2 bg-primary-gradient text-white font-medium py-2 px-3 md:px-4 rounded-full hover:shadow-glow transition-all text-sm">
                <Download size={16} />
                <span className="hidden sm:inline">PDF</span>
              </button>
            </div>

            <div className="text-center mb-8 md:mb-12 px-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3 md:mb-4">
                Social Media Management
              </h1>
              <p className="text-lg md:text-xl text-secondary max-w-3xl mx-auto">
                A complete professional training program covering content creation, community management, analytics, tools, and freelancing — everything to run social media for any brand
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 md:mb-12">
              <div className="lg:col-span-2">
                <div className="glass-card card h-full bg-card border border-default p-5 md:p-6 lg:p-8">
                  <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">Course Overview</h2>
                  <p className="text-secondary mb-4">
                    Social Media Management is one of the most in-demand digital skills in Pakistan and globally. This course
                    gives you everything you need to confidently manage social accounts for clients or your own business — from
                    strategy and content creation to analytics and client management.
                  </p>
                  <p className="text-secondary mb-6 text-sm md:text-base">
                    <span className="font-semibold">Format:</span> Live sessions with hands-on assignments after every module. Build a real portfolio during the course.
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
                    {[
                      'Beginners wanting to start a career in social media',
                      'Entrepreneurs managing their own business pages',
                      'Freelancers adding SMM to their service portfolio',
                      'Marketing students seeking practical skills',
                      'Small business owners tired of inconsistent posting',
                    ].map((item, i) => (
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
                    <span className="text-white text-2xl md:text-3xl font-bold">SM</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                  {[
                    { label: 'Duration', value: '6 Weeks' },
                    { label: 'Modules', value: '10 Modules' },
                    { label: 'Format', value: 'Live / LMS' },
                    { label: 'Certificate', value: 'Available' },
                    { label: 'Level', value: 'Beginner+' },
                    { label: 'Portfolio', value: 'Included' },
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
                      <Star key={i} className={i < 4 ? 'text-yellow-500' : 'text-secondary'} fill={i < 4 ? 'currentColor' : 'none'} size={16} />
                    ))}
                    <span className="ml-2 text-secondary text-xs md:text-sm">4.6 (1,100+ students)</span>
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
              <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 md:mb-6 text-center">10-Module Curriculum</h2>
              <div className="space-y-5">
                {modules.map((mod) => (
                  <div key={mod.number} className="border border-default rounded-xl p-4 md:p-6 bg-card">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-primary-gradient flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">{mod.number}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-primary">Module {mod.number}: {mod.title}</h3>
                        <p className="text-accent text-sm mt-0.5">{mod.goal}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-11">
                      {mod.topics.map((topic, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <BookOpen className="text-accent mt-0.5 flex-shrink-0" size={13} />
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

            <div className="bg-primary-gradient rounded-xl md:rounded-2xl shadow-xl p-6 md:p-8 text-white text-center">
              <h2 className="text-xl md:text-2xl font-bold mb-3">Start Managing Social Media Professionally</h2>
              <p className="mb-4 md:mb-6 max-w-2xl mx-auto text-sm md:text-base">
                Join 1,100+ students who have built social media careers with our comprehensive management training. Get certified and start earning.
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
