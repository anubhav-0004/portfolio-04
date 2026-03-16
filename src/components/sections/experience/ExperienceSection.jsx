"use client";
import { motion } from "framer-motion";
import { MapPin, Calendar, Award, ExternalLink, Briefcase } from "lucide-react";
import { staggerContainer, fadeInLeft } from "@/lib/animations";
import { experiences } from "@/content/experience";
import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionHeading from "@/components/shared/SectionHeading";

function TimelineNode({ exp }) {
  return (
    <div
      style={{
        position: "absolute",
        left: "-2px",
        top: "28px",
        width: "22px",
        height: "22px",
        zIndex: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Outer slow rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: "transparent",
          border: "1.5px solid transparent",
          backgroundImage:
            "linear-gradient(#070B12, #070B12), conic-gradient(#6366F1, #22D3EE, #A78BFA, #6366F1)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}
      />

      {/* Middle ring — counter rotate */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          inset: "3px",
          borderRadius: "50%",
          background: "transparent",
          border: "1px solid transparent",
          backgroundImage:
            "linear-gradient(#070B12, #070B12), conic-gradient(#22D3EE, #A78BFA, #6366F1, #22D3EE)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
          opacity: 0.6,
        }}
      />

      {/* Core dot */}
      <div
        style={{
          position: "absolute",
          inset: "6px",
          borderRadius: "50%",
          background: exp.current
            ? "linear-gradient(135deg, #6366F1, #22D3EE)"
            : "linear-gradient(135deg, #1E293B, #0D1320)",
          boxShadow: exp.current
            ? "0 0 10px rgba(99,102,241,0.9), 0 0 20px rgba(34,211,238,0.4)"
            : "0 0 6px rgba(99,102,241,0.3)",
          zIndex: 3,
        }}
      />

      {/* Ripple 1 */}
      <motion.div
        animate={{
          scale: [1, 2.8],
          opacity: [0.6, 0],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeOut",
        }}
        style={{
          position: "absolute",
          inset: "4px",
          borderRadius: "50%",
          border: "1.5px solid #6366F1",
          pointerEvents: "none",
        }}
      />

      {/* Ripple 2 */}
      <motion.div
        animate={{
          scale: [1, 3.5],
          opacity: [0.4, 0],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.6,
        }}
        style={{
          position: "absolute",
          inset: "4px",
          borderRadius: "50%",
          border: "1.5px solid #22D3EE",
          pointerEvents: "none",
        }}
      />

      {/* Ripple 3 */}
      <motion.div
        animate={{
          scale: [1, 4.2],
          opacity: [0.2, 0],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeOut",
          delay: 1.1,
        }}
        style={{
          position: "absolute",
          inset: "4px",
          borderRadius: "50%",
          border: "1px solid #A78BFA",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

function CertificateBadge({ exp }) {
  if (exp.current) {
    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 14px",
          borderRadius: "100px",
          background: "rgba(16,185,129,0.08)",
          border: "1px solid rgba(16,185,129,0.25)",
          fontSize: "12px",
          fontWeight: 600,
          color: "#10B981",
        }}
      >
        <motion.span
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: "#10B981",
            display: "inline-block",
            boxShadow: "0 0 8px #10B981",
          }}
        />
        Currently Working
      </div>
    );
  }

  if (!exp.certificate) {
    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 14px",
          borderRadius: "100px",
          background: "rgba(71,85,105,0.1)",
          border: "1px solid rgba(71,85,105,0.2)",
          fontSize: "12px",
          fontWeight: 500,
          color: "#475569",
        }}
      >
        <Award size={12} />
        Certificate Pending
      </div>
    );
  }

  return (
    <motion.a
      href={exp.certificate}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "7px",
        padding: "7px 16px",
        borderRadius: "100px",
        backgroundImage: `linear-gradient(#0D1320, #0D1320), linear-gradient(135deg, #F59E0B, #FBBF24, #F59E0B)`,
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        border: "1.5px solid transparent",
        fontSize: "12px",
        fontWeight: 600,
        color: "#F59E0B",
        textDecoration: "none",
        cursor: "pointer",
        transition: "all 0.25s ease",
        position: "relative",
        overflow: "hidden",
      }}
      whileHover={{
        scale: 1.04,
        boxShadow: "0 0 20px rgba(245,158,11,0.3)",
      }}
      whileTap={{ scale: 0.97 }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundImage = `linear-gradient(#0D1320, #0D1320), linear-gradient(135deg, #F59E0B, #FBBF24, #F97316, #F59E0B)`;
        e.currentTarget.style.boxShadow =
          "0 0 16px rgba(245,158,11,0.35), 0 0 40px rgba(245,158,11,0.12)";
        e.currentTarget.style.letterSpacing = "0.04em";
        e.currentTarget.querySelector(".cert-icon").style.filter =
          "drop-shadow(0 0 6px rgba(245,158,11,0.8))";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundImage = `linear-gradient(#0D1320, #0D1320), linear-gradient(135deg, #F59E0B, #FBBF24, #F59E0B)`;
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.letterSpacing = "0.02em";
        e.currentTarget.querySelector(".cert-icon").style.filter = "none";
      }}
    >
      {/* Shimmer */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
          animation: "cert-shimmer 3s linear infinite",
          borderRadius: "100px",
          pointerEvents: "none",
        }}
      />
      <Award size={13} className="cert-icon" style={{ flexShrink: 0, transition: "filter 0.2s ease" }} />
      View Certificate
      <ExternalLink size={11} style={{ flexShrink: 0, opacity: 0.7 }} />
    </motion.a>
  );
}

function ExperienceCard({ exp, index }) {
  return (
    <motion.div
      variants={fadeInLeft}
      style={{ position: "relative", paddingLeft: "44px" }}
    >
      <TimelineNode exp={exp} />

      {/* Card */}
      <div
        style={{
          background: "#0D1320",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid rgba(99,102,241,0.15)",
          transition: "all 0.3s ease",
          position: "relative",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)";
          e.currentTarget.style.boxShadow =
            "0 12px 40px rgba(0,0,0,0.3), 0 0 20px rgba(99,102,241,0.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(99,102,241,0.15)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Top colored bar */}
        <div
          style={{
            height: "3px",
            background: exp.current
              ? "linear-gradient(90deg, #6366F1, #22D3EE)"
              : "linear-gradient(90deg, #6366F1 0%, #A78BFA 50%, transparent 100%)",
          }}
        />

        {/* Card body */}
        <div style={{ padding: "24px 28px" }}>
          {/* Top row — company info + date */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: "16px",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            {/* Left — company + role */}
            <div style={{ flex: 1, minWidth: "200px" }}>
              {/* Company row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "6px",
                }}
              >
                {/* Company icon */}
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: "rgba(99,102,241,0.1)",
                    border: "1px solid rgba(99,102,241,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Briefcase size={14} color="#6366F1" />
                </div>

                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#6366F1",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  {exp.company}
                </p>

                {exp.type === "Internship" && (
                  <span
                    style={{
                      padding: "2px 10px",
                      borderRadius: "5px",
                      background: "rgba(245,158,11,0.1)",
                      border: "1px solid rgba(245,158,11,0.25)",
                      fontSize: "10px",
                      fontWeight: 600,
                      color: "#F59E0B",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {exp.type}
                  </span>
                )}
              </div>

              {/* Role */}
              <h3
                className="font-heading"
                style={{
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "#F1F5F9",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                }}
              >
                {exp.role}
              </h3>
            </div>

            {/* Right — date + location */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "5px",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "11px",
                  color: "#94A3B8",
                  background: "rgba(99,102,241,0.06)",
                  border: "1px solid rgba(99,102,241,0.82)",
                  padding: "4px 10px",
                  borderRadius: "6px",
                }}
              >
                <Calendar size={10} />
                {exp.startDate} — {exp.endDate}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "14px",
                  color: "#87afe8",
                }}
              >
                <MapPin size={10} />
                {exp.location}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, rgba(99,102,241,0.2), transparent)",
              marginBottom: "16px",
            }}
          />

          {/* Bullets */}
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              marginBottom: "18px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {exp.bullets.map((bullet, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start",
                  fontSize: "14px",
                  color: "#94A3B8",
                  lineHeight: 1.7,
                }}
              >
                <span
                  style={{
                    color: "#6366F1",
                    fontSize: "12px",
                    marginTop: "4px",
                    flexShrink: 0,
                    filter: "drop-shadow(0 0 4px rgba(99,102,241,0.5))",
                  }}
                >
                  →
                </span>
                {bullet}
              </motion.li>
            ))}
          </ul>

          {/* Tech tags */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
              marginBottom: "20px",
            }}
          >
            {exp.techStack.map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: "10px",
                  color: "#82ace8",
                  background: "#121B3E",
                  padding: "3px 9px",
                  borderRadius: "4px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#94A3B8";
                  e.currentTarget.style.borderColor = "rgba(99,102,241,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#475569";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Footer — certificate */}
          <div
            style={{
              paddingTop: "16px",
              borderTop: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <CertificateBadge exp={exp} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  return (
    <SectionWrapper id="experience" className="bg-background-secondary">
      <SectionHeading
        eyebrow="Career Path"
        title="Where I've"
        highlight="Been"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        className="mt-4!"
        viewport={{ once: true, margin: "-60px" }}
        style={{
          position: "relative",
          paddingLeft: "28px",
          display: "flex",
          flexDirection: "column",
          gap: "28px",
        }}
      >
        {/* Animated glowing timeline line */}
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            left: 0,
            top: "8px",
            bottom: "8px",
            width: "2px",
            background:
              "linear-gradient(180deg, #6366F1, #A78BFA 40%, #22D3EE 80%, transparent)",
            transformOrigin: "top",
            boxShadow:
              "0 0 8px rgba(99,102,241,0.5), 0 0 20px rgba(99,102,241,0.2)",
            borderRadius: "2px",
          }}
        />

        {/* Traveling glow orb */}
        <motion.div
          initial={{ top: "8px", opacity: 0 }}
          whileInView={{ top: "95%", opacity: [0, 1, 1, 0] }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            delay: 0.4,
            opacity: { times: [0, 0.1, 0.9, 1] },
          }}
          style={{
            position: "absolute",
            left: "-5px",
            width: "12px",
            height: "50px",
            borderRadius: "50%",
            background: "linear-gradient(180deg, #22D3EE, #6366F1)",
            filter: "blur(5px)",
            boxShadow:
              "0 0 16px rgba(34,211,238,0.9), 0 0 30px rgba(99,102,241,0.6)",
            pointerEvents: "none",
            zIndex: 3,
          }}
        />

        {experiences.map((exp, i) => (
          <ExperienceCard key={exp.id} exp={exp} index={i} />
        ))}
      </motion.div>

      <style>{`
        @keyframes cert-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </SectionWrapper>
  );
}
