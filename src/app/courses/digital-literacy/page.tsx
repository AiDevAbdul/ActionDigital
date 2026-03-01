'use client';

/* eslint-disable react/no-unescaped-entities */

import React from 'react';
import AnimatedPageWrapper from '@/components/AnimatedPageWrapper';
import Link from 'next/link';
import { ArrowRight, BookOpen, Users, Clock, Star, CheckCircle, Calendar, FileText, Award, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';

const DigitalLiteracyCoursePage = () => {
  const downloadPDF = () => {
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();

      // Set the title
      pdf.setFontSize(22);
      pdf.setTextColor(239, 126, 46); // Orange color matching primary theme
      pdf.text('16-Day Digital Literacy & AI Tools Course', pageWidth / 2, 20, { align: 'center' });

      // Add subtitle
      pdf.setFontSize(16);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Master essential digital skills and cutting-edge AI tools', pageWidth / 2, 30, { align: 'center' });

      // Add course overview
      pdf.setFontSize(14);
      pdf.text('Course Overview', 20, 45);

      const overviewText = 'This comprehensive 16-day course is designed to equip you with essential digital literacy skills and proficiency in modern AI tools that are transforming industries worldwide. Our curriculum combines foundational digital skills with cutting-edge AI applications to prepare you for the future.';
      const overviewLines = pdf.splitTextToSize(overviewText, pageWidth - 40);
      pdf.text(overviewLines, 20, 50);

      // Add course structure details
      let yPos = 65;
      pdf.text('Course Structure: This course spans four weeks (Monday to Thursday), providing intensive training in foundational digital skills, graphic/video design using Canva, and cutting-edge AI content creation.', 20, yPos);

      // Add what you'll learn
      yPos += 15;
      pdf.text('What You\'ll Learn:', 20, yPos);

      const learningPoints = [
        'Essential digital literacy skills including file management, web navigation, and software usage',
        'AI tools for productivity, content creation, data analysis, and automation',
        'Digital communication and collaboration tools for remote work and team projects',
        'Online safety, privacy protection, and digital citizenship best practices',
        'Introduction to Freelancing and Future-Proof Skills',
        'Self Learning Free Platforms and Resources'
      ];

      yPos += 10;
      learningPoints.forEach(point => {
        if (yPos > 280) { // If near bottom of page, add new page
          pdf.addPage();
          yPos = 20;
        }
        pdf.text(`• ${point}`, 25, yPos);
        yPos += 8;
      });

      // Add who should attend
      if (yPos > 280) {
        pdf.addPage();
        yPos = 20;
      }
      pdf.text('Who Should Attend:', 20, yPos + 10);

      const attendeePoints = [
        'Professionals looking to enhance their digital skills and stay competitive',
        'Students preparing for a digital future in their careers',
        'Entrepreneurs leveraging AI tools to grow their businesses',
        'Anyone seeking to improve their digital literacy for personal growth'
      ];

      yPos += 20;
      attendeePoints.forEach(point => {
        if (yPos > 280) { // If near bottom of page, add new page
          pdf.addPage();
          yPos = 20;
        }
        pdf.text(`• ${point}`, 25, yPos);
        yPos += 8;
      });

      // Add modules
      if (yPos > 280) {
        pdf.addPage();
        yPos = 20;
      }
      pdf.text('Course Modules:', 20, yPos + 10);

      const modules = [
        '1. Typing Fundamentals',
        '2. MS Word: Basic Documents & Email Setup',
        '3. MS Word: CV and Cover Letter Writing',
        '4. MS Excel: Introduction to Spreadsheets',
        '5. MS Excel: Data Analysis Basics',
        '6. Canva Graphics Designing (Basic)',
        '7. Canva Graphics: Advanced Design & Branding',
        '8. Canva Video Editing & Simple Motion',
        '9. MS PowerPoint: Presentation Polishing',
        '10. Introduction to AI & The Prompt Mindset',
        '11. Prompt Engineering 101: Structure',
        '12. AI for Research & Long-Form Writing',
        '13. AI for Learning, Practice & Languages',
        '14. Image Generation AI Tools (Basic & Advanced)',
        '15. AI Multimedia Creation (Audio & Video)',
        '16. Content Strategy, Personal Branding & Final Review'
      ];

      yPos += 20;
      modules.forEach(module => {
        if (yPos > 280) { // If near bottom of page, add new page
          pdf.addPage();
          yPos = 20;
        }
        pdf.text(module, 25, yPos);
        yPos += 8;
      });

      // Add course details
      if (yPos > 280) {
        pdf.addPage();
        yPos = 20;
      }
      pdf.text('Course Details:', 20, yPos + 10);

      const details = [
        'Duration: 16 Days',
        'Schedule: 4 Weeks',
        'Format: Online/Interactive',
        'Certificate: Available',
        'Rating: 4.9 (1250+ reviews)'
      ];

      yPos += 20;
      details.forEach(detail => {
        if (yPos > 280) { // If near bottom of page, add new page
          pdf.addPage();
          yPos = 20;
        }
        pdf.text(detail, 25, yPos);
        yPos += 8;
      });

      // Save the PDF
      pdf.save('digital-literacy-course-outline.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  // Detailed course structure from the provided content
  const weeks = [
    {
      number: 1,
      title: "Digital Foundations & Professional Documents",
      days: [
        {
          day: "Day 1 (Mon)",
          title: "Typing Fundamentals",
          topics: "Introduction to touch typing (Home Row), essential keyboard shortcuts (Ctrl+C, Ctrl+V, Ctrl+Z etc), Speed & accuracy tests. Ergonomics.",
          homework: "Practice typing for 30 minutes. Focus on high accuracy over speed."
        },
        {
          day: "Day 2 (Tue)",
          title: "MS Word: Basic Documents & Email Setup",
          topics: "Interface tour, text formatting, paragraphs, saving (.docx vs .pdf). Gmail account creation and setting up professional email signatures.",
          homework: "Create a one-page \"Digital Professionalism Guide\" document and set up your professional email signature in Gmail."
        },
        {
          day: "Day 3 (Wed)",
          title: "MS Word: CV and Cover Letter Writing",
          topics: "Using Headers & Footers, Page Numbers, basic Tables. Structuring an effective CV/Resume template and customizing a Cover Letter.",
          homework: "Create a basic, fully formatted CV template and a customizable Cover Letter template in MS Word."
        },
        {
          day: "Day 4 (Thu)",
          title: "MS Excel: Introduction to Spreadsheets",
          topics: "Interface tour, navigating cells, entering different data types, basic formulas (SUM, AVERAGE, COUNT). Formatting cells (currency style, borders).",
          homework: "Build a simple monthly budget planner. Use the SUM formula to calculate totals for different categories."
        }
      ],
      project: {
        title: "Weekly Project 1: The Personal Digital Report (Word, Excel & Email)",
        goal: "Combine basic skills to create a structured professional package.",
        task: "Create a short report on a career or educational goal.",
        components: [
          "Word: Write the report using proper formatting and page numbers.",
          "Excel: Create a simple spreadsheet estimating the cost or time required for the goal.",
          "Integration: Insert the Excel data table into the Word document, and email the final report (Word file) using your new professional Gmail account."
        ]
      }
    },
    {
      number: 2,
      title: "Design Mastery with Canva",
      days: [
        {
          day: "Day 5 (Mon)",
          title: "MS Excel: Data Analysis Basics",
          topics: "Relative and Absolute cell references ($), Introduction to Conditional Formatting, basic charts (Bar and Pie charts) for data visualization.",
          homework: "Use your budget planner from Day 4; use conditional formatting to highlight spending over budget, and create a Pie Chart showing category breakdown."
        },
        {
          day: "Day 6 (Tue)",
          title: "Canva Graphics Designing (Basic)",
          topics: "Canva interface tour, using templates, basic design principles (color, font pairing), creating social media posts and banners.",
          homework: "Create three different social media posts in Canva: one for Instagram (square), one for X/Twitter (wide), and one for a YouTube thumbnail."
        },
        {
          day: "Day 7 (Wed)",
          title: "Canva Graphics: Advanced Design & Branding",
          topics: "Working with layers, transparency, effects, removing backgrounds (theory), using Brand Kits (colors, logos), creating professional mockups.",
          homework: "Design a simple logo and a 3-piece brand kit (color palette, two font styles) for a fictional brand using Canva."
        },
        {
          day: "Day 8 (Thu)",
          title: "Canva Video Editing & Simple Motion",
          topics: "Video Editing: Basic cuts and trims, adding music/sound effects, working with stock footage, text overlay animation, and exporting video formats.",
          homework: "Create a 30-second short video clip using Canva, combining at least two video clips and animated text."
        }
      ],
      project: {
        title: "Weekly Project 2: Visual Storytelling Package (Excel, Canva & Presentation)",
        goal: "Present data and ideas using compelling visual tools.",
        task: "Use a dataset (e.g., a simple sales or survey data) to build a presentation.",
        components: [
          "Excel: Clean the data and create two different types of charts.",
          "Canva: Create the visual assets: an Infographic or main banner (Day 7) and a short video intro/outro (Day 8).",
          "PowerPoint: Build a 6-slide deck integrating the charts and the Canva visuals/video."
        ]
      }
    },
    {
      number: 3,
      title: "AI Fundamentals & Long-Form Content",
      days: [
        {
          day: "Day 9 (Mon)",
          title: "MS PowerPoint: Presentation Polishing",
          topics: "Effective use of Transitions and basic Animations, inserting video/audio, focusing on visual communication best practices.",
          homework: "Refine your Weekly Project 2 presentation, focusing on visual flow and delivery practice."
        },
        {
          day: "Day 10 (Tue)",
          title: "Introduction to AI & The Prompt Mindset",
          topics: "What is Generative AI? Ethical use and limitations, Identifying good use cases, The concept of a Prompt (Input = Output).",
          homework: "Find three examples of AI tools and write a short summary of how each works."
        },
        {
          day: "Day 11 (Wed)",
          title: "Prompt Engineering 101: Structure",
          topics: "The 4-part prompt: Role, Task, Context, Format. Iterative refinement (Prompt Tuning) and chain-of-thought prompting.",
          homework: "Write five prompts for five different tasks using the full 4-part structure."
        },
        {
          day: "Day 12 (Thu)",
          title: "AI for Research & Long-Form Writing",
          topics: "Using AI for complex web searches (Google Search Grounding), summarizing long documents, fact-checking principles. Using AI to outline, structure, and draft chapters for books or long reports.",
          homework: "Choose a complex topic. Use AI to generate a detailed 5-chapter outline for a short book on that topic."
        }
      ],
      project: {
        title: "Weekly Project 3: The AI-Powered Content Draft (AI & Word)",
        goal: "Execute a creative project leveraging AI for drafting and structural support.",
        task: "Write a 500-word informative or fictional piece.",
        components: [
          "AI Use: Use prompt engineering (Day 11) to generate the initial structure, character descriptions, or core facts. Use AI to refine the tone.",
          "Word: Structure and professionally format the 500-word final document.",
          "Image: Generate and insert a relevant AI-created image (Day 14 homework) as a visual aid within the document."
        ]
      }
    },
    {
      number: 4,
      title: "Advanced AI Applications & Global Skills",
      days: [
        {
          day: "Day 13 (Mon)",
          title: "AI for Learning, Practice & Languages",
          topics: "Using AI to generate personalized quizzes, explaining difficult concepts, creating study schedules. Using AI to practice conversation and translation for language learning.",
          homework: "Feed the AI a paragraph of text. Ask it to explain the text to a 5th grader and then translate it into a second language."
        },
        {
          day: "Day 14 (Tue)",
          title: "Image Generation AI Tools (Basic & Advanced)",
          topics: "Understanding Text-to-Image basics, key parameters (style, aspect ratio), negative prompting, vocabulary for visual description. Merged: Advanced Image Prompting (style transfer, consistency).",
          homework: "Use an AI tool to generate two different images of the same subject using distinct artistic styles and practice one advanced prompt modification technique."
        },
        {
          day: "Day 15 (Wed)",
          title: "AI Multimedia Creation (Audio & Video)",
          topics: "Audio Generation with AI (music, sound effects), Voice Editing with AI (cloning/cleanup), Overview of AI video tools (text-to-video), basics of storyboarding.",
          homework: "Use an AI tool to generate a 10-second piece of background music or a short voice clip with a specific emotion."
        },
        {
          day: "Day 16 (Thu)",
          title: "Content Strategy, Personal Branding & Final Review",
          topics: "Content Creation Basics (hook, value, CTA), Personal Branding essentials, Planning content calendars, Social media and YouTube growth strategies. Course Review & Final Project Showcase Prep.",
          homework: "Map out a 7-day content plan (including topics and platforms) for your personal brand or a fictional small business, and finalize Weekly Project 4 materials."
        }
      ],
      project: {
        title: "Weekly Project 4: The Personal Branding Multi-Media Pitch",
        goal: "Synthesize visual design, content strategy, audio/video AI, and presentation skills.",
        task: "Create a short (4-6 slide) pitch presentation defining your personal brand or a fictional brand/product.",
        components: [
          "Content: Define your brand's core message and target audience (Day 16).",
          "Visuals: Create a strong, branded visual identity for the presentation using Canva (Day 7) and/or AI images (Day 14).",
          "Audio: Include a sample AI-generated audio clip (voiceover or short jingle, Day 15) on one slide to enhance the pitch.",
          "Presentation: Present the pitch, detailing the strategy and use of the tools learned throughout the course."
        ]
      }
    }
  ];

  // Additional course content
  const additionalTopics = [
    "Introduction to Freelancing",
    "Selection of Future Proof Skills",
    "Self Learning Free Platforms"
  ];

  return (
    <AnimatedPageWrapper>
      <section className="section py-8 md:py-12 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <Link
                href="/courses"
                className="flex items-center text-accent font-medium hover:text-primary transition-colors text-sm md:text-base"
              >
                ← Back to All Courses
              </Link>

              <button
                onClick={downloadPDF}
                className="flex items-center gap-1 md:gap-2 bg-primary-gradient text-white font-medium py-2 px-3 md:px-4 rounded-full hover:shadow-glow transition-all text-sm"
              >
                <Download size={16} />
                <span className="hidden sm:inline">PDF</span>
              </button>
            </div>

            <div className="text-center mb-8 md:mb-12 px-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3 md:mb-4">16-Day Digital Literacy & AI Tools Course</h1>
              <p className="text-lg md:text-xl text-secondary max-w-3xl mx-auto px-4">
                Master essential digital skills and cutting-edge AI tools to thrive in the modern digital landscape
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 md:mb-12">
              <div className="lg:col-span-2">
                <div className="glass-card card h-full bg-card border border-default p-5 md:p-6 lg:p-8">
                  <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">Course Overview</h2>
                  <p className="text-secondary mb-4 md:mb-6">
                    This comprehensive 16-day course is designed to equip you with essential digital literacy skills
                    and proficiency in modern AI tools that are transforming industries worldwide. Our curriculum
                    combines foundational digital skills with cutting-edge AI applications to prepare you for the future.
                  </p>

                  <p className="text-secondary mb-4 text-sm md:text-base">
                    <span className="font-semibold">Course Structure:</span> This course spans four weeks (Monday to Thursday),
                    providing intensive training in foundational digital skills, graphic/video design using Canva,
                    and cutting-edge AI content creation.
                  </p>

                  <h3 className="text-lg md:text-xl font-bold text-primary mb-3 md:mb-4">What You'll Learn</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="text-accent mr-2 mt-1 flex-shrink-0" size={16} />
                      <span className="text-secondary text-sm md:text-base">Essential digital literacy skills including file management, web navigation, and software usage</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-accent mr-2 mt-1 flex-shrink-0" size={16} />
                      <span className="text-secondary text-sm md:text-base">AI tools for productivity, content creation, data analysis, and automation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-accent mr-2 mt-1 flex-shrink-0" size={16} />
                      <span className="text-secondary text-sm md:text-base">Digital communication and collaboration tools for remote work and team projects</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-accent mr-2 mt-1 flex-shrink-0" size={16} />
                      <span className="text-secondary text-sm md:text-base">Online safety, privacy protection, and digital citizenship best practices</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-accent mr-2 mt-1 flex-shrink-0" size={16} />
                      <span className="text-secondary text-sm md:text-base">Introduction to Freelancing and Future-Proof Skills</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-accent mr-2 mt-1 flex-shrink-0" size={16} />
                      <span className="text-secondary text-sm md:text-base">Self Learning Free Platforms and Resources</span>
                    </li>
                  </ul>

                  <h3 className="text-lg md:text-xl font-bold text-primary mb-3 md:mb-4">Who Should Attend</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <li className="flex items-start">
                      <CheckCircle className="text-accent mr-2 mt-1 flex-shrink-0" size={16} />
                      <span className="text-secondary text-sm md:text-base">Professionals looking to enhance their digital skills and stay competitive</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-accent mr-2 mt-1 flex-shrink-0" size={16} />
                      <span className="text-secondary text-sm md:text-base">Students preparing for a digital future in their careers</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-accent mr-2 mt-1 flex-shrink-0" size={16} />
                      <span className="text-secondary text-sm md:text-base">Entrepreneurs leveraging AI tools to grow their businesses</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-accent mr-2 mt-1 flex-shrink-0" size={16} />
                      <span className="text-secondary text-sm md:text-base">Anyone seeking to improve their digital literacy for personal growth</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="glass-card card bg-card border border-default p-5 md:p-6 lg:p-8 h-full">
                <div className="flex justify-center mb-4 md:mb-6">
                  <div className="bg-primary-gradient rounded-xl w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
                    <span className="text-white text-2xl md:text-3xl font-bold">DL</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                  <div className="bg-card p-3 rounded-lg border border-default">
                    <h3 className="font-semibold text-accent text-xs md:text-sm">Duration</h3>
                    <p className="text-primary text-sm md:text-base">16 Days</p>
                  </div>
                  <div className="bg-card p-3 rounded-lg border border-default">
                    <h3 className="font-semibold text-accent text-xs md:text-sm">Schedule</h3>
                    <p className="text-primary text-sm md:text-base">4 Weeks</p>
                  </div>
                  <div className="bg-card p-3 rounded-lg border border-default">
                    <h3 className="font-semibold text-accent text-xs md:text-sm">Format</h3>
                    <p className="text-primary text-sm md:text-base">Online/Interactive</p>
                  </div>
                  <div className="bg-card p-3 rounded-lg border border-default">
                    <h3 className="font-semibold text-accent text-xs md:text-sm">Certificate</h3>
                    <p className="text-primary text-sm md:text-base">Available</p>
                  </div>
                </div>

                <div className="mb-4 md:mb-6">
                  <h3 className="text-sm md:text-lg font-bold text-primary mb-2">Course Rating</h3>
                  <div className="flex items-center flex-wrap">
                    <div className="flex flex-wrap">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={i < 4.9 ? "text-yellow-500" : "text-secondary"}
                          fill={i < 4.9 ? "currentColor" : "none"}
                          size={16}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-secondary text-xs md:text-sm">4.9 (05 reviews)</span>
                  </div>
                </div>

                <a href="https://wa.me/923189532843" target="_blank" rel="noopener noreferrer" className="w-full bg-primary-gradient text-white font-medium py-2.5 px-4 rounded-full hover:shadow-glow transition-all mb-3 inline-block text-center text-sm">
                  Contact Us
                </a>

                <button className="w-full btn btn-secondary text-sm py-2.5">
                  Download Syllabus
                </button>
              </div>
            </div>

            <div className="glass-card card bg-card border border-default p-5 md:p-6 lg:p-8 mb-8 md:mb-12">
              <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 md:mb-6 text-center">Course Structure</h2>
              <div className="space-y-6 md:space-y-8">
                {weeks.map((week) => (
                  <div key={week.number} className="border border-default rounded-lg md:rounded-xl p-4 md:p-6 bg-card">
                    <h3 className="text-lg md:text-xl font-bold text-primary mb-3 flex items-center">
                      <Calendar className="mr-2 text-accent" size={16} />
                      Week {week.number}: {week.title}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                      {week.days.map((day, index) => (
                        <div key={index} className="p-3 md:p-4 bg-surface border border-default rounded-lg">
                          <div className="flex items-center mb-1.5">
                            <span className="font-bold text-accent mr-2 text-sm">{day.day}:</span>
                            <span className="font-semibold text-primary text-sm md:text-base">{day.title}</span>
                          </div>
                          <div className="mb-1.5">
                            <span className="text-xs md:text-sm font-medium text-secondary">Core Topics:</span>
                            <p className="text-xs md:text-sm text-secondary">{day.topics}</p>
                          </div>
                          <div>
                            <span className="text-xs md:text-sm font-medium text-secondary">Daily Homework:</span>
                            <p className="text-xs md:text-sm text-secondary">{day.homework}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 md:p-4 bg-surface border border-default rounded-lg">
                      <h4 className="font-bold text-primary mb-1.5 text-sm md:text-base">{week.project.title}</h4>
                      <p className="text-xs md:text-sm text-secondary mb-1"><span className="font-medium">Goal:</span> {week.project.goal}</p>
                      <p className="text-xs md:text-sm text-secondary mb-1.5"><span className="font-medium">Task:</span> {week.project.task}</p>
                      <div className="mt-1.5">
                        <span className="font-medium text-secondary text-xs md:text-sm">Components:</span>
                        <ul className="mt-1 space-y-1">
                          {week.project.components.map((component, idx) => (
                            <li key={idx} className="flex items-start text-xs md:text-sm">
                              <span className="text-accent mr-2">•</span>
                              <span className="text-secondary">{component}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card card bg-card border border-default p-5 md:p-6 lg:p-8 mb-8 md:mb-12">
              <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 md:mb-6 text-center">Additional Topics</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {additionalTopics.map((topic, index) => (
                  <div key={index} className="flex items-start p-2 md:p-3 bg-card rounded-lg border border-default">
                    <Award className="text-accent mr-2 mt-1 flex-shrink-0" size={16} />
                    <span className="text-secondary text-sm md:text-base">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary-gradient rounded-xl md:rounded-2xl shadow-xl p-6 md:p-8 text-white text-center">
              <h2 className="text-xl md:text-2xl font-bold mb-3">Enroll in the Course</h2>
              <p className="mb-4 md:mb-6 max-w-2xl mx-auto text-sm md:text-base">
                Join thousands of learners who have transformed their digital skills with our comprehensive course program.
                Start your journey to digital fluency today.
              </p>
              <a href="https://wa.me/923189532843" target="_blank" rel="noopener noreferrer" className="bg-white text-accent font-medium py-2.5 px-6 md:px-8 rounded-full hover:bg-card transition-colors inline-block text-sm">
                Contact via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </AnimatedPageWrapper>
  );
};

export default DigitalLiteracyCoursePage;
