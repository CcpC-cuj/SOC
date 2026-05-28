import User from "../models/User.js";
import ProjectSubmission from "../models/ProjectSubmission.js";
import ProjectMember from "../models/ProjectMember.js";
import Task from "../models/Task.js";
import Team from "../models/Team.js";
import {
  DOMAIN_OPTIONS,
  EXPERIENCE_LEVELS,
  REGISTRATION_STATUSES,
  ROLE_OPTIONS,
} from "../constants/registration.js";
import {
  sendTransactionalEmail,
} from "../utils/emailService.js";

const sanitizeArray = (
  values = [],
  allowedValues = null
) => {
  const normalized =
    Array.isArray(values)
      ? values
          .map((value) =>
            String(value).trim()
          )
          .filter(Boolean)
      : [];

  if (!allowedValues) {
    return normalized;
  }

  return normalized.filter((value) =>
    allowedValues.includes(value)
  );
};

const appendHistoryEntry = (
  user,
  entry
) => {
  user.assignmentHistory.push({
    ...entry,
    changedAt: new Date(),
  });
};

const PROFILE_FIELD_LABELS = {
  name: "name",
  bio: "bio",
  department: "department",
  roll: "roll number",
  program: "program",
  phone: "phone",
  github: "GitHub",
  linkedin: "LinkedIn",
  portfolio: "portfolio",
  experienceLevel:
    "experience level",
  skills: "skills",
  preferredDomains:
    "preferred domains",
  preferredRoles:
    "preferred roles",
  availability:
    "availability",
  priorExperience:
    "prior experience",
  whyJoin: "motivation",
};

const ALL_PROFILE_FIELDS = [
  "name",
  "bio",
  "department",
  "roll",
  "program",
  "phone",
  "github",
  "linkedin",
  "portfolio",
  "experienceLevel",
  "skills",
  "preferredDomains",
  "preferredRoles",
  "availability",
  "priorExperience",
  "whyJoin",
];

const LIMITED_PROFILE_FIELDS = [
  "phone",
  "github",
  "linkedin",
  "portfolio",
];

const normalizeOptionalText = (
  value
) =>
  typeof value === "string"
    ? value.trim()
    : undefined;

const getEditableProfileFields = (
  status
) =>
  status === "pending_review"
    ? ALL_PROFILE_FIELDS
    : LIMITED_PROFILE_FIELDS;

const buildProfileEditPolicy = (
  status
) => {
  const directEditableFields =
    getEditableProfileFields(status);

  return {
    mode:
      status === "pending_review"
        ? "full"
        : "limited",
    directEditableFields,
    requestOnlyFields:
      ALL_PROFILE_FIELDS.filter(
        (field) =>
          !directEditableFields.includes(
            field
          )
      ),
    canRequestLockedFields:
      status !== "pending_review",
  };
};

const serializeOwnProfile = (user) => ({
  ...user.toObject(),
  profileEditPolicy:
    buildProfileEditPolicy(
      user.registrationStatus
    ),
});

const buildProfileUpdatePayload = (
  body
) => ({
  name: normalizeOptionalText(body.name),
  bio: normalizeOptionalText(body.bio),
  department:
    normalizeOptionalText(
      body.department
    ),
  roll: normalizeOptionalText(body.roll),
  program:
    normalizeOptionalText(body.program),
  phone: normalizeOptionalText(body.phone),
  github:
    normalizeOptionalText(body.github),
  linkedin:
    normalizeOptionalText(body.linkedin),
  portfolio:
    normalizeOptionalText(body.portfolio),
  availability:
    normalizeOptionalText(
      body.availability
    ),
  priorExperience:
    normalizeOptionalText(
      body.priorExperience
    ),
  whyJoin:
    normalizeOptionalText(body.whyJoin),
  experienceLevel:
    typeof body.experienceLevel
      === "string"
      && EXPERIENCE_LEVELS.includes(
        body.experienceLevel
      )
      ? body.experienceLevel
      : undefined,
  skills: Array.isArray(body.skills)
    ? sanitizeArray(body.skills)
    : undefined,
  preferredDomains:
    Array.isArray(
      body.preferredDomains
    )
      ? sanitizeArray(
          body.preferredDomains,
          DOMAIN_OPTIONS
        )
      : undefined,
  preferredRoles:
    Array.isArray(
      body.preferredRoles
    )
      ? sanitizeArray(
          body.preferredRoles,
          ROLE_OPTIONS
        )
      : undefined,
});

const hasProfileFieldChanged = ({
  currentValue,
  nextValue,
}) => {
  if (nextValue === undefined) {
    return false;
  }

  if (
    Array.isArray(currentValue) ||
    Array.isArray(nextValue)
  ) {
    return JSON.stringify(
      Array.isArray(currentValue)
        ? currentValue
        : []
    )
      !==
      JSON.stringify(
        Array.isArray(nextValue)
          ? nextValue
          : []
      );
  }

  return String(currentValue || "")
    !== String(nextValue || "");
};

const formatFieldList = (
  fields = []
) =>
  fields
    .map(
      (field) =>
        PROFILE_FIELD_LABELS[field] ||
        field
    )
    .join(", ");

const escapeHtml = (
  value = ""
) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const parsePaginationValue = ({
  value,
  fallback,
  max = 100,
}) => {
  const parsed = Number.parseInt(
    value,
    10
  );

  if (
    Number.isNaN(parsed) ||
    parsed < 1
  ) {
    return fallback;
  }

  return Math.min(parsed, max);
};

const buildAdminUserQuery = ({
  q,
  status,
  domain,
  experience,
}) => {
  const query = {
    authority: "user",
  };

  if (
    status &&
    REGISTRATION_STATUSES.includes(
      status
    )
  ) {
    query.registrationStatus =
      status;
  }

  if (
    experience &&
    EXPERIENCE_LEVELS.includes(
      experience
    )
  ) {
    query.experienceLevel =
      experience;
  }

  if (
    domain &&
    DOMAIN_OPTIONS.includes(domain)
  ) {
    query.preferredDomains = domain;
  }

  if (q) {
    query.$or = [
      {
        name: {
          $regex: q,
          $options: "i",
        },
      },
      {
        email: {
          $regex: q,
          $options: "i",
        },
      },
      {
        roll: {
          $regex: q,
          $options: "i",
        },
      },
      {
        program: {
          $regex: q,
          $options: "i",
        },
      },
    ];
  }

  return query;
};

const buildPaginationMeta = ({
  page,
  limit,
  totalItems,
}) => {
  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / limit)
  );

  return {
    page,
    limit,
    totalItems,
    totalPages,
    hasNextPage:
      page < totalPages,
    hasPreviousPage: page > 1,
  };
};

const serializeUserSummary = ({
  user,
  memberships,
}) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  department: user.department,
  program: user.program,
  roll: user.roll,
  experienceLevel:
    user.experienceLevel,
  preferredDomains:
    user.preferredDomains,
  preferredRoles:
    user.preferredRoles,
  registrationStatus:
    user.registrationStatus,
  skills: user.skills,
  whyJoin: user.whyJoin,
  pendingProfileChangeRequest:
    user
      .pendingProfileChangeRequest
      ?.requestedAt
      ? {
          requestedAt:
            user
              .pendingProfileChangeRequest
              .requestedAt,
        }
      : null,
  memberships,
});

const loadMembershipContextByUserIds =
  async (userIds = []) => {
    if (userIds.length === 0) {
      return new Map();
    }

    const memberships =
      await ProjectMember.find({
        user: {
          $in: userIds,
        },
        status: "active",
      })
        .populate(
          "project",
          "title session domain status isShowcase acceptingAssignments"
        )
        .populate(
          "team",
          "name focus capacity members"
        )
        .sort({
          assignedAt: -1,
          createdAt: -1,
        });

    const membershipMap = new Map();

    memberships.forEach((membership) => {
      const userId =
        String(membership.user);

      if (
        !membershipMap.has(userId)
      ) {
        membershipMap.set(userId, []);
      }

      membershipMap
        .get(userId)
        .push(membership);
    });

    return membershipMap;
  };

export const getUsers = async (
  req,
  res
) => {
  try {
    const {
      q,
      status,
      domain,
      experience,
    } = req.query;

    const limit =
      parsePaginationValue({
        value: req.query.limit,
        fallback: 12,
        max: 100,
      });
    const requestedPage =
      parsePaginationValue({
        value: req.query.page,
        fallback: 1,
        max: 10000,
      });
    const query = buildAdminUserQuery({
      q,
      status,
      domain,
      experience,
    });

    const totalItems =
      await User.countDocuments(
        query
      );
    const totalPages = Math.max(
      1,
      Math.ceil(totalItems / limit)
    );
    const page =
      totalItems === 0
        ? 1
        : Math.min(
            requestedPage,
            totalPages
          );
    const skip =
      (page - 1) * limit;

    const users = await User.find(query)
      .select(
        "name email department program roll experienceLevel preferredDomains preferredRoles registrationStatus skills whyJoin pendingProfileChangeRequest createdAt"
      )
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit)
      .lean();

    const membershipMap =
      await loadMembershipContextByUserIds(
        users.map(
          (user) => user._id
        )
      );

    const items = users.map((user) =>
      serializeUserSummary({
        user,
        memberships:
          membershipMap.get(
            String(user._id)
          ) || [],
      })
    );

    return res.json({
      items,
      pagination:
        buildPaginationMeta({
          page,
          limit,
          totalItems,
        }),
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserById = async (
  req,
  res
) => {
  try {
    const user =
      await User.findOne({
        _id: req.params.id,
        authority: "user",
      }).select("-password");

    if (!user) {
      return res.status(404).json({
        message:
          "Participant not found.",
      });
    }

    const memberships =
      await ProjectMember.find({
        user: user._id,
        status: "active",
      })
        .populate(
          "project",
          "title session domain status isShowcase acceptingAssignments"
        )
        .populate(
          "team",
          "name focus capacity members"
        )
        .sort({
          assignedAt: -1,
          createdAt: -1,
        });

    const teams = await Team.find({
      members: user._id,
    })
      .select(
        "name focus capacity project leader members"
      )
      .populate(
        "project",
        "title domain status"
      )
      .populate(
        "leader",
        "name email"
      )
      .sort({
        createdAt: 1,
      });

    return res.json({
      ...user.toObject(),
      memberships,
      teams,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const exportUsersCsv = async (
  req,
  res
) => {
  try {
    const users = await User.find({
      authority: "user",
    }).select("-password");

    const csvRows = [
      [
        "Name",
        "Email",
        "Department",
        "Program",
        "Roll",
        "Experience",
        "Registration Status",
        "Preferred Domains",
        "Preferred Roles",
        "Skills",
        "GitHub",
        "Availability",
      ].join(","),
      ...users.map((user) =>
        [
          user.name,
          user.email,
          user.department || "",
          user.program || "",
          user.roll || "",
          user.experienceLevel || "",
          user.registrationStatus ||
            "",
          user.preferredDomains.join(
            " | "
          ),
          user.preferredRoles.join(
            " | "
          ),
          user.skills.join(" | "),
          user.github || "",
          user.availability || "",
        ]
          .map((value) =>
            `"${String(value).replace(
              /"/g,
              '""'
            )}"`
          )
          .join(",")
      ),
    ];

    res.setHeader(
      "Content-Type",
      "text/csv"
    );
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="soc-users.csv"'
    );

    return res.send(csvRows.join("\n"));
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const sendAnnouncement =
  async (req, res) => {
    try {
      const subject = String(
        req.body.subject || ""
      ).trim();
      const message = String(
        req.body.message || ""
      ).trim();
      const allMatching =
        Boolean(
          req.body.allMatching
        );
      const recipientIds =
        Array.isArray(
          req.body.recipientIds
        )
          ? req.body.recipientIds
              .map((value) =>
                String(value).trim()
              )
              .filter(Boolean)
          : [];
      const recipientFilter =
        req.body.filters || {};

      if (!subject || !message) {
        return res.status(400).json({
          message:
            "Subject and message are required.",
        });
      }

      if (
        !allMatching &&
        recipientIds.length === 0
      ) {
        return res.status(400).json({
          message:
            "Choose at least one recipient.",
        });
      }

      const recipientsQuery =
        allMatching
          ? buildAdminUserQuery({
              q: recipientFilter.q,
              status:
                recipientFilter.status,
              domain:
                recipientFilter.domain,
              experience:
                recipientFilter.experience,
            })
          : {
              _id: {
                $in: recipientIds,
              },
              authority: "user",
            };

      const recipients =
        await User.find(recipientsQuery)
          .select("name email");

      if (recipients.length === 0) {
        return res.status(404).json({
          message:
            "No matching recipients found.",
        });
      }

      const htmlMessage =
        escapeHtml(message).replaceAll(
          "\n",
          "<br />"
        );

      const deliveries =
        await Promise.allSettled(
          recipients.map((user) =>
            sendTransactionalEmail({
              to: user.email,
              subject,
              text:
                `Hi ${user.name},\n\n${message}\n\n- Seasons of Code`,
              html:
                `<p>Hi ${escapeHtml(user.name)},</p><p>${htmlMessage}</p><p>- Seasons of Code</p>`,
            })
          )
        );

      const deliveredCount =
        deliveries.filter(
          (delivery) =>
            delivery.status ===
              "fulfilled" &&
            delivery.value.delivered
        ).length;

      const skippedCount =
        deliveries.filter(
          (delivery) =>
            delivery.status ===
              "fulfilled" &&
            !delivery.value.delivered
        ).length;

      const failedCount =
        deliveries.filter(
          (delivery) =>
            delivery.status ===
            "rejected"
        ).length;

      return res.json({
        success: true,
        message:
          deliveredCount > 0
            ? "Announcement sent to the selected participants."
            : "Announcement prepared, but email delivery is not configured yet.",
        recipientCount:
          recipients.length,
        deliveredCount,
        skippedCount,
        failedCount,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

export const deleteUser = async (
  req,
  res
) => {
  try {
    const user =
      await User.findById(
        req.params.id
      );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const [
      activeMemberships,
      assignedTasks,
      createdTasks,
      taskCommentRefs,
      taskActivityRefs,
      submissions,
      submissionRevisionRefs,
      submissionHistoryRefs,
      leadingTeams,
    ] = await Promise.all([
      ProjectMember.countDocuments({
        user: req.params.id,
        status: "active",
      }),
      Task.countDocuments({
        assignedTo: req.params.id,
      }),
      Task.countDocuments({
        createdBy: req.params.id,
      }),
      Task.countDocuments({
        "comments.author":
          req.params.id,
      }),
      Task.countDocuments({
        "activity.actor":
          req.params.id,
      }),
      ProjectSubmission.countDocuments({
        submittedBy: req.params.id,
      }),
      ProjectSubmission.countDocuments({
        "revisions.savedBy":
          req.params.id,
      }),
      ProjectSubmission.countDocuments({
        "statusHistory.changedBy":
          req.params.id,
      }),
      Team.countDocuments({
        leader: req.params.id,
      }),
    ]);

    const blockers = [];

    if (activeMemberships > 0) {
      blockers.push(
        `${activeMemberships} active membership${activeMemberships === 1 ? "" : "s"}`
      );
    }

    if (assignedTasks > 0) {
      blockers.push(
        `${assignedTasks} assigned task${assignedTasks === 1 ? "" : "s"}`
      );
    }

    if (createdTasks > 0) {
      blockers.push(
        `${createdTasks} created task${createdTasks === 1 ? "" : "s"}`
      );
    }

    if (taskCommentRefs > 0) {
      blockers.push(
        `${taskCommentRefs} task discussion thread${taskCommentRefs === 1 ? "" : "s"}`
      );
    }

    if (taskActivityRefs > 0) {
      blockers.push(
        `${taskActivityRefs} task activity trail${taskActivityRefs === 1 ? "" : "s"}`
      );
    }

    if (submissions > 0) {
      blockers.push(
        `${submissions} submission owner record${submissions === 1 ? "" : "s"}`
      );
    }

    if (submissionRevisionRefs > 0) {
      blockers.push(
        `${submissionRevisionRefs} submission revision${submissionRevisionRefs === 1 ? "" : "s"}`
      );
    }

    if (submissionHistoryRefs > 0) {
      blockers.push(
        `${submissionHistoryRefs} submission history entry${submissionHistoryRefs === 1 ? "" : "s"}`
      );
    }

    if (leadingTeams > 0) {
      blockers.push(
        `${leadingTeams} team leadership assignment${leadingTeams === 1 ? "" : "s"}`
      );
    }

    if (blockers.length > 0) {
      return res.status(409).json({
        message:
          `This user still owns or appears in ${blockers.join(", ")}. Reassign or clean those records first, then delete the account.`,
      });
    }

    await User.findByIdAndDelete(
      req.params.id
    );

    await ProjectMember.deleteMany({
      user: req.params.id,
    });

    await Team.updateMany(
      {},
      {
        $pull: {
          members: req.params.id,
        },
      }
    );

    await Team.updateMany(
      {
        leader: req.params.id,
      },
      {
        $unset: {
          leader: "",
        },
      }
    );

    return res.json({
      message: "User deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getMyProfile = async (
  req,
  res
) => {
  try {
    const user =
      await User.findById(
        req.user._id
      ).select("-password");

    return res.json(
      serializeOwnProfile(user)
    );
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProfile = async (
  req,
  res
) => {
  try {
    const user =
      await User.findById(
        req.user._id
      );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const nextProfileValues =
      buildProfileUpdatePayload(req.body);
    const changeRequestNote =
      normalizeOptionalText(
        req.body.changeRequestNote
      );
    const directEditableFields =
      new Set(
        getEditableProfileFields(
          user.registrationStatus
        )
      );
    const directlyUpdatedFields = [];
    const lockedFieldChanges = {};

    if (
      Object.hasOwn(
        nextProfileValues,
        "name"
      ) &&
      nextProfileValues.name === ""
    ) {
      return res.status(400).json({
        message:
          "Name cannot be empty.",
      });
    }

    for (const field of ALL_PROFILE_FIELDS) {
      const nextValue =
        nextProfileValues[field];

      if (nextValue === undefined) {
        continue;
      }

      if (
        !hasProfileFieldChanged({
          currentValue: user[field],
          nextValue,
        })
      ) {
        continue;
      }

      if (
        directEditableFields.has(field)
      ) {
        user[field] = nextValue;
        directlyUpdatedFields.push(field);
      } else {
        lockedFieldChanges[field] =
          nextValue;
      }
    }

    if (
      user.registrationStatus ===
      "pending_review"
    ) {
      user.pendingProfileChangeRequest =
        null;
    }

    if (
      directlyUpdatedFields.length > 0
    ) {
      appendHistoryEntry(user, {
        action: "profile-updated",
        status:
          user.registrationStatus,
        note:
          `Profile updated: ${formatFieldList(directlyUpdatedFields)}.`,
        changedBy: user._id,
      });
    }

    const requestedFields =
      Object.keys(lockedFieldChanges);

    if (requestedFields.length > 0) {
      const requestSummary =
        `Requested review for changes to ${formatFieldList(requestedFields)}.`;

      user.pendingProfileChangeRequest = {
        note:
          changeRequestNote ||
          requestSummary,
        requestedFields,
        requestedValues:
          lockedFieldChanges,
        requestedAt: new Date(),
      };

      appendHistoryEntry(user, {
        action: "change-requested",
        status:
          user.registrationStatus,
        note: changeRequestNote
          ? `${requestSummary} Note: ${changeRequestNote}`
          : requestSummary,
        changedBy: user._id,
      });
    }

    await user.save();

    const updateMessages = [];

    if (
      directlyUpdatedFields.length > 0
    ) {
      updateMessages.push(
        user.registrationStatus ===
          "pending_review"
          ? "Profile updated successfully."
          : "Allowed profile fields were updated."
      );
    }

    if (requestedFields.length > 0) {
      updateMessages.push(
        "Locked registration fields were saved as a change request for organizer review."
      );
    }

    if (updateMessages.length === 0) {
      updateMessages.push(
        "No profile changes were detected."
      );
    }

    return res.json({
      ...serializeOwnProfile(user),
      updateMessage:
        updateMessages.join(" "),
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateRegistrationReview =
  async (req, res) => {
    try {
      const {
        registrationStatus,
        adminNotes,
      } = req.body;

      const user =
        await User.findById(
          req.params.id
        );

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      if (
        registrationStatus
        &&
        !REGISTRATION_STATUSES.includes(
          registrationStatus
        )
      ) {
        return res.status(400).json({
          message:
            "Invalid registration status.",
        });
      }

      if (registrationStatus) {
        user.registrationStatus =
          registrationStatus;
      }

      if (
        typeof adminNotes
        === "string"
      ) {
        user.adminNotes =
          adminNotes.trim();
      }

      if (
        ["waitlisted", "rejected"].includes(
          user.registrationStatus
        )
      ) {
        await ProjectMember.updateMany(
          {
            user: user._id,
            status: "active",
          },
          {
            status: "removed",
            isLeader: false,
            $unset: {
              team: "",
            },
          }
        );

        await Team.updateMany(
          {
            members: user._id,
          },
          {
            $pull: {
              members: user._id,
            },
          }
        );

        await Team.updateMany(
          {
            leader: user._id,
          },
          {
            $unset: {
              leader: "",
            },
          }
        );
      }

      appendHistoryEntry(user, {
        action: "status-updated",
        status:
          user.registrationStatus,
        note:
          user.adminNotes ||
          "Registration review updated.",
        changedBy: req.user._id,
      });

      await user.save();

      return res.json(user);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

export const getProfileDashboard =
  async (req, res) => {
    try {
      const memberships =
        await ProjectMember.find({
          user: req.user._id,
          status: "active",
        })
          .populate("project")
          .populate(
            "team",
            "name focus capacity"
          );

      const tasks = await Task.find({
        assignedTo: req.user._id,
      });

      const completedProjects =
        memberships.filter(
          (member) =>
            member.project?.status ===
            "completed"
        );

      return res.json({
        joinedProjects: memberships,
        completedProjects,
        tasks,
        stats: {
          totalProjects:
            memberships.length,
          completedProjects:
            completedProjects.length,
          totalTasks: tasks.length,
          approvedTasks:
            tasks.filter(
              (task) =>
                task.status ===
                "approved"
            ).length,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
