import {
  useEffect,
  useEffectEvent,
  useState,
} from "react";

import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import EmptyState from "../components/ui/EmptyState";
import { InlineMessage } from "../components/ui/Field";
import {
  PageHeader,
  PageShell,
} from "../components/ui/PageChrome";
import {
  DOMAIN_OPTIONS,
  EXPERIENCE_LEVELS,
  ROLE_OPTIONS,
  registrationStatusLabels,
} from "../constants/registration";
import API from "../services/api";
import {
  getStoredUser,
  setUserSession,
  getUserToken,
} from "../services/authStorage";
import { getApiErrorMessage } from "../services/apiError";

const initialForm = {
  name: "",
  bio: "",
  department: "",
  roll: "",
  program: "",
  phone: "",
  github: "",
  linkedin: "",
  portfolio: "",
  availability: "",
  priorExperience: "",
  whyJoin: "",
  skills: "",
  experienceLevel: "beginner",
  preferredDomains: [],
  preferredRoles: [],
};

const fieldLabels = {
  name: "Full name",
  bio: "Bio",
  department: "Department",
  roll: "Roll number",
  program: "Program",
  phone: "Phone",
  github: "GitHub",
  linkedin: "LinkedIn",
  portfolio: "Portfolio",
  availability: "Availability",
  priorExperience:
    "Prior experience",
  whyJoin: "Why join",
  skills: "Skills",
  experienceLevel:
    "Experience level",
  preferredDomains:
    "Preferred domains",
  preferredRoles:
    "Preferred roles",
};

const basicFields = [
  "name",
  "department",
  "program",
  "roll",
  "phone",
  "github",
  "linkedin",
  "portfolio",
  "availability",
];

const narrativeFields = [
  {
    field: "bio",
    rows: 3,
  },
  {
    field: "priorExperience",
    rows: 3,
  },
  {
    field: "whyJoin",
    rows: 3,
  },
];

const fallbackEditPolicy = (
  registrationStatus
) => {
  const directEditableFields =
    registrationStatus ===
    "pending_review"
      ? Object.keys(initialForm)
      : [
          "phone",
          "github",
          "linkedin",
          "portfolio",
        ];

  return {
    mode:
      registrationStatus ===
      "pending_review"
        ? "full"
        : "limited",
    directEditableFields,
    requestOnlyFields:
      Object.keys(initialForm).filter(
        (field) =>
          !directEditableFields.includes(
            field
          )
      ),
    canRequestLockedFields:
      registrationStatus !==
      "pending_review",
  };
};

const renderRequestedValue = (
  value
) => {
  if (Array.isArray(value)) {
    return value.length > 0
      ? value.join(", ")
      : "Clear this field";
  }

  return value
    ? String(value)
    : "Clear this field";
};

const Profile = () => {
  const [profile, setProfile] =
    useState(null);
  const [dashboard, setDashboard] =
    useState(null);
  const [editing, setEditing] =
    useState(false);
  const [form, setForm] =
    useState(initialForm);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState("");
  const [saving, setSaving] =
    useState(false);
  const [feedback, setFeedback] =
    useState({
      tone: "success",
      message: "",
    });
  const [
    changeRequestNote,
    setChangeRequestNote,
  ] = useState("");

  const syncFormFromProfile = (
    nextProfile
  ) => {
    setForm({
      name: nextProfile.name || "",
      bio: nextProfile.bio || "",
      department:
        nextProfile.department || "",
      roll: nextProfile.roll || "",
      program:
        nextProfile.program || "",
      phone: nextProfile.phone || "",
      github:
        nextProfile.github || "",
      linkedin:
        nextProfile.linkedin || "",
      portfolio:
        nextProfile.portfolio || "",
      availability:
        nextProfile.availability || "",
      priorExperience:
        nextProfile.priorExperience || "",
      whyJoin:
        nextProfile.whyJoin || "",
      experienceLevel:
        nextProfile.experienceLevel ||
        "beginner",
      skills:
        nextProfile.skills?.join(", ") ||
        "",
      preferredDomains:
        nextProfile.preferredDomains ||
        [],
      preferredRoles:
        nextProfile.preferredRoles ||
        [],
    });
    setChangeRequestNote("");
  };

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      setError("");
      const [
        profileResponse,
        dashboardResponse,
      ] = await Promise.all([
        API.get("/users/profile"),
        API.get(
          "/users/profile/dashboard"
        ),
      ]);

      setProfile(profileResponse.data);
      setDashboard(
        dashboardResponse.data
      );
      syncFormFromProfile(
        profileResponse.data
      );
    } catch (fetchError) {
      setError(
        getApiErrorMessage(
          fetchError,
          "Unable to load your profile right now."
        )
      );
      setProfile(null);
      setDashboard(null);
    } finally {
      setLoading(false);
    }
  };

  const loadProfileOnMount =
    useEffectEvent(() => {
      fetchProfileData();
    });

  useEffect(() => {
    const timer =
      window.setTimeout(() => {
        loadProfileOnMount();
      }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const toggleArrayValue = (
    key,
    value
  ) => {
    setForm((current) => ({
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

  const updateProfile = async (
    event
  ) => {
    event.preventDefault();

    try {
      setSaving(true);
      setFeedback({
        tone: "success",
        message: "",
      });

      const response =
        await API.put(
          "/users/profile",
          {
            ...form,
            changeRequestNote,
            skills:
              form.skills
                .split(",")
                .map((skill) =>
                  skill.trim()
                )
                .filter(Boolean),
          }
        );

      setProfile(response.data);
      setEditing(false);
      setChangeRequestNote("");

      const sessionUser =
        getStoredUser();

      if (sessionUser) {
        setUserSession(
          getUserToken(),
          {
            ...sessionUser,
            name: response.data.name,
            registrationStatus:
              response.data.registrationStatus,
            experienceLevel:
              response.data.experienceLevel,
          }
        );
      }

      syncFormFromProfile(
        response.data
      );
      setFeedback({
        tone: "success",
        message:
          response.data
            .updateMessage ||
          "Profile updated successfully.",
      });
    } catch (saveError) {
      setFeedback({
        tone: "error",
        message:
          getApiErrorMessage(
            saveError,
            "Unable to save your profile right now."
          ),
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <PageShell>
          <Card className="soc-skeleton h-72" />
          <Card className="soc-skeleton h-96" />
        </PageShell>
      </div>
    );
  }

  if (error && (!profile || !dashboard)) {
    return (
      <div className="min-h-screen">
        <PageShell className="max-w-3xl">
          <InlineMessage tone="error">
            {error}
          </InlineMessage>
          <EmptyState
            title="Profile unavailable"
            description="We could not load your personal registration details right now."
            action={{
              label: "Try again",
              onClick:
                fetchProfileData,
            }}
          />
        </PageShell>
      </div>
    );
  }

  if (!profile || !dashboard) {
    return (
      <div className="min-h-screen">
        <PageShell className="max-w-3xl">
          <EmptyState
            title="No profile data found"
            description="Your account exists, but the profile snapshot is unavailable right now."
            action={{
              label: "Reload",
              onClick:
                fetchProfileData,
            }}
          />
        </PageShell>
      </div>
    );
  }

  const profileEditPolicy =
    profile.profileEditPolicy ||
    fallbackEditPolicy(
      profile.registrationStatus
    );
  const directEditableFields =
    new Set(
      profileEditPolicy.directEditableFields ||
        []
    );
  const isLimitedEditing =
    profileEditPolicy.mode ===
    "limited";
  const pendingChangeRequest =
    profile.pendingProfileChangeRequest;

  const isRequestOnly = (
    field
  ) =>
    isLimitedEditing &&
    !directEditableFields.has(field);

  return (
    <div className="min-h-screen">
      <PageShell>
        <PageHeader
          badge="Profile and registration"
          title="Keep your participant profile accurate."
          description="This is the version organizers review, shortlist, and assign from. Contact links can stay fresh even while assignment data is locked."
          meta={
            <>
              <Badge tone="accent">
                {
                  profile.experienceLevel
                }
              </Badge>
              <Badge tone="info">
                {
                  registrationStatusLabels[
                    profile.registrationStatus
                  ]
                }
              </Badge>
            </>
          }
        />

        <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
          <div className="rounded-3xl border border-[var(--soc-border-soft)] bg-white p-8 ">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-36 w-36 items-center justify-center rounded-full border border-[var(--soc-border-soft)] bg-[var(--soc-surface-cool)] text-5xl font-semibold text-[var(--soc-ink)]">
                {profile.name?.charAt(0)}
              </div>

              <h1 className="mt-6 text-3xl font-semibold tracking-[-0.03em] text-[var(--soc-ink)]">
                {profile.name}
              </h1>
              <p className="mt-2 text-[var(--soc-text-muted)]">
                {profile.department}
              </p>
              <p className="mt-2 text-sm text-[var(--soc-text-muted)]">
                Roll No: {profile.roll}
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <span className="rounded-full bg-fuchsia-500/10 px-5 py-3 text-sm font-semibold capitalize text-[var(--soc-teal)]">
                  {
                    profile.experienceLevel
                  }
                </span>
                <span className="rounded-full bg-cyan-500/10 px-5 py-3 text-sm font-semibold text-[var(--soc-teal)]">
                  {
                    registrationStatusLabels[
                      profile.registrationStatus
                    ]
                  }
                </span>
              </div>

              <div className="mt-8 flex w-full flex-col gap-4">
                {[
                  {
                    label: "GitHub",
                    value:
                      profile.github,
                  },
                  {
                    label:
                      "LinkedIn",
                    value:
                      profile.linkedin,
                  },
                  {
                    label:
                      "Portfolio",
                    value:
                      profile.portfolio,
                  },
                ]
                  .filter((item) => item.value)
                  .map((item) => (
                    <a
                      key={item.label}
                      href={item.value}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl bg-[var(--soc-surface-cool)] px-5 py-4 transition hover:bg-white/10"
                    >
                      {item.label}
                    </a>
                  ))}
              </div>

              <Button
                type="button"
                block
                className="mt-8"
                onClick={() =>
                  setEditing((current) => {
                    if (current) {
                      syncFormFromProfile(
                        profile
                      );
                    }

                    return !current;
                  })
                }
              >
                {editing
                  ? "Cancel"
                  : isLimitedEditing
                    ? "Update contact / request changes"
                    : "Edit Profile"}
              </Button>

              <p className="mt-4 text-sm leading-6 text-[var(--soc-text-muted)]">
                {isLimitedEditing
                  ? "Your profile is already under review or assigned. Contact links update directly, while capability-related changes go through organizer review."
                  : "Your profile is still in pending review, so edits apply directly to the registration snapshot."}
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-3xl border border-[var(--soc-border-soft)] bg-white p-8 ">
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[var(--soc-ink)]">
                About and Registration Details
              </h2>

              {feedback.message && (
                <InlineMessage
                  tone={feedback.tone}
                  className="mt-6"
                >
                  {feedback.message}
                </InlineMessage>
              )}

              {pendingChangeRequest
                ?.requestedAt && (
                <Card className="mt-6 p-5">
                  <h3 className="text-lg font-semibold text-[var(--soc-ink)]">
                    Pending change request
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--soc-text-muted)]">
                    {pendingChangeRequest.note ||
                      "You have a pending request for locked profile changes."}
                  </p>
                  <p className="mt-3 text-xs text-[var(--soc-text-muted)]">
                    Requested on{" "}
                    {new Date(
                      pendingChangeRequest.requestedAt
                    ).toLocaleString()}
                  </p>
                  {pendingChangeRequest
                    .requestedFields
                    ?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      {pendingChangeRequest.requestedFields.map(
                        (field) => (
                          <span
                            key={field}
                            className="rounded-full bg-amber-500/10 px-3 py-2 text-xs font-semibold text-amber-200"
                          >
                            {fieldLabels[field] ||
                              field}
                          </span>
                        )
                      )}
                    </div>
                  )}
                </Card>
              )}

              {editing ? (
                <form
                  onSubmit={updateProfile}
                  className="mt-6 space-y-5"
                >
                  <InlineMessage
                    tone={
                      isLimitedEditing
                        ? "info"
                        : "success"
                    }
                  >
                    {isLimitedEditing
                      ? "Fields marked request-only will not overwrite the reviewed registration immediately. They will be sent to the organizers as a change request."
                      : "All profile fields are currently editable because your registration is still pending review."}
                  </InlineMessage>

                  <div className="grid gap-5 md:grid-cols-2">
                    {basicFields.map((field) => (
                      <label
                        key={field}
                        className="block"
                      >
                        <div className="mb-2 flex items-center justify-between gap-3 text-sm font-semibold text-[var(--soc-ink)]">
                          <span>
                            {fieldLabels[
                              field
                            ] || field}
                          </span>
                          {isRequestOnly(
                            field
                          ) && (
                            <span className="rounded-full bg-amber-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-200">
                              Request only
                            </span>
                          )}
                        </div>
                        <input
                          type="text"
                          value={form[field]}
                          onChange={(event) =>
                            setForm(
                              (
                                current
                              ) => ({
                                ...current,
                                [field]:
                                  event.target.value,
                              })
                            )
                          }
                          className={`w-full rounded-2xl border bg-[var(--soc-bg)] px-5 py-4 outline-none ${
                            isRequestOnly(
                              field
                            )
                              ? "border-amber-400/30"
                              : "border-[var(--soc-border-soft)]"
                          }`}
                        />
                      </label>
                    ))}
                  </div>

                  <label className="block">
                    <div className="mb-2 flex items-center justify-between gap-3 text-sm font-semibold text-[var(--soc-ink)]">
                      <span>
                        Experience level
                      </span>
                      {isRequestOnly(
                        "experienceLevel"
                      ) && (
                        <span className="rounded-full bg-amber-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-200">
                          Request only
                        </span>
                      )}
                    </div>
                    <select
                      value={
                        form.experienceLevel
                      }
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          experienceLevel:
                            event.target.value,
                        }))
                      }
                      className={`w-full rounded-2xl border bg-[var(--soc-bg)] px-5 py-4 outline-none ${
                        isRequestOnly(
                          "experienceLevel"
                        )
                          ? "border-amber-400/30"
                          : "border-[var(--soc-border-soft)]"
                      }`}
                    >
                      {EXPERIENCE_LEVELS.map(
                        (level) => (
                          <option
                            key={level}
                            value={level}
                          >
                            {level}
                          </option>
                        )
                      )}
                    </select>
                  </label>

                  <label className="block">
                    <div className="mb-2 flex items-center justify-between gap-3 text-sm font-semibold text-[var(--soc-ink)]">
                      <span>Skills</span>
                      {isRequestOnly(
                        "skills"
                      ) && (
                        <span className="rounded-full bg-amber-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-200">
                          Request only
                        </span>
                      )}
                    </div>
                    <textarea
                      rows="3"
                      value={form.skills}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          skills:
                            event.target.value,
                        }))
                      }
                      className={`w-full rounded-2xl border bg-[var(--soc-bg)] px-5 py-4 outline-none ${
                        isRequestOnly(
                          "skills"
                        )
                          ? "border-amber-400/30"
                          : "border-[var(--soc-border-soft)]"
                      }`}
                    />
                  </label>

                  {narrativeFields.map(
                    ({
                      field,
                      rows,
                    }) => (
                      <label
                        key={field}
                        className="block"
                      >
                        <div className="mb-2 flex items-center justify-between gap-3 text-sm font-semibold text-[var(--soc-ink)]">
                          <span>
                            {fieldLabels[
                              field
                            ] || field}
                          </span>
                          {isRequestOnly(
                            field
                          ) && (
                            <span className="rounded-full bg-amber-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-200">
                              Request only
                            </span>
                          )}
                        </div>
                        <textarea
                          rows={rows}
                          value={form[field]}
                          onChange={(
                            event
                          ) =>
                            setForm(
                              (
                                current
                              ) => ({
                                ...current,
                                [field]:
                                  event.target.value,
                              })
                            )
                          }
                          className={`w-full rounded-2xl border bg-[var(--soc-bg)] px-5 py-4 outline-none ${
                            isRequestOnly(
                              field
                            )
                              ? "border-amber-400/30"
                              : "border-[var(--soc-border-soft)]"
                          }`}
                        />
                      </label>
                    )
                  )}

                  <div>
                    <div className="mb-3 flex items-center justify-between gap-3 text-sm font-semibold text-[var(--soc-ink)]">
                      <p>
                        Preferred domains
                      </p>
                      {isRequestOnly(
                        "preferredDomains"
                      ) && (
                        <span className="rounded-full bg-amber-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-200">
                          Request only
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {DOMAIN_OPTIONS.map(
                        (domain) => (
                          <button
                            key={domain}
                            type="button"
                            onClick={() =>
                              toggleArrayValue(
                                "preferredDomains",
                                domain
                              )
                            }
                            className={`rounded-full border px-4 py-3 text-sm ${
                              form.preferredDomains.includes(
                                domain
                              )
                                ? "border-cyan-300/40 bg-cyan-500/10 text-[var(--soc-teal)]"
                                : isRequestOnly(
                                    "preferredDomains"
                                  )
                                  ? "border-amber-400/30 bg-[var(--soc-surface-cool)] text-[var(--soc-text-muted)]"
                                  : "border-[var(--soc-border-soft)] bg-[var(--soc-surface-cool)] text-[var(--soc-text-muted)]"
                            }`}
                          >
                            {domain}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 flex items-center justify-between gap-3 text-sm font-semibold text-[var(--soc-ink)]">
                      <p>
                        Preferred roles
                      </p>
                      {isRequestOnly(
                        "preferredRoles"
                      ) && (
                        <span className="rounded-full bg-amber-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-200">
                          Request only
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {ROLE_OPTIONS.map(
                        (role) => (
                          <button
                            key={role}
                            type="button"
                            onClick={() =>
                              toggleArrayValue(
                                "preferredRoles",
                                role
                              )
                            }
                            className={`rounded-full border px-4 py-3 text-sm ${
                              form.preferredRoles.includes(
                                role
                              )
                                ? "border-fuchsia-300/40 bg-fuchsia-500/10 text-[var(--soc-teal)]"
                                : isRequestOnly(
                                    "preferredRoles"
                                  )
                                  ? "border-amber-400/30 bg-[var(--soc-surface-cool)] text-[var(--soc-text-muted)]"
                                  : "border-[var(--soc-border-soft)] bg-[var(--soc-surface-cool)] text-[var(--soc-text-muted)]"
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

                  {isLimitedEditing && (
                    <label className="block">
                      <div className="mb-2 text-sm font-semibold text-[var(--soc-ink)]">
                        Change request note
                      </div>
                      <textarea
                        rows="4"
                        value={
                          changeRequestNote
                        }
                        onChange={(event) =>
                          setChangeRequestNote(
                            event.target.value
                          )
                        }
                        placeholder="Explain why you need these locked fields updated so the organizers can review the request quickly."
                        className="w-full rounded-2xl border border-[var(--soc-border-soft)] bg-[var(--soc-bg)] px-5 py-4 outline-none"
                      />
                    </label>
                  )}

                  <Button
                    type="submit"
                    disabled={saving}
                    loading={saving}
                  >
                    {saving
                      ? "Saving..."
                      : isLimitedEditing
                        ? "Save updates / send request"
                        : "Save profile"}
                  </Button>
                </form>
              ) : (
                <div className="mt-6 grid gap-8 lg:grid-cols-2">
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-lg font-bold">
                        Bio
                      </h3>
                      <p className="mt-2 text-[var(--soc-text-muted)]">
                        {profile.bio ||
                          "No bio added yet."}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">
                        Prior Experience
                      </h3>
                      <p className="mt-2 text-[var(--soc-text-muted)]">
                        {profile.priorExperience ||
                          "No prior experience shared yet."}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">
                        Why Join
                      </h3>
                      <p className="mt-2 text-[var(--soc-text-muted)]">
                        {profile.whyJoin ||
                          "No motivation note shared yet."}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <h3 className="text-lg font-bold">
                        Skills
                      </h3>
                      <div className="mt-3 flex flex-wrap gap-3">
                        {profile.skills?.length >
                        0 ? (
                          profile.skills.map(
                            (skill) => (
                              <span
                                key={skill}
                                className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-[var(--soc-teal)]"
                              >
                                {skill}
                              </span>
                            )
                          )
                        ) : (
                          <p className="text-sm text-[var(--soc-text-muted)]">
                            No skills shared yet.
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">
                        Preferred Domains
                      </h3>
                      <div className="mt-3 flex flex-wrap gap-3">
                        {profile.preferredDomains?.length >
                        0 ? (
                          profile.preferredDomains.map(
                            (domain) => (
                              <span
                                key={domain}
                                className="rounded-full bg-[var(--soc-surface-cool)] px-4 py-2 text-sm text-[var(--soc-text-muted)]"
                              >
                                {domain}
                              </span>
                            )
                          )
                        ) : (
                          <p className="text-sm text-[var(--soc-text-muted)]">
                            No domain preferences added yet.
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">
                        Preferred Roles
                      </h3>
                      <div className="mt-3 flex flex-wrap gap-3">
                        {profile.preferredRoles?.length >
                        0 ? (
                          profile.preferredRoles.map(
                            (role) => (
                              <span
                                key={role}
                                className="rounded-full bg-fuchsia-500/10 px-4 py-2 text-sm text-[var(--soc-teal)]"
                              >
                                {role.replaceAll(
                                  "-",
                                  " "
                                )}
                              </span>
                            )
                          )
                        ) : (
                          <p className="text-sm text-[var(--soc-text-muted)]">
                            No role preferences added yet.
                          </p>
                        )}
                      </div>
                    </div>

                    {pendingChangeRequest
                      ?.requestedFields
                      ?.length > 0 && (
                      <div>
                        <h3 className="text-lg font-bold">
                          Requested Changes
                        </h3>
                        <div className="mt-3 space-y-3">
                          {pendingChangeRequest.requestedFields.map(
                            (field) => (
                              <div
                                key={field}
                                className="rounded-2xl bg-[var(--soc-surface-cool)] p-4"
                              >
                                <p className="text-sm font-semibold text-[var(--soc-ink)]">
                                  {fieldLabels[
                                    field
                                  ] || field}
                                </p>
                                <p className="mt-2 text-sm text-[var(--soc-text-muted)]">
                                  {renderRequestedValue(
                                    pendingChangeRequest
                                      .requestedValues?.[
                                      field
                                    ]
                                  )}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-[var(--soc-border-soft)] bg-white p-8 ">
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[var(--soc-ink)]">
                Progress Snapshot
              </h2>
              <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {[
                  {
                    label:
                      "Assigned Projects",
                    value:
                      dashboard.stats
                        .totalProjects,
                  },
                  {
                    label:
                      "Completed Projects",
                    value:
                      dashboard.stats
                        .completedProjects,
                  },
                  {
                    label:
                      "Total Tasks",
                    value:
                      dashboard.stats
                        .totalTasks,
                  },
                  {
                    label:
                      "Approved Tasks",
                    value:
                      dashboard.stats
                        .approvedTasks,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl bg-[var(--soc-surface-cool)] p-5"
                  >
                    <h3 className="text-3xl font-semibold text-[var(--soc-teal)]">
                      {item.value}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--soc-text-muted)]">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageShell>
    </div>
  );
};

export default Profile;
