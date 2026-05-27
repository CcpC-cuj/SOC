import Project from "../models/Project.js";
import ProjectMember from "../models/ProjectMember.js";
import Task from "../models/Task.js";

export const createTask = async (
  req,
  res
) => {
  try {
    const {
      title,
      description,
      projectId,
      assignedTo,
      taskType,
      deadline,
    } = req.body;

    const project =
      await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (project.status === "completed") {
      return res.status(400).json({
        message: "Project completed",
      });
    }

    const isLeader =
      await ProjectMember.findOne({
        user: req.user._id,
        project: projectId,
        isLeader: true,
        status: "active",
      });

    if (!isLeader) {
      return res.status(403).json({
        message: "Leader only",
      });
    }

    const member =
      await ProjectMember.findOne({
        user: assignedTo,
        project: projectId,
        status: "active",
      });

    if (!member) {
      return res.status(400).json({
        message:
          "User is not a project member",
      });
    }

    const task = await Task.create({
      title,
      description,
      project: projectId,
      assignedTo,
      taskType,
      deadline,
      createdBy: req.user._id,
    });

    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getProjectTasks =
  async (req, res) => {
    try {
      const isAdmin =
        req.user.authority === "admin";

      if (!isAdmin) {
        const isMember =
          await ProjectMember.findOne({
            user: req.user._id,
            project:
              req.params.projectId,
            status: "active",
          });

        if (!isMember) {
          return res.status(403).json({
            message: "Access denied",
          });
        }
      }

      const tasks = await Task.find({
        project: req.params.projectId,
      })
        .populate(
          "assignedTo",
          "name email"
        )
        .populate(
          "createdBy",
          "name"
        )
        .sort({
          createdAt: -1,
        });

      return res.json(tasks);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

export const updateTaskStatus =
  async (req, res) => {
    try {
      const {
        status,
        submissionLink,
      } = req.body;

      const task =
        await Task.findById(
          req.params.id
        );

      if (!task) {
        return res.status(404).json({
          message: "Task not found",
        });
      }

      const project =
        await Project.findById(
          task.project
        );

      if (project.status === "completed") {
        return res.status(400).json({
          message: "Project completed",
        });
      }

      const isLeader =
        await ProjectMember.findOne({
          user: req.user._id,
          project: task.project,
          isLeader: true,
          status: "active",
        });

      if (
        task.assignedTo.toString()
          !==
          req.user._id.toString()
        &&
        !isLeader
        &&
        req.user.authority !== "admin"
      ) {
        return res.status(403).json({
          message: "Not authorized",
        });
      }

      task.status = status;

      if (submissionLink) {
        task.submissionLinks.push({
          title: "Submission",
          url: submissionLink,
        });
      }

      await task.save();

      return res.json(task);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

export const approveTask = async (
  req,
  res
) => {
  try {
    const task =
      await Task.findById(
        req.params.id
      );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.status = "approved";
    await task.save();

    return res.json({
      message: "Task approved",
      task,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllTasks = async (
  req,
  res
) => {
  try {
    const tasks = await Task.find()
      .populate(
        "project",
        "title domain status"
      )
      .populate(
        "assignedTo",
        "name email"
      )
      .populate(
        "createdBy",
        "name email"
      )
      .sort({
        createdAt: -1,
      });

    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getMyTasks = async (
  req,
  res
) => {
  try {
    const tasks = await Task.find({
      assignedTo: req.user._id,
    })
      .populate(
        "project",
        "title"
      )
      .populate(
        "createdBy",
        "name"
      );

    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
