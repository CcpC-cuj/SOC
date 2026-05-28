import { Link } from "react-router-dom";
import {
  Columns3,
  LayoutPanelTop,
  PanelTop,
  Rows3,
  StretchHorizontal,
} from "lucide-react";

import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import {
  Card,
  CardSection,
} from "../components/ui/Card";
import {
  PageHeader,
  PageShell,
  SectionHeader,
} from "../components/ui/PageChrome";

const layoutRules = [
  {
    title: "Art allowed",
    items: [
      "Hero backgrounds and top scenic framing",
      "Page edges and decorative corners",
      "Footer scenes and landscape strips",
      "Section dividers and lightweight accent bands",
    ],
    tone: "success",
  },
  {
    title: "Art restricted",
    items: [
      "Dense forms and multi-step data entry",
      "Admin tables, filters, and long list views",
      "Settings screens and account utilities",
      "Any area where reading speed matters more than mood",
    ],
    tone: "danger",
  },
];

const patternCards = [
  {
    title: "Standard section widths",
    body:
      "Use `--soc-shell-wide` for scenic pages, `--soc-shell-content` for standard page structure, and `--soc-shell-reading` for quieter information blocks or long-form guidance.",
  },
  {
    title: "Vertical rhythm",
    body:
      "Use compact spacing inside controls and dense modules, standard spacing for most content, and loose spacing for hero, CTA, and footer transitions.",
  },
  {
    title: "Mobile stacking",
    body:
      "All multi-column patterns collapse to a single column below tablet width, keeping art behind or outside the reading path.",
  },
];

const ThemeLayoutRules = () => (
  <PageShell className="pb-20">
    <PageHeader
      badge="Phase 5 • Layout Rules"
      badgeTone="success"
      title="SOC Layout Rules And Screen Structure"
      description="This phase translates poster composition into repeatable web rules: section widths, container shells, vertical rhythm, hero layering, decoration zones, and mobile stacking behavior."
      actions={
        <>
          <Link to="/theme-style-tile">
            <Button
              variant="secondary"
              size="lg"
            >
              Back To Style Tile
            </Button>
          </Link>
          <Link to="/theme-assets">
            <Button
              variant="secondary"
              size="lg"
            >
              Open Asset Library
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
            Layout utilities added
          </Badge>
          <Badge tone="info">
            Mobile stacking defined
          </Badge>
          <Badge tone="warning">
            Decoration zones controlled
          </Badge>
        </>
      }
      aside={
        <CardSection className="space-y-4 rounded-[1.75rem] p-5 text-sm text-slate-200">
          <div className="flex items-center gap-2 text-white">
            <StretchHorizontal
              size={18}
              className="text-cyan-200"
            />
            <span className="font-semibold">
              Practical rule
            </span>
          </div>
          <p className="leading-7 text-slate-200">
            Scenic art belongs around
            content, not inside its critical
            reading or task-completion path.
          </p>
        </CardSection>
      }
    />

    <section className="space-y-5">
      <SectionHeader
        badge="Core patterns"
        badgeTone="accent"
        title="System Rules Before Page Rollout"
        description="These structural rules should guide every later page implementation instead of being re-invented screen by screen."
      />

      <div className="soc-layout-card-grid">
        {patternCards.map((card) => (
          <Card
            key={card.title}
            className="p-6"
          >
            <h3 className="text-xl font-semibold text-white">
              {card.title}
            </h3>
            <p className="mt-3 type-body text-slate-300">
              {card.body}
            </p>
          </Card>
        ))}
      </div>
    </section>

    <section className="space-y-5">
      <SectionHeader
        badge="Layout patterns"
        badgeTone="info"
        title="Reference Patterns For Real Screens"
        description="These patterns map the design direction into actual page structures for hero, information sections, card grids, form pages, dashboard panels, and footer scenes."
      />

      <Card className="p-6">
        <div className="soc-decor-zone soc-poster-sky rounded-[2rem] px-6 py-6 sm:px-8">
          <div className="soc-decor-edge soc-poster-cloud left-6 top-6 h-6 w-10 opacity-80" />
          <div className="soc-decor-edge soc-poster-star right-14 top-10" />

          <div className="soc-layout-hero soc-decor-safe">
            <div className="space-y-4">
              <Badge tone="warning">
                Hero pattern
              </Badge>
              <h2 className="type-section text-[var(--soc-ink)]">
                Scenic headline, readable copy, one clear visual partner.
              </h2>
              <p className="type-body max-w-[58ch] text-[var(--soc-ink)]/80">
                Hero sections can carry the
                richest scene-building. Keep
                text grouped on one side,
                decorative layers at the
                edges, and a single strong
                companion panel or visual on
                the other side.
              </p>
            </div>

            <CardSection className="rounded-[1.8rem] border-[var(--soc-border-soft)] bg-white/72 p-5 text-[var(--soc-ink)] backdrop-blur-md">
              <p className="type-eyebrow text-[var(--soc-teal)]">
                Companion panel
              </p>
              <p className="mt-3 type-helper text-[var(--soc-ink)]/75">
                Use this area for highlights,
                stats, or an illustration card
                rather than another text wall.
              </p>
            </CardSection>
          </div>
        </div>
      </Card>

      <div className="soc-layout-info">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <Rows3
              size={20}
              className="text-cyan-200"
            />
            <h3 className="text-xl font-semibold text-white">
              Info section pattern
            </h3>
          </div>
          <p className="mt-4 type-body text-slate-300">
            Two balanced columns, generous
            rhythm, and only light scenic
            framing. Best for public
            explanation sections like “What
            is SOC”, domains, and timelines.
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <Columns3
              size={20}
              className="text-cyan-200"
            />
            <h3 className="text-xl font-semibold text-white">
              Cards grid pattern
            </h3>
          </div>
          <p className="mt-4 type-body text-slate-300">
            Three-up grids on desktop,
            stacking to one column on
            smaller screens. Decorative
            treatment stays outside the card
            interiors.
          </p>
        </Card>
      </div>

      <div className="soc-layout-form">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <PanelTop
              size={20}
              className="text-cyan-200"
            />
            <h3 className="text-xl font-semibold text-white">
              Form page pattern
            </h3>
          </div>
          <p className="mt-4 type-body text-slate-300">
            Keep the expressive top tone,
            but move the form itself into a
            calmer panel. Art can frame the
            page, not sit behind labels,
            inputs, or validation text.
          </p>
          <div className="mt-5 rounded-[1.5rem] soc-art-restricted p-4 text-sm text-slate-200">
            Decoration should stay out of
            dense form bodies.
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <LayoutPanelTop
              size={20}
              className="text-cyan-200"
            />
            <h3 className="text-xl font-semibold text-white">
              Dashboard panel pattern
            </h3>
          </div>
          <p className="mt-4 type-body text-slate-300">
            Use an asymmetrical content +
            support column layout. Keep
            decorative density lower than the
            public marketing surfaces.
          </p>
          <div className="mt-5 rounded-[1.5rem] soc-art-allowed p-4 text-sm text-slate-200">
            Small accents and quiet dividers
            are fine here.
          </div>
        </Card>
      </div>
    </section>

    <section className="space-y-5">
      <SectionHeader
        badge="Decoration map"
        badgeTone="warning"
        title="Where Art Belongs And Where It Does Not"
        description="The theme needs controlled decoration zones so the retro style helps the product instead of overwhelming it."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {layoutRules.map((rule) => (
          <Card
            key={rule.title}
            className="p-6"
          >
            <Badge tone={rule.tone}>
              {rule.title}
            </Badge>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
              {rule.items.map((item) => (
                <li
                  key={item}
                  className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] px-4 py-3"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>

    <section className="space-y-5">
      <SectionHeader
        badge="Footer structure"
        badgeTone="success"
        title="Footer Scene Pattern"
        description="Footer art should feel like a scenic ending strip, not a second hero. Content stays compact above the world-building layer."
      />

      <Card className="overflow-hidden p-0">
        <div className="soc-footer-strip relative min-h-[14rem] px-6 py-6 sm:px-8">
          <div className="relative z-10 soc-shell-reading ml-0">
            <Badge tone="accent">
              Footer scene
            </Badge>
            <h3 className="type-section mt-4 text-[var(--soc-ink)]">
              Compact content above the landscape band.
            </h3>
            <p className="type-body mt-4 text-[var(--soc-ink)]/78">
              The footer should close the
              page with warmth and identity,
              while keeping links and support
              content in a clear readable
              block above the decorative
              ground.
            </p>
          </div>
        </div>
      </Card>
    </section>
  </PageShell>
);

export default ThemeLayoutRules;
