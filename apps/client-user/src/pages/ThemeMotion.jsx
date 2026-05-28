import { Link } from "react-router-dom";
import {
  Sparkles,
  TimerReset,
  Wand2,
  Waves,
} from "lucide-react";

import PixelMascotWalk from "../components/common/PixelMascotWalk";
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
import {
  themeSceneAssets,
} from "../assets/theme-scene";

const starAsset =
  themeSceneAssets.find(
    (asset) =>
      asset.id === "collectible-star-pickup"
  )?.src;
const cloudAsset =
  themeSceneAssets.find(
    (asset) =>
      asset.id === "scene-cloud-pixel"
  )?.src;
const hillAsset =
  themeSceneAssets.find(
    (asset) =>
      asset.id === "scene-hill-footer-strip"
  )?.src;

const motionRules = [
  "Keep ambient loops slow and low-contrast.",
  "Avoid strong motion near inputs, admin tables, and long forms.",
  "Use transforms and opacity for performance-friendly animation.",
  "Prefer one signature animated character moment instead of multiple mascots per page.",
  "Disable or soften non-essential motion when `prefers-reduced-motion` is enabled.",
];

const timingTokens = [
  "--soc-motion-fast",
  "--soc-motion-base",
  "--soc-motion-slow",
  "--soc-motion-float",
  "--soc-motion-drift",
];

const ThemeMotion = () => (
  <PageShell className="pb-20">
    <PageHeader
      badge="Phase 9 • Motion"
      badgeTone="warning"
      title="SOC Motion And Animation System"
      description="This phase adds game-like personality without making the product noisy. The motion layer now includes cloud drift, sparkle twinkle, hill parallax, button bounce, card lift, CTA pulse, staggered reveals, and a signature pixel mascot walk."
      actions={
        <>
          <Link to="/theme-backgrounds">
            <Button
              variant="secondary"
              size="lg"
            >
              Back To Backgrounds
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
            Motion utilities added
          </Badge>
          <Badge tone="info">
            Reduced motion respected
          </Badge>
          <Badge tone="warning">
            Mascot walk active
          </Badge>
        </>
      }
      aside={
        <CardSection className="space-y-4 rounded-[1.75rem] p-5 text-sm text-slate-200">
          <div className="flex items-center gap-2 text-white">
            <Wand2
              size={18}
              className="text-cyan-200"
            />
            <span className="font-semibold">
              Motion principle
            </span>
          </div>
          <p className="leading-7 text-slate-200">
            Motion should make the site feel
            alive, not busy. Ambient loops
            stay slow. Interaction motion
            stays short. Task-heavy areas
            stay calm.
          </p>
        </CardSection>
      }
    />

    <section className="space-y-5">
      <SectionHeader
        badge="Animation set"
        badgeTone="accent"
        title="Core Motion Behaviors"
        description="The reusable motion layer is now defined in CSS utilities and used in public-facing sections."
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="p-7">
          <div className="flex items-center gap-3">
            <Sparkles
              size={20}
              className="text-cyan-200"
            />
            <h3 className="text-xl font-semibold text-white">
              Ambient motion
            </h3>
          </div>

          <div className="mt-6 rounded-[1.75rem] soc-poster-sky relative min-h-[16rem] overflow-hidden p-6">
            <img
              src={cloudAsset}
              alt=""
              className="soc-env-cloud-float absolute left-6 top-6 h-14 w-auto"
            />
            <img
              src={starAsset}
              alt=""
              className="soc-env-sparkle absolute right-8 top-8 h-8 w-8"
            />
            <img
              src={hillAsset}
              alt=""
              className="soc-env-hill-parallax absolute inset-x-0 bottom-0 w-full"
            />
            <div className="relative z-10 max-w-md">
              <Badge tone="warning">
                Clouds, sparkles, hills
              </Badge>
              <p className="type-body mt-4 text-[var(--soc-ink)]/78">
                Ambient loops are slow and
                scenic. They should add life
                to hero and footer sections
                without dragging attention
                away from the copy.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-7">
          <div className="flex items-center gap-3">
            <TimerReset
              size={20}
              className="text-cyan-200"
            />
            <h3 className="text-xl font-semibold text-white">
              Interaction motion
            </h3>
          </div>

          <div className="mt-6 space-y-5">
            <div className="flex flex-wrap gap-3">
              <Button size="lg">
                Button bounce
              </Button>
              <Button
                size="lg"
                className="soc-motion-cta border border-white/50 bg-[var(--soc-sunflower)] text-[var(--soc-ink)]"
              >
                CTA pulse
              </Button>
            </div>

            <div className="soc-motion-card rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-5">
              <h4 className="text-lg font-semibold text-white">
                Card lift on hover
              </h4>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Cards can lift slightly on
                hover in marketing sections.
                The motion should not be
                strong enough to destabilize
                denser admin surfaces.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>

    <section className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
      <Card className="p-7">
        <SectionHeader
          badge="Signature element"
          badgeTone="success"
          title="Pixel Mascot Walk"
          description="A sprite-sheet-style character animation gives the site one memorable game-like motion cue."
        />

        <div className="mt-6 flex items-center justify-between gap-6 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
          <div className="max-w-md">
            <p className="text-lg font-semibold text-white">
              Best placements
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Hero bottom strip, CTA scene,
              footer landscape, or an
              empty/loading state mascot. Use
              one signature loop, not
              multiple competing character
              animations.
            </p>
          </div>
          <div className="rounded-full bg-white/[0.06] px-4 py-2">
            <PixelMascotWalk size={64} />
          </div>
        </div>
      </Card>

      <Card className="p-7">
        <SectionHeader
          badge="Timing"
          badgeTone="info"
          title="Motion Tokens"
          description="These tokens keep the system consistent across ambient, interactive, and scenic motion."
        />

        <div className="mt-6 flex flex-wrap gap-2">
          {timingTokens.map((token) => (
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
          Interaction feedback uses the
          shorter tokens. Clouds, sparkles,
          and ground bands use the slower
          scenic timings.
        </p>
      </Card>
    </section>

    <section className="space-y-5">
      <SectionHeader
        badge="Rules"
        badgeTone="warning"
        title="Usage Rules And Reduced-Motion Fallbacks"
        description="The system is only successful if it stays supportive instead of distracting."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {motionRules.map((rule) => (
          <Card
            key={rule}
            className="p-5"
          >
            <p className="text-sm leading-7 text-slate-300">
              {rule}
            </p>
          </Card>
        ))}
      </div>
    </section>
  </PageShell>
);

export default ThemeMotion;
