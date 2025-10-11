// src/app/page.tsx

import Hero from '@/components/Hero'; 
import Expertise from '@/components/Expertise'; // <-- Import the new component
import Projects from '@/components/Projects'; // Next step
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
// ...

export default function Home() {
  return (
    <main>
      <Hero />
      <Expertise />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}