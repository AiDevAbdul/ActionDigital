// Drop event photos into /public/events/<slug>.jpg and set image: '/events/<slug>.jpg'
// Leave image as null to show the gradient-icon fallback.

export type EventCategory = 'Corporate' | 'Government' | 'University' | 'College' | 'School' | 'Community' | 'Online';

export type Event = {
  slug: string;
  title: string;
  subtitle: string;
  venue: string;
  city: string;
  date: string;          // ISO date string
  category: EventCategory;
  attendees: number;
  description: string;
  highlights: string[];
  tags: string[];
  image: string | null;  // e.g. '/events/bank-of-khyber.jpg'
  featured: boolean;
};

export const categoryColors: Record<EventCategory, { pill: string; dot: string }> = {
  Corporate:   { pill: 'bg-[rgba(239,126,46,0.12)] border-[rgba(239,126,46,0.30)] text-[#EF7E2E]',   dot: 'bg-[#EF7E2E]' },
  Government:  { pill: 'bg-[rgba(99,102,241,0.12)] border-[rgba(99,102,241,0.30)] text-[#6366F1]',   dot: 'bg-[#6366F1]' },
  University:  { pill: 'bg-[rgba(16,185,129,0.12)] border-[rgba(16,185,129,0.30)] text-[#10B981]',   dot: 'bg-[#10B981]' },
  College:     { pill: 'bg-[rgba(20,184,166,0.12)] border-[rgba(20,184,166,0.30)] text-[#14B8A6]',   dot: 'bg-[#14B8A6]' },
  School:      { pill: 'bg-[rgba(245,158,11,0.12)] border-[rgba(245,158,11,0.30)] text-[#F59E0B]',   dot: 'bg-[#F59E0B]' },
  Community:   { pill: 'bg-[rgba(236,72,153,0.12)] border-[rgba(236,72,153,0.30)] text-[#EC4899]',   dot: 'bg-[#EC4899]' },
  Online:      { pill: 'bg-[rgba(139,92,246,0.12)] border-[rgba(139,92,246,0.30)] text-[#8B5CF6]',   dot: 'bg-[#8B5CF6]' },
};

export const events: Event[] = [
  {
    slug: 'bank-of-khyber-ai-workshop',
    title: 'AI for Bankers & Entrepreneurs',
    subtitle: 'Corporate Workshop',
    venue: 'Bank of Khyber — Head Office',
    city: 'Peshawar, KPK',
    date: '2025-03-15',
    category: 'Corporate',
    attendees: 60,
    featured: true,
    image: null, // replace with '/events/bank-of-khyber.jpg' once photo is added
    description:
      'An immersive full-day workshop at the Head Office of Bank of Khyber, bringing together senior bankers and entrepreneurs to explore practical AI applications in finance, risk management, customer experience, and business automation.',
    highlights: [
      'Live demos of AI-powered financial tools',
      'Panel discussion with banking executives',
      'Hands-on prompt engineering session',
      'Q&A with AI practitioners',
    ],
    tags: ['AI in Finance', 'Entrepreneurship', 'Automation', 'Banking'],
  },
  {
    slug: 'youth-affairs-kpk-ai-session',
    title: 'AI in the Present & Future',
    subtitle: 'Government Awareness Session',
    venue: 'Youth Affairs Directorate — KPK',
    city: 'Peshawar, KPK',
    date: '2025-04-10',
    category: 'Government',
    attendees: 80,
    featured: true,
    image: null, // replace with '/events/youth-affairs-kpk.jpg' once photo is added
    description:
      'A high-impact awareness session conducted at the Directorate of Youth Affairs, Khyber Pakhtunkhwa, covering the current state of AI globally and how the youth of Pakistan can leverage AI for career growth, entrepreneurship, and national development.',
    highlights: [
      'Current AI landscape — global & Pakistan',
      'Career pathways in AI for young Pakistanis',
      'Live AI tool demonstrations',
      'Youth-focused discussion on responsible AI',
    ],
    tags: ['AI Awareness', 'Youth', 'Pakistan', 'Future of Work'],
  },
  {
    slug: 'university-ai-for-students',
    title: 'AI for Students — University Edition',
    subtitle: 'Campus Session',
    venue: 'University of Peshawar',
    city: 'Peshawar, KPK',
    date: '2025-02-20',
    category: 'University',
    attendees: 120,
    featured: false,
    image: null, // replace with '/events/university-peshawar.jpg' once photo is added
    description:
      'An engaging campus session for undergraduate and postgraduate students, introducing AI tools that enhance research, writing, coding, and career readiness — equipping the next generation for an AI-driven world.',
    highlights: [
      'AI tools for academic research & writing',
      'Introduction to ChatGPT, Copilot & beyond',
      'Freelancing with AI skills',
      'Interactive group activities',
    ],
    tags: ['Students', 'AI Tools', 'Research', 'Freelancing'],
  },
  {
    slug: 'college-digital-literacy-workshop',
    title: 'Digital Literacy & AI Basics',
    subtitle: 'College Workshop',
    venue: 'Government College Peshawar',
    city: 'Peshawar, KPK',
    date: '2025-01-18',
    category: 'College',
    attendees: 90,
    featured: false,
    image: null, // replace with '/events/govt-college-peshawar.jpg' once photo is added
    description:
      'A foundational workshop on digital literacy and artificial intelligence for college-level students, focusing on building awareness of AI ethics, online safety, and practical AI tools accessible to beginners.',
    highlights: [
      'What is AI? — beginner-friendly introduction',
      'Digital safety & responsible internet use',
      'Free AI tools every student should know',
      'Certificate distribution',
    ],
    tags: ['Digital Literacy', 'AI Basics', 'Beginners', 'Ethics'],
  },
  {
    slug: 'school-ai-for-all',
    title: 'AI for All — School Outreach',
    subtitle: 'School Programme',
    venue: 'Multiple Schools, KPK',
    city: 'Khyber Pakhtunkhwa',
    date: '2024-12-05',
    category: 'School',
    attendees: 200,
    featured: false,
    image: null, // replace with '/events/school-outreach.jpg' once photo is added
    description:
      'A grassroots outreach programme visiting secondary schools across KPK to introduce students to the concept of AI in everyday life — from smartphones to healthcare — inspiring curiosity and future-readiness at an early age.',
    highlights: [
      'AI in everyday gadgets — fun demonstrations',
      'How AI is changing education',
      'Q&A with students and teachers',
      'Free learning resources distributed',
    ],
    tags: ['School', 'Outreach', 'Awareness', 'Inspiration'],
  },
  {
    slug: 'community-free-ai-session',
    title: 'Free Online AI Session',
    subtitle: 'Community — Open to All',
    venue: 'Zoom (Online)',
    city: 'Pakistan-wide',
    date: '2025-05-01',
    category: 'Online',
    attendees: 150,
    featured: false,
    image: null,
    description:
      'Our regular free online sessions open to anyone across Pakistan — no prior experience required. Covering AI tools, freelancing opportunities, and live Q&A to help everyday people understand and benefit from the AI revolution.',
    highlights: [
      'No registration fee — completely free',
      'Recorded & uploaded for those who miss it',
      'Live Q&A with instructors',
      'Access to WhatsApp study group',
    ],
    tags: ['Free Session', 'Online', 'Community', 'Beginners'],
  },
];

export const upcomingSession = {
  title: 'Next Free Online Session',
  date: 'Every Month — Stay tuned via WhatsApp',
  description: 'Join our free monthly AI awareness session. Open to students, professionals, and anyone curious about AI. No experience needed.',
  whatsappHref: 'https://wa.me/923189532843?text=Hi%2C%20I%27d%20like%20to%20join%20the%20next%20free%20AI%20session.',
};
