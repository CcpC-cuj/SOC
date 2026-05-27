import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { HiCode } from "react-icons/hi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050816] pt-24 text-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute left-[-100px] top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-[-100px] right-[-100px] h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-fuchsia-600 shadow-lg shadow-cyan-500/20">
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
                  Review-first project allocation for motivated builders
                </p>
              </div>
            </div>

            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              This portal helps participants register with clarity and helps organizers assign members into the right projects and teams later.
            </p>

            <div className="mt-8 flex w-fit items-center gap-3 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 px-5 py-4 backdrop-blur-xl">
              <Sparkles
                size={18}
                className="text-cyan-400"
              />

              <p className="text-sm text-slate-300">
                Showcase first. Review carefully. Build with purpose.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              {[
                {
                  label: "Register now",
                  to: "/register",
                },
                {
                  label: "View showcase",
                  to: "/projects",
                },
                {
                  label: "Participant login",
                  to: "/login",
                },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{
                    y: -4,
                  }}
                >
                  <Link
                    to={item.to}
                    className="inline-flex items-center rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/30 hover:text-cyan-200"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <h3 className="mb-6 text-sm font-bold uppercase tracking-[4px] text-cyan-400">
                Platform
              </h3>

              <div className="flex flex-col gap-5">
                {[
                  {
                    label: "Home",
                    to: "/",
                  },
                  {
                    label: "Showcase",
                    to: "/projects",
                  },
                  {
                    label: "Register",
                    to: "/register",
                  },
                ].map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="group flex items-center justify-between text-slate-300 transition hover:text-cyan-400"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={16}
                      className="opacity-0 transition group-hover:opacity-100"
                    />
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-sm font-bold uppercase tracking-[4px] text-fuchsia-400">
                Journey
              </h3>

              <div className="flex flex-col gap-5 text-slate-300">
                <span>Register</span>
                <span>Review</span>
                <span>Assignment</span>
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-sm font-bold uppercase tracking-[4px] text-pink-400">
                Support
              </h3>

              <div className="flex flex-col gap-5 text-slate-300">
                <span>Contact organizers</span>
                <span>Registration help</span>
                <span>Assignment updates</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
