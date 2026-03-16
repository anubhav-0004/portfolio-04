"use client";
import { motion } from "framer-motion";
import { ExternalLink, Github, Star } from "lucide-react";
import { fadeInUp } from "@/lib/animations";

export default function FeaturedProject({ project }) {
  return (
    <motion.div
      variants={fadeInUp}
      style={{
        background: "#0D1320",
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
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
        }}
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
              color: "#6366F1",
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
              color: "#6366F1",
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
              color: "#94A3B8",
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
                    color: "#94A3B8",
                    lineHeight: 1.6,
                  }}
                >
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: "#6366F1",
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
                  color: "#6366F1",
                  background: "rgba(99,102,241,0.08)",
                  border: "1px solid rgba(99,102,241,0.2)",
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
                color: "#94A3B8",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.04)",
                textDecoration: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              whileHover={{
                scale: 1.04,
                color: "#F1F5F9",
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
          className="featured-preview"
          style={{
            background: "#070B12",
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
              maxWidth: "400px",
              borderRadius: "12px",
              border: "1px solid rgba(99,102,241,0.2)",
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
              <div
                style={{
                  width: "9px",
                  height: "9px",
                  borderRadius: "50%",
                  background: "#FF5F57",
                }}
              />
              <div
                style={{
                  width: "9px",
                  height: "9px",
                  borderRadius: "50%",
                  background: "#FEBC2E",
                }}
              />
              <div
                style={{
                  width: "9px",
                  height: "9px",
                  borderRadius: "50%",
                  background: "#28C840",
                }}
              />
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

            {/* Mock screen */}
            <div
              style={{
                background: "#0D1320",
                padding: "20px",
                height: "200px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {/* Mock nav bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "4px",
                }}
              >
                <div
                  style={{
                    height: "8px",
                    width: "60px",
                    borderRadius: "3px",
                    background: "rgba(99,102,241,0.3)",
                  }}
                />
                <div style={{ display: "flex", gap: "6px" }}>
                  {[1, 2, 3].map((n) => (
                    <div
                      key={n}
                      style={{
                        height: "6px",
                        width: "30px",
                        borderRadius: "2px",
                        background: "rgba(255,255,255,0.06)",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Mock hero text */}
              <div
                style={{
                  height: "12px",
                  width: "55%",
                  borderRadius: "3px",
                  background: "rgba(99,102,241,0.2)",
                }}
              />
              <div
                style={{
                  height: "7px",
                  width: "80%",
                  borderRadius: "2px",
                  background: "rgba(255,255,255,0.05)",
                }}
              />
              <div
                style={{
                  height: "7px",
                  width: "65%",
                  borderRadius: "2px",
                  background: "rgba(255,255,255,0.04)",
                }}
              />

              {/* Mock cards grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "8px",
                  marginTop: "8px",
                }}
              >
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    style={{
                      height: "48px",
                      borderRadius: "8px",
                      background: "#121B2E",
                      border: "1px solid rgba(99,102,241,0.1)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive styles */}
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
      `}</style>
    </motion.div>
  );
}