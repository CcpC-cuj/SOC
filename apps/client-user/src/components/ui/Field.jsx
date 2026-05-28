import { cn } from "../../lib/cn";

export function FieldLabel({
  children,
  className,
}) {
  return (
    <span
      className={cn(
        "type-label mb-2 block text-[var(--soc-ink)]",
        className
      )}
    >
      {children}
    </span>
  );
}

export function Input({
  className,
  ...props
}) {
  return (
    <input
      className={cn(
        "w-full rounded-[0.95rem] border border-[var(--soc-border-soft)] bg-white px-4 py-3 text-[var(--soc-ink)] outline-none transition",
        "placeholder:text-[var(--soc-ink)]/42 focus:border-[rgba(31,79,107,0.26)] focus:bg-white focus:ring-2 focus:ring-[rgba(31,79,107,0.12)]",
        className
      )}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}) {
  return (
    <textarea
      className={cn(
        "w-full rounded-[0.95rem] border border-[var(--soc-border-soft)] bg-white px-4 py-3 text-[var(--soc-ink)] outline-none transition",
        "placeholder:text-[var(--soc-ink)]/42 focus:border-[rgba(31,79,107,0.26)] focus:bg-white focus:ring-2 focus:ring-[rgba(31,79,107,0.12)]",
        className
      )}
      {...props}
    />
  );
}

export function Select({
  className,
  children,
  ...props
}) {
  return (
    <select
      className={cn(
        "w-full rounded-[0.95rem] border border-[var(--soc-border-soft)] bg-white px-4 py-3 text-[var(--soc-ink)] outline-none transition",
        "focus:border-[rgba(31,79,107,0.26)] focus:bg-white focus:ring-2 focus:ring-[rgba(31,79,107,0.12)]",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function InlineMessage({
  children,
  tone = "default",
  className,
}) {
  const tones = {
    default:
      "border-[var(--soc-border-soft)] bg-[var(--soc-surface-cool)] text-[var(--soc-ink)]",
    success:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
    error:
      "border-rose-200 bg-rose-50 text-rose-700",
    warning:
      "border-amber-200 bg-amber-50 text-amber-700",
    info:
      "border-sky-200 bg-sky-50 text-sky-700",
  };

  return (
    <div
      className={cn(
        "rounded-[0.95rem] border px-4 py-3 text-sm",
        tones[tone] || tones.default,
        className
      )}
    >
      {children}
    </div>
  );
}
