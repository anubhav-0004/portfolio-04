"use client";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { fadeInUp } from "@/lib/animations";

export default function ProjectCard({ project }) {
  return (
    <motion.div
      variants={fadeInUp}
      style={{
        position: "relative",
        borderRadius: "16px",
        padding: "1.5px",
        backgroundImage: `linear-gradient(#0D1320, #0D1320), linear-gradient(135deg, rgba(99,102,241,0.3), rgba(34,211,238,0.15))`,
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        border: "1.5px solid transparent",
        height: "100%",
        transition: "all 0.3s ease",
        cursor: "default",
      }}
      whileHover={{
        y: -6,
        boxShadow:
          "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(99,102,241,0.12)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundImage = `linear-gradient(#0D1320, #0D1320), linear-gradient(135deg, #6366F1, #A78BFA, #22D3EE)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundImage = `linear-gradient(#0D1320, #0D1320), linear-gradient(135deg, rgba(99,102,241,0.3), rgba(34,211,238,0.15))`;
      }}
    >
      {/* Inner card */}
      <div
        style={{
          background: "#0D1320",
          borderRadius: "15px",
          padding: "24px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "0px",
          position: "relative",
          overflow: "hidden",
        }}
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
        >
          {/* Icon + title */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                backgroundImage: `linear-gradient(#121B2E, #121B2E), linear-gradient(135deg, rgba(99,102,241,0.5), #22D3EE)`,
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
                  color: "#6366F1",
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
                background: "rgba(99,102,241,0.08)",
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
                e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)";
                e.currentTarget.style.transform = "rotate(-45deg) scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(99,102,241,0.08)";
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
            background:
              "linear-gradient(90deg, rgba(99,102,241,0.2), transparent)",
            marginBottom: "14px",
          }}
        />

        {/* Description */}
        <p
          style={{
            fontSize: "13px",
            color: "#94A3B8",
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
                color: "#6366F1",
                background: "rgba(99,102,241,0.07)",
                border: "1px solid rgba(99,102,241,0.18)",
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
            borderTop: "1px solid rgba(255,255,255,0.05)",
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
              color: "#478569",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#94A3B8";
              e.currentTarget.querySelector(".gh-icon").style.color = "#F1F5F9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#475569";
              e.currentTarget.querySelector(".gh-icon").style.color = "#475569";
            }}
          >
            <Github
              size={13}
              className="gh-icon"
              style={{ transition: "color 0.2s ease", color: "#478569" }}
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
                color: "#475569",
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