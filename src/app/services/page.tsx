// src/app/services/page.tsx

import AnimatedPageWrapper from '@/components/AnimatedPageWrapper';
import Services from '@/components/Services'; // Services component is in the Experience.tsx file
import Testimonials from '@/components/Testimonials';

export default function ServicesPage() {
  return (
    <AnimatedPageWrapper>
      <Services />
      <Testimonials />
    </AnimatedPageWrapper>
  );
}