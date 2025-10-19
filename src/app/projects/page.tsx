// src/app/projects/page.tsx

import AnimatedPageWrapper from '@/components/AnimatedPageWrapper';
import ProjectsSection from '@/components/ProjectsSection';
import Testimonials from '@/components/Testimonials';

export default function ProjectsPage() {
  return (
    <AnimatedPageWrapper>
      <ProjectsSection />
      <Testimonials />
    </AnimatedPageWrapper>
  );
}