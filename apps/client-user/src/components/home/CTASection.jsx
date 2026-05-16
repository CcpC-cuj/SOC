// CTASection.jsx

const CTASection = () => {
  return (
    <section className="section-padding">
      <div className="main-container">
        <div className="overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10 p-8 backdrop-blur-xl md:p-12 lg:p-16">
          
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            
            {/* LEFT CONTENT */}
            <div>
              <div className="badge mb-4">
                🚀 Join The Future of Collaboration
              </div>

              <h2 className="section-title mb-6">
                Ready to Build Something Amazing?
              </h2>

              <p className="mb-8 max-w-xl text-lg leading-relaxed text-slate-300">
                Become part of an innovative developer ecosystem where ideas
                transform into impactful projects.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="gradient-button">
                  Join Seasons of Code
                </button>

                <button className="secondary-button">
                  Explore Projects
                </button>
              </div>
            </div>

            {/* RIGHT CARDS */}
            <div className="grid gap-6">
              
              <div className="glass-card hover-card p-6">
                <h3 className="mb-2 text-2xl font-bold text-cyan-400">
                  50+ Live Projects
                </h3>

                <p className="leading-relaxed text-slate-400">
                  Work on exciting ideas with talented teams.
                </p>
              </div>

              <div className="glass-card hover-card p-6">
                <h3 className="mb-2 text-2xl font-bold text-purple-400">
                  Real Team Collaboration
                </h3>

                <p className="leading-relaxed text-slate-400">
                  Frontend, Backend, AI/ML, UI/UX, DevOps and more.
                </p>
              </div>

              <div className="glass-card hover-card p-6">
                <h3 className="mb-2 text-2xl font-bold text-pink-400">
                  Mentorship & Growth
                </h3>

                <p className="leading-relaxed text-slate-400">
                  Learn from experienced developers and mentors.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CTASection;