import {
  useEffect,
  useState,
} from "react";

import {
  DOMAIN_OPTIONS,
  EXPERIENCE_LEVELS,
  ROLE_OPTIONS,
  registrationStatusLabels,
} from "../constants/registration";
import API from "../services/api";
import {
  getStoredUser,
  setUserSession,
  getUserToken,
} from "../services/authStorage";

const initialForm = {
  name: "",
  bio: "",
  department: "",
  roll: "",
  program: "",
  phone: "",
  github: "",
  linkedin: "",
  portfolio: "",
  availability: "",
  priorExperience: "",
  whyJoin: "",
  skills: "",
  experienceLevel: "beginner",
  preferredDomains: [],
  preferredRoles: [],
};

const Profile = () => {
  const [profile, setProfile] =
    useState(null);
  const [dashboard, setDashboard] =
    useState(null);
  const [editing, setEditing] =
    useState(false);
  const [form, setForm] =
    useState(initialForm);

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const [
          profileResponse,
          dashboardResponse,
        ] = await Promise.all([
          API.get("/users/profile"),
          API.get(
            "/users/profile/dashboard"
          ),
        ]);

        setProfile(profileResponse.data);
        setDashboard(
          dashboardResponse.data
        );
        setForm({
          name:
            profileResponse.data.name ||
            "",
          bio:
            profileResponse.data.bio ||
            "",
          department:
            profileResponse.data
              .department || "",
          roll:
            profileResponse.data.roll ||
            "",
          program:
            profileResponse.data
              .program || "",
          phone:
            profileResponse.data
              .phone || "",
          github:
            profileResponse.data
              .github || "",
          linkedin:
            profileResponse.data
              .linkedin || "",
          portfolio:
            profileResponse.data
              .portfolio || "",
          availability:
            profileResponse.data
              .availability || "",
          priorExperience:
            profileResponse.data
              .priorExperience || "",
          whyJoin:
            profileResponse.data
              .whyJoin || "",
          experienceLevel:
            profileResponse.data
              .experienceLevel ||
            "beginner",
          skills:
            profileResponse.data.skills?.join(
              ", "
            ) || "",
          preferredDomains:
            profileResponse.data
              .preferredDomains || [],
          preferredRoles:
            profileResponse.data
              .preferredRoles || [],
        });
      } catch (error) {
        console.error(error);
      }
    }

    fetchProfileData();
  }, []);

  const toggleArrayValue = (
    key,
    value
  ) => {
    setForm((current) => ({
      ...current,
      [key]: current[key].includes(
        value
      )
        ? current[key].filter(
            (item) =>
              item !== value
          )
        : [...current[key], value],
    }));
  };

  const updateProfile = async (
    event
  ) => {
    event.preventDefault();

    try {
      const response =
        await API.put(
          "/users/profile",
          {
            ...form,
            skills:
              form.skills
                .split(",")
                .map((skill) =>
                  skill.trim()
                )
                .filter(Boolean),
          }
        );

      setProfile(response.data);
      setEditing(false);

      const sessionUser =
        getStoredUser();

      if (sessionUser) {
        setUserSession(
          getUserToken(),
          {
            ...sessionUser,
            name: response.data.name,
            registrationStatus:
              response.data.registrationStatus,
            experienceLevel:
              response.data.experienceLevel,
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!profile || !dashboard) {
    return (
      <div className="min-h-screen bg-[#050816] p-6 text-white">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] p-6 text-white">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.03] p-8 backdrop-blur-xl">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-5xl font-black">
                {profile.name?.charAt(0)}
              </div>

              <h1 className="mt-6 text-3xl font-black">
                {profile.name}
              </h1>
              <p className="mt-2 text-slate-400">
                {profile.department}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Roll No:
                {" "}
                {profile.roll}
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <span className="rounded-full bg-fuchsia-500/10 px-5 py-3 text-sm font-semibold capitalize text-fuchsia-200">
                  {
                    profile.experienceLevel
                  }
                </span>
                <span className="rounded-full bg-cyan-500/10 px-5 py-3 text-sm font-semibold text-cyan-100">
                  {
                    registrationStatusLabels[
                      profile.registrationStatus
                    ]
                  }
                </span>
              </div>

              <div className="mt-8 flex w-full flex-col gap-4">
                {[
                  {
                    label: "GitHub",
                    value:
                      profile.github,
                  },
                  {
                    label:
                      "LinkedIn",
                    value:
                      profile.linkedin,
                  },
                  {
                    label:
                      "Portfolio",
                    value:
                      profile.portfolio,
                  },
                ]
                  .filter((item) => item.value)
                  .map((item) => (
                    <a
                      key={item.label}
                      href={item.value}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl bg-white/5 px-5 py-4 transition hover:bg-white/10"
                    >
                      {item.label}
                    </a>
                  ))}
              </div>

              <button
                type="button"
                onClick={() =>
                  setEditing(
                    !editing
                  )
                }
                className="mt-8 w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 px-6 py-4 font-bold"
              >
                {editing
                  ? "Cancel"
                  : "Edit Profile"}
              </button>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.03] p-8 backdrop-blur-xl">
              <h2 className="text-3xl font-black">
                About and Registration Details
              </h2>

              {editing ? (
                <form
                  onSubmit={updateProfile}
                  className="mt-6 space-y-5"
                >
                  <div className="grid gap-5 md:grid-cols-2">
                    {[
                      "name",
                      "department",
                      "program",
                      "roll",
                      "phone",
                      "github",
                      "linkedin",
                      "portfolio",
                      "availability",
                    ].map((field) => (
                      <input
                        key={field}
                        type="text"
                        placeholder={field}
                        value={form[field]}
                        onChange={(event) =>
                          setForm(
                            (
                              current
                            ) => ({
                              ...current,
                              [field]:
                                event
                                  .target
                                  .value,
                            })
                          )
                        }
                        className="rounded-2xl border border-white/10 bg-[#050816] px-5 py-4 outline-none"
                      />
                    ))}
                  </div>

                  <select
                    value={
                      form.experienceLevel
                    }
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        experienceLevel:
                          event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-[#050816] px-5 py-4 outline-none"
                  >
                    {EXPERIENCE_LEVELS.map(
                      (level) => (
                        <option
                          key={level}
                          value={level}
                        >
                          {level}
                        </option>
                      )
                    )}
                  </select>

                  <textarea
                    rows="3"
                    placeholder="Skills (comma separated)"
                    value={form.skills}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        skills:
                          event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-[#050816] px-5 py-4 outline-none"
                  />

                  <textarea
                    rows="3"
                    placeholder="Bio"
                    value={form.bio}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        bio:
                          event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-[#050816] px-5 py-4 outline-none"
                  />

                  <textarea
                    rows="3"
                    placeholder="Prior experience"
                    value={
                      form.priorExperience
                    }
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        priorExperience:
                          event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-[#050816] px-5 py-4 outline-none"
                  />

                  <textarea
                    rows="3"
                    placeholder="Why join"
                    value={form.whyJoin}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        whyJoin:
                          event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-[#050816] px-5 py-4 outline-none"
                  />

                  <div>
                    <p className="mb-3 text-sm font-semibold text-slate-200">
                      Preferred domains
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {DOMAIN_OPTIONS.map(
                        (domain) => (
                          <button
                            key={domain}
                            type="button"
                            onClick={() =>
                              toggleArrayValue(
                                "preferredDomains",
                                domain
                              )
                            }
                            className={`rounded-full px-4 py-3 text-sm ${
                              form.preferredDomains.includes(
                                domain
                              )
                                ? "bg-cyan-500/10 text-cyan-100"
                                : "bg-white/5 text-slate-300"
                            }`}
                          >
                            {domain}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="mb-3 text-sm font-semibold text-slate-200">
                      Preferred roles
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {ROLE_OPTIONS.map(
                        (role) => (
                          <button
                            key={role}
                            type="button"
                            onClick={() =>
                              toggleArrayValue(
                                "preferredRoles",
                                role
                              )
                            }
                            className={`rounded-full px-4 py-3 text-sm ${
                              form.preferredRoles.includes(
                                role
                              )
                                ? "bg-fuchsia-500/10 text-fuchsia-100"
                                : "bg-white/5 text-slate-300"
                            }`}
                          >
                            {role.replaceAll(
                              "-",
                              " "
                            )}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 px-8 py-4 font-bold"
                  >
                    Save profile
                  </button>
                </form>
              ) : (
                <div className="mt-6 grid gap-8 lg:grid-cols-2">
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-lg font-bold">
                        Bio
                      </h3>
                      <p className="mt-2 text-slate-400">
                        {profile.bio ||
                          "No bio added yet."}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">
                        Prior Experience
                      </h3>
                      <p className="mt-2 text-slate-400">
                        {profile.priorExperience ||
                          "No prior experience shared yet."}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">
                        Why Join
                      </h3>
                      <p className="mt-2 text-slate-400">
                        {profile.whyJoin ||
                          "No motivation note shared yet."}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <h3 className="text-lg font-bold">
                        Skills
                      </h3>
                      <div className="mt-3 flex flex-wrap gap-3">
                        {profile.skills?.map(
                          (skill) => (
                            <span
                              key={skill}
                              className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-100"
                            >
                              {skill}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">
                        Preferred Domains
                      </h3>
                      <div className="mt-3 flex flex-wrap gap-3">
                        {profile.preferredDomains?.map(
                          (domain) => (
                            <span
                              key={domain}
                              className="rounded-full bg-white/5 px-4 py-2 text-sm text-slate-300"
                            >
                              {domain}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">
                        Preferred Roles
                      </h3>
                      <div className="mt-3 flex flex-wrap gap-3">
                        {profile.preferredRoles?.map(
                          (role) => (
                            <span
                              key={role}
                              className="rounded-full bg-fuchsia-500/10 px-4 py-2 text-sm text-fuchsia-100"
                            >
                              {role.replaceAll(
                                "-",
                                " "
                              )}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.03] p-8 backdrop-blur-xl">
              <h2 className="text-3xl font-black">
                Progress Snapshot
              </h2>
              <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {[
                  {
                    label:
                      "Assigned Projects",
                    value:
                      dashboard.stats
                        .totalProjects,
                  },
                  {
                    label:
                      "Completed Projects",
                    value:
                      dashboard.stats
                        .completedProjects,
                  },
                  {
                    label:
                      "Total Tasks",
                    value:
                      dashboard.stats
                        .totalTasks,
                  },
                  {
                    label:
                      "Approved Tasks",
                    value:
                      dashboard.stats
                        .approvedTasks,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl bg-[#07101c] p-5"
                  >
                    <h3 className="text-3xl font-black text-cyan-300">
                      {item.value}
                    </h3>
                    <p className="mt-2 text-sm text-slate-400">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
