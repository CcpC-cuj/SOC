import {
  getOrCreateSiteSettings,
} from "../utils/siteSettings.js";

const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    value
  );

const isValidHttpUrl = (
  value
) => {
  try {
    const url = new URL(value);

    return [
      "http:",
      "https:",
    ].includes(url.protocol);
  } catch {
    return false;
  }
};

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

      const nextValues = {
        registrationOpen:
          Object.prototype.hasOwnProperty.call(
            req.body,
            "registrationOpen"
          )
            ? Boolean(
                req.body.registrationOpen
              )
            : settings.registrationOpen,
        registrationDeadline:
          Object.prototype.hasOwnProperty.call(
            req.body,
            "registrationDeadline"
          )
            ? req.body.registrationDeadline
            : settings.registrationDeadline,
        registrationHeadline:
          Object.prototype.hasOwnProperty.call(
            req.body,
            "registrationHeadline"
          )
            ? String(
                req.body.registrationHeadline ||
                  ""
              ).trim()
            : settings.registrationHeadline,
        registrationSubheadline:
          Object.prototype.hasOwnProperty.call(
            req.body,
            "registrationSubheadline"
          )
            ? String(
                req.body.registrationSubheadline ||
                  ""
              ).trim()
            : settings.registrationSubheadline,
        registrationNotice:
          Object.prototype.hasOwnProperty.call(
            req.body,
            "registrationNotice"
          )
            ? String(
                req.body.registrationNotice ||
                  ""
              ).trim()
            : settings.registrationNotice,
        contactEmail:
          Object.prototype.hasOwnProperty.call(
            req.body,
            "contactEmail"
          )
            ? String(
                req.body.contactEmail || ""
              ).trim()
            : settings.contactEmail,
        eligibility:
          Object.prototype.hasOwnProperty.call(
            req.body,
            "eligibility"
          )
            ? String(
                req.body.eligibility || ""
              ).trim()
            : settings.eligibility,
        codeOfConductUrl:
          Object.prototype.hasOwnProperty.call(
            req.body,
            "codeOfConductUrl"
          )
            ? String(
                req.body.codeOfConductUrl ||
                  ""
              ).trim()
            : settings.codeOfConductUrl,
      };

      if (
        nextValues.contactEmail &&
        !isValidEmail(
          nextValues.contactEmail
        )
      ) {
        return res.status(400).json({
          message:
            "Enter a valid contact email address.",
        });
      }

      if (
        nextValues.codeOfConductUrl &&
        !isValidHttpUrl(
          nextValues.codeOfConductUrl
        )
      ) {
        return res.status(400).json({
          message:
            "Enter a valid code of conduct URL starting with http:// or https://.",
        });
      }

      if (
        nextValues.registrationDeadline
      ) {
        const parsedDeadline =
          new Date(
            nextValues.registrationDeadline
          );

        if (
          Number.isNaN(
            parsedDeadline.getTime()
          )
        ) {
          return res.status(400).json({
            message:
              "Enter a valid registration deadline.",
          });
        }

        nextValues.registrationDeadline =
          parsedDeadline;
      } else {
        nextValues.registrationDeadline =
          null;
      }

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
            nextValues,
            field
          )
        ) {
          settings[field] =
            nextValues[field];
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
