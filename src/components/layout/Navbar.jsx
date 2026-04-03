"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { siteConfig } from "@/config/site";
import ThemeToggle from "@/components/shared/ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => setMounted(true), []);

  const isDark = !mounted || theme === "dark";

  // Theme-aware color tokens
  const colors = {
    navBg: scrolled
      ? isDark
        ? "rgba(13,19,42,0.92)"
        : "rgba(255,255,255,0.94)"
      : isDark
        ? "rgba(13,19,42,0.2)"
        : "rgba(255,255,255,0.4)",
    navBorder: scrolled
      ? isDark
        ? "rgba(99,102,241,0.15)"
        : "rgba(99,102,241,0.12)"
      : "1px solid transparent",
    navShadow: scrolled
      ? isDark
        ? "0 8px 32px rgba(0,0,0,0.3)"
        : "0 4px 24px rgba(99,102,241,0.08), 0 1px 0 rgba(99,102,241,0.06)"
      : "none",
    logoColor: isDark ? "#F1F5F9" : "#0F172A",
    navLinkColor: isDark ? "#94A3B8" : "#64748B",
    navLinkHover: isDark ? "#F1F5F9" : "#0F172A",
    navLinkActive: isDark ? "#F1F5F9" : "#0F172A",
    navActiveBg: isDark ? "rgba(255,255,255,0.06)" : "rgba(99,102,241,0.08)",
    navActiveBorder: isDark
      ? "rgba(255,255,255,0.08)"
      : "rgba(99,102,241,0.15)",
    mobileBg: isDark
      ? "rgba(13,19,32,0.97)"
      : "rgba(255,255,255,0.97)",
    mobileBorder: isDark
      ? "rgba(99,102,241,0.15)"
      : "rgba(99,102,241,0.12)",
    mobileLinkColor: isDark ? "#94A3B8" : "#64748B",
    mobileLinkHover: isDark ? "#F1F5F9" : "#0F172A",
    mobileLinkHoverBg: isDark
      ? "rgba(255,255,255,0.05)"
      : "rgba(99,102,241,0.06)",
    mobileDivider: isDark
      ? "rgba(255,255,255,0.08)"
      : "rgba(99,102,241,0.1)",
    hamburgerBorder: isDark
      ? "rgba(255,255,255,0.1)"
      : "rgba(99,102,241,0.15)",
    hamburgerBg: isDark
      ? "rgba(255,255,255,0.04)"
      : "rgba(99,102,241,0.04)",
    hamburgerColor: isDark ? "#94A3B8" : "#64748B",
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = siteConfig.nav.map((item) =>
        item.href.replace("#", "")
      );
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: "12px",
          left: 0,
          right: 0,
          zIndex: 50,
          padding: "0 16px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            borderRadius: "16px",
            padding: "12px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "all 0.3s ease",
            background: colors.navBg,
            backdropFilter: scrolled ? "blur(20px)" : "blur(8px)",
            WebkitBackdropFilter: scrolled ? "blur(20px)" : "blur(8px)",
            border: `1px solid ${scrolled ? (isDark ? "rgba(99,102,241,0.15)" : "rgba(99,102,241,0.12)") : "transparent"}`,
            boxShadow: colors.navShadow,
          }}
        >
          {/* Logo */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "18px",
              fontWeight: 500,
              color: colors.logoColor,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "color 0.3s ease",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span style={{ color: "#6366F1" }}>{"{"}</span>
            {" AM "}
            <span style={{ color: "#6366F1" }}>{"}"}</span>
          </motion.button>

          {/* Desktop Nav */}
          <nav
            style={{ display: "flex", alignItems: "center", gap: "4px" }}
            className="desktop-nav"
          >
            {siteConfig.nav.map((item) => {
              const isActive =
                activeSection === item.href.replace("#", "");
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  style={{
                    position: "relative",
                    padding: "8px 16px",
                    fontSize: "14px",
                    fontWeight: 500,
                    borderRadius: "10px",
                    border: "none",
                    background: isActive ? colors.navActiveBg : "transparent",
                    color: isActive
                      ? colors.navLinkActive
                      : colors.navLinkColor,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = colors.navLinkHover;
                      e.currentTarget.style.background = isDark
                        ? "rgba(255,255,255,0.04)"
                        : "rgba(99,102,241,0.05)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = colors.navLinkColor;
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "10px",
                        background: colors.navActiveBg,
                        border: `1px solid ${colors.navActiveBorder}`,
                        zIndex: -1,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", }} className="nav-right">
            <ThemeToggle />

            <motion.button
              onClick={() => handleNavClick("#contact")}
              className="hire-btn"
              style={{
                padding: "9px 22px",
                borderRadius: "100px",
                fontSize: "13px",
                fontWeight: 600,
                color: "#6366F1",
                border: "1px solid rgba(99,102,241,0.4)",
                background: isDark
                  ? "rgba(99,102,241,0.08)"
                  : "rgba(99,102,241,0.06)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                letterSpacing: "0.02em",
              }}
              whileHover={{
                scale: 1.05,
                background: "#6366F1",
                color: "#ffffff",
                boxShadow: "0 0 20px rgba(99,102,241,0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Hire Me →
            </motion.button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="hamburger-btn"
              style={{
                padding: "8px",
                borderRadius: "8px",
                border: `1px solid ${colors.hamburgerBorder}`,
                background: colors.hamburgerBg,
                color: colors.hamburgerColor,
                cursor: "pointer",
                display: "none",
                transition: "all 0.2s ease",
              }}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              top: "76px",
              left: "16px",
              right: "16px",
              zIndex: 40,
              background: colors.mobileBg,
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: `1px solid ${colors.mobileBorder}`,
              borderRadius: "16px",
              padding: "12px",
              boxShadow: isDark
                ? "0 16px 48px rgba(0,0,0,0.4)"
                : "0 16px 48px rgba(99,102,241,0.1)",
            }}
          >
            <nav
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              {siteConfig.nav.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  style={{
                    textAlign: "left",
                    padding: "12px 16px",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: colors.mobileLinkColor,
                    background: "none",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = colors.mobileLinkHover;
                    e.currentTarget.style.background =
                      colors.mobileLinkHoverBg;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = colors.mobileLinkColor;
                    e.currentTarget.style.background = "none";
                  }}
                >
                  {item.label}
                </button>
              ))}

              <div
                style={{
                  borderTop: `1px solid ${colors.mobileDivider}`,
                  marginTop: "8px",
                  paddingTop: "8px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >

                <button
                  onClick={() => handleNavClick("#contact")}
                  className="btn-gradient"
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  Hire Me →
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hire-btn { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}