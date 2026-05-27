import {
  useEffect,
  useState,
} from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FolderKanban,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import API from "../services/api";
import { loginUser } from "../services/authService";

const Login = () => {
  const navigate =
    useNavigate();
  const location =
    useLocation();

  const from =
    location.state?.from ||
    "/dashboard";

  const [settings, setSettings] =
    useState(null);
  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });
  const [loading, setLoading] =
    useState(false);
  const [error, setError] =
    useState("");

  useEffect(() => {
    async function fetchSettings() {
      try {
        const response =
          await API.get(
            "/settings/public"
          );
        setSettings(response.data);
      } catch (fetchError) {
        console.error(fetchError);
      }
    }

    fetchSettings();
  }, []);

  const handleChange = (event) => {
    setFormData((current) => ({
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

    try {
      setLoading(true);
      const data =
        await loginUser(formData);

      if (
        data.user.authority ===
        "admin"
      ) {
        navigate(
          "/admin-dashboard"
        );
        return;
      }

      navigate(from);
    } catch (loginError) {
      setError(
        loginError.response?.data
          ?.message ||
          "Unable to log you in right now."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-[26rem] w-[26rem] rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.05fr]">
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
          className="space-y-8"
        >
          <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200">
            Sign in to continue your SOC journey
          </div>

          <div>
            <h1 className="max-w-2xl text-5xl font-black leading-tight sm:text-6xl">
              Pick up where your team journey left off.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Participants can track review status, check assignments, and open their workspace here. Organizers can also sign in with their admin account.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Sparkles,
                title: "Review-aware",
                text:
                  "Your dashboard reflects the real review and assignment process.",
              },
              {
                icon: FolderKanban,
                title: "Workspace ready",
                text:
                  "Assigned members can jump straight into project work from one place.",
              },
              {
                icon: ShieldCheck,
                title: "Safer access",
                text:
                  "Recovery and verification tools are now built into the account flow.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
                >
                  <Icon
                    size={22}
                    className="text-cyan-300"
                  />
                  <h2 className="mt-4 text-lg font-bold">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[#081121] p-6">
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400">
              Registration notice
            </p>
            <p className="mt-3 text-slate-300">
              {settings
                ?.registrationNotice ||
                "Register with your strengths first. The organizing team will review and assign projects later."}
            </p>
            {settings?.registrationDeadline && (
              <p className="mt-3 text-sm text-cyan-200">
                Registration deadline:
                {" "}
                {new Date(
                  settings.registrationDeadline
                ).toLocaleString()}
              </p>
            )}
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
          className="rounded-[2.5rem] border border-white/10 bg-white/[0.05] p-8 backdrop-blur-xl sm:p-10"
        >
          <div className="mb-8">
            <h2 className="text-4xl font-black">
              Login
            </h2>
            <p className="mt-3 text-slate-400">
              Use the email and password from your SOC account.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <label className="block">
              <span className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-200">
                <Mail size={18} />
                Email address
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-white/10 bg-[#081121] px-5 py-4 outline-none transition focus:border-cyan-400"
                required
              />
            </label>

            <label className="block">
              <span className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-200">
                <Lock size={18} />
                Password
              </span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full rounded-2xl border border-white/10 bg-[#081121] px-5 py-4 outline-none transition focus:border-cyan-400"
                required
              />
            </label>

            {location.state?.from && (
              <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100">
                Sign in to continue to the page you were trying to open.
              </div>
            )}

            {error && (
              <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                {error}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <Link
                to="/forgot-password"
                className="text-cyan-300 transition hover:text-cyan-100"
              >
                Forgot password?
              </Link>
              <Link
                to="/verify-email"
                className="text-slate-400 transition hover:text-slate-200"
              >
                Need to verify your email?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 px-8 py-4 text-lg font-bold transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading
                ? "Logging in..."
                : "Login to SOC"}
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5 text-sm text-slate-300">
            New here? Register with your skills and interests first, then let the organizers place you into the right squad.
            <div className="mt-4 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="font-semibold text-cyan-300 transition hover:text-cyan-100"
              >
                Create account
              </Link>
              <Link
                to="/projects"
                className="font-semibold text-fuchsia-300 transition hover:text-fuchsia-100"
              >
                View showcase projects
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Login;
