// About.jsx

const About = () => {
  return (
    <section id="about" className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-black">
            What is Seasons of Code?
          </h2>

          <p className="mx-auto max-w-2xl text-slate-400">
            A year-round collaborative coding initiative for students and
            developers.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h3 className="mb-4 text-2xl font-bold text-cyan-400">
              Learn Together
            </h3>

            <p className="text-slate-300">
              Collaborate with peers and mentors in real-world project
              environments.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h3 className="mb-4 text-2xl font-bold text-purple-400">
              Build Projects
            </h3>

            <p className="text-slate-300">
              Work on impactful projects that improve your development skills.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h3 className="mb-4 text-2xl font-bold text-pink-400">
              Join Challenges
            </h3>

            <p className="text-slate-300">
              Participate in contests, hackathons, and innovation challenges.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;