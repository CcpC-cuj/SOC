import { cn } from "../../lib/cn";

const variantStyles = {
  primary:
    "border border-[var(--soc-ink)] bg-[var(--soc-ink)] !text-white shadow-[var(--soc-shadow-soft)] hover:border-[#203146] hover:bg-[#203146]",
  secondary:
    "border border-[var(--soc-border-strong)] bg-white !text-[var(--soc-ink)] shadow-[var(--soc-shadow-soft)] hover:border-[rgba(22,35,52,0.22)] hover:bg-[var(--soc-surface-cool)]",
  ghost:
    "border border-transparent bg-transparent !text-[rgba(22,35,52,0.72)] hover:bg-[var(--soc-surface-cool)] hover:!text-[var(--soc-ink)]",
  danger:
    "border border-rose-200 bg-rose-50 !text-rose-700 hover:border-rose-300 hover:bg-rose-100",
  success:
    "border border-emerald-200 bg-emerald-50 !text-emerald-700 hover:border-emerald-300 hover:bg-emerald-100",
};

const sizeStyles = {
  sm: "min-h-9 px-3.5 text-sm",
  md: "min-h-11 px-4.5 text-sm",
  lg: "min-h-12 px-5.5 text-base",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  block = false,
  className = "",
} = {}) {
  return cn(
    "soc-motion-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[0.875rem] font-medium tracking-[-0.01em] transition duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-55 [&>svg]:shrink-0",
    "focus:outline-none focus:ring-2 focus:ring-[rgba(31,79,107,0.14)] focus:ring-offset-2 focus:ring-offset-transparent",
    "active:scale-[0.99]",
    variantStyles[variant] || variantStyles.primary,
    sizeStyles[size] || sizeStyles.md,
    block && "w-full",
    className
  );
}
