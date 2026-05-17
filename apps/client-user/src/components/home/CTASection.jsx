// CTASection.jsx

import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10 overflow-hidden">

        <div className="absolute left-[-120px] top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-120px] h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

      </div>

      {/* CONTAINER */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
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
          className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl md:p-12 lg:p-16"
        >

          {/* GRID BACKGROUND */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

          {/* GRADIENT OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/10" />

          {/* CONTENT */}
          <div className="relative z-10 grid gap-16 lg:grid-cols-2 lg:items-center">

            {/* LEFT SIDE */}
            <div>

              {/* BADGE */}
              <div className="mb-6 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur-xl">
                🚀 Join The Future of Collaboration
              </div>

              {/* HEADING */}
              <h2 className="max-w-2xl text-5xl font-black leading-tight sm:text-6xl">

                Build The Future
                <br />

                With
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
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

                <button className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-xl transition duration-300 hover:bg-white/10">

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

              {/* AI SUGGESTION */}
              <div className="mt-10 flex w-fit items-center gap-3 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 px-5 py-4 backdrop-blur-xl">

                <Sparkles
                  size={18}
                  className="text-cyan-400"
                />

                <p className="text-sm text-slate-300">
                  AI Suggests: Join the next innovation sprint 🚀
                </p>

              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="relative flex justify-center">

              {/* MAIN CARD */}
              <div className="relative w-full max-w-md rounded-[32px] border border-white/10 bg-black/30 p-8 backdrop-blur-2xl">

                {/* TOP STATUS */}
                <div className="mb-8 flex items-center justify-between">

                  <div>
                    <p className="text-sm text-slate-400">
                      Active Team
                    </p>

                    <h3 className="mt-1 text-2xl font-bold">
                      AI Innovators
                    </h3>
                  </div>

                  <div className="rounded-full bg-green-500/20 px-4 py-2 text-sm font-medium text-green-400">
                    Live
                  </div>

                </div>

                {/* TASKS */}
                <div className="space-y-5">

                  <div className="rounded-2xl border border-cyan-500/10 bg-cyan-500/5 p-5">

                    <div className="mb-3 flex items-center justify-between">

                      <h4 className="font-semibold">
                        Frontend Dashboard
                      </h4>

                      <span className="text-sm text-cyan-400">
                        78%
                      </span>

                    </div>

                    <div className="h-3 rounded-full bg-slate-800">

                      <div className="h-3 w-[78%] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />

                    </div>

                  </div>

                  <div className="rounded-2xl border border-purple-500/10 bg-purple-500/5 p-5">

                    <div className="mb-3 flex items-center justify-between">

                      <h4 className="font-semibold">
                        AI Recommendation Engine
                      </h4>

                      <span className="text-sm text-purple-400">
                        62%
                      </span>

                    </div>

                    <div className="h-3 rounded-full bg-slate-800">

                      <div className="h-3 w-[62%] rounded-full bg-gradient-to-r from-purple-400 to-pink-500" />

                    </div>

                  </div>

                </div>

                {/* BOTTOM MEMBERS */}
                <div className="mt-8 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4">

                  <div>
                    <p className="text-sm text-slate-400">
                      Team Members
                    </p>

                    <h4 className="mt-1 text-xl font-bold">
                      24 Active
                    </h4>
                  </div>

                  <div className="flex -space-x-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#050816] bg-cyan-500 font-bold">
                      A
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#050816] bg-purple-500 font-bold">
                      R
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#050816] bg-pink-500 font-bold">
                      K
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
};

export default CTASection;