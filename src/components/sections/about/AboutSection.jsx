"use client";
import { motion } from "framer-motion";
import { staggerContainer, fadeInLeft, fadeInRight } from "@/lib/animations";
import { personal } from "@/content/personal";
import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionHeading from "@/components/shared/SectionHeading";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function AboutSection() {
    const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = !mounted || theme === "dark"; 
  return (
    <SectionWrapper id="about">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "48px",
          alignItems: "start",
        }}
        className="about-grid max-sm:max-w-[98%]! max-sm:mx-auto!"
      >
        {/* Left — Image + Stats */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          style={{ position: "relative" }}
          className="max-sm:max-w-[95%]!"
        >
          {/* Deco offset border */}
          <div
            style={{
              position: "absolute",
              top: "16px",
              left: "16px",
              right: "-16px",
              bottom: "-16px",
              border: "1.5px dashed rgba(99,102,241,0.2)",
              borderRadius: "20px",
              zIndex: 0,
            }}
            className="max-sm:scale-105 max-sm:-left-1! max-sm:border-[rgba(90,92,208,0.67)]!"
          />

          {/* Photo frame */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              borderRadius: "20px",
              overflow: "hidden",
              border: "2px solid transparent",
              background: isDark ?
                "linear-gradient(#0D1320, #0D1320) padding-box, linear-gradient(135deg, #6366F1, #22D3EE) border-box" : "#45484f",
              aspectRatio: "1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "16px",
            }}
            className="max-sm:ml-2!"
          >
            {/* Gradient fill behind avatar */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(145deg, rgba(99,102,241,0.2), rgba(34,211,238,0.1), rgba(167,139,250,0.15))",
              }}
            />

            {/* Avatar initials */}
            <div style={{ position: "relative", textAlign: "center" }}>
              <div
                style={{
                  position: "relative",
                  width: "200px",
                  height: "200px",
                  margin: "0 auto 20px",
                }}
              >
                {/* Outer rotating gradient ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    position: "absolute",
                    inset: "-3px",
                    borderRadius: "50%",
                    background:
                      "conic-gradient(from 0deg, #6366F1, #8B5CF6, #EC4899, #6366F1)",
                    zIndex: 0,
                  }}
                />

                {/* Static gap ring */}
                <div
                  style={{
                    position: "absolute",
                    inset: "2px",
                    borderRadius: "50%",
                    background: "#0D1320",
                    zIndex: 1,
                  }}
                />

                {/* Inner rotating ring — counter direction */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  style={{
                    position: "absolute",
                    inset: "5px",
                    borderRadius: "50%",
                    background:
                      "conic-gradient(from 180deg, #0EA5E9, #6366F1, #8B5CF6, #0EA5E9)",
                    zIndex: 2,
                    opacity: 0.5,
                  }}
                />

                {/* Gap before image */}
                <div
                  style={{
                    position: "absolute",
                    inset: "8px",
                    borderRadius: "50%",
                    background: "#0D1320",
                    zIndex: 3,
                  }}
                />

                {/* Actual image */}
                <div
                  style={{
                    position: "absolute",
                    inset: "10px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    zIndex: 4,
                    boxShadow: "inset 0 0 20px rgba(99,102,241,0.2)",
                  }}
                >
                  <Image
                    src="/Anubhav (2).jpg"
                    fill
                    alt="Anubhav Kumar"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center top",
                      borderRadius: "50%",
                    }}
                  />
                </div>

                {/* Glow behind the whole thing */}
                <div
                  style={{
                    position: "absolute",
                    inset: "-20px",
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)",
                    zIndex: 0,
                    pointerEvents: "none",
                  }}
                />
              </div>
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#F1F5F9",
                  marginBottom: "4px",
                }}
              >
                {personal.name}
              </p>
              <p style={{ fontSize: "14px", color: "#94A3B8" }}>
                {personal.role}
              </p>
              <p
                className="font-mono"
                style={{
                  fontSize: "11px",
                  color: "#82ace8",
                  marginTop: "6px",
                }}
              >
                📍 {personal.location}
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "10px",
              marginTop: "16px",
              position: "relative",
              zIndex: 1,
            }}
            className="max-sm:mt-4! max-sm:px-2! max-sm:"
          >
            {personal.stats.map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: isDark ? "#0D1325" : "#45484f",
                  border: "1px solid rgba(99,102,241,0.35)",
                  borderRadius: "12px",
                  padding: "14px 10px",
                  textAlign: "center",
                  transition: "all 0.2s ease",
                }}
                className="max-sm:px-1!"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(99,102,241,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(99,102,241,0.15)";
                }}
              >
                <span
                  className="font-heading gradient-text"
                  style={{
                    display: "block",
                    fontSize: "22px",
                    fontWeight: 800,
                    marginBottom: "3px",
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    color: isDark ? "#475569" : "#97b5f0",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — Text */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <SectionHeading
            eyebrow="About Me"
            title="A developer who cares"
            highlight="about the details."
            className="mb-6"
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              marginBottom: "28px",
            }}
          >
            {personal.about.map((para, i) => (
              <motion.p
                key={i}
                variants={fadeInRight}
                style={{
                  fontSize: "15px",
                  color: isDark ? "#94A3B8" : "#1b2675",
                  lineHeight: 1.8,
                }}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Value cards */}
          <motion.div
            variants={staggerContainer}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            {personal.values.map((value) => (
              <motion.div
                key={value.text}
                variants={fadeInRight}
                style={{
                  background: isDark ? "#0D1320" : "#45484f",
                  border: "1px solid rgba(99,102,241,0.12)",
                  borderRadius: "10px",
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  transition: "all 0.2s ease",
                }}
                whileHover={{
                  borderColor: "rgba(99,102,241,0.3)",
                  x: 3,
                }}
              >
                <span style={{ fontSize: "18px", flexShrink: 0 }}>
                  {value.icon}
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#94A3B8",
                    fontWeight: 500,
                    lineHeight: 1.4,
                  }}
                >
                  {value.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .about-grid {
            grid-template-columns: 2fr 3fr !important;
          }
        }
      `}</style>
    </SectionWrapper>
  );
}
