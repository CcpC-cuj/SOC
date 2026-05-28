import Badge from "./Badge";
import { Card } from "./Card";
import { cn } from "../../lib/cn";

export function PageShell({
  children,
  className,
}) {
  return (
    <div
      className={cn(
        "mx-auto max-w-7xl space-y-7 pb-10 pt-6 sm:space-y-8 sm:pt-8 lg:pt-9",
        className
      )}
    >
      {children}
    </div>
  );
}

export function PageHeader({
  badge,
  badgeTone = "info",
  title,
  description,
  actions,
  aside,
  meta,
  className,
}) {
  return (
    <Card
      strong
      className={cn(
        "overflow-hidden p-6 sm:p-7 lg:p-8",
        className
      )}
    >
      <div className="grid gap-7 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        <div className="space-y-5">
          {badge && (
            <Badge tone={badgeTone}>
              {badge}
            </Badge>
          )}

          <div>
            <h1 className="max-w-4xl text-3xl font-semibold tracking-[-0.045em] text-[var(--soc-ink)] sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            {description && (
              <p className="mt-4 max-w-4xl text-sm leading-7 text-[var(--soc-text-muted)] sm:text-base sm:leading-8">
                {description}
              </p>
            )}
          </div>

          {(actions || meta) && (
            <div className="flex flex-col gap-4 border-t border-[var(--soc-border-soft)] pt-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              {actions ? (
                <div className="flex flex-wrap gap-3">
                  {actions}
                </div>
              ) : (
                <span />
              )}

              {meta && (
                <div className="flex flex-wrap gap-2.5">
                  {meta}
                </div>
              )}
            </div>
          )}
        </div>

        {aside ? (
          <div>{aside}</div>
        ) : null}
      </div>
    </Card>
  );
}

export function SectionHeader({
  badge,
  badgeTone = "default",
  title,
  description,
  action,
  className,
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between",
        className
      )}
    >
      <div>
        {badge && (
          <Badge tone={badgeTone}>
            {badge}
          </Badge>
        )}
        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-[var(--soc-ink)] sm:text-[2rem]">
          {title}
        </h2>
        {description && (
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--soc-text-muted)] sm:text-base">
            {description}
          </p>
        )}
      </div>

      {action ? (
        <div className="flex flex-wrap gap-3">
          {action}
        </div>
      ) : null}
    </div>
  );
}

export function MetricStrip({
  items = [],
  className,
}) {
  return (
    <div
      className={cn(
        "grid gap-4 lg:grid-cols-4",
        className
      )}
    >
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.label}
            className="p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--soc-ink)]/52">
                  {item.label}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-[var(--soc-ink)]">
                  {item.value}
                </h3>
                {item.detail && (
                  <p className="mt-2 text-sm text-[var(--soc-text-muted)]">
                    {item.detail}
                  </p>
                )}
              </div>
              {Icon ? (
                <Icon
                  size={22}
                  className="text-[var(--soc-teal)]"
                />
              ) : null}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
