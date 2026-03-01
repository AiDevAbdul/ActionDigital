// src/app/services/page.tsx

import AnimatedPageWrapper from '@/components/AnimatedPageWrapper';
import Services from '@/components/Services'; // Services component is in the Experience.tsx file
import Testimonials from '@/components/Testimonials';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Discover Action Digital Institute services across AI automation, web development, and digital marketing.',
  alternates: {
    canonical: '/services',
  },
};

export default function ServicesPage() {
  return (
    <AnimatedPageWrapper>
      <Services />
      <Testimonials />
    </AnimatedPageWrapper>
  );
}
