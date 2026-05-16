// Navbar.jsx

import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <header className="navbar-blur sticky top-0 z-50">
      
      <div className="main-container">
        
        <div className="flex h-20 items-center justify-between">
          
          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-xl font-black shadow-lg shadow-cyan-500/20">
              S
            </div>

            <div>
              <h1 className="text-2xl font-black tracking-wide">
                <span className="gradient-text">
                  SoC
                </span>
              </h1>

              <p className="-mt-1 text-xs text-slate-400">
                Seasons of Code
              </p>
            </div>
          </Link>

          {/* NAVIGATION */}
          <nav className="hidden items-center gap-8 md:flex">
            
            <a
              href="#about"
              className="text-slate-300 transition hover:text-cyan-400"
            >
              About
            </a>

            <a
              href="#features"
              className="text-slate-300 transition hover:text-cyan-400"
            >
              Features
            </a>

            <a
              href="#timeline"
              className="text-slate-300 transition hover:text-cyan-400"
            >
              Timeline
            </a>

            <a
              href="#contact"
              className="text-slate-300 transition hover:text-cyan-400"
            >
              Contact
            </a>

          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">
            
            {/* DESKTOP BUTTON */}
            <button className="gradient-button hidden md:block">
              Join Now
            </button>

            {/* MOBILE MENU */}
            <button className="glass-card flex h-12 w-12 items-center justify-center md:hidden">
              <Menu size={22} />
            </button>

          </div>

        </div>

      </div>
    </header>
  );
};

export default Navbar;