import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import NeuralBackground from "../common/NeuralBackground";
import FloatingBlobs from "./FloatingBlobs";
import HeroDashboard from "./HeroDashboard";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-screen items-center pt-28">

      <div className="absolute inset-0 bg-hero" />

      <div className="absolute inset-0 grid-bg" />

      <NeuralBackground className="opacity-70" />

      <FloatingBlobs />

      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">

        <div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs text-muted-foreground"
          >

            <span className="relative flex h-2 w-2">

              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />

            </span>

            Season 04 · Cohort applications open

          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
          >

            Build.
            <br />

            Collaborate.
            <br />

            <span className="text-gradient-aurora">
              Innovate.
            </span>

          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground"
          >

            A futuristic coding ecosystem where developers
            build projects, collaborate with teams,
            and grow together using AI-powered workflows.

          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4"
          >

            <Link
              to="/register"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary-gradient px-6 py-3 text-sm font-semibold text-white glow-violet hover:scale-105 transition"
            >

              Start Journey

              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />

            </Link>

            <Link
              to="/projects"
              className="glass rounded-xl px-6 py-3 text-sm font-semibold hover:bg-white/10 transition"
            >
              Explore Projects
            </Link>

          </motion.div>

        </div>

        <HeroDashboard />

      </div>

    </section>
  );
}