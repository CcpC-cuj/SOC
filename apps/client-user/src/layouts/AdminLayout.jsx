import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ClipboardList,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Menu,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";

import { clearAdminSession } from "../services/authStorage";
import Badge from "../components/ui/Badge";
import { buttonStyles } from "../components/ui/buttonStyles";

const navItems = [
  {
    name: "Dashboard",
    path: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Projects",
    path: "/admin-projects",
    icon: FolderKanban,
  },
  {
    name: "Participants",
    path: "/admin-users",
    icon: Users,
  },
  {
    name: "Tasks",
    path: "/admin-tasks",
    icon: ClipboardList,
  },
  {
    name: "Teams",
    path: "/admin-leaders",
    icon: ShieldCheck,
  },
];

const navLinkStyles = ({
  isActive,
}) =>
  `flex items-center gap-3 rounded-[0.95rem] px-4 py-3 text-sm font-medium transition-colors ${
    isActive
      ? "bg-[var(--soc-surface-cool)] text-[var(--soc-ink)]"
      : "text-[var(--soc-ink)]/68 hover:bg-[var(--soc-surface-cool)] hover:text-[var(--soc-ink)]"
  }`;

const AdminLayout = ({
  children,
}) => {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const closeMobile = () =>
    setMobileOpen(false);

  const logout = () => {
    clearAdminSession();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-[var(--soc-bg)] text-[var(--soc-ink)]">
      <div className="mx-auto flex w-full max-w-[96rem] gap-6 px-4 py-4 sm:px-6 lg:px-8 xl:px-10">
        <aside className="hidden w-[18rem] shrink-0 lg:block">
          <div className="sticky top-4 rounded-[1.4rem] border border-[var(--soc-border-soft)] bg-white px-5 py-5 shadow-[var(--soc-shadow-soft)]">
            <div className="border-b border-[var(--soc-border-soft)] pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-[0.95rem] border border-[var(--soc-border-soft)] bg-[var(--soc-surface-cool)] text-sm font-semibold tracking-[0.14em]">
                  SOC
                </div>
                <div>
                  <p className="text-base font-semibold tracking-[-0.02em]">
                    Admin Console
                  </p>
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--soc-ink)]/48">
                    Operations
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-[var(--soc-text-muted)]">
                Manage participants, projects, teams, and workflow reviews in
                one place.
              </p>
            </div>

            <nav className="mt-5 space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={navLinkStyles}
                  >
                    <Icon size={17} />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </nav>

            <div className="mt-5 border-t border-[var(--soc-border-soft)] pt-5">
              <button
                type="button"
                onClick={logout}
                className={buttonStyles({
                  variant: "secondary",
                  block: true,
                })}
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="rounded-[1.15rem] border border-[var(--soc-border-soft)] bg-white px-4 py-3 shadow-[var(--soc-shadow-soft)] lg:hidden">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Badge tone="accent">
                  Admin
                </Badge>
                <div>
                  <p className="text-sm font-semibold">
                    Operations Console
                  </p>
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--soc-ink)]/48">
                    Internal workflow
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setMobileOpen(true)
                }
                className="flex h-10 w-10 items-center justify-center rounded-[0.875rem] border border-[var(--soc-border-soft)] bg-[var(--soc-surface-cool)]"
              >
                <Menu size={18} />
              </button>
            </div>
          </div>

          {mobileOpen ? (
            <div className="fixed inset-0 z-[75] bg-[rgba(22,35,52,0.14)] p-4 backdrop-blur-sm lg:hidden">
              <div className="ml-auto flex h-full max-w-xs flex-col rounded-[1.25rem] border border-[var(--soc-border-soft)] bg-white p-5 shadow-[var(--soc-shadow-card)]">
                <div className="mb-5 flex items-start justify-between gap-4 border-b border-[var(--soc-border-soft)] pb-4">
                  <div>
                    <p className="text-base font-semibold">
                      Admin Navigation
                    </p>
                    <p className="mt-1 text-sm text-[var(--soc-text-muted)]">
                      Quick access to every operational area.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={closeMobile}
                    className="flex h-10 w-10 items-center justify-center rounded-[0.875rem] border border-[var(--soc-border-soft)] bg-[var(--soc-surface-cool)]"
                  >
                    <X size={18} />
                  </button>
                </div>

                <nav className="flex-1 space-y-1.5">
                  {navItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <NavLink
                        key={item.name}
                        to={item.path}
                        onClick={closeMobile}
                        className={navLinkStyles}
                      >
                        <Icon size={17} />
                        <span>{item.name}</span>
                      </NavLink>
                    );
                  })}
                </nav>

                <button
                  type="button"
                  onClick={logout}
                  className={buttonStyles({
                    variant: "secondary",
                    block: true,
                    className: "mt-4",
                  })}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          ) : null}

          <main className="pt-6 lg:pt-2">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
