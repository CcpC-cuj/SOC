import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import {
  Link,
  useSearchParams,
} from "react-router-dom";

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
  resetPassword,
} from "../services/authService";

const resetNotes = [
  {
    icon: ShieldCheck,
    title: "Short-lived link",
    text:
      "Reset links expire quickly so only the intended recipient can use them.",
  },
  {
    icon: KeyRound,
    title: "One clean handoff",
    text:
      "After saving a new password, sign in again from the login screen and continue normally.",
  },
];

const ResetPassword = () => {
  const [searchParams] =
    useSearchParams();
  const token =
    searchParams.get("token") || "";

  const [form, setForm] =
    useState({
      password: "",
      confirmPassword: "",
    });
  const [loading, setLoading] =
    useState(false);
  const [error, setError] =
    useState("");
  const [message, setMessage] =
    useState("");

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]:
        event.target.value,
    }));
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!token) {
      setError(
        "This reset link is missing its token."
      );
      return;
    }

    if (
      form.password.length < 6
    ) {
      setError(
        "Password must be at least 6 characters long."
      );
      return;
    }

    if (
      form.password !==
      form.confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    try {
      setLoading(true);
      const response =
        await resetPassword({
          token,
          password: form.password,
        });
      setMessage(response.message);
      setForm({
        password: "",
        confirmPassword: "",
      });
    } catch (resetError) {
      setError(
        resetError.response?.data
          ?.message ||
          "Unable to reset your password right now."
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
            Secure password reset
          </Badge>

          <div className="space-y-4">
            <h1 className="max-w-2xl text-4xl font-semibold tracking-[-0.05em] text-[var(--soc-ink)] sm:text-5xl lg:text-[3.35rem]">
              Choose a fresh password and return to your account with confidence.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-[var(--soc-text-muted)] sm:text-lg">
              Set a new password for your SOC account and continue through the
              normal sign-in flow afterward.
            </p>
          </div>

          <div className="grid gap-4">
            {resetNotes.map((item) => {
              const Icon = item.icon;

              return (
                <Card key={item.title} className="p-5">
                  <Icon
                    size={20}
                    className="text-[var(--soc-teal)]"
                  />
                  <h2 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-[var(--soc-ink)]">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-[var(--soc-text-muted)]">
                    {item.text}
                  </p>
                </Card>
              );
            })}
          </div>
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
                Reset password
              </p>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--soc-ink)] sm:text-4xl">
                Save new password
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-[var(--soc-text-muted)] sm:text-base">
                Choose a new password for your account. The reset token is
                validated while you submit this form.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <label className="block">
                <FieldLabel className="mb-3 flex items-center gap-2">
                  <KeyRound size={16} />
                  New password
                </FieldLabel>
                <Input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Minimum 6 characters"
                  required
                />
              </label>

              <label className="block">
                <FieldLabel className="mb-3 flex items-center gap-2">
                  <ShieldCheck size={16} />
                  Confirm password
                </FieldLabel>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat the password"
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
                  {message}
                </InlineMessage>
              ) : null}

              <Button
                type="submit"
                block
                size="lg"
                loading={loading}
                loadingLabel="Saving password..."
              >
                Save new password
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
                  to="/forgot-password"
                  className="font-semibold text-[var(--soc-teal)] transition hover:text-[var(--soc-ink)]"
                >
                  Need another link?
                </Link>
              </div>
            </CardSection>
          </Card>
        </motion.section>
      </div>
    </div>
  );
};

export default ResetPassword;
