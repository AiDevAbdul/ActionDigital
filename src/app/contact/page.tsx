// src/app/contact/page.tsx

import AnimatedPageWrapper from '@/components/AnimatedPageWrapper';
import ContactSection from '@/components/ContactSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Action Digital Institute to discuss training, services, or partnership opportunities.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <AnimatedPageWrapper>
      <ContactSection />
    </AnimatedPageWrapper>
  );
}
