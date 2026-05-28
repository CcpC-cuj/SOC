import { cn } from "../../lib/cn";

const toneStyles = {
  default:
    "border-[var(--soc-border-soft)] bg-[var(--soc-surface-cool)] text-[var(--soc-ink)]",
  info:
    "border-sky-200 bg-sky-50 text-sky-700",
  success:
    "border-emerald-200 bg-emerald-50 text-emerald-700",
  warning:
    "border-amber-200 bg-amber-50 text-amber-700",
  danger:
    "border-rose-200 bg-rose-50 text-rose-700",
  accent:
    "border-[rgba(31,79,107,0.18)] bg-[rgba(31,79,107,0.08)] text-[var(--soc-teal)]",
};

const Badge = ({
  children,
  tone = "default",
  className,
}) => (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium tracking-[0.04em]",
        toneStyles[tone] || toneStyles.default,
        className
      )}
  >
    {children}
  </span>
);

export default Badge;
