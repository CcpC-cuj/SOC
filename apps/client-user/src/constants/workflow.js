export const TASK_STATUSES = [
  "todo",
  "in_progress",
  "blocked",
  "submitted",
  "approved",
  "rejected",
];

export const taskStatusLabels = {
  todo: "To do",
  in_progress: "In progress",
  blocked: "Blocked",
  submitted: "Submitted",
  approved: "Approved",
  rejected: "Needs rework",
};

export const taskStatusTones = {
  todo: "default",
  in_progress: "accent",
  blocked: "warning",
  submitted: "info",
  approved: "success",
  rejected: "danger",
};

export const submissionStatusLabels = {
  draft: "Draft",
  submitted: "Submitted",
  approved: "Approved",
  rejected: "Changes requested",
};

export function isProjectWorkspaceReadOnly(
  project
) {
  return [
    "completed",
    "closed",
  ].includes(project?.status);
}

export function isProjectWorkspaceWritable(
  project
) {
  return project?.status === "active";
}

export function normalizeTaskStatus(
  status = "todo"
) {
  return status === "pending"
    ? "todo"
    : status;
}

export function getAllowedTaskTransitions(
  status,
  actor = "member"
) {
  const normalized =
    normalizeTaskStatus(status);

  if (actor === "admin") {
    if (normalized === "submitted") {
      return ["approved", "rejected"];
    }

    if (normalized === "rejected") {
      return ["todo", "in_progress"];
    }

    return [];
  }

  const transitions = {
    todo: [
      "in_progress",
      "blocked",
      "submitted",
    ],
    in_progress: [
      "todo",
      "blocked",
      "submitted",
    ],
    blocked: [
      "todo",
      "in_progress",
      "submitted",
    ],
    rejected: [
      "todo",
      "in_progress",
      "blocked",
      "submitted",
    ],
    submitted: [],
    approved: [],
  };

  return transitions[normalized] || [];
}

export function getAllowedSubmissionModes(
  currentStatus
) {
  if (!currentStatus) {
    return [
      "draft",
      "submitted",
    ];
  }

  const modeMap = {
    draft: [
      "draft",
      "submitted",
    ],
    rejected: [
      "draft",
      "submitted",
    ],
    submitted: [],
    approved: [],
  };

  return modeMap[currentStatus] || [];
}
