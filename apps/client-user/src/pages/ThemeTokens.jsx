import { Link } from "react-router-dom";
import {
  Palette,
  Radius,
  Sparkles,
  Type,
  Waves,
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

const colorTokens = [
  {
    name: "--soc-bg",
    value: "#f6f1ea",
    role: "Main app/page background",
  },
  {
    name: "--soc-sand",
    value: "#e8ddd0",
    role: "Warm support surfaces and restrained section tint",
  },
  {
    name: "--soc-peach",
    value: "#d9c2ad",
    role: "Secondary warmth for subtle hero atmosphere and soft emphasis",
  },
  {
    name: "--soc-sky",
    value: "#e9f0f4",
    role: "Cool support surface for elevated cards and calm accents",
  },
  {
    name: "--soc-teal",
    value: "#2f6976",
    role: "Primary accent for CTAs, active states, and key highlights",
  },
  {
    name: "--soc-ink",
    value: "#182739",
    role: "Main text color, structural anchor, and premium contrast base",
  },
  {
    name: "--soc-coral",
    value: "#b77a68",
    role: "Warm secondary accent for restrained emphasis",
  },
  {
    name: "--soc-sunflower",
    value: "#c9ab76",
    role: "Warm highlight for supportive badges and subtle callouts",
  },
];

const spacingScale = [
  "--soc-space-1",
  "--soc-space-2",
  "--soc-space-3",
  "--soc-space-4",
  "--soc-space-5",
  "--soc-space-6",
  "--soc-space-7",
  "--soc-space-8",
  "--soc-space-9",
];

const radiusScale = [
  "--soc-radius-sm",
  "--soc-radius-md",
  "--soc-radius-lg",
  "--soc-radius-xl",
  "--soc-radius-pill",
];

const motionScale = [
  "--soc-motion-fast",
  "--soc-motion-base",
  "--soc-motion-slow",
  "--soc-motion-float",
  "--soc-motion-drift",
];

const typeLevels = [
  {
    title: "Hero title",
    usage: "Landing hero, campaign banners, big impact sections",
    classes:
      "font-display text-5xl font-black tracking-[-0.05em] text-[var(--soc-ink)] sm:text-7xl",
    sample: "Calm confidence for ambitious student builders",
  },
  {
    title: "Section title",
    usage: "Major page sections and feature group headings",
    classes:
      "font-display text-3xl font-bold tracking-[-0.04em] text-[var(--soc-ink)] sm:text-4xl",
    sample: "Premium structure, clear hierarchy",
  },
  {
    title: "Eyebrow label",
    usage: "Section intros, category markers, badges",
    classes:
      "font-body text-xs font-bold uppercase tracking-[0.18em] text-[var(--soc-teal)]",
    sample: "Theme token role",
  },
  {
    title: "Body copy",
    usage: "Descriptions, form help, long content, cards",
    classes:
      "font-body max-w-2xl text-base leading-8 text-[var(--soc-text-muted)]",
    sample:
      "Use the display role only for moments of emphasis. Everything that needs to be scanned, compared, reviewed, or completed should stay clean, quiet, and legible.",
  },
  {
    title: "CTA label",
    usage: "Primary actions and short conversion copy",
    classes:
      "font-body text-base font-bold tracking-[-0.01em] text-[var(--soc-ink)]",
    sample: "Register now",
  },
];

const usageRules = [
  {
    title: "Color roles",
    description:
      "Lead with ink, neutrals, and controlled warmth. Teal carries product intent. Coral and sunflower stay secondary and restrained rather than decorative.",
  },
  {
    title: "Text hierarchy",
    description:
      "Use the display role for hero and section headings only. Everything operational should stay in the cleaner body/UI role.",
  },
  {
    title: "States",
    description:
      "Success, warning, info, and danger should read as product signals first. Brand styling is secondary to clarity.",
  },
  {
    title: "Spacing",
    description:
      "Use tighter spacing inside controls and more generous spacing between sections so the product feels composed and premium.",
  },
];

const ThemeTokens = () => (
  <PageShell className="pb-20">
    <PageHeader
      badge="Phase 2 • Brand Language"
      badgeTone="info"
      title="SOC Design Tokens"
      description="This page turns the revised premium direction into a reusable system: restrained color tokens, clear font roles, controlled warmth, calmer surfaces, and motion that behaves like polish rather than theme."
      actions={
        <>
          <Link to="/theme-brief">
            <Button
              variant="secondary"
              size="lg"
            >
              Back To Theme Brief
            </Button>
          </Link>
          <Link to="/theme-typography">
            <Button
              variant="secondary"
              size="lg"
            >
              Open Typography Spec
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
          <Badge tone="info">
            Token file implemented
          </Badge>
          <Badge tone="success">
            Tailwind-compatible vars
          </Badge>
          <Badge tone="warning">
            Font roles defined
          </Badge>
        </>
      }
      aside={
        <CardSection className="space-y-4 rounded-[1.75rem] p-5 text-sm text-slate-200">
          <div className="flex items-center gap-2 text-white">
            <Sparkles
              size={18}
              className="text-cyan-200"
            />
            <span className="font-semibold">
              System summary
            </span>
          </div>
          <p className="leading-7 text-slate-200">
            The system is now oriented
            around trust, clarity, and
            premium student-tech tone. Warmth
            remains, but novelty and poster
            language are no longer the
            core identity.
          </p>
        </CardSection>
      }
    />

    <section className="space-y-5">
      <SectionHeader
        badge="Palette"
        badgeTone="accent"
        title="Core Color Tokens"
        description="These variables are defined globally and now favor restrained neutrals, confident contrast, and subtle warmth over bright poster-like color behavior."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {colorTokens.map((token) => (
          <Card
            key={token.name}
            className="p-4"
          >
            <div
              className="h-24 rounded-[1.5rem] border border-white/10"
              style={{
                backgroundColor: token.value,
              }}
            />
            <div className="mt-4">
              <p className="font-mono text-xs text-slate-300">
                {token.name}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white">
                {token.value}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                {token.role}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>

    <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <Card className="p-7">
        <SectionHeader
          badge="Fonts"
          badgeTone="success"
          title="Two Font Roles"
          description="The CSS now defines both roles globally through `--font-display` and `--font-body`."
        />

        <div className="mt-6 space-y-4">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
            Display role
          </p>
          <h3 className="mt-3 font-display text-4xl font-black tracking-[-0.05em] text-white">
            Hero and section authority
          </h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Use for hero titles, section
              headers, big CTA moments, and
              brand-led statements.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
              Body role
            </p>
            <h3 className="font-body mt-3 text-2xl font-semibold text-white">
              Forms, tables, labels, readable copy
            </h3>
            <p className="mt-3 font-body text-sm leading-7 text-slate-300">
              Use for anything that users
              need to scan, compare, fill,
              review, or understand quickly.
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-7">
        <SectionHeader
          badge="Hierarchy"
          badgeTone="warning"
          title="Typography Samples"
          description="A short hierarchy preview for later page work."
        />

        <div className="mt-6 space-y-6">
          {typeLevels.map((level) => (
            <div
              key={level.title}
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                {level.title}
              </p>
              <div className="mt-3">
                <div className={level.classes}>
                  {level.sample}
                </div>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {level.usage}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </section>

    <section className="grid gap-6 xl:grid-cols-3">
      <Card className="p-7">
        <div className="flex items-center gap-3">
          <Palette
            size={20}
            className="text-cyan-200"
          />
          <h3 className="text-xl font-semibold text-white">
            Spacing Scale
          </h3>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {spacingScale.map((token) => (
            <Badge
              key={token}
              tone="info"
              className="font-mono"
            >
              {token}
            </Badge>
          ))}
        </div>
        <p className="mt-5 text-sm leading-7 text-slate-300">
          Use smaller tokens inside
          controls and cards. Use larger
          tokens for section rhythm and
          page breathing room.
        </p>
      </Card>

      <Card className="p-7">
        <div className="flex items-center gap-3">
          <Radius
            size={20}
            className="text-cyan-200"
          />
          <h3 className="text-xl font-semibold text-white">
            Radius And Shadows
          </h3>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {radiusScale.map((token) => (
            <Badge
              key={token}
              tone="success"
              className="font-mono"
            >
              {token}
            </Badge>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge
            tone="warning"
            className="font-mono"
          >
            --soc-shadow-soft
          </Badge>
          <Badge
            tone="warning"
            className="font-mono"
          >
            --soc-shadow-card
          </Badge>
          <Badge
            tone="warning"
            className="font-mono"
          >
            --soc-shadow-pop
          </Badge>
        </div>
        <p className="mt-5 text-sm leading-7 text-slate-300">
          Radius stays soft, but more
          restrained than before. Shadows
          should feel composed and premium,
          not toy-like or overly glossy.
        </p>
      </Card>

      <Card className="p-7">
        <div className="flex items-center gap-3">
          <Waves
            size={20}
            className="text-cyan-200"
          />
          <h3 className="text-xl font-semibold text-white">
            Motion Tokens
          </h3>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {motionScale.map((token) => (
            <Badge
              key={token}
              tone="accent"
              className="font-mono"
            >
              {token}
            </Badge>
          ))}
        </div>
        <p className="mt-5 text-sm leading-7 text-slate-300">
          Fast timing is for hover and
          feedback. Slower timing should
          only support ambient polish, not
          expressive character-driven motion.
        </p>
      </Card>
    </section>

    <section className="space-y-5">
      <SectionHeader
        badge="Usage guide"
        badgeTone="info"
        title="Short Rules For Applying The System"
        description="These rules keep the brand warm and distinctive without slipping back into decorative, playful, or poster-like UI behavior."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {usageRules.map((rule) => (
          <Card
            key={rule.title}
            className="p-6"
          >
            <h3 className="text-xl font-semibold text-white">
              {rule.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {rule.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  </PageShell>
);

export default ThemeTokens;
