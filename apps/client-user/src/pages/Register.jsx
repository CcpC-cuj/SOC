import {
  useEffect,
  useState,
} from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  Code2,
  Layers3,
  Lock,
  Mail,
  User,
} from "lucide-react";
import {
  Link,
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
  Textarea,
} from "../components/ui/Field";
import {
  DOMAIN_OPTIONS,
  EXPERIENCE_LEVELS,
  ROLE_OPTIONS,
} from "../constants/registration";
import { buttonStyles } from "../components/ui/buttonStyles";
import { getApiErrorMessage } from "../services/apiError";
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

const registrationBenefits = [
  {
    icon: User,
    title: "Present your strengths clearly",
    text:
      "Share your background, interests, and working capacity in a format reviewers can understand quickly.",
  },
  {
    icon: Layers3,
    title: "Get reviewed thoughtfully",
    text:
      "Applications are considered with project fit, role balance, and growth potential in mind.",
  },
  {
    icon: CheckCircle2,
    title: "Enter the right team later",
    text:
      "Final project and squad placement happens after review instead of depending on who clicks first.",
  },
];

const chipButtonStyles = (
  selected
) =>
  selected
    ? "border-[rgba(31,79,107,0.2)] bg-[var(--soc-surface-cool)] text-[var(--soc-ink)] shadow-[var(--soc-shadow-soft)] ring-1 ring-[rgba(31,79,107,0.14)]"
    : "border-[var(--soc-border-soft)] bg-white text-[var(--soc-text-muted)] hover:border-[rgba(22,35,52,0.18)] hover:bg-[var(--soc-surface-cool)] hover:text-[var(--soc-ink)]";

const profileFields = [
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
    label: "Confirm password",
    type: "password",
    placeholder:
      "Repeat password",
  },
];

const academicFields = [
  {
    name: "department",
    label: "Department",
    placeholder:
      "Enter your department",
  },
  {
    name: "program",
    label: "Program",
    placeholder:
      "Enter your program",
  },
  {
    name: "roll",
    label: "Roll number",
    placeholder:
      "Enter your roll number",
  },
  {
    name: "phone",
    label: "Phone number",
    placeholder:
      "Enter your phone number",
  },
  {
    name: "github",
    label: "GitHub profile",
    placeholder:
      "https://github.com/yourname",
  },
  {
    name: "linkedin",
    label: "LinkedIn profile",
    placeholder:
      "https://linkedin.com/in/yourname",
  },
  {
    name: "portfolio",
    label: "Portfolio or website",
    placeholder:
      "https://your-site.com",
  },
  {
    name: "availability",
    label: "Weekly availability",
    placeholder:
      "Example: 6-8 hrs/week",
  },
];

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
            "Unable to load registration settings right now."
          )
        );
      }
    }

    fetchSettings();
  }, []);

  const isClosed =
    settings &&
    (!settings.registrationOpen ||
      (settings.registrationDeadline &&
        new Date(
          settings.registrationDeadline
        ) < new Date()));

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
      formData.password !==
      formData.confirmPassword
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
        getApiErrorMessage(
          submitError,
          "Registration failed."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 sm:py-14">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
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
              duration: 0.55,
            }}
            className="space-y-6"
          >
            <Badge tone="warning">
              Registration, review, and assignment
            </Badge>

            <div className="space-y-4">
              <h1 className="max-w-2xl text-4xl font-semibold tracking-[-0.05em] text-[var(--soc-ink)] sm:text-5xl lg:text-[3.6rem]">
                Register once and give reviewers the context they need.
              </h1>

              <p className="max-w-2xl text-base leading-8 text-[var(--soc-text-muted)] sm:text-lg">
                {settings
                  ?.registrationSubheadline ||
                  "Tell us your strengths, interests, and availability. The organizing team will review your profile and assign you to the right project and team later."}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {registrationBenefits.map(
                (item) => {
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
                }
              )}
            </div>

            <Card strong className="p-6 sm:p-7">
              <div className="flex items-start gap-4">
                <Clock3
                  className="mt-1 text-[var(--soc-teal)]"
                  size={20}
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--soc-ink)]/48">
                    Before you submit
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--soc-text-muted)] sm:text-base sm:leading-8">
                    {settings
                      ?.registrationNotice ||
                      "Public projects are showcase previews. Final project allocation happens after registrations are reviewed."}
                  </p>
                  {settings?.registrationDeadline ? (
                    <p className="mt-4 text-sm text-[var(--soc-teal)]">
                      Registration deadline:{" "}
                      {new Date(
                        settings.registrationDeadline
                      ).toLocaleString()}
                    </p>
                  ) : null}
                  {settings?.contactEmail ? (
                    <p className="mt-3 text-sm text-[var(--soc-text-muted)]">
                      Questions:{" "}
                      <a
                        href={`mailto:${settings.contactEmail}`}
                        className="font-medium text-[var(--soc-teal)] underline decoration-[var(--soc-ink)]/20 underline-offset-4"
                      >
                        {settings.contactEmail}
                      </a>
                    </p>
                  ) : null}
                </div>
              </div>
            </Card>

            <CardSection className="p-6">
              <h2 className="text-lg font-semibold tracking-[-0.02em] text-[var(--soc-ink)]">
                What makes a strong submission?
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--soc-text-muted)]">
                <p>
                  Be honest about your current level and consistent about your
                  availability.
                </p>
                <p>
                  Mention practical skills, coursework, open-source work,
                  design ability, or hackathon experience.
                </p>
                <p>
                  Use the motivation section to show curiosity, commitment, and
                  the type of work you want to grow into.
                </p>
              </div>
              <div className="mt-5">
                <Link
                  to="/projects"
                  className={buttonStyles({
                    variant: "secondary",
                    size: "sm",
                  })}
                >
                  Explore showcase projects
                </Link>
              </div>
            </CardSection>
          </motion.section>

          <motion.section
            initial={{
              opacity: 0,
              scale: 0.985,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <Card
              strong
              className="p-6 sm:p-8 lg:p-10"
            >
              <div className="mb-8 flex flex-wrap items-start justify-between gap-4 border-b border-[var(--soc-border-soft)] pb-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--soc-ink)]/48">
                    Participant profile
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[var(--soc-ink)] sm:text-4xl">
                    Build your registration
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--soc-text-muted)] sm:text-base">
                    Share the information the review team needs to understand
                    your fit and readiness.
                  </p>
                </div>

                {isClosed ? (
                  <Badge tone="danger">
                    Registration closed
                  </Badge>
                ) : null}
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                <CardSection className="p-5 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--soc-ink)]/48">
                    Account details
                  </p>
                  <div className="mt-5 grid gap-5 md:grid-cols-2">
                    {profileFields.map(
                      (field) => {
                        const Icon = field.icon;

                        return (
                          <label
                            key={field.name}
                            className="block"
                          >
                            <FieldLabel className="mb-3 flex items-center gap-2">
                              <Icon size={16} />
                              {field.label}
                            </FieldLabel>
                            <Input
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
                            />
                          </label>
                        );
                      }
                    )}
                  </div>
                </CardSection>

                <CardSection className="p-5 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--soc-ink)]/48">
                    Academic and contact profile
                  </p>
                  <div className="mt-5 grid gap-5 md:grid-cols-2">
                    {academicFields.map(
                      (field) => (
                        <label
                          key={field.name}
                          className="block"
                        >
                          <FieldLabel className="mb-3 flex items-center gap-2">
                            <Code2 size={16} />
                            {field.label}
                          </FieldLabel>
                          <Input
                            type="text"
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
                          />
                        </label>
                      )
                    )}
                  </div>
                </CardSection>

                <CardSection className="p-5 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--soc-ink)]/48">
                    Capability snapshot
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--soc-text-muted)]">
                    Help reviewers understand your current level, relevant
                    skills, and practical experience.
                  </p>

                  <div className="mt-6 grid gap-6">
                    <div>
                      <FieldLabel className="mb-4 flex items-center gap-2">
                        <Code2 size={16} />
                        Experience level
                      </FieldLabel>
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
                              aria-pressed={
                                formData.experienceLevel ===
                                level
                              }
                              className={`inline-flex items-center gap-2 rounded-[0.95rem] border px-4 py-3 text-left capitalize transition ${chipButtonStyles(
                                formData.experienceLevel ===
                                  level
                              )}`}
                            >
                              {formData.experienceLevel ===
                              level ? (
                                <Check
                                  size={16}
                                />
                              ) : null}
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
                      <FieldLabel className="mb-3 flex items-center gap-2">
                        <Code2 size={16} />
                        Skills
                      </FieldLabel>
                      <Textarea
                        rows="3"
                        name="skills"
                        value={
                          formData.skills
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="React, Node.js, Figma, Python, UI design, research..."
                      />
                    </label>

                    <label className="block">
                      <FieldLabel className="mb-3 flex items-center gap-2">
                        <Code2 size={16} />
                        Prior experience
                      </FieldLabel>
                      <Textarea
                        rows="4"
                        name="priorExperience"
                        value={
                          formData.priorExperience
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="Mention projects, internships, hackathons, coursework, or anything else that reflects your capability."
                      />
                    </label>
                  </div>
                </CardSection>

                <div className="grid gap-6 lg:grid-cols-2">
                  <CardSection className="p-5 sm:p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--soc-ink)]/48">
                      Preferred domains
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[var(--soc-text-muted)]">
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
                            aria-pressed={formData.preferredDomains.includes(
                              domain
                            )}
                            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition ${chipButtonStyles(
                              formData.preferredDomains.includes(
                                domain
                              )
                            )}`}
                          >
                            {formData.preferredDomains.includes(
                              domain
                            ) ? (
                              <Check
                                size={14}
                              />
                            ) : null}
                            {domain}
                          </button>
                        )
                      )}
                    </div>
                  </CardSection>

                  <CardSection className="p-5 sm:p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--soc-ink)]/48">
                      Preferred roles
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[var(--soc-text-muted)]">
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
                            aria-pressed={formData.preferredRoles.includes(
                              role
                            )}
                            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition ${chipButtonStyles(
                              formData.preferredRoles.includes(
                                role
                              )
                            )}`}
                          >
                            {formData.preferredRoles.includes(
                              role
                            ) ? (
                              <Check
                                size={14}
                              />
                            ) : null}
                            {role.replaceAll(
                              "-",
                              " "
                            )}
                          </button>
                        )
                      )}
                    </div>
                  </CardSection>
                </div>

                <CardSection className="p-5 sm:p-6">
                  <FieldLabel className="mb-3 flex items-center gap-2">
                    <Layers3 size={16} />
                    Why do you want to join?
                  </FieldLabel>
                  <Textarea
                    rows="4"
                    name="whyJoin"
                    value={formData.whyJoin}
                    onChange={handleChange}
                    placeholder="Tell us what excites you, what kind of work you want to do, and how you want to grow through SoC."
                  />
                </CardSection>

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

                <div className="flex flex-col gap-4 border-t border-[var(--soc-border-soft)] pt-6 md:flex-row md:items-center md:justify-between">
                  <div className="text-sm leading-7 text-[var(--soc-text-muted)]">
                    By submitting, you are asking the organizing team to review
                    your profile and assign you later.
                    {settings?.codeOfConductUrl ? (
                      <span className="mt-2 block">
                        You are also confirming that you will follow the{" "}
                        <a
                          href={
                            settings.codeOfConductUrl
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-[var(--soc-teal)] underline decoration-[var(--soc-ink)]/20 underline-offset-4"
                        >
                          code of conduct
                        </a>
                        .
                      </span>
                    ) : null}
                    {settings?.eligibility ? (
                      <span className="mt-2 block">
                        Eligibility:{" "}
                        {settings.eligibility}
                      </span>
                    ) : null}
                  </div>

                  <Button
                    type="submit"
                    disabled={isClosed}
                    loading={loading}
                    size="lg"
                    className="shrink-0"
                  >
                    {loading
                      ? "Submitting..."
                      : "Submit registration"}
                    <ArrowRight size={18} />
                  </Button>
                </div>
              </form>
            </Card>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default Register;
