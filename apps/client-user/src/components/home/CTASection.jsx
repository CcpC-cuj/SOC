// CTASection.jsx

const CTASection = () => {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10 p-16 backdrop-blur-xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-4 inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
              🚀 Join The Future of Collaboration
            </div>

            <h2 className="mb-6 text-5xl font-black leading-tight">
              Ready to Build Something Amazing?
            </h2>

            <p className="mb-8 max-w-xl text-lg text-slate-300">
              Become part of an innovative developer ecosystem where ideas
              transform into impactful projects.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 text-lg font-bold transition hover:scale-105">
                Join Seasons of Code
              </button>

              <button className="rounded-2xl border border-white/20 bg-white/5 px-8 py-4 font-semibold backdrop-blur-lg transition hover:bg-white/10">
                Explore Projects
              </button>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h3 className="mb-2 text-2xl font-bold text-cyan-400">
                50+ Live Projects
              </h3>

              <p className="text-slate-400">
                Work on exciting ideas with talented teams.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h3 className="mb-2 text-2xl font-bold text-purple-400">
                Real Team Collaboration
              </h3>

              <p className="text-slate-400">
                Frontend, Backend, AI/ML, UI/UX, DevOps and more.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h3 className="mb-2 text-2xl font-bold text-pink-400">
                Mentorship & Growth
              </h3>

              <p className="text-slate-400">
                Learn from experienced developers and mentors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;