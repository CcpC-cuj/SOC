import { motion } from "framer-motion";
import {
  CheckCircle2,
  ClipboardList,
  Rocket,
  Users,
} from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Registration Opens",
    badge: "Step 1",
    text:
      "Members submit their capability profile, interests, role preferences, and availability.",
    iconTone:
      "from-cyan-500 to-blue-600",
    badgeTone:
      "border-cyan-500/20 bg-cyan-500/10 text-cyan-300",
    titleTone: "text-cyan-300",
    borderTone:
      "border-cyan-500/20",
  },
  {
    icon: Users,
    title: "Review and Team Balancing",
    badge: "Step 2",
    text:
      "Organizers review registrations, shortlist members, and plan team distribution across projects.",
    iconTone:
      "from-fuchsia-500 to-pink-600",
    badgeTone:
      "border-fuchsia-500/20 bg-fuchsia-500/10 text-fuchsia-300",
    titleTone:
      "text-fuchsia-300",
    borderTone:
      "border-fuchsia-500/20",
  },
  {
    icon: Rocket,
    title: "Assignment and Kickoff",
    badge: "Step 3",
    text:
      "Assigned members receive project placement, team allocation, and workspace access.",
    iconTone:
      "from-emerald-500 to-green-600",
    badgeTone:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
    titleTone:
      "text-emerald-300",
    borderTone:
      "border-emerald-500/20",
  },
  {
    icon: CheckCircle2,
    title: "Build, Review, Submit",
    badge: "Step 4",
    text:
      "Teams collaborate inside their workspace, complete tasks, and move toward a project submission.",
    iconTone:
      "from-amber-500 to-orange-500",
    badgeTone:
      "border-amber-500/20 bg-amber-500/10 text-amber-200",
    titleTone:
      "text-amber-200",
    borderTone:
      "border-amber-500/20",
  },
];

const TimelineSection = () => {
  return (
    <section
      id="timeline"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-100px] top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-[-100px] h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
          className="mb-20 text-center"
        >
          <div className="mb-6 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm font-medium text-cyan-300">
            Registration Journey
          </div>

          <h2 className="text-5xl font-black leading-tight sm:text-6xl">
            From sign-up
            <span className="gradient-text">
              {" "}to squad placement
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">
            The system is built to guide members forward with clarity. Every step is meant to reduce confusion and increase confidence.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                className={`overflow-hidden rounded-[32px] border bg-white/[0.03] p-8 backdrop-blur-2xl ${step.borderTone}`}
              >
                <div
                  className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.iconTone} shadow-lg shadow-black/20`}
                >
                  <Icon size={30} />
                </div>

                <div
                  className={`mb-4 inline-flex rounded-full border px-4 py-2 text-sm ${step.badgeTone}`}
                >
                  {step.badge}
                </div>

                <h3
                  className={`mb-4 text-3xl font-black ${step.titleTone}`}
                >
                  {step.title}
                </h3>

                <p className="text-lg leading-8 text-slate-300">
                  {step.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
