import { useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
} from "react-router-dom";
import {
  FolderKanban,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Shield,
  User,
  UserPlus,
  X,
} from "lucide-react";

import {
  clearAllSessions,
  clearAdminSession,
  getStoredAdmin,
  getStoredUser,
} from "../../services/authStorage";

const Navbar = () => {
  const location = useLocation();
  const [mobileMenu, setMobileMenu] =
    useState(false);

  const user =
    getStoredUser() ||
    getStoredAdmin();

  const isAdmin =
    user?.authority === "admin";

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Showcase",
      path: "/projects",
      icon: FolderKanban,
    },
    ...(user && !isAdmin
      ? [
          {
            name: "Dashboard",
            path: "/dashboard",
            icon:
              LayoutDashboard,
          },
          {
            name: "Profile",
            path: "/profile",
            icon: User,
          },
        ]
      : []),
    ...(isAdmin
      ? [
          {
            name: "Admin",
            path: "/admin-dashboard",
            icon:
              LayoutDashboard,
          },
        ]
      : []),
  ];

  const handleLogout = () => {
    if (isAdmin) {
      clearAdminSession();
    } else {
      clearAllSessions();
    }

    setMobileMenu(false);
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-xl font-black shadow-lg shadow-cyan-500/20">
            S
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-wide">
              <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
                SoC
              </span>
            </h1>
            <p className="-mt-1 text-xs text-slate-400">
              Seasons of Code
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navLinks.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({
                  isActive,
                }) =>
                  `flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-cyan-500/10 text-cyan-300"
                      : "text-slate-300 hover:bg-white/5 hover:text-cyan-200"
                  }`
                }
              >
                {Icon && <Icon size={18} />}
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              {isAdmin && (
                <div className="hidden items-center gap-2 rounded-2xl border border-fuchsia-500/20 bg-fuchsia-500/10 px-4 py-2 text-sm font-semibold text-fuchsia-200 md:flex">
                  <Shield size={16} />
                  Admin
                </div>
              )}

              <button
                type="button"
                onClick={handleLogout}
                className="hidden items-center gap-2 rounded-2xl border border-white/10 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-200 md:flex"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden items-center gap-2 rounded-2xl border border-white/10 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-200 md:flex"
              >
                <LogIn size={18} />
                Login
              </Link>

              <Link
                to="/register"
                className="hidden items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 px-5 py-3 text-sm font-bold text-white md:flex"
              >
                <UserPlus size={18} />
                Register
              </Link>
            </>
          )}

          <button
            type="button"
            onClick={() =>
              setMobileMenu(
                !mobileMenu
              )
            }
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 lg:hidden"
          >
            {mobileMenu ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>
        </div>
      </div>

      {mobileMenu && (
        <div className="border-t border-white/10 bg-[#050816]/95 backdrop-blur-xl lg:hidden">
          <div className="px-4 py-6 sm:px-6 md:px-8">
            <div className="flex flex-col gap-3">
              {navLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() =>
                      setMobileMenu(
                        false
                      )
                    }
                    className={({
                      isActive,
                    }) =>
                      `flex items-center gap-3 rounded-2xl px-4 py-3 transition-all ${
                        isActive
                          ? "bg-cyan-500/10 text-cyan-300"
                          : "text-slate-300 hover:bg-white/5"
                      }`
                    }
                  >
                    {Icon && <Icon size={20} />}
                    {item.name}
                  </NavLink>
                );
              })}

              {user ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-4 py-3 text-slate-200"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() =>
                      setMobileMenu(
                        false
                      )
                    }
                    className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-4 py-3 text-slate-300"
                  >
                    <LogIn size={18} />
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={() =>
                      setMobileMenu(
                        false
                      )
                    }
                    className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 px-4 py-3 font-bold text-white"
                  >
                    <UserPlus size={18} />
                    Register
                  </Link>
                </>
              )}

              {location.pathname !==
                "/projects" && (
                <Link
                  to="/projects"
                  onClick={() =>
                    setMobileMenu(
                      false
                    )
                  }
                  className="rounded-2xl bg-white/5 px-4 py-3 text-center text-sm text-slate-300"
                >
                  See showcase projects
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
