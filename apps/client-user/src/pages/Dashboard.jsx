// src/pages/Dashboard.jsx

import { useEffect, useState }
from "react";

import API from "../services/api";

import {
  FolderKanban,
  ClipboardList,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

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

      const response =
        await API.get(
          "/dashboard"
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

                  <Link
                    to={`/workspace/${member.project?._id}`}
                    key={member._id}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-cyan-500/30 hover:bg-white/10"
                  >

                    {/* TOP */}
                    <div className="mb-5 flex items-start justify-between">

                      <div>

                        <h3 className="text-3xl font-black">

                          {
                            member.project
                              ?.title
                          }

                        </h3>

                        <p className="mt-3 text-slate-400">

                          {
                            member.project
                              ?.description
                          }

                        </p>

                      </div>

                      {
                        member.isLeader && (

                          <div className="rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-300">

                            Leader

                          </div>
                        )
                      }

                    </div>

                    {/* ROLES */}
                    <div className="mb-5 flex flex-wrap gap-3">

                      {
                        member.roles?.map(
                          (role) => (

                            <span
                              key={role}
                              className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300"
                            >

                              {role}

                            </span>
                          )
                        )
                      }

                    </div>

                    {/* STATUS */}
                    <div className="flex items-center justify-between">

                      <span className="rounded-full bg-purple-500/10 px-4 py-2 text-sm text-purple-300">

                        {
                          member.project
                            ?.status
                        }

                      </span>

                      <span className="text-sm text-slate-400">

                        Open Workspace →

                      </span>

                    </div>

                  </Link>
                )
              )
            }

          </div>
        </div>
    </div>
  );
};

export default Dashboard;