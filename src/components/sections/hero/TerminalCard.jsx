"use client";
import { motion } from "framer-motion";

export default function TerminalCard() {
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
          background:
            "radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)",
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
          background:
            "radial-gradient(circle, rgba(34,211,238,0.1), transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Terminal window */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          background: "rgba(13,19,32,0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(99,102,241,0.25)",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow:
            "0 0 40px rgba(99,102,241,0.2), 0 24px 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* ── Title bar ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "14px 20px",
            background: "#121B2E",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {/* Traffic light dots */}
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#FF5F57",
              flexShrink: 0,
            }}
          />
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#FEBC2E",
              flexShrink: 0,
            }}
          />
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#28C840",
              flexShrink: 0,
            }}
          />

          {/* Filename — centered */}
          <span
            style={{
              flex: 1,
              textAlign: "center",
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "12px",
              color: "#478869",
              letterSpacing: "0.03em",
            }}
          >
            developer.config.js
          </span>
        </div>

        {/* ── Code body ── */}
        <div
          style={{
            padding: "26px 30px 30px",
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: "13.5px",
            lineHeight: "2.05",
            letterSpacing: "0.01em",
            overflowX: "auto",
          }}
        >
          {/* const developer = { */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            style={{ display: "flex", alignItems: "center", gap: "0px" }}
          >
            <span style={{ color: "#C792EA" }}>const</span>
            <span style={{ color: "#F1F5F9" }}>&nbsp;</span>
            <span style={{ color: "#82AAFF" }}>developer</span>
            <span style={{ color: "#94A3B8" }}>&nbsp;= {"{"}</span>
          </motion.div>

          {/* name */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.18, duration: 0.3 }}
            style={{ paddingLeft: "28px" }}
          >
            <span style={{ color: "#82AAFF" }}>name</span>
            <span style={{ color: "#94A3B8" }}>:&nbsp;</span>
            <span style={{ color: "#C3E88D" }}>"Anubhav Kumar"</span>
            <span style={{ color: "#94A3B8" }}>,</span>
          </motion.div>

          {/* role */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.26, duration: 0.3 }}
            style={{ paddingLeft: "28px" }}
          >
            <span style={{ color: "#82AAFF" }}>role</span>
            <span style={{ color: "#94A3B8" }}>:&nbsp;</span>
            <span style={{ color: "#C3E88D" }}>"Full-Stack Engineer"</span>
            <span style={{ color: "#94A3B8" }}>,</span>
          </motion.div>

          {/* stack */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.34, duration: 0.3 }}
            style={{ paddingLeft: "28px" }}
          >
            <span style={{ color: "#82AAFF" }}>stack</span>
            <span style={{ color: "#94A3B8" }}>:&nbsp;</span>
            <span style={{ color: "#22D3EE" }}>
              ["React",&nbsp;"Next.js",&nbsp;"MongoDB"]
            </span>
            <span style={{ color: "#94A3B8" }}>,</span>
          </motion.div>

          {/* available */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.42, duration: 0.3 }}
            style={{ paddingLeft: "28px" }}
          >
            <span style={{ color: "#82AAFF" }}>available</span>
            <span style={{ color: "#94A3B8" }}>:&nbsp;</span>
            <span style={{ color: "#10B981" }}>true</span>
            <span style={{ color: "#94A3B8" }}>,</span>
          </motion.div>

          {/* passion */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.50, duration: 0.3 }}
            style={{ paddingLeft: "28px" }}
          >
            <span style={{ color: "#82AAFF" }}>passion</span>
            <span style={{ color: "#94A3B8" }}>:&nbsp;</span>
            <span style={{ color: "#C3E88D" }}>"building things that matter"</span>
            <span style={{ color: "#94A3B8" }}>,</span>
          </motion.div>

          {/* closing brace */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.58, duration: 0.3 }}
          >
            <span style={{ color: "#94A3B8" }}>{"};"}</span>
          </motion.div>

          {/* blank spacer */}
          <div style={{ height: "10px" }} />

          {/* comment */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.66, duration: 0.3 }}
          >
            <span style={{ color: "#475569" }}>
              {"// Currently focused on:"}
            </span>
          </motion.div>

          {/* focused value + cursor */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.74, duration: 0.3 }}
            style={{
              paddingLeft: "28px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#22D3EE" }}>
              "UI/UX + Design Systems"
            </span>
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
              }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}