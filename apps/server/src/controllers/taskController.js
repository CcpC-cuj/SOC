// src/controllers/taskController.js

import Task from "../models/Task.js";

// GET ALL TASKS
export const getTasks =
  async (req, res) => {

    try {

      const tasks =
        await Task.find()
        .populate(
          "assignedTo",
          "name"
        )
        .populate(
          "assignedBy",
          "name"
        );

      res.json(tasks);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
};

// APPROVE TASK
export const approveTask =
  async (req, res) => {

    try {

      const task =
        await Task.findById(
          req.params.id
        );

      task.status =
        "approved";

      await task.save();

      res.json(task);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
};