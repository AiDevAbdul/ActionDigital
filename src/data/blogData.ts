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
  'Web Development': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  'AI': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  'Machine Learning': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  'Digital Marketing': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  'Mobile Development': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
  'Cloud Computing': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
  'Data Analytics': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
  'Career Path': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  'SEO': 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
  'UI/UX': 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
  Default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
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