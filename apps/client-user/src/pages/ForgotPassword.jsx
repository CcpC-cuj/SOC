import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";

import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import {
  Card,
  CardSection,
} from "../components/ui/Card";
import {
  FieldLabel,
  InlineMessage,
  Input,
} from "../components/ui/Field";
import {
  requestPasswordReset,
} from "../services/authService";

const recoverySteps = [
  "We prepare a reset link for the account if it exists.",
  "The link opens a secure reset page and expires after a short time.",
  "After saving a new password, you can sign in again and continue from your account.",
];

const ForgotPassword = () => {
  const [email, setEmail] =
    useState("");
  const [loading, setLoading] =
    useState(false);
  const [error, setError] =
    useState("");
  const [message, setMessage] =
    useState("");
  const [preview, setPreview] =
    useState(null);

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    setPreview(null);

    try {
      const response =
        await requestPasswordReset(
          email
        );
      setMessage(response.message);
      setPreview(
        response.preview || null
      );
    } catch (requestError) {
      setError(
        requestError.response?.data
          ?.message ||
          "Unable to process your request right now."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 sm:py-14">
      <div className="mx-auto grid max-w-[84rem] gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 xl:px-10">
        <motion.section
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
          className="space-y-6"
        >
          <Badge tone="warning">
            Recover your account
          </Badge>

          <div className="space-y-4">
            <h1 className="max-w-2xl text-4xl font-semibold tracking-[-0.05em] text-[var(--soc-ink)] sm:text-5xl lg:text-[3.35rem]">
              Reset your password and return to the workflow with less friction.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-[var(--soc-text-muted)] sm:text-lg">
              Enter the email tied to your SOC account. If the account exists,
              we will prepare a secure recovery path for you.
            </p>
          </div>

          <Card strong className="p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--soc-ink)]/48">
              What happens next
            </p>
            <div className="mt-5 space-y-3">
              {recoverySteps.map(
                (step, index) => (
                  <div
                    key={step}
                    className="rounded-[0.95rem] border border-[var(--soc-border-soft)] bg-[var(--soc-surface-cool)] px-4 py-4"
                  >
                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--soc-border-soft)] bg-white text-sm font-semibold text-[var(--soc-teal)]">
                        {index + 1}
                      </div>
                      <p className="text-sm leading-7 text-[var(--soc-text-muted)] sm:text-base">
                        {step}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </Card>
        </motion.section>

        <motion.section
          initial={{
            opacity: 0,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.5,
            delay: 0.08,
          }}
        >
          <Card strong className="p-6 sm:p-8 lg:p-10">
            <div className="mb-8 space-y-3 border-b border-[var(--soc-border-soft)] pb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--soc-ink)]/48">
                Password recovery
              </p>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--soc-ink)] sm:text-4xl">
                Send reset link
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-[var(--soc-text-muted)] sm:text-base">
                We do not expose whether the email belongs to an account. If it
                matches, the recovery path will be prepared.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <label className="block">
                <FieldLabel className="mb-3 flex items-center gap-2">
                  <Mail size={16} />
                  Email address
                </FieldLabel>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value
                    )
                  }
                  placeholder="you@example.com"
                  required
                />
              </label>

              {error ? (
                <InlineMessage tone="error">
                  {error}
                </InlineMessage>
              ) : null}

              {message ? (
                <InlineMessage tone="success">
                  <div className="space-y-3">
                    <p>{message}</p>
                    {preview?.url ? (
                      <a
                        href={preview.url}
                        className="inline-flex font-medium text-[var(--soc-teal)] underline decoration-[var(--soc-ink)]/20 underline-offset-4"
                      >
                        Open preview reset link
                      </a>
                    ) : null}
                  </div>
                </InlineMessage>
              ) : null}

              <Button
                type="submit"
                block
                size="lg"
                loading={loading}
                loadingLabel="Preparing link..."
              >
                Send reset link
                <ArrowRight size={18} />
              </Button>
            </form>

            <CardSection className="mt-8 p-5 sm:p-6">
              <div className="flex flex-wrap gap-4 text-sm">
                <Link
                  to="/login"
                  className="font-semibold text-[var(--soc-teal)] transition hover:text-[var(--soc-ink)]"
                >
                  Back to login
                </Link>
                <Link
                  to="/register"
                  className="font-semibold text-[var(--soc-teal)] transition hover:text-[var(--soc-ink)]"
                >
                  Need an account?
                </Link>
              </div>
            </CardSection>
          </Card>
        </motion.section>
      </div>
    </div>
  );
};

export default ForgotPassword;
