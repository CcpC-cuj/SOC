import {
  useEffect,
  useState,
} from "react";

import AdminAPI from "../../services/adminApi";

const initialTeamForm = {
  name: "",
  focus: "",
  capacity: 8,
};

const Leaders = () => {
  const [projects, setProjects] =
    useState([]);
  const [members, setMembers] =
    useState([]);
  const [teams, setTeams] =
    useState([]);
  const [selectedProject, setSelectedProject] =
    useState("");
  const [teamForm, setTeamForm] =
    useState(initialTeamForm);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response =
          await AdminAPI.get(
            "/projects"
          );
        setProjects(response.data);

        const firstRealProject =
          response.data.find(
            (project) =>
              !project.isShowcase
          );

        if (firstRealProject?._id) {
          setSelectedProject(
            firstRealProject._id
          );
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchProjects();
  }, []);

  useEffect(() => {
    async function fetchProjectData() {
      if (!selectedProject) {
        return;
      }

      try {
        const [
          membersResponse,
          teamsResponse,
        ] = await Promise.all([
          AdminAPI.get(
            `/project-members/${selectedProject}`
          ),
          AdminAPI.get(
            `/teams/project/${selectedProject}`
          ),
        ]);

        setMembers(membersResponse.data);
        setTeams(teamsResponse.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProjectData();
  }, [selectedProject]);

  const refreshProjectData = async () => {
    if (!selectedProject) {
      return;
    }

    const [
      membersResponse,
      teamsResponse,
    ] = await Promise.all([
      AdminAPI.get(
        `/project-members/${selectedProject}`
      ),
      AdminAPI.get(
        `/teams/project/${selectedProject}`
      ),
    ]);

    setMembers(membersResponse.data);
    setTeams(teamsResponse.data);
  };

  const createTeam = async (
    event
  ) => {
    event.preventDefault();

    try {
      await AdminAPI.post("/teams", {
        ...teamForm,
        projectId: selectedProject,
      });
      setTeamForm(initialTeamForm);
      await refreshProjectData();
    } catch (error) {
      console.error(error);
    }
  };

  const assignLeader = async (
    teamId,
    leaderId
  ) => {
    try {
      await AdminAPI.put(
        "/teams/assign-leader",
        {
          teamId,
          leaderId,
        }
      );
      await refreshProjectData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-5xl font-black">
          Teams and Leaders
        </h1>
        <p className="mt-3 text-slate-400">
          Create real teams inside each project, then assign a leader once participants are placed.
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        {projects
          .filter(
            (project) =>
              !project.isShowcase
          )
          .map((project) => (
            <button
              key={project._id}
              type="button"
              onClick={() =>
                setSelectedProject(
                  project._id
                )
              }
              className={`rounded-2xl px-6 py-4 font-medium transition ${
                selectedProject ===
                project._id
                  ? "bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white"
                  : "bg-white/5 text-slate-300"
              }`}
            >
              {project.title}
            </button>
          ))}
      </div>

      <form
        onSubmit={createTeam}
        className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8"
      >
        <h2 className="text-3xl font-black">
          Create a Team
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <input
            type="text"
            value={teamForm.name}
            onChange={(event) =>
              setTeamForm((current) => ({
                ...current,
                name:
                  event.target.value,
              }))
            }
            placeholder="Team name"
            className="rounded-2xl border border-white/10 bg-[#07101c] px-5 py-4 outline-none"
          />
          <input
            type="text"
            value={teamForm.focus}
            onChange={(event) =>
              setTeamForm((current) => ({
                ...current,
                focus:
                  event.target.value,
              }))
            }
            placeholder="Focus area"
            className="rounded-2xl border border-white/10 bg-[#07101c] px-5 py-4 outline-none"
          />
          <input
            type="number"
            value={teamForm.capacity}
            onChange={(event) =>
              setTeamForm((current) => ({
                ...current,
                capacity:
                  event.target.value,
              }))
            }
            placeholder="Capacity"
            className="rounded-2xl border border-white/10 bg-[#07101c] px-5 py-4 outline-none"
          />
        </div>
        <button
          type="submit"
          className="mt-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 px-8 py-4 font-bold"
        >
          Create team
        </button>
      </form>

      <div className="grid gap-6 lg:grid-cols-2">
        {teams.map((team) => (
          <div
            key={team._id}
            className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black">
                  {team.name}
                </h2>
                <p className="mt-3 text-slate-400">
                  {team.focus ||
                    "No focus note yet."}
                </p>
              </div>
              <span className="rounded-full bg-white/5 px-4 py-2 text-sm text-slate-200">
                Capacity {team.members.length}/
                {team.capacity}
              </span>
            </div>

            <div className="mt-6 rounded-2xl bg-[#07101c] p-5">
              <p className="text-sm text-slate-400">
                Current leader
              </p>
              <h3 className="mt-2 text-xl font-bold">
                {team.leader?.name ||
                  "Not assigned yet"}
              </h3>
            </div>

            <select
              value=""
              onChange={(event) => {
                if (
                  event.target.value
                ) {
                  assignLeader(
                    team._id,
                    event.target.value
                  );
                }
              }}
              className="mt-5 w-full rounded-2xl border border-white/10 bg-[#07101c] px-5 py-4 outline-none"
            >
              <option value="">
                Assign leader
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

            <div className="mt-6">
              <p className="mb-3 text-sm text-slate-400">
                Assigned members
              </p>
              <div className="flex flex-wrap gap-3">
                {members
                  .filter(
                    (member) =>
                      member.team?._id ===
                      team._id
                  )
                  .map((member) => (
                    <span
                      key={member._id}
                      className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-100"
                    >
                      {member.user?.name}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaders;
