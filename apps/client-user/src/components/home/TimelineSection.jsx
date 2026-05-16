// TimelineSection.jsx

const TimelineSection = () => {
  return (
    <section id="timeline" className="px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-5xl font-black">
            Seasons Timeline
          </h2>

          <p className="text-slate-400">
            A year-round ecosystem of innovation, collaboration, and growth.
          </p>
        </div>

        <div className="relative space-y-10 border-l border-white/10 pl-10">
          <div className="relative rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-8 backdrop-blur-xl">
            <div className="absolute -left-[52px] top-10 h-6 w-6 rounded-full border-4 border-cyan-400 bg-[#050816]" />

            <span className="mb-3 inline-block rounded-full bg-cyan-500/20 px-4 py-2 text-sm text-cyan-300">
              June - July
            </span>

            <h3 className="mb-4 text-3xl font-bold text-cyan-400">
              Summer Project Season
            </h3>

            <p className="mb-6 text-slate-300">
              Collaborate with developers and mentors to build impactful
              real-world projects across multiple domains.
            </p>

            <div className="flex flex-wrap gap-3">
              <div className="rounded-xl bg-white/5 px-4 py-2">
                Team Projects
              </div>

              <div className="rounded-xl bg-white/5 px-4 py-2">
                Mentorship
              </div>

              <div className="rounded-xl bg-white/5 px-4 py-2">
                Weekly Reviews
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl border border-purple-500/20 bg-purple-500/5 p-8 backdrop-blur-xl">
            <div className="absolute -left-[52px] top-10 h-6 w-6 rounded-full border-4 border-purple-400 bg-[#050816]" />

            <span className="mb-3 inline-block rounded-full bg-purple-500/20 px-4 py-2 text-sm text-purple-300">
              October - November
            </span>

            <h3 className="mb-4 text-3xl font-bold text-purple-400">
              Autumn Coding Challenge
            </h3>

            <p className="mb-6 text-slate-300">
              Compete in exciting contests, coding battles, and algorithmic
              challenges with peers from different domains.
            </p>

            <div className="flex flex-wrap gap-3">
              <div className="rounded-xl bg-white/5 px-4 py-2">
                Competitive Coding
              </div>

              <div className="rounded-xl bg-white/5 px-4 py-2">
                Leaderboards
              </div>

              <div className="rounded-xl bg-white/5 px-4 py-2">
                Exciting Prizes
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;