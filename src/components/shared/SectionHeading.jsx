"use client"
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  centered = false,
  className,
}) {
    
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = !mounted || theme === "dark"; 
  return (
    <div className={cn("mb-16", centered && "text-center", className)}>
      {eyebrow && (
        <p className="font-mono text-base tracking-[0.14em] uppercase text-brand-indigo mb-5">
          {eyebrow}
        </p>
      )}
      <h2 className={`font-heading text-2xl sm:text-4xl font-extrabold tracking-tight mb-5 max-sm:mb-1! ${isDark ? "text-white" : "text-[#565eff]"}`}>
        {title}{" "}
        {highlight && (
          <span className="gradient-text">{highlight}</span>
        )}
      </h2>
      {subtitle && (
        <p className="text-text-secondary text-base max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}