// CTASection.jsx

import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Rocket,
  Users,
  BrainCircuit,
} from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">

        <div className="absolute left-[-100px] top-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute bottom-[-100px] right-[-100px] h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />

      </div>

      {/* MAIN CONTAINER */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* MAIN CARD */}
        <motion.div
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
            duration: 0.8,
          }}
          className="relative overflow-hidden rounded-[40px] border border-cyan-500/20 bg-white/[0.03] p-8 backdrop-blur-2xl md:p-12 lg:p-16"
        >

          {/* GRID BACKGROUND */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

          {/* TOP GLOW */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/10" />

          {/* CONTENT */}
          <div className="relative z-10 grid gap-16 lg:grid-cols-2 lg:items-center">

            {/* LEFT SIDE */}
            <div>

              {/* BADGE */}
              <div className="mb-6 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm font-medium text-cyan-300">
                🚀 Join The Future of Collaboration
              </div>

              {/* HEADING */}
              <h2 className="max-w-2xl text-5xl font-black leading-tight sm:text-6xl">
                Build The Future
                <br />

                With
                <span className="gradient-text">
                  {" "}Your Team
                </span>
              </h2>

              {/* DESCRIPTION */}
              <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
                Become part of a next-generation developer ecosystem
                where students collaborate on projects, compete in
                hackathons, and innovate together.
              </p>

              {/* BUTTONS */}
              <div className="mt-10 flex flex-wrap gap-4">

                <button className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 font-bold text-white transition duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(34,211,238,0.25)]">
                  Start Journey

                  <ArrowRight size={20} />
                </button>

                <button className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-xl transition hover:bg-white/10">
                  Explore Projects
                </button>

              </div>

              {/* STATS */}
              <div className="mt-14 flex flex-wrap gap-10">

                <div>
                  <h3 className="text-4xl font-black text-cyan-400">
                    12K+
                  </h3>

                  <p className="mt-2 text-slate-400">
                    Builders
                  </p>
                </div>

                <div>
                  <h3 className="text-4xl font-black text-purple-400">
                    480+
                  </h3>

                  <p className="mt-2 text-slate-400">
                    Projects
                  </p>
                </div>

                <div>
                  <h3 className="text-4xl font-black text-pink-400">
                    98%
                  </h3>

                  <p className="mt-2 text-slate-400">
                    Completion
                  </p>
                </div>

              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="grid gap-6">

              {/* CARD */}
              <motion.div
                whileHover={{
                  y: -8,
                }}
                className="group overflow-hidden rounded-[28px] border border-cyan-500/20 bg-white/[0.03] p-6 backdrop-blur-2xl transition"
              >

                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">
                  <Rocket size={28} />
                </div>

                <h3 className="mb-3 text-2xl font-black text-cyan-400">
                  50+ Live Projects
                </h3>

                <p className="leading-8 text-slate-300">
                  Work on innovative real-world projects
                  with talented developers and mentors.
                </p>

              </motion.div>

              {/* CARD */}
              <motion.div
                whileHover={{
                  y: -8,
                }}
                className="group overflow-hidden rounded-[28px] border border-purple-500/20 bg-white/[0.03] p-6 backdrop-blur-2xl transition"
              >

                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shadow-purple-500/20">
                  <Users size={28} />
                </div>

                <h3 className="mb-3 text-2xl font-black text-purple-400">
                  Real Team Collaboration
                </h3>

                <p className="leading-8 text-slate-300">
                  Collaborate across Frontend, Backend,
                  AI/ML, UI/UX, DevOps, and more.
                </p>

              </motion.div>

              {/* CARD */}
              <motion.div
                whileHover={{
                  y: -8,
                }}
                className="group overflow-hidden rounded-[28px] border border-pink-500/20 bg-white/[0.03] p-6 backdrop-blur-2xl transition"
              >

                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-orange-500 shadow-lg shadow-pink-500/20">
                  <BrainCircuit size={28} />
                </div>

                <h3 className="mb-3 text-2xl font-black text-pink-400">
                  AI-Powered Growth
                </h3>

                <p className="leading-8 text-slate-300">
                  Learn faster with mentors, collaborative
                  workflows, and AI-assisted development.
                </p>

              </motion.div>

            </div>

          </div>

          {/* BOTTOM FLOATING LABEL */}
          <div className="relative z-10 mt-10 flex items-center gap-3 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 px-5 py-4 backdrop-blur-xl w-fit">

            <Sparkles
              size={18}
              className="text-cyan-400"
            />

            <p className="text-sm text-slate-300">
              AI Suggests: Join the next innovation sprint 🚀
            </p>

          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;