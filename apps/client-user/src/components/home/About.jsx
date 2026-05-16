// About.jsx

const About = () => {
  return (
    <section
      id="about"
      className="py-28"
    >

      {/* HEADING */}
      <div className="mb-16 text-center">

        <h2 className="mb-4 text-4xl font-black md:text-5xl">
          What is Seasons of Code?
        </h2>

        <p className="text-lg text-slate-400">
          A year-round collaborative coding initiative
          for students and developers.
        </p>

      </div>

      {/* CARDS */}
      <div className="grid gap-8 md:grid-cols-3">

        {/* CARD 1 */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:border-cyan-400/30 hover:bg-white/10">

          <h3 className="mb-4 text-2xl font-bold text-cyan-400">
            Learn Together
          </h3>

          <p className="leading-8 text-slate-300">
            Collaborate with peers and mentors in
            real-world project environments.
          </p>

        </div>

        {/* CARD 2 */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:border-purple-400/30 hover:bg-white/10">

          <h3 className="mb-4 text-2xl font-bold text-purple-400">
            Build Projects
          </h3>

          <p className="leading-8 text-slate-300">
            Work on impactful projects that improve
            your development skills.
          </p>

        </div>

        {/* CARD 3 */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:border-pink-400/30 hover:bg-white/10">

          <h3 className="mb-4 text-2xl font-bold text-pink-400">
            Join Challenges
          </h3>

          <p className="leading-8 text-slate-300">
            Participate in contests, hackathons,
            and innovation challenges.
          </p>

        </div>

      </div>

    </section>
  );
};

export default About;