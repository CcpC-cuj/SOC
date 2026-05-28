import { cn } from "../../lib/cn";

export function Card({
  children,
  className,
  strong = false,
}) {
  return (
    <div
      className={cn(
        "rounded-[1.25rem] border border-[var(--soc-border-soft)] text-[var(--soc-ink)]",
        strong
          ? "bg-white shadow-[var(--soc-shadow-card)]"
          : "bg-white/94 shadow-[var(--soc-shadow-soft)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardSection({
  children,
  className,
}) {
  return (
    <div
      className={cn(
        "rounded-[1rem] border border-[var(--soc-border-soft)] bg-[var(--soc-surface-cool)] text-[var(--soc-ink)]",
        className
      )}
    >
      {children}
    </div>
  );
}
