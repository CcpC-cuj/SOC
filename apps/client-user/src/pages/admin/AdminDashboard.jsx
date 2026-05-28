import {
  useEffect,
  useEffectEvent,
  useState,
} from "react";
import {
  AlertTriangle,
  ArrowRight,
  BriefcaseBusiness,
  ClipboardList,
  Clock3,
  FolderKanban,
  RefreshCw,
  ShieldAlert,
  Sparkles,
  UserRoundSearch,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import {
  FieldLabel,
  InlineMessage,
  Input,
  Textarea,
} from "../../components/ui/Field";
import {
  PageHeader,
  PageShell,
  SectionHeader,
} from "../../components/ui/PageChrome";
import { getApiErrorMessage } from "../../services/apiError";
import AdminAPI from "../../services/adminApi";

const initialStats = {
  totalProjects: 0,
  deliveryProjects: 0,
  totalUsers: 0,
  totalTasks: 0,
  totalTeams: 0,
  totalLeaders: 0,
  pendingReview: 0,
  assignedUsers: 0,
  waitlistedUsers: 0,
  shortlistedUsers: 0,
  submissionsPendingReview: 0,
  showcaseProjects: 0,
  teamsWithoutLeaders: 0,
  projectsAtCapacity: 0,
  deliveryProjectsWithoutTeams: 0,
  membershipsWithoutTeam: 0,
  assignedUsersWithoutMembership: 0,
  tasksPendingReview: 0,
  taskStatusCounts: {
    todo: 0,
    in_progress: 0,
    blocked: 0,
    submitted: 0,
    approved: 0,
    rejected: 0,
  },
  recentTaskReviewActivity: [],
  recentSubmissionReviewActivity: [],
};

const initialSettings = {
  registrationOpen: true,
  registrationDeadline: "",
  registrationHeadline: "",
  registrationSubheadline: "",
  registrationNotice: "",
  contactEmail: "",
  eligibility: "",
  codeOfConductUrl: "",
};

const trackedSettingFields = [
  "registrationOpen",
  "registrationDeadline",
  "registrationHeadline",
  "registrationSubheadline",
  "registrationNotice",
  "contactEmail",
  "eligibility",
  "codeOfConductUrl",
];

const pad = (value) =>
  String(value).padStart(2, "0");

const trimText = (value) =>
  String(value || "").trim();

const formatDateTimeLocal = (
  value
) => {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return [
    `${date.getFullYear()}-${pad(
      date.getMonth() + 1
    )}-${pad(date.getDate())}`,
    `${pad(date.getHours())}:${pad(
      date.getMinutes()
    )}`,
  ].join("T");
};

const parseDateTimeLocal = (
  value
) => {
  if (!value) {
    return null;
  }

  const [
    datePart,
    timePart = "00:00",
  ] = value.split("T");
  const [
    year,
    month,
    day,
  ] = datePart
    .split("-")
    .map(Number);
  const [hours, minutes] =
    timePart
      .split(":")
      .map(Number);

  const parsedDate = new Date(
    year,
    (month || 1) - 1,
    day || 1,
    hours || 0,
    minutes || 0
  );

  return Number.isNaN(
    parsedDate.getTime()
  )
    ? null
    : parsedDate.toISOString();
};

const normalizeSettingsForForm = (
  value = {}
) => ({
  registrationOpen:
    Boolean(
      value.registrationOpen
    ),
  registrationDeadline:
    formatDateTimeLocal(
      value.registrationDeadline
    ),
  registrationHeadline: trimText(
    value.registrationHeadline
  ),
  registrationSubheadline:
    trimText(
      value.registrationSubheadline
    ),
  registrationNotice: trimText(
    value.registrationNotice
  ),
  contactEmail: trimText(
    value.contactEmail
  ),
  eligibility: trimText(
    value.eligibility
  ),
  codeOfConductUrl: trimText(
    value.codeOfConductUrl
  ),
});

const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    value
  );

const isValidHttpUrl = (
  value
) => {
  try {
    const url = new URL(value);

    return [
      "http:",
      "https:",
    ].includes(url.protocol);
  } catch {
    return false;
  }
};

const validateSettings = (
  settings
) => {
  const errors = {};

  if (
    settings.contactEmail &&
    !isValidEmail(
      settings.contactEmail
    )
  ) {
    errors.contactEmail =
      "Enter a valid contact email address.";
  }

  if (
    settings.codeOfConductUrl &&
    !isValidHttpUrl(
      settings.codeOfConductUrl
    )
  ) {
    errors.codeOfConductUrl =
      "Enter a valid code of conduct URL starting with http:// or https://.";
  }

  if (
    settings.registrationDeadline &&
    !parseDateTimeLocal(
      settings.registrationDeadline
    )
  ) {
    errors.registrationDeadline =
      "Enter a valid registration deadline.";
  }

  return errors;
};

const formatDate = (
  value
) =>
  value
    ? new Date(value).toLocaleString(
        "en-IN",
        {
          dateStyle: "medium",
          timeStyle: "short",
        }
      )
    : "Not available";

const taskReviewTone = {
  approved: "success",
  rejected: "danger",
};

const submissionReviewTone = {
  approved: "success",
  rejected: "danger",
};

const AdminDashboard = () => {
  const [stats, setStats] =
    useState(initialStats);
  const [settings, setSettings] =
    useState(initialSettings);
  const [
    lastLoadedSettings,
    setLastLoadedSettings,
  ] = useState(null);
  const [loadingStats, setLoadingStats] =
    useState(true);
  const [
    loadingSettings,
    setLoadingSettings,
  ] = useState(true);
  const [
    settingsLoadError,
    setSettingsLoadError,
  ] = useState("");
  const [statsError, setStatsError] =
    useState("");
  const [saving, setSaving] =
    useState(false);
  const [feedback, setFeedback] =
    useState({
      tone: "success",
      message: "",
    });
  const [fieldErrors, setFieldErrors] =
    useState({});

  const currentSnapshot =
    JSON.stringify(
      trackedSettingFields.reduce(
        (accumulator, field) => ({
          ...accumulator,
          [field]: settings[field],
        }),
        {}
      )
    );

  const lastSnapshot =
    lastLoadedSettings
      ? JSON.stringify(
          trackedSettingFields.reduce(
            (accumulator, field) => ({
              ...accumulator,
              [field]:
                lastLoadedSettings[
                  field
                ],
            }),
            {}
          )
        )
      : null;

  const isDirty =
    Boolean(lastSnapshot) &&
    currentSnapshot !== lastSnapshot;

  const validationErrors =
    validateSettings(settings);

  const formDisabled =
    loadingSettings ||
    Boolean(settingsLoadError) ||
    !lastLoadedSettings;

  const refreshDashboard = async () => {
    setLoadingStats(true);
    setLoadingSettings(true);
    setStatsError("");
    setSettingsLoadError("");

    const [
      statsResult,
      settingsResult,
    ] = await Promise.allSettled([
      AdminAPI.get(
        "/dashboard/admin"
      ),
      AdminAPI.get(
        "/settings/admin"
      ),
    ]);

    if (
      statsResult.status ===
      "fulfilled"
    ) {
      setStats({
        ...initialStats,
        ...statsResult.value.data,
      });
    } else {
      setStats(initialStats);
      setStatsError(
        getApiErrorMessage(
          statsResult.reason,
          "Unable to load dashboard statistics right now."
        )
      );
    }

    if (
      settingsResult.status ===
      "fulfilled"
    ) {
      const normalizedSettings =
        normalizeSettingsForForm(
          settingsResult.value.data
        );
      setSettings(normalizedSettings);
      setLastLoadedSettings(
        normalizedSettings
      );
      setFieldErrors({});
      setFeedback({
        tone: "success",
        message: "",
      });
    } else {
      setSettings(initialSettings);
      setLastLoadedSettings(null);
      setSettingsLoadError(
        getApiErrorMessage(
          settingsResult.reason,
          "Unable to load registration settings. Saving is disabled until the current live settings are loaded."
        )
      );
    }

    setLoadingStats(false);
    setLoadingSettings(false);
  };

  const loadDashboardOnMount =
    useEffectEvent(() => {
      refreshDashboard();
    });

  useEffect(() => {
    const timer =
      window.setTimeout(() => {
        loadDashboardOnMount();
      }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!isDirty) {
      return undefined;
    }

    const handleBeforeUnload = (
      event
    ) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener(
      "beforeunload",
      handleBeforeUnload
    );

    return () => {
      window.removeEventListener(
        "beforeunload",
        handleBeforeUnload
      );
    };
  }, [isDirty]);

  const handleChange = (event) => {
    const {
      name,
      type,
      value,
      checked,
    } = event.target;

    setSettings((current) => ({
      ...current,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
    setFieldErrors((current) => ({
      ...current,
      [name]: "",
    }));
    setFeedback({
      tone: "success",
      message: "",
    });
  };

  const handleReset = () => {
    if (!lastLoadedSettings) {
      return;
    }

    setSettings(lastLoadedSettings);
    setFieldErrors({});
    setFeedback({
      tone: "success",
      message: "",
    });
  };

  const handleSave = async (
    event
  ) => {
    event.preventDefault();

    if (formDisabled) {
      setFeedback({
        tone: "error",
        message:
          "Settings could not be loaded, so saving is blocked to protect live data.",
      });
      return;
    }

    if (!isDirty) {
      setFeedback({
        tone: "info",
        message:
          "There are no changes to save.",
      });
      return;
    }

    if (
      Object.keys(validationErrors)
        .length > 0
    ) {
      setFieldErrors(validationErrors);
      setFeedback({
        tone: "error",
        message:
          "Fix the highlighted fields before saving registration settings.",
      });
      return;
    }

    setSaving(true);
    setFeedback({
      tone: "success",
      message: "",
    });

    try {
      const payload = {
        ...settings,
        registrationDeadline:
          settings.registrationDeadline
            ? parseDateTimeLocal(
                settings.registrationDeadline
              )
            : null,
      };

      const response =
        await AdminAPI.put(
          "/settings/admin",
          payload
        );

      const normalizedSettings =
        normalizeSettingsForForm(
          response.data
        );

      setSettings(normalizedSettings);
      setLastLoadedSettings(
        normalizedSettings
      );
      setFieldErrors({});
      setSettingsLoadError("");
      setFeedback({
        tone: "success",
        message:
          "Registration settings saved successfully.",
      });
    } catch (error) {
      setFeedback({
        tone: "error",
        message:
          error.response?.data
            ?.message ||
          "Could not save settings.",
      });
    } finally {
      setSaving(false);
    }
  };

  const topCards = [
    {
      label:
        "Participants waiting for review",
      value: stats.pendingReview,
      detail:
        "Needs organizer decision",
      icon: UserRoundSearch,
      tone: "text-amber-300",
      link: "/admin-users",
    },
    {
      label:
        "Task reviews waiting",
      value:
        stats.tasksPendingReview,
      detail:
        "Submitted tasks pending admin action",
      icon: ClipboardList,
      tone: "text-[var(--soc-teal)]",
      link: "/admin-tasks",
    },
    {
      label:
        "Submission reviews waiting",
      value:
        stats.submissionsPendingReview,
      detail:
        "Milestones needing approval or changes",
      icon: FolderKanban,
      tone: "text-[var(--soc-teal)]",
      link: "/admin-projects",
    },
    {
      label:
        "Teams missing leaders",
      value:
        stats.teamsWithoutLeaders,
      detail:
        "Team structure still incomplete",
      icon: ShieldAlert,
      tone: "text-rose-300",
      link: "/admin-leaders",
    },
  ];

  const reviewQueues = [
    {
      label:
        "Participant review queue",
      value: stats.pendingReview,
      helper:
        "Profiles still waiting to be reviewed and categorized.",
      link: "/admin-users",
      cta: "Open participants",
    },
    {
      label:
        "Shortlisted awaiting placement",
      value: stats.shortlistedUsers,
      helper:
        "Participants you liked, but have not placed into live projects yet.",
      link: "/admin-users",
      cta: "Place shortlisted users",
    },
    {
      label:
        "Task review queue",
      value:
        stats.tasksPendingReview,
      helper:
        "Submitted tasks waiting for approval or rework feedback.",
      link: "/admin-tasks",
      cta: "Open task reviews",
    },
    {
      label:
        "Submission review queue",
      value:
        stats.submissionsPendingReview,
      helper:
        "Project milestones waiting for final review.",
      link: "/admin-projects",
      cta: "Inspect projects",
    },
  ];

  const bottlenecks = [
    {
      label:
        "Projects at capacity",
      value:
        stats.projectsAtCapacity,
      helper:
        "Delivery projects with no remaining seats right now.",
    },
    {
      label:
        "Members without teams",
      value:
        stats.membershipsWithoutTeam,
      helper:
        "Assigned memberships still missing a team placement.",
    },
    {
      label:
        "Assigned users without membership",
      value:
        stats.assignedUsersWithoutMembership,
      helper:
        "Participants marked assigned but not attached to an active membership record.",
    },
    {
      label:
        "Delivery projects without teams",
      value:
        stats.deliveryProjectsWithoutTeams,
      helper:
        "Projects that still need team structure before work can move cleanly.",
    },
  ];

  const teamHealth = [
    {
      label:
        "Delivery projects",
      value:
        stats.deliveryProjects,
    },
    {
      label: "Total teams",
      value: stats.totalTeams,
    },
    {
      label:
        "Active leaders",
      value:
        stats.totalLeaders,
    },
    {
      label:
        "Showcase projects",
      value:
        stats.showcaseProjects,
    },
    {
      label:
        "Assigned participants",
      value:
        stats.assignedUsers,
    },
    {
      label:
        "Waitlisted participants",
      value:
        stats.waitlistedUsers,
    },
  ];

  const taskPipeline = [
    {
      label: "To do",
      value:
        stats.taskStatusCounts.todo,
    },
    {
      label: "In progress",
      value:
        stats.taskStatusCounts
          .in_progress,
    },
    {
      label: "Blocked",
      value:
        stats.taskStatusCounts
          .blocked,
    },
    {
      label: "Submitted",
      value:
        stats.taskStatusCounts
          .submitted,
    },
    {
      label: "Approved",
      value:
        stats.taskStatusCounts
          .approved,
    },
    {
      label:
        "Needs rework",
      value:
        stats.taskStatusCounts
          .rejected,
    },
  ];

  const registrationStatusBadge = loadingSettings
    ? {
        tone: "info",
        label:
          "Loading registration state",
      }
    : settingsLoadError ||
        !lastLoadedSettings
      ? {
          tone: "warning",
          label:
            "Registration status unavailable",
        }
      : settings.registrationOpen
        ? {
            tone: "success",
            label:
              "Registration open",
          }
        : {
            tone: "warning",
            label:
              "Registration closed",
          };

  return (
    <PageShell>
      <PageHeader
        badge="Admin ops console"
        title="What needs attention right now"
        description="See review queues, assignment bottlenecks, team health, and recent decisions before issues spread across the program."
        actions={
          <Button
            type="button"
            variant="secondary"
            onClick={refreshDashboard}
            disabled={
              loadingStats ||
              loadingSettings
            }
          >
            <RefreshCw size={16} />
            Refresh
          </Button>
        }
        meta={
          <>
            <Badge
              tone={
                registrationStatusBadge.tone
              }
            >
              {
                registrationStatusBadge.label
              }
            </Badge>
            {lastLoadedSettings
              ?.registrationDeadline && (
              <Badge tone="info">
                Deadline{" "}
                {formatDate(
                  parseDateTimeLocal(
                    lastLoadedSettings.registrationDeadline
                  )
                )}
              </Badge>
            )}
          </>
        }
      />

      {statsError && (
        <InlineMessage tone="warning">
          {statsError}
        </InlineMessage>
      )}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {topCards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.label}
              to={card.link}
              className="block"
            >
              <Card className="h-full p-6 transition hover:border-[rgba(31,79,107,0.22)]">
                <Icon
                  className={`mb-5 ${card.tone}`}
                  size={26}
                />
                <p className="text-sm text-[var(--soc-text-muted)]">
                  {card.label}
                </p>
                <h2 className="mt-3 text-4xl font-semibold text-[var(--soc-ink)]">
                  {loadingStats
                    ? "..."
                    : card.value}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[var(--soc-text-muted)]">
                  {card.detail}
                </p>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card
          strong
          className="p-7 sm:p-8"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <SectionHeader
                badge="Operations summary"
                badgeTone="info"
                title="Today&apos;s pressure points"
                description="The biggest risks right now are the queues still waiting on organizer action and the structure gaps that can block assignment or delivery."
                className="block"
              />
            </div>

            <Sparkles
              size={28}
              className="text-[var(--soc-teal)]"
            />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {reviewQueues.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.6rem] border border-[var(--soc-border-soft)] bg-[var(--soc-surface-cool)] p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--soc-text-muted)]">
                  {item.label}
                </p>
                <h3 className="mt-3 text-3xl font-semibold text-[var(--soc-ink)]">
                  {loadingStats
                    ? "..."
                    : item.value}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--soc-text-muted)]">
                  {item.helper}
                </p>
                <Link
                  to={item.link}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--soc-teal)]"
                >
                  {item.cta}
                  <ArrowRight size={15} />
                </Link>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-7">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--soc-text-muted)]">
                Assignment bottlenecks
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[var(--soc-ink)]">
                Things that can stall placement
              </h2>
            </div>
            <AlertTriangle
              size={22}
              className="text-amber-200"
            />
          </div>

          <div className="mt-6 space-y-4">
            {bottlenecks.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.45rem] border border-[var(--soc-border-soft)] bg-[var(--soc-surface-cool)] p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[var(--soc-ink)]">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--soc-text-muted)]">
                      {item.helper}
                    </p>
                  </div>
                  <span className="text-2xl font-semibold text-[var(--soc-ink)]">
                    {loadingStats
                      ? "..."
                      : item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/admin-users"
              className="inline-flex items-center gap-2 rounded-2xl border border-[var(--soc-border-soft)] bg-[var(--soc-surface-cool)] px-4 py-3 text-sm font-semibold text-[var(--soc-ink)] transition hover:border-[rgba(31,79,107,0.22)] hover:text-[var(--soc-teal)]"
            >
              Participant ops
            </Link>
            <Link
              to="/admin-leaders"
              className="inline-flex items-center gap-2 rounded-2xl border border-[var(--soc-border-soft)] bg-[var(--soc-surface-cool)] px-4 py-3 text-sm font-semibold text-[var(--soc-ink)] transition hover:border-[rgba(31,79,107,0.22)] hover:text-[var(--soc-teal)]"
            >
              Team structure
            </Link>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="p-7">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--soc-text-muted)]">
                Team health
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[var(--soc-ink)]">
                Structure and capacity
              </h2>
            </div>
            <Users
              size={22}
              className="text-[var(--soc-teal)]"
            />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {teamHealth.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.45rem] border border-[var(--soc-border-soft)] bg-[var(--soc-surface-cool)] p-4"
              >
                <p className="text-sm text-[var(--soc-text-muted)]">
                  {item.label}
                </p>
                <h3 className="mt-3 text-3xl font-semibold text-[var(--soc-ink)]">
                  {loadingStats
                    ? "..."
                    : item.value}
                </h3>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-7">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--soc-text-muted)]">
                Task pipeline
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[var(--soc-ink)]">
                Delivery flow across teams
              </h2>
            </div>
            <ClipboardList
              size={22}
              className="text-[var(--soc-teal)]"
            />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {taskPipeline.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.45rem] border border-[var(--soc-border-soft)] bg-[var(--soc-surface-cool)] p-4"
              >
                <p className="text-sm text-[var(--soc-text-muted)]">
                  {item.label}
                </p>
                <h3 className="mt-3 text-3xl font-semibold text-[var(--soc-ink)]">
                  {loadingStats
                    ? "..."
                    : item.value}
                </h3>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card className="p-7">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--soc-text-muted)]">
                Recent task reviews
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[var(--soc-ink)]">
                Latest admin task decisions
              </h2>
            </div>
            <Clock3
              size={22}
              className="text-[var(--soc-teal)]"
            />
          </div>

          {stats.recentTaskReviewActivity
            .length > 0 ? (
            <div className="mt-6 space-y-4">
              {stats.recentTaskReviewActivity.map(
                (item) => (
                  <div
                    key={item._id}
                    className="rounded-[1.45rem] border border-[var(--soc-border-soft)] bg-[var(--soc-surface-cool)] p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-[var(--soc-ink)]">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm text-[var(--soc-text-muted)]">
                          {item.projectTitle} •{" "}
                          {item.participantName}
                        </p>
                      </div>
                      <Badge
                        tone={
                          taskReviewTone[
                            item.status
                          ] || "default"
                        }
                      >
                        {item.status ===
                        "approved"
                          ? "Approved"
                          : "Needs rework"}
                      </Badge>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[var(--soc-text-muted)]">
                      {item.reviewMessage ||
                        "No review note was saved."}
                    </p>
                    <p className="mt-3 text-xs text-[var(--soc-text-muted)]">
                      Reviewed by{" "}
                      {item.reviewedBy} on{" "}
                      {formatDate(
                        item.reviewedAt
                      )}
                    </p>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="mt-6 rounded-[1.45rem] border border-dashed border-[var(--soc-border-soft)] bg-[var(--soc-surface-cool)] p-5">
              <p className="text-sm text-[var(--soc-text-muted)]">
                No recent task review activity yet.
              </p>
            </div>
          )}
        </Card>

        <Card className="p-7">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--soc-text-muted)]">
                Recent submission reviews
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[var(--soc-ink)]">
                Latest milestone decisions
              </h2>
            </div>
            <BriefcaseBusiness
              size={22}
              className="text-[var(--soc-teal)]"
            />
          </div>

          {stats
            .recentSubmissionReviewActivity
            .length > 0 ? (
            <div className="mt-6 space-y-4">
              {stats.recentSubmissionReviewActivity.map(
                (item) => (
                  <div
                    key={item._id}
                    className="rounded-[1.45rem] border border-[var(--soc-border-soft)] bg-[var(--soc-surface-cool)] p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-[var(--soc-ink)]">
                          {item.projectTitle}
                        </p>
                        <p className="mt-1 text-sm text-[var(--soc-text-muted)]">
                          {item.milestoneLabel} •{" "}
                          {item.submittedBy}
                        </p>
                      </div>
                      <Badge
                        tone={
                          submissionReviewTone[
                            item.status
                          ] || "default"
                        }
                      >
                        {item.status ===
                        "approved"
                          ? "Approved"
                          : "Changes requested"}
                      </Badge>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[var(--soc-text-muted)]">
                      {item.remarks ||
                        "No review remark was saved."}
                    </p>
                    <p className="mt-3 text-xs text-[var(--soc-text-muted)]">
                      Reviewed by{" "}
                      {item.reviewedBy} on{" "}
                      {formatDate(
                        item.reviewedAt
                      )}
                    </p>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="mt-6 rounded-[1.45rem] border border-dashed border-[var(--soc-border-soft)] bg-[var(--soc-surface-cool)] p-5">
              <p className="text-sm text-[var(--soc-text-muted)]">
                No recent submission review activity yet.
              </p>
            </div>
          )}
        </Card>
      </div>

      <form
        onSubmit={handleSave}
        className="rounded-[2rem] border border-[var(--soc-border-soft)] bg-[var(--soc-surface-cool)] p-8"
      >
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-3xl font-semibold text-[var(--soc-ink)]">
                Registration Controls
              </h2>
              {loadingSettings && (
                <Badge tone="info">
                  Loading live settings
                </Badge>
              )}
              {!loadingSettings &&
                isDirty && (
                  <Badge tone="warning">
                    Unsaved changes
                  </Badge>
                )}
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--soc-text-muted)]">
              Public registration messaging and intake controls live here. Keep these lower than the ops view so daily program decisions stay front and center.
            </p>
            <p className="mt-2 text-sm text-[var(--soc-text-muted)]">
              The deadline input uses your local browser time and should match IST in this setup.
            </p>
          </div>

          <label className="flex items-center gap-3 rounded-full border border-[var(--soc-border-soft)] bg-[var(--soc-surface-cool)] px-4 py-3 text-sm font-semibold text-[var(--soc-ink)]">
            <input
              type="checkbox"
              name="registrationOpen"
              checked={
                settings.registrationOpen
              }
              onChange={handleChange}
              disabled={formDisabled}
            />
            Registration open
          </label>
        </div>

        {settingsLoadError && (
          <InlineMessage tone="error">
            {settingsLoadError}
          </InlineMessage>
        )}

        {feedback.message && (
          <InlineMessage
            tone={feedback.tone}
            className="mt-6"
          >
            {feedback.message}
          </InlineMessage>
        )}

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <label className="block">
            <FieldLabel>
              Registration deadline
            </FieldLabel>
            <Input
              type="datetime-local"
              name="registrationDeadline"
              value={
                settings.registrationDeadline
              }
              onChange={handleChange}
              disabled={formDisabled}
            />
            {fieldErrors.registrationDeadline && (
              <p className="mt-2 text-sm text-rose-200">
                {
                  fieldErrors.registrationDeadline
                }
              </p>
            )}
          </label>

          <label className="block">
            <FieldLabel>
              Contact email
            </FieldLabel>
            <Input
              type="email"
              name="contactEmail"
              value={
                settings.contactEmail
              }
              onChange={handleChange}
              disabled={formDisabled}
              placeholder="soc@yourclub.org"
            />
            {fieldErrors.contactEmail && (
              <p className="mt-2 text-sm text-rose-200">
                {
                  fieldErrors.contactEmail
                }
              </p>
            )}
          </label>
        </div>

        <div className="mt-6 space-y-6">
          {[
            {
              name:
                "registrationHeadline",
              label: "Headline",
            },
            {
              name:
                "registrationSubheadline",
              label:
                "Subheadline",
            },
            {
              name:
                "registrationNotice",
              label:
                "Public notice",
            },
            {
              name: "eligibility",
              label:
                "Eligibility note",
            },
            {
              name:
                "codeOfConductUrl",
              label:
                "Code of conduct URL",
            },
          ].map((field) => (
            <label
              key={field.name}
              className="block"
            >
              <FieldLabel>
                {field.label}
              </FieldLabel>
              {field.name ===
              "codeOfConductUrl" ? (
                <Input
                  type="text"
                  name={field.name}
                  value={
                    settings[
                      field.name
                    ]
                  }
                  onChange={handleChange}
                  disabled={formDisabled}
                  placeholder="https://example.com/code-of-conduct"
                />
              ) : (
                <Textarea
                  rows="3"
                  name={field.name}
                  value={
                    settings[
                      field.name
                    ]
                  }
                  onChange={handleChange}
                  disabled={formDisabled}
                />
              )}
              {fieldErrors[field.name] && (
                <p className="mt-2 text-sm text-rose-200">
                  {
                    fieldErrors[
                      field.name
                    ]
                  }
                </p>
              )}
            </label>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button
            type="submit"
            disabled={
              saving ||
              formDisabled ||
              !isDirty
            }
          >
            {saving
              ? "Saving..."
              : "Save settings"}
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
            disabled={
              saving ||
              formDisabled ||
              !isDirty
            }
          >
            Reset changes
          </Button>
        </div>
      </form>
    </PageShell>
  );
};

export default AdminDashboard;
