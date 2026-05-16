import { motion } from "framer-motion";

import {
  HiArrowRight,
  HiCodeBracket,
  HiCommandLine,
} from "react-icons/hi2";

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-40 md:pt-32 lg:pt-28 pb-24 md:pb-36 min-h-screen flex items-center">
      
      {/* Background Blobs */}
      <div className="blob bg-[var(--secondary-light)] w-[300px] h-[300px] top-10 left-0"></div>

      <div className="blob bg-[var(--tertiary)] w-[350px] h-[350px] bottom-0 right-0"></div>

      {/* Floating Left Icon */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className="hidden lg:block absolute top-32 left-16 opacity-20"
      >
        <HiCommandLine className="text-[140px] text-[var(--primary)]" />
      </motion.div>

      {/* Floating Right Icon */}
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className="hidden lg:block absolute bottom-20 right-20 opacity-20"
      >
        <HiCodeBracket className="text-[150px] text-[var(--secondary)]" />
      </motion.div>

      {/* Main Container */}
      <div className="container-main relative z-10 w-full">
        
        <div className="flex flex-col items-center text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="bg-[#ffd4cf] text-[var(--secondary)] px-5 py-3 rounded-full flex items-center gap-2 shadow-md">
              
              <span className="text-lg">🎉</span>

              <span className="font-semibold text-sm sm:text-base">
                Summer 2026 Batch Applications Open
              </span>

            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="title-xl text-[var(--primary)] mb-6 leading-[1.05]"
          >
            Seasons of Code <br />

            <span className="text-[var(--secondary)]">
              2026
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="max-w-3xl text-base sm:text-lg md:text-xl leading-8 md:leading-9 text-muted mb-10 md:mb-12 px-2"
          >
            Push your boundaries and dive into a three-month
            coding odyssey. Build industry-grade projects,
            mentored by world-class student developers.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-5 md:gap-6 w-full sm:w-auto px-4 sm:px-0"
          >
            
            <button className="primary-btn flex items-center justify-center gap-3 w-full sm:w-auto">
              Browse Projects

              <HiArrowRight className="text-xl" />
            </button>

            <button className="secondary-btn w-full sm:w-auto">
              Learn More
            </button>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;