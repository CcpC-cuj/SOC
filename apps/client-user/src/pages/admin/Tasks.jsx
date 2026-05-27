import {
  useEffect,
  useState,
} from "react";
import {
  CheckCircle2,
  Clock3,
  ClipboardList,
} from "lucide-react";

import AdminAPI from "../../services/adminApi";

const Tasks = () => {
  const [tasks, setTasks] =
    useState([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response =
          await AdminAPI.get(
            "/tasks"
          );
        setTasks(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTasks();
  }, []);

  const refreshTasks = async () => {
    const response =
      await AdminAPI.get("/tasks");
    setTasks(response.data);
  };

  const approveTask = async (
    id
  ) => {
    try {
      await AdminAPI.put(
        `/tasks/${id}/approve`
      );
      await refreshTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-5xl font-black">
          Task Management
        </h1>
        <p className="mt-3 text-slate-400">
          Monitor progress across assigned teams and step in when submitted work needs approval.
        </p>
      </div>

      <div className="space-y-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7"
          >
            <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h2 className="text-3xl font-black">
                  {task.title}
                </h2>
                <p className="mt-3 max-w-3xl text-slate-400">
                  {task.description}
                </p>
              </div>

              <ClipboardList
                size={30}
                className="text-cyan-400"
              />
            </div>

            <div className="mb-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl bg-[#07101c] p-5">
                <p className="mb-2 text-sm text-slate-400">
                  Project
                </p>
                <h3 className="font-bold">
                  {task.project?.title}
                </h3>
              </div>

              <div className="rounded-2xl bg-[#07101c] p-5">
                <p className="mb-2 text-sm text-slate-400">
                  Assigned To
                </p>
                <h3 className="font-bold">
                  {task.assignedTo?.name}
                </h3>
              </div>

              <div className="rounded-2xl bg-[#07101c] p-5">
                <p className="mb-2 text-sm text-slate-400">
                  Created By
                </p>
                <h3 className="font-bold">
                  {task.createdBy?.name}
                </h3>
              </div>

              <div className="rounded-2xl bg-[#07101c] p-5">
                <p className="mb-2 text-sm text-slate-400">
                  Deadline
                </p>
                <h3 className="font-bold">
                  {task.deadline
                    ? new Date(
                        task.deadline
                      ).toLocaleDateString()
                    : "No deadline"}
                </h3>
              </div>
            </div>

            <div className="mb-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-fuchsia-500/10 px-4 py-2 text-sm text-fuchsia-100">
                {task.taskType}
              </span>
              <span
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm ${
                  task.status ===
                  "approved"
                    ? "bg-emerald-500/10 text-emerald-100"
                    : "bg-yellow-500/10 text-yellow-100"
                }`}
              >
                {task.status ===
                "approved" ? (
                  <CheckCircle2 size={16} />
                ) : (
                  <Clock3 size={16} />
                )}
                {task.status}
              </span>
            </div>

            {task.submissionLinks
              ?.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-4 text-xl font-bold">
                  Submission Links
                </h3>
                <div className="space-y-3">
                  {task.submissionLinks.map(
                    (link, index) => (
                      <a
                        key={`${link.url}-${index}`}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="block rounded-2xl bg-cyan-500/10 px-5 py-4 text-cyan-300 transition hover:bg-cyan-500/20"
                      >
                        {link.title}
                      </a>
                    )
                  )}
                </div>
              </div>
            )}

            {task.status ===
              "submitted" && (
              <button
                type="button"
                onClick={() =>
                  approveTask(
                    task._id
                  )
                }
                className="rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 px-8 py-4 font-bold"
              >
                Approve task
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
