import {
  useEffect,
  useState,
} from "react";
import {
  ArrowRight,
  CalendarDays,
  Layers3,
  Sparkles,
  Users,
} from "lucide-react";
import {
  Link,
  useParams,
} from "react-router-dom";

import API from "../services/api";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] =
    useState(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        const response =
          await API.get(
            `/projects/${id}`
          );
        setProject(response.data);
      } catch (error) {
        console.error(
          error.response?.data ||
            error.message
        );
      }
    }

    fetchProject();
  }, [id]);

  if (!project) {
    return (
      <div className="p-10 text-white">
        Loading project...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] px-4 py-14 text-white sm:px-6 lg:px-10">
      <div className="mb-10 rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl lg:p-10">
        <div className="mb-5 flex flex-wrap gap-3">
          <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-100">
            {project.domain}
          </span>
          <span className="rounded-full bg-fuchsia-500/10 px-4 py-2 text-sm text-fuchsia-100">
            {project.session}
          </span>
          <span
            className={`rounded-full px-4 py-2 text-sm ${
              project.isShowcase
                ? "bg-yellow-500/10 text-yellow-100"
                : "bg-emerald-500/10 text-emerald-100"
            }`}
          >
            {project.isShowcase
              ? "Showcase Project"
              : "Assignment-ready Project"}
          </span>
        </div>

        <h1 className="text-5xl font-black leading-tight">
          {project.title}
        </h1>

        <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300">
          {project.description}
        </p>
      </div>

      <div className="mb-10 grid gap-6 md:grid-cols-3">
        {[
          {
            icon: Users,
            label:
              "Projected squad size",
            value: `${project.activeMembers}/${project.maxMembers}`,
            text:
              "This shows the current occupancy against intended capacity.",
          },
          {
            icon: Layers3,
            label: "Project mode",
            value: project.isShowcase
              ? "Public preview"
              : "Internal build track",
            text:
              "Participants do not join directly. Admins assign members after review.",
          },
          {
            icon: CalendarDays,
            label: "Season",
            value:
              project.season ||
              "To be announced",
            text:
              "Use this as a sense of timing rather than a guarantee of direct enrollment.",
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <Icon
                className="mb-4 text-cyan-300"
                size={26}
              />
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                {item.label}
              </p>
              <h2 className="mt-3 text-2xl font-black">
                {item.value}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
          <h2 className="text-3xl font-black">
            Tech stack and signals
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {project.techStack?.map(
              (tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-[#081121] px-4 py-3 text-sm text-slate-200"
                >
                  {tech}
                </span>
              )
            )}
          </div>

          {project.highlights?.length >
            0 && (
            <>
              <h3 className="mt-8 text-xl font-bold">
                Why this track feels exciting
              </h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {project.highlights.map(
                  (highlight) => (
                    <div
                      key={highlight}
                      className="rounded-2xl border border-white/10 bg-[#07101c] p-4 text-sm leading-6 text-slate-300"
                    >
                      {highlight}
                    </div>
                  )
                )}
              </div>
            </>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-cyan-500/20 bg-cyan-500/[0.08] p-8">
            <div className="flex items-center gap-3">
              <Sparkles
                className="text-cyan-300"
                size={22}
              />
              <h2 className="text-2xl font-black text-cyan-100">
                How selection works here
              </h2>
            </div>
            <div className="mt-6 space-y-4 text-sm leading-7 text-slate-200">
              <p>
                1. You register once with your real skills, interests, and availability.
              </p>
              <p>
                2. The organizers review all registrations and balance teams fairly.
              </p>
              <p>
                3. Final project and team assignment appears later in your dashboard.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
            <h2 className="text-2xl font-black">
              Interested in work like this?
            </h2>
            <p className="mt-4 text-slate-400">
              Register with honest preferences and the organizing team will match you to the right track later.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 px-6 py-4 font-bold"
              >
                Register now
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/projects"
                className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-slate-100 transition hover:border-cyan-400/30"
              >
                Back to showcase
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
