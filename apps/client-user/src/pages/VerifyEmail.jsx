import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  MailCheck,
  RefreshCcw,
  TriangleAlert,
} from "lucide-react";
import {
  Link,
  useSearchParams,
} from "react-router-dom";

import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { buttonStyles } from "../components/ui/buttonStyles";
import {
  Card,
  CardSection,
} from "../components/ui/Card";
import { InlineMessage } from "../components/ui/Field";
import {
  resendVerificationEmail,
  verifyEmailToken,
} from "../services/authService";
import {
  getStoredUser,
  getUserToken,
  setUserSession,
} from "../services/authStorage";

const VerifyEmail = () => {
  const [searchParams] =
    useSearchParams();
  const token =
    searchParams.get("token") || "";

  const [status, setStatus] =
    useState("loading");
  const [message, setMessage] =
    useState(
      "Checking your verification link..."
    );
  const [resending, setResending] =
    useState(false);
  const [resendMessage, setResendMessage] =
    useState("");
  const [preview, setPreview] =
    useState(null);

  useEffect(() => {
    async function verify() {
      if (!token) {
        setStatus("error");
        setMessage(
          "This verification link is missing its token."
        );
        return;
      }

      try {
        const response =
          await verifyEmailToken(
            token
          );

        const sessionUser =
          getStoredUser();
        const sessionToken =
          getUserToken();

        if (
          sessionUser &&
          sessionToken &&
          sessionUser.email ===
            response.user.email
        ) {
          setUserSession(
            sessionToken,
            {
              ...sessionUser,
              ...response.user,
            }
          );
        }

        setStatus("success");
        setMessage(response.message);
      } catch (error) {
        setStatus("error");
        setMessage(
          error.response?.data
            ?.message ||
            "Unable to verify this email right now."
        );
      }
    }

    verify();
  }, [token]);

  const handleResend = async () => {
    const sessionUser =
      getStoredUser();

    if (!sessionUser?.email) {
      setResendMessage(
        "Sign in first if you want us to resend the verification email."
      );
      return;
    }

    setResending(true);
    setResendMessage("");
    setPreview(null);

    try {
      const response =
        await resendVerificationEmail(
          sessionUser.email
        );
      setResendMessage(
        response.message
      );
      setPreview(
        response.preview || null
      );
    } catch (error) {
      setResendMessage(
        error.response?.data
          ?.message ||
          "Unable to resend verification right now."
      );
    } finally {
      setResending(false);
    }
  };

  const isSuccess =
    status === "success";

  return (
    <div className="min-h-screen py-10 sm:py-14">
      <motion.div
        initial={{
          opacity: 0,
          y: 24,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"
      >
        <Card strong className="p-8 text-center sm:p-10 lg:p-12">
          <div
            className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full border ${
              isSuccess
                ? "border-emerald-200 bg-emerald-50"
                : status === "loading"
                  ? "border-sky-200 bg-sky-50"
                  : "border-amber-200 bg-amber-50"
            }`}
          >
            {isSuccess ? (
              <CheckCircle2
                size={34}
                className="text-emerald-700"
              />
            ) : status ===
              "loading" ? (
              <RefreshCcw
                size={34}
                className="animate-spin text-sky-700"
              />
            ) : (
              <TriangleAlert
                size={34}
                className="text-amber-700"
              />
            )}
          </div>

          <Badge
            tone={
              isSuccess
                ? "success"
                : status === "loading"
                  ? "info"
                  : "warning"
            }
            className="mt-6"
          >
            {isSuccess
              ? "Email verified"
              : status === "loading"
                ? "Verification in progress"
                : "Verification needs attention"}
          </Badge>

          <h1 className="mx-auto mt-6 max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-[var(--soc-ink)] sm:text-5xl">
            {isSuccess
              ? "Your email has been verified."
              : "We checked your verification link."}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[var(--soc-text-muted)] sm:text-lg">
            {message}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Link
              to="/login"
              className={buttonStyles({
                variant: "secondary",
                block: true,
                size: "lg",
              })}
            >
              Go to login
            </Link>
            <Link
              to="/dashboard"
              className={buttonStyles({
                block: true,
                size: "lg",
              })}
            >
              Open dashboard
            </Link>
          </div>

          {!isSuccess ? (
            <CardSection className="mt-10 p-6 text-left">
              <div className="flex items-start gap-3">
                <MailCheck
                  size={18}
                  className="mt-1 text-[var(--soc-teal)]"
                />
                <div>
                  <h2 className="text-xl font-semibold tracking-[-0.03em] text-[var(--soc-ink)]">
                    Need a fresh verification link?
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-[var(--soc-text-muted)]">
                    If you are already signed in, we can resend it to your
                    registered email.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  type="button"
                  variant="secondary"
                  loading={resending}
                  loadingLabel="Sending link..."
                  onClick={handleResend}
                >
                  Resend verification email
                </Button>
              </div>

              {resendMessage ? (
                <InlineMessage
                  tone={
                    resendMessage.includes(
                      "Unable"
                    ) ||
                    resendMessage.includes(
                      "Sign in first"
                    )
                      ? "warning"
                      : "success"
                  }
                  className="mt-4"
                >
                  <div className="space-y-3">
                    <p>{resendMessage}</p>
                    {preview?.url ? (
                      <a
                        href={preview.url}
                        className="inline-flex font-medium text-[var(--soc-teal)] underline decoration-[var(--soc-ink)]/20 underline-offset-4"
                      >
                        Open preview verification link
                      </a>
                    ) : null}
                  </div>
                </InlineMessage>
              ) : null}
            </CardSection>
          ) : null}
        </Card>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
