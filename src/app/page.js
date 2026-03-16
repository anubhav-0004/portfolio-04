import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/shared/ScrollProgress";
import HeroSection from "@/components/sections/hero/HeroSection";
import SkillsSection from "@/components/sections/skills/SkillsSection";
import ProjectsSection from "@/components/sections/projects/ProjectsSection";
import ExperienceSection from "@/components/sections/experience/ExperienceSection";
import AboutSection from "@/components/sections/about/AboutSection";
import AchievementsSection from "@/components/sections/achievements/AchievementsSection";
import ContactSection from "@/components/sections/contact/ContactSection";
import ChatWidget from "@/components/ai/ChatWidget";

export default function Home() {
  return (
    <main
      style={{
        background: "#070B12",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <div className="section-divider" />
      <SkillsSection />
      <div className="section-divider" />
      <ProjectsSection />
      <div className="section-divider" />
      <ExperienceSection />
      <div className="section-divider" />
      <AboutSection />
      {/* <div className="section-divider" /> */}
      {/* <AchievementsSection /> */}
      <div className="section-divider" />
      <ContactSection />
      <Footer />
      <ChatWidget />
    </main>
  );
}