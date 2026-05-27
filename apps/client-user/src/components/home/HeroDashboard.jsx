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
      className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.05] p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-2xl"
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative mb-8 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black">
            Registration Command Center
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Review-first workflow for real team allocation
          </p>
        </div>

        <div className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200">
          SoC 2026
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        {[
          {
            icon: Users,
            label: "Profiles Submitted",
            value: "Open",
            tone: "text-cyan-300",
          },
          {
            icon: FolderKanban,
            label: "Showcase Tracks",
            value: "Curated",
            tone: "text-fuchsia-300",
          },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-3xl border border-white/10 bg-[#07101c] p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <Icon
                  className={stat.tone}
                  size={20}
                />
                <span className="text-xs text-slate-400">
                  Live Flow
                </span>
              </div>
              <h4 className={`text-2xl font-black ${stat.tone}`}>
                {stat.value}
              </h4>
              <p className="mt-1 text-sm text-slate-400">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mb-6 rounded-[2rem] border border-white/10 bg-[#07101c] p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h4 className="text-lg font-bold">
              Participant Flow
            </h4>
            <p className="text-sm text-slate-400">
              The real SoC journey
            </p>
          </div>
          <span className="text-lg font-black text-cyan-300">
            3 Steps
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full w-full rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-blue-500" />
        </div>

        <div className="mt-5 grid gap-3 text-sm text-slate-300">
          <div className="flex items-center gap-3 rounded-2xl bg-white/[0.03] p-3">
            <Sparkles
              className="text-cyan-300"
              size={16}
            />
            Build a capability-driven profile
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-white/[0.03] p-3">
            <Clock3
              className="text-yellow-300"
              size={16}
            />
            Wait for organizer review and team balancing
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-white/[0.03] p-3">
            <CheckCircle2
              className="text-emerald-300"
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
              "bg-cyan-500/15 text-cyan-200",
          },
          {
            title: "Balanced squads",
            body:
              "Members are assigned after comparing skills, interest, and project capacity.",
            tone:
              "bg-fuchsia-500/15 text-fuchsia-200",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/[0.04] p-4"
          >
            <div>
              <h5 className="font-semibold">
                {item.title}
              </h5>
              <p className="mt-1 text-sm text-slate-400">
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
