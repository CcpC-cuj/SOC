import {
  useEffect,
  useRef,
  useState,
} from "react";

import { cn } from "../../lib/cn";
import { ToastContext } from "./ToastContext";

const toneStyles = {
  success:
    "border-emerald-300/20 bg-[linear-gradient(180deg,rgba(16,185,129,0.2),rgba(16,185,129,0.12))] text-emerald-50",
  error:
    "border-rose-300/20 bg-[linear-gradient(180deg,rgba(244,63,94,0.2),rgba(244,63,94,0.12))] text-rose-50",
  warning:
    "border-amber-300/20 bg-[linear-gradient(180deg,rgba(245,158,11,0.2),rgba(245,158,11,0.12))] text-amber-50",
  info:
    "border-sky-300/20 bg-[linear-gradient(180deg,rgba(14,165,233,0.2),rgba(14,165,233,0.12))] text-sky-50",
};

export function ToastProvider({
  children,
}) {
  const [toasts, setToasts] =
    useState([]);
  const idRef = useRef(0);

  const dismissToast = (id) => {
    setToasts((current) =>
      current.filter(
        (toast) => toast.id !== id
      )
    );
  };

  const showToast = ({
    title,
    description,
    tone = "info",
    duration = 3400,
  }) => {
    idRef.current += 1;
    const id = idRef.current;

    setToasts((current) => [
      ...current,
      {
        id,
        title,
        description,
        tone,
      },
    ]);

    window.setTimeout(() => {
      dismissToast(id);
    }, duration);
  };

  useEffect(() => () => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider
      value={showToast}
    >
      {children}

      <div className="pointer-events-none fixed bottom-4 right-4 z-[80] flex w-[min(25rem,calc(100vw-2rem))] flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto rounded-[1.6rem] border px-4 py-3.5 shadow-[0_22px_54px_rgba(15,23,42,0.32)] backdrop-blur-2xl",
              toneStyles[toast.tone] ||
                toneStyles.info
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                {toast.title && (
                  <p className="text-sm font-semibold">
                    {toast.title}
                  </p>
                )}
                {toast.description && (
                  <p className="mt-1 text-sm leading-6 text-white/88">
                    {toast.description}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() =>
                  dismissToast(toast.id)
                }
                className="rounded-full px-2 py-1 text-xs text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
