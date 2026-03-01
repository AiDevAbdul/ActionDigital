// src/app/page.tsx

import AnimatedHomePage from '@/components/AnimatedHomePage';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Action Digital Institute offers AI, Web/App Development, and Digital Marketing training with industry-ready curriculum and hands-on projects.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Action Digital Institute',
    description:
      'AI, Web/App Development, and Digital Marketing training with industry-ready curriculum and hands-on projects.',
    url: siteConfig.url,
  },
};

export default function Home() {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <AnimatedHomePage />
    </>
  );
}
