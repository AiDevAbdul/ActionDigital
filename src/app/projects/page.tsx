// src/app/projects/page.tsx

import AnimatedPageWrapper from '@/components/AnimatedPageWrapper';
import ProjectsSection from '@/components/ProjectsSection';
import Testimonials from '@/components/Testimonials';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore recent projects delivered by Action Digital Institute, including AI, web, and digital marketing solutions.',
  alternates: {
    canonical: '/projects',
  },
};

export default function ProjectsPage() {
  return (
    <AnimatedPageWrapper>
      <ProjectsSection />
      <Testimonials />
    </AnimatedPageWrapper>
  );
}
