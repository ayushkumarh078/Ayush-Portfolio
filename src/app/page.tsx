import Background from "@/components/Background";
import Hero from "@/components/Hero";
import CurrentlyBuilding from "@/components/CurrentlyBuilding";
import TechnicalDeepDives from "@/components/TechnicalDeepDives";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import GithubActivity from "@/components/GithubActivity";
import Blog from "@/components/Blog";
import Certifications from "@/components/Certifications";
import Statistics from "@/components/Statistics";
import { Contact, Footer } from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden selection:bg-indigo-500/30 selection:text-white">
      {/* Background layer */}
      <Background />
      
      {/* Sections with structural separators */}
      <Hero />
      
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <CurrentlyBuilding />
      
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <TechnicalDeepDives />

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <Experience />

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <Skills />

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <GithubActivity />

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <Blog />

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <Certifications />

      <Statistics />
      
      <Contact />
      <Footer />
    </main>
  );
}
