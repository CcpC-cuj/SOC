import {
  useEffect,
  useState,
} from "react";
import {
  Download,
  Mail,
  Search,
  ShieldCheck,
} from "lucide-react";

import {
  DOMAIN_OPTIONS,
  REGISTRATION_STATUS_OPTIONS,
  ROLE_OPTIONS,
  registrationStatusLabels,
} from "../../constants/registration";
import AdminAPI from "../../services/adminApi";

const statusTheme = {
  pending_review:
    "bg-yellow-500/10 text-yellow-100",
  shortlisted:
    "bg-cyan-500/10 text-cyan-100",
  waitlisted:
    "bg-orange-500/10 text-orange-100",
  assigned:
    "bg-emerald-500/10 text-emerald-100",
  rejected:
    "bg-rose-500/10 text-rose-100",
};

const initialAssignment = {
  projectId: "",
  teamId: "",
  roles: [],
  isLeader: false,
  registrationStatus:
    "pending_review",
  adminNotes: "",
};

const Users = () => {
  const [users, setUsers] =
    useState([]);
  const [projects, setProjects] =
    useState([]);
  const [teams, setTeams] =
    useState([]);
  const [search, setSearch] =
    useState("");
  const [statusFilter, setStatusFilter] =
    useState("all");
  const [domainFilter, setDomainFilter] =
    useState("all");
  const [selectedUser, setSelectedUser] =
    useState(null);
  const [assignment, setAssignment] =
    useState(initialAssignment);

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const [
          usersResponse,
          projectsResponse,
        ] = await Promise.all([
          AdminAPI.get("/users"),
          AdminAPI.get("/projects"),
        ]);

        setUsers(usersResponse.data);
        setProjects(projectsResponse.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchInitialData();
  }, []);

  useEffect(() => {
    async function fetchFilteredUsers() {
      try {
        const response =
          await AdminAPI.get(
            "/users",
            {
              params: {
                q: search || undefined,
                status:
                  statusFilter === "all"
                    ? undefined
                    : statusFilter,
                domain:
                  domainFilter === "all"
                    ? undefined
                    : domainFilter,
              },
            }
          );
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchFilteredUsers();
  }, [
    search,
    statusFilter,
    domainFilter,
  ]);

  useEffect(() => {
    async function fetchTeams() {
      if (!assignment.projectId) {
        setTeams([]);
        return;
      }

      try {
        const response =
          await AdminAPI.get(
            `/teams/project/${assignment.projectId}`
          );
        setTeams(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTeams();
  }, [assignment.projectId]);

  const refreshUsers = async () => {
    const response =
      await AdminAPI.get("/users", {
        params: {
          q: search || undefined,
          status:
            statusFilter === "all"
              ? undefined
              : statusFilter,
          domain:
            domainFilter === "all"
              ? undefined
              : domainFilter,
        },
      });

    setUsers(response.data);
  };

  const downloadCsv = async () => {
    const response =
      await AdminAPI.get(
        "/users/export/csv",
        {
          responseType: "blob",
        }
      );

    const url =
      window.URL.createObjectURL(
        new Blob([response.data])
      );
    const link =
      document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      "soc-users.csv"
    );
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const openUser = (user) => {
    const currentMembership =
      user.memberships?.[0];

    setSelectedUser(user);
    setAssignment({
      projectId:
        currentMembership?.project?._id ||
        "",
      teamId:
        currentMembership?.team?._id ||
        "",
      roles:
        currentMembership?.roles || [],
      isLeader:
        Boolean(
          currentMembership?.isLeader
        ),
      registrationStatus:
        user.registrationStatus ||
        "pending_review",
      adminNotes:
        user.adminNotes || "",
    });
  };

  const closeUser = () => {
    setSelectedUser(null);
    setAssignment(initialAssignment);
    setTeams([]);
  };

  const toggleRole = (role) => {
    setAssignment((current) => ({
      ...current,
      roles: current.roles.includes(
        role
      )
        ? current.roles.filter(
            (item) =>
              item !== role
          )
        : [...current.roles, role],
    }));
  };

  const handleReviewSave = async () => {
    if (!selectedUser) {
      return;
    }

    try {
      await AdminAPI.put(
        `/users/${selectedUser._id}/review`,
        {
          registrationStatus:
            assignment.registrationStatus,
          adminNotes:
            assignment.adminNotes,
        }
      );

      await refreshUsers();
      closeUser();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAssign = async () => {
    if (!selectedUser) {
      return;
    }

    try {
      await AdminAPI.post(
        "/project-members/assign",
        {
          userId: selectedUser._id,
          projectId:
            assignment.projectId,
          teamId:
            assignment.teamId ||
            undefined,
          roles: assignment.roles,
          isLeader:
            assignment.isLeader,
          adminNotes:
            assignment.adminNotes,
        }
      );

      await refreshUsers();
      closeUser();
    } catch (error) {
      console.error(
        error.response?.data ||
          error.message
      );
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-5xl font-black">
            Participant Review
          </h1>
          <p className="mt-3 text-slate-400">
            Review registration details, export data, update status, and assign people into real projects and teams.
          </p>
        </div>

        <button
          type="button"
          onClick={downloadCsv}
          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-semibold text-slate-100"
        >
          <Download size={18} />
          Export CSV
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
        <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
          <Search
            className="text-slate-400"
            size={18}
          />
          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search name, email, roll, program"
            className="w-full bg-transparent outline-none"
          />
        </label>

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(
              event.target.value
            )
          }
          className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 outline-none"
        >
          <option value="all">
            All statuses
          </option>
          {REGISTRATION_STATUS_OPTIONS.map(
            (status) => (
              <option
                key={status}
                value={status}
              >
                {
                  registrationStatusLabels[
                    status
                  ]
                }
              </option>
            )
          )}
        </select>

        <select
          value={domainFilter}
          onChange={(event) =>
            setDomainFilter(
              event.target.value
            )
          }
          className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 outline-none"
        >
          <option value="all">
            All domains
          </option>
          {DOMAIN_OPTIONS.map((domain) => (
            <option
              key={domain}
              value={domain}
            >
              {domain}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {users.map((user) => (
          <div
            key={user._id}
            className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black">
                  {user.name}
                </h2>
                <div className="mt-3 flex items-center gap-3 text-slate-400">
                  <Mail size={18} />
                  {user.email}
                </div>
              </div>

              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${statusTheme[user.registrationStatus]}`}
              >
                {
                  registrationStatusLabels[
                    user.registrationStatus
                  ]
                }
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-100">
                {user.department}
              </span>
              <span className="rounded-full bg-fuchsia-500/10 px-4 py-2 text-sm text-fuchsia-100">
                {user.program}
              </span>
              <span className="rounded-full bg-white/5 px-4 py-2 text-sm text-slate-300">
                Roll:
                {" "}
                {user.roll}
              </span>
            </div>

            <div className="mt-6 space-y-4 text-sm text-slate-300">
              <p>
                <span className="font-semibold text-slate-100">
                  Experience:
                </span>
                {" "}
                {user.experienceLevel}
              </p>
              <p>
                <span className="font-semibold text-slate-100">
                  Preferred domains:
                </span>
                {" "}
                {user.preferredDomains
                  ?.join(", ") ||
                  "Not provided"}
              </p>
              <p>
                <span className="font-semibold text-slate-100">
                  Preferred roles:
                </span>
                {" "}
                {user.preferredRoles
                  ?.join(", ") ||
                  "Not provided"}
              </p>
            </div>

            {user.skills?.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-3">
                {user.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-[#07101c] px-4 py-2 text-sm text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 rounded-2xl bg-[#07101c] p-5 text-sm leading-7 text-slate-400">
              <p className="font-semibold text-slate-100">
                Why join
              </p>
              <p className="mt-2">
                {user.whyJoin ||
                  "No motivation note yet."}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="text-sm text-slate-400">
                Current assignment:
                {" "}
                <span className="text-slate-100">
                  {user.memberships?.[0]
                    ?.project?.title ||
                    "Not assigned"}
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  openUser(user)
                }
                className="rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 px-5 py-3 font-bold"
              >
                Review / Assign
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#07101c] p-8">
            <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">
                  Participant Profile
                </p>
                <h2 className="mt-3 text-4xl font-black">
                  {selectedUser.name}
                </h2>
                <p className="mt-3 text-slate-400">
                  {selectedUser.email}
                </p>
              </div>

              <button
                type="button"
                onClick={closeUser}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100"
              >
                Close
              </button>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
              <div className="space-y-6">
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                  <h3 className="text-2xl font-black">
                    Registration snapshot
                  </h3>
                  <div className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
                    <p>
                      <span className="font-semibold text-slate-100">
                        Department:
                      </span>
                      {" "}
                      {selectedUser.department}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-100">
                        Program:
                      </span>
                      {" "}
                      {selectedUser.program}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-100">
                        Availability:
                      </span>
                      {" "}
                      {selectedUser.availability ||
                        "Not provided"}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-100">
                        Prior experience:
                      </span>
                      {" "}
                      {selectedUser.priorExperience ||
                        "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                  <h3 className="text-2xl font-black">
                    Assignment history
                  </h3>
                  <div className="mt-5 space-y-3">
                    {selectedUser.assignmentHistory
                      ?.length > 0 ? (
                      selectedUser.assignmentHistory
                        .slice()
                        .reverse()
                        .map((entry, index) => (
                          <div
                            key={`${entry.action}-${index}`}
                            className="rounded-2xl bg-[#081121] p-4 text-sm text-slate-300"
                          >
                            <p className="font-semibold capitalize text-slate-100">
                              {entry.action.replace(
                                "-",
                                " "
                              )}
                            </p>
                            <p className="mt-2">
                              {entry.note}
                            </p>
                            <p className="mt-2 text-xs text-slate-500">
                              {new Date(
                                entry.changedAt
                              ).toLocaleString()}
                            </p>
                          </div>
                        ))
                    ) : (
                      <p className="text-sm text-slate-500">
                        No history recorded yet.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <ShieldCheck
                      className="text-cyan-300"
                      size={20}
                    />
                    <h3 className="text-2xl font-black">
                      Review status
                    </h3>
                  </div>

                  <select
                    value={
                      assignment.registrationStatus
                    }
                    onChange={(event) =>
                      setAssignment(
                        (
                          current
                        ) => ({
                          ...current,
                          registrationStatus:
                            event
                              .target
                              .value,
                        })
                      )
                    }
                    className="w-full rounded-2xl border border-white/10 bg-[#081121] px-5 py-4 outline-none"
                  >
                    {REGISTRATION_STATUS_OPTIONS.map(
                      (status) => (
                        <option
                          key={status}
                          value={status}
                        >
                          {
                            registrationStatusLabels[
                              status
                            ]
                          }
                        </option>
                      )
                    )}
                  </select>

                  <textarea
                    rows="4"
                    value={
                      assignment.adminNotes
                    }
                    onChange={(event) =>
                      setAssignment(
                        (
                          current
                        ) => ({
                          ...current,
                          adminNotes:
                            event
                              .target
                              .value,
                        })
                      )
                    }
                    placeholder="Notes for the review or assignment decision"
                    className="mt-4 w-full rounded-2xl border border-white/10 bg-[#081121] px-5 py-4 outline-none"
                  />

                  <button
                    type="button"
                    onClick={handleReviewSave}
                    className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-slate-100"
                  >
                    Save review status
                  </button>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                  <h3 className="text-2xl font-black">
                    Assign to project and team
                  </h3>

                  <div className="mt-5 space-y-4">
                    <select
                      value={
                        assignment.projectId
                      }
                      onChange={(event) =>
                        setAssignment(
                          (
                            current
                          ) => ({
                            ...current,
                            projectId:
                              event
                                .target
                                .value,
                            teamId: "",
                          })
                        )
                      }
                      className="w-full rounded-2xl border border-white/10 bg-[#081121] px-5 py-4 outline-none"
                    >
                      <option value="">
                        Select a project
                      </option>
                      {projects
                        .filter(
                          (project) =>
                            !project.isShowcase
                        )
                        .map((project) => (
                          <option
                            key={project._id}
                            value={
                              project._id
                            }
                          >
                            {project.title}
                          </option>
                        ))}
                    </select>

                    <select
                      value={
                        assignment.teamId
                      }
                      onChange={(event) =>
                        setAssignment(
                          (
                            current
                          ) => ({
                            ...current,
                            teamId:
                              event
                                .target
                                .value,
                          })
                        )
                      }
                      className="w-full rounded-2xl border border-white/10 bg-[#081121] px-5 py-4 outline-none"
                    >
                      <option value="">
                        Optional team
                      </option>
                      {teams.map((team) => (
                        <option
                          key={team._id}
                          value={team._id}
                        >
                          {team.name}
                        </option>
                      ))}
                    </select>

                    <div className="flex flex-wrap gap-3">
                      {ROLE_OPTIONS.map(
                        (role) => (
                          <button
                            key={role}
                            type="button"
                            onClick={() =>
                              toggleRole(
                                role
                              )
                            }
                            className={`rounded-full px-4 py-3 text-sm font-medium transition ${
                              assignment.roles.includes(
                                role
                              )
                                ? "bg-cyan-500/15 text-cyan-100 ring-1 ring-cyan-300/30"
                                : "bg-white/5 text-slate-300 hover:bg-white/10"
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

                    <label className="flex items-center gap-3 text-sm text-slate-200">
                      <input
                        type="checkbox"
                        checked={
                          assignment.isLeader
                        }
                        onChange={(
                          event
                        ) =>
                          setAssignment(
                            (
                              current
                            ) => ({
                              ...current,
                              isLeader:
                                event
                                  .target
                                  .checked,
                            })
                          )
                        }
                      />
                      Mark as team leader
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={handleAssign}
                    className="mt-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 px-6 py-4 font-bold"
                  >
                    Assign participant
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
