// client-admin/src/layouts/AdminLayout.jsx

import {
  NavLink,
} from "react-router-dom";

import {
  LayoutDashboard,
  FolderKanban,
  Users,
  ClipboardList,
  ShieldCheck,
  LogOut,
} from "lucide-react";


const navItems = [
  {
    name: "Dashboard",
    path:
      "/admin-dashboard",
    icon:
      LayoutDashboard,
  },

  {
    name: "Projects",
    path:
      "/admin-projects",
    icon:
      FolderKanban,
  },

  {
    name: "Users",
    path:
      "/admin-users",
    icon:
      Users,
  },

  {
    name: "Tasks",
    path:
      "/admin-tasks",
    icon:
      ClipboardList,
  },

  {
    name: "Leaders",
    path:
      "/admin-leaders",
    icon:
      ShieldCheck,
  },
];

const AdminLayout = ({
  children,
}) => {

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    window.location.href =
      "http://localhost:5173/login";
  };

  return (
    <div className="flex min-h-screen bg-[#050816] text-white">

      {/* SIDEBAR */}
      <aside className="hidden w-[280px] border-r border-white/10 bg-white/5 backdrop-blur-xl lg:flex lg:flex-col">

        {/* LOGO */}
        <div className="border-b border-white/10 p-8">

          <h1 className="text-4xl font-black">

            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-500 bg-clip-text text-transparent">

              SoC

            </span>

          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Admin Panel
          </p>

        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 space-y-2 p-5">

          {navItems.map(
            (item) => {

              const Icon =
                item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({
                    isActive,
                  }) =>
                    `flex items-center gap-4 rounded-2xl px-5 py-4 transition ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`
                  }
                >

                  <Icon size={22} />

                  <span className="font-medium">

                    {item.name}

                  </span>

                </NavLink>
              );
            }
          )}

        </nav>

        {/* LOGOUT */}
        <div className="border-t border-white/10 p-5">

          <button
            onClick={logout}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-red-500/10 px-5 py-4 text-red-300 transition hover:bg-red-500/20"
          >

            <LogOut size={20} />

            Logout

          </button>

        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10">

        {children}

      </main>

    </div>
  );
};

export default AdminLayout;