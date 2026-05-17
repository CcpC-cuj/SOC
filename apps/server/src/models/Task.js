// src/models/Task.js

import mongoose from "mongoose";

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

      assignedBy: {
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

      priority: {
        type: String,

        enum: [
          "low",
          "medium",
          "high",
        ],

        default: "medium",
      },

      deadline: {
        type: Date,
      },

      status: {
        type: String,

        enum: [
          "pending",
          "submitted",
          "approved",
        ],

        default: "pending",
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
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Task",
  taskSchema
);