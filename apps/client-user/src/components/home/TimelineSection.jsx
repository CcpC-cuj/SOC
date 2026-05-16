// TimelineSection.jsx

import { motion } from "framer-motion";
import {
  Rocket,
  Trophy,
  Users,
  Code2,
  Sparkles,
} from "lucide-react";

const TimelineSection = () => {
  return (
    <section
      id="timeline"
      className="relative overflow-hidden py-24 lg:py-32"
    >

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">

        <div className="absolute left-[-100px] top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute bottom-0 right-[-100px] h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

      </div>

      {/* MAIN WRAPPER */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
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

          {/* BADGE */}
          <div className="mb-6 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm font-medium text-cyan-300">
            🚀 Journey Through The Seasons
          </div>

          {/* TITLE */}
          <h2 className="text-5xl font-black leading-tight sm:text-6xl">
            Seasons
            <span className="gradient-text">
              {" "}Timeline
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">
            Explore the complete year-round coding ecosystem designed
            to help developers learn, collaborate, compete, and grow
            through real-world innovation.
          </p>

        </motion.div>

        {/* TIMELINE */}
        <div className="relative mx-auto max-w-5xl">

          {/* CENTER LINE */}
          <div className="absolute left-6 top-0 h-full w-[2px] bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-16">

            {/* SUMMER */}
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
              className="relative grid items-center gap-10 md:grid-cols-2"
            >

              {/* DOT */}
              <div className="absolute left-6 top-10 z-20 h-5 w-5 -translate-x-1/2 rounded-full border-4 border-cyan-400 bg-[#050816] md:left-1/2" />

              {/* CARD */}
              <div className="md:pr-16">
                <div className="overflow-hidden rounded-[32px] border border-cyan-500/20 bg-white/[0.03] p-8 backdrop-blur-2xl">

                  {/* ICON */}
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">
                    <Rocket size={30} />
                  </div>

                  {/* DATE */}
                  <div className="mb-4 inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
                    June - July
                  </div>

                  {/* TITLE */}
                  <h3 className="mb-5 text-3xl font-black text-cyan-400">
                    Summer Project Season
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="mb-8 text-lg leading-8 text-slate-300">
                    Collaborate with developers, mentors, and designers
                    to build real-world projects using modern technologies.
                  </p>

                  {/* TAGS */}
                  <div className="flex flex-wrap gap-3">

                    <div className="rounded-xl bg-white/5 px-4 py-2 text-sm text-slate-300">
                      Team Projects
                    </div>

                    <div className="rounded-xl bg-white/5 px-4 py-2 text-sm text-slate-300">
                      Mentorship
                    </div>

                    <div className="rounded-xl bg-white/5 px-4 py-2 text-sm text-slate-300">
                      Code Reviews
                    </div>

                  </div>

                </div>
              </div>

              {/* EMPTY */}
              <div />

            </motion.div>

            {/* AUTUMN */}
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
              className="relative grid items-center gap-10 md:grid-cols-2"
            >

              {/* DOT */}
              <div className="absolute left-6 top-10 z-20 h-5 w-5 -translate-x-1/2 rounded-full border-4 border-purple-400 bg-[#050816] md:left-1/2" />

              {/* EMPTY */}
              <div />

              {/* CARD */}
              <div className="md:pl-16">
                <div className="overflow-hidden rounded-[32px] border border-purple-500/20 bg-white/[0.03] p-8 backdrop-blur-2xl">

                  {/* ICON */}
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shadow-purple-500/20">
                    <Trophy size={30} />
                  </div>

                  {/* DATE */}
                  <div className="mb-4 inline-flex rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
                    October - November
                  </div>

                  {/* TITLE */}
                  <h3 className="mb-5 text-3xl font-black text-purple-400">
                    Autumn Coding Challenge
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="mb-8 text-lg leading-8 text-slate-300">
                    Participate in coding contests, hackathons,
                    algorithmic battles, and innovation challenges.
                  </p>

                  {/* TAGS */}
                  <div className="flex flex-wrap gap-3">

                    <div className="rounded-xl bg-white/5 px-4 py-2 text-sm text-slate-300">
                      Competitive Coding
                    </div>

                    <div className="rounded-xl bg-white/5 px-4 py-2 text-sm text-slate-300">
                      Leaderboards
                    </div>

                    <div className="rounded-xl bg-white/5 px-4 py-2 text-sm text-slate-300">
                      Exciting Prizes
                    </div>

                  </div>

                </div>
              </div>

            </motion.div>

            {/* COMMUNITY */}
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
              className="relative grid items-center gap-10 md:grid-cols-2"
            >

              {/* DOT */}
              <div className="absolute left-6 top-10 z-20 h-5 w-5 -translate-x-1/2 rounded-full border-4 border-pink-400 bg-[#050816] md:left-1/2" />

              {/* CARD */}
              <div className="md:pr-16">
                <div className="overflow-hidden rounded-[32px] border border-pink-500/20 bg-white/[0.03] p-8 backdrop-blur-2xl">

                  {/* ICON */}
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-orange-500 shadow-lg shadow-pink-500/20">
                    <Users size={30} />
                  </div>

                  {/* DATE */}
                  <div className="mb-4 inline-flex rounded-full border border-pink-500/20 bg-pink-500/10 px-4 py-2 text-sm text-pink-300">
                    December - May
                  </div>

                  {/* TITLE */}
                  <h3 className="mb-5 text-3xl font-black text-pink-400">
                    Community & Workshops
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="mb-8 text-lg leading-8 text-slate-300">
                    Engage in workshops, networking events,
                    mentoring sessions, and collaborative learning.
                  </p>

                  {/* TAGS */}
                  <div className="flex flex-wrap gap-3">

                    <div className="rounded-xl bg-white/5 px-4 py-2 text-sm text-slate-300">
                      Workshops
                    </div>

                    <div className="rounded-xl bg-white/5 px-4 py-2 text-sm text-slate-300">
                      Networking
                    </div>

                    <div className="rounded-xl bg-white/5 px-4 py-2 text-sm text-slate-300">
                      Open Source
                    </div>

                  </div>

                </div>
              </div>

              {/* EMPTY */}
              <div />

            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;