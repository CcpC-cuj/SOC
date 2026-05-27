import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Filter,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  DOMAIN_OPTIONS,
} from "../constants/registration";
import API from "../services/api";

const Projects = () => {
  const navigate = useNavigate();

  const [projects, setProjects] =
    useState([]);
  const [selectedDomain, setSelectedDomain] =
    useState("All");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response =
          await API.get("/projects");
        setProjects(response.data);
      } catch (error) {
        console.error(
          error.response?.data ||
            error.message
        );
      }
    }

    fetchProjects();
  }, []);

  const filteredProjects = useMemo(
    () =>
      selectedDomain === "All"
        ? projects
        : projects.filter(
            (project) =>
              project.domain ===
              selectedDomain
          ),
    [projects, selectedDomain]
  );

  return (
    <div className="min-h-screen bg-[#050816] px-4 py-16 text-white sm:px-6 lg:px-10">
      <div className="mb-12 rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl lg:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200">
              Showcase Projects
            </div>
            <h1 className="mt-5 text-5xl font-black leading-tight">
              Explore the kind of work
              <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
                {" "}
                SoC participants build
              </span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              These projects are here to inspire interest and show the range of work inside the program. Registration does not lock you into one of these projects. The organizers review your profile and assign you later.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[#07101c] p-6">
            <div className="flex items-center gap-3">
              <Sparkles
                className="text-cyan-300"
                size={22}
              />
              <h2 className="text-xl font-bold">
                What these cards mean
              </h2>
            </div>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-300">
              <p>
                `Showcase` means a public-facing example meant to attract participants.
              </p>
              <p>
                `Assignment-ready` means the organizers can later use the project for real team allocation.
              </p>
              <p>
                Either way, members do not self-join. Project placement is handled by admins after review.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
          <Filter size={16} />
          Filter by domain
        </div>
        {["All", ...DOMAIN_OPTIONS].map(
          (domain) => (
            <button
              key={domain}
              type="button"
              onClick={() =>
                setSelectedDomain(domain)
              }
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                selectedDomain === domain
                  ? "bg-cyan-500/15 text-cyan-100 ring-1 ring-cyan-300/30"
                  : "bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              {domain}
            </button>
          )
        )}
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map(
          (project, index) => (
            <motion.div
              key={project._id}
              initial={{
                opacity: 0,
                y: 36,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.45,
                delay: index * 0.05,
              }}
              className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 transition hover:border-cyan-400/30 hover:bg-white/[0.06]"
            >
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
                    ? "Showcase"
                    : "Assignment-ready"}
                </span>
              </div>

              <h2 className="text-3xl font-black">
                {project.title}
              </h2>

              <p className="mt-4 line-clamp-4 text-slate-400">
                {project.description}
              </p>

              {project.highlights?.length >
                0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.highlights
                    .slice(0, 3)
                    .map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-white/5 px-3 py-2 text-xs text-slate-300"
                      >
                        {item}
                      </span>
                    ))}
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                {project.techStack
                  ?.slice(0, 4)
                  .map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-[#081121] px-4 py-2 text-sm text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
              </div>

              <div className="mt-8 flex items-center justify-between text-sm text-slate-400">
                <span>
                  Capacity:
                  {" "}
                  <span className="text-slate-100">
                    {
                      project.activeMembers
                    }
                    /
                    {
                      project.maxMembers
                    }
                  </span>
                </span>
                <span className="capitalize">
                  {project.status}
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/projects/${project._id}`
                  )
                }
                className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 px-6 py-4 font-bold transition group-hover:scale-[1.01]"
              >
                View details
                <ArrowRight size={18} />
              </button>
            </motion.div>
          )
        )}
      </div>
    </div>
  );
};

export default Projects;
