import Background from "@/components/Background";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechnicalDeepDives from "@/components/TechnicalDeepDives";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import GithubActivity from "@/components/GithubActivity";
import { Contact, Footer } from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden selection:bg-indigo-500/30 selection:text-white">
      {/* Background layer */}
      <Background />
      
      {/* Sections with structural separators */}
      <Hero />
      
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <About />
      
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <TechnicalDeepDives />

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <Skills />

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <Experience />

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <Education />

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <GithubActivity />
      
      <Contact />
      <Footer />
    </main>
  );
}
