import mongoose from "mongoose";

const projectSchema =
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

      techStack: [String],

      members: [
        {
          type:
            mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],

      teams: [
        {
          type:
            mongoose.Schema.Types.ObjectId,
          ref: "Team",
        },
      ],

      status: {
        type: String,
        enum: [
          "open",
          "closed",
        ],
        default: "open",
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Project",
  projectSchema
);