import {
  useEffect,
  useEffectEvent,
  useState,
} from "react";
import {
  Download,
  Mail,
  Search,
  ShieldCheck,
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
import {
  DOMAIN_OPTIONS,
  REGISTRATION_STATUS_OPTIONS,
  ROLE_OPTIONS,
  registrationStatusLabels,
} from "../../constants/registration";
import { getApiErrorMessage } from "../../services/apiError";
import AdminAPI from "../../services/adminApi";

const PAGE_SIZE = 10;

const statusTone = {
  pending_review: "warning",
  shortlisted: "info",
  waitlisted: "accent",
  assigned: "success",
  rejected: "danger",
};

const changeRequestFieldLabels = {
  name: "Name",
  bio: "Bio",
  department: "Department",
  roll: "Roll number",
  program: "Program",
  phone: "Phone",
  github: "GitHub",
  linkedin: "LinkedIn",
  portfolio: "Portfolio",
  experienceLevel:
    "Experience level",
  skills: "Skills",
  preferredDomains:
    "Preferred domains",
  preferredRoles:
    "Preferred roles",
  availability:
    "Availability",
  priorExperience:
    "Prior experience",
  whyJoin: "Why join",
};

const initialPagination = {
  page: 1,
  limit: PAGE_SIZE,
  totalItems: 0,
  totalPages: 1,
  hasNextPage: false,
  hasPreviousPage: false,
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

const initialAssignment = {
  projectId: "",
  teamId: "",
  roles: [],
  isLeader: false,
  registrationStatus:
    "pending_review",
  adminNotes: "",
};

const initialAnnouncement = {
  subject: "",
  message: "",
};

const Users = () => {
  const showToast = useToast();

  const [users, setUsers] =
    useState([]);
  const [projects, setProjects] =
    useState([]);
  const [teams, setTeams] =
    useState([]);
  const [searchInput, setSearchInput] =
    useState("");
  const [debouncedSearch, setDebouncedSearch] =
    useState("");
  const [statusFilter, setStatusFilter] =
    useState("all");
  const [domainFilter, setDomainFilter] =
    useState("all");
  const [page, setPage] =
    useState(1);
  const [pagination, setPagination] =
    useState(initialPagination);
  const [
    selectedUserSummary,
    setSelectedUserSummary,
  ] = useState(null);
  const [selectedUser, setSelectedUser] =
    useState(null);
  const [
    loadingSelectedUser,
    setLoadingSelectedUser,
  ] = useState(false);
  const [
    selectedUserError,
    setSelectedUserError,
  ] = useState("");
  const [assignment, setAssignment] =
    useState(initialAssignment);
  const [announcement, setAnnouncement] =
    useState(initialAnnouncement);
  const [
    announcementMessage,
    setAnnouncementMessage,
  ] = useState("");
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState("");
  const [sendingAnnouncement, setSendingAnnouncement] =
    useState(false);
  const [savingReview, setSavingReview] =
    useState(false);
  const [assigning, setAssigning] =
    useState(false);
  const [downloading, setDownloading] =
    useState(false);

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

  const fetchProjects = async () => {
    try {
      const response =
        await AdminAPI.get(
          "/projects",
          {
            params: {
              paginated: true,
              type: "delivery",
              limit: 100,
            },
          }
        );

      setProjects(
        response.data.items || []
      );
      setError("");
    } catch (fetchError) {
      setError(
        getApiErrorMessage(
          fetchError,
          "Unable to load project options."
        )
      );
    }
  };

  const fetchUsers = async ({
    silent = false,
    pageOverride = page,
  } = {}) => {
    try {
      if (!silent) {
        setLoading(true);
      }

      const response =
        await AdminAPI.get("/users", {
          params: {
            q:
              debouncedSearch ||
              undefined,
            status:
              statusFilter === "all"
                ? undefined
                : statusFilter,
            domain:
              domainFilter === "all"
                ? undefined
                : domainFilter,
            page: pageOverride,
            limit: PAGE_SIZE,
          },
        });

      setUsers(
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
      setUsers([]);
      setPagination(initialPagination);
      setError(
        getApiErrorMessage(
          fetchError,
          "Unable to load participants right now."
        )
      );
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  };

  const fetchUserDetail = async (
    userSummary
  ) => {
    try {
      setLoadingSelectedUser(true);
      setSelectedUserError("");

      const response =
        await AdminAPI.get(
          `/users/${userSummary._id}`
        );
      const detail =
        response.data;
      const currentMembership =
        detail.memberships?.[0];

      setSelectedUser(detail);
      setAssignment({
        projectId:
          currentMembership?.project?._id ||
          "",
        teamId:
          currentMembership?.team?._id ||
          "",
        roles:
          currentMembership?.roles ||
          [],
        isLeader:
          Boolean(
            currentMembership?.isLeader
          ),
        registrationStatus:
          detail.registrationStatus ||
          "pending_review",
        adminNotes:
          detail.adminNotes || "",
      });
    } catch (fetchError) {
      setSelectedUser(null);
      setSelectedUserError(
        getApiErrorMessage(
          fetchError,
          "Unable to load this participant record."
        )
      );
    } finally {
      setLoadingSelectedUser(false);
    }
  };

  const loadFilteredUsers =
    useEffectEvent(() => {
      fetchUsers();
    });

  useEffect(() => {
    let ignore = false;

    async function fetchInitialProjects() {
      if (ignore) {
        return;
      }

      await fetchProjects();
    }

    fetchInitialProjects();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    const timer =
      window.setTimeout(() => {
        loadFilteredUsers();
      }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    page,
    debouncedSearch,
    statusFilter,
    domainFilter,
  ]);

  useEffect(() => {
    async function fetchTeams() {
      if (!assignment.projectId) {
        setTeams([]);
        return;
      }

      try {
        const response =
          await AdminAPI.get(
            `/teams/project/${assignment.projectId}`
          );
        setTeams(response.data);
      } catch (fetchError) {
        setTeams([]);
        const message =
          getApiErrorMessage(
            fetchError,
            "Unable to load team options."
          );
        showToast({
          tone: "error",
          title:
            "Team load failed",
          description: message,
        });
      }
    }

    fetchTeams();
  }, [assignment.projectId, showToast]);

  const downloadCsv = async () => {
    try {
      setDownloading(true);
      const response =
        await AdminAPI.get(
          "/users/export/csv",
          {
            responseType: "blob",
          }
        );

      const url =
        window.URL.createObjectURL(
          new Blob([response.data])
        );
      const link =
        document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        "soc-users.csv"
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      showToast({
        tone: "success",
        title: "Export ready",
        description:
          "The participant CSV download has started.",
      });
    } catch (downloadError) {
      const message =
        downloadError.response?.data
          ?.message ||
        "Unable to export the CSV right now.";
      showToast({
        tone: "error",
        title:
          "Export failed",
        description: message,
      });
    } finally {
      setDownloading(false);
    }
  };

  const openUser = (user) => {
    setSelectedUserSummary(user);
    setSelectedUser(null);
    setSelectedUserError("");
    setAssignment(initialAssignment);
    setTeams([]);
    fetchUserDetail(user);
  };

  const closeUser = () => {
    setSelectedUserSummary(null);
    setSelectedUser(null);
    setSelectedUserError("");
    setLoadingSelectedUser(false);
    setAssignment(initialAssignment);
    setTeams([]);
  };

  const toggleRole = (role) => {
    setAssignment((current) => ({
      ...current,
      roles: current.roles.includes(
        role
      )
        ? current.roles.filter(
            (item) =>
              item !== role
          )
        : [...current.roles, role],
    }));
  };

  const handleReviewSave = async () => {
    if (!selectedUserSummary) {
      return;
    }

    try {
      setSavingReview(true);
      await AdminAPI.put(
        `/users/${selectedUserSummary._id}/review`,
        {
          registrationStatus:
            assignment.registrationStatus,
          adminNotes:
            assignment.adminNotes,
        }
      );

      await Promise.all([
        fetchUsers({
          silent: true,
        }),
        fetchUserDetail(
          selectedUserSummary
        ),
      ]);
      showToast({
        tone: "success",
        title:
          "Review updated",
        description:
          "The participant status and notes are saved.",
      });
    } catch (saveError) {
      const message =
        saveError.response?.data
          ?.message ||
        "Unable to save this review.";
      showToast({
        tone: "error",
        title:
          "Review save failed",
        description: message,
      });
    } finally {
      setSavingReview(false);
    }
  };

  const handleAssign = async () => {
    if (!selectedUserSummary) {
      return;
    }

    try {
      setAssigning(true);
      await AdminAPI.post(
        "/project-members/assign",
        {
          userId:
            selectedUserSummary._id,
          projectId:
            assignment.projectId,
          teamId:
            assignment.teamId ||
            undefined,
          roles: assignment.roles,
          isLeader:
            assignment.isLeader,
          adminNotes:
            assignment.adminNotes,
        }
      );

      await Promise.all([
        fetchUsers({
          silent: true,
        }),
        fetchUserDetail(
          selectedUserSummary
        ),
      ]);
      showToast({
        tone: "success",
        title:
          "Participant assigned",
        description:
          "Project, team, and role details were saved.",
      });
    } catch (assignError) {
      const message =
        assignError.response?.data
          ?.message ||
        "Unable to assign this participant.";
      showToast({
        tone: "error",
        title:
          "Assignment blocked",
        description: message,
      });
    } finally {
      setAssigning(false);
    }
  };

  const sendAnnouncement = async () => {
    if (
      !announcement.subject.trim() ||
      !announcement.message.trim()
    ) {
      setAnnouncementMessage(
        "Add both a subject and a message before sending."
      );
      return;
    }

    if (
      pagination.totalItems === 0
    ) {
      setAnnouncementMessage(
        "There are no participants in the current filtered list."
      );
      return;
    }

    try {
      setSendingAnnouncement(true);
      const response =
        await AdminAPI.post(
          "/users/announce",
          {
            subject:
              announcement.subject,
            message:
              announcement.message,
            allMatching: true,
            filters: {
              q:
                debouncedSearch ||
                undefined,
              status:
                statusFilter ===
                "all"
                  ? undefined
                  : statusFilter,
              domain:
                domainFilter ===
                "all"
                  ? undefined
                  : domainFilter,
            },
          }
        );

      setAnnouncementMessage(
        `${response.data.message} Recipients: ${response.data.recipientCount}. Delivered: ${response.data.deliveredCount}.`
      );
      setAnnouncement(
        initialAnnouncement
      );
      showToast({
        tone: "success",
        title:
          "Announcement processed",
        description:
          "Bulk communication has been sent to the filtered group.",
      });
    } catch (sendError) {
      const message =
        sendError.response?.data
          ?.message ||
        "Unable to send the announcement right now.";
      setAnnouncementMessage(message);
      showToast({
        tone: "error",
        title:
          "Announcement failed",
        description: message,
      });
    } finally {
      setSendingAnnouncement(false);
    }
  };

  const retryPageData = async () => {
    setLoading(true);
    await Promise.all([
      fetchProjects(),
      fetchUsers({
        pageOverride: page,
      }),
    ]);
  };

  const modalUser =
    selectedUser ||
    selectedUserSummary;

  return (
    <PageShell>
      <PageHeader
        badge="Participant ops"
        title="Participant review"
        description="Review applications, update registration status, and assign people into the right projects and teams."
        actions={
          <Button
            type="button"
            variant="secondary"
            loading={downloading}
            onClick={downloadCsv}
          >
            <Download size={18} />
            {downloading
              ? "Preparing..."
              : "Export CSV"}
          </Button>
        }
      />

      {error && (
        <InlineMessage tone="error">
          {error}
        </InlineMessage>
      )}

      <Card className="p-5 sm:p-6">
        <SectionHeader
          badge="Search and filter"
          badgeTone="default"
          title="Find the right participants fast"
          description="Use the filters first, then open only the people you need for review, communication, or assignment."
          className="mb-5 block"
        />
        <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <label className="block">
            <FieldLabel>
              Search people
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
                placeholder="Name, email, roll, or program"
                className="pl-11"
              />
            </div>
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
              {REGISTRATION_STATUS_OPTIONS.map(
                (status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {
                      registrationStatusLabels[
                        status
                      ]
                    }
                  </option>
                )
              )}
            </Select>
          </label>

          <label className="block">
            <FieldLabel>
              Preferred domain
            </FieldLabel>
            <Select
              value={domainFilter}
              onChange={(event) =>
                {
                  setDomainFilter(
                    event.target.value
                  );
                  setPage(1);
                }
              }
            >
              <option value="all">
                All domains
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
        </div>
      </Card>

      <Card
        strong
        className="p-6 sm:p-7"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-[var(--soc-ink)]">
              Bulk announcement
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--soc-text-muted)]">
              Use the current filters first, then send one update to every participant in the matching result set.
            </p>
          </div>

          <Badge tone="accent">
            {pagination.totalItems} matching
            recipients
          </Badge>
        </div>

        <div className="mt-6 grid gap-4">
          <Input
            type="text"
            value={announcement.subject}
            onChange={(event) =>
              setAnnouncement(
                (current) => ({
                  ...current,
                  subject:
                    event.target.value,
                })
              )
            }
            placeholder="Announcement subject"
          />

          <Textarea
            rows="5"
            value={announcement.message}
            onChange={(event) =>
              setAnnouncement(
                (current) => ({
                  ...current,
                  message:
                    event.target.value,
                })
              )
            }
            placeholder="Write the update, reminder, or scheduling note you want to send."
          />
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-[var(--soc-text-muted)]">
            Filter first, then send once to the full matching list.
          </p>

          <Button
            type="button"
            loading={
              sendingAnnouncement
            }
            onClick={sendAnnouncement}
          >
            {sendingAnnouncement
              ? "Sending..."
              : "Send announcement"}
          </Button>
        </div>

        {announcementMessage && (
          <InlineMessage
            tone={
              announcementMessage.includes(
                "Unable"
              ) ||
              announcementMessage.includes(
                "Add both"
              ) ||
              announcementMessage.includes(
                "There are no participants"
              )
                ? "warning"
                : "success"
            }
            className="mt-4"
          >
            {announcementMessage}
          </InlineMessage>
        )}
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
            itemLabel="participant"
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
              className="soc-skeleton h-80"
            />
          ))}
        </div>
      ) : error && users.length === 0 ? (
        <EmptyState
          title="Participants unavailable"
          description="We could not load participant records for review right now."
          action={{
            label: "Try again",
            onClick: retryPageData,
          }}
        />
      ) : users.length === 0 ? (
        <EmptyState
          title="No participants match the current filters"
          description="Try clearing the filters or wait for more registrations to come in."
          action={{
            label: "Refresh list",
            onClick: () =>
              fetchUsers(),
            variant:
              "secondary",
          }}
        />
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {users.map((user) => (
            <Card
              key={user._id}
              className="flex h-full flex-col p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-[var(--soc-ink)]">
                    {user.name}
                  </h2>
                  <div className="mt-3 flex items-center gap-2 text-sm text-[var(--soc-text-muted)]">
                    <Mail size={16} />
                    {user.email}
                  </div>
                </div>

                <Badge
                  tone={
                    statusTone[
                      user.registrationStatus
                    ] || "default"
                  }
                >
                  {
                    registrationStatusLabels[
                      user.registrationStatus
                    ]
                  }
                </Badge>
              </div>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {user.department && (
                  <Badge tone="info">
                    {user.department}
                  </Badge>
                )}
                {user.program && (
                  <Badge tone="accent">
                    {user.program}
                  </Badge>
                )}
                {user.roll && (
                  <Badge tone="default">
                    Roll {user.roll}
                  </Badge>
                )}
              </div>

              <div className="mt-5 space-y-2 text-sm leading-7 text-[var(--soc-text-muted)]">
                <p>
                  <span className="font-semibold text-[var(--soc-ink)]">
                    Experience:
                  </span>{" "}
                  {user.experienceLevel}
                </p>
                <p>
                  <span className="font-semibold text-[var(--soc-ink)]">
                    Preferred domains:
                  </span>{" "}
                  {user.preferredDomains
                    ?.join(", ") ||
                    "Not provided"}
                </p>
                <p>
                  <span className="font-semibold text-[var(--soc-ink)]">
                    Preferred roles:
                  </span>{" "}
                  {user.preferredRoles
                    ?.join(", ") ||
                    "Not provided"}
                </p>
                <p>
                  <span className="font-semibold text-[var(--soc-ink)]">
                    Current assignment:
                  </span>{" "}
                  {user.memberships?.[0]
                    ?.project?.title ||
                    "Not assigned"}
                </p>
                {user
                  .pendingProfileChangeRequest
                  ?.requestedAt && (
                  <p>
                    <span className="font-semibold text-[var(--soc-ink)]">
                      Change request:
                    </span>{" "}
                    Pending organizer review
                  </p>
                )}
              </div>

              {user.skills?.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {user.skills.map((skill) => (
                    <Badge
                      key={skill}
                      tone="default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}

              <Card className="mt-5 p-4">
                <p className="text-sm font-semibold text-[var(--soc-ink)]">
                  Why join
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--soc-text-muted)]">
                  {user.whyJoin ||
                    "No motivation note yet."}
                </p>
              </Card>

              <div className="mt-auto pt-6">
                <Button
                  type="button"
                  block
                  onClick={() =>
                    openUser(user)
                  }
                >
                  Review / Assign
                </Button>
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
            itemLabel="participant"
            onPageChange={setPage}
          />
        )}

      <Modal
        open={Boolean(
          selectedUserSummary
        )}
        title={modalUser?.name || ""}
        description={
          modalUser?.email || ""
        }
        panelClassName="!max-w-5xl"
        cancelLabel="Close"
        confirmLabel="Done"
        onCancel={closeUser}
        onConfirm={closeUser}
      >
        {loadingSelectedUser ? (
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <Card className="soc-skeleton h-80" />
            <Card className="soc-skeleton h-80" />
          </div>
        ) : selectedUserError ? (
          <InlineMessage tone="error">
            <div className="space-y-4">
              <p>{selectedUserError}</p>
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  fetchUserDetail(
                    selectedUserSummary
                  )
                }
              >
                Retry loading participant
              </Button>
            </div>
          </InlineMessage>
        ) : selectedUser ? (
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-5">
              <Card className="p-5">
                <h3 className="text-xl font-semibold text-[var(--soc-ink)]">
                  Registration snapshot
                </h3>
                <div className="mt-4 space-y-2 text-sm leading-7 text-[var(--soc-text-muted)]">
                  <p>
                    <span className="font-semibold text-[var(--soc-ink)]">
                      Department:
                    </span>{" "}
                    {selectedUser.department}
                  </p>
                  <p>
                    <span className="font-semibold text-[var(--soc-ink)]">
                      Program:
                    </span>{" "}
                    {selectedUser.program}
                  </p>
                  <p>
                    <span className="font-semibold text-[var(--soc-ink)]">
                      Availability:
                    </span>{" "}
                    {selectedUser.availability ||
                      "Not provided"}
                  </p>
                  <p>
                    <span className="font-semibold text-[var(--soc-ink)]">
                      Prior experience:
                    </span>{" "}
                    {selectedUser.priorExperience ||
                      "Not provided"}
                  </p>
                </div>
              </Card>

              {selectedUser
                .pendingProfileChangeRequest
                ?.requestedAt && (
                <Card className="p-5">
                  <h3 className="text-xl font-semibold text-[var(--soc-ink)]">
                    Pending profile change request
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--soc-text-muted)]">
                    {selectedUser
                      .pendingProfileChangeRequest
                      .note ||
                      "The participant has requested updates to locked registration fields."}
                  </p>
                  <p className="mt-3 text-xs text-[var(--soc-text-muted)]">
                    Requested on{" "}
                    {new Date(
                      selectedUser
                        .pendingProfileChangeRequest
                        .requestedAt
                    ).toLocaleString()}
                  </p>
                  <div className="mt-4 space-y-3">
                    {selectedUser.pendingProfileChangeRequest.requestedFields?.map(
                      (field) => (
                        <Card
                          key={field}
                          className="p-4"
                        >
                          <p className="text-sm font-semibold text-[var(--soc-ink)]">
                            {changeRequestFieldLabels[
                              field
                            ] || field}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-[var(--soc-text-muted)]">
                            {renderRequestedValue(
                              selectedUser
                                .pendingProfileChangeRequest
                                .requestedValues?.[
                                field
                              ]
                            )}
                          </p>
                        </Card>
                      )
                    )}
                  </div>
                </Card>
              )}

              <Card className="p-5">
                <h3 className="text-xl font-semibold text-[var(--soc-ink)]">
                  Assignment history
                </h3>
                <div className="mt-4 space-y-3">
                  {selectedUser
                    .assignmentHistory
                    ?.length > 0 ? (
                    selectedUser.assignmentHistory
                      .slice()
                      .reverse()
                      .map(
                        (
                          entry,
                          index
                        ) => (
                          <Card
                            key={`${entry.action}-${index}`}
                            className="p-4"
                          >
                            <p className="text-sm font-semibold capitalize text-[var(--soc-ink)]">
                              {entry.action.replace(
                                "-",
                                " "
                              )}
                            </p>
                            <p className="mt-2 text-sm leading-6 text-[var(--soc-text-muted)]">
                              {entry.note}
                            </p>
                            <p className="mt-2 text-xs text-[var(--soc-text-muted)]">
                              {new Date(
                                entry.changedAt
                              ).toLocaleString()}
                            </p>
                          </Card>
                        )
                      )
                  ) : (
                    <p className="text-sm text-[var(--soc-text-muted)]">
                      No history recorded yet.
                    </p>
                  )}
                </div>
              </Card>
            </div>

            <div className="space-y-5">
              <Card className="p-5">
                <div className="flex items-center gap-3">
                  <ShieldCheck
                    className="text-[var(--soc-teal)]"
                    size={18}
                  />
                  <h3 className="text-xl font-semibold text-[var(--soc-ink)]">
                    Review status
                  </h3>
                </div>

                <div className="mt-4 space-y-4">
                  <label className="block">
                    <FieldLabel>
                      Registration status
                    </FieldLabel>
                    <Select
                      value={
                        assignment.registrationStatus
                      }
                      onChange={(
                        event
                      ) =>
                        setAssignment(
                          (
                            current
                          ) => ({
                            ...current,
                            registrationStatus:
                              event
                                .target
                                .value,
                          })
                        )
                      }
                    >
                      {REGISTRATION_STATUS_OPTIONS.map(
                        (status) => (
                          <option
                            key={status}
                            value={status}
                          >
                            {
                              registrationStatusLabels[
                                status
                              ]
                            }
                          </option>
                        )
                      )}
                    </Select>
                  </label>

                  <label className="block">
                    <FieldLabel>
                      Admin notes
                    </FieldLabel>
                    <Textarea
                      rows="4"
                      value={
                        assignment.adminNotes
                      }
                      onChange={(
                        event
                      ) =>
                        setAssignment(
                          (
                            current
                          ) => ({
                            ...current,
                            adminNotes:
                              event
                                .target
                                .value,
                          })
                        )
                      }
                      placeholder="Notes for the review or assignment decision"
                    />
                  </label>

                  <Button
                    type="button"
                    variant="secondary"
                    loading={savingReview}
                    onClick={
                      handleReviewSave
                    }
                  >
                    Save review status
                  </Button>
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="text-xl font-semibold text-[var(--soc-ink)]">
                  Assign to project and team
                </h3>

                <div className="mt-4 space-y-4">
                  <label className="block">
                    <FieldLabel>
                      Project
                    </FieldLabel>
                    <Select
                      value={
                        assignment.projectId
                      }
                      onChange={(
                        event
                      ) =>
                        setAssignment(
                          (
                            current
                          ) => ({
                            ...current,
                            projectId:
                              event
                                .target
                                .value,
                            teamId: "",
                          })
                        )
                      }
                    >
                      <option value="">
                        Select a project
                      </option>
                      {projects.map(
                        (project) => (
                          <option
                            key={project._id}
                            value={
                              project._id
                            }
                          >
                            {project.title}
                          </option>
                        )
                      )}
                    </Select>
                  </label>

                  <label className="block">
                    <FieldLabel>
                      Team
                    </FieldLabel>
                    <Select
                      value={
                        assignment.teamId
                      }
                      onChange={(
                        event
                      ) =>
                        setAssignment(
                          (
                            current
                          ) => ({
                            ...current,
                            teamId:
                              event
                                .target
                                .value,
                          })
                        )
                      }
                    >
                      <option value="">
                        Optional team
                      </option>
                      {teams.map((team) => (
                        <option
                          key={team._id}
                          value={team._id}
                        >
                          {team.name} (
                          {
                            team.members
                              ?.length
                          }
                          /
                          {
                            team.capacity
                          }
                          )
                        </option>
                      ))}
                    </Select>
                  </label>

                  <div>
                    <FieldLabel>
                      Roles
                    </FieldLabel>
                    <div className="flex flex-wrap gap-2.5">
                      {ROLE_OPTIONS.map(
                        (role) => (
                          <button
                            key={role}
                            type="button"
                            onClick={() =>
                              toggleRole(
                                role
                              )
                            }
                            className={`rounded-full border px-4 py-2 text-sm transition ${
                              assignment.roles.includes(
                                role
                              )
                                ? "border-sky-300/28 bg-sky-400/14 text-[var(--soc-teal)]"
                                : "border-[var(--soc-border-soft)] bg-[var(--soc-surface-cool)] text-[var(--soc-text-muted)] hover:bg-white"
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

                  <label className="flex items-center gap-3 text-sm text-[var(--soc-ink)]">
                    <input
                      type="checkbox"
                      checked={
                        assignment.isLeader
                      }
                      onChange={(
                        event
                      ) =>
                        setAssignment(
                          (
                            current
                          ) => ({
                            ...current,
                            isLeader:
                              event
                                .target
                                .checked,
                          })
                        )
                      }
                    />
                    Mark as team leader
                  </label>

                  <Button
                    type="button"
                    loading={assigning}
                    onClick={handleAssign}
                  >
                    {assigning
                      ? "Assigning..."
                      : "Assign participant"}
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        ) : null}
      </Modal>
    </PageShell>
  );
};

export default Users;
