import { cn } from "../../lib/cn";
import Button from "./Button";
import { Card } from "./Card";

const Modal = ({
  open,
  title,
  description,
  children,
  panelClassName,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  confirming = false,
  tone = "default",
  hideActions = false,
}) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/54 p-4 backdrop-blur-md">
      <Card
        strong
        className={cn(
          "w-full max-w-lg p-6 sm:p-7",
          tone === "danger" &&
            "border-rose-300/16",
          panelClassName
        )}
      >
        <div>
          <h2 className="text-2xl font-semibold text-white">
            {title}
          </h2>
          {description && (
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {description}
            </p>
          )}
        </div>

        {children && (
          <div className="mt-5">
            {children}
          </div>
        )}

        {!hideActions && (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
            >
              {cancelLabel}
            </Button>
            <Button
              type="button"
              variant={
                tone === "danger"
                  ? "danger"
                  : "primary"
              }
              loading={confirming}
              onClick={onConfirm}
            >
              {confirming
                ? "Working..."
                : confirmLabel}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Modal;
