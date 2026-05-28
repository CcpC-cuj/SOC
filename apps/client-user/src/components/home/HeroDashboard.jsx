import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock3,
  FolderKanban,
  Sparkles,
  Users,
} from "lucide-react";

const HeroDashboard = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.94,
        y: 36,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        duration: 0.9,
      }}
      className="relative overflow-hidden rounded-[2.25rem] border border-[var(--soc-border-soft)] bg-white/80 p-6 text-[var(--soc-ink)] shadow-[var(--soc-shadow-card)] backdrop-blur-xl"
    >
      <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-[var(--soc-sky)]/80 blur-3xl" />
      <div className="absolute left-10 top-0 h-px w-32 bg-[var(--soc-border-strong)]" />

      <div className="relative mb-8 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-[-0.03em]">
            Application Review Overview
          </h3>
          <p className="mt-1 text-sm text-[var(--soc-ink)]/58">
            A calmer workflow for intake, review, and assignment decisions
          </p>
        </div>

        <div className="rounded-full border border-[var(--soc-border-soft)] bg-[var(--soc-surface-cool)] px-4 py-2 text-sm font-semibold text-[var(--soc-teal)]">
          SoC 2026
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        {[
          {
            icon: Users,
            label: "Profiles Submitted",
            value: "Open",
            tone: "text-[var(--soc-teal)]",
          },
          {
            icon: FolderKanban,
            label: "Showcase Tracks",
            value: "Curated",
            tone: "text-[var(--soc-ink)]",
          },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-[1.5rem] border border-[var(--soc-border-soft)] bg-[var(--soc-surface-cool)] p-4 shadow-[var(--soc-shadow-soft)]"
            >
              <div className="mb-3 flex items-center justify-between">
                <Icon
                  className={stat.tone}
                  size={20}
                />
                <span className="text-xs text-[var(--soc-ink)]/48">
                  Current state
                </span>
              </div>
              <h4 className={`text-2xl font-black ${stat.tone}`}>
                {stat.value}
              </h4>
              <p className="mt-1 text-sm text-[var(--soc-ink)]/60">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mb-6 rounded-[1.75rem] border border-[var(--soc-border-soft)] bg-white/76 p-5 shadow-[var(--soc-shadow-soft)]">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold">
              Candidate journey
            </h4>
            <p className="text-sm text-[var(--soc-ink)]/58">
              From application to placement
            </p>
          </div>
          <span className="text-lg font-bold text-[var(--soc-teal)]">
            3 Steps
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-[var(--soc-sand)]/70">
          <div className="h-full w-full rounded-full bg-gradient-to-r from-[var(--soc-teal)] via-[#5d7c88] to-[var(--soc-ink)]" />
        </div>

        <div className="mt-5 grid gap-3 text-sm text-[var(--soc-ink)]/76">
          <div className="flex items-center gap-3 rounded-[1.25rem] bg-[var(--soc-surface-cool)] p-3">
            <Sparkles
              className="text-[var(--soc-teal)]"
              size={16}
            />
            Build a capability-driven profile
          </div>
          <div className="flex items-center gap-3 rounded-[1.25rem] bg-[var(--soc-surface-cool)] p-3">
            <Clock3
              className="text-[var(--soc-warning)]"
              size={16}
            />
            Wait for organizer review and team balancing
          </div>
          <div className="flex items-center gap-3 rounded-[1.25rem] bg-[var(--soc-surface-cool)] p-3">
            <CheckCircle2
              className="text-[var(--soc-success)]"
              size={16}
            />
            Receive your project and team assignment
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {[
          {
            title: "Preference-based matching",
            body:
              "Domains, roles, and prior experience help admins place you better.",
            tone:
              "bg-[var(--soc-sky)] text-[var(--soc-teal)]",
          },
          {
            title: "Balanced squads",
            body:
              "Members are assigned after comparing skills, interest, and project capacity.",
            tone:
              "bg-[var(--soc-sand)]/72 text-[var(--soc-ink)]",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex items-center justify-between rounded-[1.5rem] border border-[var(--soc-border-soft)] bg-white/72 p-4"
          >
            <div>
              <h5 className="font-semibold text-[var(--soc-ink)]">
                {item.title}
              </h5>
              <p className="mt-1 text-sm text-[var(--soc-ink)]/60">
                {item.body}
              </p>
            </div>
            <span
              className={`rounded-full px-4 py-2 text-xs font-semibold ${item.tone}`}
            >
              Enabled
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default HeroDashboard;
