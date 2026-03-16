import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  centered = false,
  className,
}) {
  return (
    <div className={cn("mb-16", centered && "text-center", className)}>
      {eyebrow && (
        <p className="font-mono text-base tracking-[0.14em] uppercase text-brand-indigo mb-5">
          {eyebrow}
        </p>
      )}
      <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-5">
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