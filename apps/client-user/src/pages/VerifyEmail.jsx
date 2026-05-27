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
    <div className="relative min-h-screen overflow-hidden bg-[#050816] px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

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
        className="mx-auto max-w-3xl rounded-[2.5rem] border border-white/10 bg-white/[0.05] p-8 text-center backdrop-blur-xl sm:p-12"
      >
        <div
          className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${
            isSuccess
              ? "bg-emerald-500/15"
              : "bg-amber-500/15"
          }`}
        >
          {isSuccess ? (
            <CheckCircle2
              size={34}
              className="text-emerald-300"
            />
          ) : status ===
            "loading" ? (
            <RefreshCcw
              size={34}
              className="animate-spin text-cyan-300"
            />
          ) : (
            <TriangleAlert
              size={34}
              className="text-amber-300"
            />
          )}
        </div>

        <h1 className="mt-8 text-4xl font-black sm:text-5xl">
          {isSuccess
            ? "Email verified"
            : "Verification check"}
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          {message}
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Link
            to="/login"
            className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-slate-100 transition hover:border-cyan-400/30 hover:text-cyan-200"
          >
            Go to login
          </Link>
          <Link
            to="/dashboard"
            className="rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 px-6 py-4 font-semibold text-white transition hover:scale-[1.01]"
          >
            Open dashboard
          </Link>
        </div>

        {!isSuccess && (
          <div className="mt-10 rounded-3xl border border-white/10 bg-[#081121] p-6 text-left">
            <div className="flex items-start gap-3">
              <MailCheck
                size={20}
                className="mt-1 text-cyan-300"
              />
              <div>
                <h2 className="text-xl font-bold">
                  Need a fresh verification link?
                </h2>
                <p className="mt-2 text-slate-400">
                  If you are already signed in, we can resend it to your registered email.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-5 py-3 font-semibold text-cyan-100 transition hover:border-cyan-300/40 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {resending
                ? "Sending..."
                : "Resend verification email"}
            </button>

            {resendMessage && (
              <p className="mt-4 text-sm text-slate-300">
                {resendMessage}
              </p>
            )}

            {preview?.url && (
              <a
                href={preview.url}
                className="mt-3 inline-flex text-sm text-cyan-300 underline"
              >
                Open preview verification link
              </a>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
