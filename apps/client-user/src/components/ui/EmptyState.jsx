import Button from "./Button";
import { Card } from "./Card";

const EmptyState = ({
  title,
  description,
  action,
}) => (
  <Card className="p-8 text-center sm:p-10">
    <div className="mx-auto flex w-fit items-center rounded-full border border-[var(--soc-border-soft)] bg-[var(--soc-surface-cool)] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--soc-ink)]/52">
      Status
    </div>
    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--soc-ink)]/48">
      Nothing here yet
    </p>
    <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[var(--soc-ink)] sm:text-3xl">
      {title}
    </h3>
    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[var(--soc-text-muted)] sm:text-base sm:leading-8">
      {description}
    </p>
    {action && (
      <div className="mt-7 flex justify-center">
        <Button
          type="button"
          onClick={action.onClick}
          variant={
            action.variant ||
            "secondary"
          }
        >
          {action.label}
        </Button>
      </div>
    )}
  </Card>
);

export default EmptyState;
