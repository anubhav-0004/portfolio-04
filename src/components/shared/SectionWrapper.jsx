"use client";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { fadeInUp } from "@/lib/animations";

export default function SectionWrapper({ children, id, className = "" }) {
  const { ref, isInView } = useInView({ threshold: 0.08 });

  return (
    <motion.section
      id={id}
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`section-padding ${className}`}
    >
      <div className="page-container">
        {children}
      </div>
    </motion.section>
  );
}