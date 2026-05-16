// Footer.jsx

import { motion } from "framer-motion";

import {
  FaDiscord,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";

import { HiCode } from "react-icons/hi";

const Footer = () => {
  return (
    <footer className="overflow-hidden bg-[var(--primary)] px-4 pt-16 pb-8 text-white sm:px-6 md:px-8 md:pt-24 md:pb-10 lg:px-12 xl:px-16 2xl:px-20">

      {/* MAIN FOOTER */}
      <div className="flex flex-col justify-between gap-14 lg:flex-row lg:gap-20">

        {/* LEFT SECTION */}
        <div className="w-full max-w-md">

          {/* LOGO */}
          <div className="mb-6 flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
              <HiCode className="text-3xl text-[var(--tertiary)]" />
            </div>

            <h2 className="text-2xl font-extrabold leading-none md:text-3xl">
              Seasons of Code
            </h2>

          </div>

          {/* DESCRIPTION */}
          <p className="mb-8 text-base leading-8 text-gray-300 md:text-lg">
            An open-source initiative empowering the next
            generation of software engineers through mentorship
            and collaborative building.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex items-center gap-4">

            <motion.a
              href="#"
              whileHover={{
                rotate: 12,
                y: -4,
              }}
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[var(--tertiary)]"
            >
              <FaGithub className="text-xl text-[var(--primary)]" />
            </motion.a>

            <motion.a
              href="#"
              whileHover={{
                rotate: 12,
                y: -4,
              }}
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[var(--tertiary)]"
            >
              <FaDiscord className="text-xl text-[var(--primary)]" />
            </motion.a>

            <motion.a
              href="#"
              whileHover={{
                rotate: 12,
                y: -4,
              }}
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[var(--tertiary)]"
            >
              <FaTwitter className="text-xl text-[var(--primary)]" />
            </motion.a>

          </div>
        </div>

        {/* RIGHT LINKS */}
        <div className="grid w-full grid-cols-2 gap-10 sm:grid-cols-3 md:gap-16 lg:w-auto">

          {/* LINKS */}
          <div className="flex flex-col gap-4">

            <h3 className="mb-2 text-sm font-bold uppercase tracking-[3px] text-[var(--tertiary)]">
              Links
            </h3>

            <a
              href="#"
              className="text-gray-300 transition duration-300 hover:text-[var(--tertiary)]"
            >
              Programs
            </a>

            <a
              href="#"
              className="text-gray-300 transition duration-300 hover:text-[var(--tertiary)]"
            >
              Projects
            </a>

            <a
              href="#"
              className="text-gray-300 transition duration-300 hover:text-[var(--tertiary)]"
            >
              Register
            </a>

          </div>

          {/* SUPPORT */}
          <div className="flex flex-col gap-4">

            <h3 className="mb-2 text-sm font-bold uppercase tracking-[3px] text-[var(--tertiary)]">
              Support
            </h3>

            <a
              href="#"
              className="text-gray-300 transition duration-300 hover:text-[var(--tertiary)]"
            >
              Contact
            </a>

            <a
              href="#"
              className="text-gray-300 transition duration-300 hover:text-[var(--tertiary)]"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-gray-300 transition duration-300 hover:text-[var(--tertiary)]"
            >
              Terms
            </a>

          </div>

          {/* COMMUNITY */}
          <div className="flex flex-col gap-4">

            <h3 className="mb-2 text-sm font-bold uppercase tracking-[3px] text-[var(--tertiary)]">
              Community
            </h3>

            <a
              href="#"
              className="text-gray-300 transition duration-300 hover:text-[var(--tertiary)]"
            >
              Discord
            </a>

            <a
              href="#"
              className="text-gray-300 transition duration-300 hover:text-[var(--tertiary)]"
            >
              GitHub
            </a>

            <a
              href="#"
              className="text-gray-300 transition duration-300 hover:text-[var(--tertiary)]"
            >
              Events
            </a>

          </div>

        </div>
      </div>

      {/* BOTTOM */}
      <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:mt-20 md:flex-row md:pt-8">

        <p className="text-center text-sm text-gray-400 md:text-left">
          © 2026 Seasons of Code. Built for the student community.
        </p>

        <p className="text-xs text-gray-500 md:text-sm">
          Made with React + Tailwind CSS
        </p>

      </div>

    </footer>
  );
};

export default Footer;