import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import NeuralBackground from "../common/NeuralBackground";
import HeroDashboard from "./HeroDashboard";

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <NeuralBackground />
      <div className="absolute bottom-[-100px] right-[-100px] h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />

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
            className="mb-6 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm font-medium text-cyan-300"
          >
            Capability-first team building
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
            className="max-w-5xl text-5xl font-black leading-tight sm:text-6xl md:text-7xl"
          >
            Register.
            <br />
            Get matched.
            <br />
            <span className="gradient-text">
              Build what matters.
            </span>
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
            className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl"
          >
            Seasons of Code is opening registration for members who want real collaboration, real learning, and thoughtful project placement. You do not need to guess your team up front. Show your strengths and we will assign you intentionally.
          </motion.p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/register"
              className="gradient-button"
            >
              Register Now
            </Link>

            <Link
              to="/projects"
              className="secondary-button"
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
            {[
              {
                label:
                  "Clear registration process",
                text:
                  "One form, structured review, later assignment.",
              },
              {
                label:
                  "Skill-driven placement",
                text:
                  "Preferences and capability both matter.",
              },
              {
                label:
                  "Better team balance",
                text:
                  "Admins match members where they can contribute best.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
              >
                <h3 className="text-lg font-bold text-slate-100">
                  {item.label}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {item.text}
                </p>
              </div>
            ))}
          </motion.div>
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
