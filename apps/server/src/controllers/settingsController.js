import {
  getOrCreateSiteSettings,
} from "../utils/siteSettings.js";

export const getPublicSettings =
  async (req, res) => {
    try {
      const settings =
        await getOrCreateSiteSettings();

      return res.json({
        registrationOpen:
          settings.registrationOpen,
        registrationDeadline:
          settings.registrationDeadline,
        registrationHeadline:
          settings.registrationHeadline,
        registrationSubheadline:
          settings.registrationSubheadline,
        registrationNotice:
          settings.registrationNotice,
        contactEmail:
          settings.contactEmail,
        eligibility:
          settings.eligibility,
        codeOfConductUrl:
          settings.codeOfConductUrl,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

export const getAdminSettings =
  async (req, res) => {
    try {
      const settings =
        await getOrCreateSiteSettings();

      return res.json(settings);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

export const updateAdminSettings =
  async (req, res) => {
    try {
      const settings =
        await getOrCreateSiteSettings();

      const fields = [
        "registrationOpen",
        "registrationDeadline",
        "registrationHeadline",
        "registrationSubheadline",
        "registrationNotice",
        "contactEmail",
        "eligibility",
        "codeOfConductUrl",
      ];

      fields.forEach((field) => {
        if (
          Object.prototype.hasOwnProperty.call(
            req.body,
            field
          )
        ) {
          settings[field] =
            req.body[field];
        }
      });

      await settings.save();

      return res.json(settings);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
