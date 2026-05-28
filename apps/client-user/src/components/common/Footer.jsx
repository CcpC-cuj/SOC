import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "Platform",
    links: [
      {
        label: "Home",
        to: "/",
      },
      {
        label: "Showcase",
        to: "/projects",
      },
      {
        label: "Register",
        to: "/register",
      },
    ],
  },
  {
    title: "Journey",
    links: [
      {
        label: "Participant login",
        to: "/login",
      },
      {
        label: "Dashboard",
        to: "/dashboard",
      },
      {
        label: "Workspace",
        to: "/projects",
      },
    ],
  },
  {
    title: "Support",
    links: [
      {
        label: "Forgot password",
        to: "/forgot-password",
      },
      {
        label: "Verify email",
        to: "/verify-email",
      },
      {
        label: "Registration help",
        to: "/register",
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-[var(--soc-border-soft)] pb-10 pt-10">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--soc-ink)]/48">
              Season of Code
            </p>
            <h2 className="max-w-xl text-3xl font-semibold tracking-[-0.04em] text-[var(--soc-ink)] sm:text-4xl">
              A clearer platform for student applications, review, and team assignment.
            </h2>
          </div>

          <p className="max-w-2xl text-base leading-8 text-[var(--soc-text-muted)]">
            The product is designed to help participants apply with clarity
            and help organizers make stronger, more deliberate team
            decisions across projects.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1rem] border border-[var(--soc-border-soft)] bg-white px-4 py-4 shadow-[var(--soc-shadow-soft)]">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--soc-ink)]/48">
                Product principle
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--soc-text-muted)]">
                Review-first assignment, not random self-joining.
              </p>
            </div>

            <div className="rounded-[1rem] border border-[var(--soc-border-soft)] bg-white px-4 py-4 shadow-[var(--soc-shadow-soft)]">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--soc-ink)]/48">
                Audience
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--soc-text-muted)]">
                Students, organizers, and mentors working toward better-fit
                teams.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-3 lg:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--soc-ink)]/48">
                {column.title}
              </p>

              <div className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="group inline-flex items-center justify-between gap-3 text-sm text-[var(--soc-text-muted)] transition-colors hover:text-[var(--soc-ink)]"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3 border-t border-[var(--soc-border-soft)] pt-6 text-sm text-[var(--soc-ink)]/52 sm:flex-row sm:items-center sm:justify-between">
        <p>Season of Code 2026</p>
        <p>Designed for a calmer, more deliberate student-tech workflow.</p>
      </div>
    </footer>
  );
};

export default Footer;
