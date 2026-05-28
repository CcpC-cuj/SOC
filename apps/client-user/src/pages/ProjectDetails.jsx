import {
  useEffect,
  useEffectEvent,
  useState,
} from "react";
import {
  ArrowRight,
  CalendarDays,
  Layers3,
  Sparkles,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import Badge from "../components/ui/Badge";
import { buttonStyles } from "../components/ui/buttonStyles";
import {
  Card,
  CardSection,
} from "../components/ui/Card";
import EmptyState from "../components/ui/EmptyState";
import { InlineMessage } from "../components/ui/Field";
import {
  PageHeader,
  PageShell,
  SectionHeader,
} from "../components/ui/PageChrome";
import { getApiErrorMessage } from "../services/apiError";
import API from "../services/api";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] =
    useState(null);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState("");

  const fetchProjectData = async () => {
    try {
      setLoading(true);
      setError("");
      const response =
        await API.get(
          `/projects/public/${id}`
        );
      setProject(response.data);
    } catch (fetchError) {
      setProject(null);
      setError(
        getApiErrorMessage(
          fetchError,
          "We could not load this showcase project."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const loadProjectDetails =
    useEffectEvent(() => {
      fetchProjectData();
    });

  useEffect(() => {
    const timer =
      window.setTimeout(() => {
        loadProjectDetails();
      }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [id]);

  if (loading) {
    return (
      <PageShell>
        <Card
          strong
          className="soc-skeleton h-72"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {Array.from({
            length: 3,
          }).map((_, index) => (
            <Card
              key={index}
              className="soc-skeleton h-40"
            />
          ))}
        </div>
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell className="max-w-3xl">
        <InlineMessage tone="error">
          {error}
        </InlineMessage>
        <EmptyState
          title="Showcase project unavailable"
          description="This public project may have been removed or is no longer visible."
          action={{
            label: "Try again",
            onClick:
              fetchProjectData,
          }}
        />
      </PageShell>
    );
  }

  if (!project) {
    return (
      <PageShell className="max-w-3xl">
        <EmptyState
          title="Project not found"
          description="There is no public showcase entry for this project right now."
          action={{
            label:
              "Reload project",
            onClick:
              fetchProjectData,
            variant:
              "secondary",
          }}
        />
      </PageShell>
    );
  }

  return (
    <PageShell className="space-y-10">
      <PageHeader
        badge="Showcase track"
        badgeTone="warning"
        title={project.title}
        description={project.description}
        meta={[
          project.domain ? (
            <Badge
              key="domain"
              tone="info"
            >
              {project.domain}
            </Badge>
          ) : null,
          project.session ? (
            <Badge
              key="session"
              tone="accent"
            >
              {project.session}
            </Badge>
          ) : null,
        ].filter(Boolean)}
        aside={
          <Card className="p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <Sparkles
                className="text-[var(--soc-teal)]"
                size={18}
              />
              <h2 className="text-xl font-semibold tracking-[-0.03em] text-[var(--soc-ink)]">
                Selection flow
              </h2>
            </div>
            <div className="mt-5 space-y-3 text-sm leading-7 text-[var(--soc-text-muted)]">
              <p>
                Participants do not self-join into showcase tracks directly.
              </p>
              <p>
                Organizers review profiles, balance teams, and make the final
                assignment later.
              </p>
              <p>
                Treat this page as a reference for direction, quality, and fit.
              </p>
            </div>
          </Card>
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            icon: Layers3,
            label:
              "Public preview",
            value:
              "Showcase only",
            text:
              "This page is meant to help you understand the project direction and quality bar of the program.",
          },
          {
            icon: Sparkles,
            label:
              "Assignment model",
            value:
              "Register first",
            text:
              "Organizers review profiles and place participants later based on fit and team balance.",
          },
          {
            icon: CalendarDays,
            label: "Season",
            value:
              project.season ||
              "To be announced",
            text:
              "Use this as program context rather than a direct sign-up commitment.",
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.label}
              className="p-6"
            >
              <Icon
                className="text-[var(--soc-teal)]"
                size={20}
              />
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--soc-ink)]/48">
                {item.label}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[var(--soc-ink)]">
                {item.value}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--soc-text-muted)]">
                {item.text}
              </p>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
        <Card
          strong
          className="p-6 sm:p-8"
        >
          <SectionHeader
            title="Tools, technologies, and signals"
            description="A quick view of the stack and the qualities that make this showcase direction stand out."
          />

          {project.techStack?.length >
          0 ? (
            <div className="mt-6 flex flex-wrap gap-2.5">
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
          ) : (
            <p className="mt-6 text-sm leading-7 text-[var(--soc-text-muted)]">
              The organizers have not attached a tech stack to this public
              preview yet.
            </p>
          )}

          {project.highlights?.length >
          0 ? (
            <>
              <div className="mt-8 border-t border-[var(--soc-border-soft)] pt-8">
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-[var(--soc-ink)]">
                  Why this direction stands out
                </h3>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {project.highlights.map(
                    (highlight) => (
                      <CardSection
                        key={highlight}
                        className="p-4"
                      >
                        <p className="text-sm leading-7 text-[var(--soc-text-muted)]">
                          {highlight}
                        </p>
                      </CardSection>
                    )
                  )}
                </div>
              </div>
            </>
          ) : null}
        </Card>

        <div className="space-y-6">
          <Card className="p-6 sm:p-7">
            <h2 className="text-xl font-semibold tracking-[-0.03em] text-[var(--soc-ink)]">
              How selection works
            </h2>
            <div className="mt-5 space-y-3 text-sm leading-7 text-[var(--soc-text-muted)]">
              <p>
                1. Register once with honest skills, interests, and
                availability.
              </p>
              <p>
                2. The organizing team reviews profiles and balances squads
                thoughtfully.
              </p>
              <p>
                3. Your final assignment appears later in the dashboard and
                workspace.
              </p>
            </div>
          </Card>

          <Card strong className="p-6 sm:p-7">
            <h2 className="text-xl font-semibold tracking-[-0.03em] text-[var(--soc-ink)]">
              Interested in work like this?
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--soc-text-muted)]">
              Register with the skills and preferences that genuinely match you.
              That gives organizers the best information for assignment later.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/register"
                className={buttonStyles()}
              >
                Register now
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/projects"
                className={buttonStyles({
                  variant: "secondary",
                })}
              >
                Back to showcase
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </PageShell>
  );
};

export default ProjectDetails;
