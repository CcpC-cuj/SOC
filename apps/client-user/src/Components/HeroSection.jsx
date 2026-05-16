const HeroSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center gap-12 py-20">
      
      <div className="flex-1 space-y-6">
        
        <div className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold">
          2026 ENROLLMENT OPEN
        </div>

        <h1 className="text-6xl font-bold text-blue-900 leading-tight">
          Master Your Craft Through the Seasons.
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl">
          A year-long journey of technical excellence, team collaboration,
          and professional mentorship designed for the next generation
          of software pioneers.
        </p>

        <div className="flex gap-4 pt-6">
          <button className="bg-blue-900 text-white px-8 py-4 rounded-full hover:bg-red-400 transition">
            Start Application
          </button>

          <button className="border-2 border-blue-900 text-blue-900 px-8 py-4 rounded-full hover:bg-blue-100 transition">
            Explore Projects
          </button>
        </div>
      </div>

      <div className="flex-1">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          alt="team"
          className="rounded-3xl shadow-2xl"
        />
      </div>
    </section>
  );
};

export default HeroSection;