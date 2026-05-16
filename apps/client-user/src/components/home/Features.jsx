// Features.jsx

const features = [
  {
    title: "Team Collaboration",
    desc: "Work in frontend, backend, UI/UX, AI/ML, and DevOps teams.",
  },
  {
    title: "Task Management",
    desc: "Assign tasks, deadlines, and track progress in real-time.",
  },
  {
    title: "Live Leaderboards",
    desc: "Compete with contributors and earn badges.",
  },
];

const Features = () => {
  return (
    <section id="features" className="px-6 py-28">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:-translate-y-2 hover:border-cyan-500/40"
          >
            <h3 className="mb-4 text-2xl font-bold">{feature.title}</h3>

            <p className="text-slate-400">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;