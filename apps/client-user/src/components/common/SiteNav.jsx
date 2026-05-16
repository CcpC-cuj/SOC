// src/components/SiteNav.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Sparkles,
  Menu,
  X,
} from "lucide-react";

const navLinks = [
  {
    name: "Home",
    path: "/",
  },

  {
    name: "Seasons",
    path: "/seasons",
  },

  {
    name: "Projects",
    path: "/projects",
  },

  {
    name: "Register",
    path: "/register",
  },

  {
    name: "Contact",
    path: "/contact",
  },
];

export default function SiteNav() {
  const [mobileMenu, setMobileMenu] =
    useState(false);

  return (
    <motion.header
      initial={{
        y: -30,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.7,
      }}
      className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 lg:px-8"
    >
      {/* NAV CONTAINER */}

      <div className="max-w-7xl mx-auto mt-4">

        <div className="glass-strong border-gradient rounded-2xl px-6 py-4 flex items-center justify-between">

          {/* ================= LOGO ================= */}

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            {/* Icon */}

            <div className="relative">

              <div className="w-11 h-11 rounded-xl bg-primary-gradient flex items-center justify-center glow-blue">

                <Sparkles className="w-5 h-5 text-white" />

              </div>

              {/* Glow */}

              <div className="absolute inset-0 rounded-xl bg-neon-cyan opacity-30 blur-xl" />

            </div>

            {/* Text */}

            <div>

              <h1 className="font-display text-xl sm:text-2xl font-bold tracking-tight">
                Seasons
                <span className="text-gradient-aurora">
                  {" "}
                  of Code
                </span>
              </h1>

              <p className="text-[10px] sm:text-xs text-muted-foreground">
                AI-Powered Developer Ecosystem
              </p>

            </div>

          </Link>

          {/* ================= DESKTOP NAV ================= */}

          <nav className="hidden lg:flex items-center gap-2">

            {navLinks.map((link) => (

              <Link
                key={link.name}
                to={link.path}
                className="
                  px-4 py-2
                  rounded-xl
                  text-sm
                  text-muted-foreground
                  transition-all
                  duration-300
                  hover:text-white
                  hover:bg-white/5
                "
              >
                {link.name}
              </Link>

            ))}

          </nav>

          {/* ================= ACTION BUTTONS ================= */}

          <div className="hidden lg:flex items-center gap-3">

            <Link
              to="/login"
              className="
                glass
                px-5 py-2.5
                rounded-xl
                text-sm
                font-medium
                hover:bg-white/10
                transition
              "
            >
              Sign In
            </Link>

            <Link
              to="/register"
              className="
                bg-primary-gradient
                px-5 py-2.5
                rounded-xl
                text-sm
                font-semibold
                text-white
                glow-violet
                hover:scale-105
                transition
              "
            >
              Start Journey
            </Link>

          </div>

          {/* ================= MOBILE MENU BUTTON ================= */}

          <button
            onClick={() =>
              setMobileMenu(!mobileMenu)
            }
            className="
              lg:hidden
              glass
              p-2
              rounded-xl
            "
          >

            {mobileMenu ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}

          </button>

        </div>

        {/* ================= MOBILE MENU ================= */}

        {mobileMenu && (

          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="
              lg:hidden
              mt-3
              glass-strong
              border-gradient
              rounded-2xl
              p-4
            "
          >

            <div className="flex flex-col gap-2">

              {navLinks.map((link) => (

                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() =>
                    setMobileMenu(false)
                  }
                  className="
                    px-4 py-3
                    rounded-xl
                    text-sm
                    text-muted-foreground
                    hover:bg-white/5
                    hover:text-white
                    transition
                  "
                >
                  {link.name}
                </Link>

              ))}

              {/* Buttons */}

              <div className="grid grid-cols-2 gap-3 mt-3">

                <Link
                  to="/login"
                  onClick={() =>
                    setMobileMenu(false)
                  }
                  className="
                    glass
                    text-center
                    py-3
                    rounded-xl
                    text-sm
                    font-medium
                  "
                >
                  Sign In
                </Link>

                <Link
                  to="/register"
                  onClick={() =>
                    setMobileMenu(false)
                  }
                  className="
                    bg-primary-gradient
                    text-center
                    py-3
                    rounded-xl
                    text-sm
                    font-semibold
                    text-white
                  "
                >
                  Join Now
                </Link>

              </div>

            </div>

          </motion.div>

        )}

      </div>
    </motion.header>
  );
}