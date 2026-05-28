import { Link } from "react-router-dom";
import {
  Compass,
  Image as ImageIcon,
  Layers3,
  Sparkles,
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

import posterPixel from "../assets/theme-brief/season-of-code-2026.png";
import posterRounded from "../assets/theme-brief/soc-2026-poster.png";

const keepItems = [
  "A warm foundation that prevents the interface from feeling cold or generic",
  "Strong typography and clear hierarchy for hero moments and public messaging",
  "A student-tech tone that feels modern, serious, and aspirational",
  "Editorial spacing, generous whitespace, and visibly structured content groupings",
  "Subtle brand atmosphere around the page edges rather than novelty decoration",
];

const simplifyItems = [
  "Reduce the font system to one display role and one readable UI role",
  "Tighten the palette into restrained neutrals with one primary accent and one warm support accent",
  "Use motion as polish, not personality",
  "Favor premium panels, cleaner borders, and quieter backgrounds over expressive illustration",
  "Make workflow pages feel calmer than public marketing pages",
];

const avoidItems = [
  "Pixel-art, mascot, and sticker-driven branding as the main visual identity",
  "Bright poster gradients that overpower product content",
  "Decorative overload inside forms, dashboards, and admin tables",
  "Childlike novelty cues that reduce trust or product maturity",
  "Large animated or illustrated elements near task-heavy UI",
];

const moodWords = [
  "Premium",
  "Calm",
  "Credible",
  "Focused",
  "Warm",
  "Structured",
  "Modern",
  "Editorial",
  "Intentional",
  "Student-tech",
  "Professional",
  "Confident",
];

const references = [
  {
    title: "Warmth Reference",
    description:
      "Use this for its warmth and campaign energy only. Do not carry forward the pixel-art language or poster density directly.",
    image: posterPixel,
    imageClassName:
      "object-top",
  },
  {
    title: "Composition Reference",
    description:
      "Use this as a reminder that hero framing and CTA emphasis matter, but translate them into restrained product composition rather than playful decoration.",
    image: posterPixel,
    imageClassName:
      "object-[center_78%]",
  },
  {
    title: "Soft Structure Reference",
    description:
      "This is the closer structural cue: softer surfaces, welcoming content rhythm, and a calmer interpretation that can evolve into a more premium product language.",
    image: posterRounded,
    imageClassName:
      "object-top",
  },
];

const bulletColumns = [
  {
    title: "Keep",
    icon: Sparkles,
    tone: "success",
    items: keepItems,
  },
  {
    title: "Simplify",
    icon: Layers3,
    tone: "warning",
    items: simplifyItems,
  },
  {
    title: "Avoid",
    icon: Compass,
    tone: "danger",
    items: avoidItems,
  },
];

const ThemeBrief = () => (
  <PageShell className="pb-20">
    <PageHeader
      badge="Phase 1 • Visual Audit"
      badgeTone="accent"
      title="SOC Theme Brief"
      description="Reposition the visual system away from playful poster language and toward a premium, calm, credible student-tech product brand that still keeps a small amount of warmth and approachability."
      actions={
        <>
          <Link to="/">
            <Button size="lg">
              Back To Home
            </Button>
          </Link>
          <Link to="/theme-tokens">
            <Button
              variant="secondary"
              size="lg"
            >
              Open Theme Tokens
            </Button>
          </Link>
          <a
            href={posterPixel}
            target="_blank"
            rel="noreferrer"
          >
            <Button
              variant="secondary"
              size="lg"
            >
              Open Poster Reference
            </Button>
          </a>
        </>
      }
      meta={
        <>
          <Badge tone="info">
            Premium student-tech tone
          </Badge>
          <Badge tone="warning">
            Reduce novelty
          </Badge>
          <Badge tone="success">
            Credibility first
          </Badge>
        </>
      }
      aside={
        <CardSection className="space-y-4 rounded-[1.75rem] p-5 text-sm text-slate-200">
          <div className="flex items-center gap-2 text-white">
            <ImageIcon
              size={18}
              className="text-cyan-200"
            />
            <span className="font-semibold">
              Direction Summary
            </span>
          </div>
          <p className="leading-7 text-slate-200">
            The new target direction is a
            premium student-tech product:
            calm, credible, warm in a
            restrained way, and clearly
            built for trust, usability, and
            long-term product maturity.
          </p>
        </CardSection>
      }
    />

    <section className="grid gap-4 lg:grid-cols-3">
      {bulletColumns.map((column) => {
        const Icon = column.icon;

        return (
          <Card
            key={column.title}
            className="p-6"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-white/10 p-3 text-white">
                <Icon
                  size={20}
                  className="text-cyan-100"
                />
              </div>
              <div>
                <Badge tone={column.tone}>
                  {column.title}
                </Badge>
              </div>
            </div>

            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-200 sm:text-[15px]">
              {column.items.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        );
      })}
    </section>

    <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <Card className="p-7">
        <SectionHeader
          badge="Mood words"
          badgeTone="info"
          title="The Site Should Feel Like A Calm Premium Product With Student Energy"
          description="These words should guide later design decisions for color, motion, layout, surface treatment, and component personality."
        />

        <div className="mt-6 flex flex-wrap gap-3">
          {moodWords.map((word, index) => (
            <Badge
              key={word}
              tone={
                index % 4 === 0
                  ? "warning"
                  : index % 4 === 1
                    ? "accent"
                    : index % 4 === 2
                      ? "info"
                      : "success"
              }
              className="px-4 py-2 text-sm"
            >
              {word}
            </Badge>
          ))}
        </div>
      </Card>

      <Card className="p-7">
        <SectionHeader
          badge="Translation"
          badgeTone="success"
          title="Practical Product Reading"
          description="This brief freezes a more mature direction. The product should feel branded and warm, but not poster-like, novelty-first, or youthfully chaotic."
        />

        <div className="mt-6 space-y-4 text-sm leading-7 text-slate-200">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-5 py-4">
            <span className="font-semibold text-white">
              Public pages:
            </span>{" "}
            polished, spacious, warm, and
            brand-led without becoming
            illustrative.
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-5 py-4">
            <span className="font-semibold text-white">
              Forms:
            </span>{" "}
            calmer panels, stronger contrast,
            and almost no decorative noise.
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-5 py-4">
            <span className="font-semibold text-white">
              Dashboard and admin:
            </span>{" "}
            the same token family, but more
            restrained, operational, and
            premium than expressive.
          </div>
        </div>
      </Card>
    </section>

    <section className="space-y-5">
      <SectionHeader
        badge="Reference screenshots"
        badgeTone="accent"
        title="Visual Sources For The Theme"
        description="These screenshots are now treated as source warmth and composition cues only. We are not copying their pixel language, mascot tone, or poster density into the product."
      />

      <div className="grid gap-5 xl:grid-cols-3">
        {references.map((reference) => (
          <Card
            key={reference.title}
            className="overflow-hidden"
          >
            <div className="border-b border-white/10 bg-white/[0.04] p-5">
              <h3 className="text-xl font-semibold text-white">
                {reference.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                {reference.description}
              </p>
            </div>
            <div className="px-5 pb-5 pt-4">
              <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/20">
                <img
                  src={reference.image}
                  alt={reference.title}
                  className={`h-[28rem] w-full object-cover ${reference.imageClassName}`}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  </PageShell>
);

export default ThemeBrief;
