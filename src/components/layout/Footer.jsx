"use client";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = !mounted || theme === "dark";
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        borderTop: "1px solid rgba(99,102,241,0.12)",
        background: "#070B12",
        position: "relative",
      }}
    >
      {/* Top gradient line */}
      <div
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(99,102,241,0.4) 30%, rgba(34,211,238,0.4) 70%, transparent)",
          marginBottom: "0",
        }}
      />

      <div
        className="page-container"
        style={{
          paddingTop: "24px",
          paddingBottom: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        {/* Left */}
        <p style={{ fontSize: "13px", color: isDark ? "#475569" : "#1b2675" }}>
          Designed & Built by{" "}
          <span style={{ color: isDark ? "#94A3B8" : "#050c3d", fontWeight: 500 }}>
            {siteConfig.name}
          </span>{" "}
          ·{" "}
          <span style={{ color: "#6366F1" }}>© {new Date().getFullYear()}</span>
        </p>

        {/* Center */}
        <p
          style={{
            fontSize: "11px",
            color: "#475569",
            fontFamily: "var(--font-jetbrains-mono), monospace",
          }}
        >
          Next.js · Tailwind · Framer Motion
        </p>

        {/* Right */}
        <motion.button
          onClick={scrollToTop}
          style={{
            fontSize: "12px",
            color: "#6366F1",
            fontWeight: 500,
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontFamily: "var(--font-jetbrains-mono), monospace",
          }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          ↑ back to top
        </motion.button>
      </div>
    </footer>
  );
}
