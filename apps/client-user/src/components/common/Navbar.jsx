// Navbar.jsx

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            SoC
          </span>
        </Link>

        <nav className="hidden gap-8 md:flex">
          <a href="#about" className="hover:text-cyan-400">
            About
          </a>

          <a href="#features" className="hover:text-cyan-400">
            Features
          </a>

          <a href="#timeline" className="hover:text-cyan-400">
            Timeline
          </a>

          <a href="#contact" className="hover:text-cyan-400">
            Contact
          </a>
        </nav>

        <button className="rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-2 font-semibold transition hover:scale-105">
          Join Now
        </button>
      </div>
    </header>
  );
};

export default Navbar;