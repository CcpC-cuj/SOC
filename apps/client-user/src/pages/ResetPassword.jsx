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

import {
  resetPassword,
} from "../services/authService";

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
    <div className="relative min-h-screen overflow-hidden bg-[#050816] px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
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
          <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200">
            Secure reset
          </div>

          <h1 className="max-w-2xl text-5xl font-black leading-tight">
            Choose a fresh password and get moving again.
          </h1>

          <div className="grid gap-4">
            {[
              {
                icon: ShieldCheck,
                title: "Short-lived link",
                text:
                  "Reset links expire quickly so only you can use them.",
              },
              {
                icon: KeyRound,
                title: "One clean handoff",
                text:
                  "After saving your new password, sign in again from the login screen.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
                >
                  <Icon
                    size={20}
                    className="text-cyan-300"
                  />
                  <h2 className="mt-4 text-xl font-bold">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-slate-400">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.5,
            delay: 0.1,
          }}
          className="rounded-[2.25rem] border border-white/10 bg-white/[0.05] p-8 backdrop-blur-xl sm:p-10"
        >
          <h2 className="text-3xl font-black">
            Reset password
          </h2>
          <p className="mt-3 text-slate-400">
            Choose a new password for your SOC account.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >
            <label className="block">
              <span className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-200">
                <KeyRound size={18} />
                New password
              </span>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-[#081121] px-5 py-4 outline-none transition focus:border-cyan-400"
                placeholder="Minimum 6 characters"
                required
              />
            </label>

            <label className="block">
              <span className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-200">
                <ShieldCheck size={18} />
                Confirm password
              </span>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-[#081121] px-5 py-4 outline-none transition focus:border-cyan-400"
                placeholder="Repeat the password"
                required
              />
            </label>

            {error && (
              <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                {error}
              </div>
            )}

            {message && (
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 px-8 py-4 text-lg font-bold transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading
                ? "Saving..."
                : "Save new password"}
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-400">
            <Link
              to="/login"
              className="text-cyan-300 transition hover:text-cyan-100"
            >
              Back to login
            </Link>
            <Link
              to="/forgot-password"
              className="text-fuchsia-300 transition hover:text-fuchsia-100"
            >
              Need another link?
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ResetPassword;
