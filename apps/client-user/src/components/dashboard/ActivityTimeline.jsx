// ActivityTimeline.jsx

const activities = [
  "You completed UI Dashboard Task",
  "You joined AI Chatbot Project",
  "Leader approved your submission",
];

const ActivityTimeline = () => {
  return (
    <section className="rounded-[35px] border border-white/10 bg-white/[0.03] p-8">

      <h2 className="mb-8 text-3xl font-black">
        Recent Activity
      </h2>

      <div className="space-y-6">

        {activities.map((activity) => (
          <div
            key={activity}
            className="flex items-start gap-4"
          >

            <div className="mt-2 h-3 w-3 rounded-full bg-cyan-400" />

            <div>

              <h3 className="font-semibold">
                {activity}
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                2 hours ago
              </p>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
};

export default ActivityTimeline;