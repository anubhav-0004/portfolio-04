"use client";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function TerminalCard() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = !mounted || theme === "dark";

  // Theme-aware color tokens
const t = {
    windowBg: isDark ? "rgba(13,19,32,0.92)" : "#1A1F2E",
    titleBarBg: isDark ? "#121B2E" : "#141824",
    titleBarBorder: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.07)",
    border: isDark ? "rgba(99,102,241,0.25)" : "rgba(99,102,241,0.45)",
    shadow: isDark
      ? "0 0 40px rgba(99,102,241,0.2), 0 24px 60px rgba(0,0,0,0.5)"
      : "0 0 50px rgba(99,102,241,0.3), 0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,102,241,0.1)",
    filename: isDark ? "#4A7060" : "#8B9AC0",
    punctuation: isDark ? "#94A3B8" : "#7B859E",
    keyword: isDark ? "#C792EA" : "#D4AAFF",
    variable: isDark ? "#82AAFF" : "#93C5FD",
    string: isDark ? "#C3E88D" : "#86EFAC",
    array: isDark ? "#22D3EE" : "#67E8F9",
    bool: isDark ? "#10B981" : "#34D399",
    comment: isDark ? "#475569" : "#64748B",
    whitespace: isDark ? "#F1F5F9" : "#CBD5E1",
    lineNumBg: isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.03)",
    lineNumColor: isDark ? "#2D3748" : "#4A5568",
    orb1: isDark
      ? "radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)"
      : "radial-gradient(circle, rgba(99,102,241,0.25), transparent 70%)",
    orb2: isDark
      ? "radial-gradient(circle, rgba(34,211,238,0.1), transparent 70%)"
      : "radial-gradient(circle, rgba(34,211,238,0.18), transparent 70%)",
  };

  const codeLines = [
    {
      num: 1,
      content: (
        <>
          <span style={{ color: t.keyword }}>const</span>
          <span style={{ color: t.whitespace }}>&nbsp;</span>
          <span style={{ color: t.variable }}>developer</span>
          <span style={{ color: t.punctuation }}>&nbsp;= {"{"}</span>
        </>
      ),
    },
    {
      num: 2,
      indent: true,
      content: (
        <>
          <span style={{ color: t.variable }}>name</span>
          <span style={{ color: t.punctuation }}>:&nbsp;</span>
          <span style={{ color: t.string }}>"Anubhav Kumar"</span>
          <span style={{ color: t.punctuation }}>,</span>
        </>
      ),
    },
    {
      num: 3,
      indent: true,
      content: (
        <>
          <span style={{ color: t.variable }}>role</span>
          <span style={{ color: t.punctuation }}>:&nbsp;</span>
          <span style={{ color: t.string }}>"Full-Stack Engineer"</span>
          <span style={{ color: t.punctuation }}>,</span>
        </>
      ),
    },
    {
      num: 4,
      indent: true,
      content: (
        <>
          <span style={{ color: t.variable }}>stack</span>
          <span style={{ color: t.punctuation }}>:&nbsp;</span>
          <span style={{ color: t.array }}>
            ["React",&nbsp;"Next.js",&nbsp;"MongoDB"]
          </span>
          <span style={{ color: t.punctuation }}>,</span>
        </>
      ),
    },
    {
      num: 5,
      indent: true,
      content: (
        <>
          <span style={{ color: t.variable }}>available</span>
          <span style={{ color: t.punctuation }}>:&nbsp;</span>
          <span style={{ color: t.bool }}>true</span>
          <span style={{ color: t.punctuation }}>,</span>
        </>
      ),
    },
    {
      num: 6,
      indent: true,
      content: (
        <>
          <span style={{ color: t.variable }}>passion</span>
          <span style={{ color: t.punctuation }}>:&nbsp;</span>
          <span style={{ color: t.string }}>"building things that matter"</span>
          <span style={{ color: t.punctuation }}>,</span>
        </>
      ),
    },
    {
      num: 7,
      content: (
        <span style={{ color: t.punctuation }}>{"};"}</span>
      ),
    },
    { num: 8, blank: true },
    {
      num: 9,
      content: (
        <span style={{ color: t.comment }}>{"// Currently focused on:"}</span>
      ),
    },
    {
      num: 10,
      indent: true,
      cursor: true,
      content: (
        <span style={{ color: t.array }}>"UI/UX + Design Systems"</span>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: "relative" }}
    >
      {/* Glow orb — top right */}
      <div
        style={{
          position: "absolute",
          top: "-40px",
          right: "-40px",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          background: t.orb1,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Glow orb — bottom left */}
      <div
        style={{
          position: "absolute",
          bottom: "-40px",
          left: "-20px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: t.orb2,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Terminal window */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          background: t.windowBg,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: `1px solid ${t.border}`,
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: t.shadow,
          transition: "all 0.4s ease",
        }}
      >
        {/* ── Title bar ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "14px 20px",
            background: t.titleBarBg,
            borderBottom: `1px solid ${t.titleBarBorder}`,
          }}
        >
          {/* Traffic light dots */}
          {["#FF5F57", "#FEBC2E", "#28C840"].map((color) => (
            <div
              key={color}
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: color,
                flexShrink: 0,
                boxShadow: `0 0 6px ${color}60`,
              }}
            />
          ))}

          {/* Filename */}
          <span
            style={{
              flex: 1,
              textAlign: "center",
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "12px",
              color: t.filename,
              letterSpacing: "0.03em",
            }}
          >
            developer.config.js
          </span>

          {/* Window controls mock */}
          <div style={{ display: "flex", gap: "4px", opacity: 0.3 }}>
            {[16, 22, 12].map((w, i) => (
              <div
                key={i}
                style={{
                  width: `${w}px`,
                  height: "4px",
                  borderRadius: "2px",
                  background: t.filename,
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Code body ── */}
        <div
          style={{
            padding: "20px 0 24px",
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: "13.5px",
            lineHeight: "2.05",
            letterSpacing: "0.01em",
            overflowX: "auto",
          }}
        >
          {codeLines.map((line, i) => (
            <motion.div
              key={line.num}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.3 }}
              style={{
                display: "flex",
                alignItems: "center",
                paddingRight: "30px",
                minHeight: line.blank ? "16px" : "auto",
              }}
            >
              {/* Line number */}
              <span
                style={{
                  width: "48px",
                  minWidth: "48px",
                  textAlign: "right",
                  paddingRight: "20px",
                  fontSize: "11px",
                  color: t.lineNumColor,
                  userSelect: "none",
                  flexShrink: 0,
                }}
              >
                {line.blank ? "" : line.num}
              </span>

              {/* Line highlight on active line */}
              {line.cursor && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    height: "28px",
                    background: "rgba(99,102,241,0.06)",
                    pointerEvents: "none",
                  }}
                />
              )}

              {/* Indent + content */}
              <span style={{ paddingLeft: line.indent ? "28px" : "0px" }}>
                {line.content}
              </span>

              {/* Blinking cursor on last line */}
              {line.cursor && (
                <span
                  className="animate-blink"
                  style={{
                    display: "inline-block",
                    width: "2px",
                    height: "16px",
                    background: "#6366F1",
                    marginLeft: "5px",
                    verticalAlign: "middle",
                    borderRadius: "1px",
                    flexShrink: 0,
                    boxShadow: "0 0 8px rgba(99,102,241,0.8)",
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom status bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "6px 20px",
            background: isDark
              ? "rgba(99,102,241,0.08)"
              : "rgba(99,102,241,0.12)",
            borderTop: `1px solid ${t.titleBarBorder}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                fontSize: "10px",
                color: "#6366F1",
                fontFamily: "var(--font-jetbrains-mono), monospace",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#10B981",
                  display: "inline-block",
                  boxShadow: "0 0 6px #10B981",
                }}
              />
              JavaScript
            </span>
            <span
              style={{
                fontSize: "10px",
                color: t.comment,
                fontFamily: "var(--font-jetbrains-mono), monospace",
              }}
            >
              UTF-8
            </span>
          </div>
          <span
            style={{
              fontSize: "10px",
              color: t.comment,
              fontFamily: "var(--font-jetbrains-mono), monospace",
            }}
          >
            Ln 10, Col 34
          </span>
        </div>
      </div>
    </motion.div>
  );
}