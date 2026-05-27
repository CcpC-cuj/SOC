import SiteSettings from "../models/SiteSettings.js";

export const getOrCreateSiteSettings =
  async () => {
    let settings =
      await SiteSettings.findOne();

    if (!settings) {
      settings =
        await SiteSettings.create({});
    }

    return settings;
  };

export const isRegistrationClosed =
  (settings) => {
    if (!settings?.registrationOpen) {
      return true;
    }

    if (
      settings?.registrationDeadline
      &&
      new Date(settings.registrationDeadline)
      < new Date()
    ) {
      return true;
    }

    return false;
  };
