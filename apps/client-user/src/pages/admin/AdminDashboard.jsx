// AdminDashboard.jsx

import {
  useEffect,
  useState,
} from "react";

// import API
// from "../../services/api";

import AdminAPI from "../../services/adminApi";

const Dashboard = () => {

  const [stats,
    setStats] =
    useState({
      totalProjects: 0,
      totalUsers: 0,
      totalTasks: 0,
      totalLeaders: 0,
    });

  useEffect(() => {

    fetchDashboard();

  }, []);

  // FETCH DASHBOARD
  const fetchDashboard =
    async () => {

      try {

        const response =
          await AdminAPI.get(
            "/dashboard/admin"
          );

        setStats({
          totalProjects:
            response.data
              .totalProjects || 0,

          totalUsers:
            response.data
              .totalUsers || 0,

          totalTasks:
            response.data
              .totalTasks || 0,

          totalLeaders:
            response.data
              .totalLeaders || 0,
        });

      } catch (error) {

        console.log(error);

      }
};

  return (

    <div>

      <h1 className="mb-10 text-5xl font-black">

        Admin Dashboard

      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {/* PROJECTS */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

          <h2 className="text-4xl font-black">

            {stats.totalProjects}

          </h2>

          <p className="mt-2 text-slate-400">

            Total Projects

          </p>

        </div>

        {/* USERS */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

          <h2 className="text-4xl font-black">

            {stats.totalUsers}

          </h2>

          <p className="mt-2 text-slate-400">

            Total Users

          </p>

        </div>

        {/* TASKS */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

          <h2 className="text-4xl font-black">

            {stats.totalTasks}

          </h2>

          <p className="mt-2 text-slate-400">

            Active Tasks

          </p>

        </div>

        {/* LEADERS */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

          <h2 className="text-4xl font-black">

            {stats.totalLeaders}

          </h2>

          <p className="mt-2 text-slate-400">

            Team Leaders

          </p>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;