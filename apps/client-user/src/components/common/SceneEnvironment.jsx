import { cn } from "../../lib/cn";

const SceneEnvironment = ({
  variant = "marketing",
  showLandscape = false,
  className,
}) => {
  const isMarketing =
    variant === "marketing";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <div
        className={cn(
          "absolute inset-0",
          isMarketing
            ? "soc-env-marketing"
            : "soc-env-inner"
        )}
      />

      <div
        className={cn(
          "soc-env-cloud-float absolute left-[-8%] top-[-4%] h-52 w-52 rounded-full bg-white/70 blur-3xl",
          !isMarketing &&
            "left-auto right-[-6%] top-[-4%] h-44 w-44 bg-white/18"
        )}
      />
      <div
        className={cn(
          "soc-env-cloud-float absolute right-[8%] top-[14%] h-32 w-32 rounded-full bg-[var(--soc-sky)]/85 blur-3xl",
          !isMarketing &&
            "left-[6%] right-auto top-auto bottom-[14%] h-28 w-28 bg-[var(--soc-teal)]/12"
        )}
        style={{
          animationDelay: "1.4s",
        }}
      />
      <div
        className={cn(
          "soc-env-sparkle absolute left-[14%] top-[18%] h-[4.5rem] w-[4.5rem] rounded-full border border-white/55 bg-white/30 blur-2xl",
          !isMarketing &&
            "left-[18%] top-[22%] h-14 w-14 border-white/18 bg-white/8"
        )}
      />
      <div
        className={cn(
          "soc-env-sparkle absolute right-[14%] top-[28%] h-12 w-12 rounded-full border border-[var(--soc-sand)]/75 bg-[var(--soc-sand)]/28 blur-xl",
          !isMarketing &&
            "right-[18%] top-[34%] h-10 w-10 border-[var(--soc-teal)]/20 bg-[var(--soc-teal)]/8"
        )}
        style={{
          animationDelay: "0.9s",
        }}
      />

      {showLandscape ? (
        <>
          <div
            className={cn(
              "soc-env-hill-parallax absolute inset-x-0 bottom-0 h-[18rem]",
              isMarketing
                ? "bg-[linear-gradient(180deg,rgba(246,241,234,0)_0%,rgba(232,221,208,0.76)_55%,rgba(241,245,247,0.96)_100%)]"
                : "bg-[linear-gradient(180deg,rgba(24,39,57,0)_0%,rgba(24,39,57,0.36)_46%,rgba(15,25,37,0.92)_100%)]"
            )}
          />
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 h-px",
              isMarketing
                ? "bg-[rgba(24,39,57,0.1)]"
                : "bg-white/10"
            )}
          />
          <div
            className={cn(
              "absolute bottom-10 left-[8%] h-24 w-24 rounded-full blur-3xl",
              isMarketing
                ? "bg-[var(--soc-peach)]/22"
                : "bg-[var(--soc-teal)]/12"
            )}
          />
          <div
            className={cn(
              "absolute bottom-14 right-[10%] h-20 w-20 rounded-full blur-3xl",
              isMarketing
                ? "bg-[var(--soc-sky)]/62"
                : "bg-white/10"
            )}
          />
        </>
      ) : null}
    </div>
  );
};

export default SceneEnvironment;
