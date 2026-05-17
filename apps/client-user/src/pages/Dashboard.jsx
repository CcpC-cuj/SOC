// src/pages/Dashboard.jsx

import { useEffect, useState }
from "react";

import axios from "axios";

import {
  FolderKanban,
  ClipboardList,
  CheckCircle2,
  Clock3,
} from "lucide-react";

const Dashboard = () => {

  const [dashboard,
    setDashboard] =
    useState(null);

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.get(
            "http://localhost:5000/api/dashboard",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setDashboard(
          response.data
        );

      } catch (error) {

        console.log(
      error.response?.data
      || error.message
    );

      }
    };

  if (!dashboard) {
    return (
      <div className="p-10 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] px-4 py-10 text-white sm:px-6 lg:px-10">

      {/* HEADER */}
      <div className="mb-12">

        <h1 className="text-5xl font-black">

          Welcome,
          {" "}

          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-500 bg-clip-text text-transparent">

            {
              dashboard.user.name
            }

          </span>

        </h1>

        <p className="mt-4 text-slate-400">

          Track your projects,
          tasks, and activity.

        </p>

      </div>

      {/* ANALYTICS */}
      <div className="mb-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

          <FolderKanban
            className="mb-4 text-cyan-400"
            size={28}
          />

          <h2 className="text-4xl font-black">

            {
              dashboard.analytics
                .totalProjects
            }

          </h2>

          <p className="mt-2 text-slate-400">
            Joined Projects
          </p>

        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

          <ClipboardList
            className="mb-4 text-purple-400"
            size={28}
          />

          <h2 className="text-4xl font-black">

            {
              dashboard.analytics
                .totalTasks
            }

          </h2>

          <p className="mt-2 text-slate-400">
            Total Tasks
          </p>

        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

          <Clock3
            className="mb-4 text-yellow-400"
            size={28}
          />

          <h2 className="text-4xl font-black">

            {
              dashboard.analytics
                .pendingTasks
            }

          </h2>

          <p className="mt-2 text-slate-400">
            Pending Tasks
          </p>

        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

          <CheckCircle2
            className="mb-4 text-green-400"
            size={28}
          />

          <h2 className="text-4xl font-black">

            {
              dashboard.analytics
                .approvedTasks
            }

          </h2>

          <p className="mt-2 text-slate-400">
            Approved Tasks
          </p>

        </div>

      </div>

      {/* PROJECTS */}
      <div className="mb-12">

        <h2 className="mb-6 text-3xl font-black">
          My Projects
        </h2>

        <div className="grid gap-6 lg:grid-cols-2">

          {
            dashboard.memberships.map(
              (member) => (

                <div
                  key={member._id}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6"
                >

                  <h3 className="mb-3 text-2xl font-bold">

                    {
                      member.project
                        ?.title
                    }

                  </h3>

                  <p className="mb-4 text-slate-400">

                    Role:
                    {" "}

                    {
                      member.role
                    }

                  </p>

                  <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">

                    {
                      member.status
                    }

                  </span>

                </div>
              )
            )
          }

        </div>

      </div>

      {/* TASKS */}
      <div>

        <h2 className="mb-6 text-3xl font-black">
          Recent Tasks
        </h2>

        <div className="space-y-5">

          {
            dashboard.tasks.map(
              (task) => (

                <div
                  key={task._id}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6"
                >

                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    <div>

                      <h3 className="text-xl font-bold">

                        {
                          task.title
                        }

                      </h3>

                      <p className="mt-2 text-slate-400">

                        {
                          task.description
                        }

                      </p>

                    </div>

                    <div className="flex flex-wrap gap-3">

                      <span className="rounded-full bg-purple-500/10 px-4 py-2 text-sm text-purple-300">

                        {
                          task.project
                            ?.title
                        }

                      </span>

                      <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">

                        {
                          task.status
                        }

                      </span>

                    </div>

                  </div>

                </div>
              )
            )
          }

        </div>

      </div>

    </div>
  );
};

export default Dashboard;