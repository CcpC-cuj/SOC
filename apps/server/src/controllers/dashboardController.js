import Project from "../models/Project.js";
import ProjectMember from "../models/ProjectMember.js";
import ProjectSubmission from "../models/ProjectSubmission.js";
import Task from "../models/Task.js";
import Team from "../models/Team.js";
import User from "../models/User.js";
import {
  TASK_STATUSES,
  normalizeTaskStatus,
} from "../utils/workflowRules.js";

const registrationStatusHeadlines = {
  pending_review:
    "Your registration is in the review queue.",
  shortlisted:
    "You are shortlisted for assignment.",
  waitlisted:
    "You are currently waitlisted.",
  assigned:
    "You are assigned and ready to contribute.",
  rejected:
    "Your current registration is not moving forward.",
};

const formatDateLabel = (
  value
) =>
  value
    ? new Date(value).toISOString()
    : null;

const createNotice = ({
  tone = "info",
  title,
  description,
  actionLabel,
  actionPath,
}) => ({
  tone,
  title,
  description,
  actionLabel,
  actionPath,
});

const buildPrimaryAction = ({
  user,
  currentAssignment,
  taskStatusCounts,
  submission,
}) => {
  if (!user.emailVerified) {
    return {
      eyebrow:
        "Account setup",
      title:
        "Verify your email before anything slips through the cracks.",
      description:
        "Assignment updates and recovery links are much more reliable once your email is verified.",
      actionLabel:
        "Resend verification email",
      actionType:
        "resend_verification",
      secondaryLabel:
        "Review profile",
      secondaryPath:
        "/profile",
    };
  }

  if (
    user.registrationStatus ===
    "pending_review"
  ) {
    return {
      eyebrow:
        "Current next step",
      title:
        "Wait for organizer review and keep your profile stable.",
      description:
        "Your form is already submitted. Only update it if you truly need to improve the information organizers will assign from.",
      actionLabel:
        "Review profile",
      actionPath: "/profile",
      secondaryLabel:
        "Browse showcase",
      secondaryPath:
        "/projects",
    };
  }

  if (
    user.registrationStatus ===
    "shortlisted"
  ) {
    return {
      eyebrow:
        "Current next step",
      title:
        "Stay ready while the final project and team match is being decided.",
      description:
        "Your shortlist status is active. Keep your contact details current and avoid changing assignment-related fields unless you submit a change request.",
      actionLabel:
        "Review profile",
      actionPath: "/profile",
      secondaryLabel:
        "Browse showcase",
      secondaryPath:
        "/projects",
    };
  }

  if (
    user.registrationStatus ===
    "waitlisted"
  ) {
    return {
      eyebrow:
        "Current next step",
      title:
        "Hold position while capacities and squads are rebalanced.",
      description:
        "Waitlist does not end your application. The organizers may still place you if seats open or teams shift.",
      actionLabel:
        "Review profile",
      actionPath: "/profile",
      secondaryLabel:
        "Browse showcase",
      secondaryPath:
        "/projects",
    };
  }

  if (
    user.registrationStatus ===
    "rejected"
  ) {
    return {
      eyebrow:
        "Current next step",
      title:
        "Review your profile and organizer feedback.",
      description:
        "Your current cycle is not moving forward. If you want to improve for a future round, keep your profile accurate and look for guidance from the team.",
      actionLabel:
        "Open profile",
      actionPath: "/profile",
      secondaryLabel:
        "Browse showcase",
      secondaryPath:
        "/projects",
    };
  }

  if (submission?.status === "rejected") {
    return {
      eyebrow:
        "Current next step",
      title:
        "Rework the current milestone with your team.",
      description:
        "The latest project submission needs changes before approval. Open the workspace, review the remarks, and prepare the next pass.",
      actionLabel:
        "Open workspace",
      actionPath: currentAssignment
        ? `/workspace/${currentAssignment.project?._id}`
        : "/projects",
      secondaryLabel:
        "View profile",
      secondaryPath:
        "/profile",
    };
  }

  const openTaskCount =
    taskStatusCounts.todo +
    taskStatusCounts.in_progress +
    taskStatusCounts.blocked +
    taskStatusCounts.rejected;

  if (currentAssignment) {
    return {
      eyebrow:
        "Current next step",
      title:
        openTaskCount > 0
          ? "Open your workspace and move the active work forward."
          : "Check your workspace and stay aligned with your team.",
      description:
        openTaskCount > 0
          ? `You currently have ${openTaskCount} active task${openTaskCount === 1 ? "" : "s"} that still need attention.`
          : "Your assignment is live. Use the workspace to track tasks, updates, and milestone status.",
      actionLabel:
        "Open workspace",
      actionPath: `/workspace/${currentAssignment.project?._id}`,
      secondaryLabel:
        "View profile",
      secondaryPath:
        "/profile",
    };
  }

  return {
    eyebrow:
      "Current next step",
    title:
      "Keep your profile ready while assignment details are prepared.",
    description:
      "You are marked assigned, but a project card has not appeared yet. The organizers are likely finishing team structure.",
    actionLabel:
      "Review profile",
    actionPath: "/profile",
    secondaryLabel:
      "Browse showcase",
    secondaryPath:
      "/projects",
  };
};

const buildNotices = ({
  user,
  currentAssignment,
  taskStatusCounts,
  submission,
}) => {
  const notices = [];

  if (!user.emailVerified) {
    notices.push(
      createNotice({
        tone: "warning",
        title:
          "Email verification is still pending.",
        description:
          "Verify your email so assignment updates and recovery messages reach you reliably.",
      })
    );
  }

  if (
    user.pendingProfileChangeRequest
      ?.requestedAt
  ) {
    notices.push(
      createNotice({
        tone: "info",
        title:
          "Your profile change request is waiting for organizer review.",
        description:
          user.pendingProfileChangeRequest
            .note ||
          "Locked registration changes will stay pending until the organizers review them.",
        actionLabel:
          "Review profile",
        actionPath: "/profile",
      })
    );
  }

  if (taskStatusCounts.blocked > 0) {
    notices.push(
      createNotice({
        tone: "warning",
        title:
          `${taskStatusCounts.blocked} task${taskStatusCounts.blocked === 1 ? "" : "s"} blocked right now.`,
        description:
          "Check the workspace comments or speak with your team lead so the blockers do not stall the project.",
        actionLabel:
          currentAssignment
            ? "Open workspace"
            : undefined,
        actionPath: currentAssignment
          ? `/workspace/${currentAssignment.project?._id}`
          : undefined,
      })
    );
  }

  if (taskStatusCounts.rejected > 0) {
    notices.push(
      createNotice({
        tone: "danger",
        title:
          `${taskStatusCounts.rejected} task${taskStatusCounts.rejected === 1 ? "" : "s"} sent back for changes.`,
        description:
          "Review the feedback and prepare the next iteration before resubmitting.",
        actionLabel:
          currentAssignment
            ? "Open workspace"
            : undefined,
        actionPath: currentAssignment
          ? `/workspace/${currentAssignment.project?._id}`
          : undefined,
      })
    );
  }

  if (submission?.status === "rejected") {
    notices.push(
      createNotice({
        tone: "danger",
        title:
          "The current milestone needs revisions.",
        description:
          submission.remarks ||
          "The organizers sent the project submission back for another pass.",
        actionLabel:
          currentAssignment
            ? "Open workspace"
            : undefined,
        actionPath: currentAssignment
          ? `/workspace/${currentAssignment.project?._id}`
          : undefined,
      })
    );
  }

  if (
    user.registrationStatus ===
      "shortlisted" &&
    !currentAssignment
  ) {
    notices.push(
      createNotice({
        tone: "info",
        title:
          "Assignment details are not announced yet.",
        description:
          "Shortlisted participants are still being balanced into final teams and projects.",
      })
    );
  }

  return notices;
};

const buildTimeline = ({
  user,
  currentAssignment,
  submission,
}) => {
  const timeline = [];

  timeline.push({
    label: "Submitted on",
    value: formatDateLabel(
      user.createdAt
    ),
    detail:
      "Registration form received.",
    type: "date",
  });

  const reviewEntry =
    user.assignmentHistory
      ?.slice()
      .reverse()
      .find(
        (entry) =>
          entry.action ===
            "status-updated" &&
          entry.status &&
          entry.status !==
            "pending_review"
      );

  if (reviewEntry) {
    timeline.push({
      label: "Reviewed on",
      value: formatDateLabel(
        reviewEntry.changedAt
      ),
      detail:
        reviewEntry.note ||
        registrationStatusHeadlines[
          reviewEntry.status
        ] ||
        "Registration reviewed.",
      type: "date",
    });
  }

  if (currentAssignment) {
    timeline.push({
      label: "Assigned to",
      value: formatDateLabel(
        currentAssignment.assignedAt ||
          currentAssignment.createdAt
      ),
      detail:
        currentAssignment.project
          ?.title ||
        "Project assigned.",
      type: "date",
    });

    timeline.push({
      label: "Team lead",
      value:
        currentAssignment.team?.leader
          ?.name ||
        "Not assigned yet",
      detail:
        currentAssignment.team?.name
          ? `Team ${currentAssignment.team.name}`
          : "Team details pending.",
      type: "text",
    });
  }

  if (
    submission?.statusHistory?.length > 0
  ) {
    const latestStatusEntry =
      submission.statusHistory.at(-1);

    timeline.push({
      label:
        latestStatusEntry.status ===
          "submitted"
          ? "Milestone submitted on"
          : latestStatusEntry.status ===
              "approved"
            ? "Milestone approved on"
            : latestStatusEntry.status ===
                "rejected"
              ? "Milestone reviewed on"
              : "Draft saved on",
      value: formatDateLabel(
        latestStatusEntry.changedAt
      ),
      detail:
        latestStatusEntry.remarks ||
        submission.milestoneLabel ||
        "Project milestone updated.",
      type: "date",
    });
  }

  return timeline;
};

const createEmptyTaskCounts = () =>
  TASK_STATUSES.reduce(
    (accumulator, status) => ({
      ...accumulator,
      [status]: 0,
    }),
    {}
  );

const buildTaskStatusCounts = (
  tasks = []
) => {
  const counts =
    createEmptyTaskCounts();

  tasks.forEach((task) => {
    const normalizedStatus =
      normalizeTaskStatus(
        task.status
      );

    if (
      Object.prototype.hasOwnProperty.call(
        counts,
        normalizedStatus
      )
    ) {
      counts[normalizedStatus] += 1;
    }
  });

  return counts;
};

export const getDashboard = async (
  req,
  res
) => {
  try {
    const user =
      await User.findById(
        req.user._id
      ).select("-password");

    const memberships =
      await ProjectMember.find({
        user: req.user._id,
        status: "active",
      })
        .populate("project")
        .populate({
          path: "team",
          select:
            "name focus capacity leader",
          populate: {
            path: "leader",
            select: "name",
          },
        })
        .sort({
          assignedAt: -1,
          createdAt: -1,
        });

    const tasks = await Task.find({
      assignedTo: req.user._id,
    })
      .populate(
        "project",
        "title status"
      )
      .sort({
        deadline: 1,
        createdAt: -1,
      });

    const taskStatusCounts =
      buildTaskStatusCounts(tasks);

    const currentAssignment =
      memberships[0] || null;
    const submission =
      currentAssignment?.project?._id
        ? await ProjectSubmission.findOne({
            project:
              currentAssignment.project._id,
          }).select(
            "status remarks milestoneLabel statusHistory updatedAt createdAt"
          )
        : null;

    const analytics = {
      totalProjects:
        memberships.length,
      totalTasks: tasks.length,
      taskStatusCounts,
      todoTasks:
        taskStatusCounts.todo,
      inProgressTasks:
        taskStatusCounts.in_progress,
      blockedTasks:
        taskStatusCounts.blocked,
      submittedTasks:
        taskStatusCounts.submitted,
      approvedTasks:
        taskStatusCounts.approved,
      rejectedTasks:
        taskStatusCounts.rejected,
    };

    const notices = buildNotices({
      user,
      currentAssignment,
      taskStatusCounts,
      submission,
    });

    const nextAction =
      buildPrimaryAction({
        user,
        currentAssignment,
        taskStatusCounts,
        submission,
      });

    const timeline = buildTimeline({
      user,
      currentAssignment,
      submission,
    });

    return res.json({
      user,
      memberships,
      tasks,
      analytics,
      currentAssignment,
      submission,
      notices,
      nextAction,
      timeline,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAdminDashboard =
  async (req, res) => {
    try {
      const [
        totalProjects,
        deliveryProjects,
        totalUsers,
        allTasks,
        totalTeams,
        totalLeaders,
        pendingReview,
        assignedUsers,
        waitlistedUsers,
        shortlistedUsers,
        submissionsPendingReview,
        showcaseProjects,
        teamsWithoutLeaders,
        projects,
        activeMembershipCounts,
        membershipsWithoutTeam,
        recentReviewedTasks,
        recentSubmissionReviews,
        teamCountsByProject,
        activeMembershipUsers,
      ] = await Promise.all([
        Project.countDocuments(),
        Project.countDocuments({
          isShowcase: false,
        }),
        User.countDocuments({
          authority: "user",
        }),
        Task.find().select("status"),
        Team.countDocuments(),
        ProjectMember.countDocuments({
          isLeader: true,
          status: "active",
        }),
        User.countDocuments({
          authority: "user",
          registrationStatus:
            "pending_review",
        }),
        User.countDocuments({
          authority: "user",
          registrationStatus:
            "assigned",
        }),
        User.countDocuments({
          authority: "user",
          registrationStatus:
            "waitlisted",
        }),
        User.countDocuments({
          authority: "user",
          registrationStatus:
            "shortlisted",
        }),
        ProjectSubmission.countDocuments({
          status: "submitted",
        }),
        Project.countDocuments({
          isShowcase: true,
        }),
        Team.countDocuments({
          $or: [
            { leader: null },
            {
              leader: {
                $exists: false,
              },
            },
          ],
        }),
        Project.find().select(
          "isShowcase maxMembers"
        ),
        ProjectMember.aggregate([
          {
            $match: {
              status: "active",
            },
          },
          {
            $group: {
              _id: "$project",
              count: {
                $sum: 1,
              },
            },
          },
        ]),
        ProjectMember.countDocuments({
          status: "active",
          $or: [
            {
              team: null,
            },
            {
              team: {
                $exists: false,
              },
            },
          ],
        }),
        Task.find({
          status: {
            $in: [
              "approved",
              "rejected",
            ],
          },
        })
          .select(
            "title status updatedAt project assignedTo activity"
          )
          .populate(
            "project",
            "title"
          )
          .populate(
            "assignedTo",
            "name"
          )
          .populate(
            "activity.actor",
            "name"
          )
          .sort({
            updatedAt: -1,
          })
          .limit(6),
        ProjectSubmission.find({
          status: {
            $in: [
              "approved",
              "rejected",
            ],
          },
        })
          .select(
            "status remarks milestoneLabel updatedAt project submittedBy statusHistory"
          )
          .populate(
            "project",
            "title"
          )
          .populate(
            "submittedBy",
            "name"
          )
          .populate(
            "statusHistory.changedBy",
            "name"
          )
          .sort({
            updatedAt: -1,
          })
          .limit(6),
        Team.aggregate([
          {
            $group: {
              _id: "$project",
              count: {
                $sum: 1,
              },
            },
          },
        ]),
        ProjectMember.distinct(
          "user",
          {
            status: "active",
          }
        ),
      ]);

      const taskStatusCounts =
        buildTaskStatusCounts(allTasks);
      const projectMemberCountMap =
        new Map(
          activeMembershipCounts.map(
            (item) => [
              String(item._id),
              item.count,
            ]
          )
        );
      const teamCountMap = new Map(
        teamCountsByProject.map(
          (item) => [
            String(item._id),
            item.count,
          ]
        )
      );
      const activeMembershipUserIdSet =
        new Set(
          activeMembershipUsers.map(
            (value) => String(value)
          )
        );

      const projectsAtCapacity =
        projects.filter((project) => {
          if (project.isShowcase) {
            return false;
          }

          const activeCount =
            projectMemberCountMap.get(
              String(project._id)
            ) || 0;

          return (
            activeCount >=
            project.maxMembers
          );
        }).length;
      const deliveryProjectsWithoutTeams =
        projects.filter((project) => {
          if (project.isShowcase) {
            return false;
          }

          return (
            !teamCountMap.has(
              String(project._id)
            )
          );
        }).length;
      const assignedUsersWithoutMembership =
        await User.countDocuments({
          authority: "user",
          registrationStatus:
            "assigned",
          _id: {
            $nin: Array.from(
              activeMembershipUserIdSet
            ),
          },
        });
      const recentTaskReviewActivity =
        recentReviewedTasks.map(
          (task) => {
            const lastReviewEntry =
              task.activity
                ?.slice()
                .reverse()
                .find(
                  (entry) =>
                    entry.type ===
                    "reviewed"
                );

            return {
              _id: task._id,
              title: task.title,
              status:
                normalizeTaskStatus(
                  task.status
                ),
              projectTitle:
                task.project?.title ||
                "Unknown project",
              participantName:
                task.assignedTo?.name ||
                "Unassigned",
              reviewedAt:
                task.updatedAt,
              reviewedBy:
                lastReviewEntry?.actor
                  ?.name ||
                "Admin",
              reviewMessage:
                lastReviewEntry?.message ||
                "",
            };
          }
        );
      const recentSubmissionReviewActivity =
        recentSubmissionReviews.map(
          (submission) => {
            const latestReviewEntry =
              submission.statusHistory
                ?.slice()
                .reverse()
                .find((entry) =>
                  [
                    "approved",
                    "rejected",
                  ].includes(
                    entry.status
                  )
                );

            return {
              _id: submission._id,
              status: submission.status,
              milestoneLabel:
                submission.milestoneLabel ||
                "Current milestone",
              projectTitle:
                submission.project
                  ?.title ||
                "Unknown project",
              submittedBy:
                submission.submittedBy
                  ?.name ||
                "Unknown",
              reviewedAt:
                latestReviewEntry
                  ?.changedAt ||
                submission.updatedAt,
              reviewedBy:
                latestReviewEntry
                  ?.changedBy
                  ?.name ||
                "Admin",
              remarks:
                latestReviewEntry
                  ?.remarks ||
                submission.remarks ||
                "",
            };
          }
        );

      return res.json({
        totalProjects,
        deliveryProjects,
        totalUsers,
        totalTasks: allTasks.length,
        totalTeams,
        totalLeaders,
        pendingReview,
        assignedUsers,
        waitlistedUsers,
        shortlistedUsers,
        submissionsPendingReview,
        showcaseProjects,
        teamsWithoutLeaders,
        projectsAtCapacity,
        deliveryProjectsWithoutTeams,
        membershipsWithoutTeam,
        assignedUsersWithoutMembership,
        tasksPendingReview:
          taskStatusCounts.submitted,
        taskStatusCounts,
        recentTaskReviewActivity,
        recentSubmissionReviewActivity,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
