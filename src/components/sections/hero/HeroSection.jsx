"use client";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Code2,
  Download,
  ArrowRight,
} from "lucide-react";
import { useTypewriter } from "@/hooks/useTypewriter";
import { personal } from "@/content/personal";
import { siteConfig } from "@/config/site";
import { staggerContainer, fadeInUp, fadeInRight } from "@/lib/animations";
import TerminalCard from "./TerminalCard";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const socialLinks = [
  { icon: Github, href: siteConfig.links.github, label: "GitHub" },
  { icon: Linkedin, href: siteConfig.links.linkedin, label: "LinkedIn" },
  { icon: Twitter, href: siteConfig.links.twitter, label: "Twitter" },
  { icon: Code2, href: siteConfig.links.codechef, label: "Codechef" },
];

export default function HeroSection() {
  const currentRole = useTypewriter(personal.roles, 80, 50, 2000);
  
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = !mounted || theme === "dark"; 

  const handleScroll = (href) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "100px",
        paddingBottom: "80px",
        overflow: "hidden",
      }}
      className="max-sm:pt-0!"
    >
      {/* Background dot grid */}
      <div
        className="dot-grid"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Glow orb top right */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Glow orb bottom left */}
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          left: "20%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,211,238,0.08), transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div className="page-container" style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "48px",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left — Text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} style={{ marginBottom: "24px" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 16px",
                  borderRadius: "100px",
                  border: "1px solid rgba(16,185,129,0.3)",
                  background: "rgba(16,185,129,0.08)",
                  color: "#10B981",
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                <span
                  className="animate-pulse-slow"
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#10B981",
                    boxShadow: "0 0 8px #10B981",
                    display: "inline-block",
                  }}
                />
                Available for Full-Time Roles
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={fadeInUp} style={{ marginBottom: "16px" }}>
              <p style={{ color: isDark ? "#94A3B8" : "#767F8C", fontSize: "18px", marginBottom: "4px" }}>
                Hi, I'm
              </p>
              <h1
                className="font-heading light:text-black!"
                style={{
                  fontSize: "clamp(44px, 6vw, 72px)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  color: isDark ? "#F1F5F9" : "#0F172A",
                }}
              >
                {personal.name.split(" ")[0]}
                <br />
                {personal.name.split(" ")[1]}
              </h1>
            </motion.div>

            {/* Typewriter */}
            <motion.div
              variants={fadeInUp}
              style={{ marginBottom: "20px", minHeight: "36px" }}
            >
              <span
                className="font-heading gradient-text"
                style={{ fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 600 }}
              >
                {currentRole}
              </span>
              <span
                className="animate-blink"
                style={{
                  display: "inline-block",
                  width: "3px",
                  height: "22px",
                  background: "#6366F1",
                  marginLeft: "3px",
                  verticalAlign: "middle",
                }}
              />
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={fadeInUp}
              style={{
                color: isDark ? "#94A3B8" : "#767F8C",
                fontSize: "16px",
                lineHeight: 1.8,
                marginBottom: "36px",
                maxWidth: "480px",
              }}
            >
              {personal.bio}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "14px",
                marginBottom: "36px",
              }}
              className="max-sm:justify-center max-sm:flex-row! max-sm:flex-nowrap! max-sm:mt-3!"
            >
              <motion.button
                onClick={() => handleScroll("#projects")}
                className="btn-gradient max-sm:px-7!"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "13px 28px",
                  borderRadius: "100px",
                  fontSize: "14px",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                View My Work
                <ArrowRight size={16} />
              </motion.button>

              <motion.a
                href="/resume.pdf"
                download
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 28px",
                  borderRadius: "100px",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: isDark ? "#94A3B8" : "#767F8C",
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: isDark ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.84)",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
                className="max-sm:px-5!"
                whileHover={{
                  scale: 1.05,
                  color: isDark ? "#F1F5F9" : "#0F172A",
                  borderColor: "rgba(255,255,255,0.45)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                <Download size={16} />
                Download Resume
              </motion.a>
            </motion.div>

            {/* Socials */}
            <motion.div
              variants={fadeInUp}
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
              className="max-sm:justify-center max-sm:mr-9! max-sm:mt-0! max-sm:gap-8!"
            >
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    border: isDark ? "1px solid rgba(255,255,255,0.3)" : "2px solid rgba(81, 191, 245,0.8)",
                    background: isDark ? "#0D1320!" : "transparent!",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#517ab5",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  className="max-sm:scale-125!"
                  whileHover={{
                    scale: 1.15,
                    y: -2,
                    color: isDark ? "#F1F5F9!" : "black!",
                    borderColor: isDark ? "rgba(99,102,241,0.5)" : "rgba(61, 191, 245,0.8)",
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Terminal (hidden on mobile) */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
            className="hero-terminal"
          >
            <TerminalCard />
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          style={{
            position: "absolute",
            bottom: "-40px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
          }}
          className="max-sm:-bottom-30!"
        >
          <span
            className="font-mono max-sm:scale-110!"
            style={{
              fontSize: "10px",
              color: isDark ? "#7498cc" : "#767F8C",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: "2px",
              height: "42px",
              background: "linear-gradient(to bottom, #6366F1, transparent)",
            }}
          />
        </motion.div>
      </div>

      {/* Two-column layout on desktop */}
      <style>{`
        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 64px !important;
          }
        }
        @media (max-width: 1023px) {
          .hero-terminal {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}