import {
  useEffect,
  useEffectEvent,
  useState,
} from "react";
import {
  CheckCircle2,
  ClipboardList,
  RotateCcw,
} from "lucide-react";

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
} from "../../components/ui/PageChrome";
import { useToast } from "../../components/ui/ToastContext";
import {
  normalizeTaskStatus,
  taskStatusLabels,
  taskStatusTones,
} from "../../constants/workflow";
import { getApiErrorMessage } from "../../services/apiError";
import AdminAPI from "../../services/adminApi";

const Tasks = () => {
  const showToast = useToast();

  const [tasks, setTasks] =
    useState([]);
  const [reviewNotes, setReviewNotes] =
    useState({});
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState("");
  const [reviewingId, setReviewingId] =
    useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const response =
        await AdminAPI.get(
          "/tasks"
        );
      setTasks(response.data);
    } catch (fetchError) {
      setTasks([]);
      setError(
        getApiErrorMessage(
          fetchError,
          "Unable to load tasks right now."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const loadTasksOnMount =
    useEffectEvent(() => {
      fetchTasks();
    });

  useEffect(() => {
    const timer =
      window.setTimeout(() => {
        loadTasksOnMount();
      }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const reviewTask = async (
    taskId,
    status
  ) => {
    try {
      setReviewingId(`${taskId}:${status}`);
      const response =
        await AdminAPI.put(
          `/tasks/${taskId}/review`,
          {
            status,
            reviewNote:
              reviewNotes[taskId] || "",
          }
        );
      setTasks((current) =>
        current.map((task) =>
          task._id === taskId
            ? response.data.task
            : task
        )
      );
      showToast({
        tone:
          status === "approved"
            ? "success"
            : "warning",
        title:
          status === "approved"
            ? "Task approved"
            : "Task sent back",
        description:
          response.data.message,
      });
    } catch (reviewError) {
      const message =
        reviewError.response?.data
          ?.message ||
        "Unable to review this task.";
      showToast({
        tone: "error",
        title:
          "Review failed",
        description: message,
      });
    } finally {
      setReviewingId("");
    }
  };

  return (
    <PageShell>
      <PageHeader
        badge="Task review"
        title="Task management"
        description="Monitor progress across assigned teams, review submitted work, and send it back cleanly when another pass is needed."
      />

      {error && (
        <InlineMessage tone="error">
          {error}
        </InlineMessage>
      )}

      {loading ? (
        <div className="space-y-6">
          {Array.from({
            length: 4,
          }).map((_, index) => (
            <Card
              key={index}
              className="soc-skeleton h-80"
            />
          ))}
        </div>
      ) : tasks.length === 0 ? (
        error ? (
          <EmptyState
            title="Task board unavailable"
            description="Task review data could not be loaded right now."
            action={{
              label: "Try again",
              onClick: fetchTasks,
            }}
          />
        ) : (
          <EmptyState
            title="No tasks yet"
            description="Tasks will appear here once project leaders begin assigning work."
            action={{
              label: "Refresh list",
              onClick: fetchTasks,
              variant:
                "secondary",
            }}
          />
        )
      ) : (
        <div className="space-y-6">
          {tasks.map((task) => {
            const normalizedStatus =
              normalizeTaskStatus(
                task.status
              );

            return (
              <Card
                key={task._id}
                className="p-7"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap gap-2.5">
                      <Badge
                        tone="default"
                      >
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

                    <h2 className="mt-4 text-2xl font-semibold text-[var(--soc-ink)]">
                      {task.title}
                    </h2>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--soc-text-muted)]">
                      {task.description}
                    </p>
                  </div>

                  <ClipboardList
                    size={28}
                    className="text-[var(--soc-teal)]"
                  />
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <Card className="p-4">
                    <p className="text-sm text-[var(--soc-text-muted)]">
                      Project
                    </p>
                    <h3 className="mt-2 font-semibold text-[var(--soc-ink)]">
                      {task.project?.title}
                    </h3>
                  </Card>
                  <Card className="p-4">
                    <p className="text-sm text-[var(--soc-text-muted)]">
                      Assigned to
                    </p>
                    <h3 className="mt-2 font-semibold text-[var(--soc-ink)]">
                      {task.assignedTo?.name}
                    </h3>
                  </Card>
                  <Card className="p-4">
                    <p className="text-sm text-[var(--soc-text-muted)]">
                      Created by
                    </p>
                    <h3 className="mt-2 font-semibold text-[var(--soc-ink)]">
                      {task.createdBy?.name}
                    </h3>
                  </Card>
                  <Card className="p-4">
                    <p className="text-sm text-[var(--soc-text-muted)]">
                      Deadline
                    </p>
                    <h3 className="mt-2 font-semibold text-[var(--soc-ink)]">
                      {task.deadline
                        ? new Date(
                            task.deadline
                          ).toLocaleDateString()
                        : "No deadline"}
                    </h3>
                  </Card>
                </div>

                {task.submissionLinks
                  ?.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-[var(--soc-ink)]">
                      Submission links
                    </h3>
                    <div className="mt-3 space-y-3">
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
                            className="block rounded-[1.35rem] border border-[var(--soc-border-soft)] bg-[var(--soc-surface-cool)] px-4 py-3 text-sm text-[var(--soc-teal)] transition hover:bg-white"
                          >
                            {link.title}
                          </a>
                        )
                      )}
                    </div>
                  </div>
                )}

                {task.comments?.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-[var(--soc-ink)]">
                      Recent comments
                    </h3>
                    <div className="mt-3 space-y-3">
                      {task.comments
                        .slice(-3)
                        .reverse()
                        .map((comment) => (
                          <Card
                            key={comment._id}
                            className="p-4"
                          >
                            <p className="text-sm font-semibold text-[var(--soc-ink)]">
                              {comment.author
                                ?.name ||
                                "Unknown"}
                            </p>
                            <p className="mt-2 text-sm leading-7 text-[var(--soc-text-muted)]">
                              {comment.message}
                            </p>
                          </Card>
                        ))}
                    </div>
                  </div>
                )}

                {task.activity?.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-[var(--soc-ink)]">
                      Activity trail
                    </h3>
                    <div className="mt-3 space-y-3">
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
                                {entry.actor
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
                  </div>
                )}

                {normalizedStatus ===
                  "submitted" && (
                  <div className="mt-6 space-y-4">
                    <label className="block">
                      <FieldLabel>
                        Review note
                      </FieldLabel>
                      <Textarea
                        rows="3"
                        value={
                          reviewNotes[
                            task._id
                          ] || ""
                        }
                        onChange={(
                          event
                        ) =>
                          setReviewNotes(
                            (current) => ({
                              ...current,
                              [task._id]:
                                event
                                  .target
                                  .value,
                            })
                          )
                        }
                        placeholder="Share approval context or explain what needs more work."
                      />
                    </label>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        type="button"
                        variant="success"
                        loading={
                          reviewingId ===
                          `${task._id}:approved`
                        }
                        onClick={() =>
                          reviewTask(
                            task._id,
                            "approved"
                          )
                        }
                      >
                        <CheckCircle2
                          size={16}
                        />
                        Approve task
                      </Button>

                      <Button
                        type="button"
                        variant="danger"
                        loading={
                          reviewingId ===
                          `${task._id}:rejected`
                        }
                        onClick={() =>
                          reviewTask(
                            task._id,
                            "rejected"
                          )
                        }
                      >
                        <RotateCcw
                          size={16}
                        />
                        Send back
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </PageShell>
  );
};

export default Tasks;
