// src/app/courses/page.tsx

import AnimatedPageWrapper from '@/components/AnimatedPageWrapper';
import CoursesPage from '@/components/CoursesPage';

export default function Courses() {
  return (
    <AnimatedPageWrapper>
      <CoursesPage />
    </AnimatedPageWrapper>
  );
}