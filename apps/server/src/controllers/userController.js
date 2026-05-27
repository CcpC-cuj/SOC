import User from "../models/User.js";
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

const escapeHtml = (
  value = ""
) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

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

    const query = {
      authority: "user",
    };

    if (
      status
      &&
      REGISTRATION_STATUSES.includes(
        status
      )
    ) {
      query.registrationStatus =
        status;
    }

    if (
      experience
      &&
      EXPERIENCE_LEVELS.includes(
        experience
      )
    ) {
      query.experienceLevel =
        experience;
    }

    if (
      domain
      &&
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

    const users =
      await User.find(query)
        .select("-password")
        .sort({
          createdAt: -1,
        });

    const usersWithContext =
      await Promise.all(
        users.map(async (user) => {
          const memberships =
            await ProjectMember.find({
              user: user._id,
              status: "active",
            })
              .populate(
                "project",
                "title session domain status isShowcase"
              )
              .populate(
                "team",
                "name focus capacity"
              );

          const teams =
            await Team.find({
              members: user._id,
            }).select(
              "name focus capacity project"
            );

          return {
            ...user.toObject(),
            memberships,
            teams,
          };
        })
      );

    return res.json(usersWithContext);
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

      if (!subject || !message) {
        return res.status(400).json({
          message:
            "Subject and message are required.",
        });
      }

      if (recipientIds.length === 0) {
        return res.status(400).json({
          message:
            "Choose at least one recipient.",
        });
      }

      const recipients =
        await User.find({
          _id: {
            $in: recipientIds,
          },
          authority: "user",
        }).select("name email");

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

    return res.json(user);
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

    const {
      name,
      bio,
      department,
      roll,
      program,
      phone,
      github,
      linkedin,
      portfolio,
      experienceLevel,
      skills,
      preferredDomains,
      preferredRoles,
      availability,
      priorExperience,
      whyJoin,
    } = req.body;

    user.name = name || user.name;
    user.bio = bio || user.bio;
    user.department =
      department || user.department;
    user.roll = roll || user.roll;
    user.program =
      program || user.program;
    user.phone = phone || user.phone;
    user.github = github || user.github;
    user.linkedin =
      linkedin || user.linkedin;
    user.portfolio =
      portfolio || user.portfolio;
    user.availability =
      availability || user.availability;
    user.priorExperience =
      priorExperience ||
      user.priorExperience;
    user.whyJoin =
      whyJoin || user.whyJoin;
    user.experienceLevel =
      EXPERIENCE_LEVELS.includes(
        experienceLevel
      )
        ? experienceLevel
        : user.experienceLevel;
    user.skills =
      sanitizeArray(skills) ||
      user.skills;
    user.preferredDomains =
      sanitizeArray(
        preferredDomains,
        DOMAIN_OPTIONS
      );
    user.preferredRoles =
      sanitizeArray(
        preferredRoles,
        ROLE_OPTIONS
      );

    await user.save();

    return res.json(user);
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
