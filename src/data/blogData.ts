import {
  Code,
  Cpu,
  Zap,
  Bot,
  BookOpen,
  Globe,
  Terminal,
  Brain,
} from 'lucide-react';

// 🔹 Centralized color styling for tags (light + dark harmony)
export const tagStyles: Record<string, string> = {
  AI: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  NextJS: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  Tailwind: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
  Default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
};


// 🔹 Exported icons map for dynamic rendering
export const iconMap: Record<string, React.ComponentType<any>> = {
  Code,
  Cpu,
  Zap,
  Bot,
  BookOpen,
  Globe,
  Terminal,
  Brain,
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
    slug: 'solving-nextjs-v4-integration',
    title: 'Solving Next.js V4 Integration: The CSS-First Approach',
    excerpt:
      "A definitive guide to troubleshooting and fixing common integration issues when adopting Tailwind CSS V4’s new architecture in Next.js App Router projects.",
    date: '2025-10-11',
    tags: ['Tailwind V4', 'Next.js', 'V4 Architecture', 'PostCSS'],
    iconName: 'Zap',
  },
  {
    slug: 'integrating-chatgpt-n8n',
    title: 'Integrating ChatGPT & n8n for Advanced Marketing Automation',
    excerpt:
      'Learn how to build powerful, scalable digital marketing workflows using AI models and no-code/low-code platforms like n8n for SMEs.',
    date: '2025-09-28',
    tags: ['AI', 'Digital Marketing', 'Automation', 'n8n'],
    iconName: 'Brain',
  },
  {
    slug: 'building-multilingual-gui-tools',
    title: 'Building Multilingual GUI Tools with PyQt and Python',
    excerpt:
      'A technical deep-dive into developing desktop automation tools, focusing on complex scripts like Urdu/Arabic handling in PyQt applications.',
    date: '2025-09-15',
    tags: ['Python', 'PyQt', 'Automation', 'GUI'],
    iconName: 'Terminal',
  },
];
