import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Courses - ActionDigital Institute',
  description: 'Explore our comprehensive courses on digital literacy, AI tools, and more.',
};

const CoursesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen section">
      {children}
    </div>
  );
};

export default CoursesLayout;