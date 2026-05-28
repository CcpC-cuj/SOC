import { useState } from "react";
import {
  Link,
  NavLink,
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
import Badge from "../ui/Badge";
import { buttonStyles } from "../ui/buttonStyles";

const brandMarkStyles =
  "flex h-11 w-11 items-center justify-center rounded-[0.95rem] border border-[var(--soc-border-soft)] bg-white text-sm font-semibold tracking-[0.14em] text-[var(--soc-ink)] shadow-[var(--soc-shadow-soft)]";

const linkBaseStyles =
  "flex items-center gap-2 rounded-[0.875rem] px-3.5 py-2.5 text-sm font-medium transition-colors";

const Navbar = () => {
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

  const closeMobileMenu = () =>
    setMobileMenu(false);

  const handleLogout = () => {
    if (isAdmin) {
      clearAdminSession();
    } else {
      clearAllSessions();
    }

    closeMobileMenu();
    window.location.href = "/";
  };

  return (
    <header className="sticky top-4 z-50">
      <div className="rounded-[1.2rem] border border-[var(--soc-border-soft)] bg-white/88 px-4 py-3 shadow-[var(--soc-shadow-soft)] backdrop-blur-md sm:px-5 lg:px-6">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex min-w-0 items-center gap-3"
          >
            <div className={brandMarkStyles}>
              SOC
            </div>

            <div className="min-w-0">
              <p className="truncate text-base font-semibold tracking-[-0.02em] text-[var(--soc-ink)]">
                Season of Code
              </p>
              <p className="truncate text-xs uppercase tracking-[0.14em] text-[var(--soc-ink)]/52">
                Student Builders Platform
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({
                    isActive,
                  }) =>
                    `${linkBaseStyles} ${
                      isActive
                        ? "bg-[var(--soc-surface-cool)] text-[var(--soc-ink)]"
                        : "text-[var(--soc-ink)]/68 hover:bg-[var(--soc-surface-cool)] hover:text-[var(--soc-ink)]"
                    }`
                  }
                >
                  {Icon ? (
                    <Icon size={16} />
                  ) : null}
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <>
                {isAdmin ? (
                  <Badge
                    tone="accent"
                    className="hidden md:inline-flex"
                  >
                    <Shield size={14} />
                    Admin
                  </Badge>
                ) : null}

                <button
                  type="button"
                  onClick={handleLogout}
                  className={buttonStyles({
                    variant: "secondary",
                    size: "sm",
                    className:
                      "hidden md:inline-flex",
                  })}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={buttonStyles({
                    variant: "ghost",
                    size: "sm",
                    className:
                      "hidden md:inline-flex",
                  })}
                >
                  <LogIn size={16} />
                  Login
                </Link>

                <Link
                  to="/register"
                  className={buttonStyles({
                    size: "sm",
                    className:
                      "hidden md:inline-flex",
                  })}
                >
                  <UserPlus size={16} />
                  Register
                </Link>
              </>
            )}

            <button
              type="button"
              onClick={() =>
                setMobileMenu(
                  (current) => !current
                )
              }
              className="flex h-10 w-10 items-center justify-center rounded-[0.875rem] border border-[var(--soc-border-soft)] bg-white text-[var(--soc-ink)] shadow-[var(--soc-shadow-soft)] lg:hidden"
            >
              {mobileMenu ? (
                <X size={18} />
              ) : (
                <Menu size={18} />
              )}
            </button>
          </div>
        </div>

        {mobileMenu ? (
          <div className="mt-4 border-t border-[var(--soc-border-soft)] pt-4 lg:hidden">
            <div className="flex flex-col gap-2">
              {navLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={({
                      isActive,
                    }) =>
                      `${linkBaseStyles} ${
                        isActive
                          ? "bg-[var(--soc-surface-cool)] text-[var(--soc-ink)]"
                          : "text-[var(--soc-ink)]/72 hover:bg-[var(--soc-surface-cool)] hover:text-[var(--soc-ink)]"
                      }`
                    }
                  >
                    {Icon ? (
                      <Icon size={16} />
                    ) : null}
                    {item.name}
                  </NavLink>
                );
              })}

              <div className="mt-2 flex flex-col gap-2 border-t border-[var(--soc-border-soft)] pt-4">
                {user ? (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className={buttonStyles({
                      variant: "secondary",
                      block: true,
                    })}
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={closeMobileMenu}
                      className={buttonStyles({
                        variant: "ghost",
                        block: true,
                      })}
                    >
                      <LogIn size={16} />
                      Login
                    </Link>

                    <Link
                      to="/register"
                      onClick={closeMobileMenu}
                      className={buttonStyles({
                        block: true,
                      })}
                    >
                      <UserPlus size={16} />
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Navbar;
