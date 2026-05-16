// StatsSection.jsx

const stats = [
  { number: "500+", label: "Students" },
  { number: "50+", label: "Projects" },
  { number: "20+", label: "Mentors" },
  { number: "10k+", label: "Contributions" },
];

const StatsSection = () => {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center"
          >
            <h3 className="mb-2 text-5xl font-black text-cyan-400">
              {stat.number}
            </h3>

            <p className="text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;