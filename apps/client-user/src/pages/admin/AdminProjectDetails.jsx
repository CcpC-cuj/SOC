import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import API
from "../../services/api";

const AdminProjectDetails = () => {

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

  const [submission,
    setSubmission] =
    useState(null);

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
        await API.get(
          `/projects/${id}`
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

      const response =
        await API.get(
          `/project-members/${id}`
        );

      setMembers(
        response.data
      );

    } catch (error) {

      console.log(error);

    }
};

  // TASKS
const fetchTasks =
  async () => {

    try {

      const response =
        await API.get(
          `/tasks/project/${id}`
        );

      setTasks(
        response.data
      );

    } catch (error) {

      console.log(error);

    }
};

  // SUBMISSION
const fetchSubmission =
  async () => {

    try {

      const response =
        await API.get(
          `/project-submissions/${id}`
        );

      setSubmission(
        response.data
      );

    } catch (error) {

      console.log(error);

    }
};


const reviewSubmission =
  async (
    status
  ) => {

    try {

      await API.put(
        `/project-submissions/${submission._id}/review`,
        {
          status,

          remarks:
            status === "approved"
            ? "Project approved"
            : "Project rejected",
        }
      );

      fetchProject();

      fetchSubmission();

      alert(
        `Project ${status}`
      );

    } catch (error) {

      console.log(error);

    }
};



  return (
    <div className="min-h-screen bg-[#050816] p-6 text-white">

      {/* PROJECT */}
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

      {/* MEMBERS */}
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

                </div>
              )
            )
          }

        </div>

      </div>

      {/* TASKS */}
      <div className="mb-12">

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

                  <div className="flex items-center justify-between">

                    <div>

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

                      <p className="mt-3 text-sm text-cyan-300">

                        Assigned To:
                        {" "}

                        {
                          task.assignedTo
                            ?.name
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

                </div>
              )
            )
          }

        </div>

      </div>

      {/* FINAL SUBMISSION */}
      {
        submission && (

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

            <div className="mb-8 flex items-center justify-between">
                <h2 className="text-3xl font-black">

                    Final Submission

                </h2>
                <span className="rounded-full bg-cyan-500/10 px-5 py-3 text-sm font-semibold text-cyan-300">

                    {
                    submission.status
                    }

                </span>
            </div>

            <div className="space-y-5">

              <a
                href={
                  submission.githubRepo
                }
                target="_blank"
                rel="noreferrer"
                className="block rounded-2xl bg-cyan-500/10 px-5 py-4 text-cyan-300"
              >

                GitHub Repository

              </a>

              <a
                href={
                  submission.deploymentLink
                }
                target="_blank"
                rel="noreferrer"
                className="block rounded-2xl bg-purple-500/10 px-5 py-4 text-purple-300"
              >

                Deployment Link

              </a>

              <a
                href={
                  submission.pptLink
                }
                target="_blank"
                rel="noreferrer"
                className="block rounded-2xl bg-yellow-500/10 px-5 py-4 text-yellow-300"
              >

                PPT / Slides

              </a>

              <a
                href={
                  submission.demoVideo
                }
                target="_blank"
                rel="noreferrer"
                className="block rounded-2xl bg-green-500/10 px-5 py-4 text-green-300"
              >

                Demo Video

              </a>

              <div className="rounded-2xl bg-white/5 p-5 text-slate-300">

                {
                  submission.documentation
                }

              </div>

            </div>

              <div className="mt-8 flex flex-wrap gap-5">
                <button
                    disabled={
                        submission.status
                        === "approved"
                    }
                    onClick={() =>
                        reviewSubmission(
                        "approved"
                        )
                    }
                    className="rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-4 font-bold disabled:cursor-not-allowed disabled:opacity-40"
                    >

                    Approve Project

                </button>

                <button
                    disabled={
                        submission.status
                        === "approved"
                    }
                    onClick={() =>
                        reviewSubmission(
                        "rejected"
                        )
                    }
                    className="rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 px-8 py-4 font-bold disabled:cursor-not-allowed disabled:opacity-40"
                    >

                    Reject Project

                    </button>
                </div>

          </div>
        )
      }
    </div>
  );
};

export default AdminProjectDetails;