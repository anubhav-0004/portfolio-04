"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      style={{
        position: "relative",
        width: "52px",
        height: "28px",
        borderRadius: "100px",
        border: "1px solid rgba(99,102,241,0.3)",
        background: isDark
          ? "rgba(99,102,241,0.1)"
          : "rgba(255,200,50,0.1)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        padding: "3px",
        transition: "all 0.3s ease",
        flexShrink: 0,
      }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = isDark
          ? "rgba(99,102,241,0.6)"
          : "rgba(255,200,50,0.6)";
        e.currentTarget.style.boxShadow = isDark
          ? "0 0 12px rgba(99,102,241,0.3)"
          : "0 0 12px rgba(255,200,50,0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = isDark
          ? "rgba(99,102,241,0.3)"
          : "rgba(255,200,50,0.3)";
        e.currentTarget.style.boxShadow = "none";
      }}
      aria-label="Toggle theme"
    >
      {/* Sliding pill */}
      <motion.div
        layout
        animate={{
          x: isDark ? 0 : 24,
          background: isDark
            ? "linear-gradient(135deg, #6366F1, #A78BFA)"
            : "linear-gradient(135deg, #F59E0B, #FCD34D)",
          boxShadow: isDark
            ? "0 0 8px rgba(99,102,241,0.6)"
            : "0 0 8px rgba(245,158,11,0.6)",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          width: "22px",
          height: "22px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 30, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Moon size={12} color="white" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -30, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Sun size={12} color="white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
}