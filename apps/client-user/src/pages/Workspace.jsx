import {
  useEffect,
  useEffectEvent,
  useState,
} from "react";
import {
  MessageSquare,
  Send,
} from "lucide-react";
import { useParams } from "react-router-dom";

import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import EmptyState from "../components/ui/EmptyState";
import {
  FieldLabel,
  InlineMessage,
  Input,
  Select,
  Textarea,
} from "../components/ui/Field";
import {
  PageHeader,
  PageShell,
  SectionHeader,
} from "../components/ui/PageChrome";
import { useToast } from "../components/ui/ToastContext";
import {
  getAllowedTaskTransitions,
  getAllowedSubmissionModes,
  isProjectWorkspaceReadOnly,
  isProjectWorkspaceWritable,
  normalizeTaskStatus,
  submissionStatusLabels,
  taskStatusLabels,
  taskStatusTones,
} from "../constants/workflow";
import API from "../services/api";
import {
  getStoredUser,
} from "../services/authStorage";
import { getApiErrorMessage } from "../services/apiError";

const initialTaskForm = {
  title: "",
  description: "",
  assignedTo: "",
  taskType: "feature",
  deadline: "",
};

const initialSubmission = {
  milestoneLabel:
    "Final delivery",
  githubRepo: "",
  deploymentLink: "",
  pptLink: "",
  demoVideo: "",
  documentation: "",
};

const mergeTaskDrafts = (
  taskList,
  currentDrafts = {}
) => {
  const next = {
    ...currentDrafts,
  };

  taskList.forEach((task) => {
    next[task._id] = {
      status:
        next[task._id]?.status ||
        normalizeTaskStatus(
          task.status
        ),
      submissionLink:
        next[task._id]
          ?.submissionLink || "",
      note:
        next[task._id]?.note ||
        task.remarks ||
        "",
      comment:
        next[task._id]?.comment || "",
    };
  });

  return next;
};

const Workspace = () => {
  const { id } = useParams();
  const showToast = useToast();

  const [project, setProject] =
    useState(null);
  const [members, setMembers] =
    useState([]);
  const [tasks, setTasks] =
    useState([]);
  const [submission, setSubmission] =
    useState(null);
  const [submissionForm, setSubmissionForm] =
    useState(initialSubmission);
  const [taskForm, setTaskForm] =
    useState(initialTaskForm);
  const [taskDrafts, setTaskDrafts] =
    useState({});
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState("");
  const [creatingTask, setCreatingTask] =
    useState(false);
  const [updatingTaskId, setUpdatingTaskId] =
    useState("");
  const [commentingTaskId, setCommentingTaskId] =
    useState("");
  const [savingSubmissionMode, setSavingSubmissionMode] =
    useState("");

  const user = getStoredUser();

  const fetchWorkspaceData = async () => {
    try {
      setLoading(true);
      setError("");
      const [
        projectResponse,
        membersResponse,
        tasksResponse,
        submissionResponse,
      ] = await Promise.all([
        API.get(`/projects/${id}`),
        API.get(
          `/project-members/${id}`
        ),
        API.get(
          `/tasks/project/${id}`
        ),
        API.get(
          `/project-submissions/${id}`
        ),
      ]);

      const nextSubmission =
        submissionResponse.data;

      setProject(projectResponse.data);
      setMembers(membersResponse.data);
      setTasks(tasksResponse.data);
      setTaskDrafts((current) =>
        mergeTaskDrafts(
          tasksResponse.data,
          current
        )
      );
      setSubmission(nextSubmission);
      setSubmissionForm(
        nextSubmission
          ? {
              milestoneLabel:
                nextSubmission.milestoneLabel ||
                "Final delivery",
              githubRepo:
                nextSubmission.githubRepo ||
                "",
              deploymentLink:
                nextSubmission.deploymentLink ||
                "",
              pptLink:
                nextSubmission.pptLink ||
                "",
              demoVideo:
                nextSubmission.demoVideo ||
                "",
              documentation:
                nextSubmission.documentation ||
                "",
            }
          : initialSubmission
      );
    } catch (fetchError) {
      setError(
        getApiErrorMessage(
          fetchError,
          "Unable to load this workspace right now."
        )
      );
      setProject(null);
    } finally {
      setLoading(false);
    }
  };

  const loadWorkspaceForProject =
    useEffectEvent(() => {
      fetchWorkspaceData();
    });

  useEffect(() => {
    const timer =
      window.setTimeout(() => {
        loadWorkspaceForProject();
      }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [id]);

  const currentMembership =
    members.find(
      (member) =>
        member.user?._id ===
        user?._id
    );
  const isLeader =
    Boolean(
      currentMembership?.isLeader
    );
  const isCompleted =
    project?.status === "completed";
  const isWorkspaceReadOnly =
    isProjectWorkspaceReadOnly(
      project
    );
  const isWorkspaceWritable =
    isProjectWorkspaceWritable(
      project
    );
  const allowedSubmissionModes =
    getAllowedSubmissionModes(
      submission?.status
    );
  const canEditSubmission =
    isWorkspaceWritable &&
    allowedSubmissionModes.length > 0;

  const refreshSubmission = async () => {
    const response =
      await API.get(
        `/project-submissions/${id}`
      );
    setSubmission(response.data);
  };

  const handleTaskCreate = async (
    event
  ) => {
    event.preventDefault();

    try {
      setCreatingTask(true);
      const response =
        await API.post("/tasks", {
          ...taskForm,
          projectId: id,
        });
      setTaskForm(initialTaskForm);
      const nextTasks = [
        response.data,
        ...tasks,
      ];
      setTasks(nextTasks);
      setTaskDrafts((current) =>
        mergeTaskDrafts(
          nextTasks,
          current
        )
      );
      showToast({
        tone: "success",
        title: "Task created",
        description:
          "The new task is now visible to the team.",
      });
    } catch (createError) {
      const message =
        createError.response?.data
          ?.message ||
        "Unable to create this task.";
      showToast({
        tone: "error",
        title:
          "Task creation failed",
        description: message,
      });
    } finally {
      setCreatingTask(false);
    }
  };

  const updateTaskStatus = async (
    taskId
  ) => {
    const draft = taskDrafts[taskId];

    try {
      setUpdatingTaskId(taskId);
      const response =
        await API.put(
          `/tasks/${taskId}/status`,
          {
            status: draft.status,
            submissionLink:
              draft.submissionLink,
            note: draft.note,
          }
        );
      const nextTasks = tasks.map(
        (task) =>
          task._id === taskId
            ? response.data
            : task
      );
      setTasks(nextTasks);
      setTaskDrafts((current) => {
        const merged =
          mergeTaskDrafts(
            nextTasks,
            current
          );

        return {
          ...merged,
          [taskId]: {
            ...merged[taskId],
            submissionLink: "",
            comment:
              current[taskId]
                ?.comment || "",
          },
        };
      });
      showToast({
        tone: "success",
        title:
          "Task updated",
        description:
          "The task status has been saved.",
      });
    } catch (updateError) {
      const message =
        updateError.response?.data
          ?.message ||
        "Unable to update this task.";
      showToast({
        tone: "error",
        title:
          "Task update failed",
        description: message,
      });
    } finally {
      setUpdatingTaskId("");
    }
  };

  const addTaskComment = async (
    taskId
  ) => {
    const message =
      taskDrafts[taskId]?.comment?.trim();

    if (!message) {
      showToast({
        tone: "warning",
        title:
          "Comment required",
        description:
          "Write a quick comment before posting it.",
      });
      return;
    }

    try {
      setCommentingTaskId(taskId);
      const response =
        await API.post(
          `/tasks/${taskId}/comments`,
          {
            message,
          }
        );
      const nextTasks = tasks.map(
        (task) =>
          task._id === taskId
            ? response.data
            : task
      );
      setTasks(nextTasks);
      setTaskDrafts((current) => {
        const merged =
          mergeTaskDrafts(
            nextTasks,
            current
          );

        return {
          ...merged,
          [taskId]: {
            ...merged[taskId],
            comment: "",
          },
        };
      });
      showToast({
        tone: "success",
        title:
          "Comment added",
        description:
          "The task discussion has been updated.",
      });
    } catch (commentError) {
      const message =
        commentError.response?.data
          ?.message ||
        "Unable to add this comment.";
      showToast({
        tone: "error",
        title:
          "Comment failed",
        description: message,
      });
    } finally {
      setCommentingTaskId("");
    }
  };

  const submitProject = async (
    mode
  ) => {
    try {
      setSavingSubmissionMode(mode);
      const response =
        await API.post(
          "/project-submissions",
          {
            projectId: id,
            ...submissionForm,
            mode,
          }
        );
      setSubmission(
        response.data.submission
      );
      showToast({
        tone:
          mode === "submitted"
            ? "success"
            : "info",
        title:
          mode === "submitted"
            ? "Submission sent"
            : "Draft saved",
        description:
          response.data.message,
      });
      await refreshSubmission();
    } catch (submitError) {
      const message =
        submitError.response?.data
          ?.message ||
        "Unable to save this submission.";
      showToast({
        tone: "error",
        title:
          "Submission failed",
        description: message,
      });
    } finally {
      setSavingSubmissionMode("");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <PageShell>
          <Card
            strong
            className="soc-skeleton h-64"
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <Card
              className="soc-skeleton h-80"
            />
            <Card
              className="soc-skeleton h-80"
            />
          </div>
        </PageShell>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <PageShell className="max-w-3xl">
          <InlineMessage tone="error">
            {error}
          </InlineMessage>
          <EmptyState
            title="Workspace unavailable"
            description="This project may no longer be accessible to your account, or the workspace data could not be loaded."
            action={{
              label: "Try again",
              onClick:
                fetchWorkspaceData,
            }}
          />
        </PageShell>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen">
        <PageShell className="max-w-3xl">
          <EmptyState
            title="Project not available"
            description="We could not find a workspace for this project right now."
            action={{
              label: "Reload",
              onClick:
                fetchWorkspaceData,
            }}
          />
        </PageShell>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <PageShell>
        {isWorkspaceReadOnly && (
          <InlineMessage tone="success">
            This workspace is read-only right now, so team edits are locked until the project is reopened.
          </InlineMessage>
        )}

        {project && (
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
                {currentMembership?.team
                  ?.name && (
                  <Badge tone="accent">
                    Team{" "}
                    {
                      currentMembership
                        .team.name
                    }
                  </Badge>
                )}
                <Badge
                  tone={
                    isCompleted
                      ? "success"
                      : "default"
                  }
                >
                  {project.status}
                </Badge>
              </>
            }
            aside={
              <Card className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--soc-text-muted)]">
                  Workspace mode
                </p>
                <p className="mt-3 text-lg font-semibold text-[var(--soc-ink)]">
                  {isWorkspaceWritable
                    ? "Active and editable"
                    : "Read-only"}
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--soc-text-muted)]">
                  {isWorkspaceWritable
                    ? "Tasks, comments, and milestone drafts are open to the team."
                    : "Activity stays visible, but progress changes are locked."}
                </p>
              </Card>
            }
          />
        )}

        <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-8">
            <Card className="p-7">
              <SectionHeader
                badge="People"
                badgeTone="default"
                title="Team members"
                description="See who is working in this delivery space and how each member is positioned."
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
                        {member.team?.name && (
                          <p className="mt-2 text-sm text-[var(--soc-text-muted)]">
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

            {isLeader &&
              isWorkspaceWritable && (
              <Card className="p-7">
                <SectionHeader
                  badge="Leader tools"
                  badgeTone="info"
                  title="Create task"
                  description="Turn the next piece of delivery work into a clear, assigned task."
                />
                <form
                  onSubmit={handleTaskCreate}
                  className="mt-5 space-y-5"
                >
                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="block">
                      <FieldLabel>
                        Title
                      </FieldLabel>
                      <Input
                        type="text"
                        value={
                          taskForm.title
                        }
                        onChange={(
                          event
                        ) =>
                          setTaskForm(
                            (
                              current
                            ) => ({
                              ...current,
                              title:
                                event
                                  .target
                                  .value,
                            })
                          )
                        }
                        placeholder="Design the handoff flow"
                      />
                    </label>

                    <label className="block">
                      <FieldLabel>
                        Assign to
                      </FieldLabel>
                      <Select
                        value={
                          taskForm.assignedTo
                        }
                        onChange={(
                          event
                        ) =>
                          setTaskForm(
                            (
                              current
                            ) => ({
                              ...current,
                              assignedTo:
                                event
                                  .target
                                  .value,
                            })
                          )
                        }
                      >
                        <option value="">
                          Select a member
                        </option>
                        {members.map(
                          (member) => (
                            <option
                              key={member._id}
                              value={
                                member.user?._id
                              }
                            >
                              {
                                member.user
                                  ?.name
                              }
                            </option>
                          )
                        )}
                      </Select>
                    </label>

                    <label className="block">
                      <FieldLabel>
                        Task type
                      </FieldLabel>
                      <Select
                        value={
                          taskForm.taskType
                        }
                        onChange={(
                          event
                        ) =>
                          setTaskForm(
                            (
                              current
                            ) => ({
                              ...current,
                              taskType:
                                event
                                  .target
                                  .value,
                            })
                          )
                        }
                      >
                        {[
                          "feature",
                          "bug-fix",
                          "research",
                          "design",
                          "documentation",
                          "testing",
                        ].map((type) => (
                          <option
                            key={type}
                            value={type}
                          >
                            {type}
                          </option>
                        ))}
                      </Select>
                    </label>

                    <label className="block">
                      <FieldLabel>
                        Deadline
                      </FieldLabel>
                      <Input
                        type="date"
                        value={
                          taskForm.deadline
                        }
                        onChange={(
                          event
                        ) =>
                          setTaskForm(
                            (
                              current
                            ) => ({
                              ...current,
                              deadline:
                                event
                                  .target
                                  .value,
                            })
                          )
                        }
                      />
                    </label>
                  </div>

                  <label className="block">
                    <FieldLabel>
                      Description
                    </FieldLabel>
                    <Textarea
                      rows="4"
                      value={
                        taskForm.description
                      }
                      onChange={(
                        event
                      ) =>
                        setTaskForm(
                          (
                            current
                          ) => ({
                            ...current,
                            description:
                              event.target
                                .value,
                          })
                        )
                      }
                      placeholder="Describe the expected outcome, acceptance criteria, and useful context."
                    />
                  </label>

                  <Button
                    type="submit"
                    loading={creatingTask}
                  >
                    {creatingTask
                      ? "Creating..."
                      : "Create task"}
                  </Button>
                </form>
              </Card>
            )}
          </div>

          <div className="space-y-8">
            <Card className="p-7">
              <SectionHeader
                badge="Delivery board"
                badgeTone="default"
                title="Tasks"
                description="Track progress, post context, and keep reviews moving without leaving the workspace."
              />
              <div className="mt-5 space-y-5">
                {tasks.length === 0 ? (
                  <EmptyState
                    title="No tasks yet"
                    description="Once a leader creates work items, they will show up here with progress states and discussion."
                  />
                ) : (
                  tasks.map((task) => {
                    const normalizedStatus =
                      normalizeTaskStatus(
                        task.status
                      );
                    const canUpdate =
                      task.assignedTo?._id ===
                        user?._id &&
                      isWorkspaceWritable;
                    const transitions =
                      getAllowedTaskTransitions(
                        normalizedStatus,
                        "member"
                      );
                    const statusOptions = [
                      normalizedStatus,
                      ...transitions.filter(
                        (status) =>
                          status !==
                          normalizedStatus
                      ),
                    ];

                    return (
                      <Card
                        key={task._id}
                        className="p-6"
                      >
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                          <div>
                            <div className="flex flex-wrap gap-2.5">
                              <Badge tone="default">
                                {task.taskType}
                              </Badge>
                              <Badge
                                tone={
                                  taskStatusTones[
                                    normalizedStatus
                                  ] ||
                                  "default"
                                }
                              >
                                {
                                  taskStatusLabels[
                                    normalizedStatus
                                  ]
                                }
                              </Badge>
                            </div>
                            <h3 className="mt-4 text-xl font-semibold text-[var(--soc-ink)]">
                              {task.title}
                            </h3>
                            <p className="mt-3 text-sm leading-7 text-[var(--soc-text-muted)]">
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
                          </div>
                        </div>

                        {task.submissionLinks
                          ?.length > 0 && (
                          <div className="mt-5 space-y-3">
                            {task.submissionLinks.map(
                              (
                                link,
                                index
                              ) => (
                                <a
                                  key={`${link.url}-${index}`}
                                  href={link.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="block rounded-[1.25rem] border border-[var(--soc-border-soft)] bg-[var(--soc-surface-cool)] px-4 py-3 text-sm text-[var(--soc-teal)] transition hover:bg-white"
                                >
                                  {link.title}
                                </a>
                              )
                            )}
                          </div>
                        )}

                        {task.remarks && (
                          <InlineMessage
                            tone="info"
                            className="mt-5"
                          >
                            {task.remarks}
                          </InlineMessage>
                        )}

                        {canUpdate && (
                            <div className="mt-5 space-y-4">
                              {statusOptions.length >
                                1 ? (
                                <>
                                  <div className="grid gap-4 md:grid-cols-2">
                                    <label className="block">
                                      <FieldLabel>
                                        Status
                                      </FieldLabel>
                                      <Select
                                        value={
                                          taskDrafts[
                                            task._id
                                          ]
                                            ?.status ||
                                          normalizedStatus
                                        }
                                        onChange={(
                                          event
                                        ) =>
                                          setTaskDrafts(
                                            (
                                              current
                                            ) => ({
                                              ...current,
                                              [task._id]:
                                                {
                                                  ...current[
                                                    task._id
                                                  ],
                                                  status:
                                                    event
                                                      .target
                                                      .value,
                                                },
                                            })
                                          )
                                        }
                                      >
                                        {statusOptions.map(
                                          (
                                            status
                                          ) => (
                                            <option
                                              key={status}
                                              value={
                                                status
                                              }
                                            >
                                              {
                                                taskStatusLabels[
                                                  status
                                                ]
                                              }
                                            </option>
                                          )
                                        )}
                                      </Select>
                                    </label>

                                    <label className="block">
                                      <FieldLabel>
                                        Optional proof link
                                      </FieldLabel>
                                      <Input
                                        type="text"
                                        value={
                                          taskDrafts[
                                            task._id
                                          ]
                                            ?.submissionLink ||
                                          ""
                                        }
                                        onChange={(
                                          event
                                        ) =>
                                          setTaskDrafts(
                                            (
                                              current
                                            ) => ({
                                              ...current,
                                              [task._id]:
                                                {
                                                  ...current[
                                                    task._id
                                                  ],
                                                  submissionLink:
                                                    event
                                                      .target
                                                      .value,
                                                },
                                            })
                                          )
                                        }
                                        placeholder="GitHub PR, Figma file, Loom demo"
                                      />
                                    </label>
                                  </div>

                                  <label className="block">
                                    <FieldLabel>
                                      Status note
                                    </FieldLabel>
                                    <Textarea
                                      rows="3"
                                      value={
                                        taskDrafts[
                                          task._id
                                        ]
                                          ?.note ||
                                        ""
                                      }
                                      onChange={(
                                        event
                                      ) =>
                                        setTaskDrafts(
                                          (
                                            current
                                          ) => ({
                                            ...current,
                                            [task._id]:
                                              {
                                                ...current[
                                                  task._id
                                                ],
                                                note:
                                                  event
                                                    .target
                                                    .value,
                                              },
                                          })
                                        )
                                      }
                                      placeholder="Share what changed, what is blocked, or what should be reviewed."
                                    />
                                  </label>

                                  <Button
                                    type="button"
                                    loading={
                                      updatingTaskId ===
                                      task._id
                                    }
                                    onClick={() =>
                                      updateTaskStatus(
                                        task._id
                                      )
                                    }
                                  >
                                    Save task update
                                  </Button>
                                </>
                              ) : (
                                <InlineMessage tone="info">
                                  This task is waiting for admin review or is already finalized.
                                </InlineMessage>
                              )}
                            </div>
                          )}

                        {!canUpdate &&
                          !isWorkspaceReadOnly &&
                          task.assignedTo?._id !==
                            user?._id && (
                            <InlineMessage
                              tone="info"
                              className="mt-5"
                            >
                              Only the assigned member can update this task&apos;s progress. Leaders can coordinate through comments instead.
                            </InlineMessage>
                          )}

                        <div className="mt-5 space-y-4">
                          <label className="block">
                            <FieldLabel>
                              Add comment
                            </FieldLabel>
                            <Textarea
                              rows="3"
                              value={
                                taskDrafts[
                                  task._id
                                ]?.comment ||
                                ""
                              }
                              onChange={(
                                event
                              ) =>
                                setTaskDrafts(
                                  (current) => ({
                                    ...current,
                                    [task._id]:
                                      {
                                        ...current[
                                          task._id
                                        ],
                                        comment:
                                          event
                                            .target
                                            .value,
                                      },
                                  })
                                )
                              }
                              placeholder="Share context, blockers, or review notes with the team."
                              disabled={
                                isWorkspaceReadOnly
                              }
                            />
                          </label>

                          <Button
                            type="button"
                            variant="secondary"
                            loading={
                              commentingTaskId ===
                              task._id
                            }
                            disabled={
                              isWorkspaceReadOnly
                            }
                            onClick={() =>
                              addTaskComment(
                                task._id
                              )
                            }
                          >
                            <MessageSquare
                              size={16}
                            />
                            Post comment
                          </Button>
                        </div>

                        {task.comments?.length >
                          0 && (
                          <div className="mt-5 space-y-3">
                            {task.comments
                              .slice(-3)
                              .reverse()
                              .map(
                                (
                                  comment
                                ) => (
                                  <Card
                                    key={
                                      comment._id
                                    }
                                    className="p-4"
                                  >
                                    <p className="text-sm font-semibold text-[var(--soc-ink)]">
                                      {comment
                                        .author
                                        ?.name ||
                                        "Unknown"}
                                    </p>
                                    <p className="mt-2 text-sm leading-7 text-[var(--soc-text-muted)]">
                                      {
                                        comment.message
                                      }
                                    </p>
                                  </Card>
                                )
                              )}
                          </div>
                        )}

                        {task.activity?.length >
                          0 && (
                          <div className="mt-5 space-y-3">
                            {task.activity
                              .slice(-4)
                              .reverse()
                              .map(
                                (
                                  entry,
                                  index
                                ) => (
                                  <Card
                                    key={`${entry.type}-${entry.createdAt}-${index}`}
                                    className="p-4"
                                  >
                                    <p className="text-sm font-semibold text-[var(--soc-ink)]">
                                      {entry
                                        .actor
                                        ?.name ||
                                        "System"}
                                    </p>
                                    <p className="mt-2 text-sm leading-7 text-[var(--soc-text-muted)]">
                                      {entry.message ||
                                        "Activity recorded."}
                                    </p>
                                  </Card>
                                )
                              )}
                          </div>
                        )}
                      </Card>
                    );
                  })
                )}
              </div>
            </Card>

            {isLeader && (
              <Card className="p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <SectionHeader
                    badge="Milestone review"
                    badgeTone="info"
                    title="Submission workspace"
                    description="Save drafts while work is active, then send one clean milestone for review."
                    className="block"
                  />

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

                {submission?.remarks && (
                  <InlineMessage
                    tone={
                      submission.status ===
                      "rejected"
                        ? "warning"
                        : "info"
                    }
                    className="mt-5"
                  >
                    {submission.remarks}
                  </InlineMessage>
                )}

                {!isWorkspaceWritable && (
                  <InlineMessage
                    tone="info"
                    className="mt-5"
                  >
                    Submission edits are only available while the project workspace is active.
                  </InlineMessage>
                )}

                {isWorkspaceWritable &&
                  submission?.status ===
                    "submitted" && (
                    <InlineMessage
                      tone="info"
                      className="mt-5"
                    >
                      This milestone is submitted and locked while admin review is pending.
                    </InlineMessage>
                  )}

                <div className="mt-6 space-y-5">
                  <label className="block">
                    <FieldLabel>
                      Milestone label
                    </FieldLabel>
                    <Input
                      type="text"
                      value={
                        submissionForm.milestoneLabel
                      }
                      onChange={(
                        event
                      ) =>
                        setSubmissionForm(
                          (
                            current
                          ) => ({
                            ...current,
                            milestoneLabel:
                              event
                                .target
                                .value,
                          })
                        )
                      }
                      disabled={
                        !canEditSubmission
                      }
                    />
                  </label>

                  <div className="grid gap-5 md:grid-cols-2">
                    {[
                      {
                        field:
                          "githubRepo",
                        label:
                          "GitHub repository",
                      },
                      {
                        field:
                          "deploymentLink",
                        label:
                          "Deployment link",
                      },
                      {
                        field: "pptLink",
                        label:
                          "Slides / PPT",
                      },
                      {
                        field:
                          "demoVideo",
                        label:
                          "Demo video",
                      },
                    ].map((item) => (
                      <label
                        key={item.field}
                        className="block"
                      >
                        <FieldLabel>
                          {item.label}
                        </FieldLabel>
                        <Input
                          type="text"
                          value={
                            submissionForm[
                              item.field
                            ]
                          }
                          onChange={(
                            event
                          ) =>
                            setSubmissionForm(
                              (
                                current
                          ) => ({
                                ...current,
                                [item.field]:
                                  event
                                    .target
                                    .value,
                              })
                            )
                          }
                          disabled={
                            !canEditSubmission
                          }
                        />
                      </label>
                    ))}
                  </div>

                  <label className="block">
                    <FieldLabel>
                      Documentation summary
                    </FieldLabel>
                    <Textarea
                      rows="5"
                      value={
                        submissionForm.documentation
                      }
                      onChange={(
                        event
                      ) =>
                        setSubmissionForm(
                          (
                            current
                          ) => ({
                            ...current,
                            documentation:
                              event.target
                                .value,
                          })
                        )
                      }
                      disabled={
                        !canEditSubmission
                      }
                      placeholder="Capture the delivery, key decisions, setup notes, and anything reviewers should know."
                    />
                  </label>

                  <div className="flex flex-wrap gap-3">
                    <Button
                      type="button"
                      variant="secondary"
                      loading={
                        savingSubmissionMode ===
                        "draft"
                      }
                      disabled={
                        !isWorkspaceWritable ||
                        !allowedSubmissionModes.includes(
                          "draft"
                        )
                      }
                      onClick={() =>
                        submitProject(
                          "draft"
                        )
                      }
                    >
                      Save draft
                    </Button>
                    <Button
                      type="button"
                      loading={
                        savingSubmissionMode ===
                        "submitted"
                      }
                      disabled={
                        !isWorkspaceWritable ||
                        !allowedSubmissionModes.includes(
                          "submitted"
                        )
                      }
                      onClick={() =>
                        submitProject(
                          "submitted"
                        )
                      }
                    >
                      <Send size={16} />
                      Submit for review
                    </Button>
                  </div>
                </div>

                {submission?.revisions
                  ?.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-[var(--soc-ink)]">
                      Revision history
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
                              <div className="flex flex-wrap items-center gap-2.5">
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

                {submission?.statusHistory
                  ?.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-[var(--soc-ink)]">
                      Review history
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
                              <div className="flex flex-wrap items-center gap-2.5">
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
              </Card>
            )}
          </div>
        </div>
      </PageShell>
    </div>
  );
};

export default Workspace;
