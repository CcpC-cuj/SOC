export const TASK_STATUSES = [
  "todo",
  "in_progress",
  "blocked",
  "submitted",
  "approved",
  "rejected",
];

export const LEGACY_TASK_STATUS_MAP = {
  pending: "todo",
};

export function normalizeTaskStatus(
  status = "todo"
) {
  return (
    LEGACY_TASK_STATUS_MAP[status] ||
    status
  );
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

  const memberMap = {
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

  return (
    memberMap[normalized] || []
  );
}

export function canTransitionTask({
  currentStatus,
  nextStatus,
  actor = "member",
}) {
  const normalizedCurrent =
    normalizeTaskStatus(currentStatus);
  const normalizedNext =
    normalizeTaskStatus(nextStatus);

  if (
    normalizedCurrent === normalizedNext
  ) {
    return true;
  }

  return getAllowedTaskTransitions(
    normalizedCurrent,
    actor
  ).includes(normalizedNext);
}

export function isPublicProject(project) {
  return Boolean(project?.isShowcase);
}

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

export function canAssignToCapacity({
  currentCount,
  capacity,
}) {
  return currentCount < capacity;
}

export function getProjectDeleteBlockers({
  activeMembers = 0,
  teams = 0,
  tasks = 0,
  submissions = 0,
}) {
  const blockers = [];

  if (activeMembers > 0) {
    blockers.push(
      `${activeMembers} active member${activeMembers === 1 ? "" : "s"}`
    );
  }

  if (teams > 0) {
    blockers.push(
      `${teams} team${teams === 1 ? "" : "s"}`
    );
  }

  if (tasks > 0) {
    blockers.push(
      `${tasks} task${tasks === 1 ? "" : "s"}`
    );
  }

  if (submissions > 0) {
    blockers.push(
      `${submissions} submission${submissions === 1 ? "" : "s"}`
    );
  }

  return blockers;
}

export function canReviewSubmission({
  currentStatus,
  nextStatus,
}) {
  return (
    currentStatus === "submitted" &&
    ["approved", "rejected"].includes(
      nextStatus
    )
  );
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

export function canEditSubmission({
  currentStatus,
  nextStatus,
}) {
  return getAllowedSubmissionModes(
    currentStatus
  ).includes(nextStatus);
}
