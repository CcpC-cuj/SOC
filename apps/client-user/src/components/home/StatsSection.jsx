import { motion } from "framer-motion";

const stats = [
  {
    number: "250+",
    label: "Active Projects",
    color: "text-[#ffb8b2]",
  },

  {
    number: "15k+",
    label: "Git Commits",
    color: "text-[#4cd7f8]",
  },

  {
    number: "12",
    label: "Focus Tracks",
    color: "text-[#ffb8b2]",
  },

  {
    number: "40+",
    label: "Countries",
    color: "text-[#4cd7f8]",
  },
];

const Stats = () => {
  return (
    <section className="py-28 bg-[var(--primary)] text-white">
      <div className="container-main">
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-14 text-center">
          
          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.12,
                duration: 0.5,
              }}
              viewport={{ once: true }}
            >
              
              <h2
                className={`text-6xl md:text-7xl font-extrabold mb-4 ${item.color}`}
              >
                {item.number}
              </h2>

              <p className="uppercase tracking-[4px] text-sm text-white/70 font-semibold">
                {item.label}
              </p>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Stats;