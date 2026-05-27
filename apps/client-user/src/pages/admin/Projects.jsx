import {
  useEffect,
  useState,
} from "react";
import {
  Link,
} from "react-router-dom";
import {
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";

import {
  DOMAIN_OPTIONS,
} from "../../constants/registration";
import AdminAPI from "../../services/adminApi";

const initialFormData = {
  title: "",
  description: "",
  session: "",
  season: "",
  domain: "",
  techStack: "",
  highlights: "",
  maxMembers: 10,
  status: "upcoming",
  isShowcase: true,
  acceptingAssignments: false,
};

const AdminProjects = () => {
  const [projects, setProjects] =
    useState([]);
  const [editingId, setEditingId] =
    useState(null);
  const [formData, setFormData] =
    useState(initialFormData);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response =
          await AdminAPI.get(
            "/projects"
          );
        setProjects(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProjects();
  }, []);

  const refreshProjects = async () => {
    const response =
      await AdminAPI.get("/projects");
    setProjects(response.data);
  };

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData((current) => ({
      ...current,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData(initialFormData);
  };

  const buildPayload = () => ({
    ...formData,
    maxMembers:
      Number(formData.maxMembers) ||
      10,
    techStack:
      formData.techStack
        .split(",")
        .map((item) =>
          item.trim()
        )
        .filter(Boolean),
    highlights:
      formData.highlights
        .split(",")
        .map((item) =>
          item.trim()
        )
        .filter(Boolean),
  });

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    try {
      if (editingId) {
        await AdminAPI.put(
          `/projects/${editingId}`,
          buildPayload()
        );
      } else {
        await AdminAPI.post(
          "/projects",
          buildPayload()
        );
      }

      resetForm();
      await refreshProjects();
    } catch (error) {
      console.error(
        error.response?.data ||
          error.message
      );
    }
  };

  const handleDelete = async (
    id
  ) => {
    try {
      await AdminAPI.delete(
        `/projects/${id}`
      );
      await refreshProjects();
    } catch (error) {
      console.error(error);
    }
  };

  const startEdit = (project) => {
    setEditingId(project._id);
    setFormData({
      title: project.title,
      description:
        project.description,
      session: project.session,
      season: project.season,
      domain: project.domain,
      techStack:
        project.techStack.join(", "),
      highlights:
        project.highlights.join(", "),
      maxMembers:
        project.maxMembers,
      status: project.status,
      isShowcase:
        project.isShowcase,
      acceptingAssignments:
        project.acceptingAssignments,
    });
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-5xl font-black">
          Project Management
        </h1>
        <p className="mt-3 text-slate-400">
          Create attractive showcase projects now, then add assignment-ready projects later when team allocation begins.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              name: "title",
              placeholder:
                "Project title",
            },
            {
              name: "session",
              placeholder:
                "Session (2026-27)",
            },
          ].map((field) => (
            <input
              key={field.name}
              type="text"
              name={field.name}
              placeholder={
                field.placeholder
              }
              value={
                formData[field.name]
              }
              onChange={handleChange}
              className="rounded-2xl border border-white/10 bg-[#07101c] px-5 py-4 outline-none"
            />
          ))}

          <select
            name="season"
            value={formData.season}
            onChange={handleChange}
            className="rounded-2xl border border-white/10 bg-[#07101c] px-5 py-4 outline-none"
          >
            <option value="">
              Select season
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
            className="rounded-2xl border border-white/10 bg-[#07101c] px-5 py-4 outline-none"
          >
            <option value="">
              Select domain
            </option>
            {DOMAIN_OPTIONS.map(
              (domain) => (
                <option
                  key={domain}
                  value={domain}
                >
                  {domain}
                </option>
              )
            )}
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="rounded-2xl border border-white/10 bg-[#07101c] px-5 py-4 outline-none"
          >
            {[
              "upcoming",
              "active",
              "completed",
              "closed",
            ].map((status) => (
              <option
                key={status}
                value={status}
              >
                {status}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="maxMembers"
            placeholder="Max members"
            value={formData.maxMembers}
            onChange={handleChange}
            className="rounded-2xl border border-white/10 bg-[#07101c] px-5 py-4 outline-none"
          />

          <input
            type="text"
            name="techStack"
            placeholder="Tech stack (comma separated)"
            value={formData.techStack}
            onChange={handleChange}
            className="rounded-2xl border border-white/10 bg-[#07101c] px-5 py-4 outline-none"
          />
        </div>

        <textarea
          name="description"
          placeholder="Project description"
          value={formData.description}
          onChange={handleChange}
          className="mt-6 h-32 w-full rounded-2xl border border-white/10 bg-[#07101c] px-5 py-4 outline-none"
        />

        <textarea
          name="highlights"
          placeholder="Highlights (comma separated)"
          value={formData.highlights}
          onChange={handleChange}
          className="mt-6 h-24 w-full rounded-2xl border border-white/10 bg-[#07101c] px-5 py-4 outline-none"
        />

        <div className="mt-6 flex flex-wrap gap-6">
          <label className="flex items-center gap-3 text-sm text-slate-200">
            <input
              type="checkbox"
              name="isShowcase"
              checked={formData.isShowcase}
              onChange={handleChange}
            />
            Mark as showcase project
          </label>
          <label className="flex items-center gap-3 text-sm text-slate-200">
            <input
              type="checkbox"
              name="acceptingAssignments"
              checked={
                formData.acceptingAssignments
              }
              onChange={handleChange}
            />
            Accept assignments
          </label>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          <button
            type="submit"
            className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 px-8 py-4 font-bold"
          >
            <Plus size={20} />
            {editingId
              ? "Update project"
              : "Create project"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-slate-100"
            >
              Cancel edit
            </button>
          )}
        </div>
      </form>

      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project._id}
            className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black">
                  {project.title}
                </h2>
                <p className="mt-2 text-sm text-cyan-300">
                  {project.session}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() =>
                    startEdit(project)
                  }
                  className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-300"
                >
                  <Pencil size={18} />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleDelete(
                      project._id
                    )
                  }
                  className="rounded-2xl bg-red-500/10 p-3 text-red-300"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <p className="mt-4 text-slate-400">
              {project.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-100">
                {project.domain}
              </span>
              <span className="rounded-full bg-white/5 px-4 py-2 text-sm text-slate-200">
                Capacity:
                {" "}
                {project.activeMembers}/
                {project.maxMembers}
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

            <div className="mt-5 flex flex-wrap gap-3">
              {project.techStack?.map(
                (tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-[#07101c] px-4 py-2 text-sm text-slate-300"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                to={`/admin/projects/${project._id}`}
                className="rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 px-6 py-3 font-bold"
              >
                Manage project
              </Link>
              <span className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-300">
                Assignments:
                {" "}
                {project.acceptingAssignments
                  ? "Open"
                  : "Closed"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProjects;
