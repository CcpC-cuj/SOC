// Footer.jsx

import { motion } from "framer-motion";

import {
  FaDiscord,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";

import {
  HiCode,
} from "react-icons/hi";

import {
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050816] pt-24 text-white">

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">

        {/* GRID */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* GLOW */}
        <div className="absolute left-[-100px] top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute bottom-[-100px] right-[-100px] h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

      </div>

      {/* MAIN CONTAINER */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* TOP SECTION */}
        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr]">

          {/* LEFT SIDE */}
          <div>

            {/* LOGO */}
            <div className="mb-8 flex items-center gap-4">

              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-purple-600 shadow-lg shadow-cyan-500/20">
                <HiCode className="text-3xl text-white" />
              </div>

              <div>
                <h2 className="text-3xl font-black">
                  Seasons
                  <span className="gradient-text">
                    {" "}of Code
                  </span>
                </h2>

                <p className="mt-1 text-slate-400">
                  AI-powered collaborative ecosystem
                </p>
              </div>

            </div>

            {/* DESCRIPTION */}
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              Seasons of Code is a next-generation developer ecosystem
              where students collaborate on projects, participate in
              hackathons, compete in coding challenges, and grow together
              through innovation and mentorship.
            </p>

            {/* AI LABEL */}
            <div className="mt-8 flex w-fit items-center gap-3 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 px-5 py-4 backdrop-blur-xl">

              <Sparkles
                size={18}
                className="text-cyan-400"
              />

              <p className="text-sm text-slate-300">
                Empowering 12K+ student developers 🚀
              </p>

            </div>

            {/* SOCIALS */}
            <div className="mt-10 flex items-center gap-4">

              <motion.a
                whileHover={{
                  y: -6,
                  scale: 1.05,
                }}
                href="#"
                className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition hover:border-cyan-500/30"
              >
                <FaGithub className="text-2xl text-slate-300" />
              </motion.a>

              <motion.a
                whileHover={{
                  y: -6,
                  scale: 1.05,
                }}
                href="#"
                className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition hover:border-purple-500/30"
              >
                <FaDiscord className="text-2xl text-slate-300" />
              </motion.a>

              <motion.a
                whileHover={{
                  y: -6,
                  scale: 1.05,
                }}
                href="#"
                className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition hover:border-pink-500/30"
              >
                <FaTwitter className="text-2xl text-slate-300" />
              </motion.a>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">

            {/* LINKS */}
            <div>

              <h3 className="mb-6 text-sm font-bold uppercase tracking-[4px] text-cyan-400">
                Platform
              </h3>

              <div className="flex flex-col gap-5">

                <a
                  href="#"
                  className="group flex items-center justify-between text-slate-300 transition hover:text-cyan-400"
                >
                  Home

                  <ArrowUpRight
                    size={16}
                    className="opacity-0 transition group-hover:opacity-100"
                  />
                </a>

                <a
                  href="#"
                  className="group flex items-center justify-between text-slate-300 transition hover:text-cyan-400"
                >
                  Projects

                  <ArrowUpRight
                    size={16}
                    className="opacity-0 transition group-hover:opacity-100"
                  />
                </a>

                <a
                  href="#"
                  className="group flex items-center justify-between text-slate-300 transition hover:text-cyan-400"
                >
                  Register

                  <ArrowUpRight
                    size={16}
                    className="opacity-0 transition group-hover:opacity-100"
                  />
                </a>

              </div>

            </div>

            {/* COMMUNITY */}
            <div>

              <h3 className="mb-6 text-sm font-bold uppercase tracking-[4px] text-purple-400">
                Community
              </h3>

              <div className="flex flex-col gap-5">

                <a
                  href="#"
                  className="group flex items-center justify-between text-slate-300 transition hover:text-purple-400"
                >
                  Discord

                  <ArrowUpRight
                    size={16}
                    className="opacity-0 transition group-hover:opacity-100"
                  />
                </a>

                <a
                  href="#"
                  className="group flex items-center justify-between text-slate-300 transition hover:text-purple-400"
                >
                  GitHub

                  <ArrowUpRight
                    size={16}
                    className="opacity-0 transition group-hover:opacity-100"
                  />
                </a>

                <a
                  href="#"
                  className="group flex items-center justify-between text-slate-300 transition hover:text-purple-400"
                >
                  Events

                  <ArrowUpRight
                    size={16}
                    className="opacity-0 transition group-hover:opacity-100"
                  />
                </a>

              </div>

            </div>

            {/* SUPPORT */}
            <div>

              <h3 className="mb-6 text-sm font-bold uppercase tracking-[4px] text-pink-400">
                Support
              </h3>

              <div className="flex flex-col gap-5">

                <a
                  href="#"
                  className="group flex items-center justify-between text-slate-300 transition hover:text-pink-400"
                >
                  Contact

                  <ArrowUpRight
                    size={16}
                    className="opacity-0 transition group-hover:opacity-100"
                  />
                </a>

                <a
                  href="#"
                  className="group flex items-center justify-between text-slate-300 transition hover:text-pink-400"
                >
                  Privacy

                  <ArrowUpRight
                    size={16}
                    className="opacity-0 transition group-hover:opacity-100"
                  />
                </a>

                <a
                  href="#"
                  className="group flex items-center justify-between text-slate-300 transition hover:text-pink-400"
                >
                  Terms

                  <ArrowUpRight
                    size={16}
                    className="opacity-0 transition group-hover:opacity-100"
                  />
                </a>

              </div>

            </div>

          </div>

        </div>

        {/* BOTTOM */}
        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/10 py-8 md:flex-row">

          <p className="text-center text-sm text-slate-500 md:text-left">
            © 2026 Seasons of Code. Built for the student developer community.
          </p>

          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 backdrop-blur-xl">

            <div className="h-2 w-2 rounded-full bg-green-400" />

         

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;