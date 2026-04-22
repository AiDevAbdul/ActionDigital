import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import ProjectsSection from '@/components/ProjectsSection';
import { PartnersSection, ClientFeedbackSection } from '@/components/ClientsPartnersSection';
import StudentSuccessStories from '@/components/StudentSuccessStories';
import LatestBlogs from '@/components/LatestBlogs';
import ContactSection from '@/components/ContactSection';
import WhatsAppButton from '@/components/WhatsAppButton';
import CoursesSection from '@/components/CoursesSection';
import MotionSection from '@/components/MotionSection';

export default function AnimatedHomePage() {
  return (
    <main className="overflow-hidden">
      <MotionSection type="fade">
        <Hero />
      </MotionSection>

      <MotionSection delay={0.2}>
        <About />
      </MotionSection>

      <MotionSection delay={0.3}>
        <CoursesSection />
      </MotionSection>

      <MotionSection delay={0.4}>
        <ProjectsSection />
      </MotionSection>

      <MotionSection delay={0.5}>
        <PartnersSection />
      </MotionSection>

      <MotionSection delay={0.6}>
        <ClientFeedbackSection />
      </MotionSection>

      <MotionSection delay={0.7}>
        <Services />
      </MotionSection>

      <MotionSection delay={0.8}>
        <StudentSuccessStories />
      </MotionSection>

      <MotionSection delay={0.9}>
        <LatestBlogs />
      </MotionSection>

      <MotionSection delay={1.0}>
        <ContactSection />
      </MotionSection>

      <WhatsAppButton />
    </main>
  );
}
