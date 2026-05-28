import { Link } from "react-router-dom";
import {
  BellRing,
  Cloud,
  LayoutTemplate,
  Sparkles,
} from "lucide-react";

import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import {
  Card,
  CardSection,
} from "../components/ui/Card";
import EmptyState from "../components/ui/EmptyState";
import {
  FieldLabel,
  InlineMessage,
  Input,
  Select,
} from "../components/ui/Field";
import {
  PageHeader,
  PageShell,
  SectionHeader,
} from "../components/ui/PageChrome";

const chipStyles = [
  {
    label: "AI/ML",
    className: "bg-[var(--soc-sky)] text-[var(--soc-ink)]",
  },
  {
    label: "Product Engineering",
    className: "bg-[var(--soc-sunflower)] text-[var(--soc-ink)]",
  },
  {
    label: "Security",
    className: "bg-[var(--soc-coral)] text-white",
  },
  {
    label: "Research",
    className: "bg-[var(--soc-teal)] text-white",
  },
];

const ThemeStyleTile = () => (
  <PageShell className="pb-20">
    <PageHeader
      badge="Phase 4 • Style Tile"
      badgeTone="accent"
      title="SOC Style Tile And Mood Board"
      description="This screen is the visual truth source for the redesign. It now demonstrates a premium, calm, credible student-tech direction with restrained warmth instead of poster-like playfulness."
      actions={
        <>
          <Link to="/theme-typography">
            <Button
              variant="secondary"
              size="lg"
            >
              Back To Typography
            </Button>
          </Link>
          <Link to="/theme-layout-rules">
            <Button
              variant="secondary"
              size="lg"
            >
              Open Layout Rules
            </Button>
          </Link>
          <Link to="/">
            <Button size="lg">
              Return To App
            </Button>
          </Link>
        </>
      }
      meta={
        <>
          <Badge tone="success">
            Visual truth source
          </Badge>
          <Badge tone="info">
            Public-first styling
          </Badge>
          <Badge tone="warning">
            Ready for approval
          </Badge>
        </>
      }
      aside={
        <CardSection className="space-y-4 rounded-[1.75rem] p-5 text-sm text-slate-200">
          <div className="flex items-center gap-2 text-white">
            <LayoutTemplate
              size={18}
              className="text-cyan-200"
            />
            <span className="font-semibold">
              Review intent
            </span>
          </div>
          <p className="leading-7 text-slate-200">
            Approve this screen before
            redesigning the landing page and
            other public flows. It should
            lock in the color mood, control
            style, surface tone, and the
            overall premium direction.
          </p>
        </CardSection>
      }
    />

    <section className="space-y-5">
      <SectionHeader
        badge="Hero sample"
        badgeTone="info"
        title="Hero Background, Headings, And Premium Atmosphere"
        description="The top sample demonstrates how the public-facing visual language can feel distinctive and warm without becoming playful or novelty-driven."
      />

      <Card className="overflow-hidden p-0">
        <div className="soc-poster-sky relative isolate overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
          <div className="soc-poster-cloud left-8 top-10 h-7 w-12 opacity-80" />
          <div className="soc-poster-cloud right-28 top-[4.5rem] h-6 w-10 opacity-65" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
            <div className="space-y-6">
              <Badge
                tone="warning"
                className="border-[var(--soc-border-strong)] bg-white/70 text-[var(--soc-ink)]"
              >
                Season of Code 2026
              </Badge>

              <div className="space-y-4">
                <h1 className="type-hero measure-hero text-[var(--soc-ink)]">
                  Clear, credible, and built for ambitious student teams.
                </h1>
                <p className="type-body max-w-[54ch] text-[var(--soc-ink)]/80">
                  Premium typography, calm
                  surfaces, and controlled
                  warmth give the brand
                  distinctiveness without
                  making the product feel
                  childish or theme-heavy.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="border border-white/60 bg-[var(--soc-ink)] text-white shadow-[var(--soc-shadow-soft)] hover:bg-[#22364d]"
                >
                  Apply now
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="border-[var(--soc-border-strong)] bg-white/72 text-[var(--soc-ink)] hover:bg-white/84"
                >
                  Explore projects
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <CardSection className="rounded-[1.8rem] border-[var(--soc-border-soft)] bg-white/72 p-5 backdrop-blur-md">
                <p className="type-eyebrow text-[var(--soc-coral)]">
                  Domain chips
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {chipStyles.map((chip) => (
                    <span
                      key={chip.label}
                      className={`rounded-full px-3 py-1.5 text-sm font-bold shadow-sm ${chip.className}`}
                    >
                      {chip.label}
                    </span>
                  ))}
                </div>
              </CardSection>

              <CardSection className="rounded-[1.8rem] border-[var(--soc-border-soft)] bg-white/72 p-5 backdrop-blur-md">
                <p className="type-eyebrow text-[var(--soc-teal)]">
                  Atmosphere
                </p>
                <div className="mt-4 flex items-center gap-3 text-[var(--soc-ink)]">
                  <Cloud size={22} />
                  <Sparkles size={20} />
                  <BellRing size={20} />
                </div>
                <p className="mt-4 type-helper text-[var(--soc-ink)]/75">
                  Use subtle ambient shaping,
                  not stickers, mascots, or
                  pixel collectibles.
                </p>
              </CardSection>
            </div>
          </div>
        </div>
      </Card>
    </section>

    <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <Card className="p-7">
        <SectionHeader
          badge="Controls"
          badgeTone="success"
          title="Buttons, Badges, Chips, Inputs, And Selects"
          description="These components should feel premium and product-grade first, with brand warmth appearing only as a controlled layer."
        />

        <div className="mt-6 space-y-6">
          <div className="flex flex-wrap gap-3">
            <Button size="lg">
              Primary action
            </Button>
            <Button
              variant="secondary"
              size="lg"
            >
              Secondary
            </Button>
            <Button
              variant="ghost"
              size="lg"
            >
              Ghost
            </Button>
            <Button
              variant="danger"
              size="lg"
            >
              Warning
            </Button>
          </div>

          <div className="flex flex-wrap gap-3">
            <Badge tone="accent">
              Premium badge
            </Badge>
            <Badge tone="info">
              Calm chip
            </Badge>
            <Badge tone="warning">
              Highlight tag
            </Badge>
            <Badge tone="success">
              Approved style
            </Badge>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <FieldLabel>
                Project title
              </FieldLabel>
              <Input placeholder="Write a short title" />
            </label>

            <label className="block">
              <FieldLabel>
                Domain
              </FieldLabel>
              <Select defaultValue="">
                <option value="" disabled>
                  Pick a domain
                </option>
                <option>AI/ML</option>
                <option>App Development</option>
                <option>Cyber Security</option>
              </Select>
            </label>
          </div>
        </div>
      </Card>

      <Card className="p-7">
        <SectionHeader
          badge="Messaging"
          badgeTone="warning"
          title="Alerts And Feedback"
          description="State surfaces should remain easy to understand first, decorative second."
        />

        <div className="mt-6 space-y-4">
          <InlineMessage tone="success">
            Theme tokens are consistent
            and ready for page rollout.
          </InlineMessage>
          <InlineMessage tone="info">
            Public pages can keep the
            richer gradients and scenic
            artwork.
          </InlineMessage>
          <InlineMessage tone="warning">
            Reduce decorative density
            around forms and long text.
          </InlineMessage>
          <InlineMessage tone="error">
            Avoid large novelty motion in
            admin tables and workflow-heavy
            screens.
          </InlineMessage>
        </div>
      </Card>
    </section>

    <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <EmptyState
        title="No showcase projects yet"
        description="Empty states should still feel branded and inviting, but they should not compete with the actual content when data appears."
        action={{
          label: "Create a sample state",
          onClick: () => {},
          variant: "secondary",
        }}
      />

      <Card className="p-7">
        <SectionHeader
          badge="Surface language"
          badgeTone="accent"
          title="Cards And Premium Panels"
          description="Use calm, lightly elevated surfaces with enough contrast to sit above warm backgrounds without feeling poster-like."
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <CardSection className="rounded-[1.8rem] border-white/14 bg-white/[0.07] p-5">
            <p className="type-eyebrow text-cyan-200">
              Primary feature card
            </p>
            <h3 className="mt-3 text-xl font-semibold text-white">
              Premium but approachable
            </h3>
            <p className="mt-3 type-helper text-slate-300">
              Good for landing-page
              highlights, public
              information blocks, and
              structured storytelling.
            </p>
          </CardSection>

          <CardSection className="rounded-[1.8rem] border-white/10 bg-white/[0.04] p-5">
            <p className="type-eyebrow text-amber-200">
              Calm support card
            </p>
            <h3 className="mt-3 text-xl font-semibold text-white">
              Better for operational UI
            </h3>
            <p className="mt-3 type-helper text-slate-300">
              Good for inner pages,
              secondary support zones,
              dashboards, and denser
              workflows.
            </p>
          </CardSection>
        </div>
      </Card>
    </section>

    <section className="space-y-5">
      <SectionHeader
        badge="Footer scene"
        badgeTone="success"
        title="Sample Footer World Strip"
        description="The footer should feel like a contained scenic ending to the page rather than a full-screen illustration layer."
      />

      <Card className="overflow-hidden p-0">
        <div className="soc-footer-strip relative min-h-[16rem] px-6 py-8 sm:px-8">
          <div className="relative z-10 max-w-2xl">
            <Badge
              tone="warning"
              className="border-white/45 bg-white/75 text-[var(--soc-ink)]"
            >
              Footer landscape direction
            </Badge>
            <h2 className="type-section mt-5 text-[var(--soc-ink)]">
              Scenic, warm, and clearly separated from content.
            </h2>
            <p className="type-body mt-4 text-[var(--soc-ink)]/80">
              Keep this world-building
              treatment mostly to the footer
              and hero so the rest of the
              interface remains easy to use.
            </p>
          </div>

          <div className="absolute bottom-5 left-6 z-10 h-8 w-8 rounded-full border-4 border-[var(--soc-ink)] bg-[var(--soc-sunflower)]" />
          <div className="absolute bottom-7 right-12 z-10 h-10 w-10 rounded-full border-4 border-[var(--soc-ink)] bg-[var(--soc-sky)]" />
          <div className="absolute bottom-16 right-1/4 z-10 h-5 w-5 rounded-full bg-white/70" />
        </div>
      </Card>
    </section>
  </PageShell>
);

export default ThemeStyleTile;
