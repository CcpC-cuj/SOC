import mongoose
from "mongoose";

const submissionRevisionSchema =
  new mongoose.Schema(
    {
      milestoneLabel: {
        type: String,
        trim: true,
        default: "Final delivery",
      },
      githubRepo: String,
      deploymentLink: String,
      pptLink: String,
      demoVideo: String,
      documentation: String,
      mode: {
        type: String,
        enum: ["draft", "submitted"],
        required: true,
      },
      savedBy: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      savedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      _id: false,
    }
  );

const submissionStatusHistorySchema =
  new mongoose.Schema(
    {
      status: {
        type: String,
        enum: [
          "draft",
          "submitted",
          "approved",
          "rejected",
        ],
        required: true,
      },
      remarks: {
        type: String,
        trim: true,
      },
      changedBy: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      changedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      _id: false,
    }
  );

const projectSubmissionSchema =
  new mongoose.Schema(
    {
      project: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Project",

        required: true,
      },

      submittedBy: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      githubRepo: {
        type: String,
      },

      deploymentLink: {
        type: String,
      },

      pptLink: {
        type: String,
      },

      demoVideo: {
        type: String,
      },

      milestoneLabel: {
        type: String,
        trim: true,
        default: "Final delivery",
      },

      documentation: {
        type: String,
      },

      remarks: {
        type: String,
      },

      status: {
        type: String,

        enum: [
          "draft",
          "submitted",
          "approved",
          "rejected",
        ],

        default: "draft",
      },

      revisions: {
        type: [submissionRevisionSchema],
        default: [],
      },

      statusHistory: {
        type: [submissionStatusHistorySchema],
        default: [],
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "ProjectSubmission",
  projectSubmissionSchema
);
