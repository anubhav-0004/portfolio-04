"use client";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ProjectCard({ project }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = !mounted || theme === "dark";
  return (
    <motion.div
      variants={fadeInUp}
      style={{
        position: "relative",
        borderRadius: "16px",
        padding: "1.5px",
        backgroundImage: isDark
          ? `linear-gradient(#0D1320, #0D1320), linear-gradient(135deg, rgba(99,102,241,0.3), rgba(34,211,238,0.15))`
          : "#7d8696",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        border: "1.5px solid transparent",
        height: "100%",
        transition: "all 0.3s ease",
        cursor: "default",
      }}
      className="max-sm:p-px!"
      whileHover={{
        y: -6,
        boxShadow:
          "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(99,102,241,0.12)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundImage = `linear-gradient(#0D1320, #0D1320), linear-gradient(135deg, #6366F1, #A78BFA, #22D3EE)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundImage = isDark
          ? `linear-gradient(#0D1320, #0D1320), linear-gradient(135deg, rgba(99,102,241,0.3), rgba(34,211,238,0.15))`
          : "#7d8696";
      }}
    >
      {/* Inner card */}
      <div
        style={{
          background: isDark ? "#0D1320" : "#7d8696",
          borderRadius: "15px",
          padding: "24px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "0px",
          position: "relative",
          overflow: "hidden",
        }}
        className="max-sm:py-6! max-sm:px-4!"
      >
        {/* Subtle top glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "60px",
            background:
              "linear-gradient(180deg, rgba(99,102,241,0.06), transparent)",
            pointerEvents: "none",
            borderRadius: "15px 15px 0 0",
          }}
        />

        {/* Header row — icon + title + arrow */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
          className="max-sm:mb-3!"
        >
          {/* Icon + title */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                backgroundImage: isDark
                  ? `linear-gradient(#121B2E, #121B2E), linear-gradient(135deg, rgba(99,102,241,0.5), #22D3EE)`
                  : `linear-gradient(#383e6e, #383e6e), linear-gradient(135deg, rgba(99,102,241,0.6), #22D3EE)`,
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
                border: "1px solid transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                flexShrink: 0,
              }}
            >
              {project.icon}
            </div>

            <div>
              <h3
                className="font-heading"
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#F1F5F9",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.2,
                  marginBottom: "3px",
                }}
              >
                {project.title}
              </h3>
              <p
                style={{
                  fontSize: "11px",
                  color: isDark ? "#6366F1" : "#242675",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {project.subtitle}
              </p>
            </div>
          </div>

          {/* Top-right arrow link */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "8px",
                background: isDark ? "rgba(99,102,241,0.08)" : "#383e6e",
                border: "1px solid rgba(99,102,241,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#6366F1",
                textDecoration: "none",
                flexShrink: 0,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(99,102,241,0.2)";
                e.currentTarget.style.borderColor = isDark ? "rgba(99,102,241,0.5)" : "#1b2675";
                e.currentTarget.style.transform = "rotate(-45deg) scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isDark ? "rgba(99,102,241,0.08)" : "#383e6e";
                e.currentTarget.style.borderColor = "rgba(99,102,241,0.2)";
                e.currentTarget.style.transform = "rotate(0deg) scale(1)";
              }}
            >
              <ArrowUpRight size={16} />
            </a>
          )}
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: isDark ? 
              "linear-gradient(90deg, rgba(99,102,241,0.2), transparent)" : "#3a4178",
            marginBottom: "14px",
          }}
          className="max-sm:mb-2! max-sm:border-[rgba(99,102,241,0.5)]!"
        />

        {/* Description */}
        <p
          style={{
            fontSize: "13px",
            color: isDark ? "#94A3B8" : "#242675",
            lineHeight: 1.75,
            marginBottom: "16px",
            flex: 1,
          }}
        >
          {project.description}
        </p>

        {/* Tech stack */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            marginBottom: "18px",
          }}
        >
          {project.techStack.map((tech) => (
            <span
              key={tech}
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "10px",
                fontWeight: 600,
                color: isDark ? "#6366F1" : "#1b2675",
                background: "rgba(99,102,241,0.07)",
                border: isDark ? "1px solid rgba(99,102,241,0.18)" : "1px solid #1b2675",
                padding: "3px 9px",
                borderRadius: "5px",
                letterSpacing: "0.03em",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer — GitHub link */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "14px",
            borderTop: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid #3a4178",
          }}
        >
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              fontWeight: 500,
              color: isDark ? "#478569" : "white",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = isDark ? "#94A3B8" : "black";
              e.currentTarget.querySelector(".gh-icon").style.color = isDark ? "#F1F5F9" : "black";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = isDark ? "#478569" : "white";
              e.currentTarget.querySelector(".gh-icon").style.color = isDark ? "#478569" : "white";
            }}
          >
            <Github
              size={13}
              className="gh-icon"
              style={{ transition: "color 0.2s ease", color: isDark ? "#478569" : "white" }}
            />
            View source
          </a>

          {/* Dot indicator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background:
                  project.category === "fullstack"
                    ? "#10B981"
                    : project.category === "frontend"
                      ? "#6366F1"
                      : project.category === "backend"
                        ? "#F59E0B"
                        : "#22D3EE",
                boxShadow:
                  project.category === "fullstack"
                    ? "0 0 6px #10B981"
                    : project.category === "frontend"
                      ? "0 0 6px #6366F1"
                      : project.category === "backend"
                        ? "0 0 6px #F59E0B"
                        : "0 0 6px #22D3EE",
              }}
            />
            <span
              style={{
                fontSize: "10px",
                color: isDark ? "#475569" : "white",
                fontFamily: "var(--font-jetbrains-mono), monospace",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {project.category}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
