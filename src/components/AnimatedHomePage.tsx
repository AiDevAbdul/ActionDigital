import Hero from '@/components/Hero';
import Services from '@/components/Services';
import CoursesSection from '@/components/CoursesSection';
import ProjectsSection from '@/components/ProjectsSection';
import Testimonials from '@/components/Testimonials';
import LatestBlogs from '@/components/LatestBlogs';
import ContactSection from '@/components/ContactSection';
import WhatsAppButton from '@/components/WhatsAppButton';
import { ClientFeedbackSection } from '@/components/ClientsPartnersSection';
import StudentSuccessStories from '@/components/StudentSuccessStories';

export default function AnimatedHomePage() {
  return (
    <main className="overflow-hidden bg-[#090D1A]">
      <Hero />
      <Services />
      <CoursesSection />
      <ProjectsSection />
      <ClientFeedbackSection />
      <Testimonials />
      <StudentSuccessStories />
      <LatestBlogs />
      <ContactSection />
      <WhatsAppButton />
    </main>
  );
}
