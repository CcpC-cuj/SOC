import {
  useEffect,
  useEffectEvent,
  useState,
} from "react";

import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import EmptyState from "../../components/ui/EmptyState";
import {
  FieldLabel,
  InlineMessage,
  Input,
  Select,
} from "../../components/ui/Field";
import {
  PageHeader,
  PageShell,
  SectionHeader,
} from "../../components/ui/PageChrome";
import { getApiErrorMessage } from "../../services/apiError";
import { useToast } from "../../components/ui/ToastContext";
import AdminAPI from "../../services/adminApi";

const initialTeamForm = {
  name: "",
  focus: "",
  capacity: 8,
};

const Leaders = () => {
  const showToast = useToast();

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
  const [projectLoading, setProjectLoading] =
    useState(true);
  const [rosterLoading, setRosterLoading] =
    useState(false);
  const [savingTeam, setSavingTeam] =
    useState(false);
  const [assigningLeaderId, setAssigningLeaderId] =
    useState("");
  const [error, setError] =
    useState("");

  const fetchProjects = async () => {
    try {
      setProjectLoading(true);
      setError("");
      const response =
        await AdminAPI.get(
          "/projects",
          {
            params: {
              paginated: true,
              type: "delivery",
              limit: 100,
            },
          }
        );
      const projectItems =
        response.data.items || [];

      setProjects(projectItems);

      const firstProjectId =
        projectItems[0]?._id || "";

      setSelectedProject((current) => {
        if (
          current &&
          projectItems.some(
            (project) =>
              project._id === current
          )
        ) {
          return current;
        }

        return firstProjectId;
      });
    } catch (fetchError) {
      setProjects([]);
      setSelectedProject("");
      setMembers([]);
      setTeams([]);
      setError(
        getApiErrorMessage(
          fetchError,
          "Unable to load project options."
        )
      );
    } finally {
      setProjectLoading(false);
    }
  };

  const fetchSelectedProjectData =
    async ({
      projectId = selectedProject,
      silent = false,
    } = {}) => {
      if (!projectId) {
        setMembers([]);
        setTeams([]);
        return;
      }

      try {
        if (!silent) {
          setRosterLoading(true);
        }

        const [
          membersResponse,
          teamsResponse,
        ] = await Promise.all([
          AdminAPI.get(
            `/project-members/${projectId}`
          ),
          AdminAPI.get(
            `/teams/project/${projectId}`
          ),
        ]);

        setMembers(membersResponse.data);
        setTeams(teamsResponse.data);
        setError("");
      } catch (fetchError) {
        setMembers([]);
        setTeams([]);
        setError(
          getApiErrorMessage(
            fetchError,
            "Unable to load members and teams for this project."
          )
        );
      } finally {
        if (!silent) {
          setRosterLoading(false);
        }
      }
    };

  const loadProjectsOnMount =
    useEffectEvent(() => {
      fetchProjects();
    });

  const loadSelectedProjectData =
    useEffectEvent(() => {
      fetchSelectedProjectData();
    });

  useEffect(() => {
    const timer =
      window.setTimeout(() => {
        loadProjectsOnMount();
      }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const timer =
      window.setTimeout(() => {
        loadSelectedProjectData();
      }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [selectedProject]);

  const refreshProjectData = async () => {
    await fetchSelectedProjectData({
      silent: true,
    });
  };

  const createTeam = async (
    event
  ) => {
    event.preventDefault();

    try {
      setSavingTeam(true);
      await AdminAPI.post("/teams", {
        ...teamForm,
        projectId: selectedProject,
      });
      setTeamForm(initialTeamForm);
      await refreshProjectData();
      showToast({
        tone: "success",
        title: "Team created",
        description:
          "The new team is ready for member placement.",
      });
    } catch (createError) {
      const message =
        createError.response?.data
          ?.message ||
        "Unable to create this team.";
      setError(message);
      showToast({
        tone: "error",
        title:
          "Team creation failed",
        description: message,
      });
    } finally {
      setSavingTeam(false);
    }
  };

  const assignLeader = async (
    teamId,
    leaderId
  ) => {
    try {
      setAssigningLeaderId(
        `${teamId}:${leaderId}`
      );
      await AdminAPI.put(
        "/teams/assign-leader",
        {
          teamId,
          leaderId,
        }
      );
      await refreshProjectData();
      showToast({
        tone: "success",
        title:
          "Leader assigned",
        description:
          "Team leadership and membership records are now synced.",
      });
    } catch (assignError) {
      const message =
        assignError.response?.data
          ?.message ||
        "Unable to assign this leader.";
      setError(message);
      showToast({
        tone: "error",
        title:
          "Leader assignment blocked",
        description: message,
      });
    } finally {
      setAssigningLeaderId("");
    }
  };

  return (
    <PageShell>
      <PageHeader
        badge="Team structure"
        title="Teams and leaders"
        description="Create teams inside assignment-ready projects, then appoint leaders with capacity checks and synced roster updates."
      />

      {error && (
        <InlineMessage tone="error">
          {error}
        </InlineMessage>
      )}

      <Card className="p-5 sm:p-6">
        <SectionHeader
          badge="Active project"
          badgeTone="default"
          title="Choose a delivery workspace"
          description="Switch projects here before shaping teams or assigning leaders."
          className="mb-5 block"
        />
        <label className="block max-w-xl">
          <FieldLabel>
            Active project
          </FieldLabel>
          <Select
            value={selectedProject}
            onChange={(event) =>
              setSelectedProject(
                event.target.value
              )
            }
            disabled={projectLoading}
          >
            <option value="">
              Select a delivery project
            </option>
            {projects.map((project) => (
              <option
                key={project._id}
                value={project._id}
              >
                {project.title}
              </option>
            ))}
          </Select>
        </label>
      </Card>

      <Card
        strong
        className="p-6 sm:p-8"
      >
        <h2 className="text-2xl font-semibold text-[var(--soc-ink)]">
          Create a team
        </h2>
        <form
          onSubmit={createTeam}
          className="mt-6 space-y-6"
        >
          <div className="grid gap-5 md:grid-cols-3">
            <label className="block">
              <FieldLabel>
                Team name
              </FieldLabel>
              <Input
                type="text"
                value={teamForm.name}
                onChange={(event) =>
                  setTeamForm((current) => ({
                    ...current,
                    name:
                      event.target.value,
                  }))
                }
                placeholder="Blue Orbit"
              />
            </label>

            <label className="block">
              <FieldLabel>
                Focus area
              </FieldLabel>
              <Input
                type="text"
                value={teamForm.focus}
                onChange={(event) =>
                  setTeamForm((current) => ({
                    ...current,
                    focus:
                      event.target.value,
                  }))
                }
                placeholder="Design systems, infra, QA"
              />
            </label>

            <label className="block">
              <FieldLabel>
                Capacity
              </FieldLabel>
              <Input
                type="number"
                min="1"
                value={teamForm.capacity}
                onChange={(event) =>
                  setTeamForm((current) => ({
                    ...current,
                    capacity:
                      event.target.value,
                  }))
                }
              />
            </label>
          </div>

          <Button
            type="submit"
            loading={savingTeam}
            disabled={!selectedProject}
          >
            {savingTeam
              ? "Creating..."
              : "Create team"}
          </Button>
        </form>
      </Card>

      {projectLoading ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {Array.from({
            length: 4,
          }).map((_, index) => (
            <Card
              key={index}
              className="soc-skeleton h-72"
            />
          ))}
        </div>
      ) : error &&
        projects.length === 0 ? (
        <EmptyState
          title="Leader tools unavailable"
          description="We could not load delivery projects for team setup right now."
          action={{
            label: "Try again",
            onClick: fetchProjects,
          }}
        />
      ) : projects.length === 0 ? (
        <EmptyState
          title="No delivery projects yet"
          description="Create or publish at least one non-showcase project before forming teams and assigning leaders."
          action={{
            label: "Refresh projects",
            onClick: fetchProjects,
            variant:
              "secondary",
          }}
        />
      ) : !selectedProject ? (
        <EmptyState
          title="Pick a delivery project"
          description="Choose a non-showcase project above to start shaping its teams."
        />
      ) : rosterLoading ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {Array.from({
            length: 4,
          }).map((_, index) => (
            <Card
              key={index}
              className="soc-skeleton h-72"
            />
          ))}
        </div>
      ) : error &&
        teams.length === 0 ? (
        <EmptyState
          title="Project roster unavailable"
          description="We could not load the team and member data for this project."
          action={{
            label: "Try again",
            onClick: () =>
              fetchSelectedProjectData(),
          }}
        />
      ) : teams.length === 0 ? (
        <EmptyState
          title="No teams created yet"
          description="Create the first team for this project to start assigning leaders."
        />
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {teams.map((team) => (
            <Card
              key={team._id}
              className="p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-[var(--soc-ink)]">
                    {team.name}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--soc-text-muted)]">
                    {team.focus ||
                      "No focus note yet."}
                  </p>
                </div>
                <Badge tone="default">
                  {team.members.length}/
                  {team.capacity}
                </Badge>
              </div>

              <Card className="mt-5 p-4">
                <p className="text-sm text-[var(--soc-text-muted)]">
                  Current leader
                </p>
                <h3 className="mt-2 text-lg font-semibold text-[var(--soc-ink)]">
                  {team.leader?.name ||
                    "Not assigned"}
                </h3>
                {team.leader?.email && (
                  <p className="mt-1 text-sm text-[var(--soc-text-muted)]">
                    {team.leader.email}
                  </p>
                )}
              </Card>

              <div className="mt-5 space-y-3">
                <FieldLabel>
                  Assign leader
                </FieldLabel>
                {members.length === 0 ? (
                  <InlineMessage tone="warning">
                    No active members are assigned to this project yet.
                  </InlineMessage>
                ) : (
                  members.map((member) => (
                    <div
                      key={member._id}
                      className="flex flex-col gap-3 rounded-[1.5rem] border border-[var(--soc-border-soft)] bg-[var(--soc-surface-cool)] p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="text-sm font-semibold text-[var(--soc-ink)]">
                          {member.user?.name}
                        </p>
                        <p className="text-sm text-[var(--soc-text-muted)]">
                          {member.user?.email}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {member.roles?.map(
                            (role) => (
                              <Badge
                                key={role}
                                tone="default"
                              >
                                {role.replaceAll(
                                  "-",
                                  " "
                                )}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>

                      <Button
                        type="button"
                        size="sm"
                        variant={
                          team.leader?._id ===
                          member.user?._id
                            ? "success"
                            : "secondary"
                        }
                        loading={
                          assigningLeaderId ===
                          `${team._id}:${member.user?._id}`
                        }
                        onClick={() =>
                          assignLeader(
                            team._id,
                            member.user?._id
                          )
                        }
                      >
                        {team.leader?._id ===
                        member.user?._id
                          ? "Current leader"
                          : "Set as leader"}
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </PageShell>
  );
};

export default Leaders;
