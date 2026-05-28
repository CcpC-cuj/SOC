import { Link } from "react-router-dom";
import {
  Layers3,
  Mountain,
  Sparkles,
  SunMedium,
} from "lucide-react";

import SceneEnvironment from "../components/common/SceneEnvironment";
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

const usageRules = [
  {
    title: "Marketing environment",
    description:
      "Use layered sky/sand gradients, scenic clouds, sparkles, and ground bands on home, showcase, and visually expressive public sections.",
  },
  {
    title: "Inner-page environment",
    description:
      "Use the calmer dark variant for forms, dashboards, account flows, and utility-heavy pages where contrast and concentration matter more than spectacle.",
  },
  {
    title: "Scene limits",
    description:
      "Trees, flowers, and footer bands belong mainly in hero and footer scenes. Keep content surfaces calmer and always above the decorative layer.",
  },
];

const ThemeBackgrounds = () => (
  <PageShell className="pb-20">
    <PageHeader
      badge="Phase 8 • Backgrounds"
      badgeTone="warning"
      title="SOC Background And Environment System"
      description="This phase turns the poster mood into reusable layered environments: expressive marketing scenes for hero-heavy public pages and quieter inner-page variants for forms, dashboards, and utility flows."
      actions={
        <>
          <Link to="/theme-assets">
            <Button
              variant="secondary"
              size="lg"
            >
              Back To Asset Library
            </Button>
          </Link>
          <Link to="/theme-motion">
            <Button
              variant="secondary"
              size="lg"
            >
              Open Motion Spec
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
            Home uses marketing scene
          </Badge>
          <Badge tone="info">
            Inner variant wired
          </Badge>
          <Badge tone="warning">
            Decorative layers controlled
          </Badge>
        </>
      }
      aside={
        <CardSection className="space-y-4 rounded-[1.75rem] p-5 text-sm text-slate-200">
          <div className="flex items-center gap-2 text-white">
            <Layers3
              size={18}
              className="text-cyan-200"
            />
            <span className="font-semibold">
              System rule
            </span>
          </div>
          <p className="leading-7 text-slate-200">
            Backgrounds should set mood
            first, then get out of the way.
            Calm readable surfaces always
            sit above scenic layers.
          </p>
        </CardSection>
      }
    />

    <section className="space-y-5">
      <SectionHeader
        badge="Preview"
        badgeTone="accent"
        title="Reusable Environment Variants"
        description="The system now ships with a richer public-facing marketing scene and a calmer inner-page scene."
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="overflow-hidden p-0">
          <div className="relative min-h-[24rem] overflow-hidden rounded-[2rem]">
            <SceneEnvironment
              variant="marketing"
              showLandscape
            />
            <div className="relative z-10 p-7">
              <Badge tone="warning">
                Marketing environment
              </Badge>
              <h2 className="type-section mt-5 text-[var(--soc-ink)]">
                Warm, scenic, and hero-ready.
              </h2>
              <p className="type-body mt-4 text-[var(--soc-ink)]/78">
                Use this for home, showcase
                discovery, and any section
                where the background should
                carry mood and identity.
              </p>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden p-0">
          <div className="relative min-h-[24rem] overflow-hidden rounded-[2rem]">
            <SceneEnvironment variant="inner" />
            <div className="relative z-10 p-7">
              <Badge tone="info">
                Inner-page environment
              </Badge>
              <h2 className="type-section mt-5 text-white">
                Cleaner, calmer, and easier to work over.
              </h2>
              <p className="type-body mt-4 text-slate-300">
                Use this for forms, account
                pages, dashboards, and other
                areas where clarity should
                dominate over scenic intensity.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>

    <section className="grid gap-6 xl:grid-cols-[1.04fr_0.96fr]">
      <Card className="p-7">
        <SectionHeader
          badge="Layer rules"
          badgeTone="success"
          title="What Makes The Background System Reusable"
          description="Most of the atmosphere comes from gradients and layering, while assets act as finishing touches."
        />

        <div className="mt-6 space-y-4">
          {usageRules.map((rule) => (
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
          badge="Layer stack"
          badgeTone="info"
          title="Recommended Background Order"
          description="This keeps the effect layered and controlled rather than noisy."
        />

        <div className="mt-6 space-y-4">
          {[
            {
              icon: SunMedium,
              title: "Base gradient",
              text:
                "Sky/sand or dark calm background first.",
            },
            {
              icon: Sparkles,
              title: "Ambient elements",
              text:
                "Clouds and sparkles next, lightly animated.",
            },
            {
              icon: Mountain,
              title: "Ground band",
              text:
                "Hill/footer strip only when the scene needs a world edge.",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="rounded-2xl bg-white/10 p-3">
                  <Icon
                    size={18}
                    className="text-cyan-200"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </section>
  </PageShell>
);

export default ThemeBackgrounds;
