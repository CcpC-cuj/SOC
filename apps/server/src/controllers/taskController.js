import Project from "../models/Project.js";
import ProjectMember from "../models/ProjectMember.js";
import Task from "../models/Task.js";
import {
  canTransitionTask,
  isProjectWorkspaceWritable,
  normalizeTaskStatus,
} from "../utils/workflowRules.js";

const getTaskUserFields = (
  isAdmin
) => (isAdmin ? "name email" : "name");

const getTaskActorFields = (
  isAdmin
) =>
  isAdmin
    ? "name authority"
    : "name";

const populateTaskQuery = (
  query,
  {
    isAdmin = false,
  } = {}
) =>
  query
    .populate(
      "assignedTo",
      getTaskUserFields(isAdmin)
    )
    .populate(
      "createdBy",
      getTaskUserFields(isAdmin)
    )
    .populate(
      "project",
      "title domain status"
    )
    .populate(
      "comments.author",
      getTaskActorFields(isAdmin)
    )
    .populate(
      "activity.actor",
      getTaskActorFields(isAdmin)
    );

const appendActivity = (
  task,
  entry
) => {
  task.activity.push({
    ...entry,
    createdAt: new Date(),
  });
};

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

    if (
      !title ||
      !description ||
      !projectId ||
      !assignedTo
    ) {
      return res.status(400).json({
        message:
          "title, description, projectId, and assignedTo are required.",
      });
    }

    const project =
      await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (
      !isProjectWorkspaceWritable(
        project
      )
    ) {
      return res.status(409).json({
        message:
          "Tasks can only be created while the project workspace is active.",
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
      title: String(title).trim(),
      description:
        String(description).trim(),
      project: projectId,
      assignedTo,
      team: member.team,
      taskType,
      deadline,
      createdBy: req.user._id,
      status: "todo",
      activity: [
        {
          type: "created",
          toStatus: "todo",
          message:
            "Task created.",
          actor: req.user._id,
        },
      ],
    });

    const populatedTask =
      await populateTaskQuery(
        Task.findById(task._id),
        {
          isAdmin: false,
        }
      );

    return res
      .status(201)
      .json(populatedTask);
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

      const tasks =
        await populateTaskQuery(
          Task.find({
            project: req.params.projectId,
          }).sort({
            createdAt: -1,
          }),
          {
            isAdmin,
          }
        );

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
        note,
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

      if (!project) {
        return res.status(404).json({
          message:
            "Project not found for this task.",
        });
      }

      if (
        !isProjectWorkspaceWritable(
          project
        )
      ) {
        return res.status(409).json({
          message:
            "This workspace is read-only, so task progress cannot be changed right now.",
        });
      }

      if (
        task.assignedTo.toString() !==
        req.user._id.toString()
      ) {
        return res.status(403).json({
          message:
            "Only the assigned member can update this task.",
        });
      }

      const currentStatus =
        normalizeTaskStatus(task.status);
      const nextStatus =
        normalizeTaskStatus(status);

      if (
        ["approved", "rejected"].includes(
          nextStatus
        )
      ) {
        return res.status(400).json({
          message:
            "Approval and rejection happen from admin review.",
        });
      }

      if (
        !canTransitionTask({
          currentStatus,
          nextStatus,
          actor: "member",
        })
      ) {
        return res.status(400).json({
          message:
            `Tasks cannot move from ${currentStatus} to ${nextStatus} here.`,
        });
      }

      task.status = nextStatus;

      if (submissionLink) {
        task.submissionLinks.push({
          title: "Submission",
          url: submissionLink,
        });
      }

      if (typeof note === "string") {
        task.remarks =
          note.trim();
      }

      appendActivity(task, {
        type: "status-changed",
        fromStatus: currentStatus,
        toStatus: nextStatus,
        message:
          String(note || "").trim() ||
          `Status updated to ${nextStatus}.`,
        actor: req.user._id,
      });

      await task.save();

      const updatedTask =
        await populateTaskQuery(
          Task.findById(task._id),
          {
            isAdmin: false,
          }
        );

      return res.json(updatedTask);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

export const reviewTask = async (
  req,
  res
) => {
  try {
    const {
      status,
      reviewNote,
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

    const currentStatus =
      normalizeTaskStatus(task.status);
    const nextStatus =
      normalizeTaskStatus(status);

    if (
      !canTransitionTask({
        currentStatus,
        nextStatus,
        actor: "admin",
      })
    ) {
      return res.status(400).json({
        message:
          `Tasks in ${currentStatus} cannot be moved to ${nextStatus} from admin review.`,
      });
    }

    task.status = nextStatus;
    task.remarks = String(
      reviewNote || ""
    ).trim();

    appendActivity(task, {
      type: "reviewed",
      fromStatus: currentStatus,
      toStatus: nextStatus,
      message:
        task.remarks ||
        `Task ${nextStatus}.`,
      actor: req.user._id,
    });

    await task.save();

    const updatedTask =
      await populateTaskQuery(
        Task.findById(task._id),
        {
          isAdmin: true,
        }
      );

    return res.json({
      message:
        nextStatus === "approved"
          ? "Task approved"
          : "Task sent back for more work",
      task: updatedTask,
    });
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
  req.body.status = "approved";
  return reviewTask(req, res);
};

export const getAllTasks = async (
  req,
  res
) => {
  try {
    const tasks =
      await populateTaskQuery(
        Task.find().sort({
          createdAt: -1,
        }),
        {
          isAdmin: true,
        }
      );

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
    const tasks =
      await populateTaskQuery(
        Task.find({
          assignedTo: req.user._id,
        }).sort({
          createdAt: -1,
        }),
        {
          isAdmin: false,
        }
      );

    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const addTaskComment =
  async (req, res) => {
    try {
      const message = String(
        req.body.message || ""
      ).trim();

      if (!message) {
        return res.status(400).json({
          message:
            "Comment message is required.",
        });
      }

      const task =
        await Task.findById(
          req.params.id
        );

      if (!task) {
        return res.status(404).json({
          message: "Task not found",
        });
      }

      if (req.user.authority !== "admin") {
        const membership =
          await ProjectMember.findOne({
            user: req.user._id,
            project: task.project,
            status: "active",
          });

        if (!membership) {
          return res.status(403).json({
            message:
              "Not authorized to comment on this task.",
          });
        }

        const project =
          await Project.findById(
            task.project
          );

        if (!project) {
          return res.status(404).json({
            message:
              "Project not found for this task.",
          });
        }

        if (
          !isProjectWorkspaceWritable(
            project
          )
        ) {
          return res.status(409).json({
            message:
              "This workspace is read-only, so task comments are locked right now.",
          });
        }
      }

      task.comments.push({
        author: req.user._id,
        message,
      });

      appendActivity(task, {
        type: "comment-added",
        message,
        actor: req.user._id,
      });

      await task.save();

      const updatedTask =
        await populateTaskQuery(
          Task.findById(task._id),
          {
            isAdmin:
              req.user.authority ===
              "admin",
          }
        );

      return res.json(updatedTask);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
