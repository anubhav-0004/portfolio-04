"use client";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { achievements, leetcodeStats } from "@/content/achievements";
import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionHeading from "@/components/shared/SectionHeading";

const glowMap = {
  orange: "rgba(249,115,22,0.2)",
  blue: "rgba(59,130,246,0.2)",
  green: "rgba(16,185,129,0.2)",
};

const borderMap = {
  orange: "rgba(249,115,22,0.3)",
  blue: "rgba(59,130,246,0.3)",
  green: "rgba(16,185,129,0.3)",
};

function AchievementCard({ item }) {
  return (
    <motion.div
      variants={fadeInUp}
      style={{
        background: "#0D1320",
        border: "1px solid rgba(99,102,241,0.15)",
        borderRadius: "16px",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "all 0.25s ease",
      }}
      whileHover={{
        borderColor: borderMap[item.glowColor] || "rgba(99,102,241,0.3)",
        y: -3,
        boxShadow: `0 12px 40px rgba(0,0,0,0.3), 0 0 20px ${glowMap[item.glowColor] || "rgba(99,102,241,0.1)"}`,
      }}
    >
      {/* Top glow line on hover handled via whileHover on border */}
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          background: `${glowMap[item.glowColor] || "rgba(99,102,241,0.1)"}`,
          border: `1px solid ${borderMap[item.glowColor] || "rgba(99,102,241,0.2)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "22px",
          marginBottom: "14px",
        }}
      >
        {item.icon}
      </div>

      <h3
        className="font-heading"
        style={{
          fontSize: "15px",
          fontWeight: 700,
          color: "#F1F5F9",
          marginBottom: "4px",
        }}
      >
        {item.title}
      </h3>

      <p
        style={{
          fontSize: "12px",
          color: "#7b94b8",
          marginBottom: "16px",
          lineHeight: 1.5,
        }}
      >
        {item.org} · {item.date || item.rating}
      </p>

      <a
        href={item.verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
          fontSize: "12px",
          fontWeight: 500,
          color: "#6366F1",
          textDecoration: "none",
          transition: "gap 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.gap = "8px";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.gap = "5px";
        }}
      >
        Verify <ExternalLink size={11} />
      </a>
    </motion.div>
  );
}

function LeetCodeRing({ value, total, color, label }) {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const filled = (value / total) * circumference;

  return (
    <div style={{ textAlign: "center" }}>
      <svg width="60" height="60" viewBox="0 0 60 60">
        <circle
          cx="30"
          cy="30"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="5"
        />
        <circle
          cx="30"
          cy="30"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeDasharray={`${filled} ${circumference - filled}`}
          strokeLinecap="round"
          transform="rotate(-90 30 30)"
        />
        <text
          x="30"
          y="34"
          textAnchor="middle"
          fill="#F1F5F9"
          fontSize="12"
          fontWeight="700"
          fontFamily="Syne, sans-serif"
        >
          {value}
        </text>
      </svg>
      <p
        style={{
          fontSize: "10px",
          color: "#475569",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginTop: "4px",
        }}
      >
        {label}
      </p>
    </div>
  );
}

export default function AchievementsSection() {
  return (
    <SectionWrapper id="achievements" className="bg-background-secondary">
      <SectionHeading
        eyebrow="Recognition"
        title="Achievements &"
        highlight="Certifications"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(1, 1fr)",
          gap: "16px",
          marginTop: "10px"
        }}
        className="ach-grid"
      >
        {achievements.map((item) => (
          <AchievementCard key={item.id} item={item} />
        ))}

        {/* LeetCode card — spans 2 cols on md+ */}
        <motion.div
          variants={fadeInUp}
          className="lc-card"
          style={{
            background: "#0D1320",
            border: "1px solid rgba(99,102,241,0.15)",
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: "rgba(245,158,11,0.12)",
                border: "1px solid rgba(245,158,11,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "10px",
                fontWeight: 700,
                color: "#F59E0B",
              }}
            >
              LC
            </div>
            <div>
              <p
                className="font-heading"
                style={{ fontSize: "15px", fontWeight: 700, color: "#F1F5F9" }}
              >
                LeetCode Stats
              </p>
              <p style={{ fontSize: "11px", color: "#475569" }}>
                @{leetcodeStats.username} · Global Rank #{leetcodeStats.rank}
              </p>
            </div>
          </div>

          {/* Rings row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <LeetCodeRing
              value={leetcodeStats.solved}
              total={3000}
              color="#6366F1"
              label="Solved"
            />
            <LeetCodeRing
              value={leetcodeStats.easy}
              total={800}
              color="#10B981"
              label="Easy"
            />
            <LeetCodeRing
              value={leetcodeStats.medium}
              total={1500}
              color="#F59E0B"
              label="Medium"
            />
            <LeetCodeRing
              value={leetcodeStats.hard}
              total={700}
              color="#EF4444"
              label="Hard"
            />

            {/* Streak */}
            <div
              style={{
                flex: 1,
                minWidth: "100px",
                paddingLeft: "16px",
                borderLeft: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "10px",
                  color: "#475569",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "6px",
                }}
              >
                Current Streak
              </p>
              <p
                className="font-heading"
                style={{
                  fontSize: "32px",
                  fontWeight: 800,
                  color: "#F59E0B",
                  lineHeight: 1,
                }}
              >
                {leetcodeStats.streak} 🔥
              </p>
              <p style={{ fontSize: "11px", color: "#475569", marginTop: "4px" }}>
                days
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        @media (min-width: 640px) {
          .ach-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 1024px) {
          .ach-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .lc-card {
            grid-column: span 2 !important;
          }
        }
      `}</style>
    </SectionWrapper>
  );
}