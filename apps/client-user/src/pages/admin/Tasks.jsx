// client-admin/src/pages/Tasks.jsx

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  CheckCircle2,
  Clock3,
  ClipboardList,
} from "lucide-react";

const Tasks = () => {

  const [tasks,
    setTasks] =
    useState([]);

  useEffect(() => {

    fetchTasks();

  }, []);

  // FETCH TASKS
  const fetchTasks =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.get(
            "http://localhost:5000/api/tasks",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setTasks(
          response.data
        );

      } catch (error) {

        console.log(error);

      }
    };

  // APPROVE TASK
  const approveTask =
    async (id) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.put(
          `http://localhost:5000/api/tasks/${id}/approve`,
          {},
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        fetchTasks();

      } catch (error) {

        console.log(error);

      }
    };

  return (
    <div>

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-5xl font-black">

          Task Management

        </h1>

        <p className="mt-3 text-slate-400">

          Monitor all assigned tasks

        </p>

      </div>

      {/* TASK LIST */}
      <div className="space-y-6">

        {tasks.map((task) => (

          <div
            key={task._id}
            className="rounded-3xl border border-white/10 bg-white/5 p-7"
          >

            {/* TOP */}
            <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

              <div>

                <h2 className="text-3xl font-black">

                  {task.title}

                </h2>

                <p className="mt-3 max-w-3xl text-slate-400">

                  {
                    task.description
                  }

                </p>

              </div>

              <ClipboardList
                size={30}
                className="text-cyan-400"
              />

            </div>

            {/* DETAILS */}
            <div className="mb-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

              <div className="rounded-2xl bg-white/5 p-5">

                <p className="mb-2 text-sm text-slate-400">

                  Assigned To

                </p>

                <h3 className="font-bold">

                  {
                    task.assignedTo
                      ?.name
                  }

                </h3>

              </div>

              <div className="rounded-2xl bg-white/5 p-5">

                <p className="mb-2 text-sm text-slate-400">

                  Assigned By

                </p>

                <h3 className="font-bold">

                  {
                    task.assignedBy
                      ?.name
                  }

                </h3>

              </div>

              <div className="rounded-2xl bg-white/5 p-5">

                <p className="mb-2 text-sm text-slate-400">

                  Status

                </p>

                <div className="flex items-center gap-2">

                  {
                    task.status ===
                    "approved"
                    ? (
                      <CheckCircle2
                        size={18}
                        className="text-green-400"
                      />
                    )
                    : (
                      <Clock3
                        size={18}
                        className="text-yellow-400"
                      />
                    )
                  }

                  <span className="font-bold">

                    {task.status}

                  </span>

                </div>

              </div>

              <div className="rounded-2xl bg-white/5 p-5">

                <p className="mb-2 text-sm text-slate-400">

                  Deadline

                </p>

                <h3 className="font-bold">

                  {
                    new Date(
                      task.deadline
                    ).toLocaleDateString()
                  }

                </h3>

              </div>

            </div>

            {/* SUBMISSION */}
            {task.submissionLinks
              ?.length > 0 && (

              <div className="mb-6">

                <h3 className="mb-4 text-xl font-bold">

                  Submission Links

                </h3>

                <div className="space-y-3">

                  {
                    task.submissionLinks.map(
                      (link,
                        index) => (

                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="block rounded-2xl bg-cyan-500/10 px-5 py-4 text-cyan-300 transition hover:bg-cyan-500/20"
                        >

                          {link.title}

                        </a>
                      )
                    )
                  }

                </div>

              </div>
            )}

            {/* ACTION */}
            {task.status ===
              "submitted" && (

              <button
                onClick={() =>
                  approveTask(
                    task._id
                  )
                }
                className="rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 font-bold"
              >

                Approve Task

              </button>
            )}

          </div>

        ))}

      </div>

    </div>
  );
};

export default Tasks;