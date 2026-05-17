// ActiveTasks.jsx

const tasks = [
  "Build Dashboard UI",
  "Create API Integration",
  "Design Task Workflow",
];

const ActiveTasks = () => {
  return (
    <section className="rounded-[35px] border border-white/10 bg-white/[0.03] p-8">

      <h2 className="mb-8 text-3xl font-black">
        Active Tasks
      </h2>

      <div className="space-y-5">

        {tasks.map((task) => (
          <div
            key={task}
            className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5"
          >

            <h3 className="text-lg font-semibold">
              {task}
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Deadline in 2 days
            </p>

          </div>
        ))}

      </div>

    </section>
  );
};

export default ActiveTasks;