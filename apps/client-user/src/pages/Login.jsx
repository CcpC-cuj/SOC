// Login.jsx

import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  ArrowRight,
  Github,
} from "lucide-react";

const Login = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050816] px-4 py-20 text-white sm:px-6 lg:px-8">
      
      {/* BACKGROUND BLURS */}
      <div className="absolute inset-0 -z-10">
        
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

      </div>

      {/* MAIN CONTAINER */}
      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-2">
        
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:block"
        >
          
          <div className="mb-6 inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
            🚀 Welcome Back Developer
          </div>

          <h1 className="mb-8 text-6xl font-black leading-tight">
            Continue
            <br />

            Building With
            <br />

            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-500 bg-clip-text text-transparent">
              Your Team
            </span>
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-slate-400">
            Access your tasks, projects, team collaboration, and continue
            building innovative solutions with Seasons of Code.
          </p>

          {/* STATS */}
          <div className="mt-12 flex gap-10">
            
            <div>
              <h3 className="text-4xl font-black text-cyan-400">
                50+
              </h3>

              <p className="text-slate-400">
                Active Projects
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-black text-purple-400">
                500+
              </h3>

              <p className="text-slate-400">
                Developers
              </p>
            </div>

          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mx-auto w-full max-w-lg rounded-[40px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl sm:p-10"
        >
          
          {/* HEADER */}
          <div className="mb-10 text-center">
            
            <h2 className="mb-3 text-4xl font-black">
              Login
            </h2>

            <p className="text-slate-400">
              Access your Seasons of Code workspace
            </p>

          </div>

          {/* FORM */}
          <form className="space-y-6">
            
            {/* EMAIL */}
            <div>
              <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-300">
                <Mail size={18} />
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none transition focus:border-cyan-500"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-300">
                <Lock size={18} />
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none transition focus:border-cyan-500"
              />
            </div>

            {/* OPTIONS */}
            <div className="flex items-center justify-between text-sm">
              
              <label className="flex items-center gap-2 text-slate-400">
                <input type="checkbox" />
                Remember Me
              </label>

              <button
                type="button"
                className="text-cyan-400 hover:underline"
              >
                Forgot Password?
              </button>

            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 text-lg font-bold transition duration-300 hover:scale-[1.02]"
            >
              Login
              <ArrowRight size={20} />
            </button>

            {/* DIVIDER */}
            <div className="relative py-4">
              
              <div className="absolute left-0 top-1/2 h-px w-full bg-white/10" />

              <span className="relative mx-auto block w-fit bg-[#050816] px-4 text-sm text-slate-500">
                OR CONTINUE WITH
              </span>

            </div>

            {/* GITHUB LOGIN */}
            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold transition hover:bg-white/10"
            >
              <Github size={22} />
              Continue with GitHub
            </button>

          </form>

          {/* FOOTER */}
          <div className="mt-8 text-center text-slate-400">
            Don’t have an account?{" "}
            
            <button className="font-semibold text-cyan-400 hover:underline">
              Register Now
            </button>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default Login;