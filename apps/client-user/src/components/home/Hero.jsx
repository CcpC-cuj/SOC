// Hero.jsx

import { motion } from "framer-motion";
import FloatingBlobs from "./FloatingBlobs";
import HeroDashboard from "./HeroDashboard";

const Hero = () => {
  return (
    <section className="relative flex min-h-screen items-center px-6 py-20">
      <FloatingBlobs />

      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
            ⚡ Collaborative Developer Ecosystem
          </div>

          <h1 className="mb-6 text-5xl font-black leading-tight md:text-7xl">
            Build.
            <br />
            Collaborate.
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-500 bg-clip-text text-transparent">
              Innovate.
            </span>
          </h1>

          <p className="mb-8 max-w-xl text-lg text-slate-300">
            Join Seasons of Code and work on real-world projects with
            passionate developers, mentors, and innovators.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 font-bold transition hover:scale-105">
              Join Now
            </button>

            <button className="rounded-2xl border border-white/20 bg-white/5 px-8 py-4 font-semibold backdrop-blur-lg transition hover:bg-white/10">
              Explore Projects
            </button>
          </div>
        </motion.div>

        <HeroDashboard />
      </div>
    </section>
  );
};

export default Hero;