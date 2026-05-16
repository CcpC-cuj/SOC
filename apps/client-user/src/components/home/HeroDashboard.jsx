// HeroDashboard.jsx

import { motion } from "framer-motion";

const HeroDashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl"
    >
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold">Project Dashboard</h3>

        <div className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-400">
          Live
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl bg-slate-900/70 p-4">
          <div className="mb-2 flex justify-between">
            <span>AI Chatbot</span>
            <span>78%</span>
          </div>

          <div className="h-3 rounded-full bg-slate-800">
            <div className="h-3 w-[78%] rounded-full bg-gradient-to-r from-cyan-400 to-purple-500" />
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900/70 p-4">
          <h4 className="mb-3 font-semibold">Active Teams</h4>

          <div className="flex gap-2">
            <div className="rounded-xl bg-cyan-500/20 px-3 py-2">
              Frontend
            </div>

            <div className="rounded-xl bg-purple-500/20 px-3 py-2">
              Backend
            </div>

            <div className="rounded-xl bg-pink-500/20 px-3 py-2">
              AI/ML
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroDashboard;