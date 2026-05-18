import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import axios
from "axios";

const Workspace = () => {

  const { id } =
    useParams();

  const [project,
    setProject] =
    useState(null);

  const [members,
    setMembers] =
    useState([]);

  const [tasks,
    setTasks] =
    useState([]);

    const [isLeader,
        setIsLeader] =
        useState(false);

    const [taskForm,
    setTaskForm] =
    useState({
        title: "",
        description: "",
        assignedTo: "",
        taskType: "feature",
        deadline: "",
    });

    const [submission,
        setSubmission] =
        useState({
            githubRepo: "",
            deploymentLink: "",
            pptLink: "",
            demoVideo: "",
            documentation: "",
        });

        const isCompleted =
            project?.status
            === "completed";

  useEffect(() => {

    fetchProject();

    fetchMembers();

    fetchTasks();
    fetchSubmission();

  }, []);

  // PROJECT
  const fetchProject =
    async () => {

      try {

        const response =
          await axios.get(
            `http://localhost:5000/api/projects/${id}`
          );

        setProject(
          response.data
        );

      } catch (error) {

        console.log(error);

      }
    };

  // MEMBERS
  const fetchMembers =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.get(
            `http://localhost:5000/api/project-members/${id}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setMembers(
          response.data
        );

        const user =
        JSON.parse(
            localStorage.getItem(
            "user"
            )
        );

        const leader =
        response.data.find(
            (member) =>
            member.user._id
            === user._id
            &&
            member.isLeader
        );

        if (leader) {

        setIsLeader(true);
        }

      } catch (error) {

        console.log(error);

      }
    };

// create Task
    const createTask =
        async (e) => {

            e.preventDefault();

            try {

            const token =
                localStorage.getItem(
                "token"
                );

            await axios.post(
                "http://localhost:5000/api/tasks",
                {
                ...taskForm,

                projectId: id,
                },
                {
                headers: {
                    Authorization:
                    `Bearer ${token}`,
                },
                }
            );

            setTaskForm({
                title: "",
                description: "",
                assignedTo: "",
                taskType: "feature",
                deadline: "",
            });

            fetchTasks();

            } catch (error) {

            console.log(
                error.response?.data
            );

            }
        };


  // TASKS
  const fetchTasks =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.get(
            `http://localhost:5000/api/tasks/project/${id}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setTasks(
          response.data
        );

      } catch (error) {

        console.log(error);

      }
    };

  // UPDATE TASK STATUS
  const updateTaskStatus =
    async (
      taskId,
      status,
      submissionLink = ""
    ) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.put(
          `http://localhost:5000/api/tasks/${taskId}/status`,
          {
            status,
            submissionLink,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        fetchTasks();

      } catch (error) {

        console.log(error);

      }
    };


    const fetchSubmission =
  async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await axios.get(
          `http://localhost:5000/api/project-submissions/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      if (response.data) {

        setSubmission({
          githubRepo:
            response.data.githubRepo || "",

          deploymentLink:
            response.data.deploymentLink || "",

          pptLink:
            response.data.pptLink || "",

          demoVideo:
            response.data.demoVideo || "",

          documentation:
            response.data.documentation || "",
        });
      }

    } catch (error) {

      console.log(error);

    }
};


const submitProject =
  async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await axios.post(
        "http://localhost:5000/api/project-submissions",
        {
          projectId: id,

          ...submission,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      alert(
        "Project submitted successfully"
      );

    } catch (error) {

      console.log(error);

    }
};

  return (
    <div className="min-h-screen bg-[#050816] p-6 text-white">

      {/* PROJECT */}
      {
        isCompleted && (

            <div className="mb-10 rounded-3xl border border-green-500/20 bg-green-500/10 p-6">

            <h2 className="text-3xl font-black text-green-300">

                Project Completed

            </h2>

            <p className="mt-3 text-slate-300">

                This workspace is now read-only.
                Tasks, submissions, and updates are locked.

            </p>

            </div>
        )
        }

      {
        project && (

          <div className="mb-12">

            <h1 className="text-5xl font-black">

              {
                project.title
              }

            </h1>

            <p className="mt-4 text-slate-400">

              {
                project.description
              }

            </p>

          </div>
        )
      }

      {/* TEAM */}
      <div className="mb-12">

        <h2 className="mb-6 text-3xl font-black">

          Team Members

        </h2>

        <div className="grid gap-5 lg:grid-cols-2">

          {
            members.map(
              (member) => (

                <div
                  key={member._id}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6"
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <h3 className="text-2xl font-bold">

                        {
                          member.user
                            ?.name
                        }

                      </h3>

                      <p className="mt-2 text-slate-400">

                        {
                          member.user
                            ?.email
                        }

                      </p>

                    </div>

                    {
                      member.isLeader && (

                        <div className="rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-300">

                          Leader

                        </div>
                      )
                    }

                  </div>

                  {/* ROLES */}
                  <div className="mt-5 flex flex-wrap gap-3">

                    {
                      member.roles?.map(
                        (role) => (

                          <span
                            key={role}
                            className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300"
                          >

                            {role}

                          </span>
                        )
                      )
                    }

                  </div>

                </div>
              )
            )
          }

        </div>

      </div>


            {
            isLeader
                    &&
            !isCompleted
            && (

            <form
            onSubmit={createTask}
            className="mb-12 rounded-3xl border border-white/10 bg-white/5 p-6"
            >

            <h2 className="mb-6 text-3xl font-black">

                Create Task

            </h2>

            <div className="grid gap-5 md:grid-cols-2">

                <input
                type="text"
                placeholder="Task Title"
                value={taskForm.title}
                onChange={(e) =>
                    setTaskForm({
                    ...taskForm,

                    title:
                        e.target.value,
                    })
                }
                className="rounded-2xl border border-white/10 bg-[#050816] px-5 py-4 outline-none"
                />

                <select
                value={
                    taskForm.assignedTo
                }
                onChange={(e) =>
                    setTaskForm({
                    ...taskForm,

                    assignedTo:
                        e.target.value,
                    })
                }
                className="rounded-2xl border border-white/10 bg-[#050816] px-5 py-4 outline-none"
                >

                <option value="">
                    Assign Member
                </option>

                {
                    members.map(
                    (member) => (

                        <option
                        key={
                            member.user._id
                        }
                        value={
                            member.user._id
                        }
                        >

                        {
                            member.user.name
                        }

                        </option>
                    )
                    )
                }

                </select>

                <select
                value={
                    taskForm.taskType
                }
                onChange={(e) =>
                    setTaskForm({
                    ...taskForm,

                    taskType:
                        e.target.value,
                    })
                }
                className="rounded-2xl border border-white/10 bg-[#050816] px-5 py-4 outline-none"
                >

                <option value="feature">
                Feature
                </option>

                <option value="bug-fix">
                Bug Fix
                </option>

                <option value="research">
                Research
                </option>

                <option value="design">
                Design
                </option>

                <option value="documentation">
                Documentation
                </option>

                <option value="testing">
                Testing
                </option>

                </select>

                <input
                type="date"
                value={
                    taskForm.deadline
                }
                onChange={(e) =>
                    setTaskForm({
                    ...taskForm,

                    deadline:
                        e.target.value,
                    })
                }
                className="rounded-2xl border border-white/10 bg-[#050816] px-5 py-4 outline-none"
                />

            </div>

            <textarea
                placeholder="Task Description"
                value={
                taskForm.description
                }
                onChange={(e) =>
                setTaskForm({
                    ...taskForm,

                    description:
                    e.target.value,
                })
                }
                className="mt-5 h-32 w-full rounded-2xl border border-white/10 bg-[#050816] px-5 py-4 outline-none"
            />

            <button
                type="submit"
                className="mt-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 font-bold"
            >

                Create Task

            </button>

            </form>
        )
        }


      {/* TASKS */}
      <div>

        <h2 className="mb-6 text-3xl font-black">

          Tasks

        </h2>

        <div className="space-y-5">

          {
            tasks.map(
              (task) => (

                <div
                  key={task._id}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6"
                >

                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="mt-4 text-sm text-slate-400">
                            Assigned To:
                            {" "}

                            <span className="font-semibold text-cyan-300">

                                {
                                task.assignedTo
                                    ?.name
                                }

                            </span>
                        </p>

                      <h3 className="text-2xl font-bold">

                        {
                          task.title
                        }

                      </h3>

                      <p className="mt-3 text-slate-400">

                        {
                          task.description
                        }

                      </p>

                    </div>

                    <div className="flex flex-wrap gap-3">

                      <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">

                        {
                          task.status
                        }

                      </span>

                      <span className="rounded-full bg-purple-500/10 px-4 py-2 text-sm text-purple-300">

                        {
                          task.taskType
                        }

                      </span>

                    </div>

                  </div>


            {/* SUBMISSION */}

                  <div className="mt-5">
                    <input
                        type="text"
                        placeholder="GitHub / Demo / Docs Link"
                        disabled={isCompleted}
                        className="w-full rounded-2xl border border-white/10 bg-[#050816] px-5 py-4 outline-none"
                        onBlur={(e) =>
                        updateTaskStatus(
                            task._id,
                            task.status,
                            e.target.value
                        )
                        }
                    />
                    </div>

                  {/* STATUS UPDATE */}
                  <div className="mt-5">

                    <select
                      value={task.status}
                      disabled={isCompleted}
                      onChange={(e) =>
                        updateTaskStatus(
                          task._id,
                          e.target.value
                        )
                      }
                      className="rounded-2xl border border-white/10 bg-[#050816] px-4 py-3 outline-none"
                    >

                      <option value="pending">
                        Pending
                        </option>

                        <option value="submitted">
                        Submitted
                        </option>

                        <option value="approved">
                        Approved
                        </option>

                    </select>

                  </div>

                  {
                    task.submissionLinks
                        ?.length > 0 && (

                        <div className="mt-5 space-y-3">

                        {
                            task.submissionLinks.map(
                            (link, index) => (

                                <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                                className="block rounded-2xl bg-cyan-500/10 px-5 py-4 text-cyan-300 transition hover:bg-cyan-500/20"
                                >

                                {link.url}

                                </a>
                            )
                            )
                        }

                        </div>
                    )
                    }

                </div>
              )
            )
          }

        </div>
      </div>

            {
                isLeader &&
                !isCompleted
                && (

                    <form
                    onSubmit={submitProject}
                    className="mt-14 rounded-3xl border border-white/10 bg-white/5 p-6"
                    >

                    <h2 className="mb-8 text-3xl font-black">

                        Final Project Submission

                    </h2>

                    <div className="grid gap-5">

                        <input
                        type="text"
                        placeholder="GitHub Repository"
                        value={
                            submission.githubRepo
                        }
                        onChange={(e) =>
                            setSubmission({
                            ...submission,

                            githubRepo:
                                e.target.value,
                            })
                        }
                        className="rounded-2xl border border-white/10 bg-[#050816] px-5 py-4 outline-none"
                        />

                        <input
                        type="text"
                        placeholder="Deployment Link"
                        value={
                            submission.deploymentLink
                        }
                        onChange={(e) =>
                            setSubmission({
                            ...submission,

                            deploymentLink:
                                e.target.value,
                            })
                        }
                        className="rounded-2xl border border-white/10 bg-[#050816] px-5 py-4 outline-none"
                        />

                        <input
                        type="text"
                        placeholder="PPT / Slides Link"
                        value={
                            submission.pptLink
                        }
                        onChange={(e) =>
                            setSubmission({
                            ...submission,

                            pptLink:
                                e.target.value,
                            })
                        }
                        className="rounded-2xl border border-white/10 bg-[#050816] px-5 py-4 outline-none"
                        />

                        <input
                        type="text"
                        placeholder="Demo Video Link"
                        value={
                            submission.demoVideo
                        }
                        onChange={(e) =>
                            setSubmission({
                            ...submission,

                            demoVideo:
                                e.target.value,
                            })
                        }
                        className="rounded-2xl border border-white/10 bg-[#050816] px-5 py-4 outline-none"
                        />

                        <textarea
                        placeholder="Documentation / Notes"
                        value={
                            submission.documentation
                        }
                        onChange={(e) =>
                            setSubmission({
                            ...submission,

                            documentation:
                                e.target.value,
                            })
                        }
                        className="h-36 rounded-2xl border border-white/10 bg-[#050816] px-5 py-4 outline-none"
                        />

                    </div>

                    <button
                        type="submit"
                        className="mt-6 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-4 font-bold"
                    >

                        Submit Final Project

                    </button>

                    </form>
                )
                }
    </div>
  );
};

export default Workspace;