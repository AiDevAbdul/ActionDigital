import DevSetupSessionPage from '@/components/DevSetupSessionPage';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'AI-Driven Development Setup for Beginners',
  description:
    'Join our free online session to learn Node.js, Git, GitHub, VSCode, and Claude Code setup. Perfect for beginners starting their development journey.',
  alternates: {
    canonical: '/aidev',
  },
  openGraph: {
    title: 'AI-Driven Development Setup for Beginners',
    description:
      'Free online session on April 24, 2026. Learn development tools setup with expert guidance and community support.',
    url: `${siteConfig.url}/aidev`,
  },
};

export default function Page() {
  return <DevSetupSessionPage />;
}
