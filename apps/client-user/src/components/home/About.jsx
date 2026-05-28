import { motion } from "framer-motion";
import {
  CheckCircle2,
  ClipboardCheck,
  Users,
} from "lucide-react";

import Badge from "../ui/Badge";
import { Card, CardSection } from "../ui/Card";

const proofItems = [
  {
    icon: ClipboardCheck,
    title: "Stronger applications",
    body:
      "Participants submit clearer signals around skills, focus areas, and availability before any placement decision is made.",
  },
  {
    icon: Users,
    title: "Fairer team formation",
    body:
      "Organizers compare applicants with more context, which improves balance across projects instead of rewarding whoever joins first.",
  },
  {
    icon: CheckCircle2,
    title: "More confident starts",
    body:
      "Members enter a project with role clarity, clearer expectations, and a better chance of contributing from the beginning.",
  },
];

const proofNotes = [
  "Review-first instead of self-joining",
  "Higher-signal participant intake",
  "Better-fit teams across projects",
];

const About = () => {
  return (
    <section
      id="about"
      className="py-14 lg:py-20"
    >
      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
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
            amount: 0.25,
          }}
          transition={{
            duration: 0.55,
          }}
          className="space-y-5"
        >
          <Badge tone="accent">
            Proof
          </Badge>

          <h2 className="max-w-xl text-3xl font-semibold tracking-[-0.04em] text-[var(--soc-ink)] sm:text-4xl lg:text-[2.7rem]">
            A student-tech intake flow built for quality, not rush.
          </h2>

          <p className="max-w-xl text-base leading-8 text-[var(--soc-text-muted)] sm:text-lg">
            The strongest programs feel clear before they feel exciting. Season
            of Code is moving toward a calmer application journey that helps
            students present themselves well and helps organizers make more
            credible placement decisions.
          </p>

          <Card className="p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--soc-ink)]/48">
              Why this matters
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--soc-text-muted)] sm:text-base sm:leading-8">
              When applications are structured well, review becomes more
              consistent and project teams form with fewer mismatches later in
              the cycle.
            </p>
          </Card>
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
            amount: 0.2,
          }}
          transition={{
            duration: 0.6,
          }}
          className="space-y-4"
        >
          {proofItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.title}
                className="p-5 sm:p-6"
                strong={index === 0}
              >
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.95rem] border border-[var(--soc-border-soft)] bg-[var(--soc-surface-cool)] text-[var(--soc-teal)]">
                    <Icon size={18} />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold tracking-[-0.02em] text-[var(--soc-ink)]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--soc-text-muted)] sm:text-base">
                      {item.body}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}

          <CardSection className="grid gap-3 p-5 sm:grid-cols-3 sm:p-6">
            {proofNotes.map((note) => (
              <div
                key={note}
                className="rounded-[0.95rem] border border-[var(--soc-border-soft)] bg-white px-4 py-4 text-sm font-medium text-[var(--soc-ink)] shadow-[var(--soc-shadow-soft)]"
              >
                {note}
              </div>
            ))}
          </CardSection>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
