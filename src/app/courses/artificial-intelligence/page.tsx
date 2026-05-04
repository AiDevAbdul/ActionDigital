'use client';

import React from 'react';
import AnimatedPageWrapper from '@/components/AnimatedPageWrapper';
import Link from 'next/link';
import { Star, CheckCircle, Award, Download, BookOpen } from 'lucide-react';
import { jsPDF } from 'jspdf';

const sections = [
  {
    number: 'I',
    title: 'Foundations of Enterprise Agentic AI',
    chapters: 'Chapters 25–27',
    goal: 'Establish the strategic and architectural foundation for deploying AI agents in enterprise environments.',
    topics: [
      'Enterprise Agentic Landscape 2026 — strategic overview and opportunity map',
      'Enterprise Agent Blueprint & PQP (Plan-Queue-Process) Framework',
      'Knowledge Extraction Methodology — turning institutional knowledge into agent assets',
      'Platform comparison: Cowork vs. Frontier and when to use each',
      'SKILL.md file authoring and MCP connector architecture',
      'Governance layers, audit trails, and enterprise compliance guardrails',
      'Tacit knowledge transformation: encoding expert judgment into reusable agents',
    ],
  },
  {
    number: 'II',
    title: 'The Office of the CFO — Finance Domain Agents',
    chapters: 'Chapters 28–32',
    goal: 'Build and deploy AI agents that automate core finance workflows while preserving professional judgment.',
    topics: [
      'Finance Domain Agents: financial statements, DCF valuation, and variance analysis',
      'Intent-Driven Financial Architecture — designing finance agents around CFO intent',
      'CA/CPA Practice Transformation — audit workflows, tax provision, and compliance automation',
      'Islamic Finance agents: 26 SKILL.md files covering Murabaha, Sukuk, and 7 jurisdictions',
      'Banking AI: IFRS 9 credit loss modeling, Basel III/IV capital adequacy',
      'AML transaction monitoring and regulatory reporting automation',
      'Professional ethics: when agents execute and when qualified accountants must decide',
    ],
  },
  {
    number: 'III',
    title: 'Legal & Compliance Operations',
    chapters: 'Chapter 33',
    goal: 'Automate legal operations while maintaining strict professional and regulatory boundaries.',
    topics: [
      'Contract Lifecycle Management: drafting, review, negotiation, and renewal',
      'IP protection workflows and automated regulatory monitoring',
      'Risk tracking, audit readiness, and compliance documentation',
      'Governance escalation: "Certain decisions must always involve a qualified attorney"',
      'Cross-jurisdictional compliance overlays and jurisdiction-specific agent configurations',
    ],
  },
  {
    number: 'IV',
    title: 'The Growth Engine — Sales, RevOps & Marketing',
    chapters: 'Chapter 34',
    goal: "Apply the 10-80-10 rhythm to democratise top-performer capabilities across revenue teams.",
    topics: [
      'Prospecting agents and automated lead scoring',
      'CRM enrichment and personalised outreach at scale',
      'Campaign optimization and pipeline forecasting',
      'RevOps automation: handoffs, attribution, and reporting',
      'Philosophy: "AI democratises top-performer capabilities across teams"',
    ],
  },
  {
    number: 'V',
    title: 'Product & Value Chain',
    chapters: 'Chapters 35–36',
    goal: 'Automate supply chain, procurement, and product management workflows with AI agents.',
    topics: [
      'Vendor management and purchase order reconciliation',
      'Logistics optimization and demand forecasting',
      'Feature specification and roadmap prioritization with AI assistance',
      'User research synthesis and product decision support',
      'Integrating supply chain agents with finance and operations layers',
    ],
  },
  {
    number: 'VI',
    title: 'People & Efficiency — HR and Operations',
    chapters: 'Chapters 37–39',
    goal: 'Deploy AI agents to transform HR, operations, and workplace productivity.',
    topics: [
      'Onboarding automation and institutional memory preservation',
      'Process documentation and standard operating procedure generation',
      'Compliance tracking for HR regulations and labour law',
      'Cross-domain orchestration: connecting HR agents with finance and legal',
      'Productivity & the Agentic Office: building a workplace memory layer',
    ],
  },
  {
    number: 'VII',
    title: 'Innovation Lab — Intrapreneurship & Lean AI',
    chapters: 'Chapter 40',
    goal: 'Synthesise all domain agents into a unified innovation and intrapreneurship capability.',
    topics: [
      'Lean Startup AI integration: hypothesis → build → measure → learn',
      'Design Thinking and Agile acceleration with AI agents',
      'Business plan drafting and investor pitch preparation',
      'Combining finance, legal, marketing, and operations agents for end-to-end innovation',
      'Building reusable agent portfolios that scale across the organization',
    ],
  },
];

const outcomes = [
  'Design and deploy enterprise-grade AI agents across all major business domains',
  'Build SKILL.md libraries that encode professional expertise into scalable agent assets',
  'Apply the 10-80-10 rhythm: agents execute, professionals judge critical decisions',
  'Implement governance and escalation frameworks that satisfy enterprise risk standards',
  'Automate finance, legal, HR, marketing, and operations workflows end-to-end',
  'Configure jurisdiction-specific overlays for Islamic finance and international compliance',
  'Orchestrate multi-domain agents into cohesive enterprise intelligence systems',
  'Lead AI transformation initiatives as a domain expert or AI engineer',
];

const audiences = [
  'Subject Matter Experts encoding professional judgment into SKILL.md libraries',
  'AI Engineers & Developers building enterprise-grade, compliant systems',
  'Executive Leaders navigating safe AI deployment and governance',
  'Product Managers mapping enterprise functions to agent workflows',
  'Banking & Finance professionals specializing in Islamic finance or regulatory AI',
  'Senior Operational Leaders looking to productize their expertise',
];

export default function ArtificialIntelligencePage() {
  const downloadPDF = () => {
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();

      pdf.setFontSize(20);
      pdf.setTextColor(99, 102, 241);
      pdf.text('Agentic AI — Business Domain Agent Workflows', pageWidth / 2, 18, { align: 'center' });
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Building for the Enterprise', pageWidth / 2, 27, { align: 'center' });

      let yPos = 40;
      sections.forEach((sec) => {
        if (yPos > 255) { pdf.addPage(); yPos = 20; }
        pdf.setFontSize(13);
        pdf.setTextColor(99, 102, 241);
        pdf.text(`Section ${sec.number}: ${sec.title} (${sec.chapters})`, 20, yPos);
        yPos += 7;
        pdf.setFontSize(10);
        pdf.setTextColor(60, 60, 60);
        sec.topics.forEach((t) => {
          if (yPos > 280) { pdf.addPage(); yPos = 20; }
          const lines = pdf.splitTextToSize(`• ${t}`, pageWidth - 45);
          pdf.text(lines, 28, yPos);
          yPos += lines.length * 6;
        });
        yPos += 6;
      });

      pdf.save('agentic-ai-business-domain-workflows.pdf');
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
                Agentic AI: Business Domain Agent Workflows
              </h1>
              <p className="text-lg md:text-xl text-secondary max-w-3xl mx-auto">
                Deploy AI agents across every enterprise function — finance, legal, marketing, HR, and operations — using the 10-80-10 framework: humans judge, agents execute
              </p>
            </div>

            {/* Core Principle Banner */}
            <div className="bg-card border border-default rounded-xl p-4 md:p-6 mb-8 text-center">
              <p className="text-lg font-semibold text-primary mb-1">&ldquo;AI Executes, Professionals Judge&rdquo;</p>
              <p className="text-secondary text-sm">The 10-80-10 Rhythm: Humans set intent &amp; constraints (10%) → Agents execute (80%) → Professionals verify &amp; decide (10%)</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 md:mb-12">
              <div className="lg:col-span-2">
                <div className="glass-card card h-full bg-card border border-default p-5 md:p-6 lg:p-8">
                  <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">Course Overview</h2>
                  <p className="text-secondary mb-4">
                    This advanced program covers 16 chapters across 7 sections, teaching you how to deploy AI agents into
                    real enterprise business functions. Unlike toy demos, every exercise is scoped for single-day completion
                    with direct organizational deployment potential.
                  </p>
                  <p className="text-secondary mb-6 text-sm md:text-base">
                    <span className="font-semibold">Output:</span> Production-ready agent configurations, validated SKILL.md libraries, and jurisdiction-specific overlays — not just theory.
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
                    {audiences.map((item, i) => (
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
                    <span className="text-white text-2xl md:text-3xl font-bold">AG</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                  {[
                    { label: 'Duration', value: '12 Weeks' },
                    { label: 'Chapters', value: '16 Chapters' },
                    { label: 'Sections', value: '7 Sections' },
                    { label: 'Certificate', value: 'Available' },
                    { label: 'Level', value: 'Advanced' },
                    { label: 'Format', value: 'Online / LMS' },
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
                    <span className="ml-2 text-secondary text-xs md:text-sm">4.9 (50+ students)</span>
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
              <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 md:mb-6 text-center">Course Curriculum — 7 Sections, 16 Chapters</h2>
              <div className="space-y-6">
                {sections.map((sec) => (
                  <div key={sec.number} className="border border-default rounded-xl p-4 md:p-6 bg-card">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-9 h-9 rounded-full bg-primary-gradient flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">{sec.number}</span>
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-primary">Section {sec.number}: {sec.title}</h3>
                        <p className="text-accent text-xs mt-0.5">{sec.chapters}</p>
                        <p className="text-secondary text-sm mt-1">{sec.goal}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-12">
                      {sec.topics.map((topic, i) => (
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

            {/* Curriculum Threads */}
            <div className="glass-card card bg-card border border-default p-5 md:p-6 lg:p-8 mb-8 md:mb-12">
              <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 md:mb-6 text-center">Unifying Curriculum Threads</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { title: 'SKILL.md Accumulation', desc: 'Build a growing domain knowledge library of agent configurations deployable immediately in real organizations.' },
                  { title: 'Governance Escalation', desc: 'Learn precise boundaries between agent execution and professional judgment — the 10-80-10 framework applied consistently.' },
                  { title: 'Integration Architecture', desc: 'Each section is designed to interoperate — finance agents connect to legal, legal connects to HR, and so on.' },
                ].map((thread) => (
                  <div key={thread.title} className="flex items-start p-3 bg-card rounded-lg border border-default">
                    <Award className="text-accent mr-2 mt-1 flex-shrink-0" size={16} />
                    <div>
                      <p className="font-semibold text-primary text-sm">{thread.title}</p>
                      <p className="text-secondary text-xs mt-1">{thread.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary-gradient rounded-xl md:rounded-2xl shadow-xl p-6 md:p-8 text-white text-center">
              <h2 className="text-xl md:text-2xl font-bold mb-3">Deploy AI Across Your Entire Enterprise</h2>
              <p className="mb-4 md:mb-6 max-w-2xl mx-auto text-sm md:text-base">
                Stop experimenting. Start deploying. Build production-ready agent systems that transform every department — with governance, compliance, and professional standards built in.
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
