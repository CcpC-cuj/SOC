import Task
from "../models/Task.js";

import ProjectMember
from "../models/ProjectMember.js";

// CREATE TASK
  export const createTask =
    async (req, res) => {

      try {

        const {
          title,
          description,
          projectId,
          assignedTo,
          taskType,
          deadline,
        } = req.body;

        // CHECK PROJECT
          const project =
            await Project.findById(
              projectId
            );

          // PROJECT COMPLETED
          if (
            project.status
            === "completed"
          ) {

            return res.status(400)
              .json({
                message:
                  "Project completed",
              });
          }

        // LEADER CHECK
        const isLeader =
          await ProjectMember.findOne({
            user: req.user._id,

            project: projectId,

            isLeader: true,
          });

        // NOT ALLOWED
        if (!isLeader) {

          return res.status(403)
            .json({
              message:
                "Leader only",
            });
        }

        // CHECK ASSIGNED USER
        const member =
          await ProjectMember.findOne({
            user: assignedTo,

            project: projectId,
          });

        if (!member) {

          return res.status(400)
            .json({
              message:
                "User is not a project member",
            });
        }

        // CREATE TASK
        const task =
          await Task.create({
            title,
            description,

            project:
              projectId,

            assignedTo,

            taskType,

            deadline,

            createdBy:
              req.user._id,
          });

        res.status(201)
          .json(task);

      } catch (error) {

        res.status(500)
          .json({
            message:
              error.message,
          });

      }
  };


// GET PROJECT TASKS
export const getProjectTasks =
  async (req, res) => {

    try {

      // MEMBER CHECK
        const isMember =
          await ProjectMember.findOne({
            user: req.user._id,

            project:
              req.params.projectId,
          });

        // NOT ALLOWED
        if (!isMember) {

        return res.status(403)
          .json({
            message:
              "Access denied",
          });
      }

      const tasks =
        await Task.find({
          project:
            req.params.projectId,
        })
        .populate(
          "assignedTo",
          "name email"
        )
        .populate(
          "createdBy",
          "name"
        );

      res.json(tasks);

    } catch (error) {

      res.status(500)
        .json({
          message:
            error.message,
        });

    }
};

// UPDATE TASK STATUS
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

        return res.status(404)
          .json({
            message:
              "Task not found",
          });
      }


      // CHECK PROJECT
        const project =
          await Project.findById(
            task.project
          );

        // PROJECT COMPLETED
        if (
          project.status
          === "completed"
        ) {

          return res.status(400)
            .json({
              message:
                "Project completed",
            });
        }

      // ONLY ASSIGNED USER
      // LEADER CHECK
const isLeader =
  await ProjectMember.findOne({
    user: req.user._id,

    project:
      task.project,

    isLeader: true,
  });

    // ONLY ASSIGNED USER OR LEADER
    if (
      task.assignedTo.toString()
      !== req.user._id.toString()
      &&
      !isLeader
    ) {

      return res.status(403)
        .json({
          message:
            "Not authorized",
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

      res.json(task);

    } catch (error) {

      res.status(500)
        .json({
          message:
            error.message,
        });

    }
};


// GET MY TASKS
export const getMyTasks =
  async (req, res) => {

    try {

      const tasks =
        await Task.find({
          assignedTo:
            req.user._id,
        })
        .populate(
          "project",
          "title"
        )
        .populate(
          "createdBy",
          "name"
        );

      res.json(tasks);

    } catch (error) {

      res.status(500)
        .json({
          message:
            error.message,
        });

    }
};