import { motion } from "framer-motion";

import {
  HiCheckCircle,
} from "react-icons/hi2";

const About = () => {
  return (
    <section className="section-space bg-white/40 backdrop-blur-sm">
      <div className="container-main">
        
        <div className="grid lg:grid-cols-2 gap-24 items-center">

          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            
            <div className="overflow-hidden rounded-[40px] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                alt="team"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Circle */}
            <motion.div
              animate={{ rotate: [12, 0, 12] }}
              transition={{
                repeat: Infinity,
                duration: 6,
              }}
              className="hidden lg:flex absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-[var(--tertiary)] text-[var(--primary)] shadow-2xl items-center justify-center flex-col"
            >
              <h3 className="text-4xl font-extrabold">
                100+
              </h3>

              <p className="font-semibold">
                Mentors
              </p>
            </motion.div>

          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            
            <span className="uppercase tracking-[4px] text-[var(--secondary)] font-bold mb-5 inline-block">
              Our Mission
            </span>

            <h2 className="title-lg text-[var(--primary)] mb-8">
              Bridging the gap between theory and production.
            </h2>

            <p className="text-lg leading-9 text-muted mb-8">
              Seasons of Code is more than just a summer
              program. It's an incubator for curiosity. We pair
              ambitious students with mentors who have paved the
              way in Open Source, Cloud Architecture, and
              Product Design.
            </p>

            <div className="space-y-5">

              <div className="flex items-center gap-4">
                <HiCheckCircle className="text-3xl text-[var(--secondary)]" />

                <p className="text-lg">
                  Peer-led learning environment
                </p>
              </div>

              <div className="flex items-center gap-4">
                <HiCheckCircle className="text-3xl text-[var(--secondary)]" />

                <p className="text-lg">
                  Real-world repository contributions
                </p>
              </div>

              <div className="flex items-center gap-4">
                <HiCheckCircle className="text-3xl text-[var(--secondary)]" />

                <p className="text-lg">
                  Global community of 5000+ alumni
                </p>
              </div>

            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;