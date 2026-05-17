import mongoose from "mongoose";

const taskSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },

      assignedBy: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      assignedTo: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      project: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },

      team: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },

      deadline: Date,

      status: {
        type: String,
        enum: [
          "pending",
          "submitted",
          "approved",
        ],
        default: "pending",
      },

      submissionText: String,
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Task",
  taskSchema
);