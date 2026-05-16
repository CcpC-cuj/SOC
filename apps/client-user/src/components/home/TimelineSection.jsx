import { motion } from "framer-motion";

import {
  HiClipboardDocumentList,
  HiUserGroup,
  HiCommandLine,
} from "react-icons/hi2";

const timeline = [
  {
    icon: <HiClipboardDocumentList />,
    title: "Registrations Open",
    date: "April 15",
    desc: "Submit your proposals and choose your tracks. First come first served basis for popular projects.",
    border: "hover:border-[var(--secondary)]",
  },

  {
    icon: <HiUserGroup />,
    title: "Mentor Matching",
    date: "May 01",
    desc: "Get paired with a mentor based on your project choice and skill level. Initial kickoff calls scheduled.",
    border: "hover:border-[#4cd7f8]",
  },

  {
    icon: <HiCommandLine />,
    title: "Code Implementation",
    date: "June - July",
    desc: "The heart of the program. Intense coding, weekly standups, and bi-weekly review meetings.",
    border: "hover:border-[var(--primary)]",
  },
];

const Timeline = () => {
  return (
    <section className="section-space">
      <div className="container-main">
        
        {/* Heading */}
        <div className="text-center mb-24">
          
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="title-lg text-[var(--primary)] mb-5"
          >
            The Journey Ahead
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15,
              duration: 0.6,
            }}
            viewport={{ once: true }}
            className="text-xl text-muted"
          >
            Mark your calendars for the most productive summer ever.
          </motion.p>

        </div>

        {/* Timeline */}
        <div className="relative">
          
          {/* Line */}
          <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-[4px] h-full bg-gradient-to-b from-transparent via-[var(--primary)] to-transparent rounded-full"></div>

          <div className="space-y-16">
            
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 80,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.7,
                }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0
                    ? "md:justify-start"
                    : "md:justify-end"
                }`}
              >
                
                {/* Dot */}
                <div className="hidden md:flex absolute left-1/2 top-10 -translate-x-1/2 w-14 h-14 rounded-full bg-white border-4 border-[var(--primary)] shadow-xl items-center justify-center text-2xl text-[var(--primary)] z-10">
                  {item.icon}
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -8 }}
                  className={`w-full md:w-[45%] bg-white border-2 border-transparent ${item.border} rounded-[36px] p-10 card-shadow transition-all duration-500`}
                >
                  
                  {/* Mobile Icon */}
                  <div className="md:hidden w-14 h-14 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-2xl mb-6">
                    {item.icon}
                  </div>

                  {/* Top */}
                  <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
                    
                    <h3 className="text-3xl font-bold text-[var(--primary)]">
                      {item.title}
                    </h3>

                    <span className="px-5 py-2 rounded-full bg-[#ffd8d4] text-[var(--secondary)] font-semibold">
                      {item.date}
                    </span>

                  </div>

                  {/* Desc */}
                  <p className="text-lg leading-9 text-muted">
                    {item.desc}
                  </p>

                </motion.div>
              </motion.div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;