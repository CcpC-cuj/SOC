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

      console.log(roles);

        console.log(
        Array.isArray(
            roles
        )
        );

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

      console.log(
        allowedUserRoles
    );

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


// ASSIGN TEAM LEADER
export const assignLeader =
  async (req, res) => {

    try {

      const {
        projectId,
        userId,
      } = req.body;

      // REMOVE OLD LEADER
      await ProjectMember.updateMany(
        {
          project: projectId,
        },
        {
          isLeader: false,
        }
      );

      // FIND MEMBER
      const member =
        await ProjectMember.findOne({
          project: projectId,

          user: userId,
        });

      if (!member) {

        return res.status(404)
          .json({
            message:
              "Member not found",
          });
      }

      // ASSIGN LEADER
      member.isLeader = true;

      await member.save();

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