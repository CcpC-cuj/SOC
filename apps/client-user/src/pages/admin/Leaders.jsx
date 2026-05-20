import {
  useEffect,
  useState,
} from "react";

// import API
// from "../../services/api";
import AdminAPI
from "../../services/adminApi";


const Leaders = () => {

  const [projects,
    setProjects] =
    useState([]);

  const [members,
    setMembers] =
    useState([]);

  const [selectedProject,
    setSelectedProject] =
    useState("");

  useEffect(() => {

    fetchProjects();

  }, []);

  // FETCH PROJECTS
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

        console.log(error);

      }
  };

  // FETCH MEMBERS
const fetchMembers =
  async (projectId) => {

    try {

      setSelectedProject(
        projectId
      );

      const response =
        await AdminAPI.get(
          `/project-members/${projectId}`
        );

      setMembers(
        response.data
      );

    } catch (error) {

      console.log(error);

    }
};

  // ASSIGN LEADER
const assignLeader =
  async (userId) => {

    try {

      await AdminAPI.post(
        "/project-members/assign-leader",
        {
          projectId:
            selectedProject,

          userId,
        }
      );

      fetchMembers(
        selectedProject
      );

    } catch (error) {

      console.log(
        error.response?.data
        || error.message
      );

    }
};

  return (
    <div>

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-5xl font-black">

          Team Leaders

        </h1>

        <p className="mt-3 text-slate-400">

          Assign one leader per project

        </p>

      </div>

      {/* PROJECTS */}
      <div className="mb-10 flex flex-wrap gap-4">

        {
          projects.map(
            (project) => (

              <button
                key={project._id}
                onClick={() =>
                  fetchMembers(
                    project._id
                  )
                }
                className={`rounded-2xl px-6 py-4 font-medium transition ${
                  selectedProject
                  === project._id
                    ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                    : "bg-white/5 text-slate-300"
                }`}
              >

                {project.title}

              </button>
            )
          )
        }

      </div>

      {/* MEMBERS */}
      <div className="grid gap-6 lg:grid-cols-2">

        {
          members.map(
            (member) => (

              <div
                key={member._id}
                className="rounded-3xl border border-white/10 bg-white/5 p-7"
              >

                {/* USER */}
                <div>

                  <h2 className="text-3xl font-black">

                    {
                      member.user
                        ?.name
                    }

                  </h2>

                  <p className="mt-2 text-slate-400">

                    {
                      member.user
                        ?.email
                    }

                  </p>

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

                {/* LEADER */}
                <div className="mt-6">

                  {
                    member.isLeader ? (

                      <div className="rounded-2xl bg-green-500/10 px-5 py-4 text-center font-bold text-green-300">

                        Team Leader

                      </div>

                    ) : (

                      <button
                        onClick={() =>
                          assignLeader(
                            member.user._id
                          )
                        }
                        className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-4 font-bold"
                      >

                        Assign Leader

                      </button>
                    )
                  }

                </div>

              </div>
            )
          )
        }

      </div>

    </div>
  );
};

export default Leaders;