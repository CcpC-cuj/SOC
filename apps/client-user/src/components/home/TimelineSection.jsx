// TimelineSection.jsx

const TimelineSection = () => {
  return (
    <section id="timeline" className="section-padding">
      <div className="main-container max-w-5xl">
        
        {/* HEADER */}
        <div className="mb-16 text-center">
          <h2 className="section-title">
            Seasons Timeline
          </h2>

          <p className="section-subtitle">
            A year-round ecosystem of innovation, collaboration, and growth.
          </p>
        </div>

        {/* TIMELINE */}
        <div className="relative space-y-10 border-l border-white/10 pl-6 md:pl-10">
          
          {/* SUMMER SEASON */}
          <div className="glass-card relative border-cyan-500/20 bg-cyan-500/5 p-6 md:p-8">
            
            {/* TIMELINE DOT */}
            <div className="absolute -left-[34px] top-10 h-5 w-5 rounded-full border-4 border-cyan-400 bg-[#050816] md:-left-[52px] md:h-6 md:w-6" />

            {/* DATE BADGE */}
            <span className="mb-4 inline-flex rounded-full bg-cyan-500/20 px-4 py-2 text-sm text-cyan-300">
              June - July
            </span>

            {/* TITLE */}
            <h3 className="mb-4 text-2xl font-bold text-cyan-400 md:text-3xl">
              Summer Project Season
            </h3>

            {/* DESCRIPTION */}
            <p className="mb-6 leading-relaxed text-slate-300">
              Collaborate with developers and mentors to build impactful
              real-world projects across multiple domains.
            </p>

            {/* TAGS */}
            <div className="flex flex-wrap gap-3">
              <div className="rounded-xl bg-white/5 px-4 py-2 text-sm text-slate-300">
                Team Projects
              </div>

              <div className="rounded-xl bg-white/5 px-4 py-2 text-sm text-slate-300">
                Mentorship
              </div>

              <div className="rounded-xl bg-white/5 px-4 py-2 text-sm text-slate-300">
                Weekly Reviews
              </div>
            </div>
          </div>

          {/* AUTUMN SEASON */}
          <div className="glass-card relative border-purple-500/20 bg-purple-500/5 p-6 md:p-8">
            
            {/* TIMELINE DOT */}
            <div className="absolute -left-[34px] top-10 h-5 w-5 rounded-full border-4 border-purple-400 bg-[#050816] md:-left-[52px] md:h-6 md:w-6" />

            {/* DATE BADGE */}
            <span className="mb-4 inline-flex rounded-full bg-purple-500/20 px-4 py-2 text-sm text-purple-300">
              October - November
            </span>

            {/* TITLE */}
            <h3 className="mb-4 text-2xl font-bold text-purple-400 md:text-3xl">
              Autumn Coding Challenge
            </h3>

            {/* DESCRIPTION */}
            <p className="mb-6 leading-relaxed text-slate-300">
              Compete in exciting contests, coding battles, and algorithmic
              challenges with peers from different domains.
            </p>

            {/* TAGS */}
            <div className="flex flex-wrap gap-3">
              <div className="rounded-xl bg-white/5 px-4 py-2 text-sm text-slate-300">
                Competitive Coding
              </div>

              <div className="rounded-xl bg-white/5 px-4 py-2 text-sm text-slate-300">
                Leaderboards
              </div>

              <div className="rounded-xl bg-white/5 px-4 py-2 text-sm text-slate-300">
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