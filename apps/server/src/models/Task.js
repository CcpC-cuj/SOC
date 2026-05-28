// src/models/Task.js

import mongoose from "mongoose";
import {
  TASK_STATUSES,
} from "../utils/workflowRules.js";

const taskCommentSchema =
  new mongoose.Schema(
    {
      author: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      message: {
        type: String,
        required: true,
        trim: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      _id: true,
    }
  );

const taskActivitySchema =
  new mongoose.Schema(
    {
      type: {
        type: String,
        enum: [
          "created",
          "status-changed",
          "comment-added",
          "reviewed",
        ],
        required: true,
      },
      fromStatus: {
        type: String,
      },
      toStatus: {
        type: String,
      },
      message: {
        type: String,
        trim: true,
      },
      actor: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      _id: false,
    }
  );

const taskSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },

      description: {
        type: String,
        required: true,
      },

      createdBy: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      assignedTo: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      project: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Project",

        required: true,
      },

      team: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Team",
      },

      taskType: {
        type: String,

        enum: [
          "feature",
          "bug-fix",
          "research",
          "design",
          "documentation",
          "testing",
        ],

        default: "feature",
      },

      deadline: {
        type: Date,
      },

      status: {
        type: String,

        enum: [
          ...TASK_STATUSES,
          "pending",
        ],

        default: "todo",
      },

      submissionLinks: [
        {
          title: String,

          url: String,
        },
      ],

      remarks: {
        type: String,
      },

      comments: {
        type: [taskCommentSchema],
        default: [],
      },

      activity: {
        type: [taskActivitySchema],
        default: [],
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Task",
  taskSchema
);
