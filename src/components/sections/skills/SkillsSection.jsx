"use client";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { coreSkills, skillCategories } from "@/content/skills";
import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionHeading from "@/components/shared/SectionHeading";

function CoreSkillCard({ skill, index }) {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      style={{
        backgroundImage: `linear-gradient(#0D1320, #0D1320), linear-gradient(135deg, rgba(99,102,241,0.4), #22D3EE)`,
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        border: "1px solid transparent",
        borderRadius: "14px",
        padding: "20px 16px",
        textAlign: "center",
        cursor: "default",
        transition: "all 0.25s ease",
      }}
      whileHover={{
        y: -4,
        boxShadow:
          "0 12px 40px rgba(0,0,0,0.3), 0 0 20px rgba(99,102,241,0.15)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundImage = `linear-gradient(#0D1320, #0D1320), linear-gradient(135deg, #6366F1, #A78BFA, #22D3EE)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundImage = `linear-gradient(#0D1320, #0D1320), linear-gradient(135deg, rgba(99,102,241,0.4), #22D3EE)`;
      }}
    >
      {/* Icon */}
      <div
        style={{
          fontSize: "28px",
          marginBottom: "10px",
          color: skill.color,
          filter: `drop-shadow(0 0 8px ${skill.color}60)`,
          fontFamily:
            skill.icon.length <= 2
              ? "var(--font-jetbrains-mono), monospace"
              : "inherit",
          fontWeight: 700,
          lineHeight: 1.2,
        }}
      >
        {skill.icon}
      </div>

      {/* Name */}
      <p
        style={{
          fontSize: "11px",
          fontWeight: 600,
          color: "#94A3B8",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: "12px",
        }}
      >
        {skill.name}
      </p>

      {/* Progress bar */}
      <div
        style={{
          height: "3px",
          background: "#6e89c2",
          borderRadius: "2px",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${skill.level}%` : 0 }}
          transition={{
            duration: 1,
            delay: index * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #6366F1, #22D3EE)",
            borderRadius: "2px",
          }}
        />
      </div>

      {/* Level number */}
      <p
        style={{
          fontSize: "12px",
          color: "#6880a1",
          marginTop: "6px",
          fontFamily: "var(--font-jetbrains-mono), monospace",
        }}
      >
        {skill.level}%
      </p>
    </motion.div>
  );
}

function SkillBadge({ skill, muted }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "5px 12px",
        borderRadius: "100px",
        border: "1.5px solid transparent",
        backgroundImage: muted
          ? `linear-gradient(#0D1320, #0D1320), linear-gradient(135deg, #475569, #818CF8, #475569)`
          : `linear-gradient(#0D1320, #0D1320), linear-gradient(135deg, ${skill.color}, rgba(99,102,241,0.6), #22D3EE)`,
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        fontSize: "12px",
        fontWeight: 500,
        color: muted ? "#475869" : "#94A3B8",
        opacity: muted ? 0.9 : 1,
        transition: "all 0.2s ease",
        cursor: "default",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)";
        e.currentTarget.style.color = "#F1F5F9";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(99,102,241,0.15)";
        e.currentTarget.style.color = "#94A3B8";
      }}
    >
      <span
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: skill.color,
          flexShrink: 0,
          boxShadow: `0 0 6px ${skill.color}80`,
        }}
      />
      {skill.name}
    </span>
  );
}

export default function SkillsSection() {
  return (
    <SectionWrapper id="skills" className="relative">
      {/* Faint background band */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, transparent, rgba(99,102,241,0.03) 50%, transparent)",
          pointerEvents: "none",
        }}
      />

      <SectionHeading
        eyebrow="Technical Arsenal"
        title="What I"
        highlight="Work With"
      />

      {/* Core Skills Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "12px",
          marginBottom: "40px",
        }}
        className="skills-core-grid mt-3!"
      >
        {coreSkills.map((skill, i) => (
          <CoreSkillCard key={skill.name} skill={skill} index={i} />
        ))}
      </motion.div>

      {/* Skill Categories */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ display: "flex", flexDirection: "column", gap: "24px" }}
      >
        {skillCategories.map((category, i) => (
          <motion.div key={category.label} variants={fadeInUp}>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: category.muted ? "rgba(99,182,241,0.6)" : "#478569",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {category.muted && <span>🔭</span>}
              {category.label}
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              {category.skills.map((skill) => (
                <SkillBadge
                  key={skill.name}
                  skill={skill}
                  muted={category.muted}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <style>{`
        @media (min-width: 640px) {
          .skills-core-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (min-width: 1024px) {
          .skills-core-grid {
            grid-template-columns: repeat(6, 1fr) !important;
          }
        }
      `}</style>
    </SectionWrapper>
  );
}
