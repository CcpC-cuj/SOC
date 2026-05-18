import mongoose
from "mongoose";

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
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "ProjectSubmission",
  projectSubmissionSchema
);