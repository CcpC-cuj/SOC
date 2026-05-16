import { motion } from "framer-motion";

import {
  HiUsers,
  HiRocketLaunch,
  HiTrophy,
  HiArrowRight,
} from "react-icons/hi2";

const features = [
  {
    icon: <HiUsers />,
    title: "Collaborative Spirit",
    desc: "Work in teams of 3 to 5 on complex challenges that require coordination, Git flow mastery, and shared vision.",
    color: "border-[var(--secondary)]",
    bg: "bg-[#ffd8d4]",
    text: "text-[var(--secondary)]",
  },

  {
    icon: <HiRocketLaunch />,
    title: "Mentorship",
    desc: "Get 1-on-1 guidance from industry veterans and former SoC winners who help you debug, design, and deploy.",
    color: "border-[#4cd7f8]",
    bg: "bg-[#c7f6ff]",
    text: "text-[#0089a3]",
  },

  {
    icon: <HiTrophy />,
    title: "Career Perks",
    desc: "Complete the program to earn an NFT certificate and exclusive referrals to partner companies.",
    color: "border-[#bac3ff]",
    bg: "bg-[#dee0ff]",
    text: "text-[var(--primary)]",
  },
];

const Features = () => {
  return (
    <section className="section-space">
      <div className="container-main">
        
        {/* Heading */}
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="title-lg text-[var(--primary)] mb-6"
          >
            What's in for you?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-xl text-muted"
          >
            Three pillars of the Seasons of Code experience.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.15,
                duration: 0.7,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -12,
              }}
              className={`bg-white rounded-[38px] p-10 border-b-[10px] ${item.color} card-shadow group transition-all duration-500`}
            >
              
              {/* Icon */}
              <div
                className={`w-20 h-20 rounded-full ${item.bg} flex items-center justify-center text-4xl ${item.text} mb-10 group-hover:rotate-12 transition-transform duration-500`}
              >
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-3xl font-bold text-[var(--primary)] mb-6">
                {item.title}
              </h3>

              {/* Desc */}
              <p className="text-lg leading-9 text-muted mb-8">
                {item.desc}
              </p>

              {/* Link */}
              <button className={`flex items-center gap-2 font-semibold ${item.text} text-lg group-hover:gap-4 transition-all`}>
                Learn More

                <HiArrowRight />
              </button>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Features;