// src/controllers/projectMemberController.js

import ProjectMember
from "../models/ProjectMember.js";

import Project
from "../models/Project.js";

// USER ALLOWED ROLES
const allowedUserRoles = [
  "frontend-developer",
  "backend-developer",
  "ai-ml-engineer",
  "ui-ux-designer",
];

// ================= JOIN PROJECT =================

// ================= JOIN PROJECT =================

export const joinProject =
  async (req, res) => {

    try {

      const {
        projectId,
        roles,
      } = req.body;

      // CHECK PROJECT
      const project =
        await Project.findById(
          projectId
        );

      if (!project) {

        return res.status(404).json({
          message:
            "Project not found",
        });
      }

      // ONLY ACTIVE PROJECTS
      if (
        project.status
        !== "active"
      ) {

        return res.status(400).json({
          message:
            "Project is not active",
        });
      }

      // INVALID ROLE
        if (
        !Array.isArray(
            roles
        )
        ||
        roles.length === 0
        ||
        !roles.every(
            (role) =>
            allowedUserRoles.includes(
                role
            )
        )
        ) {

        return res.status(400).json({
            message:
            "Invalid role selection",
        });
        }

      // ALREADY JOINED
      const exists =
        await ProjectMember.findOne({
          user: req.user._id,

          project: projectId,
        });

      if (exists) {

        return res.status(400).json({
          message:
            "Already joined project",
        });
      }

      // CREATE MEMBER
      const member =
        await ProjectMember.create({
          user: req.user._id,

          project: projectId,

          roles,
        });

      res.status(201).json({
        message:
          "Joined project successfully",

        member,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
};

// ================= GET PROJECT MEMBERS =================

export const getProjectMembers =
  async (req, res) => {

    try {

      const members =
        await ProjectMember.find({
          project:
            req.params.projectId,
        })
        .populate(
          "user",
          "name email skills authority"
        );

      res.json(members);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
};

// ================= ASSIGN LEADER =================

export const assignLeader =
  async (req, res) => {

    try {

      const {
        projectId,
        userId,
        roles,
      } = req.body;

      const allowedLeaderRoles = [
        "frontend-leader",
        "backend-leader",
        "ai-ml-leader",
        "ui-ux-leader",
      ];

      // INVALID ROLE
      if (
        !Array.isArray(
          roles
        )
        ||
        roles.length === 0
        ||
        !roles.every(
          (role) =>
            allowedLeaderRoles.includes(
              role
            )
        )
      )  {

        return res.status(400).json({
          message:
            "Invalid leader role",
        });
      }

      // CHECK EXISTING MEMBER
      let member =
        await ProjectMember.findOne({
          project: projectId,

          user: userId,
        });

      // UPDATE EXISTING
      if (member) {

        member.roles = roles;

        await member.save();

      }

      // CREATE NEW
      else {

        member =
          await ProjectMember.create({
            project:
              projectId,

            user:
              userId,

            roles,
          });
      }

      res.json({
        message:
          "Leader assigned successfully",

        member,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
};