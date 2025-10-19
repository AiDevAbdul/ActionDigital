// src/app/about/page.tsx

import AnimatedPageWrapper from '@/components/AnimatedPageWrapper';
import About from '@/components/About';
import StudentSuccessStories from '@/components/StudentSuccessStories';

export default function AboutPage() {
  return (
    <AnimatedPageWrapper>
      <About />
      <StudentSuccessStories />
    </AnimatedPageWrapper>
  );
}