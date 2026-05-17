// Register.jsx

import { useState } from "react";

import { motion } from "framer-motion";

import {
  User,
  Mail,
  Code2,
  ArrowRight,
  Lock,
} from "lucide-react";

import { FaGithub } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { registerUser } from "../services/authService";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      skills: "",
      department: "",
      roll: "",
      program: "",
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const data =
        await registerUser(
          formData
        );

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      navigate("/dashboard");

    } catch (error) {

      console.log(
        error.response?.data
          ?.message || error.message
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">

        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

      </div>

      {/* PAGE */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">

        {/* HEADER */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mb-16 text-center"
        >

          <div className="mb-4 inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
            🚀 Join Seasons of Code
          </div>

          <h1 className="mb-6 text-5xl font-black sm:text-6xl">
            Build With

            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-500 bg-clip-text text-transparent">
              {" "}
              Amazing Teams
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-400">
            Register now and collaborate with passionate developers on
            real-world projects.
          </p>

        </motion.div>

        {/* FORM */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
          }}
          className="rounded-[40px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12"
        >

          <form
            onSubmit={handleSubmit}
            className="grid gap-12 lg:grid-cols-2"
          >

            {/* LEFT SIDE */}
            <div className="space-y-8">

              {/* NAME */}
              <div>

                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-300">
                  <User size={18} />
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none transition focus:border-cyan-500"
                />

              </div>

              {/* EMAIL */}
              <div>

                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-300">
                  <Mail size={18} />
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none transition focus:border-cyan-500"
                />

              </div>

              {/* GITHUB */}
              <div>

                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-300">
                  <FaGithub size={18} />
                  GitHub Profile
                </label>

                <input
                  type="text"
                  name="github"
                  placeholder="GitHub username or link"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none transition focus:border-cyan-500"
                />

              </div>

              {/* SKILLS */}
              <div>

                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-300">
                  <Code2 size={18} />
                  Skills
                </label>

                <textarea
                  rows="4"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="React, Node.js, AI/ML, UI/UX..."
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none transition focus:border-cyan-500"
                />

              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-10">

              {/* EXPERIENCE */}
              <div>

                <label className="mb-5 flex items-center gap-3 text-xl font-bold">
                  <Code2 size={22} />
                  Experience Level
                </label>

                <div className="grid grid-cols-2 gap-4">

                  <button
                    type="button"
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition hover:border-cyan-500/40 hover:bg-white/[0.05]"
                  >
                    Beginner
                  </button>

                  <button
                    type="button"
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition hover:border-cyan-500/40 hover:bg-white/[0.05]"
                  >
                    Intermediate
                  </button>

                  <button
                    type="button"
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition hover:border-cyan-500/40 hover:bg-white/[0.05]"
                  >
                    Advanced
                  </button>

                  <button
                    type="button"
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition hover:border-cyan-500/40 hover:bg-white/[0.05]"
                  >
                    Open Source
                  </button>

                </div>

              </div>

              {/* INFO BOX */}
              <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-6">

                <h3 className="mb-3 text-lg font-bold text-cyan-300">
                  How Team Selection Works 🚀
                </h3>

                <p className="leading-7 text-slate-300">
                  After registration, you’ll get access to the project dashboard
                  where you can join specific teams like Frontend, Backend,
                  AI/ML, UI/UX, DevOps, and more for each selected project.
                </p>

              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-5 text-lg font-bold transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(34,211,238,0.25)]"
              >

                {
                  loading
                    ? "Creating Account..."
                    : "Register Now"
                }

                <ArrowRight size={20} />

              </button>

            </div>

          </form>

        </motion.div>

      </div>

    </div>
  );
};

export default Register;