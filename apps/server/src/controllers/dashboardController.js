// src/controllers/dashboardController.js

import User from "../models/User.js";

import ProjectMember
from "../models/ProjectMember.js";

import Project
from "../models/Project.js";

import Task
from "../models/Task.js";


export const getDashboard =
  async (req, res) => {

    try {

      // USER
      const user =
        await User.findById(
          req.user._id
        ).select("-password");

      // PROJECT MEMBERSHIPS
      const memberships =
        await ProjectMember.find({
          user: req.user._id,
        })
        .populate("project");

      // TASKS
      const tasks =
        await Task.find({
          assignedTo:
            req.user._id,
        })
        .populate(
          "project",
          "title"
        );

      // ANALYTICS
      const analytics = {

        totalProjects:
          memberships.length,

        totalTasks:
          tasks.length,

        pendingTasks:
          tasks.filter(
            (task) =>
              task.status ===
              "pending"
          ).length,

        submittedTasks:
          tasks.filter(
            (task) =>
              task.status ===
              "submitted"
          ).length,

        approvedTasks:
          tasks.filter(
            (task) =>
              task.status ===
              "approved"
          ).length,
      };

      res.json({
        user,

        memberships,

        tasks,

        analytics,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
};


// =====================================
// ADMIN DASHBOARD
// =====================================
export const getAdminDashboard =
  async (req, res) => {

    try {

      // TOTAL PROJECTS
      const totalProjects =
        await Project.countDocuments();

      // TOTAL USERS
      const totalUsers =
        await User.countDocuments({
          authority: "user",
        });

      // TOTAL TASKS
      const totalTasks =
        await Task.countDocuments();

      // TOTAL LEADERS
      const totalLeaders =
        await ProjectMember.countDocuments({
          isLeader: true,
        });

      res.json({
        totalProjects,
        totalUsers,
        totalTasks,
        totalLeaders,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
};