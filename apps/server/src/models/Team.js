import mongoose from "mongoose";

const teamSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      project: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },

      leader: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      members: [
        {
          type:
            mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Team",
  teamSchema
);