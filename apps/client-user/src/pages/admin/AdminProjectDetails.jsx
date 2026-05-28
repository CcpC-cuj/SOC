import {
  useEffect,
  useEffectEvent,
  useState,
} from "react";
import { useParams } from "react-router-dom";

import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import EmptyState from "../../components/ui/EmptyState";
import {
  FieldLabel,
  InlineMessage,
  Textarea,
} from "../../components/ui/Field";
import {
  PageHeader,
  PageShell,
  SectionHeader,
} from "../../components/ui/PageChrome";
import { useToast } from "../../components/ui/ToastContext";
import {
  normalizeTaskStatus,
  submissionStatusLabels,
  taskStatusLabels,
  taskStatusTones,
} from "../../constants/workflow";
import { getApiErrorMessage } from "../../services/apiError";
import AdminAPI from "../../services/adminApi";

const AdminProjectDetails = () => {
  const { id } = useParams();
  const showToast = useToast();

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
  const [reviewRemarks, setReviewRemarks] =
    useState("");
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState("");
  const [reviewingStatus, setReviewingStatus] =
    useState("");

  const fetchProjectData = async () => {
    try {
      setLoading(true);
      setError("");
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
      setReviewRemarks(
        submissionResponse.data
          ?.remarks || ""
      );
    } catch (fetchError) {
      setProject(null);
      setMembers([]);
      setTasks([]);
      setSubmission(null);
      setTeams([]);
      setError(
        getApiErrorMessage(
          fetchError,
          "Unable to load this project workspace."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const loadAdminProjectDetails =
    useEffectEvent(() => {
      fetchProjectData();
    });

  useEffect(() => {
    const timer =
      window.setTimeout(() => {
        loadAdminProjectDetails();
      }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [id]);

  const reviewSubmission = async (
    status
  ) => {
    if (!submission) {
      return;
    }

    try {
      setReviewingStatus(status);
      const response =
        await AdminAPI.put(
          `/project-submissions/${submission._id}/review`,
          {
            status,
            remarks:
              reviewRemarks.trim(),
          }
        );

      setSubmission(
        response.data.submission
      );
      setProject(response.data.project);
      showToast({
        tone:
          status === "approved"
            ? "success"
            : "warning",
        title:
          status === "approved"
            ? "Submission approved"
            : "Submission rejected",
        description:
          status === "approved"
            ? "The project is now marked completed."
            : "The team can revise and resubmit the milestone.",
      });
    } catch (reviewError) {
      const message =
        reviewError.response?.data
          ?.message ||
        "Unable to review this submission.";
      showToast({
        tone: "error",
        title:
          "Submission review failed",
        description: message,
      });
    } finally {
      setReviewingStatus("");
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Card
          strong
          className="soc-skeleton h-64"
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {Array.from({
            length: 3,
          }).map((_, index) => (
            <Card
              key={index}
              className="soc-skeleton h-32"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <PageShell className="max-w-3xl">
        <InlineMessage tone="error">
          {error}
        </InlineMessage>
        <EmptyState
          title="Project unavailable"
          description="The project details could not be loaded for admin review."
          action={{
            label: "Try again",
            onClick: fetchProjectData,
          }}
        />
      </PageShell>
    );
  }

  if (!project) {
    return (
      <PageShell className="max-w-3xl">
        <EmptyState
          title="Project not found"
          description="There is no project data available for this admin view right now."
          action={{
            label: "Reload project",
            onClick: fetchProjectData,
            variant:
              "secondary",
          }}
        />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHeader
        badge="Project workspace"
        title={project.title}
        description={project.description}
        meta={
          <>
            {project.domain && (
              <Badge tone="info">
                {project.domain}
              </Badge>
            )}
            <Badge tone="accent">
              {project.session}
            </Badge>
            <Badge
              tone={
                project.isShowcase
                  ? "warning"
                  : "success"
              }
            >
              {project.isShowcase
                ? "Showcase"
                : "Delivery"}
            </Badge>
            <Badge tone="default">
              {project.status}
            </Badge>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {[
          {
            label: "Members",
            value: members.length,
          },
          {
            label: "Teams",
            value: teams.length,
          },
          {
            label: "Tasks",
            value: tasks.length,
          },
        ].map((item) => (
          <Card
            key={item.label}
            className="p-6"
          >
            <p className="text-sm text-[var(--soc-text-muted)]">
              {item.label}
            </p>
            <h2 className="mt-3 text-4xl font-semibold text-[var(--soc-ink)]">
              {item.value}
            </h2>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_1fr]">
        <div className="space-y-8">
          <Card className="p-7">
            <SectionHeader
              badge="Roster"
              badgeTone="default"
              title="Assigned members"
              description="Review the live project roster, team placement, and member roles."
              className="block"
            />
            <div className="mt-5 space-y-4">
              {members.map((member) => (
                <Card
                  key={member._id}
                  className="p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--soc-ink)]">
                        {member.user?.name}
                      </h3>
                      <p className="mt-1 text-sm text-[var(--soc-text-muted)]">
                        {member.user?.email}
                      </p>
                      {member.team?.name && (
                        <p className="mt-2 text-sm text-[var(--soc-text-muted)]">
                          Team{" "}
                          {member.team.name}
                        </p>
                      )}
                    </div>
                    {member.isLeader && (
                      <Badge tone="success">
                        Leader
                      </Badge>
                    )}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {member.roles?.map((role) => (
                      <Badge
                        key={role}
                        tone="default"
                      >
                        {role.replaceAll(
                          "-",
                          " "
                        )}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          <Card className="p-7">
            <h2 className="text-2xl font-semibold text-[var(--soc-ink)]">
              Teams
            </h2>
            <div className="mt-5 space-y-4">
              {teams.length === 0 ? (
                <EmptyState
                  title="No teams yet"
                  description="Team structure has not been created for this project."
                />
              ) : (
                teams.map((team) => (
                  <Card
                    key={team._id}
                    className="p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-[var(--soc-ink)]">
                          {team.name}
                        </h3>
                        <p className="mt-2 text-sm text-[var(--soc-text-muted)]">
                          {team.focus ||
                            "No focus note yet."}
                        </p>
                        <p className="mt-2 text-sm text-[var(--soc-text-muted)]">
                          Leader{" "}
                          {team.leader?.name ||
                            "Not assigned"}
                        </p>
                      </div>
                      <Badge tone="default">
                        {team.members.length}/
                        {team.capacity}
                      </Badge>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </Card>

          <Card className="p-7">
            <h2 className="text-2xl font-semibold text-[var(--soc-ink)]">
              Task board
            </h2>
            <div className="mt-5 space-y-4">
              {tasks.length === 0 ? (
                <EmptyState
                  title="No tasks yet"
                  description="Leaders have not created tasks for this project yet."
                />
              ) : (
                tasks.map((task) => {
                  const normalizedStatus =
                    normalizeTaskStatus(
                      task.status
                    );

                  return (
                    <Card
                      key={task._id}
                      className="p-5"
                    >
                      <div className="flex flex-wrap gap-2.5">
                        <Badge tone="default">
                          {task.taskType}
                        </Badge>
                        <Badge
                          tone={
                            taskStatusTones[
                              normalizedStatus
                            ] || "default"
                          }
                        >
                          {
                            taskStatusLabels[
                              normalizedStatus
                            ]
                          }
                        </Badge>
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-[var(--soc-ink)]">
                        {task.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-[var(--soc-text-muted)]">
                        {task.description}
                      </p>
                      <p className="mt-3 text-sm text-[var(--soc-text-muted)]">
                        Assigned to{" "}
                        <span className="text-[var(--soc-ink)]">
                          {
                            task.assignedTo
                              ?.name
                          }
                        </span>
                      </p>
                      {task.remarks && (
                        <InlineMessage
                          tone="info"
                          className="mt-4"
                        >
                          {task.remarks}
                        </InlineMessage>
                      )}
                    </Card>
                  );
                })
              )}
            </div>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold text-[var(--soc-ink)]">
                  Submission review
                </h2>
                <p className="mt-2 text-sm leading-7 text-[var(--soc-text-muted)]">
                  Review the latest milestone, track its revision history, and approve or send it back with clear remarks.
                </p>
              </div>
              {submission?.status && (
                <Badge
                  tone={
                    submission.status ===
                    "approved"
                      ? "success"
                      : submission.status ===
                          "rejected"
                        ? "danger"
                        : submission.status ===
                            "submitted"
                          ? "info"
                          : "default"
                  }
                >
                  {
                    submissionStatusLabels[
                      submission.status
                    ]
                  }
                </Badge>
              )}
            </div>

            {!submission ? (
              <div className="mt-6">
                <EmptyState
                  title="No submission yet"
                  description="The team has not saved a draft or submitted a milestone for review."
                />
              </div>
            ) : (
              <div className="mt-6 space-y-6">
                <Card className="p-5">
                  <div className="flex flex-wrap gap-2.5">
                    <Badge tone="default">
                      {
                        submission.milestoneLabel
                      }
                    </Badge>
                    {submission.submittedBy
                      ?.name && (
                      <Badge tone="accent">
                        {
                          submission
                            .submittedBy
                            .name
                        }
                      </Badge>
                    )}
                  </div>

                  <div className="mt-4 space-y-3">
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
                        (item) =>
                          item.href
                      )
                      .map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="block rounded-[1.35rem] border border-[var(--soc-border-soft)] bg-[var(--soc-surface-cool)] px-4 py-3 text-sm text-[var(--soc-teal)] transition hover:bg-white"
                        >
                          {item.label}
                        </a>
                      ))}
                  </div>

                  {submission.documentation && (
                    <Card className="mt-4 p-4">
                      <p className="text-sm leading-7 text-[var(--soc-text-muted)]">
                        {
                          submission.documentation
                        }
                      </p>
                    </Card>
                  )}
                </Card>

                <label className="block">
                  <FieldLabel>
                    Review remarks
                  </FieldLabel>
                  <Textarea
                    rows="4"
                    value={reviewRemarks}
                    onChange={(event) =>
                      setReviewRemarks(
                        event.target.value
                      )
                    }
                    placeholder="Explain why this milestone is ready or what needs to change before approval."
                  />
                </label>

                <div className="flex flex-wrap gap-3">
                  <Button
                    type="button"
                    variant="success"
                    loading={
                      reviewingStatus ===
                      "approved"
                    }
                    disabled={
                      submission.status ===
                      "approved"
                    }
                    onClick={() =>
                      reviewSubmission(
                        "approved"
                      )
                    }
                  >
                    Approve project
                  </Button>

                  <Button
                    type="button"
                    variant="danger"
                    loading={
                      reviewingStatus ===
                      "rejected"
                    }
                    disabled={
                      submission.status ===
                      "approved"
                    }
                    onClick={() =>
                      reviewSubmission(
                        "rejected"
                      )
                    }
                  >
                    Request changes
                  </Button>
                </div>

                {submission.revisions
                  ?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--soc-ink)]">
                      Revisions
                    </h3>
                    <div className="mt-4 space-y-3">
                      {submission.revisions
                        .slice()
                        .reverse()
                        .map(
                          (
                            revision,
                            index
                          ) => (
                            <Card
                              key={`${revision.savedAt}-${index}`}
                              className="p-4"
                            >
                              <div className="flex flex-wrap gap-2.5">
                                <Badge
                                  tone={
                                    revision.mode ===
                                    "submitted"
                                      ? "info"
                                      : "default"
                                  }
                                >
                                  {
                                    submissionStatusLabels[
                                      revision.mode
                                    ]
                                  }
                                </Badge>
                                <Badge tone="default">
                                  {
                                    revision.milestoneLabel
                                  }
                                </Badge>
                              </div>
                              <p className="mt-3 text-sm text-[var(--soc-text-muted)]">
                                Saved by{" "}
                                <span className="text-[var(--soc-ink)]">
                                  {revision
                                    .savedBy
                                    ?.name ||
                                    "Unknown"}
                                </span>{" "}
                                on{" "}
                                {new Date(
                                  revision.savedAt
                                ).toLocaleString()}
                              </p>
                            </Card>
                          )
                        )}
                    </div>
                  </div>
                )}

                {submission.statusHistory
                  ?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--soc-ink)]">
                      Status history
                    </h3>
                    <div className="mt-4 space-y-3">
                      {submission.statusHistory
                        .slice()
                        .reverse()
                        .map(
                          (
                            entry,
                            index
                          ) => (
                            <Card
                              key={`${entry.status}-${entry.changedAt}-${index}`}
                              className="p-4"
                            >
                              <div className="flex flex-wrap gap-2.5">
                                <Badge
                                  tone={
                                    entry.status ===
                                    "approved"
                                      ? "success"
                                      : entry.status ===
                                          "rejected"
                                        ? "danger"
                                        : entry.status ===
                                            "submitted"
                                          ? "info"
                                          : "default"
                                  }
                                >
                                  {
                                    submissionStatusLabels[
                                      entry.status
                                    ]
                                  }
                                </Badge>
                                {entry.changedBy
                                  ?.name && (
                                  <Badge tone="default">
                                    {
                                      entry
                                        .changedBy
                                        .name
                                    }
                                  </Badge>
                                )}
                              </div>
                              <p className="mt-3 text-sm leading-7 text-[var(--soc-text-muted)]">
                                {entry.remarks ||
                                  "Status updated."}
                              </p>
                            </Card>
                          )
                        )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
      </div>
    </PageShell>
  );
};

export default AdminProjectDetails;
