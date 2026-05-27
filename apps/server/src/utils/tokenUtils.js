import crypto from "crypto";

export const hashToken = (token) =>
  crypto
    .createHash("sha256")
    .update(String(token))
    .digest("hex");

export const createTimedToken = (
  ttlMs
) => {
  const plainToken =
    crypto.randomBytes(32).toString("hex");

  return {
    plainToken,
    hashedToken:
      hashToken(plainToken),
    expiresAt: new Date(
      Date.now() + ttlMs
    ),
  };
};
