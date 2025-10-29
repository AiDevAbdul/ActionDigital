import {
  Code,
  Cpu,
  Zap,
  Bot,
  BookOpen,
  Globe,
  Terminal,
  Brain,
  Smartphone,
  BarChart3,
} from 'lucide-react';

// 🔹 Centralized color styling for tags (light + dark harmony)
export const tagStyles: Record<string, string> = {
  'Web Development': 'bg-primary-gradient text-white',
  'AI': 'bg-accent text-white',
  'Machine Learning': 'bg-primary-gradient text-white',
  'Digital Marketing': 'bg-accent text-white',
  'Mobile Development': 'bg-primary-gradient text-white',
  'Cloud Computing': 'bg-accent text-white',
  'Data Analytics': 'bg-primary-gradient text-white',
  'Career Path': 'bg-accent text-white',
  'SEO': 'bg-primary-gradient text-white',
  'UI/UX': 'bg-accent text-white',
  'HTML': 'bg-primary-gradient text-white',
  'CSS': 'bg-accent text-white',
  'React': 'bg-primary-gradient text-white',
  'Python': 'bg-accent text-white',
  'Data Science': 'bg-primary-gradient text-white',
  'Social Media': 'bg-accent text-white',
  'Strategy': 'bg-primary-gradient text-white',
  'Flutter': 'bg-accent text-white',
  'AWS': 'bg-primary-gradient text-white',
  'Azure': 'bg-accent text-white',
  'DevOps': 'bg-primary-gradient text-white',
  'SQL': 'bg-accent text-white',
  Default: 'bg-primary-gradient text-white',
};


// 🔹 Exported icons map for dynamic rendering
export const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Code,
  Cpu,
  Zap,
  Bot,
  BookOpen,
  Globe,
  Terminal,
  Brain,
  Smartphone,
  BarChart3,
};

// 🔹 Type definitions for clarity
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  iconName: keyof typeof iconMap;
};

// 🔹 Blog posts
export const posts: Post[] = [
  {
    slug: 'beginners-guide-web-development',
    title: 'A Beginner\'s Guide to Web Development: From HTML to React',
    excerpt:
      'Starting your journey in web development? This comprehensive guide covers everything from basic HTML/CSS to modern React frameworks.',
    date: '2025-10-15',
    tags: ['Web Development', 'HTML', 'CSS', 'React'],
    iconName: 'Code',
  },
  {
    slug: 'machine-learning-demystified',
    title: 'Machine Learning Demystified: Practical Applications for Beginners',
    excerpt:
      'Explore the fundamentals of machine learning and discover how AI is being implemented across various industries today.',
    date: '2025-10-08',
    tags: ['AI', 'Machine Learning', 'Python', 'Data Science'],
    iconName: 'Brain',
  },
  {
    slug: 'digital-marketing-strategies-2025',
    title: 'Essential Digital Marketing Strategies for 2025',
    excerpt:
      'Stay ahead of the curve with the latest digital marketing trends, tools, and strategies that will define success in the coming year.',
    date: '2025-10-01',
    tags: ['Digital Marketing', 'SEO', 'Social Media', 'Strategy'],
    iconName: 'Zap',
  },
  {
    slug: 'mobile-app-development-trends',
    title: 'Top Mobile App Development Trends Shaping 2025',
    excerpt:
      'Discover the latest trends in mobile app development including cross-platform frameworks, UI/UX innovations, and emerging technologies.',
    date: '2025-09-24',
    tags: ['Mobile Development', 'React Native', 'Flutter', 'UI/UX'],
    iconName: 'Smartphone',
  },
  {
    slug: 'cloud-computing-fundamentals',
    title: 'Cloud Computing Fundamentals: AWS, Azure, and Google Cloud',
    excerpt:
      'Understanding the basics of cloud computing and how major platforms are shaping the future of IT infrastructure.',
    date: '2025-09-17',
    tags: ['Cloud Computing', 'AWS', 'Azure', 'DevOps'],
    iconName: 'Globe',
  },
  {
    slug: 'data-analytics-career-path',
    title: 'Building a Career in Data Analytics: Skills and Pathways',
    excerpt:
      'A roadmap for transitioning into the growing field of data analytics, including essential tools and certifications.',
    date: '2025-09-10',
    tags: ['Data Analytics', 'Career Path', 'SQL', 'Python'],
    iconName: 'BarChart3',
  },
];