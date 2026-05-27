import mongoose from "mongoose";

const siteSettingsSchema = new mongoose.Schema(
  {
    registrationOpen: {
      type: Boolean,
      default: true,
    },

    registrationDeadline: {
      type: Date,
    },

    registrationHeadline: {
      type: String,
      trim: true,
      default:
        "Register for Seasons of Code and let the organizers place you where you can do your best work.",
    },

    registrationSubheadline: {
      type: String,
      trim: true,
      default:
        "You register once, share your strengths, and our team assigns you to the right project and squad later.",
    },

    registrationNotice: {
      type: String,
      trim: true,
      default:
        "Public projects are showcase previews. Final project allocation happens after registrations are reviewed.",
    },

    contactEmail: {
      type: String,
      trim: true,
      default: "",
    },

    eligibility: {
      type: String,
      trim: true,
      default:
        "Open to club members who are ready to learn, collaborate consistently, and contribute to a team project.",
    },

    codeOfConductUrl: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "SiteSettings",
  siteSettingsSchema
);
