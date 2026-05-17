// UpcomingDeadlines.jsx

const UpcomingDeadlines = () => {
  return (
    <section className="rounded-[35px] border border-white/10 bg-white/[0.03] p-8">

      <h2 className="mb-8 text-3xl font-black">
        Upcoming Deadlines
      </h2>

      <div className="space-y-5">

        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
          <h3 className="font-bold">
            Dashboard Submission
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            Due Tomorrow
          </p>
        </div>

        <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">
          <h3 className="font-bold">
            Backend API Review
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            Due in 3 days
          </p>
        </div>

      </div>

    </section>
  );
};

export default UpcomingDeadlines;