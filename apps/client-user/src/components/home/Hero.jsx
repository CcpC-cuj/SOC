// Hero.jsx

import { motion } from "framer-motion";
import FloatingBlobs from "./FloatingBlobs";
import HeroDashboard from "./HeroDashboard";

const Hero = () => {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      
      {/* BACKGROUND BLOBS */}
      <FloatingBlobs />

      {/* MAIN CONTAINER */}
      <div className="main-container grid gap-16 py-24 lg:grid-cols-2 lg:items-center">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          
          {/* BADGE */}
          <div className="badge mb-6">
            ⚡ Collaborative Developer Ecosystem
          </div>

          {/* HEADING */}
          <h1 className="mb-6 text-5xl font-black leading-tight sm:text-6xl md:text-7xl">
            Build.
            <br />

            Collaborate.
            <br />

            <span className="gradient-text">
              Innovate.
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
            Join Seasons of Code and work on real-world projects with
            passionate developers, mentors, and innovators.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4">
            
            <button className="gradient-button">
              Join Now
            </button>

            <button className="secondary-button">
              Explore Projects
            </button>

          </div>

          {/* STATS */}
          <div className="mt-12 flex flex-wrap gap-8">
            
            <div>
              <h3 className="text-3xl font-black text-cyan-400">
                500+
              </h3>

              <p className="text-slate-400">
                Developers
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-black text-purple-400">
                50+
              </h3>

              <p className="text-slate-400">
                Projects
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-black text-pink-400">
                20+
              </h3>

              <p className="text-slate-400">
                Mentors
              </p>
            </div>

          </div>
        </motion.div>

        {/* RIGHT SIDE DASHBOARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <HeroDashboard />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;