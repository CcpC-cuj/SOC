import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Badge from "../ui/Badge";
import { buttonStyles } from "../ui/buttonStyles";
import HeroDashboard from "./HeroDashboard";

const quickStats = [
  {
    label: "Structured applications",
    text:
      "A single, clear intake experience that captures skills, intent, and availability.",
  },
  {
    label: "Thoughtful review",
    text:
      "Organizers and mentors review stronger signals before team placement decisions.",
  },
  {
    label: "Deliberate matching",
    text:
      "Participants are placed where they can contribute well and grow with confidence.",
  },
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="absolute left-[-40px] top-0 h-56 w-56 rounded-full bg-white/45 blur-3xl" />
      <div className="absolute bottom-[-90px] right-[-40px] h-64 w-64 rounded-full bg-[var(--soc-sky)]/72 blur-3xl" />

      <div className="relative z-10 grid items-center gap-16 lg:grid-cols-2">
        <div>
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="mb-6"
          >
            <Badge
              tone="warning"
              className="border-[var(--soc-border-strong)] bg-white/80 px-5 py-2 text-[var(--soc-ink)] shadow-[var(--soc-shadow-soft)]"
            >
              Season of Code 2026
            </Badge>
          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="type-hero max-w-5xl text-[var(--soc-ink)]"
          >
            A more deliberate way to join Season of Code.
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="type-body mt-8 max-w-2xl text-[var(--soc-ink)]/78 md:text-xl"
          >
            Seasons of Code is built for serious student builders who want real collaboration, stronger mentorship, and better project fit. Instead of rushing people into random teams, the platform creates a clear path from application to informed assignment.
          </motion.p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/register"
              className={buttonStyles({
                size: "lg",
                className:
                  "border border-white/65 bg-[var(--soc-ink)] text-white shadow-[var(--soc-shadow-soft)] hover:bg-[#22364d]",
              })}
            >
              Start Your Application
            </Link>

            <Link
              to="/projects"
              className={buttonStyles({
                variant: "secondary",
                size: "lg",
                className:
                  "border-[var(--soc-border-strong)] bg-white/80 text-[var(--soc-ink)] hover:bg-white",
              })}
            >
              Explore Showcase Projects
            </Link>
          </div>

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1.2,
            }}
            className="mt-14 grid gap-4 sm:grid-cols-3"
          >
            {quickStats.map((item) => (
              <div
                key={item.label}
                className="soc-motion-card rounded-[1.75rem] border border-[var(--soc-border-soft)] bg-white/78 p-5 shadow-[var(--soc-shadow-soft)] backdrop-blur-md"
              >
                <h3 className="text-lg font-bold text-[var(--soc-ink)]">
                  {item.label}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--soc-ink)]/72">
                  {item.text}
                </p>
              </div>
            ))}
          </motion.div>

          <div className="mt-8 flex flex-wrap gap-3">
            {[
              "Mentor-guided teams",
              "Clear review flow",
              "Calm student-tech experience",
            ].map((item) => (
              <div
                key={item}
                className="rounded-full border border-[var(--soc-border-soft)] bg-white/78 px-4 py-2 text-sm font-medium text-[var(--soc-ink)] shadow-[var(--soc-shadow-soft)]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
            x: 40,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            x: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="relative"
        >
          <HeroDashboard />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
