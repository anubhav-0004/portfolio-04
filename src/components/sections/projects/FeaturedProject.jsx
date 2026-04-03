"use client";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github, Star } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function FeaturedProject({ project }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const previewRef = useRef(null);
  const isInView = useInView(previewRef, { once: true, margin: "0px 0px -60px 0px" });

  useEffect(() => setMounted(true), []);

  // When preview section enters viewport, shimmer for 3s then show image
  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => setImageVisible(true), 3000);
    return () => clearTimeout(timer);
  }, [isInView]);

  const isDark = !mounted || theme === "dark";

  return (
    <motion.div
      variants={fadeInUp}
      style={{
        background: isDark ? "#0D1320" : "#7d8696",
        border: "1px solid rgba(99,102,241,0.25)",
        borderRadius: "20px",
        overflow: "hidden",
        marginBottom: "20px",
        position: "relative",
      }}
      whileHover={{
        borderColor: "rgba(99,102,241,0.45)",
        boxShadow:
          "0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(99,102,241,0.15)",
      }}
    >
      {/* Top gradient line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, #6366F1, #22D3EE, transparent)",
        }}
      />

      {/* Two column layout */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr" }}
        className="featured-inner"
      >
        {/* Left — Content */}
        <div style={{ padding: "40px" }}>
          {/* Featured tag */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 12px",
              borderRadius: "100px",
              border: "1px solid rgba(99,102,241,0.3)",
              background: "rgba(99,102,241,0.08)",
              fontSize: "11px",
              fontWeight: 600,
              color: isDark ? "#6366F1" : "#242675",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            <Star size={10} />
            Featured Project
          </div>

          {/* Title */}
          <h3
            className="font-heading"
            style={{
              fontSize: "clamp(22px, 3vw, 28px)",
              fontWeight: 800,
              color: "#F1F5F9",
              letterSpacing: "-0.02em",
              marginBottom: "8px",
            }}
          >
            {project.title}
          </h3>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "13px",
              color: isDark ? "#6366F1" : "#242675",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            {project.subtitle}
          </p>

          {/* Description */}
          <p
            style={{
              fontSize: "14px",
              color: isDark ? "#94A3B8" : "#2d367a",
              lineHeight: 1.75,
              marginBottom: "20px",
              maxWidth: "480px",
            }}
          >
            {project.description}
          </p>

          {/* Highlights */}
          {project.highlights && (
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                marginBottom: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {project.highlights.map((h) => (
                <li
                  key={h}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    fontSize: "13px",
                    color: isDark ? "#94A3B8" : "#2d367a",
                    lineHeight: 1.6,
                  }}
                >
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: isDark ? "#6366F1" : "#1b2675",
                      flexShrink: 0,
                      marginTop: "6px",
                    }}
                  />
                  {h}
                </li>
              ))}
            </ul>
          )}

          {/* Tech stack */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: "28px",
            }}
          >
            {project.techStack.map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: isDark ? "#6366F1" : "#1b2675",
                  background: "rgba(99,102,241,0.08)",
                  border: isDark
                    ? "1px solid rgba(99,102,241,0.2)"
                    : "1px solid #1b2675",
                  padding: "4px 10px",
                  borderRadius: "6px",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "11px 22px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 600,
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <ExternalLink size={14} />
                Live Demo
              </motion.a>
            )}

            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                padding: "11px 22px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 600,
                color: isDark ? "#94A3B8" : "#7daae8",
                border: "1px solid rgba(255,255,255,0.12)",
                background: isDark ? "rgba(255,255,255,0.04)" : "#dee6fc",
                textDecoration: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              whileHover={{
                scale: 1.04,
                color: isDark ? "#F1F5F9" : "black",
                borderColor: "rgba(255,255,255,0.25)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              <Github size={14} />
              GitHub
            </motion.a>
          </div>
        </div>

        {/* Right — Browser mockup preview */}
        <div
          ref={previewRef}
          className="featured-preview max-sm:px-4!"
          style={{
            background: isDark ? "#070B12" : "#555961",
            borderTop: "1px solid rgba(99,102,241,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "32px",
            minHeight: "280px",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "450px",
              borderRadius: "12px",
              border: "2px solid rgba(99,102,241,0.5)",
              overflow: "hidden",
              boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
            }}
          >
            {/* Browser top bar */}
            <div
              style={{
                background: "#121B2E",
                padding: "10px 14px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#FF5F57" }} />
              <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#FEBC2E" }} />
              <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#28C840" }} />
              {/* URL bar */}
              <div
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  background: "#070B12",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "4px",
                  padding: "3px 14px",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "10px",
                  color: "#475569",
                }}
              >
                {project.liveUrl
                  ? project.liveUrl.replace("https://", "")
                  : "localhost:3000"}
              </div>
            </div>

            {/* Mock screen — shimmer OR image */}
            <div
              style={{
                background: "#0D1320",
                height: "220px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Shimmer layer — visible until imageVisible = true */}
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: imageVisible ? 0 : 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 2,
                  background: "#0D1320",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  padding: "20px",
                  pointerEvents: "none",
                }}
              >
                {/* Animated shimmer bars */}
                {[
                  { width: "55%", height: "14px", delay: 0 },
                  { width: "80%", height: "8px", delay: 0.1 },
                  { width: "65%", height: "8px", delay: 0.2 },
                  { width: "40%", height: "8px", delay: 0.3 },
                ].map((bar, i) => (
                  <div
                    key={i}
                    style={{
                      width: bar.width,
                      height: bar.height,
                      borderRadius: "4px",
                      overflow: "hidden",
                      background: "rgba(255,255,255,0.04)",
                    }}
                  >
                    <div className="shimmer-bar" style={{ animationDelay: `${bar.delay}s` }} />
                  </div>
                ))}

                {/* Shimmer card grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                    marginTop: "6px",
                  }}
                >
                  {[0, 0.15, 0.3, 0.45].map((delay, n) => (
                    <div
                      key={n}
                      style={{
                        height: "52px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        background: "#121B2E",
                        border: "1px solid rgba(99,102,241,0.08)",
                      }}
                    >
                      <div className="shimmer-bar" style={{ animationDelay: `${delay}s` }} />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Actual image — fades in after shimmer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: imageVisible ? 1 : 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 1,
                }}
              >
                <Image
                  src="/CarFusion.png"
                  alt={project.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive + shimmer styles */}
      <style>{`
        @media (min-width: 900px) {
          .featured-inner {
            grid-template-columns: 1fr 1fr !important;
          }
          .featured-preview {
            border-top: none !important;
            border-left: 1px solid rgba(99,102,241,0.1) !important;
            min-height: 380px !important;
          }
        }

        @keyframes shimmerSlide {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        .shimmer-bar {
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(99, 102, 241, 0.18) 40%,
            rgba(34, 211, 238, 0.12) 60%,
            transparent 100%
          );
          animation: shimmerSlide 1.6s ease-in-out infinite;
        }
      `}</style>
    </motion.div>
  );
}