const stats = [
  {
    number: "01",
    label: "Registration profile",
    text:
      "A single place to show your skill, intent, and availability.",
  },
  {
    number: "02",
    label: "Organizer review layers",
    text:
      "Capability, preferences, and team balance all get considered.",
  },
  {
    number: "03",
    label: "Assignment outcomes",
    text:
      "Shortlist, waitlist, or direct team placement after review.",
  },
  {
    number: "04",
    label: "Workspace signals",
    text:
      "Tasks, teams, and submissions once your project begins.",
  },
];

const StatsSection = () => {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-3xl border border-white/10 bg-white/5 p-8"
          >
            <h3 className="mb-2 text-5xl font-black text-cyan-400">
              {stat.number}
            </h3>
            <p className="text-lg font-bold text-slate-100">
              {stat.label}
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              {stat.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
