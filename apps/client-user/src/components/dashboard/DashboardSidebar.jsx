// DashboardSidebar.jsx

import {
  LayoutDashboard,
  FolderKanban,
  Users,
  ClipboardList,
  Trophy,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    icon: FolderKanban,
  },
  {
    title: "Teams",
    icon: Users,
  },
  {
    title: "Tasks",
    icon: ClipboardList,
  },
  {
    title: "Leaderboard",
    icon: Trophy,
  },
  {
    title: "Profile",
    icon: User,
  },
  {
    title: "Settings",
    icon: Settings,
  },
];

const DashboardSidebar = () => {
  return (
    <aside className="hidden w-72 border-r border-white/10 bg-white/[0.03] backdrop-blur-xl lg:block">

      <div className="flex h-24 items-center border-b border-white/10 px-8">

        <h1 className="text-3xl font-black">
          SoC
        </h1>

      </div>

      <div className="space-y-3 p-5">

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (
            <button
              key={item.title}
              className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-slate-300 transition hover:bg-cyan-500/10 hover:text-cyan-300"
            >

              <Icon size={22} />

              <span className="font-medium">
                {item.title}
              </span>

            </button>
          );
        })}

      </div>

      <div className="absolute bottom-6 left-0 w-full px-5">

        <button className="flex w-full items-center justify-center gap-3 rounded-2xl bg-red-500/20 px-5 py-4 text-red-300 transition hover:bg-red-500/30">

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </aside>
  );
};

export default DashboardSidebar;