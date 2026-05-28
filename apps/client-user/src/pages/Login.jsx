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
import { getApiErrorMessage } from "../services/apiError";
import API from "../services/api";
import { loginUser } from "../services/authService";

const loginBenefits = [
  {
    icon: Sparkles,
    title: "Clear review visibility",
    text:
      "Track application progress, shortlist decisions, and assignment updates from one calm workspace.",
  },
  {
    icon: FolderKanban,
    title: "Project continuity",
    text:
      "Assigned participants can move from account access to team collaboration without switching tools.",
  },
  {
    icon: ShieldCheck,
    title: "Trustworthy account flow",
    text:
      "Verification and recovery are integrated so the sign-in experience stays practical and dependable.",
  },
];

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
  const [serviceError, setServiceError] =
    useState("");

  useEffect(() => {
    async function fetchSettings() {
      try {
        const response =
          await API.get(
            "/settings/public"
          );
        setSettings(response.data);
        setServiceError("");
      } catch (fetchError) {
        setServiceError(
          getApiErrorMessage(
            fetchError,
            "Unable to load login page settings right now."
          )
        );
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
        getApiErrorMessage(
          loginError,
          "Unable to log you in right now."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 sm:py-14">
      <div className="mx-auto grid max-w-[88rem] gap-8 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 xl:px-10">
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
            Participant and organizer sign-in
          </Badge>

          <div className="space-y-4">
            <h1 className="max-w-2xl text-4xl font-semibold tracking-[-0.05em] text-[var(--soc-ink)] sm:text-5xl lg:text-[3.6rem]">
              Sign in to continue your application and project journey.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-[var(--soc-text-muted)] sm:text-lg">
              Use your SOC account to check review outcomes, open your
              workspace, and stay connected to the next step in the program.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {loginBenefits.map((item) => {
              const Icon = item.icon;

              return (
                <Card
                  key={item.title}
                  className="p-5"
                >
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

          <Card strong className="p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--soc-ink)]/48">
              Registration notice
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--soc-text-muted)] sm:text-base sm:leading-8">
              {settings
                ?.registrationNotice ||
                "Register with your strengths first. The organizing team will review and assign projects later."}
            </p>

            {settings?.registrationDeadline ? (
              <p className="mt-4 text-sm text-[var(--soc-teal)]">
                Registration deadline:{" "}
                {new Date(
                  settings.registrationDeadline
                ).toLocaleString()}
              </p>
            ) : null}

            {settings?.codeOfConductUrl ? (
              <p className="mt-3 text-sm text-[var(--soc-text-muted)]">
                Participant conduct:{" "}
                <a
                  href={
                    settings.codeOfConductUrl
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-[var(--soc-teal)] underline decoration-[var(--soc-ink)]/20 underline-offset-4"
                >
                  Read the code of conduct
                </a>
              </p>
            ) : null}
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
          <Card
            strong
            className="p-6 sm:p-8 lg:p-10"
          >
            <div className="mb-8 space-y-3 border-b border-[var(--soc-border-soft)] pb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--soc-ink)]/48">
                Account access
              </p>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--soc-ink)] sm:text-4xl">
                Login
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-[var(--soc-text-muted)] sm:text-base">
                Enter the email and password linked to your SOC account.
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
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label className="block">
                <FieldLabel className="mb-3 flex items-center gap-2">
                  <Lock size={16} />
                  Password
                </FieldLabel>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </label>

              {location.state?.from ? (
                <InlineMessage tone="info">
                  Sign in to continue to the page you were trying to open.
                </InlineMessage>
              ) : null}

              {serviceError ? (
                <InlineMessage tone="warning">
                  {serviceError}
                </InlineMessage>
              ) : null}

              {error ? (
                <InlineMessage tone="error">
                  {error}
                </InlineMessage>
              ) : null}

              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-[var(--soc-teal)] transition hover:text-[var(--soc-ink)]"
                >
                  Forgot password?
                </Link>
                <Link
                  to="/verify-email"
                  className="text-[var(--soc-text-muted)] transition hover:text-[var(--soc-ink)]"
                >
                  Need to verify your email?
                </Link>
              </div>

              <Button
                type="submit"
                block
                size="lg"
                loading={loading}
              >
                {loading
                  ? "Logging in..."
                  : "Login to SOC"}
                <ArrowRight size={18} />
              </Button>
            </form>

            <CardSection className="mt-8 p-5 sm:p-6">
              <p className="text-sm leading-7 text-[var(--soc-text-muted)]">
                New here? Create your account, submit your strengths and
                interests, and let organizers place you into the right team
                later.
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="font-semibold text-[var(--soc-teal)] transition hover:text-[var(--soc-ink)]"
                >
                  Create account
                </Link>
                <Link
                  to="/projects"
                  className="font-semibold text-[var(--soc-teal)] transition hover:text-[var(--soc-ink)]"
                >
                  View showcase projects
                </Link>
              </div>
            </CardSection>
          </Card>
        </motion.section>
      </div>
    </div>
  );
};

export default Login;
