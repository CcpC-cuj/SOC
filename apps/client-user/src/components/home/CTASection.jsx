import { motion } from "framer-motion";

const CTA = () => {
  return (
    <section className="pb-28">
      <div className="container-main">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-[var(--secondary)] rounded-[50px] px-10 md:px-20 py-20 text-white shadow-2xl"
        >
          
          {/* Glow */}
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-3xl"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
            
            {/* Left */}
            <div className="max-w-2xl text-center lg:text-left">
              
              <h2 className="title-lg mb-7">
                Ready to change your summer?
              </h2>

              <p className="text-xl leading-9 text-white/90">
                Don't let another summer pass by without
                building something that matters. Join the
                SoC '26 cohort today.
              </p>

            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-5">
              
              <button className="bg-[var(--primary)] hover:scale-105 transition-all duration-300 text-white px-10 py-5 rounded-full font-semibold shadow-2xl">
                Register Now
              </button>

              <button className="border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 px-10 py-5 rounded-full font-semibold">
                View FAQ
              </button>

            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default CTA;