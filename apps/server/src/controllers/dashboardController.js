import Project from "../models/Project.js";
import ProjectMember from "../models/ProjectMember.js";
import Task from "../models/Task.js";
import User from "../models/User.js";

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
        .populate(
          "team",
          "name focus capacity"
        );

    const tasks = await Task.find({
      assignedTo: req.user._id,
    }).populate(
      "project",
      "title"
    );

    const analytics = {
      totalProjects:
        memberships.length,
      totalTasks: tasks.length,
      pendingTasks:
        tasks.filter(
          (task) =>
            task.status === "pending"
        ).length,
      submittedTasks:
        tasks.filter(
          (task) =>
            task.status === "submitted"
        ).length,
      approvedTasks:
        tasks.filter(
          (task) =>
            task.status === "approved"
        ).length,
    };

    return res.json({
      user,
      memberships,
      tasks,
      analytics,
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
        totalUsers,
        totalTasks,
        totalLeaders,
        pendingReview,
        assignedUsers,
        showcaseProjects,
      ] = await Promise.all([
        Project.countDocuments(),
        User.countDocuments({
          authority: "user",
        }),
        Task.countDocuments(),
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
        Project.countDocuments({
          isShowcase: true,
        }),
      ]);

      return res.json({
        totalProjects,
        totalUsers,
        totalTasks,
        totalLeaders,
        pendingReview,
        assignedUsers,
        showcaseProjects,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
