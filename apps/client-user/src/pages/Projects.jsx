// src/pages/Projects.jsx

import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

import { motion }
from "framer-motion";

import {
  ArrowRight,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

const Projects = () => {

  const navigate =
    useNavigate();

  const [projects,
    setProjects] =
    useState([]);

  useEffect(() => {

    fetchProjects();

  }, []);

  const fetchProjects =
  async () => {

    try {

      const response =
        await API.get(
          "/projects"
        );

      setProjects(
        response.data
      );

    } catch (error) {

      console.log(
        error.response?.data
        || error.message
      );

    }
};


  return (
    <div className="min-h-screen bg-[#050816] px-4 py-16 text-white sm:px-6 lg:px-10">

      {/* HEADER */}
      <div className="mb-14">

        <div className="mb-4 inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">

          🚀 Explore SoC Projects

        </div>

        <h1 className="text-5xl font-black">

          Join Amazing

          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-500 bg-clip-text text-transparent">

            {" "}
            Projects

          </span>

        </h1>

      </div>

      {/* PROJECT GRID */}
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {projects.map(
          (project, index) => (

            <motion.div
              key={project._id}
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay:
                  index * 0.1,
              }}
              className="rounded-[32px] border border-white/10 bg-white/5 p-7"
            >

              <div className="mb-5 flex flex-wrap gap-3">

                <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">

                  {project.domain}

                </span>

                <span className="rounded-full bg-purple-500/10 px-4 py-2 text-sm text-purple-300">

                  {project.session}

                </span>

              </div>

              <h2 className="mb-4 text-3xl font-black">

                {project.title}

              </h2>

              <p className="mb-6 line-clamp-4 text-slate-400">

                {project.description}

              </p>

              <div className="mb-6 flex flex-wrap gap-3">

                {
                  project.techStack?.slice(
                    0,
                    3
                  ).map(
                    (tech) => (

                      <span
                        key={tech}
                        className="rounded-full bg-white/5 px-4 py-2 text-sm text-slate-300"
                      >

                        {tech}

                      </span>
                    )
                  )
                }

              </div>

              {/* STATUS */}
              <div className="mb-6">

                <span
                  className={`rounded-full px-4 py-2 text-sm ${
                    project.status === "active"
                      ? "bg-green-500/10 text-green-300"
                      : project.status === "completed"
                      ? "bg-blue-500/10 text-blue-300"
                      : project.status === "closed"
                      ? "bg-red-500/10 text-red-300"
                      : "bg-yellow-500/10 text-yellow-300"
                  }`}
                >

                  {project.status}

                </span>

              </div>

              {/* DETAILS BUTTON */}
              <button
                onClick={() =>
                  navigate(
                    `/projects/${project._id}`
                  )
                }
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-4 font-bold"
              >

                View Details

                <ArrowRight
                  size={18}
                />

              </button>

            </motion.div>
          )
        )}

      </div>

    </div>
  );
};

export default Projects;