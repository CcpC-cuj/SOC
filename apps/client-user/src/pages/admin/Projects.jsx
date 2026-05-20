import {
  useEffect,
  useState,
} from "react";

// import API from "../../services/api";

import AdminAPI
from "../../services/adminApi";

import {
  Plus,
  Trash2,
  Pencil
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

const Projects = () => {

  const [projects,
    setProjects] =
    useState([]);

  const [editingId,
    setEditingId] =
    useState(null);

const [formData,
  setFormData] =
  useState({
    title: "",
    description: "",
    session: "",
    season: "",
    domain: "",
    techStack: "",
    maxMembers: 10,
    status: "upcoming",
  });

  const [dashboard,
  setDashboard] =
  useState(null);

  useEffect(() => {

    fetchProjects();
    fetchDashboard();

  }, []);

  // FETCH PROJECTS
const fetchProjects =
  async () => {

    try {

      const response =
        await AdminAPI.get(
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

  // INPUT CHANGE
  const handleChange =
    (e) => {

      setFormData({
        ...formData,

        [e.target.name]:
          e.target.value,
      });
    };

  // CREATE PROJECT
const createProject =
  async (e) => {

    e.preventDefault();

    try {

      await AdminAPI.post(
        "/projects",
        {
          ...formData,

          techStack:
            formData.techStack
              .split(",")
              .map((t) =>
                t.trim()
              ),
        }
      );

      setFormData({
        title: "",
        description: "",
        session: "",
        season: "",
        domain: "",
        techStack: "",
        maxMembers: 10,
        status: "upcoming",
      });

      fetchProjects();

    } catch (error) {

      console.log(error);

      console.log(
        error.response?.data
        || error.message
      );

    }
};

  // UPDATE PROJECT
const updateProject =
  async (e) => {

    e.preventDefault();

    try {

      await AdminAPI.put(
        `/projects/${editingId}`,
        {
          ...formData,

          techStack:
            formData.techStack
              .split(",")
              .map((t) =>
                t.trim()
              ),
        }
      );

      setEditingId(null);

      setFormData({
        title: "",
        description: "",
        session: "",
        season: "",
        domain: "",
        techStack: "",
        maxMembers: 10,
        status: "upcoming",
      });

      fetchProjects();

    } catch (error) {

      console.log(
        error.response?.data
        || error.message
      );

    }
};

  // DELETE PROJECT
const deleteProject =
  async (id) => {

    try {

      await AdminAPI.delete(
        `/projects/${id}`
      );

      fetchProjects();

    } catch (error) {

      console.log(error);

    }
};


const fetchDashboard =
  async () => {

    try {

      const response =
        await AdminAPI.get(
          "/users/profile/dashboard"
        );

      setDashboard(
        response.data
      );

    } catch (error) {

      console.log(error);

    }
};

  return (
    <div>

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-5xl font-black">

          Project Management

        </h1>

        <p className="mt-3 text-slate-400">

          Create and manage SoC projects

        </p>

      </div>

      {/* CREATE FORM */}
      <form
        onSubmit={
          editingId
            ? updateProject
            : createProject
        }
        className="mb-12 rounded-3xl border border-white/10 bg-white/5 p-8"
      >

        <div className="grid gap-6 md:grid-cols-2">

          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-4 outline-none"
          />

          <input
            type="text"
            name="session"
            placeholder="Session (2026-27)"
            value={formData.session}
            onChange={handleChange}
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-4 outline-none"
          />

          <select
              name="season"
              value={formData.season}
              onChange={handleChange}
              className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-4 outline-none"
            >

              <option value="">
                Select Season
              </option>

              <option value="Summer">
                Summer
              </option>

              <option value="Winter">
                Winter
              </option>

            </select>

          <select
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-4 outline-none"
          >

            <option value="">
              Select Domain
            </option>

            <option value="Frontend">
              Frontend
            </option>

            <option value="Backend">
              Backend
            </option>

            <option value="AI/ML">
              AI/ML
            </option>

            <option value="UI/UX">
              UI/UX
            </option>

            <option value="Cyber Security">
              Cyber Security
            </option>

          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-4 outline-none"
          >

            <option value="upcoming">
              Upcoming
            </option>

            <option value="active">
              Active
            </option>

            <option value="completed">
              Completed
            </option>

            <option value="closed">
              Closed
            </option>

          </select>

          <input
            type="number"
            name="maxMembers"
            placeholder="Max Members"
            value={formData.maxMembers}
            onChange={handleChange}
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-4 outline-none"
          />

        </div>

        <textarea
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
          className="mt-6 h-36 w-full rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-4 outline-none"
        />

        <input
          type="text"
          name="techStack"
          placeholder="React, Node.js, MongoDB"
          value={formData.techStack}
          onChange={handleChange}
          className="mt-6 w-full rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-4 outline-none"
        />

        <button
          type="submit"
          className="mt-6 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 font-bold"
        >

          <Plus size={20} />

          {
            editingId
              ? "Update Project"
              : "Create Project"
          }

        </button>

      </form>

      {/* PROJECT LIST */}
      <div className="grid gap-6 lg:grid-cols-2">

        {projects.map(
          (project) => (

            <div
              key={project._id}
              className="rounded-3xl border border-white/10 bg-white/5 p-7"
            >

              <div className="mb-5 flex items-start justify-between">

                <div>

                  <h2 className="text-3xl font-black">

                    {project.title}

                  </h2>

                  <p className="mt-2 text-sm text-cyan-300">
                      Session:
                      {" "}

                      {project.session}
                  </p>

                  <p className="mt-3 text-slate-400">

                    {
                      project.description
                    }

                  </p>

                </div>

                <button
                  onClick={() =>
                    deleteProject(
                      project._id
                    )
                  }
                  className="rounded-2xl bg-red-500/10 p-3 text-red-300 transition hover:bg-red-500/20"
                >

                  <Trash2
                    size={20}
                  />

                </button>

                <button
                  onClick={() => {

                    setEditingId(
                      project._id
                    );

                    setFormData({
                      title:
                        project.title,

                      description:
                        project.description,

                      session:
                        project.session,

                      season:
                        project.season,

                      domain:
                        project.domain,
                      
                        status:
                        project.status,

                      techStack:
                        project.techStack.join(
                          ", "
                        ),

                      maxMembers:
                        project.maxMembers,
                    });
                  }}
                  className="mr-3 rounded-2xl bg-cyan-500/10 p-3 text-cyan-300 transition hover:bg-cyan-500/20"
                >

                  <Pencil size={20} />

                </button>

                <Link
                  to={`/admin/projects/${project._id}`}
                  className="mt-5 inline-block rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 font-bold"
                >

                  Manage Project

                </Link>

              </div>

              <div className="mb-5 flex flex-wrap gap-3">

                {
                  project.techStack?.map(
                    (tech) => (

                      <span
                        key={tech}
                        className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300"
                      >

                        {tech}

                      </span>
                    )
                  )
                }

              </div>

              <div className="flex flex-wrap gap-3">

                <span className="rounded-full bg-purple-500/10 px-4 py-2 text-sm text-purple-300">

                  {project.domain}

                </span>

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

            </div>
          )
        )}

      </div>

    </div>
  );
};

export default Projects;