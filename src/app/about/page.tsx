// src/app/about/page.tsx

import AnimatedPageWrapper from '@/components/AnimatedPageWrapper';
import About from '@/components/About';
import StudentSuccessStories from '@/components/StudentSuccessStories';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Action Digital Institute, our mission, and the success stories of our students.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Abdul Wahab',
    jobTitle: 'AI Engineer & Digital Marketing Strategist',
    worksFor: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    url: siteConfig.url,
  };

  return (
    <AnimatedPageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <About />
      <StudentSuccessStories />
    </AnimatedPageWrapper>
  );
}
