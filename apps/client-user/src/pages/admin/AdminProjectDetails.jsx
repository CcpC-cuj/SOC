import {
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";

import AdminAPI from "../../services/adminApi";

const AdminProjectDetails = () => {
  const { id } = useParams();

  const [project, setProject] =
    useState(null);
  const [members, setMembers] =
    useState([]);
  const [teams, setTeams] =
    useState([]);
  const [tasks, setTasks] =
    useState([]);
  const [submission, setSubmission] =
    useState(null);

  useEffect(() => {
    async function fetchProjectData() {
      try {
        const [
          projectResponse,
          membersResponse,
          tasksResponse,
          submissionResponse,
          teamsResponse,
        ] = await Promise.all([
          AdminAPI.get(`/projects/${id}`),
          AdminAPI.get(
            `/project-members/${id}`
          ),
          AdminAPI.get(
            `/tasks/project/${id}`
          ),
          AdminAPI.get(
            `/project-submissions/${id}`
          ),
          AdminAPI.get(
            `/teams/project/${id}`
          ),
        ]);

        setProject(projectResponse.data);
        setMembers(membersResponse.data);
        setTasks(tasksResponse.data);
        setSubmission(
          submissionResponse.data
        );
        setTeams(teamsResponse.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProjectData();
  }, [id]);

  const reviewSubmission = async (
    status
  ) => {
    if (!submission) {
      return;
    }

    try {
      await AdminAPI.put(
        `/project-submissions/${submission._id}/review`,
        {
          status,
          remarks:
            status === "approved"
              ? "Project approved"
              : "Project rejected",
        }
      );

      const refreshedSubmission =
        await AdminAPI.get(
          `/project-submissions/${id}`
        );
      const refreshedProject =
        await AdminAPI.get(
          `/projects/${id}`
        );

      setSubmission(
        refreshedSubmission.data
      );
      setProject(
        refreshedProject.data
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-10">
      {project && (
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
          <div className="flex flex-wrap gap-3">
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

          <h1 className="mt-5 text-5xl font-black">
            {project.title}
          </h1>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-400">
            {project.description}
          </p>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-2xl font-black">
            Members
          </h2>
          <p className="mt-3 text-4xl font-black text-cyan-300">
            {members.length}
          </p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-2xl font-black">
            Teams
          </h2>
          <p className="mt-3 text-4xl font-black text-fuchsia-300">
            {teams.length}
          </p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-2xl font-black">
            Tasks
          </h2>
          <p className="mt-3 text-4xl font-black text-emerald-300">
            {tasks.length}
          </p>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
          <h2 className="mb-6 text-3xl font-black">
            Assigned Members
          </h2>
          <div className="space-y-4">
            {members.map((member) => (
              <div
                key={member._id}
                className="rounded-3xl bg-[#07101c] p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold">
                      {member.user?.name}
                    </h3>
                    <p className="mt-2 text-sm text-slate-400">
                      {member.user?.email}
                    </p>
                  </div>
                  {member.isLeader && (
                    <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm text-emerald-100">
                      Leader
                    </span>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
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

                {member.team?.name && (
                  <p className="mt-4 text-sm text-slate-400">
                    Team:
                    {" "}
                    <span className="text-slate-100">
                      {member.team.name}
                    </span>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
            <h2 className="mb-6 text-3xl font-black">
              Teams
            </h2>
            <div className="space-y-4">
              {teams.map((team) => (
                <div
                  key={team._id}
                  className="rounded-3xl bg-[#07101c] p-5"
                >
                  <h3 className="text-xl font-bold">
                    {team.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400">
                    {team.focus ||
                      "No focus note yet."}
                  </p>
                  <p className="mt-3 text-sm text-slate-300">
                    Leader:
                    {" "}
                    {team.leader?.name ||
                      "Not assigned"}
                  </p>
                  <p className="mt-1 text-sm text-slate-300">
                    Members:
                    {" "}
                    {team.members.length}/
                    {team.capacity}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
            <h2 className="mb-6 text-3xl font-black">
              Final Submission
            </h2>

            {submission ? (
              <>
                <span className="rounded-full bg-cyan-500/10 px-5 py-3 text-sm font-semibold text-cyan-200">
                  {submission.status}
                </span>

                <div className="mt-6 space-y-4">
                  {[
                    {
                      label:
                        "GitHub Repository",
                      href:
                        submission.githubRepo,
                    },
                    {
                      label:
                        "Deployment Link",
                      href:
                        submission.deploymentLink,
                    },
                    {
                      label:
                        "Slides / PPT",
                      href:
                        submission.pptLink,
                    },
                    {
                      label:
                        "Demo Video",
                      href:
                        submission.demoVideo,
                    },
                  ]
                    .filter(
                      (item) => item.href
                    )
                    .map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="block rounded-2xl bg-[#07101c] px-5 py-4 text-cyan-200"
                      >
                        {item.label}
                      </a>
                    ))}
                </div>

                {submission.documentation && (
                  <div className="mt-4 rounded-2xl bg-[#07101c] p-5 text-sm leading-7 text-slate-300">
                    {submission.documentation}
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-4">
                  <button
                    type="button"
                    disabled={
                      submission.status ===
                      "approved"
                    }
                    onClick={() =>
                      reviewSubmission(
                        "approved"
                      )
                    }
                    className="rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-4 font-bold disabled:opacity-40"
                  >
                    Approve project
                  </button>

                  <button
                    type="button"
                    disabled={
                      submission.status ===
                      "approved"
                    }
                    onClick={() =>
                      reviewSubmission(
                        "rejected"
                      )
                    }
                    className="rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 px-6 py-4 font-bold disabled:opacity-40"
                  >
                    Reject project
                  </button>
                </div>
              </>
            ) : (
              <p className="text-slate-400">
                No submission has been uploaded yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProjectDetails;
