import { motion } from "framer-motion";

import {
  FaDiscord,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";

import { HiCode } from "react-icons/hi";

const Footer = () => {
  return (
    <footer className="bg-[var(--primary)] pt-16 md:pt-24 pb-8 md:pb-10 text-white overflow-hidden">
      
      <div className="container-main">

        {/* Main Footer */}
        <div className="flex flex-col lg:flex-row justify-between gap-14 lg:gap-20">

          {/* Left Section */}
          <div className="max-w-md w-full">
            
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <HiCode className="text-3xl text-[var(--tertiary)]" />
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold leading-none">
                Seasons of Code
              </h2>

            </div>

            {/* Description */}
            <p className="text-gray-300 text-base md:text-lg leading-8 mb-8">
              An open-source initiative empowering the next
              generation of software engineers through mentorship
              and collaborative building.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">

              <motion.a
                href="#"
                whileHover={{
                  rotate: 12,
                  y: -4,
                }}
                className="w-12 h-12 rounded-full bg-[var(--tertiary)] flex items-center justify-center cursor-pointer"
              >
                <FaGithub className="text-xl text-[var(--primary)]" />
              </motion.a>

              <motion.a
                href="#"
                whileHover={{
                  rotate: 12,
                  y: -4,
                }}
                className="w-12 h-12 rounded-full bg-[var(--tertiary)] flex items-center justify-center cursor-pointer"
              >
                <FaDiscord className="text-xl text-[var(--primary)]" />
              </motion.a>

              <motion.a
                href="#"
                whileHover={{
                  rotate: 12,
                  y: -4,
                }}
                className="w-12 h-12 rounded-full bg-[var(--tertiary)] flex items-center justify-center cursor-pointer"
              >
                <FaTwitter className="text-xl text-[var(--primary)]" />
              </motion.a>

            </div>
          </div>

          {/* Right Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-16 w-full lg:w-auto">

            {/* Links */}
            <div className="flex flex-col gap-4">
              
              <h3 className="text-[var(--tertiary)] font-bold uppercase tracking-[3px] text-sm mb-2">
                Links
              </h3>

              <a
                href="#"
                className="text-gray-300 hover:text-[var(--tertiary)] transition duration-300"
              >
                Programs
              </a>

              <a
                href="#"
                className="text-gray-300 hover:text-[var(--tertiary)] transition duration-300"
              >
                Projects
              </a>

              <a
                href="#"
                className="text-gray-300 hover:text-[var(--tertiary)] transition duration-300"
              >
                Register
              </a>

            </div>

            {/* Support */}
            <div className="flex flex-col gap-4">
              
              <h3 className="text-[var(--tertiary)] font-bold uppercase tracking-[3px] text-sm mb-2">
                Support
              </h3>

              <a
                href="#"
                className="text-gray-300 hover:text-[var(--tertiary)] transition duration-300"
              >
                Contact
              </a>

              <a
                href="#"
                className="text-gray-300 hover:text-[var(--tertiary)] transition duration-300"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="text-gray-300 hover:text-[var(--tertiary)] transition duration-300"
              >
                Terms
              </a>

            </div>

            {/* Community */}
            <div className="flex flex-col gap-4">
              
              <h3 className="text-[var(--tertiary)] font-bold uppercase tracking-[3px] text-sm mb-2">
                Community
              </h3>

              <a
                href="#"
                className="text-gray-300 hover:text-[var(--tertiary)] transition duration-300"
              >
                Discord
              </a>

              <a
                href="#"
                className="text-gray-300 hover:text-[var(--tertiary)] transition duration-300"
              >
                GitHub
              </a>

              <a
                href="#"
                className="text-gray-300 hover:text-[var(--tertiary)] transition duration-300"
              >
                Events
              </a>

            </div>

          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-14 md:mt-20 pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-gray-400 text-sm text-center md:text-left">
            © 2026 Seasons of Code. Built for the student community.
          </p>

          <p className="text-gray-500 text-xs md:text-sm">
            Made with React + Tailwind CSS
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;