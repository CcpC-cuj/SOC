// StatsCards.jsx

const stats = [
  {
    title: "Joined Projects",
    value: "04",
  },
  {
    title: "Completed Tasks",
    value: "18",
  },
  {
    title: "Teams",
    value: "06",
  },
  {
    title: "Leaderboard Rank",
    value: "#12",
  },
];

const StatsCards = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      {stats.map((item) => (
        <div
          key={item.title}
          className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
        >

          <p className="text-slate-400">
            {item.title}
          </p>

          <h2 className="mt-4 text-5xl font-black">
            {item.value}
          </h2>

        </div>
      ))}

    </div>
  );
};

export default StatsCards;