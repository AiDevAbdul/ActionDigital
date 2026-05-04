'use client';

import AnimatedPageWrapper from '@/components/AnimatedPageWrapper';
import { useState } from 'react';
import { ChevronDown, MessageCircle, Zap } from 'lucide-react';
import Link from 'next/link';

type FaqItem = { q: string; a: string };
type Category = { label: string; faqs: FaqItem[] };

const categories: Category[] = [
  {
    label: 'Enrollment & Admissions',
    faqs: [
      {
        q: 'How do I enroll in a course?',
        a: 'Enrollment is done via WhatsApp. Visit the course detail page and tap "Enroll via WhatsApp" — our admissions team will confirm your spot, share payment details, and add you to the student group.',
      },
      {
        q: 'Is there a minimum age or qualification requirement?',
        a: 'Most courses require only a computer and internet access. Some advanced courses (e.g. Agentic AI, Python) recommend prior exposure to basic computing or programming. Each course page lists any prerequisites.',
      },
      {
        q: 'Can I enroll in multiple courses at the same time?',
        a: 'Yes. If you have the time and commitment, you can enroll in multiple cohorts simultaneously. We recommend discussing this with the admissions team first to plan your schedule.',
      },
      {
        q: 'Do you offer corporate or group enrollment?',
        a: 'Yes. We offer group rates for teams of 5 or more. Contact us via WhatsApp or the contact form for a custom quote and scheduling.',
      },
    ],
  },
  {
    label: 'Courses & Curriculum',
    faqs: [
      {
        q: 'Are classes live or pre-recorded?',
        a: 'Most courses combine live Zoom sessions with LMS recordings. Live sessions allow real-time Q&A; recordings are uploaded within 24 hours for those who miss a session.',
      },
      {
        q: 'How long do I have access to recordings?',
        a: 'Lifetime access. Once enrolled, you can revisit all LMS recordings for that course at any time — even after the live cohort has ended.',
      },
      {
        q: 'Are the courses updated regularly?',
        a: 'Yes. AI and digital marketing evolve rapidly. We update curriculum content each cohort based on student feedback and industry changes.',
      },
      {
        q: 'What language are courses taught in?',
        a: 'Courses are delivered in Urdu/English (bilingual). Written materials and slides are in English.',
      },
    ],
  },
  {
    label: 'Payments & Refunds',
    faqs: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept bank transfer (Easypaisa, JazzCash, and direct bank deposit) and international transfers via Wise or USDT for overseas students. Details are shared during enrollment.',
      },
      {
        q: 'Can I pay in instalments?',
        a: 'Yes. Most courses support 2–3 instalment plans. Mention this when messaging the admissions team — they\'ll arrange a payment schedule before your first session.',
      },
      {
        q: 'What is the refund policy?',
        a: 'If you are unsatisfied after the first two sessions, you may request a full refund. After session 3, a 50% refund is available up to the halfway point of the course. No refunds are issued after the halfway mark.',
      },
      {
        q: 'Are there scholarships or discounts available?',
        a: 'We periodically offer early-bird discounts for new cohorts and need-based partial scholarships. Follow our social media channels or ask via WhatsApp to stay informed.',
      },
    ],
  },
  {
    label: 'Certificates & Career',
    faqs: [
      {
        q: 'Do I receive a certificate after completing a course?',
        a: 'Yes. A digital certificate of completion is issued to students who attend at least 80% of sessions and complete the final project. Certificates include the course name, date, and an instructor signature.',
      },
      {
        q: 'Are certificates internationally recognised?',
        a: 'Certificates are issued by Action Digital Institute. They are recognised by local employers and freelance clients. They are not yet accredited by a university body, but carry practical value in the industry.',
      },
      {
        q: 'Does Action Digital help with job placement?',
        a: 'We actively share job openings and freelance opportunities with our alumni community. We do not guarantee placement, but our network of hiring partners and active alumni group provide real career support.',
      },
      {
        q: 'Can I add the certificate to my LinkedIn profile?',
        a: 'Absolutely. The certificate includes all the fields required for LinkedIn\'s "Licenses & Certifications" section.',
      },
    ],
  },
  {
    label: 'Technical & Support',
    faqs: [
      {
        q: 'What software or tools do I need?',
        a: 'A laptop or desktop (Windows or Mac) with a stable internet connection. Most tools used in courses are free or have free tiers. Specific requirements are listed on each course page.',
      },
      {
        q: 'What if I miss a live session?',
        a: 'All live sessions are recorded and uploaded to the LMS within 24 hours. You can catch up at your own pace without falling behind.',
      },
      {
        q: 'How do I get help if I am stuck?',
        a: 'Each course has a dedicated WhatsApp student group where instructors and teaching assistants respond to questions. You can also book a 1-on-1 session with the instructor during office hours.',
      },
      {
        q: 'Is the LMS mobile-friendly?',
        a: 'Yes. The LMS is accessible on both mobile and desktop browsers. Dedicated mobile apps are on the roadmap.',
      },
    ],
  },
];

function AccordionItem({ q, a }: FaqItem) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/8 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white/4 hover:bg-white/6 transition-colors duration-200 min-h-[56px]"
        aria-expanded={open}
      >
        <span className="text-[#F1F5FF] font-medium text-sm md:text-base pr-4">{q}</span>
        <ChevronDown
          className={['text-[#8892A4] flex-shrink-0 transition-transform duration-300', open ? 'rotate-180' : ''].join(' ')}
          size={18}
        />
      </button>
      {open && (
        <div className="px-5 py-4 bg-[rgba(14,20,38,0.6)] border-t border-white/6">
          <p className="text-[#8892A4] text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FaqPage() {
  return (
    <AnimatedPageWrapper>
      <section className="min-h-screen bg-[#090D1A] py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          {/* Hero */}
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-widest rounded-full border text-[#EF7E2E] border-[rgba(239,126,46,0.30)] bg-[rgba(239,126,46,0.08)] mb-4">
              Help Centre
            </span>
            <h1
              className="font-heading font-bold text-[#F1F5FF] mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
            >
              Frequently Asked Questions
            </h1>
            <p className="text-[#8892A4] max-w-xl mx-auto leading-relaxed text-sm md:text-base">
              Everything you need to know about enrolling, paying, and succeeding at Action Digital Institute.
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-12">
            {categories.map((cat) => (
              <div key={cat.label}>
                <h2 className="text-[#EF7E2E] font-heading font-semibold text-sm uppercase tracking-widest mb-4 px-1">
                  {cat.label}
                </h2>
                <div className="space-y-2">
                  {cat.faqs.map((faq) => (
                    <AccordionItem key={faq.q} q={faq.q} a={faq.a} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Still have questions CTA */}
          <div className="mt-16 text-center p-8 rounded-2xl bg-white/4 border border-white/8">
            <h2 className="font-heading font-bold text-[#F1F5FF] text-xl md:text-2xl mb-3">
              Still have questions?
            </h2>
            <p className="text-[#8892A4] mb-6 text-sm">
              Our team responds within a few hours on WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/923189532843"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#EF7E2E] to-[#F5A623] shadow-[0_0_24px_rgba(239,126,46,0.25)] hover:shadow-[0_0_40px_rgba(239,126,46,0.40)] transition-shadow duration-300"
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-[#F1F5FF] bg-white/8 border border-white/14 hover:bg-white/12 transition-all duration-300"
              >
                <Zap size={16} />
                Send a Message
              </Link>
            </div>
          </div>

        </div>
      </section>
    </AnimatedPageWrapper>
  );
}
