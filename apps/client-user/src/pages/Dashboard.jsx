// Dashboard.jsx

import { useEffect } from "react";

import { useNavigate }
from "react-router-dom";

import DashboardSidebar
from "../components/dashboard/DashboardSidebar";

import DashboardTopbar
from "../components/dashboard/DashboardTopbar";

import WelcomeBanner
from "../components/dashboard/WelcomeBanner";

import StatsCards
from "../components/dashboard/StatsCards";

import JoinedProjects
from "../components/dashboard/JoinedProjects";

import ActiveTasks
from "../components/dashboard/ActiveTasks";

import TeamSection
from "../components/dashboard/TeamSection";

import UpcomingDeadlines
from "../components/dashboard/UpcomingDeadlines";

import ActivityTimeline
from "../components/dashboard/ActivityTimeline";

import Neural from "../components/common/NeuralBackground";

const Dashboard = () => {

  const navigate =
    useNavigate();

  useEffect(() => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (!token) {

      navigate("/login");

    }

  }, []);

  return (
    <div className="flex min-h-screen bg-[#050816] text-white">
        <Neural />

      {/* SIDEBAR */}
      <DashboardSidebar />

      {/* MAIN */}
      <div className="flex-1 overflow-hidden">

        {/* TOPBAR */}
        <DashboardTopbar />

        {/* CONTENT */}
        <main className="space-y-8 p-6 lg:p-10">

          {/* WELCOME */}
          <WelcomeBanner />

          {/* STATS */}
          <StatsCards />

          {/* PROJECTS + TASKS */}
          <div className="grid gap-8 xl:grid-cols-2">

            <JoinedProjects />

            <ActiveTasks />

          </div>

          {/* TEAMS + DEADLINES */}
          <div className="grid gap-8 xl:grid-cols-2">

            <TeamSection />

            <UpcomingDeadlines />

          </div>

          {/* ACTIVITY */}
          <ActivityTimeline />

        </main>

      </div>

    </div>
  );
};

export default Dashboard;