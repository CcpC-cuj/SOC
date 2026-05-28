import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import Badge from "../ui/Badge";
import { Card, CardSection } from "../ui/Card";
import { buttonStyles } from "../ui/buttonStyles";

const nextSteps = [
  "Complete your application profile with your strengths and interests.",
  "Wait for organizer review and shortlist decisions.",
  "Move into the right team with clearer expectations.",
];

const CTASection = () => {
  return (
    <section className="py-14 lg:py-20">
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
      >
        <Card
          strong
          className="overflow-hidden p-6 sm:p-8 lg:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div>
              <Badge tone="warning">
                Final call to apply
              </Badge>
              <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-[var(--soc-ink)] sm:text-4xl lg:text-[2.8rem]">
                Join Season of Code through a clearer, more deliberate
                application experience.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--soc-text-muted)] sm:text-lg">
                If you want serious collaboration, guided review, and a stronger
                chance of landing in the right project, this is where the
                process begins.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/register"
                  className={buttonStyles({
                    size: "lg",
                  })}
                >
                  Start your application
                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/projects"
                  className={buttonStyles({
                    variant: "secondary",
                    size: "lg",
                  })}
                >
                  Explore showcase projects
                </Link>
              </div>
            </div>

            <CardSection className="p-5 sm:p-6 lg:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--soc-ink)]/48">
                What happens next
              </p>

              <div className="mt-5 space-y-3">
                {nextSteps.map((item, index) => (
                  <div
                    key={item}
                    className="rounded-[0.95rem] border border-[var(--soc-border-soft)] bg-white px-4 py-4 shadow-[var(--soc-shadow-soft)]"
                  >
                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--soc-border-soft)] bg-[var(--soc-surface-cool)] text-sm font-semibold text-[var(--soc-teal)]">
                        {index + 1}
                      </div>
                      <p className="text-sm leading-7 text-[var(--soc-text-muted)] sm:text-base">
                        {item}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardSection>
          </div>
        </Card>
      </motion.div>
    </section>
  );
};

export default CTASection;
