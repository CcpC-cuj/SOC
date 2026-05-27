import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    focus: {
      type: String,
      trim: true,
      default: "",
    },

    capacity: {
      type: Number,
      default: 8,
      min: 1,
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    leader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

teamSchema.index(
  {
    project: 1,
    name: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model("Team", teamSchema);
