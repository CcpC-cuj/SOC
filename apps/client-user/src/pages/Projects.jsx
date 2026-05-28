import {
  useEffect,
  useState,
} from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Filter,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import EmptyState from "../components/ui/EmptyState";
import {
  InlineMessage,
  Select,
} from "../components/ui/Field";
import {
  PageHeader,
  PageShell,
  SectionHeader,
} from "../components/ui/PageChrome";
import { DOMAIN_OPTIONS } from "../constants/registration";
import API from "../services/api";

const domainToneMap = {
  Frontend: "info",
  Backend: "accent",
  "AI/ML": "warning",
  "UI/UX": "success",
  "App Development": "info",
  "Cyber Security": "danger",
};

const Projects = () => {
  const navigate = useNavigate();

  const [projects, setProjects] =
    useState([]);
  const [selectedDomain, setSelectedDomain] =
    useState("All");
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState("");

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        setError("");
        const response =
          await API.get(
            "/projects/public"
          );
        setProjects(response.data);
      } catch (fetchError) {
        setError(
          fetchError.response?.data
            ?.message ||
            "We could not load showcase projects right now."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const filteredProjects =
    selectedDomain === "All"
      ? projects
      : projects.filter(
          (project) =>
            project.domain ===
            selectedDomain
        );

  return (
    <PageShell className="space-y-10">
      <PageHeader
        badge="Showcase gallery"
        badgeTone="warning"
        title="Explore the kind of work participants can grow into."
        description="These public entries are showcase references, not self-join listings. Use them to understand the program direction, then register with your real skills and interests."
        aside={
          <Card className="p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <Sparkles
                className="text-[var(--soc-teal)]"
                size={18}
              />
              <h2 className="text-xl font-semibold tracking-[-0.03em] text-[var(--soc-ink)]">
                How showcase works
              </h2>
            </div>
            <div className="mt-5 space-y-3 text-sm leading-7 text-[var(--soc-text-muted)]">
              <p>
                Use the cards to understand the flavor, quality bar, and
                direction of the program.
              </p>
              <p>
                Final team formation and assignment happen later through the
                organizer review process.
              </p>
              <p>
                If a track fits you, reflect that honestly in your application.
              </p>
            </div>
          </Card>
        }
      />

      <Card className="p-5 sm:p-6">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Badge tone="warning">
              <Filter size={14} />
              Domain filter
            </Badge>
            <p className="text-sm text-[var(--soc-text-muted)]">
              Narrow the showcase to the area you want to explore first.
            </p>
          </div>

          <div className="hidden flex-wrap gap-3 sm:flex">
            {["All", ...DOMAIN_OPTIONS].map(
              (domain) => {
                const selected =
                  selectedDomain === domain;

                return (
                  <button
                    key={domain}
                    type="button"
                    onClick={() =>
                      setSelectedDomain(
                        domain
                      )
                    }
                    className={
                      selected
                        ? "rounded-full border border-[rgba(31,79,107,0.2)] bg-[var(--soc-surface-cool)] px-4 py-2 text-sm font-semibold text-[var(--soc-ink)] shadow-[var(--soc-shadow-soft)]"
                        : "rounded-full border border-[var(--soc-border-soft)] bg-white px-4 py-2 text-sm font-medium text-[var(--soc-text-muted)] transition hover:border-[rgba(22,35,52,0.18)] hover:bg-[var(--soc-surface-cool)] hover:text-[var(--soc-ink)]"
                    }
                  >
                    {domain}
                  </button>
                );
              }
            )}
          </div>

          <div className="w-full max-w-sm sm:hidden">
            <Select
              value={selectedDomain}
              onChange={(event) =>
                setSelectedDomain(
                  event.target.value
                )
              }
            >
              <option value="All">
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
          </div>
        </div>
      </Card>

      {error ? (
        <InlineMessage tone="error">
          {error}
        </InlineMessage>
      ) : null}

      <SectionHeader
        badge="Showcase cards"
        badgeTone="warning"
        title="Public examples"
        description="Browse a few polished directions, then open the cards that feel closest to your strengths and curiosity."
      />

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({
            length: 6,
          }).map((_, index) => (
            <Card
              key={index}
              className="soc-skeleton h-[22rem] p-7"
            />
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <EmptyState
          title="No showcase projects match this filter"
          description="Try another domain or come back after the organizers publish more public previews."
          action={
            selectedDomain !== "All"
              ? {
                  label:
                    "Show all domains",
                  onClick: () =>
                    setSelectedDomain(
                      "All"
                    ),
                }
              : undefined
          }
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map(
            (project, index) => (
              <motion.div
                key={project._id}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.04,
                }}
              >
                <Card
                  strong
                  className="flex h-full flex-col p-6 sm:p-7"
                >
                  <div className="flex flex-wrap gap-2.5">
                    {project.domain ? (
                      <Badge
                        tone={
                          domainToneMap[
                            project.domain
                          ] || "info"
                        }
                      >
                        {project.domain}
                      </Badge>
                    ) : null}
                    {project.session ? (
                      <Badge tone="accent">
                        {project.session}
                      </Badge>
                    ) : null}
                    <Badge tone="warning">
                      Showcase
                    </Badge>
                  </div>

                  <h2 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-[var(--soc-ink)] sm:text-[1.9rem]">
                    {project.title}
                  </h2>

                  <p className="mt-4 line-clamp-5 text-sm leading-7 text-[var(--soc-text-muted)]">
                    {project.description}
                  </p>

                  {project.highlights?.length >
                  0 ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.highlights
                        .slice(0, 3)
                        .map((item) => (
                          <Badge
                            key={item}
                            tone="default"
                          >
                            {item}
                          </Badge>
                        ))}
                    </div>
                  ) : null}

                  <div className="mt-6 flex flex-wrap gap-2.5">
                    {project.techStack
                      ?.slice(0, 5)
                      .map((tech) => (
                        <Badge
                          key={tech}
                          tone="default"
                        >
                          {tech}
                        </Badge>
                      ))}
                  </div>

                  <div className="mt-auto pt-7">
                    <Button
                      type="button"
                      block
                      onClick={() =>
                        navigate(
                          `/projects/${project._id}`
                        )
                      }
                    >
                      View details
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )
          )}
        </div>
      )}
    </PageShell>
  );
};

export default Projects;
