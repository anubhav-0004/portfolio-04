"use client";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { projects } from "@/content/projects";
import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionHeading from "@/components/shared/SectionHeading";
import FeaturedProject from "./FeaturedProject";
import ProjectCard from "./ProjectCard";

const featuredProject = projects.find((p) => p.featured);
const otherProjects = projects.filter((p) => !p.featured);

export default function ProjectsSection() {
  return (
    <SectionWrapper id="projects">
      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "48px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <SectionHeading
          eyebrow="What I've Built"
          title="Featured"
          highlight="Projects"
          className="mb-0"
        />
        <motion.a
          href="https://github.com/anubhav-0004"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            fontWeight: 600,
            color: "#F1F5F9",
            textDecoration: "none",
            padding: "10px 20px",
            borderRadius: "100px",
            position: "relative",
            letterSpacing: "0.02em",
            backgroundImage: `linear-gradient(#0D1320, #0D1320), linear-gradient(135deg, #6366F1, #A78BFA, #22D3EE)`,
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
            border: "1.5px solid transparent",
            transition: "all 0.3s ease",
            overflow: "hidden",
          }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundImage = `linear-gradient(135deg, rgba(99,102,241,0.15), rgba(167,139,250,0.1), rgba(34,211,238,0.15)), linear-gradient(135deg, #6366F1, #A78BFA, #22D3EE)`;
            e.currentTarget.style.boxShadow =
              "0 0 24px rgba(99,102,241,0.3), 0 8px 32px rgba(0,0,0,0.3)";
            e.currentTarget.querySelector(".gh-arrow").style.transform =
              "translateX(4px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundImage = `linear-gradient(#0D1320, #0D1320), linear-gradient(135deg, #6366F1, #A78BFA, #22D3EE)`;
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.querySelector(".gh-arrow").style.transform =
              "translateX(0px)";
          }}
        >
          {/* Shimmer sweep effect */}
          <span
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)",
              backgroundSize: "200% 100%",
              animation: "shimmer-sweep 3s linear infinite",
              borderRadius: "100px",
              pointerEvents: "none",
            }}
          />

          {/* Github icon */}
          <Github
            size={15}
            style={{
              flexShrink: 0,
              filter: "drop-shadow(0 0 4px rgba(99,102,241,0.6))",
            }}
          />

          {/* Label */}
          <span style={{ position: "relative", zIndex: 1 }}>
            View All on GitHub
          </span>

          {/* Animated arrow */}
          <span
            className="gh-arrow"
            style={{
              display: "inline-block",
              transition: "transform 0.25s ease",
              fontSize: "13px",
              position: "relative",
              zIndex: 1,
            }}
          >
            →
          </span>

          <style>{`
    @keyframes shimmer-sweep {
      0%   { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `}</style>
        </motion.a>
      </div>

      {/* Featured project */}
      {featuredProject && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
        >
          <FeaturedProject project={featuredProject} />
        </motion.div>
      )}

      {/* Other projects grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(1, 1fr)",
          gap: "16px",
        }}
        className="projects-grid"
      >
        {otherProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>

      <style>{`
        @media (min-width: 640px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </SectionWrapper>
  );
}
