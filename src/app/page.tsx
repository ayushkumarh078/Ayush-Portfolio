import Background from "@/components/Background";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Statistics from "@/components/Statistics";
import { Contact, Footer } from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden selection:bg-brand-500/30 selection:text-white">
      {/* Background layer */}
      <Background />
      
      {/* Sections */}
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Certifications />
      <Statistics />
      <Contact />
      <Footer />
    </main>
  );
}
