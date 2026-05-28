import {
  useEffect,
  useEffectEvent,
  useState,
} from "react";
import { Link } from "react-router-dom";
import {
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";

import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import EmptyState from "../../components/ui/EmptyState";
import {
  FieldLabel,
  InlineMessage,
  Input,
  Select,
  Textarea,
} from "../../components/ui/Field";
import Modal from "../../components/ui/Modal";
import PaginationBar from "../../components/ui/PaginationBar";
import {
  PageHeader,
  PageShell,
  SectionHeader,
} from "../../components/ui/PageChrome";
import { useToast } from "../../components/ui/ToastContext";
import { DOMAIN_OPTIONS } from "../../constants/registration";
import { getApiErrorMessage } from "../../services/apiError";
import AdminAPI from "../../services/adminApi";

const PAGE_SIZE = 8;

const initialFormData = {
  title: "",
  description: "",
  session: "",
  season: "",
  domain: "",
  techStack: "",
  highlights: "",
  maxMembers: 10,
  status: "upcoming",
  isShowcase: true,
  acceptingAssignments: false,
};

const initialPagination = {
  page: 1,
  limit: PAGE_SIZE,
  totalItems: 0,
  totalPages: 1,
  hasNextPage: false,
  hasPreviousPage: false,
};

const AdminProjects = () => {
  const showToast = useToast();

  const [projects, setProjects] =
    useState([]);
  const [editingId, setEditingId] =
    useState(null);
  const [formData, setFormData] =
    useState(initialFormData);
  const [searchInput, setSearchInput] =
    useState("");
  const [debouncedSearch, setDebouncedSearch] =
    useState("");
  const [typeFilter, setTypeFilter] =
    useState("all");
  const [statusFilter, setStatusFilter] =
    useState("all");
  const [page, setPage] =
    useState(1);
  const [pagination, setPagination] =
    useState(initialPagination);
  const [loading, setLoading] =
    useState(true);
  const [saving, setSaving] =
    useState(false);
  const [deletingId, setDeletingId] =
    useState("");
  const [confirmDeleteId, setConfirmDeleteId] =
    useState("");
  const [error, setError] =
    useState("");

  useEffect(() => {
    const timer =
      window.setTimeout(() => {
        setDebouncedSearch(
          searchInput.trim()
        );
      }, 250);

    return () => {
      window.clearTimeout(timer);
    };
  }, [searchInput]);

  const loadProjects = async ({
    silent = false,
    pageOverride = page,
  } = {}) => {
    try {
      if (!silent) {
        setLoading(true);
      }

      const response =
        await AdminAPI.get(
          "/projects",
          {
            params: {
              paginated: true,
              q:
                debouncedSearch ||
                undefined,
              type:
                typeFilter === "all"
                  ? undefined
                  : typeFilter,
              status:
                statusFilter === "all"
                  ? undefined
                  : statusFilter,
              page: pageOverride,
              limit: PAGE_SIZE,
            },
          }
        );

      setProjects(
        response.data.items || []
      );
      setPagination(
        response.data.pagination ||
          initialPagination
      );
      setPage(
        response.data.pagination
          ?.page || 1
      );
      setError("");
    } catch (fetchError) {
      setProjects([]);
      setPagination(initialPagination);
      setError(
        getApiErrorMessage(
          fetchError,
          "Unable to load projects right now."
        )
      );
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  };

  const loadProjectsOnMount =
    useEffectEvent(() => {
      loadProjects();
    });

  useEffect(() => {
    const timer =
      window.setTimeout(() => {
        loadProjectsOnMount();
      }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    page,
    debouncedSearch,
    typeFilter,
    statusFilter,
  ]);

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData((current) => ({
      ...current,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData(initialFormData);
  };

  const buildPayload = () => ({
    ...formData,
    maxMembers:
      Number(formData.maxMembers) ||
      10,
    techStack:
      formData.techStack
        .split(",")
        .map((item) =>
          item.trim()
        )
        .filter(Boolean),
    highlights:
      formData.highlights
        .split(",")
        .map((item) =>
          item.trim()
        )
        .filter(Boolean),
  });

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      if (editingId) {
        await AdminAPI.put(
          `/projects/${editingId}`,
          buildPayload()
        );
        showToast({
          tone: "success",
          title:
            "Project updated",
          description:
            "The project details are now saved.",
        });
      } else {
        await AdminAPI.post(
          "/projects",
          buildPayload()
        );
        showToast({
          tone: "success",
          title:
            "Project created",
          description:
            "The new project is ready for review and assignment planning.",
        });
      }

      resetForm();
      await loadProjects({
        pageOverride: 1,
      });
    } catch (submitError) {
      const message =
        submitError.response?.data
          ?.message ||
        "Unable to save the project right now.";
      setError(message);
      showToast({
        tone: "error",
        title:
          "Project save failed",
        description: message,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) {
      return;
    }

    try {
      setDeletingId(confirmDeleteId);
      await AdminAPI.delete(
        `/projects/${confirmDeleteId}`
      );
      showToast({
        tone: "success",
        title:
          "Project deleted",
        description:
          "The project was removed successfully.",
      });
      setConfirmDeleteId("");
      await loadProjects({
        pageOverride: page,
      });
    } catch (deleteError) {
      const message =
        deleteError.response?.data
          ?.message ||
        "Unable to delete this project.";
      setError(message);
      showToast({
        tone: "error",
        title:
          "Delete blocked",
        description: message,
      });
    } finally {
      setDeletingId("");
    }
  };

  const startEdit = (project) => {
    setEditingId(project._id);
    setFormData({
      title: project.title,
      description:
        project.description,
      session: project.session,
      season: project.season,
      domain: project.domain,
      techStack:
        project.techStack.join(", "),
      highlights:
        project.highlights.join(", "),
      maxMembers:
        project.maxMembers,
      status: project.status,
      isShowcase:
        project.isShowcase,
      acceptingAssignments:
        project.acceptingAssignments,
    });
  };

  return (
    <PageShell>
      <PageHeader
        badge="Project ops"
        title="Project management"
        description="Manage public showcase entries and the internal delivery tracks that assignments eventually land in."
      />

      {error && (
        <InlineMessage tone="error">
          {error}
        </InlineMessage>
      )}

      <Card className="p-5 sm:p-6">
        <SectionHeader
          badge="Catalog controls"
          badgeTone="default"
          title="Filter the project list"
          description="Find showcase cards and delivery tracks quickly before editing structure or assignment settings."
          className="mb-5 block"
        />
        <div className="grid gap-4 lg:grid-cols-[1.3fr_0.8fr_0.8fr]">
          <label className="block">
            <FieldLabel>
              Search projects
            </FieldLabel>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--soc-text-muted)]"
                size={18}
              />
              <Input
                type="text"
                value={searchInput}
                onChange={(event) =>
                  {
                    setSearchInput(
                      event.target.value
                    );
                    setPage(1);
                  }
                }
                placeholder="Title, description, or session"
                className="pl-11"
              />
            </div>
          </label>

          <label className="block">
            <FieldLabel>
              Project type
            </FieldLabel>
            <Select
              value={typeFilter}
              onChange={(event) =>
                {
                  setTypeFilter(
                    event.target.value
                  );
                  setPage(1);
                }
              }
            >
              <option value="all">
                All projects
              </option>
              <option value="showcase">
                Showcase only
              </option>
              <option value="delivery">
                Delivery only
              </option>
            </Select>
          </label>

          <label className="block">
            <FieldLabel>
              Status
            </FieldLabel>
            <Select
              value={statusFilter}
              onChange={(event) =>
                {
                  setStatusFilter(
                    event.target.value
                  );
                  setPage(1);
                }
              }
            >
              <option value="all">
                All statuses
              </option>
              {[
                "upcoming",
                "active",
                "completed",
                "closed",
              ].map((status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              ))}
            </Select>
          </label>
        </div>
      </Card>

      <Card
        strong
        className="p-6 sm:p-8"
      >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-[var(--soc-ink)]">
              {editingId
                ? "Edit project"
                : "Create project"}
            </h2>
            <p className="mt-2 text-sm text-[var(--soc-text-muted)]">
              Public showcases stay inspirational. Internal tracks can accept assignments and team planning.
            </p>
          </div>

          {editingId && (
            <Button
              type="button"
              variant="ghost"
              onClick={resetForm}
            >
              Cancel edit
            </Button>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <FieldLabel>
                Project title
              </FieldLabel>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="AI research lab companion"
              />
            </label>

            <label className="block">
              <FieldLabel>
                Session
              </FieldLabel>
              <Input
                type="text"
                name="session"
                value={formData.session}
                onChange={handleChange}
                placeholder="2026-27"
              />
            </label>

            <label className="block">
              <FieldLabel>
                Season
              </FieldLabel>
              <Select
                name="season"
                value={formData.season}
                onChange={handleChange}
              >
                <option value="">
                  Select season
                </option>
                <option value="Summer">
                  Summer
                </option>
                <option value="Winter">
                  Winter
                </option>
              </Select>
            </label>

            <label className="block">
              <FieldLabel>
                Domain
              </FieldLabel>
              <Select
                name="domain"
                value={formData.domain}
                onChange={handleChange}
              >
                <option value="">
                  Select domain
                </option>
                {DOMAIN_OPTIONS.map(
                  (domain) => (
                    <option
                      key={domain}
                      value={domain}
                    >
                      {domain}
                    </option>
                  )
                )}
              </Select>
            </label>

            <label className="block">
              <FieldLabel>
                Status
              </FieldLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                {[
                  "upcoming",
                  "active",
                  "completed",
                  "closed",
                ].map((status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                ))}
              </Select>
            </label>

            <label className="block">
              <FieldLabel>
                Max members
              </FieldLabel>
              <Input
                type="number"
                name="maxMembers"
                min="1"
                value={
                  formData.maxMembers
                }
                onChange={handleChange}
              />
            </label>
          </div>

          <label className="block">
            <FieldLabel>
              Description
            </FieldLabel>
            <Textarea
              name="description"
              rows="5"
              value={
                formData.description
              }
              onChange={handleChange}
              placeholder="Describe the outcome, experience, and public-facing story of the project."
            />
          </label>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <FieldLabel>
                Tech stack
              </FieldLabel>
              <Input
                type="text"
                name="techStack"
                value={
                  formData.techStack
                }
                onChange={handleChange}
                placeholder="React, Express, MongoDB"
              />
            </label>

            <label className="block">
              <FieldLabel>
                Highlights
              </FieldLabel>
              <Input
                type="text"
                name="highlights"
                value={
                  formData.highlights
                }
                onChange={handleChange}
                placeholder="Real-time sync, ML ranking, polished UX"
              />
            </label>
          </div>

          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-3 text-sm text-[var(--soc-ink)]">
              <input
                type="checkbox"
                name="isShowcase"
                checked={
                  formData.isShowcase
                }
                onChange={handleChange}
              />
              Public showcase project
            </label>

            <label className="flex items-center gap-3 text-sm text-[var(--soc-ink)]">
              <input
                type="checkbox"
                name="acceptingAssignments"
                checked={
                  formData.acceptingAssignments
                }
                onChange={handleChange}
              />
              Accept assignments
            </label>
          </div>

          <Button
            type="submit"
            loading={saving}
          >
            <Plus size={18} />
            {saving
              ? "Saving..."
              : editingId
                ? "Update project"
                : "Create project"}
          </Button>
        </form>
      </Card>

      {!loading &&
        pagination.totalItems >
          0 && (
          <PaginationBar
            page={pagination.page}
            totalPages={
              pagination.totalPages
            }
            totalItems={
              pagination.totalItems
            }
            itemLabel="project"
            onPageChange={setPage}
          />
        )}

      {loading ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {Array.from({
            length: 4,
          }).map((_, index) => (
            <Card
              key={index}
              className="soc-skeleton h-72"
            />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <EmptyState
          title="No projects yet"
          description="Create the first showcase or delivery project to start building the program catalog."
        />
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <Card
              key={project._id}
              className="flex h-full flex-col p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2.5">
                    {project.domain && (
                      <Badge tone="info">
                        {project.domain}
                      </Badge>
                    )}
                    <Badge tone="accent">
                      {project.session}
                    </Badge>
                    <Badge
                      tone={
                        project.isShowcase
                          ? "warning"
                          : "success"
                      }
                    >
                      {project.isShowcase
                        ? "Showcase"
                        : "Delivery"}
                    </Badge>
                  </div>

                  <h2 className="mt-4 text-2xl font-semibold text-[var(--soc-ink)]">
                    {project.title}
                  </h2>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() =>
                      startEdit(project)
                    }
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="danger"
                    onClick={() =>
                      setConfirmDeleteId(
                        project._id
                      )
                    }
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-[var(--soc-text-muted)]">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <Badge tone="default">
                  Capacity{" "}
                  {project.activeMembers}/
                  {project.maxMembers}
                </Badge>
                <Badge tone="default">
                  {project.acceptingAssignments
                    ? "Assignments open"
                    : "Assignments closed"}
                </Badge>
                <Badge tone="default">
                  {project.status}
                </Badge>
              </div>

              {project.techStack?.length >
                0 && (
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {project.techStack.map(
                    (tech) => (
                      <Badge
                        key={tech}
                        tone="default"
                      >
                        {tech}
                      </Badge>
                    )
                  )}
                </div>
              )}

              <div className="mt-auto pt-6">
                <Link
                  to={`/admin/projects/${project._id}`}
                >
                  <Button
                    type="button"
                    variant="secondary"
                    block
                  >
                    Manage project
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}

      {!loading &&
        pagination.totalItems >
          0 && (
          <PaginationBar
            page={pagination.page}
            totalPages={
              pagination.totalPages
            }
            totalItems={
              pagination.totalItems
            }
            itemLabel="project"
            onPageChange={setPage}
          />
        )}

      <Modal
        open={Boolean(confirmDeleteId)}
        title="Delete project?"
        description="Deletion is blocked automatically if the project still has active members, teams, tasks, or submissions."
        confirmLabel="Delete project"
        tone="danger"
        confirming={
          deletingId ===
          confirmDeleteId
        }
        onCancel={() =>
          setConfirmDeleteId("")
        }
        onConfirm={handleDelete}
      />
    </PageShell>
  );
};

export default AdminProjects;
