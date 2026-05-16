import { motion } from "framer-motion";
import { Bot } from "lucide-react";

export default function HeroDashboard() {
  return (
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
      className="glass-strong rounded-3xl border-gradient p-6"
    >

      <div className="flex items-center gap-3">

        <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-gradient">

          <Bot className="h-5 w-5 text-white" />

        </div>

        <div>

          <p className="text-xs text-muted-foreground">
            AI Workspace
          </p>

          <h3 className="font-semibold">
            neural-os/main
          </h3>

        </div>

      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">

        {[
          {
            label: "Active",
            value: "12",
          },

          {
            label: "Sprint",
            value: "87%",
          },

          {
            label: "AI Score",
            value: "942",
          },
        ].map((item) => (

          <div
            key={item.label}
            className="glass rounded-2xl p-4"
          >

            <p className="text-xs text-muted-foreground">
              {item.label}
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gradient">
              {item.value}
            </h2>

          </div>

        ))}

      </div>

    </motion.div>
  );
}