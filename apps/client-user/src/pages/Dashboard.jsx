import {
  useEffect,
  useState,
} from "react";
import {
  CheckCircle2,
  ClipboardList,
  Clock3,
  FolderKanban,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

import API from "../services/api";
import {
  registrationStatusLabels,
} from "../constants/registration";
import {
  resendVerificationEmail,
} from "../services/authService";

const statusCopy = {
  pending_review:
    "Your profile is in the review queue. The team will match you to a project after reading your preferences and strengths.",
  shortlisted:
    "You are shortlisted. Keep an eye on your dashboard while the organizing team finalizes assignments.",
  waitlisted:
    "You are currently waitlisted. This usually happens when squads are being balanced or capacities are full.",
  assigned:
    "You have been assigned. Open your workspace and start building with your team.",
  rejected:
    "Your current registration is not moving forward right now. Reach out to the organizers if you want feedback.",
};

const statusTheme = {
  pending_review:
    "bg-yellow-500/10 text-yellow-200 ring-yellow-300/20",
  shortlisted:
    "bg-cyan-500/10 text-cyan-100 ring-cyan-300/20",
  waitlisted:
    "bg-orange-500/10 text-orange-100 ring-orange-300/20",
  assigned:
    "bg-emerald-500/10 text-emerald-100 ring-emerald-300/20",
  rejected:
    "bg-rose-500/10 text-rose-100 ring-rose-300/20",
};

const Dashboard = () => {
  const [dashboard, setDashboard] =
    useState(null);
  const [emailMessage, setEmailMessage] =
    useState("");
  const [emailPreview, setEmailPreview] =
    useState(null);
  const [resendingEmail, setResendingEmail] =
    useState(false);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response =
          await API.get("/dashboard");
        setDashboard(response.data);
      } catch (error) {
        console.error(
          error.response?.data ||
            error.message
        );
      }
    }

    fetchDashboard();
  }, []);

  const handleResendVerification =
    async () => {
      if (!dashboard?.user?.email) {
        return;
      }

      try {
        setResendingEmail(true);
        const response =
          await resendVerificationEmail(
            dashboard.user.email
          );
        setEmailMessage(
          response.message
        );
        setEmailPreview(
          response.preview || null
        );
      } catch (error) {
        setEmailMessage(
          error.response?.data
            ?.message ||
            "Unable to resend verification right now."
        );
      } finally {
        setResendingEmail(false);
      }
    };

  if (!dashboard) {
    return (
      <div className="min-h-screen bg-[#050816] p-10 text-white">
        Loading dashboard...
      </div>
    );
  }

  const registrationStatus =
    dashboard.user
      .registrationStatus ||
    "pending_review";

  return (
    <div className="min-h-screen bg-[#050816] px-4 py-10 text-white sm:px-6 lg:px-10">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">
          Participant Dashboard
        </p>
        <h1 className="mt-3 text-5xl font-black">
          Welcome back,
          {" "}
          <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
            {dashboard.user.name}
          </span>
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">
          Track your registration progress, review your assignment status, and step into your workspace when your team is ready.
        </p>
      </div>

      {!dashboard.user.emailVerified && (
        <div className="mb-8 rounded-[2rem] border border-amber-300/20 bg-amber-500/10 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-amber-100/80">
                Email verification
              </p>
              <h2 className="mt-2 text-2xl font-black text-amber-50">
                Verify your email to stay updated
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-amber-100/90">
                Your account works, but verifying your email helps organizers send assignment and recovery updates reliably.
              </p>
            </div>

            <button
              type="button"
              onClick={
                handleResendVerification
              }
              disabled={resendingEmail}
              className="rounded-2xl border border-amber-200/20 bg-amber-200/10 px-5 py-3 text-sm font-semibold text-amber-50 transition hover:border-amber-100/40 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {resendingEmail
                ? "Sending..."
                : "Resend verification email"}
            </button>
          </div>

          {emailMessage && (
            <p className="mt-4 text-sm text-amber-50">
              {emailMessage}
            </p>
          )}

          {emailPreview?.url && (
            <a
              href={emailPreview.url}
              className="mt-3 inline-flex text-sm text-cyan-200 underline"
            >
              Open preview verification link
            </a>
          )}
        </div>
      )}

      <div className="mb-12 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400">
              Registration status
            </p>
            <h2 className="mt-3 text-3xl font-black">
              {
                registrationStatusLabels[
                  registrationStatus
                ]
              }
            </h2>
            <p className="mt-4 max-w-3xl text-slate-300">
              {statusCopy[registrationStatus]}
            </p>
          </div>

          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ring-1 ${
              statusTheme[
                registrationStatus
              ]
            }`}
          >
            {
              registrationStatusLabels[
                registrationStatus
              ]
            }
          </span>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: Sparkles,
              label: "Preferred domains",
              value:
                dashboard.user
                  .preferredDomains
                  ?.join(", ") ||
                "Not set yet",
            },
            {
              icon: FolderKanban,
              label: "Assigned projects",
              value:
                String(
                  dashboard.analytics
                    .totalProjects
                ),
            },
            {
              icon: Clock3,
              label:
                "Pending tasks",
              value:
                String(
                  dashboard.analytics
                    .pendingTasks
                ),
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-3xl border border-white/10 bg-[#07101c] p-5"
              >
                <Icon
                  className="mb-4 text-cyan-300"
                  size={22}
                />
                <p className="text-sm text-slate-400">
                  {item.label}
                </p>
                <h3 className="mt-2 text-xl font-bold text-slate-100">
                  {item.value}
                </h3>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            icon: FolderKanban,
            label:
              "Joined Projects",
            value:
              dashboard.analytics
                .totalProjects,
            color: "text-cyan-300",
          },
          {
            icon: ClipboardList,
            label: "Total Tasks",
            value:
              dashboard.analytics
                .totalTasks,
            color:
              "text-fuchsia-300",
          },
          {
            icon: Clock3,
            label:
              "Pending Tasks",
            value:
              dashboard.analytics
                .pendingTasks,
            color:
              "text-yellow-300",
          },
          {
            icon: CheckCircle2,
            label:
              "Approved Tasks",
            value:
              dashboard.analytics
                .approvedTasks,
            color:
              "text-emerald-300",
          },
        ].map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <Icon
                className={`mb-4 ${card.color}`}
                size={28}
              />
              <h2 className="text-4xl font-black">
                {card.value}
              </h2>
              <p className="mt-2 text-slate-400">
                {card.label}
              </p>
            </div>
          );
        })}
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-3xl font-black">
              My Assignment
            </h2>
            <p className="mt-2 text-slate-400">
              When the organizers place you into a project, it will appear here.
            </p>
          </div>
          <Link
            to="/projects"
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-400/30 hover:text-cyan-200"
          >
            Browse showcase projects
          </Link>
        </div>

        {dashboard.memberships.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {dashboard.memberships.map(
              (member) => (
                <Link
                  to={`/workspace/${member.project?._id}`}
                  key={member._id}
                  className="rounded-3xl border border-white/10 bg-[#07101c] p-6 transition hover:border-cyan-400/30"
                >
                  <div className="flex items-start justify-between gap-4">
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
                    {member.isLeader && (
                      <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200">
                        Leader
                      </span>
                    )}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    {member.roles?.map(
                      (role) => (
                        <span
                          key={role}
                          className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-100"
                        >
                          {role.replaceAll(
                            "-",
                            " "
                          )}
                        </span>
                      )
                    )}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-400">
                    {member.team?.name && (
                      <span>
                        Team:
                        {" "}
                        <span className="text-slate-200">
                          {
                            member.team
                              .name
                          }
                        </span>
                      </span>
                    )}
                    <span>
                      Status:
                      {" "}
                      <span className="text-slate-200">
                        {
                          member.project
                            ?.status
                        }
                      </span>
                    </span>
                  </div>
                </Link>
              )
            )}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-white/10 bg-[#07101c] p-10 text-center">
            <h3 className="text-2xl font-bold">
              No project assignment yet
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-slate-400">
              That is normal at this stage. Your registration stays active while the organizing team studies strengths, preferences, and team balance.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
