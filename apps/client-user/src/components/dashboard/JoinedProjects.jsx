// JoinedProjects.jsx

const projects = [
  "AI Chatbot Platform",
  "Task Management App",
  "E-Commerce Platform",
];

const JoinedProjects = () => {
  return (
    <section className="rounded-[35px] border border-white/10 bg-white/[0.03] p-8">

      <h2 className="mb-8 text-3xl font-black">
        Joined Projects
      </h2>

      <div className="space-y-5">

        {projects.map((project) => (
          <div
            key={project}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >

            <h3 className="text-xl font-bold">
              {project}
            </h3>

            <p className="mt-2 text-slate-400">
              Active collaborative development project.
            </p>

          </div>
        ))}

      </div>

    </section>
  );
};

export default JoinedProjects;