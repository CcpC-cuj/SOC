import {
  useEffect,
  useState,
} from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Code2,
  Github,
  Layers3,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import {
  DOMAIN_OPTIONS,
  EXPERIENCE_LEVELS,
  ROLE_OPTIONS,
} from "../constants/registration";
import { registerUser } from "../services/authService";
import API from "../services/api";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  department: "",
  program: "",
  roll: "",
  phone: "",
  github: "",
  linkedin: "",
  portfolio: "",
  skills: "",
  experienceLevel: "beginner",
  preferredDomains: [],
  preferredRoles: [],
  availability: "",
  priorExperience: "",
  whyJoin: "",
};

const Register = () => {
  const navigate = useNavigate();

  const [settings, setSettings] =
    useState(null);
  const [formData, setFormData] =
    useState(initialFormData);
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

  const isClosed =
    settings
    && (
      !settings.registrationOpen
      || (
        settings.registrationDeadline
        && new Date(
          settings.registrationDeadline
        ) < new Date()
      )
    );

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const toggleMultiSelect = (
    key,
    value
  ) => {
    setFormData((current) => ({
      ...current,
      [key]: current[key].includes(
        value
      )
        ? current[key].filter(
            (item) =>
              item !== value
          )
        : [...current[key], value],
    }));
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.department ||
      !formData.program ||
      !formData.roll
    ) {
      return "Please complete the required registration fields.";
    }

    if (
      formData.password.length < 6
    ) {
      return "Password must be at least 6 characters long.";
    }

    if (
      formData.password
      !== formData.confirmPassword
    ) {
      return "Passwords do not match.";
    }

    if (
      formData.preferredDomains
        .length === 0
    ) {
      return "Choose at least one preferred domain.";
    }

    if (
      formData.preferredRoles.length ===
      0
    ) {
      return "Choose at least one preferred role.";
    }

    return "";
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();
    setError("");

    const validationError =
      validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...formData,
        skills:
          formData.skills
            .split(",")
            .map((skill) =>
              skill.trim()
            )
            .filter(Boolean),
      };

      delete payload.confirmPassword;

      await registerUser(payload);
      navigate("/dashboard");
    } catch (submitError) {
      setError(
        submitError.response?.data
          ?.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-[28rem] w-[28rem] rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[32rem] w-[32rem] rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1.3fr]">
          <motion.section
            initial={{
              opacity: 0,
              y: 28,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="space-y-8"
          >
            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200">
              Registration -> Review -> Assignment
            </div>

            <div>
              <h1 className="max-w-2xl text-5xl font-black leading-tight sm:text-6xl">
                {
                  settings
                    ?.registrationHeadline ||
                  "Register once. We will place you where you can do your best work."
                }
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                {
                  settings
                    ?.registrationSubheadline ||
                  "Tell us your strengths, interests, and availability. The organizing team will review your profile and assign you to the right project and team later."
                }
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: User,
                  title: "Show your strengths",
                  text:
                    "Share skills, prior work, and preferred domains clearly.",
                },
                {
                  icon: Layers3,
                  title: "Get reviewed",
                  text:
                    "Admins compare capability, balance teams, and shortlist fairly.",
                },
                {
                  icon: CheckCircle2,
                  title: "Receive assignment",
                  text:
                    "You will be placed into a project and squad after review.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
                  >
                    <Icon
                      className="mb-4 text-cyan-300"
                      size={24}
                    />
                    <h2 className="text-lg font-bold">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="rounded-[2rem] border border-cyan-500/20 bg-cyan-500/8 p-6">
              <div className="flex items-start gap-4">
                <Clock3
                  className="mt-1 text-cyan-300"
                  size={22}
                />
                <div>
                  <h2 className="text-xl font-bold text-cyan-200">
                    Before you submit
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    {
                      settings
                        ?.registrationNotice ||
                      "Public projects are showcase previews. Final project allocation happens after registrations are reviewed."
                    }
                  </p>
                  {settings?.registrationDeadline && (
                    <p className="mt-3 text-sm text-cyan-100">
                      Registration deadline:
                      {" "}
                      {new Date(
                        settings.registrationDeadline
                      ).toLocaleString()}
                    </p>
                  )}
                  {settings?.contactEmail && (
                    <p className="mt-2 text-sm text-slate-300">
                      Questions:
                      {" "}
                      <a
                        href={`mailto:${settings.contactEmail}`}
                        className="text-cyan-200 underline decoration-cyan-400/40 underline-offset-4"
                      >
                        {settings.contactEmail}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
              <h2 className="text-xl font-bold">
                What makes a strong submission?
              </h2>
              <div className="mt-5 space-y-4 text-sm leading-7 text-slate-300">
                <p>
                  Be honest about your current level and consistent about your availability.
                </p>
                <p>
                  Mention practical skills, coursework, open-source work, design ability, or hackathon experience.
                </p>
                <p>
                  Use the "Why do you want to join?" section to show energy, curiosity, and commitment.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/projects"
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-400/30 hover:text-cyan-200"
                >
                  Explore showcase projects
                </Link>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{
              opacity: 0,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.7,
            }}
            className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl md:p-10"
          >
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">
                  Participant Profile
                </p>
                <h2 className="mt-2 text-3xl font-black">
                  Build your registration
                </h2>
              </div>
              {isClosed && (
                <span className="rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200">
                  Registration closed
                </span>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              <div className="grid gap-5 md:grid-cols-2">
                {[
                  {
                    icon: User,
                    name: "name",
                    label: "Full name",
                    type: "text",
                    placeholder:
                      "Enter your full name",
                  },
                  {
                    icon: Mail,
                    name: "email",
                    label: "Email address",
                    type: "email",
                    placeholder:
                      "Enter your email",
                  },
                  {
                    icon: Lock,
                    name: "password",
                    label: "Password",
                    type: "password",
                    placeholder:
                      "Create a password",
                  },
                  {
                    icon: Lock,
                    name: "confirmPassword",
                    label:
                      "Confirm password",
                    type: "password",
                    placeholder:
                      "Repeat password",
                  },
                ].map((field) => {
                  const Icon = field.icon;

                  return (
                    <label
                      key={field.name}
                      className="block"
                    >
                      <span className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-200">
                        <Icon size={16} />
                        {field.label}
                      </span>
                      <input
                        type={field.type}
                        name={field.name}
                        value={
                          formData[
                            field.name
                          ]
                        }
                        onChange={
                          handleChange
                        }
                        placeholder={
                          field.placeholder
                        }
                        className="w-full rounded-2xl border border-white/10 bg-[#081121] px-5 py-4 outline-none transition focus:border-cyan-400"
                      />
                    </label>
                  );
                })}
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {[
                  "department",
                  "program",
                  "roll",
                  "phone",
                  "github",
                  "linkedin",
                  "portfolio",
                  "availability",
                ].map((field) => (
                  <label
                    key={field}
                    className="block"
                  >
                    <span className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-200 capitalize">
                      {field === "github" ? (
                        <Github size={16} />
                      ) : (
                        <Code2 size={16} />
                      )}
                      {field
                        .replace(
                          "linkedin",
                          "LinkedIn"
                        )
                        .replace(
                          "availability",
                          "Weekly availability"
                        )}
                    </span>
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder={
                        field === "availability"
                          ? "Example: 6-8 hrs/week"
                          : `Enter ${field}`
                      }
                      className="w-full rounded-2xl border border-white/10 bg-[#081121] px-5 py-4 outline-none transition focus:border-cyan-400"
                    />
                  </label>
                ))}
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-[#07101c] p-6">
                <h3 className="text-xl font-bold">
                  Capability snapshot
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  Help us understand your current level and working style.
                </p>

                <div className="mt-6 grid gap-6">
                  <div>
                    <span className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-200">
                      <Code2 size={16} />
                      Experience level
                    </span>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {EXPERIENCE_LEVELS.map(
                        (level) => (
                          <button
                            key={level}
                            type="button"
                            onClick={() =>
                              setFormData(
                                (
                                  current
                                ) => ({
                                  ...current,
                                  experienceLevel:
                                    level,
                                })
                              )
                            }
                            className={`rounded-2xl border px-4 py-4 text-left capitalize transition ${
                              formData.experienceLevel
                              === level
                                ? "border-cyan-400 bg-cyan-400/10 text-cyan-100"
                                : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-cyan-400/30"
                            }`}
                          >
                            {level.replace(
                              "-",
                              " "
                            )}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <label className="block">
                    <span className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-200">
                      <Code2 size={16} />
                      Skills
                    </span>
                    <textarea
                      rows="3"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder="React, Node.js, Figma, Python, UI design, research..."
                      className="w-full rounded-2xl border border-white/10 bg-[#081121] px-5 py-4 outline-none transition focus:border-cyan-400"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-200">
                      <Code2 size={16} />
                      Prior experience
                    </span>
                    <textarea
                      rows="4"
                      name="priorExperience"
                      value={
                        formData.priorExperience
                      }
                      onChange={handleChange}
                      placeholder="Mention projects, internships, hackathons, coursework, or anything else that reflects your capability."
                      className="w-full rounded-2xl border border-white/10 bg-[#081121] px-5 py-4 outline-none transition focus:border-cyan-400"
                    />
                  </label>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-[2rem] border border-white/10 bg-[#07101c] p-6">
                  <h3 className="text-xl font-bold">
                    Preferred domains
                  </h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Choose the areas where you want to contribute.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {DOMAIN_OPTIONS.map(
                      (domain) => (
                        <button
                          key={domain}
                          type="button"
                          onClick={() =>
                            toggleMultiSelect(
                              "preferredDomains",
                              domain
                            )
                          }
                          className={`rounded-full px-4 py-3 text-sm font-medium transition ${
                            formData.preferredDomains.includes(
                              domain
                            )
                              ? "bg-cyan-400/15 text-cyan-100 ring-1 ring-cyan-300/40"
                              : "bg-white/5 text-slate-300 hover:bg-white/10"
                          }`}
                        >
                          {domain}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-[#07101c] p-6">
                  <h3 className="text-xl font-bold">
                    Preferred roles
                  </h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Tell us which kind of contribution feels strongest to you.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {ROLE_OPTIONS.map(
                      (role) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() =>
                            toggleMultiSelect(
                              "preferredRoles",
                              role
                            )
                          }
                          className={`rounded-full px-4 py-3 text-sm font-medium transition ${
                            formData.preferredRoles.includes(
                              role
                            )
                              ? "bg-fuchsia-400/15 text-fuchsia-100 ring-1 ring-fuchsia-300/40"
                              : "bg-white/5 text-slate-300 hover:bg-white/10"
                          }`}
                        >
                          {role.replaceAll(
                            "-",
                            " "
                          )}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>

              <label className="block rounded-[2rem] border border-white/10 bg-[#07101c] p-6">
                <span className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-200">
                  <Layers3 size={16} />
                  Why do you want to join?
                </span>
                <textarea
                  rows="4"
                  name="whyJoin"
                  value={formData.whyJoin}
                  onChange={handleChange}
                  placeholder="Tell us what excites you, what kind of work you want to do, and how you want to grow through SoC."
                  className="w-full rounded-2xl border border-white/10 bg-[#081121] px-5 py-4 outline-none transition focus:border-cyan-400"
                />
              </label>

              {error && (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-200">
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="text-sm leading-6 text-slate-400">
                  By submitting, you are asking the organizing team to review your profile and assign you later.
                  {settings?.eligibility && (
                    <span className="block mt-2 text-slate-300">
                      Eligibility:
                      {" "}
                      {settings.eligibility}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading || isClosed}
                  className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 px-8 py-4 text-lg font-bold transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading
                    ? "Submitting..."
                    : "Submit registration"}
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default Register;
