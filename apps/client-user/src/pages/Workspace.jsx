import {
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";

import API from "../services/api";
import {
  getStoredUser,
} from "../services/authStorage";

const initialTaskForm = {
  title: "",
  description: "",
  assignedTo: "",
  taskType: "feature",
  deadline: "",
};

const initialSubmission = {
  githubRepo: "",
  deploymentLink: "",
  pptLink: "",
  demoVideo: "",
  documentation: "",
};

const Workspace = () => {
  const { id } = useParams();

  const [project, setProject] =
    useState(null);
  const [members, setMembers] =
    useState([]);
  const [tasks, setTasks] =
    useState([]);
  const [submission, setSubmission] =
    useState(initialSubmission);
  const [taskForm, setTaskForm] =
    useState(initialTaskForm);
  const [taskLinks, setTaskLinks] =
    useState({});

  useEffect(() => {
    async function fetchWorkspace() {
      try {
        const [
          projectResponse,
          membersResponse,
          tasksResponse,
          submissionResponse,
        ] = await Promise.all([
          API.get(`/projects/${id}`),
          API.get(
            `/project-members/${id}`
          ),
          API.get(
            `/tasks/project/${id}`
          ),
          API.get(
            `/project-submissions/${id}`
          ),
        ]);

        setProject(projectResponse.data);
        setMembers(membersResponse.data);
        setTasks(tasksResponse.data);

        if (submissionResponse.data) {
          setSubmission({
            githubRepo:
              submissionResponse.data
                .githubRepo || "",
            deploymentLink:
              submissionResponse.data
                .deploymentLink || "",
            pptLink:
              submissionResponse.data
                .pptLink || "",
            demoVideo:
              submissionResponse.data
                .demoVideo || "",
            documentation:
              submissionResponse.data
                .documentation || "",
          });
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchWorkspace();
  }, [id]);

  const user = getStoredUser();
  const currentMembership =
    members.find(
      (member) =>
        member.user?._id ===
        user?._id
    );
  const isLeader =
    Boolean(
      currentMembership?.isLeader
    );
  const isCompleted =
    project?.status === "completed";

  const refreshTasks = async () => {
    const response =
      await API.get(
        `/tasks/project/${id}`
      );
    setTasks(response.data);
  };

  const handleTaskCreate = async (
    event
  ) => {
    event.preventDefault();

    try {
      await API.post("/tasks", {
        ...taskForm,
        projectId: id,
      });
      setTaskForm(initialTaskForm);
      await refreshTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const updateTaskStatus = async (
    taskId,
    status
  ) => {
    try {
      await API.put(
        `/tasks/${taskId}/status`,
        {
          status,
          submissionLink:
            taskLinks[taskId] || "",
        }
      );
      await refreshTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const submitProject = async (
    event
  ) => {
    event.preventDefault();

    try {
      await API.post(
        "/project-submissions",
        {
          projectId: id,
          ...submission,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] p-6 text-white">
      {isCompleted && (
        <div className="mb-10 rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-6">
          <h2 className="text-3xl font-black text-emerald-200">
            Project Completed
          </h2>
          <p className="mt-3 text-slate-300">
            This workspace is now read-only. Tasks and submissions are locked.
          </p>
        </div>
      )}

      {project && (
        <div className="mb-12">
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-100">
              {project.domain}
            </span>
            {currentMembership?.team?.name && (
              <span className="rounded-full bg-fuchsia-500/10 px-4 py-2 text-sm text-fuchsia-100">
                Team:
                {" "}
                {currentMembership.team.name}
              </span>
            )}
          </div>

          <h1 className="mt-5 text-5xl font-black">
            {project.title}
          </h1>
          <p className="mt-4 max-w-4xl text-slate-400">
            {project.description}
          </p>
        </div>
      )}

      <div className="mb-12">
        <h2 className="mb-6 text-3xl font-black">
          Team Members
        </h2>

        <div className="grid gap-5 lg:grid-cols-2">
          {members.map((member) => (
            <div
              key={member._id}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold">
                    {member.user?.name}
                  </h3>
                  <p className="mt-2 text-slate-400">
                    {member.user?.email}
                  </p>
                  {member.team?.name && (
                    <p className="mt-2 text-sm text-fuchsia-100">
                      {member.team.name}
                    </p>
                  )}
                </div>
                {member.isLeader && (
                  <div className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm text-emerald-100">
                    Leader
                  </div>
                )}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {member.roles?.map((role) => (
                  <span
                    key={role}
                    className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-100"
                  >
                    {role.replaceAll(
                      "-",
                      " "
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {isLeader && !isCompleted && (
        <form
          onSubmit={handleTaskCreate}
          className="mb-12 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8"
        >
          <h2 className="text-3xl font-black">
            Create Task
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <input
              type="text"
              value={taskForm.title}
              onChange={(event) =>
                setTaskForm((current) => ({
                  ...current,
                  title:
                    event.target.value,
                }))
              }
              placeholder="Task title"
              className="rounded-2xl border border-white/10 bg-[#07101c] px-5 py-4 outline-none"
            />
            <select
              value={taskForm.assignedTo}
              onChange={(event) =>
                setTaskForm((current) => ({
                  ...current,
                  assignedTo:
                    event.target.value,
                }))
              }
              className="rounded-2xl border border-white/10 bg-[#07101c] px-5 py-4 outline-none"
            >
              <option value="">
                Assign to member
              </option>
              {members.map((member) => (
                <option
                  key={member._id}
                  value={member.user?._id}
                >
                  {member.user?.name}
                </option>
              ))}
            </select>
            <select
              value={taskForm.taskType}
              onChange={(event) =>
                setTaskForm((current) => ({
                  ...current,
                  taskType:
                    event.target.value,
                }))
              }
              className="rounded-2xl border border-white/10 bg-[#07101c] px-5 py-4 outline-none"
            >
              {[
                "feature",
                "bug-fix",
                "research",
                "design",
                "documentation",
                "testing",
              ].map((type) => (
                <option
                  key={type}
                  value={type}
                >
                  {type}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={taskForm.deadline}
              onChange={(event) =>
                setTaskForm((current) => ({
                  ...current,
                  deadline:
                    event.target.value,
                }))
              }
              className="rounded-2xl border border-white/10 bg-[#07101c] px-5 py-4 outline-none"
            />
          </div>
          <textarea
            value={taskForm.description}
            onChange={(event) =>
              setTaskForm((current) => ({
                ...current,
                description:
                  event.target.value,
              }))
            }
            placeholder="Task description"
            className="mt-6 h-32 w-full rounded-2xl border border-white/10 bg-[#07101c] px-5 py-4 outline-none"
          />
          <button
            type="submit"
            className="mt-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 px-8 py-4 font-bold"
          >
            Create task
          </button>
        </form>
      )}

      <div className="mb-12">
        <h2 className="mb-6 text-3xl font-black">
          Tasks
        </h2>
        <div className="space-y-5">
          {tasks.map((task) => {
            const canUpdate =
              task.assignedTo?._id ===
                user?._id || isLeader;

            return (
              <div
                key={task._id}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">
                      {task.title}
                    </h3>
                    <p className="mt-3 text-slate-400">
                      {task.description}
                    </p>
                    <p className="mt-3 text-sm text-cyan-100">
                      Assigned to:
                      {" "}
                      {task.assignedTo?.name}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-100">
                      {task.status}
                    </span>
                    <span className="rounded-full bg-fuchsia-500/10 px-4 py-2 text-sm text-fuchsia-100">
                      {task.taskType}
                    </span>
                  </div>
                </div>

                {canUpdate && !isCompleted && (
                  <div className="mt-5 grid gap-4 md:grid-cols-[1fr_auto]">
                    <input
                      type="text"
                      value={
                        taskLinks[task._id] || ""
                      }
                      onChange={(event) =>
                        setTaskLinks(
                          (current) => ({
                            ...current,
                            [task._id]:
                              event.target.value,
                          })
                        )
                      }
                      placeholder="Optional submission link"
                      className="rounded-2xl border border-white/10 bg-[#07101c] px-5 py-4 outline-none"
                    />
                    <select
                      value={task.status}
                      onChange={(event) =>
                        updateTaskStatus(
                          task._id,
                          event.target.value
                        )
                      }
                      className="rounded-2xl border border-white/10 bg-[#07101c] px-5 py-4 outline-none"
                    >
                      {[
                        "pending",
                        "submitted",
                        "approved",
                      ].map((status) => (
                        <option
                          key={status}
                          value={status}
                        >
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {isLeader && (
        <form
          onSubmit={submitProject}
          className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8"
        >
          <h2 className="text-3xl font-black">
            Final Submission
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {[
              "githubRepo",
              "deploymentLink",
              "pptLink",
              "demoVideo",
            ].map((field) => (
              <input
                key={field}
                type="text"
                value={submission[field]}
                onChange={(event) =>
                  setSubmission(
                    (current) => ({
                      ...current,
                      [field]:
                        event.target.value,
                    })
                  )
                }
                placeholder={field}
                className="rounded-2xl border border-white/10 bg-[#07101c] px-5 py-4 outline-none"
                disabled={isCompleted}
              />
            ))}
          </div>
          <textarea
            value={submission.documentation}
            onChange={(event) =>
              setSubmission((current) => ({
                ...current,
                documentation:
                  event.target.value,
              }))
            }
            placeholder="Documentation summary"
            className="mt-6 h-32 w-full rounded-2xl border border-white/10 bg-[#07101c] px-5 py-4 outline-none"
            disabled={isCompleted}
          />
          <button
            type="submit"
            disabled={isCompleted}
            className="mt-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 px-8 py-4 font-bold disabled:opacity-40"
          >
            Submit final project
          </button>
        </form>
      )}
    </div>
  );
};

export default Workspace;
