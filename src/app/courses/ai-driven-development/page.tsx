'use client';

import React from 'react';
import AnimatedPageWrapper from '@/components/AnimatedPageWrapper';
import Link from 'next/link';
import { Star, CheckCircle, Award, Download, BookOpen } from 'lucide-react';
import { jsPDF } from 'jspdf';

const chapters = [
  {
    number: 12,
    title: 'The AI Agent Factory Paradigm',
    goal: 'Establish conceptual foundations and the business case for AI-native development.',
    lessons: [
      { label: 'Lessons 1–3: Foundational Concepts', topics: ['Evidence of the 2025 AI inflection point (ICPC scores, 84% developer adoption)', 'Three core LLM operational constraints: statelessness, probabilistic outputs, context limits', 'OODA Loop evolution from coder to orchestrator role'] },
      { label: 'Lessons 4–5: Technical Architecture', topics: ['Five Powers enabling autonomous agents: See, Hear, Reason, Act, Remember', 'Three-layer AI development stack', 'AIFF standards ecosystem (MCP, AGENTS.md, Agent Skills)'] },
      { label: 'Lessons 6–10: Business & Strategy', topics: ['Digital FTE business model and monetization', 'Nine pillars of AI-Driven Development', 'Spec-Driven Development methodology', 'Enterprise sales strategies for the $100–400 billion market'] },
    ],
  },
  {
    number: 13,
    title: 'Markdown — Writing Instructions for AI',
    goal: 'Master technical communication fundamentals required to direct AI agents effectively.',
    lessons: [
      { label: 'Core Topics', topics: ['Headings, lists, and nested structures', 'Code blocks and inline code formatting', 'Links, images, and tables', 'Writing clear AGENTS.md and SKILL.md documentation', 'Best practices for AI-readable instruction files'] },
    ],
  },
  {
    number: 14,
    title: 'General Agents — Claude Code & Cowork',
    goal: 'Set up and operate production-grade AI agents using Claude Code and Cowork workflows.',
    lessons: [
      { label: 'Setup & Configuration', topics: ['Claude Code CLI installation and configuration', 'CLAUDE.md persistent project context', 'MCP server integration and compilation'] },
      { label: 'Workflow & Automation', topics: ['Claude Cowork desktop workflows with Chrome automation', 'Google Workspace, Notion, and Slack connectors', 'Building repeatable agent pipelines for real tasks'] },
    ],
  },
  {
    number: 15,
    title: 'Effective Context Engineering',
    goal: 'Apply quality-control discipline to agent context for reliable, consistent outputs.',
    lessons: [
      { label: 'Core Topics', topics: ['Context quality assessment framework', 'The U-shaped attention curve and why position matters', 'Position sensitivity research and practical implications', 'Multi-agent coordination and handoff patterns', 'Designing prompts that survive context compression'] },
    ],
  },
  {
    number: 16,
    title: 'Spec-Driven Development',
    goal: "Move from conversational 'vibe coding' to rigorous specifications-first methodology.",
    lessons: [
      { label: 'Core Topics', topics: ['Why specs before code reduces rework and hallucination', 'Writing effective feature specifications for agents', 'Memory systems: persistent context across sessions', 'Task orchestration and dependency management', 'Review and validation workflows'] },
    ],
  },
  {
    number: 17,
    title: 'Seven Principles of General Agent Problem Solving',
    goal: 'Internalize a principled framework for safe, reliable agent task execution.',
    lessons: [
      { label: 'The Seven Principles', topics: ['Principle 1 — Bash is the Key: leverage the shell as a universal tool', 'Principle 2 — Code as Universal Interface', 'Principle 3 — Verification as Core Step', 'Principle 4 — Small Reversible Decomposition', 'Principle 5 — Persisting State in Files', 'Principle 6 — Constraints and Safety', 'Principle 7 — Observability: logging and traceability'] },
    ],
  },
  {
    number: 18,
    title: 'Claude Code for Teams, CI/CD & Advanced Configuration',
    goal: 'Deploy AI-driven development practices across teams and production pipelines.',
    lessons: [
      { label: 'Team & Production', topics: ['Team workflow patterns with shared CLAUDE.md', 'Continuous integration patterns with Claude Code', 'Production deployment strategies', 'Advanced MCP configurations for enterprise environments', 'Security, permissions, and audit trails'] },
    ],
  },
];

const outcomes = [
  'Cite inflection point evidence with concrete data and articulate why AI changes development',
  'Distinguish General from Custom Agents and choose the right approach',
  'Explain and apply the Five Powers framework in real projects',
  'Navigate and implement AIFF standards (MCP, AGENTS.md, Agent Skills)',
  'Execute Spec-Driven Development workflows from requirements to deployment',
  'Apply all seven problem-solving principles in agent task design',
  'Design monetization strategies using the Digital FTE model',
  'Sell AI-driven development solutions to enterprise customers',
  'Build production-grade agent pipelines with Claude Code and Cowork',
];

const whoShouldAttend = [
  'Software developers ready to lead in the AI-native era',
  'Technical leads and engineering managers adopting AI workflows',
  'Freelancers and consultants offering AI development services',
  'Entrepreneurs building AI-powered products and automations',
  'Recent CS graduates seeking competitive differentiation',
];

export default function AIDrivenDevelopmentPage() {
  const downloadPDF = () => {
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();

      pdf.setFontSize(20);
      pdf.setTextColor(99, 102, 241);
      pdf.text('AI Driven Development', pageWidth / 2, 20, { align: 'center' });

      pdf.setFontSize(13);
      pdf.setTextColor(0, 0, 0);
      pdf.text('General Agents Foundations — The AI Agent Factory', pageWidth / 2, 30, { align: 'center' });

      let yPos = 45;
      chapters.forEach((ch) => {
        if (yPos > 260) { pdf.addPage(); yPos = 20; }
        pdf.setFontSize(13);
        pdf.setTextColor(99, 102, 241);
        pdf.text(`Chapter ${ch.number}: ${ch.title}`, 20, yPos);
        yPos += 7;
        pdf.setFontSize(10);
        pdf.setTextColor(60, 60, 60);
        ch.lessons.forEach((lesson) => {
          if (yPos > 275) { pdf.addPage(); yPos = 20; }
          pdf.setFontSize(11);
          pdf.setTextColor(40, 40, 40);
          pdf.text(lesson.label, 24, yPos);
          yPos += 6;
          pdf.setFontSize(10);
          pdf.setTextColor(80, 80, 80);
          lesson.topics.forEach((t) => {
            if (yPos > 280) { pdf.addPage(); yPos = 20; }
            const lines = pdf.splitTextToSize(`• ${t}`, pageWidth - 50);
            pdf.text(lines, 30, yPos);
            yPos += lines.length * 6;
          });
          yPos += 3;
        });
        yPos += 5;
      });

      pdf.save('ai-driven-development-course.pdf');
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
                AI Driven Development
              </h1>
              <p className="text-lg md:text-xl text-secondary max-w-3xl mx-auto">
                Master the AI Agent Factory paradigm — from foundational concepts to enterprise-grade agent pipelines using Claude Code, MCP, and Spec-Driven Development
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 md:mb-12">
              <div className="lg:col-span-2">
                <div className="glass-card card h-full bg-card border border-default p-5 md:p-6 lg:p-8">
                  <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">Course Overview</h2>
                  <p className="text-secondary mb-4">
                    The AI Agent Factory program teaches AI-native software development through a paradigm shift: treating
                    General Agents as thinking partners and Custom Agents as deployed solutions. You will learn to orchestrate
                    AI tools, write clear specifications, and build production-ready pipelines — not just prompt ChatGPT.
                  </p>
                  <p className="text-secondary mb-6 text-sm md:text-base">
                    <span className="font-semibold">Approach:</span> Seven structured chapters with embedded &quot;Try With AI&quot; practical
                    applications. Theory is grounded in immediate, domain-specific practice throughout.
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
                    <span className="text-white text-2xl md:text-3xl font-bold">AI</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                  {[
                    { label: 'Duration', value: '10 Weeks' },
                    { label: 'Chapters', value: '7 Chapters' },
                    { label: 'Format', value: 'Online / Live' },
                    { label: 'Certificate', value: 'Available' },
                    { label: 'Level', value: 'Intermediate+' },
                    { label: 'Prerequisites', value: 'Basic coding' },
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
                    <span className="ml-2 text-secondary text-xs md:text-sm">4.7 (30+ students)</span>
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
                {chapters.map((ch) => (
                  <div key={ch.number} className="border border-default rounded-xl p-4 md:p-6 bg-card">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-9 h-9 rounded-full bg-primary-gradient flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">{ch.number}</span>
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-primary">Chapter {ch.number}: {ch.title}</h3>
                        <p className="text-accent text-sm mt-1">{ch.goal}</p>
                      </div>
                    </div>
                    <div className="space-y-4 ml-12">
                      {ch.lessons.map((lesson, li) => (
                        <div key={li}>
                          <p className="font-semibold text-secondary text-sm mb-2">{lesson.label}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {lesson.topics.map((topic, ti) => (
                              <div key={ti} className="flex items-start gap-2">
                                <BookOpen className="text-accent mt-0.5 flex-shrink-0" size={13} />
                                <span className="text-secondary text-sm">{topic}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Outcomes */}
            <div className="glass-card card bg-card border border-default p-5 md:p-6 lg:p-8 mb-8 md:mb-12">
              <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 md:mb-6 text-center">Learning Outcomes</h2>
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
              <h2 className="text-xl md:text-2xl font-bold mb-3">Lead the AI Development Revolution</h2>
              <p className="mb-4 md:mb-6 max-w-2xl mx-auto text-sm md:text-base">
                The question isn&apos;t whether AI will change development — it&apos;s whether you&apos;ll lead or follow. Enroll now and master the AI Agent Factory methodology.
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
