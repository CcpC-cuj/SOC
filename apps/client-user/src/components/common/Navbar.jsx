import { motion } from "framer-motion";
import { HiCode } from "react-icons/hi";
import { HiBars3BottomRight } from "react-icons/hi2";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-4 z-50"
    >
      <div className="container-main">
        <div className="glass rounded-full h-20 px-8 flex items-center justify-between card-shadow">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <HiCode className="text-4xl text-[var(--primary)]" />

            <h1 className="text-2xl font-extrabold text-[var(--primary)]">
              Seasons of Code
            </h1>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            <a
              href="#"
              className="relative text-[var(--primary)] font-semibold"
            >
              Home

              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[var(--secondary)]"></span>
            </a>

            <a
              href="#"
              className="text-[var(--text-light)] hover:text-[var(--primary)] transition"
            >
              Programs
            </a>

            <a
              href="#"
              className="text-[var(--text-light)] hover:text-[var(--primary)] transition"
            >
              Timeline
            </a>

            <a
              href="#"
              className="text-[var(--text-light)] hover:text-[var(--primary)] transition"
            >
              FAQ
            </a>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <button className="primary-btn hidden md:block">
              Join Now
            </button>

            <button className="lg:hidden text-4xl text-[var(--primary)]">
              <HiBars3BottomRight />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;