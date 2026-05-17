// client-admin/src/pages/Leaders.jsx

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

const leaderRoles = [
  "frontend-leader",
  "backend-leader",
  "ai-ml-leader",
  "ui-ux-leader",
];

const Leaders = () => {

  const [projects,
    setProjects] =
    useState([]);

  const [users,
    setUsers] =
    useState([]);

  const [selectedProject,
    setSelectedProject] =
    useState("");

  const [selectedUser,
    setSelectedUser] =
    useState("");

  const [selectedRole,
    setSelectedRole] =
    useState("");

  useEffect(() => {

    fetchProjects();

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

        await axios.post(
          "http://localhost:5000/api/project-members/assign-leader",
          {
            projectId:
              selectedProject,

            userId:
              selectedUser,

            role:
              selectedRole,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert(
          "Leader Assigned"
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

          {/* ROLE */}
          <select
            value={selectedRole}
            onChange={(e) =>
              setSelectedRole(
                e.target.value
              )
            }
            className="rounded-2xl border border-white/10 bg-[#0b1120] px-5 py-4 outline-none"
          >

            <option value="">
              Select Leader Role
            </option>

            {
              leaderRoles.map(
                (role) => (

                  <option
                    key={role}
                    value={role}
                  >

                    {role}

                  </option>
                )
              )
            }

          </select>

        </div>

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