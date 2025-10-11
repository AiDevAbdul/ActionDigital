// src/data/blogData.ts

// REMOVE: import { LucideIcon } from 'lucide-react'; // No longer needed here
import { FileText, Lightbulb, Zap } from 'lucide-react'; 
// We will still define the map here, but only pass the string name in the array.

// Define the type to use a simple string for the icon identifier
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  iconName: string; // <-- CHANGED: Now a string
  content: string; 
};

// Map of string names to the actual Lucide components (for use in the Client Component)
export const iconMap: { [key: string]: typeof FileText | typeof Lightbulb | typeof Zap } = {
    'Zap': Zap,
    'Lightbulb': Lightbulb,
    'FileText': FileText,
};

export const posts: Post[] = [
  {
    slug: 'tailwind-v4-nextjs-integration',
    title: 'Solving Next.js V4 Integration: The CSS-First Approach',
    excerpt: "A definitive guide to troubleshooting and fixing common integration issues when adopting Tailwind CSS V4's new architecture in Next.js App Router projects.",
    date: '2025-10-11',
    tags: ['Tailwind V4', 'Next.js', 'V4 Architecture', 'PostCSS'],
    iconName: 'Zap', // <-- CHANGED: Just the string name
    content: "The detailed content for this V4 guide goes here.",
  },
  {
    slug: 'ai-for-digital-marketing-automation',
    title: 'Integrating ChatGPT & n8n for Advanced Marketing Automation',
    excerpt: 'How to build powerful, scalable digital marketing workflows using AI models and no-code/low-code platforms like n8n for SMEs.',
    date: '2025-09-28',
    tags: ['AI', 'Digital Marketing', 'Automation', 'ChatGPT', 'n8n'],
    iconName: 'Lightbulb', // <-- CHANGED: Just the string name
    content: "The tutorial on AI marketing automation goes here.",
  },
  {
    slug: 'pyqt-multilingual-whatsapp',
    title: 'Building Multilingual GUI Tools with PyQt and Python',
    excerpt: 'A technical deep-dive into developing desktop automation tools, specifically focusing on handling complex scripts like Urdu/Arabic in PyQt applications.',
    date: '2025-09-15',
    tags: ['Python', 'PyQt', 'Automation', 'GUI'],
    iconName: 'FileText', // <-- CHANGED: Just the string name
    content: "The technical deep-dive into Python and PyQt goes here.",
  },
];