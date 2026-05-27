import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-120px] top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-120px] h-96 w-96 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

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
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-fuchsia-500/10" />

          <div className="relative z-10 grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur-xl">
                Ready for the next build cycle?
              </div>

              <h2 className="max-w-2xl text-5xl font-black leading-tight sm:text-6xl">
                Join with intent.
                <br />
                Grow with
                <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-pink-500 bg-clip-text text-transparent">
                  {" "}the right team.
                </span>
              </h2>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
                Register now, show what you can do, and let the SoC team place you into a squad where your contribution actually matters.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 px-8 py-4 font-bold text-white transition duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(34,211,238,0.25)]"
                >
                  Start registration
                  <ArrowRight size={20} />
                </Link>

                <Link
                  to="/projects"
                  className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-xl transition duration-300 hover:bg-white/10"
                >
                  See showcase tracks
                </Link>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="relative w-full max-w-md rounded-[32px] border border-white/10 bg-black/30 p-8 backdrop-blur-2xl">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">
                      Participant Promise
                    </p>
                    <h3 className="mt-1 text-2xl font-bold">
                      Better Matching
                    </h3>
                  </div>

                  <div className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-300">
                    Active
                  </div>
                </div>

                <div className="space-y-5">
                  {[
                    {
                      title:
                        "Skill-first registration",
                      body:
                        "Tell us where you are strong and where you want to grow.",
                    },
                    {
                      title:
                        "Admin-reviewed assignment",
                      body:
                        "Projects and squads are decided after thoughtful review.",
                    },
                    {
                      title:
                        "Motivated collaboration",
                      body:
                        "You step into a workspace when your team is ready to move.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <Sparkles
                          size={18}
                          className="text-cyan-300"
                        />
                        <h4 className="font-semibold">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-sm leading-7 text-slate-400">
                        {item.body}
                      </p>
                    </div>
                  ))}
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
