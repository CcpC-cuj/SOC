import {
  ROLE_OPTIONS,
} from "../constants/registration.js";
import Project from "../models/Project.js";
import ProjectMember from "../models/ProjectMember.js";
import Team from "../models/Team.js";
import User from "../models/User.js";

const sanitizeRoles = (
  roles = []
) =>
  Array.isArray(roles)
    ? roles
        .map((role) =>
          String(role).trim()
        )
        .filter((role) =>
          ROLE_OPTIONS.includes(role)
        )
    : [];

const removeUserFromTeams = async (
  userId
) => {
  await Team.updateMany(
    {
      members: userId,
    },
    {
      $pull: {
        members: userId,
      },
    }
  );

  await Team.updateMany(
    {
      leader: userId,
    },
    {
      $unset: {
        leader: "",
      },
    }
  );
};

export const joinProject = async (
  req,
  res
) =>
  res.status(403).json({
    message:
      "Direct project joining is disabled. Register first and wait for organizer assignment.",
  });

export const getProjectMembers =
  async (req, res) => {
    try {
      const { projectId } =
        req.params;

      const isAdmin =
        req.user.authority === "admin";

      if (!isAdmin) {
        const membership =
          await ProjectMember.findOne({
            user: req.user._id,
            project: projectId,
            status: "active",
          });

        if (!membership) {
          return res.status(403).json({
            message:
              "Access denied",
          });
        }
      }

      const members =
        await ProjectMember.find({
          project: projectId,
          status: "active",
        })
          .populate(
            "user",
            isAdmin
              ? "name email skills authority experienceLevel department program preferredDomains preferredRoles github"
              : "name email skills experienceLevel github"
          )
          .populate(
            "team",
            "name focus capacity"
          )
          .sort({
            isLeader: -1,
            createdAt: 1,
          });

      return res.json(members);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

export const assignMemberToProject =
  async (req, res) => {
    try {
      const {
        userId,
        projectId,
        teamId,
        roles,
        isLeader = false,
        adminNotes = "",
      } = req.body;

      if (!userId || !projectId) {
        return res.status(400).json({
          message:
            "userId and projectId are required.",
        });
      }

      const normalizedRoles =
        sanitizeRoles(roles);

      if (
        normalizedRoles.length === 0
      ) {
        return res.status(400).json({
          message:
            "Select at least one valid role before assigning a member.",
        });
      }

      const user =
        await User.findById(userId);

      if (!user || user.authority !== "user") {
        return res.status(404).json({
          message:
            "Participant not found.",
        });
      }

      const project =
        await Project.findById(
          projectId
        );

      if (!project) {
        return res.status(404).json({
          message:
            "Project not found.",
        });
      }

      if (project.isShowcase) {
        return res.status(400).json({
          message:
            "Showcase projects are for attraction only. Create a real delivery project before assigning members.",
        });
      }

      if (
        !project.acceptingAssignments
      ) {
        return res.status(400).json({
          message:
            "This project is not accepting assignments right now.",
        });
      }

      if (
        ["completed", "closed"].includes(
          project.status
        )
      ) {
        return res.status(400).json({
          message:
            "Cannot assign members to a completed or closed project.",
        });
      }

      let team = null;

      if (teamId) {
        team = await Team.findById(
          teamId
        );

        if (
          !team
          || team.project.toString()
            !== projectId
        ) {
          return res.status(400).json({
            message:
              "Selected team does not belong to this project.",
          });
        }
      }

      const existingMemberships =
        await ProjectMember.find({
          user: userId,
          status: "active",
        });

      const existingForProject =
        existingMemberships.find(
          (membership) =>
            membership.project.toString()
            === projectId
        );

      const activeMemberCount =
        await ProjectMember.countDocuments(
          {
            project: projectId,
            status: "active",
            ...(existingForProject
              ? {
                  _id: {
                    $ne:
                      existingForProject._id,
                  },
                }
              : {}),
          }
        );

      if (
        activeMemberCount
        >= project.maxMembers
      ) {
        user.registrationStatus =
          "waitlisted";
        user.adminNotes =
          String(adminNotes || "").trim();
        user.assignmentHistory.push({
          action: "status-updated",
          status: "waitlisted",
          note:
            "Automatically waitlisted because the selected project is full.",
          project: project._id,
          changedBy: req.user._id,
        });
        await user.save();

        return res.status(409).json({
          message:
            "Project is already full. The participant has been moved to the waitlist.",
        });
      }

      for (const membership of existingMemberships) {
        if (
          membership.project.toString()
          !== projectId
        ) {
          membership.status =
            "removed";
          membership.isLeader = false;
          membership.team = undefined;
          await membership.save();
        }
      }

      await removeUserFromTeams(userId);

      const membership =
        existingForProject ||
        new ProjectMember({
          user: userId,
          project: projectId,
        });

      membership.project = projectId;
      membership.team = team?._id;
      membership.roles =
        normalizedRoles;
      membership.status = "active";
      membership.isLeader =
        Boolean(isLeader);
      membership.assignedBy =
        req.user._id;
      membership.assignedAt =
        new Date();

      await membership.save();

      if (team) {
        const uniqueMembers =
          new Set(
            team.members.map((memberId) =>
              memberId.toString()
            )
          );

        uniqueMembers.add(
          user._id.toString()
        );
        team.members = [
          ...uniqueMembers,
        ];

        if (isLeader) {
          team.leader = user._id;
        }

        await team.save();
      }

      user.registrationStatus =
        "assigned";
      user.adminNotes =
        String(adminNotes || "").trim();
      user.assignmentHistory.push({
        action:
          existingForProject
            ? "reassigned"
            : "assigned",
        status: "assigned",
        note:
          user.adminNotes ||
          `Assigned to ${project.title}.`,
        project: project._id,
        team: team?._id,
        roles: normalizedRoles,
        changedBy: req.user._id,
      });
      await user.save();

      const populatedMember =
        await ProjectMember.findById(
          membership._id
        )
          .populate(
            "user",
            "name email department program skills preferredDomains preferredRoles registrationStatus"
          )
          .populate(
            "project",
            "title domain session maxMembers status"
          )
          .populate(
            "team",
            "name focus capacity leader"
          );

      return res.status(200).json({
        message:
          "Participant assigned successfully.",
        member: populatedMember,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

export const assignLeader = async (
  req,
  res
) => {
  try {
    const {
      projectId,
      userId,
    } = req.body;

    const member =
      await ProjectMember.findOne({
        project: projectId,
        user: userId,
        status: "active",
      });

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    await ProjectMember.updateMany(
      {
        project: projectId,
      },
      {
        isLeader: false,
      }
    );

    member.isLeader = true;
    await member.save();

    if (member.team) {
      await Team.findByIdAndUpdate(
        member.team,
        {
          leader: userId,
        }
      );
    }

    return res.json({
      message:
        "Leader assigned successfully",
      member,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
