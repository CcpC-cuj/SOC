import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  requestPasswordReset,
} from "../services/authService";

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
    <div className="relative min-h-screen overflow-hidden bg-[#050816] px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.05fr]">
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
            Recover your account
          </div>

          <div>
            <h1 className="max-w-2xl text-5xl font-black leading-tight">
              Reset your password and get back into the build.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Enter the email you used for SOC. If the account exists, we will prepare a reset link for you.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 text-slate-300">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
              What happens next
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7">
              <li>We prepare a password reset link for your account.</li>
              <li>The link opens a secure reset page and expires in 30 minutes.</li>
              <li>After resetting, you can sign back in and continue from your dashboard.</li>
            </ul>
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
            Password recovery
          </h2>
          <p className="mt-3 text-slate-400">
            We will send you a recovery path without exposing whether the email belongs to an account.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >
            <label className="block">
              <span className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-200">
                <Mail size={18} />
                Email address
              </span>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value
                  )
                }
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-white/10 bg-[#081121] px-5 py-4 outline-none transition focus:border-cyan-400"
                required
              />
            </label>

            {error && (
              <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                {error}
              </div>
            )}

            {message && (
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-4 text-sm text-emerald-100">
                <p>{message}</p>
                {preview?.url && (
                  <a
                    href={preview.url}
                    className="mt-3 inline-flex text-cyan-200 underline"
                  >
                    Open preview reset link
                  </a>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 px-8 py-4 text-lg font-bold transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading
                ? "Preparing link..."
                : "Send reset link"}
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
              to="/register"
              className="text-fuchsia-300 transition hover:text-fuchsia-100"
            >
              Need an account?
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ForgotPassword;
