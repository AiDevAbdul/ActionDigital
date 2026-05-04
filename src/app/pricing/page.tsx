import AnimatedPageWrapper from '@/components/AnimatedPageWrapper';
import { CheckCircle, X, Zap, Star, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Transparent course pricing for Action Digital Institute. Choose from individual courses, skill bundles, or full program access.',
  alternates: { canonical: '/pricing' },
};

const plans = [
  {
    id: 'starter',
    name: 'Single Course',
    tagline: 'Start with one skill',
    priceLabel: 'From',
    price: 'PKR 15,000',
    period: 'per course',
    highlight: false,
    badge: null,
    description: 'Pick any one course and get full access to the curriculum, LMS recordings, and a certificate of completion.',
    features: [
      { text: '1 course of your choice', included: true },
      { text: 'LMS access & recordings', included: true },
      { text: 'Certificate of completion', included: true },
      { text: 'WhatsApp support group', included: true },
      { text: 'Lifetime access to content', included: true },
      { text: 'Personalised mentorship', included: false },
      { text: 'Course bundle discount', included: false },
      { text: 'Priority enrollment', included: false },
    ],
    cta: 'Enroll via WhatsApp',
    ctaHref: 'https://wa.me/923189532843?text=Hi%2C%20I%20want%20to%20enroll%20in%20a%20single%20course.',
    ctaStyle: 'secondary',
  },
  {
    id: 'professional',
    name: 'Skill Bundle',
    tagline: 'Best for career changers',
    priceLabel: 'From',
    price: 'PKR 35,000',
    period: 'for 3 courses',
    highlight: true,
    badge: 'Most Popular',
    description: 'Choose any 3 courses and save over 20%. Ideal for building a complete professional skill set in one go.',
    features: [
      { text: '3 courses of your choice', included: true },
      { text: 'LMS access & recordings', included: true },
      { text: 'Certificate for each course', included: true },
      { text: 'WhatsApp support group', included: true },
      { text: 'Lifetime access to content', included: true },
      { text: 'Personalised mentorship (2 sessions)', included: true },
      { text: 'Over 20% bundle savings', included: true },
      { text: 'Priority enrollment', included: false },
    ],
    cta: 'Enroll via WhatsApp',
    ctaHref: 'https://wa.me/923189532843?text=Hi%2C%20I%27m%20interested%20in%20the%20Skill%20Bundle%20(3%20courses).',
    ctaStyle: 'primary',
  },
  {
    id: 'enterprise',
    name: 'Full Program',
    tagline: 'Maximum transformation',
    priceLabel: 'From',
    price: 'PKR 75,000',
    period: 'all 6 courses',
    highlight: false,
    badge: 'Best Value',
    description: 'Unlimited access to the entire institute curriculum with dedicated mentorship, live Q&A, and priority support.',
    features: [
      { text: 'All 6 courses included', included: true },
      { text: 'LMS access & recordings', included: true },
      { text: 'Certificate for each course', included: true },
      { text: 'Private WhatsApp support', included: true },
      { text: 'Lifetime access to content', included: true },
      { text: 'Personalised mentorship (unlimited)', included: true },
      { text: 'Over 35% bundle savings', included: true },
      { text: 'Priority enrollment & live Q&A', included: true },
    ],
    cta: 'Enroll via WhatsApp',
    ctaHref: 'https://wa.me/923189532843?text=Hi%2C%20I%27m%20interested%20in%20the%20Full%20Program%20(all%206%20courses).',
    ctaStyle: 'secondary',
  },
];

const courses = [
  { name: 'Digital Literacy & AI Tools', duration: '16 Days', level: 'Beginner' },
  { name: 'Python Programming', duration: '8 Weeks', level: 'Intermediate' },
  { name: 'AI Driven Development', duration: '10 Weeks', level: 'Intermediate+' },
  { name: 'Social Media Management', duration: '6 Weeks', level: 'Intermediate' },
  { name: 'Social Media Marketing with AI', duration: '6 Weeks', level: 'Intermediate' },
  { name: 'Agentic AI: Business Domain Workflows', duration: '12 Weeks', level: 'Advanced' },
];

const faqs = [
  {
    q: 'Are prices fixed or negotiable?',
    a: 'Prices listed are starting points. We offer payment plans and occasional cohort discounts. Contact us via WhatsApp to discuss what works for your situation.',
  },
  {
    q: 'Can I pay in instalments?',
    a: 'Yes. Most courses support a 2–3 instalment plan. Reach out via WhatsApp before enrolling to arrange a schedule.',
  },
  {
    q: 'Is there a free trial or demo class?',
    a: 'We offer a free introductory session for most courses. Message us on WhatsApp to book your spot.',
  },
  {
    q: 'What is included in "lifetime access"?',
    a: 'Once enrolled, you retain access to all recorded LMS sessions for that course indefinitely — even after the live cohort ends.',
  },
  {
    q: 'Are certificates internationally recognised?',
    a: 'Our certificates are issued by Action Digital Institute and recognised by local employers and clients. They are not currently accredited by a university body.',
  },
];

export default function PricingPage() {
  return (
    <AnimatedPageWrapper>
      <section className="min-h-screen bg-[#090D1A] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Hero */}
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-widest rounded-full border text-[#6366F1] border-[rgba(99,102,241,0.30)] bg-[rgba(99,102,241,0.08)] mb-4">
              Transparent Pricing
            </span>
            <h1
              className="font-heading font-bold text-[#F1F5FF] mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              Invest in Your Future
            </h1>
            <p className="text-[#8892A4] max-w-2xl mx-auto leading-relaxed">
              Flexible plans for individuals, career changers, and teams. All prices in PKR — payment plans available.
            </p>
          </div>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={[
                  'relative rounded-2xl border p-7 flex flex-col transition-all duration-300',
                  plan.highlight
                    ? 'bg-gradient-to-b from-[rgba(99,102,241,0.14)] to-[rgba(14,20,38,0.9)] border-[rgba(99,102,241,0.45)] shadow-[0_0_48px_rgba(99,102,241,0.18)]'
                    : 'bg-[rgba(14,20,38,0.7)] border-white/10 hover:border-white/20',
                ].join(' ')}
              >
                {plan.badge && (
                  <span className={[
                    'absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider',
                    plan.highlight
                      ? 'bg-gradient-to-r from-[#6366F1] to-[#818CF8] text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]'
                      : 'bg-[#EF7E2E] text-white',
                  ].join(' ')}>
                    {plan.badge}
                  </span>
                )}

                <div className="mb-6">
                  <h2 className="text-xl font-bold text-[#F1F5FF] mb-1">{plan.name}</h2>
                  <p className="text-[#8892A4] text-sm mb-5">{plan.tagline}</p>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-[#8892A4] text-sm mr-1">{plan.priceLabel}</span>
                    <span className={[
                      'text-3xl font-bold',
                      plan.highlight ? 'text-[#818CF8]' : 'text-[#F1F5FF]',
                    ].join(' ')}>
                      {plan.price}
                    </span>
                  </div>
                  <p className="text-[#8892A4] text-xs">{plan.period}</p>
                </div>

                <p className="text-[#8892A4] text-sm leading-relaxed mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      {f.included
                        ? <CheckCircle className="text-[#10B981] flex-shrink-0 mt-0.5" size={16} />
                        : <X className="text-[#8892A4] flex-shrink-0 mt-0.5 opacity-50" size={16} />
                      }
                      <span className={f.included ? 'text-[#F1F5FF] text-sm' : 'text-[#8892A4] text-sm line-through opacity-60'}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={[
                    'inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300',
                    plan.highlight
                      ? 'bg-gradient-to-r from-[#6366F1] to-[#818CF8] text-white shadow-[0_0_24px_rgba(99,102,241,0.30)] hover:shadow-[0_0_40px_rgba(99,102,241,0.45)]'
                      : 'bg-white/8 text-[#F1F5FF] border border-white/14 hover:bg-white/12',
                  ].join(' ')}
                >
                  <MessageCircle size={16} />
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>

          {/* Courses included */}
          <div className="mb-20">
            <h2 className="text-center font-heading font-bold text-[#F1F5FF] text-2xl md:text-3xl mb-3">
              What&apos;s Included
            </h2>
            <p className="text-center text-[#8892A4] mb-10 max-w-xl mx-auto text-sm">
              All plans give access to courses from our full catalogue. Mix and match based on your goals.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((c, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/4 border border-white/8 hover:border-white/16 transition-colors duration-300">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#818CF8] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Star className="text-white" size={14} fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-[#F1F5FF] font-semibold text-sm">{c.name}</p>
                    <p className="text-[#8892A4] text-xs mt-0.5">{c.duration} · {c.level}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 text-[#6366F1] hover:text-[#818CF8] font-medium text-sm transition-colors"
              >
                View full course details →
              </Link>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-20">
            <h2 className="text-center font-heading font-bold text-[#F1F5FF] text-2xl md:text-3xl mb-10">
              Pricing FAQs
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="p-5 rounded-xl bg-white/4 border border-white/8">
                  <p className="text-[#F1F5FF] font-semibold mb-2 text-sm md:text-base">{faq.q}</p>
                  <p className="text-[#8892A4] text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link href="/faq" className="text-[#EF7E2E] hover:text-[#F5A623] text-sm font-medium transition-colors">
                See all FAQs →
              </Link>
            </div>
          </div>

          {/* CTA banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[rgba(99,102,241,0.18)] to-[rgba(14,20,38,0.95)] border border-[rgba(99,102,241,0.30)] p-8 md:p-12 text-center">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-[#6366F1]/10 to-[#EF7E2E]/10 opacity-40 pointer-events-none"
            />
            <div className="relative">
              <h2 className="font-heading font-bold text-[#F1F5FF] text-2xl md:text-3xl mb-3">
                Not sure which plan is right for you?
              </h2>
              <p className="text-[#8892A4] max-w-xl mx-auto mb-8 text-sm md:text-base">
                Message us on WhatsApp. We&apos;ll help you pick the right courses for your goals, timeline, and budget — no pressure.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://wa.me/923189532843"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#EF7E2E] to-[#F5A623] shadow-[0_0_28px_rgba(239,126,46,0.25)] hover:shadow-[0_0_44px_rgba(239,126,46,0.45)] transition-shadow duration-300"
                >
                  <Zap size={16} />
                  Chat on WhatsApp
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-[#F1F5FF] bg-white/8 border border-white/14 hover:bg-white/12 transition-all duration-300"
                >
                  Send a Message
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </AnimatedPageWrapper>
  );
}
