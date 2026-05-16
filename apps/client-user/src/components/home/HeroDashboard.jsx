// HeroDashboard.jsx

import { motion } from "framer-motion";
import {
  Activity,
  Users,
  CheckCircle2,
  Clock3,
} from "lucide-react";

const HeroDashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="glass-card relative overflow-hidden p-6 shadow-2xl shadow-cyan-500/10"
    >
      
      {/* GLOW EFFECT */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />

      {/* HEADER */}
      <div className="relative mb-8 flex items-center justify-between">
        
        <div>
          <h3 className="text-2xl font-black">
            Project Dashboard
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Real-time collaborative workflow
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400">
          <span className="h-2 w-2 rounded-full bg-green-400" />
          Live
        </div>

      </div>

      {/* STATS */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        
        <div className="glass-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <Activity className="text-cyan-400" size={20} />

            <span className="text-xs text-slate-400">
              Active
            </span>
          </div>

          <h4 className="text-3xl font-black text-cyan-400">
            24
          </h4>

          <p className="text-sm text-slate-400">
            Running Tasks
          </p>
        </div>

        <div className="glass-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <Users className="text-purple-400" size={20} />

            <span className="text-xs text-slate-400">
              Teams
            </span>
          </div>

          <h4 className="text-3xl font-black text-purple-400">
            12
          </h4>

          <p className="text-sm text-slate-400">
            Collaborators
          </p>
        </div>

      </div>

      {/* PROJECT PROGRESS */}
      <div className="glass-card mb-6 p-5">
        
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h4 className="text-lg font-bold">
              AI Chatbot Platform
            </h4>

            <p className="text-sm text-slate-400">
              Current Project Progress
            </p>
          </div>

          <span className="text-lg font-black text-cyan-400">
            78%
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-blue-500" />
        </div>

      </div>

      {/* ACTIVE TEAMS */}
      <div className="glass-card mb-6 p-5">
        
        <h4 className="mb-4 text-lg font-bold">
          Active Teams
        </h4>

        <div className="flex flex-wrap gap-3">
          
          <div className="rounded-xl bg-cyan-500/20 px-4 py-2 text-sm font-medium text-cyan-300">
            Frontend
          </div>

          <div className="rounded-xl bg-purple-500/20 px-4 py-2 text-sm font-medium text-purple-300">
            Backend
          </div>

          <div className="rounded-xl bg-pink-500/20 px-4 py-2 text-sm font-medium text-pink-300">
            AI/ML
          </div>

          <div className="rounded-xl bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-300">
            UI/UX
          </div>

        </div>

      </div>

      {/* TASK ACTIVITY */}
      <div className="space-y-4">
        
        <div className="glass-card flex items-center justify-between p-4">
          
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-green-500/20 p-2">
              <CheckCircle2
                size={18}
                className="text-green-400"
              />
            </div>

            <div>
              <h5 className="font-semibold">
                Landing Page Completed
              </h5>

              <p className="text-sm text-slate-400">
                Frontend Team
              </p>
            </div>
          </div>

          <span className="text-xs text-slate-500">
            2m ago
          </span>

        </div>

        <div className="glass-card flex items-center justify-between p-4">
          
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-yellow-500/20 p-2">
              <Clock3
                size={18}
                className="text-yellow-400"
              />
            </div>

            <div>
              <h5 className="font-semibold">
                API Integration Pending
              </h5>

              <p className="text-sm text-slate-400">
                Backend Team
              </p>
            </div>
          </div>

          <span className="text-xs text-slate-500">
            10m ago
          </span>

        </div>
      </div>

    </motion.div>
  );
};

export default HeroDashboard;