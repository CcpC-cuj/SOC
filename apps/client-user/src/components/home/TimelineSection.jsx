import { motion } from "framer-motion";
import {
  CheckCircle2,
  ClipboardList,
  FolderKanban,
  Users,
} from "lucide-react";

import Badge from "../ui/Badge";
import { Card } from "../ui/Card";

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Apply with context",
    text:
      "Participants submit role interests, strengths, and availability through a single structured application.",
  },
  {
    icon: Users,
    step: "02",
    title: "Review with intent",
    text:
      "Organizers assess applications with team balance, motivation, and project needs in mind.",
  },
  {
    icon: FolderKanban,
    step: "03",
    title: "Assign with clarity",
    text:
      "Shortlisted participants are placed into projects where contribution quality and learning potential are stronger.",
  },
  {
    icon: CheckCircle2,
    step: "04",
    title: "Start with alignment",
    text:
      "Once teams are formed, members move into the workspace with clearer expectations and a more stable starting point.",
  },
];

const TimelineSection = () => {
  return (
    <section
      id="timeline"
      className="py-14 lg:py-20"
    >
      <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
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
          className="space-y-5"
        >
          <Badge tone="accent">
            Process
          </Badge>
          <h2 className="max-w-xl text-3xl font-semibold tracking-[-0.04em] text-[var(--soc-ink)] sm:text-4xl">
            A simpler path from application to project placement.
          </h2>
          <p className="max-w-xl text-base leading-8 text-[var(--soc-text-muted)] sm:text-lg">
            The experience should feel guided, transparent, and credible. Each
            stage is designed to reduce ambiguity while keeping the decision
            process deliberate.
          </p>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 28,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.6,
          }}
          className="rounded-[1.35rem] border border-[var(--soc-border-soft)] bg-white/92 p-4 shadow-[var(--soc-shadow-card)] sm:p-5"
        >
          <div className="space-y-3">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <Card
                  key={step.title}
                  className="p-5 sm:p-6"
                  strong={index === 0}
                >
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] border border-[var(--soc-border-soft)] bg-[var(--soc-surface-cool)] text-[var(--soc-teal)]">
                      <Icon size={18} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--soc-ink)]/48">
                        Step {step.step}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-[var(--soc-ink)] sm:text-xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-[var(--soc-text-muted)] sm:text-base">
                        {step.text}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TimelineSection;
