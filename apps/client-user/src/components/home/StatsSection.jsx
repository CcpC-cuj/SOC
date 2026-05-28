import { motion } from "framer-motion";

import Badge from "../ui/Badge";
import { Card } from "../ui/Card";

const benefitItems = [
  {
    eyebrow: "For applicants",
    title: "A clearer way to present your strengths",
    text:
      "Students can communicate skills, interests, and commitment without guessing what matters most.",
  },
  {
    eyebrow: "For reviewers",
    title: "Better signals for shortlisting and fit",
    text:
      "Organizers compare participants with more confidence because the application structure is more deliberate.",
  },
  {
    eyebrow: "For teams",
    title: "Stronger alignment before work begins",
    text:
      "Projects start with fewer mismatches and better role clarity, which helps collaboration move faster later.",
  },
];

const supportingFacts = [
  {
    value: "Single intake",
    label: "One place to capture capability, interest, and availability.",
  },
  {
    value: "Human review",
    label: "Assignments are shaped by judgment, not only by signup order.",
  },
  {
    value: "Project fit",
    label: "Teams are formed with contribution quality in mind.",
  },
];

const StatsSection = () => {
  return (
    <section className="py-14 lg:py-20">
      <motion.div
        initial={{
          opacity: 0,
          y: 24,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.55,
        }}
        className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]"
      >
        <Card
          strong
          className="p-6 sm:p-8"
        >
          <Badge tone="accent">
            Benefits
          </Badge>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-[var(--soc-ink)] sm:text-4xl">
            Better outcomes for both the application journey and the teams that
            follow.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--soc-text-muted)] sm:text-lg">
            Premium product experiences reduce friction and improve decision
            quality. The same principle applies here: clearer intake creates
            better downstream collaboration.
          </p>

          <div className="mt-8 grid gap-4">
            {benefitItems.map((item) => (
              <div
                key={item.title}
                className="rounded-[1rem] border border-[var(--soc-border-soft)] bg-[var(--soc-surface-cool)] px-5 py-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--soc-ink)]/48">
                  {item.eyebrow}
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-[var(--soc-ink)] sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--soc-text-muted)] sm:text-base">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-4">
          {supportingFacts.map((item) => (
            <Card
              key={item.value}
              className="p-5 sm:p-6"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--soc-teal)]">
                {item.value}
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--soc-text-muted)] sm:text-base">
                {item.label}
              </p>
            </Card>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default StatsSection;
