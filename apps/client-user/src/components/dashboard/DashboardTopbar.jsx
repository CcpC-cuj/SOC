// DashboardTopbar.jsx

import {
  Bell,
  Search,
} from "lucide-react";

const DashboardTopbar = () => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <header className="flex h-24 items-center justify-between border-b border-white/10 bg-white/[0.03] px-6 backdrop-blur-xl lg:px-10">

      {/* SEARCH */}
      <div className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 md:flex">

        <Search
          size={18}
          className="text-slate-400"
        />

        <input
          type="text"
          placeholder="Search projects, teams..."
          className="bg-transparent outline-none placeholder:text-slate-500"
        />

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">

        <button className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-3">

          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-cyan-400" />

        </button>

        <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 font-bold">
            {user?.name?.charAt(0)}
          </div>

          <div>

            <h3 className="font-semibold">
              {user?.name}
            </h3>

            <p className="text-sm text-cyan-400 capitalize">
              {user?.role}
            </p>

          </div>

        </div>

      </div>

    </header>
  );
};

export default DashboardTopbar;