import {
  useEffect,
  useState,
} from "react";
import {
  CheckCircle2,
  FolderKanban,
  Settings2,
  Users,
} from "lucide-react";

import AdminAPI from "../../services/adminApi";

const initialSettings = {
  registrationOpen: true,
  registrationDeadline: "",
  registrationHeadline: "",
  registrationSubheadline: "",
  registrationNotice: "",
  contactEmail: "",
  eligibility: "",
  codeOfConductUrl: "",
};

const AdminDashboard = () => {
  const [stats, setStats] =
    useState({
      totalProjects: 0,
      totalUsers: 0,
      totalTasks: 0,
      totalLeaders: 0,
      pendingReview: 0,
      assignedUsers: 0,
      showcaseProjects: 0,
    });
  const [settings, setSettings] =
    useState(initialSettings);
  const [saving, setSaving] =
    useState(false);
  const [message, setMessage] =
    useState("");

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const [
          statsResponse,
          settingsResponse,
        ] = await Promise.all([
          AdminAPI.get(
            "/dashboard/admin"
          ),
          AdminAPI.get(
            "/settings/admin"
          ),
        ]);

        setStats(statsResponse.data);
        setSettings({
          ...settingsResponse.data,
          registrationDeadline:
            settingsResponse.data
              .registrationDeadline
              ? new Date(
                  settingsResponse.data.registrationDeadline
                )
                  .toISOString()
                  .slice(0, 16)
              : "",
        });
      } catch (error) {
        console.error(error);
      }
    }

    fetchDashboard();
  }, []);

  const handleChange = (event) => {
    const {
      name,
      type,
      value,
      checked,
    } = event.target;

    setSettings((current) => ({
      ...current,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSave = async (
    event
  ) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      await AdminAPI.put(
        "/settings/admin",
        {
          ...settings,
          registrationDeadline:
            settings.registrationDeadline
              ? new Date(
                  settings.registrationDeadline
                )
              : null,
        }
      );

      setMessage(
        "Registration settings saved."
      );
    } catch (error) {
      setMessage(
        error.response?.data
          ?.message ||
          "Could not save settings."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">
          Admin Control Room
        </p>
        <h1 className="mt-3 text-5xl font-black">
          Registration ops at a glance
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">
          Open or close registration, tune public messaging, and track how many participants still need review.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Participants",
            value: stats.totalUsers,
            icon: Users,
            tone: "text-cyan-300",
          },
          {
            label: "Pending Review",
            value:
              stats.pendingReview,
            icon: Settings2,
            tone:
              "text-yellow-300",
          },
          {
            label: "Assigned",
            value:
              stats.assignedUsers,
            icon:
              CheckCircle2,
            tone:
              "text-emerald-300",
          },
          {
            label:
              "Showcase Projects",
            value:
              stats.showcaseProjects,
            icon:
              FolderKanban,
            tone:
              "text-fuchsia-300",
          },
        ].map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <Icon
                className={`mb-4 ${card.tone}`}
                size={28}
              />
              <h2 className="text-4xl font-black">
                {card.value}
              </h2>
              <p className="mt-2 text-slate-400">
                {card.label}
              </p>
            </div>
          );
        })}
      </div>

      <form
        onSubmit={handleSave}
        className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8"
      >
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-3xl font-black">
              Registration Settings
            </h2>
            <p className="mt-2 text-slate-400">
              These values drive the public registration page and process messaging.
            </p>
          </div>

          <label className="flex items-center gap-3 rounded-full border border-white/10 bg-[#07101c] px-4 py-3 text-sm font-semibold text-slate-100">
            <input
              type="checkbox"
              name="registrationOpen"
              checked={
                settings.registrationOpen
              }
              onChange={handleChange}
            />
            Registration open
          </label>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <label className="block">
            <span className="mb-3 block text-sm font-semibold text-slate-200">
              Registration deadline
            </span>
            <input
              type="datetime-local"
              name="registrationDeadline"
              value={
                settings.registrationDeadline
              }
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-[#07101c] px-5 py-4 outline-none"
            />
          </label>

          <label className="block">
            <span className="mb-3 block text-sm font-semibold text-slate-200">
              Contact email
            </span>
            <input
              type="email"
              name="contactEmail"
              value={settings.contactEmail}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-[#07101c] px-5 py-4 outline-none"
            />
          </label>
        </div>

        <div className="mt-6 space-y-6">
          {[
            {
              name:
                "registrationHeadline",
              label:
                "Headline",
            },
            {
              name:
                "registrationSubheadline",
              label:
                "Subheadline",
            },
            {
              name:
                "registrationNotice",
              label:
                "Public notice",
            },
            {
              name: "eligibility",
              label:
                "Eligibility note",
            },
            {
              name:
                "codeOfConductUrl",
              label:
                "Code of conduct URL",
            },
          ].map((field) => (
            <label
              key={field.name}
              className="block"
            >
              <span className="mb-3 block text-sm font-semibold text-slate-200">
                {field.label}
              </span>
              {field.name ===
              "codeOfConductUrl" ? (
                <input
                  type="text"
                  name={field.name}
                  value={
                    settings[
                      field.name
                    ]
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full rounded-2xl border border-white/10 bg-[#07101c] px-5 py-4 outline-none"
                />
              ) : (
                <textarea
                  rows="3"
                  name={field.name}
                  value={
                    settings[
                      field.name
                    ]
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full rounded-2xl border border-white/10 bg-[#07101c] px-5 py-4 outline-none"
                />
              )}
            </label>
          ))}
        </div>

        {message && (
          <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-5 py-4 text-sm text-cyan-100">
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="mt-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 px-8 py-4 font-bold disabled:opacity-50"
        >
          {saving
            ? "Saving..."
            : "Save settings"}
        </button>
      </form>
    </div>
  );
};

export default AdminDashboard;
