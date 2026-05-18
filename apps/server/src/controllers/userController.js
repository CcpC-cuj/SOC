import User
from "../models/User.js";
import ProjectMember
from "../models/ProjectMember.js";
import Task from "../models/Task.js";
import Project from "../models/Project.js";

// GET ALL USERS
export const getUsers =
  async (req, res) => {

    try {

      const users =
        await User.find()
          .select("-password");

      // ADD PROJECTS
      const usersWithProjects =
        await Promise.all(

          users.map(
            async (user) => {

              const memberships =
                await ProjectMember
                  .find({
                    user:
                      user._id,
                  })
                  .populate(
                    "project",
                    "title status"
                  );

              return {
                ...user.toObject(),

                memberships,
              };
            }
          )
        );

      res.json(
        usersWithProjects
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
};

// DELETE USER
export const deleteUser =
  async (req, res) => {

    try {

      await User.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "User deleted",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
};

// GET MY PROFILE
export const getMyProfile =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user._id
        ).select("-password");

      res.json(user);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
};

// UPDATE PROFILE
export const updateProfile =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user._id
        );

      if (!user) {

        return res.status(404)
          .json({
            message:
              "User not found",
          });
      }

      user.name =
        req.body.name
        || user.name;

      user.bio =
        req.body.bio
        || user.bio;

      user.department =
        req.body.department
        || user.department;

      user.roll =
        req.body.roll
        || user.roll;

      user.github =
        req.body.github
        || user.github;

      user.linkedin =
        req.body.linkedin
        || user.linkedin;

      user.skills =
        req.body.skills
        || user.skills;

      await user.save();

      res.json(user);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
};


// GET PROFILE DASHBOARD
export const getProfileDashboard =
  async (req, res) => {

    try {

      // JOINED PROJECTS
      const memberships =
        await ProjectMember.find({
          user: req.user._id,
        })
        .populate(
          "project"
        );

      // TASKS
      const tasks =
        await Task.find({
          assignedTo:
            req.user._id,
        });

      // COMPLETED PROJECTS
      const completedProjects =
        memberships.filter(
          (member) =>
            member.project
              ?.status
            === "completed"
        );

      res.json({
        joinedProjects:
          memberships,

        completedProjects,

        tasks,

        stats: {
          totalProjects:
            memberships.length,

          completedProjects:
            completedProjects.length,

          totalTasks:
            tasks.length,

          approvedTasks:
            tasks.filter(
              (task) =>
                task.status
                === "approved"
            ).length,
        },
      });

    } catch (error) {

      res.status(500)
        .json({
          message:
            error.message,
        });

    }
};