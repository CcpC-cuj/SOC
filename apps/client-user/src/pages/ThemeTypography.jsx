import { Link } from "react-router-dom";
import {
  AlignLeft,
  BookText,
  CaseSensitive,
  Eye,
  Type,
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

const hierarchy = [
  {
    name: "Hero title",
    className:
      "type-hero text-[var(--soc-ink)]",
    sample:
      "Build your next summer idea together",
    size:
      "2.5rem–6.5rem",
    weight: "900",
    lineHeight: "0.94",
    usage:
      "Landing hero, launch banners, major campaign moments",
  },
  {
    name: "Section title",
    className:
      "type-section text-[var(--soc-ink)]",
    sample:
      "Playful structure, readable product surfaces",
    size:
      "1.9rem–3.5rem",
    weight: "800",
    lineHeight: "1.06",
    usage:
      "Major sections, feature groups, public page headers",
  },
  {
    name: "Eyebrow label",
    className:
      "type-eyebrow text-[var(--soc-teal)]",
    sample:
      "Theme hierarchy",
    size: "0.8rem",
    weight: "700",
    lineHeight: "1.2",
    usage:
      "Section intros, feature labels, compact category markers",
  },
  {
    name: "Body copy",
    className:
      "type-body",
    sample:
      "Use the display role only for large-impact moments. Anything that needs to be read, compared, completed, or understood quickly should stay in the clean body role with generous line-height and controlled measure.",
    size:
      "1rem–1.125rem",
    weight: "400–500",
    lineHeight: "1.7",
    usage:
      "Cards, descriptions, feature copy, dashboard summaries, long paragraphs",
  },
  {
    name: "Small helper text",
    className:
      "type-helper",
    sample:
      "Helper copy, timestamps, validation hints, and quiet metadata should stay readable without competing with the main content.",
    size: "0.875rem",
    weight: "500",
    lineHeight: "1.5",
    usage:
      "Form hints, support notes, validation messages, timestamps",
  },
  {
    name: "CTA label",
    className:
      "type-cta text-[var(--soc-ink)]",
    sample:
      "Register now",
    size: "1rem",
    weight: "800",
    lineHeight: "1",
    usage:
      "Buttons, action chips, key conversion points",
  },
];

const readabilityRules = [
  {
    title: "Display font restraint",
    description:
      "Keep the display role for hero titles, section headings, poster badges, and other large-impact surfaces. Do not use it for long paragraphs, forms, tables, or dense admin content.",
  },
  {
    title: "Paragraph measure",
    description:
      "Standard copy should stay around 60ch–72ch. Hero-supporting copy should run narrower to keep the retro visuals feeling intentional rather than crowded.",
  },
  {
    title: "Line-height tuning",
    description:
      "Headings should stay tight and energetic. Reading text should stay more open. Labels and CTA text should remain compact and decisive.",
  },
  {
    title: "Form clarity first",
    description:
      "Labels, helper text, inputs, selects, and validation feedback should all live in the clean body role so users can scan and complete tasks quickly.",
  },
];

const contextRules = [
  "Landing page: strongest display treatment and scenic type moments.",
  "Projects page: expressive headings with quieter card copy.",
  "Login and register: playful top section, calm form surfaces.",
  "Dashboard: display type only in banners and section headers.",
  "Admin: mostly body/UI typography with minimal decorative type.",
];

const ThemeTypography = () => (
  <PageShell className="pb-20">
    <PageHeader
      badge="Phase 3 • Typography"
      badgeTone="warning"
      title="SOC Typography System"
      description="This phase keeps the playful poster voice while turning the app into something users can comfortably scan, fill, compare, and trust. The hierarchy now lives in reusable type classes and practical readability rules."
      actions={
        <>
          <Link to="/theme-tokens">
            <Button
              variant="secondary"
              size="lg"
            >
              Back To Tokens
            </Button>
          </Link>
          <Link to="/theme-style-tile">
            <Button
              variant="secondary"
              size="lg"
            >
              Open Style Tile
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
            Reusable type classes
          </Badge>
          <Badge tone="info">
            Readability rules
          </Badge>
          <Badge tone="warning">
            Form-safe hierarchy
          </Badge>
        </>
      }
      aside={
        <CardSection className="space-y-4 rounded-[1.75rem] p-5 text-sm text-slate-200">
          <div className="flex items-center gap-2 text-white">
            <Type
              size={18}
              className="text-cyan-200"
            />
            <span className="font-semibold">
              Guiding principle
            </span>
          </div>
          <p className="leading-7 text-slate-200">
            The site should feel like a
            playful retro poster at first
            glance, but read like a modern
            product the moment a user starts
            interacting with it.
          </p>
        </CardSection>
      }
    />

    <section className="space-y-5">
      <SectionHeader
        badge="Hierarchy"
        badgeTone="accent"
        title="Type Scale And Usage"
        description="These classes are now available globally and act as the baseline typography system for later page rollout."
      />

      <div className="grid gap-5">
        {hierarchy.map((item) => (
          <Card
            key={item.name}
            className="p-6"
          >
            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr] xl:items-start">
              <div>
                <p className="type-eyebrow text-slate-400">
                  {item.name}
                </p>
                <div className="mt-4">
                  <div className={item.className}>
                    {item.sample}
                  </div>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 text-sm leading-7 text-slate-300">
                <p>
                  <span className="font-semibold text-white">
                    Size:
                  </span>{" "}
                  {item.size}
                </p>
                <p>
                  <span className="font-semibold text-white">
                    Weight:
                  </span>{" "}
                  {item.weight}
                </p>
                <p>
                  <span className="font-semibold text-white">
                    Line-height:
                  </span>{" "}
                  {item.lineHeight}
                </p>
                <p className="mt-2">
                  <span className="font-semibold text-white">
                    Use:
                  </span>{" "}
                  {item.usage}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>

    <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <Card className="p-7">
        <SectionHeader
          badge="Readability"
          badgeTone="info"
          title="Reading Rules"
          description="This is where the poster energy gets turned into usable product typography."
        />

        <div className="mt-6 space-y-4">
          {readabilityRules.map((rule) => (
            <div
              key={rule.title}
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5"
            >
              <h3 className="text-xl font-semibold text-white">
                {rule.title}
              </h3>
              <p className="mt-3 type-body text-slate-300">
                {rule.description}
              </p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-7">
        <SectionHeader
          badge="By context"
          badgeTone="success"
          title="Where Each Tone Belongs"
          description="The same system should behave differently depending on the page type."
        />

        <div className="mt-6 space-y-4">
          {contextRules.map((rule) => (
            <div
              key={rule}
              className="flex items-start gap-3 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 text-sm leading-7 text-slate-300"
            >
              <Eye
                size={18}
                className="mt-1 shrink-0 text-cyan-200"
              />
              <span>{rule}</span>
            </div>
          ))}
        </div>
      </Card>
    </section>

    <section className="grid gap-6 xl:grid-cols-3">
      <Card className="p-7">
        <div className="flex items-center gap-3">
          <AlignLeft
            size={20}
            className="text-cyan-200"
          />
          <h3 className="text-xl font-semibold text-white">
            Measure
          </h3>
        </div>
        <p className="mt-4 type-body text-slate-300">
          Long copy should stay within
          `60ch–72ch`. Hero-supporting copy
          should be tighter so large scenic
          sections keep their rhythm.
        </p>
      </Card>

      <Card className="p-7">
        <div className="flex items-center gap-3">
          <CaseSensitive
            size={20}
            className="text-cyan-200"
          />
          <h3 className="text-xl font-semibold text-white">
            All-caps restraint
          </h3>
        </div>
        <p className="mt-4 type-body text-slate-300">
          All-caps works for eyebrows,
          microbadges, and compact calls to
          action. It should not carry long
          descriptive paragraphs.
        </p>
      </Card>

      <Card className="p-7">
        <div className="flex items-center gap-3">
          <BookText
            size={20}
            className="text-cyan-200"
          />
          <h3 className="text-xl font-semibold text-white">
            Form-safe defaults
          </h3>
        </div>
        <p className="mt-4 type-body text-slate-300">
          Labels, helper text, tables, and
          admin rows should default to the
          body role, even if surrounding
          marketing sections use stronger
          display styling.
        </p>
      </Card>
    </section>
  </PageShell>
);

export default ThemeTypography;
