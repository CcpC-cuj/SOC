// Hero.jsx

import { motion } from "framer-motion";

import NeuralBackground from "../common/NeuralBackground";
import HeroDashboard from "./HeroDashboard";

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">

      {/* NEURAL BACKGROUND */}
      <NeuralBackground />

      {/* BACKGROUND GLOW */}
      {/* <div className="absolute left-[-100px] top-[-100px] h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" /> */}

      <div className="absolute bottom-[-100px] right-[-100px] h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

      {/* MAIN WRAPPER */}
      <div className="relative z-10 grid items-center gap-16 lg:grid-cols-2">

        {/* LEFT CONTENT */}
        <div>

          {/* BADGE */}
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
            className="mb-6 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm font-medium text-cyan-300"
          >
            ⚡ Collaborative Developer Ecosystem
          </motion.div>

          {/* HEADING */}
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
            className="max-w-5xl text-5xl font-black leading-tight sm:text-6xl md:text-7xl"
          >

            Build.
            <br />

            Collaborate.
            <br />

            <span className="gradient-text">
              Innovate.
            </span>

          </motion.h1>

          {/* DESCRIPTION */}
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
            className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl"
          >
            Seasons of Code is a year-round coding platform
            where students collaborate on projects,
            participate in hackathons, and grow together
            through innovation and teamwork.
          </motion.p>

          {/* BUTTONS */}
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
            className="mt-10 flex flex-wrap gap-4"
          >

            <button className="gradient-button">
              Join Now
            </button>

            <button className="secondary-button">
              Explore Projects
            </button>

          </motion.div>

          {/* STATS */}
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
              duration: 1.4,
            }}
            className="mt-16 flex flex-wrap gap-10"
          >

            <div>
              <h3 className="text-4xl font-black text-cyan-400">
                500+
              </h3>

              <p className="mt-2 text-slate-400">
                Developers
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-black text-purple-400">
                50+
              </h3>

              <p className="mt-2 text-slate-400">
                Projects
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-black text-pink-400">
                20+
              </h3>

              <p className="mt-2 text-slate-400">
                Mentors
              </p>
            </div>

          </motion.div>

        </div>

        {/* RIGHT SIDE DASHBOARD */}
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