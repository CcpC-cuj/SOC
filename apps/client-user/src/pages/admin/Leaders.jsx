// client-admin/src/pages/Leaders.jsx

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

const Leaders = () => {

  const [projects,
    setProjects] =
    useState([]);

  const [teams,
    setTeams] =
    useState([]);

  const [users,
    setUsers] =
    useState([]);

  const [selectedProject,
    setSelectedProject] =
    useState("");

  const [selectedTeam,
    setSelectedTeam] =
    useState("");

  const [selectedUser,
    setSelectedUser] =
    useState("");

  useEffect(() => {

    fetchProjects();

    fetchTeams();

    fetchUsers();

  }, []);

  // FETCH PROJECTS
  const fetchProjects =
    async () => {

      try {

        const response =
          await axios.get(
            "http://localhost:5000/api/projects"
          );

        setProjects(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  // FETCH TEAMS
  const fetchTeams =
    async () => {

      try {

        const response =
          await axios.get(
            "http://localhost:5000/api/teams"
          );

        console.log(
          response.data
        );

        setTeams(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  // FETCH USERS
  const fetchUsers =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.get(
            "http://localhost:5000/api/users",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setUsers(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  // ASSIGN LEADER
  const assignLeader =
    async (e) => {

      e.preventDefault();

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        console.log({

          teamId:
            selectedTeam,

          leaderId:
            selectedUser,

        });

        await axios.put(

          "http://localhost:5000/api/teams/assign-leader",

          {

            teamId:
              selectedTeam,

            leaderId:
              selectedUser,

          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }

        );

        alert(
          "Leader Assigned Successfully"
        );

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data
            ?.message ||
            "Something went wrong"
        );

      }

    };

  return (
    <div>

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-5xl font-black">

          Leader Management

        </h1>

        <p className="mt-3 text-slate-400">

          Assign team leaders for projects

        </p>

      </div>

      {/* FORM */}
      <form
        onSubmit={assignLeader}
        className="rounded-3xl border border-white/10 bg-white/5 p-8"
      >

        <div className="grid gap-6 md:grid-cols-3">

          {/* PROJECT */}
          <select
            value={
              selectedProject
            }
            onChange={(e) =>
              setSelectedProject(
                e.target.value
              )
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-4 outline-none"
          >

            <option value="">
              Select Project
            </option>

            {
              projects.map(
                (project) => (

                  <option
                    key={project._id}
                    value={
                      project._id
                    }
                  >

                    {
                      project.title
                    }

                  </option>

                )
              )
            }

          </select>

          {/* TEAM */}
          <select
            value={
              selectedTeam
            }
            onChange={(e) =>
              setSelectedTeam(
                e.target.value
              )
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-4 outline-none"
          >

            <option value="">
              Select Team
            </option>

            {
              teams
                .filter(
                  (team) =>
                    team.project?._id ===
                    selectedProject
                )
                .map((team) => (

                  <option
                    key={team._id}
                    value={
                      team._id
                    }
                  >

                    {team.name}

                  </option>

                ))
            }

          </select>

          {/* USER */}
          <select
            value={selectedUser}
            onChange={(e) =>
              setSelectedUser(
                e.target.value
              )
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-4 outline-none"
          >

            <option value="">
              Select User
            </option>

            {
              users.map(
                (user) => (

                  <option
                    key={user._id}
                    value={user._id}
                  >

                    {user.name}

                  </option>

                )
              )
            }

          </select>

        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="mt-8 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 font-bold"
        >

          Assign Leader

        </button>

      </form>

    </div>
  );
};

export default Leaders;