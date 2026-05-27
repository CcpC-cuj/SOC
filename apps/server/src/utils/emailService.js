const RESEND_API_URL =
  "https://api.resend.com/emails";

export const sendTransactionalEmail =
  async ({
    to,
    subject,
    html,
    text,
  }) => {
    const apiKey =
      process.env.RESEND_API_KEY;
    const from =
      process.env.EMAIL_FROM;

    if (!apiKey || !from) {
      console.info(
        "[email] Skipped delivery because RESEND_API_KEY or EMAIL_FROM is not configured."
      );

      return {
        delivered: false,
        reason:
          "email-not-configured",
      };
    }

    const response = await fetch(
      RESEND_API_URL,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          from,
          to: Array.isArray(to)
            ? to
            : [to],
          subject,
          html,
          text,
        }),
      }
    );

    if (!response.ok) {
      const details =
        await response.text();

      throw new Error(
        `Email delivery failed: ${details}`
      );
    }

    return {
      delivered: true,
      provider: "resend",
    };
  };
