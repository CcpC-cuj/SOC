// src/pages/ProjectDetails.jsx

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  Users,
  Layers3,
  CalendarDays,
  X,
} from "lucide-react";

const roleOptions = [
  "frontend-developer",
  "backend-developer",
  "ai-ml-engineer",
  "ui-ux-designer",
];

const ProjectDetails = () => {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const [project,
    setProject] =
    useState(null);

  const [members,
      setMembers] =
      useState([]);

  const [showModal,
    setShowModal] =
    useState(false);

 const [selectedRoles,
  setSelectedRoles] =
  useState([]);

  useEffect(() => {

    fetchProject();
    fetchMembers();

  }, []);

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

        console.log(
          error.response?.data
          || error.message
        );

      }
    };

  // OPEN JOIN FLOW
  const handleJoinClick =
    () => {

      const token =
        localStorage.getItem(
          "token"
        );

      // NOT LOGGED IN
      if (!token) {

        navigate(
          "/login",
          {
            state: {
              from:
                location.pathname,
            },
          }
        );

        return;
      }

      setShowModal(true);
    };

// fetch Members
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

        } catch (error) {

          console.log(error);

        }
    };

  // JOIN PROJECT
  const joinProject =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

          console.log(
        selectedRoles
      );

        await axios.post(
        "http://localhost:5000/api/project-members/join",
        {
            projectId:
            project._id,

            roles:
            selectedRoles,
        },
        {
            headers: {
            Authorization:
                `Bearer ${token}`,
            },
        }
        );

        alert(
          "Joined Successfully"
        );

        setShowModal(false);

      } catch (error) {

        console.log(
        error.response?.data
        );

        alert(
            error.response?.data
                ?.message
            || "Join failed"
            );

      }
    };

  if (!project) {

    return (
      <div className="p-10 text-white">

        Loading...

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] px-4 py-14 text-white sm:px-6 lg:px-10">

      {/* TOP */}
      <div className="mb-10">

        <div className="mb-4 flex flex-wrap gap-3">

          <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">

            {project.domain}

          </span>

          <span className="rounded-full bg-purple-500/10 px-4 py-2 text-sm text-purple-300">

            {project.session}

          </span>

        </div>

        <h1 className="mb-5 text-5xl font-black">

          {project.title}

        </h1>

        <p className="max-w-4xl text-lg text-slate-400">

          {project.description}

        </p>

      </div>

      {/* INFO */}
      <div className="mb-10 grid gap-6 md:grid-cols-3">

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

          <Users
            className="mb-4 text-cyan-400"
            size={28}
          />

          <h2 className="text-3xl font-black">

            {project.maxMembers}

          </h2>

          <p className="mt-2 text-slate-400">

            Max Members

          </p>

        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

          <Layers3
            className="mb-4 text-purple-400"
            size={28}
          />

          <h2 className="text-2xl font-black">

            {project.status}

          </h2>

          <p className="mt-2 text-slate-400">

            Project Status

          </p>

        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

          <CalendarDays
            className="mb-4 text-yellow-400"
            size={28}
          />

          <h2 className="text-2xl font-black">

            {project.season}

          </h2>

          <p className="mt-2 text-slate-400">

            Season

          </p>

        </div>

      </div>

      {/* TECH STACK */}
      <div className="mb-12">

        <h2 className="mb-6 text-3xl font-black">

          Tech Stack

        </h2>

        <div className="flex flex-wrap gap-4">

          {
            project.techStack?.map(
              (tech) => (

                <span
                  key={tech}
                  className="rounded-full bg-white/5 px-5 py-3 text-slate-300"
                >

                  {tech}

                </span>
              )
            )
          }

        </div>

      </div>

      {/* TEAM */}
        <div className="mb-12">

          <h2 className="mb-6 text-3xl font-black">

            Team Members

          </h2>

          <div className="grid gap-6 lg:grid-cols-2">

            {
              members.map(
                (member) => (

                  <div
                    key={member._id}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6"
                  >

                    {/* NAME */}
                    <div className="mb-4 flex items-center justify-between">

                      <div>

                        <h3 className="text-2xl font-bold">

                          {
                            member.user
                              ?.name
                          }

                        </h3>

                        <p className="mt-1 text-slate-400">

                          {
                            member.user
                              ?.email
                          }

                        </p>

                      </div>

                      {
                        member.isLeader && (

                          <div className="rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-300">

                            Team Leader

                          </div>
                        )
                      }

                    </div>

                    {/* ROLES */}
                    <div className="flex flex-wrap gap-3">

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

      {/* JOIN BUTTON */}
      {
        project.status ===
        "active" ? (

          <button
            onClick={
              handleJoinClick
            }
            className="rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-10 py-5 text-lg font-bold"
          >

            Join Project

          </button>

        ) : (

          <div className="inline-flex rounded-2xl bg-yellow-500/10 px-6 py-4 text-yellow-300">

            Project is currently {project.status}

          </div>
        )
      }

      {/* MODAL */}
      {
        showModal && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

            <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#0b1120] p-8">

              {/* TOP */}
              <div className="mb-8 flex items-center justify-between">

                <h2 className="text-3xl font-black">

                  Select Role

                </h2>

                <button
                  onClick={() =>
                    setShowModal(
                      false
                    )
                  }
                >

                  <X size={24} />

                </button>

              </div>

              {/* ROLE */}
                <div className="mb-8 space-y-4">

                {
                    roleOptions.map(
                    (role) => (

                        <label
                        key={role}
                        className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#050816] p-4"
                        >

                        <input
                            type="checkbox"
                            checked={
                            selectedRoles.includes(
                                role
                            )
                            }
                            onChange={(e) => {

                            if (
                                e.target.checked
                            ) {

                                setSelectedRoles([
                                ...selectedRoles,
                                role,
                                ]);

                            } else {

                                setSelectedRoles(
                                selectedRoles.filter(
                                    (r) =>
                                    r !== role
                                )
                                );
                            }
                            }}
                        />

                        <span>

                            {role}

                        </span>

                        </label>
                    )
                    )
                }
                </div>

              {/* BUTTON */}
              <button
                onClick={
                  joinProject
                }
                disabled={
                  selectedRoles.length === 0
                }
                className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-4 font-bold disabled:opacity-50"
              >

                Confirm Join

              </button>

            </div>

          </div>
        )
      }

    </div>
  );
};

export default ProjectDetails;