const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 mt-4 mx-auto max-w-7xl px-6">
      <div className="bg-white/90 backdrop-blur-md rounded-full shadow-sm h-20 flex items-center justify-between px-8">
        
        <div className="flex items-center gap-2">
          <span className="text-3xl font-bold text-blue-900">
            Seasons of Code
          </span>
        </div>

        <nav className="hidden md:flex gap-8 items-center">
          <a href="#" className="text-blue-900 font-bold">
            Programs
          </a>

          <a href="#" className="text-gray-600 hover:text-blue-900">
            Domains
          </a>

          <a href="#" className="text-gray-600 hover:text-blue-900">
            Timeline
          </a>

          <a href="#" className="text-gray-600 hover:text-blue-900">
            Mentorship
          </a>
        </nav>

        <button className="bg-blue-900 text-white px-6 py-3 rounded-full hover:bg-red-400 transition">
          Join Now
        </button>
      </div>
    </header>
  );
};

export default Navbar;