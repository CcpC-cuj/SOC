// Register.jsx

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Github,
  Code2,
  Users,
  Layers3,
  ArrowRight,
} from "lucide-react";

const projects = [
  "AI Chatbot Platform",
  "E-Commerce Platform",
  "Task Management System",
  "Social Media Dashboard",
  "Fitness Tracker",
  "Quiz Platform",
];

const teams = [
  "Frontend",
  "Backend",
  "UI/UX",
  "AI/ML",
  "DevOps",
  "Content",
];

const Register = () => {
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);

  const handleProjectSelect = (project) => {
    if (selectedProjects.includes(project)) {
      setSelectedProjects(
        selectedProjects.filter((p) => p !== project)
      );
    } else if (selectedProjects.length < 2) {
      setSelectedProjects([...selectedProjects, project]);
    }
  };

  const handleTeamSelect = (team) => {
    if (selectedTeams.includes(team)) {
      setSelectedTeams(
        selectedTeams.filter((t) => t !== team)
      );
    } else {
      setSelectedTeams([...selectedTeams, team]);
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
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="rounded-[40px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12"
        >
          
          <div className="grid gap-12 lg:grid-cols-2">
            
            {/* LEFT */}
            <div className="space-y-8">
              
              {/* NAME */}
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-300">
                  <User size={18} />
                  Full Name
                </label>

                <input
                  type="text"
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
                  placeholder="Enter your email"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none transition focus:border-cyan-500"
                />
              </div>

              {/* GITHUB */}
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-300">
                  <Github size={18} />
                  GitHub Profile
                </label>

                <input
                  type="text"
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
                  placeholder="React, Node.js, AI/ML, UI/UX..."
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none transition focus:border-cyan-500"
                />
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-10">
              
              {/* PROJECTS */}
              <div>
                <label className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Layers3 size={20} />
                  Select Projects (Max 2)
                </label>

                <div className="grid gap-4">
                  {projects.map((project) => (
                    <button
                      key={project}
                      onClick={() =>
                        handleProjectSelect(project)
                      }
                      className={`rounded-2xl border px-5 py-4 text-left transition ${
                        selectedProjects.includes(project)
                          ? "border-cyan-500 bg-cyan-500/10"
                          : "border-white/10 bg-white/5 hover:border-cyan-500/40"
                      }`}
                    >
                      {project}
                    </button>
                  ))}
                </div>
              </div>

              {/* TEAMS */}
              <div>
                <label className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Users size={20} />
                  Select Teams
                </label>

                <div className="flex flex-wrap gap-4">
                  {teams.map((team) => (
                    <button
                      key={team}
                      onClick={() => handleTeamSelect(team)}
                      className={`rounded-2xl px-5 py-3 transition ${
                        selectedTeams.includes(team)
                          ? "bg-gradient-to-r from-cyan-500 to-purple-600"
                          : "border border-white/10 bg-white/5 hover:border-cyan-500/40"
                      }`}
                    >
                      {team}
                    </button>
                  ))}
                </div>
              </div>

              {/* SUBMIT */}
              <button className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-5 text-lg font-bold transition duration-300 hover:scale-[1.02]">
                Register Now
                <ArrowRight size={20} />
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;