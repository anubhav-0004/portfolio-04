"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, Twitter, Mail, Loader2 } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { siteConfig } from "@/config/site";
import SectionWrapper from "@/components/shared/SectionWrapper";
import SectionHeading from "@/components/shared/SectionHeading";

const socialLinks = [
  { icon: Github, href: siteConfig.links.github, label: "GitHub" },
  { icon: Linkedin, href: siteConfig.links.linkedin, label: "LinkedIn" },
  { icon: Twitter, href: siteConfig.links.twitter, label: "Twitter" },
  { icon: Mail, href: siteConfig.links.email, label: "Email" },
];

const inputStyle = {
  width: "100%",
  background: "#0D1320",
  border: "1px solid rgba(99,102,241,0.18)",
  borderRadius: "10px",
  padding: "12px 16px",
  fontSize: "14px",
  color: "#F1F5F9",
  fontFamily: "var(--font-space-grotesk), sans-serif",
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const getFocusStyle = (field) =>
    focusedField === field
      ? {
          borderColor: "rgba(99,102,241,0.6)",
          boxShadow: "0 0 0 3px rgba(99,102,241,0.1)",
        }
      : {};

  return (
    <SectionWrapper id="contact" className="relative overflow-hidden">
      {/* Background portal glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "640px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's Build Something"
          highlight="Together"
          subtitle="Open to full-time roles, freelance projects, and interesting conversations about frontend engineering."
          centered
        />

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ textAlign: "left", marginBottom: "28px" }}
        >
          {/* Name + Email row */}
          <motion.div
            variants={fadeInUp}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "14px",
              marginBottom: "14px",
            }}
            className="form-row"
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#94A3B8",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "6px",
                }}
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Anubhav Mishra"
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                style={{ ...inputStyle, ...getFocusStyle("name") }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#94A3B8",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "6px",
                }}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="hello@gmail.com"
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                style={{ ...inputStyle, ...getFocusStyle("email") }}
              />
            </div>
          </motion.div>

          {/* Message */}
          <motion.div variants={fadeInUp} style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "11px",
                fontWeight: 600,
                color: "#94A3B8",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}
            >
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="I'd love to talk about an opportunity..."
              rows={5}
              onFocus={() => setFocusedField("message")}
              onBlur={() => setFocusedField(null)}
              style={{
                ...inputStyle,
                resize: "vertical",
                minHeight: "120px",
                ...getFocusStyle("message"),
              }}
            />
          </motion.div>

          {/* Submit */}
          <motion.div variants={fadeInUp}>
            <motion.button
              type="submit"
              disabled={status === "loading"}
              className="btn-gradient"
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "100px",
                fontSize: "15px",
                fontWeight: 700,
                letterSpacing: "0.03em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                opacity: status === "loading" ? 0.8 : 1,
                cursor: status === "loading" ? "not-allowed" : "pointer",
              }}
              whileHover={status !== "loading" ? { scale: 1.02 } : {}}
              whileTap={status !== "loading" ? { scale: 0.98 } : {}}
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending...
                </>
              ) : status === "success" ? (
                "✓ Message Sent!"
              ) : status === "error" ? (
                "Something went wrong. Try again."
              ) : (
                <>
                  Send Message
                  <Send size={15} />
                </>
              )}
            </motion.button>
          </motion.div>
        </motion.form>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "24px",
            color: "#475569",
            fontSize: "12px",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(99,102,241,0.15)",
            }}
          />
          — or reach me directly —
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(99,102,241,0.15)",
            }}
          />
        </div>

        {/* Social icons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "28px",
          }}
        >
          {socialLinks.map(({ icon: Icon, href, label }, index) => (
            <div
              key={label}
              style={{
                position: "relative",
                width: "52px",
                height: "52px",
                borderRadius: "20px",
                padding: "1.5px",
              }}
            >
              {/* Rotating border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "20px",
                  background: [
                    "conic-gradient(from 0deg, #6366F1, #22D3EE, #A78BFA, #6366F1)",
                    "conic-gradient(from 90deg, #22D3EE, #EC4899, #6366F1, #22D3EE)",
                    "conic-gradient(from 180deg, #A78BFA, #6366F1, #22D3EE, #A78BFA)",
                    "conic-gradient(from 270deg, #EC4899, #6366F1, #A78BFA, #EC4899)",
                  ][index % 4],
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  padding: "1.5px",
                }}
              />

              {/* Icon button */}
              <motion.a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  position: "relative",
                  zIndex: 1,
                  width: "100%",
                  height: "100%",
                  borderRadius: "13px",
                  // background: "#0D1320",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#475569",
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                  overflow: "hidden",
                }}
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.93 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#F1F5F9";
                  e.currentTarget.style.background = "rgba(99,102,241,0.1)";
                  e.currentTarget.style.boxShadow = [
                    "0 0 20px rgba(99,102,241,0.5), 0 8px 24px rgba(0,0,0,0.4)",
                    "0 0 20px rgba(34,211,238,0.5), 0 8px 24px rgba(0,0,0,0.4)",
                    "0 0 20px rgba(167,139,250,0.5), 0 8px 24px rgba(0,0,0,0.4)",
                    "0 0 20px rgba(236,72,153,0.5), 0 8px 24px rgba(0,0,0,0.4)",
                  ][index % 4];

                  // Speed up rotation on hover
                  const rotatingDiv =
                    e.currentTarget.parentElement.querySelector("div");
                  if (rotatingDiv) rotatingDiv.style.animationDuration = "1s";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#475569";
                  e.currentTarget.style.background = "#0D1320";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Shimmer sweep */}
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer-sweep 3s linear infinite",
                    pointerEvents: "none",
                    borderRadius: "13px",
                  }}
                />
                <Icon size={18} style={{ position: "relative", zIndex: 1 }} />
              </motion.a>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .form-row {
            grid-template-columns: 1fr 1fr !important;
          }
        },
         @keyframes shimmer-sweep {
    0%   { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
      `}</style>
    </SectionWrapper>
  );
}
