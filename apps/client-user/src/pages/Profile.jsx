// 
import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

const Profile = () => {

  const [profile,
    setProfile] =
    useState(null);

    const [dashboard,
    setDashboard] =
    useState(null);

  const [editing,
    setEditing] =
    useState(false);

  const [form,
    setForm] =
    useState({
      name: "",
      bio: "",
      department: "",
      roll: "",
      github: "",
      linkedin: "",
      skills: "",
      experienceLevel:"",
    });

  useEffect(() => {

    fetchProfile();
    fetchDashboard();

  }, []);

  // FETCH PROFILE
const fetchProfile =
  async () => {

    try {

      const response =
        await API.get(
          "/users/profile"
        );

      setProfile(
        response.data
      );

      setForm({
        name:
          response.data.name || "",

        bio:
          response.data.bio || "",

        department:
          response.data.department || "",

        roll:
          response.data.roll || "",

        github:
          response.data.github || "",

        linkedin:
          response.data.linkedin || "",

        experienceLevel:
          response.data
            .experienceLevel || "",

        skills:
          response.data.skills
            ?.join(", ")
          || "",
      });

    } catch (error) {

      console.log(error);

    }
};

  // UPDATE PROFILE
const updateProfile =
  async (e) => {

    e.preventDefault();

    try {

      await API.put(
        "/users/profile",
        {
          ...form,

          skills:
            form.skills
              .split(",")
              .map(
                (skill) =>
                  skill.trim()
              )
              .filter(Boolean),
        }
      );

      setEditing(false);

      fetchProfile();

    } catch (error) {

      console.log(error);

    }
};

    // FETCH DASHBOARD
    const fetchDashboard =
      async () => {

        try {

          const response =
            await API.get(
              "/users/profile/dashboard"
            );

          setDashboard(
            response.data
          );

        } catch (error) {

          console.log(error);

        }
    };

  if (!profile) {

    return (
      <div className="min-h-screen bg-[#050816]" />
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] p-6 text-white">

      <div className="mx-auto max-w-7xl">

        <div className="grid gap-8 lg:grid-cols-[340px_1fr]">

          {/* LEFT */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.03] p-8 backdrop-blur-xl">

            <div className="flex flex-col items-center text-center">

              <div className="flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-5xl font-black">

                {
                  profile.name
                    ?.charAt(0)
                }

              </div>

              <h1 className="mt-6 text-3xl font-black">

                {
                  profile.name
                }

              </h1>

              <p className="mt-2 text-slate-400">

                {
                  profile.department
                }

              </p>

              <p className="mt-2 text-sm text-slate-500">

                    Roll No:
                    {" "}
                    {
                        profile.roll
                    }

                </p>

            <div className="mt-5">
                <span className="rounded-full bg-purple-500/10 px-5 py-3 text-sm font-semibold capitalize text-purple-300">

                    {
                    profile.experienceLevel
                    }

                </span>

                </div>

              <div className="mt-8 flex w-full flex-col gap-4">

                {
                  profile.github && (

                    <a
                      href={
                        profile.github
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl bg-white/5 px-5 py-4 transition hover:bg-white/10"
                    >

                      GitHub

                    </a>
                  )
                }

                {
                  profile.linkedin && (

                    <a
                      href={
                        profile.linkedin
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl bg-white/5 px-5 py-4 transition hover:bg-white/10"
                    >

                      LinkedIn

                    </a>
                  )
                }

              </div>

              <button
                onClick={() =>
                  setEditing(
                    !editing
                  )
                }
                className="mt-8 w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-4 font-bold"
              >

                {
                  editing
                    ? "Cancel"
                    : "Edit Profile"
                }

              </button>

            </div>

          </div>

          {/* RIGHT */}
          <div className="space-y-8">

            {/* BIO */}
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.03] p-8 backdrop-blur-xl">

              <h2 className="text-3xl font-black">

                About

              </h2>

              {
                editing ? (

                  <form
                    onSubmit={
                      updateProfile
                    }
                    className="mt-6 space-y-5"
                  >

                    <input
                      type="text"
                      placeholder="Name"
                      value={
                        form.name
                      }
                      onChange={(e) =>
                        setForm({
                          ...form,

                          name:
                            e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-white/10 bg-[#050816] px-5 py-4 outline-none"
                    />

                    <textarea
                      placeholder="Bio"
                      value={
                        form.bio
                      }
                      onChange={(e) =>
                        setForm({
                          ...form,

                          bio:
                            e.target.value,
                        })
                      }
                      className="h-36 w-full rounded-2xl border border-white/10 bg-[#050816] px-5 py-4 outline-none"
                    />

                    <div className="grid gap-5 md:grid-cols-2">

                      <input
                        type="text"
                        placeholder="Department"
                        value={
                          form.department
                        }
                        onChange={(e) =>
                          setForm({
                            ...form,

                            department:
                              e.target.value,
                          })
                        }
                        className="rounded-2xl border border-white/10 bg-[#050816] px-5 py-4 outline-none"
                      />

                      <input
                        type="text"
                        placeholder="Roll Number"
                        value={
                          form.roll
                        }
                        onChange={(e) =>
                          setForm({
                            ...form,

                            roll:
                              e.target.value,
                          })
                        }
                        className="rounded-2xl border border-white/10 bg-[#050816] px-5 py-4 outline-none"
                      />

                    </div>

                    <div>
                        <label className="mb-3 block text-sm font-semibold text-slate-300">

                            Experience Level

                        </label>

                        <div className="grid grid-cols-2 gap-4">

                            {
                            [
                                "beginner",
                                "intermediate",
                                "advanced",
                                "open-source",
                            ].map((level) => (

                                <button
                                key={level}
                                type="button"
                                onClick={() =>
                                    setForm({
                                    ...form,

                                    experienceLevel:
                                        level,
                                    })
                                }
                                className={`rounded-2xl border px-5 py-4 capitalize transition ${
                                    form.experienceLevel
                                    === level
                                    ? "border-cyan-500 bg-cyan-500/10 text-cyan-300"
                                    : "border-white/10 bg-[#050816]"
                                }`}
                                >

                                {
                                    level.replace(
                                    "-",
                                    " "
                                    )
                                }

                                </button>
                            ))
                            }

                        </div>
                    </div>

                    <input
                      type="text"
                      placeholder="GitHub Link"
                      value={
                        form.github
                      }
                      onChange={(e) =>
                        setForm({
                          ...form,

                          github:
                            e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-white/10 bg-[#050816] px-5 py-4 outline-none"
                    />

                    <input
                      type="text"
                      placeholder="LinkedIn Link"
                      value={
                        form.linkedin
                      }
                      onChange={(e) =>
                        setForm({
                          ...form,

                          linkedin:
                            e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-white/10 bg-[#050816] px-5 py-4 outline-none"
                    />

                    <input
                      type="text"
                      placeholder="Skills (comma separated)"
                      value={
                        form.skills
                      }
                      onChange={(e) =>
                        setForm({
                          ...form,

                          skills:
                            e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-white/10 bg-[#050816] px-5 py-4 outline-none"
                    />

                    <button
                      type="submit"
                      className="rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-4 font-bold"
                    >

                      Save Profile

                    </button>

                  </form>
                )

                : (

                  <p className="mt-6 text-lg leading-relaxed text-slate-300">

                    {
                      profile.bio
                      || "No bio added yet."
                    }

                  </p>
                )
              }

            </div>

            {/* SKILLS */}
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.03] p-8 backdrop-blur-xl">

              <h2 className="text-3xl font-black">

                Skills

              </h2>

              <div className="mt-6 flex flex-wrap gap-4">

                {
                  profile.skills?.map(
                    (skill) => (

                      <span
                        key={skill}
                        className="rounded-full bg-cyan-500/10 px-5 py-3 text-sm font-semibold text-cyan-300"
                      >

                        {
                          skill
                        }

                      </span>
                    )
                  )
                }

              </div>

            </div>

            {
            dashboard && (

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 p-6">

                    <p className="text-sm text-cyan-300">

                    Joined Projects

                    </p>

                    <h2 className="mt-3 text-5xl font-black">

                    {
                        dashboard.stats
                        .totalProjects
                    }

                    </h2>

                </div>

                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-green-500/10 to-green-500/5 p-6">

                    <p className="text-sm text-green-300">

                    Completed Projects

                    </p>

                    <h2 className="mt-3 text-5xl font-black">

                    {
                        dashboard.stats
                        .completedProjects
                    }

                    </h2>

                </div>

                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-purple-500/5 p-6">

                    <p className="text-sm text-purple-300">

                    Total Tasks

                    </p>

                    <h2 className="mt-3 text-5xl font-black">

                    {
                        dashboard.stats
                        .totalTasks
                    }

                    </h2>

                </div>

                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 p-6">

                    <p className="text-sm text-yellow-300">

                    Approved Tasks

                    </p>

                    <h2 className="mt-3 text-5xl font-black">

                    {
                        dashboard.stats
                        .approvedTasks
                    }

                    </h2>

                </div>

                </div>
            )
            }

            {
                dashboard && (

                    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.03] p-8 backdrop-blur-xl">

                    <h2 className="text-3xl font-black">

                        Joined Projects

                    </h2>

                    <div className="mt-8 grid gap-5 lg:grid-cols-3">

                        {
                        dashboard.joinedProjects.map(
                            (item) => (

                            <div
                                key={item._id}
                                className="rounded-3xl border border-white/10 bg-[#050816] p-6"
                            >

                                <div className="flex items-center justify-between">

                                <h3 className="text-2xl font-bold">

                                    {
                                    item.project
                                        ?.title
                                    }

                                </h3>

                                {
                                    item.isLeader && (

                                    <span className="rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-300">

                                        Leader

                                    </span>
                                    )
                                }

                                </div>

                                {/* <p className="mt-4 text-slate-400">

                                {
                                    item.project
                                    ?.description
                                }

                                </p> */}

                                <div className="mt-6 flex flex-wrap gap-3">

                                {
                                    item.roles.map(
                                    (role) => (

                                        <span
                                        key={role}
                                        className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300"
                                        >

                                        {
                                            role
                                        }

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
                )
                }

                {
                dashboard && (

                    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.03] p-8 backdrop-blur-xl">

                    <h2 className="text-3xl font-black">

                        Task History

                    </h2>

                    <div className="mt-8 space-y-5">

                        {
                        dashboard.tasks.map(
                            (task) => (

                            <div
                                key={task._id}
                                className="rounded-3xl border border-white/10 bg-[#050816] p-6"
                            >

                                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

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

                                </div>

                                <span className={`rounded-full px-5 py-3 text-sm font-semibold ${
                                    task.status === "approved"
                                    ? "bg-green-500/10 text-green-300"
                                    : task.status === "submitted"
                                    ? "bg-yellow-500/10 text-yellow-300"
                                    : "bg-cyan-500/10 text-cyan-300"
                                }`}>

                                    {
                                    task.status
                                    }

                                </span>

                                </div>

                            </div>
                            )
                        )
                        }

                    </div>

                    </div>
                )
                }

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;