import { Link } from "react-router-dom";
import {
  Box,
  ImageIcon,
  Layers3,
  Package,
  Sparkles,
} from "lucide-react";

import { themeSceneAssets } from "../assets/theme-scene";
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

const placementRules = [
  {
    title: "Preferred zones",
    tone: "success",
    items: [
      "Hero edges and scenic framing",
      "Footer landscapes and world strips",
      "Section dividers and CTA endings",
      "Small accent moments in empty states or marketing cards",
    ],
  },
  {
    title: "Restricted zones",
    tone: "danger",
    items: [
      "Dense forms and label/input clusters",
      "Admin tables, long lists, and settings screens",
      "Repeated background wallpaper across every section",
      "Any area where assets compete with scanning speed",
    ],
  },
];

const namingRules = [
  "Use `scene-` for environment pieces like clouds, hills, trees, and flowers.",
  "Use `collectible-` for tiny game-like pickups such as stars, hearts, and sparkles.",
  "Use `sticker-` for poster-style corner assets like rockets or badges.",
  "Use `mascot-` for sprite sheets and character graphics.",
  "Prefer SVG for crisp scalable scene elements. Keep PNG only for source posters or artwork that truly needs raster detail.",
];

const groupedAssets = {
  scene: themeSceneAssets.filter(
    (asset) => asset.category === "scene"
  ),
  collectible:
    themeSceneAssets.filter(
      (asset) =>
        asset.category === "collectible"
    ),
  sticker: themeSceneAssets.filter(
    (asset) => asset.category === "sticker"
  ),
  mascot: themeSceneAssets.filter(
    (asset) => asset.category === "mascot"
  ),
};

const groupOrder = [
  {
    key: "scene",
    title: "Scene Foundations",
  },
  {
    key: "collectible",
    title: "Collectibles And Sparkles",
  },
  {
    key: "sticker",
    title: "Sticker Layer",
  },
  {
    key: "mascot",
    title: "Mascot And Sprite",
  },
];

const ThemeAssets = () => (
  <PageShell className="pb-20">
    <PageHeader
      badge="Phase 6 • Asset Strategy"
      badgeTone="accent"
      title="SOC Scene Library"
      description="This phase builds a reusable asset pack instead of page-by-page graphics. The library keeps most backgrounds CSS-driven, then layers a small number of optimized SVG assets in hero, footer, divider, and accent zones."
      actions={
        <>
          <Link to="/theme-layout-rules">
            <Button
              variant="secondary"
              size="lg"
            >
              Back To Layout Rules
            </Button>
          </Link>
          <Link to="/theme-backgrounds">
            <Button
              variant="secondary"
              size="lg"
            >
              Open Background System
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
            Organized asset pack
          </Badge>
          <Badge tone="info">
            SVG-first
          </Badge>
          <Badge tone="warning">
            Placement rules included
          </Badge>
        </>
      }
      aside={
        <CardSection className="space-y-4 rounded-[1.75rem] p-5 text-sm text-slate-200">
          <div className="flex items-center gap-2 text-white">
            <Package
              size={18}
              className="text-cyan-200"
            />
            <span className="font-semibold">
              Strategy summary
            </span>
          </div>
          <p className="leading-7 text-slate-200">
            Keep backgrounds mostly CSS-based.
            Use the asset pack for hero edges,
            footer scenes, dividers, and one
            signature mascot moment rather than
            spreading graphics across every
            content surface.
          </p>
        </CardSection>
      }
    />

    <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
      <Card className="p-7">
        <SectionHeader
          badge="Naming"
          badgeTone="info"
          title="Asset Naming Convention"
          description="The library is organized by intent so new assets can be added consistently."
        />

        <div className="mt-6 space-y-4">
          {namingRules.map((rule) => (
            <div
              key={rule}
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-5 py-4 text-sm leading-7 text-slate-300"
            >
              {rule}
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-4">
        {placementRules.map((rule) => (
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
        badge="Asset pack"
        badgeTone="success"
        title="Reusable Scene Assets"
        description="Each asset ships with a file name, category, intended placement, and a usage note so it can be reused intentionally instead of copied ad hoc."
      />

      <div className="space-y-8">
        {groupOrder.map((group) => (
          <div
            key={group.key}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <Layers3
                size={18}
                className="text-cyan-200"
              />
              <h3 className="text-2xl font-semibold text-white">
                {group.title}
              </h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {groupedAssets[group.key].map(
                (asset) => (
                  <Card
                    key={asset.id}
                    className="p-5"
                  >
                    <div className="flex h-40 items-center justify-center rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
                      <img
                        src={asset.src}
                        alt={asset.name}
                        className={
                          asset.category ===
                          "mascot"
                            ? "max-h-16 w-auto"
                            : "max-h-28 w-auto"
                        }
                      />
                    </div>

                    <div className="mt-5">
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="text-lg font-semibold text-white">
                          {asset.name}
                        </h4>
                        <Badge tone="info">
                          {asset.category}
                        </Badge>
                      </div>

                      <p className="mt-2 font-mono text-xs text-slate-400">
                        {asset.file}
                      </p>

                      <p className="mt-4 text-sm font-semibold text-slate-200">
                        Placement
                      </p>
                      <p className="mt-1 text-sm leading-7 text-slate-300">
                        {asset.placement}
                      </p>

                      <p className="mt-4 text-sm font-semibold text-slate-200">
                        Usage note
                      </p>
                      <p className="mt-1 text-sm leading-7 text-slate-300">
                        {asset.notes}
                      </p>
                    </div>
                  </Card>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="space-y-5">
      <SectionHeader
        badge="Placement example"
        badgeTone="warning"
        title="How The Library Should Be Used"
        description="A scene library works best when multiple assets support a layout pattern rather than dominating the entire page."
      />

      <Card className="overflow-hidden p-0">
        <div className="soc-poster-sky relative min-h-[20rem] overflow-hidden rounded-[2rem] px-6 py-8 sm:px-8">
          <img
            src={groupedAssets.scene[0].src}
            alt="Cloud decoration"
            className="absolute left-8 top-8 h-14 w-auto opacity-85"
          />
          <img
            src={groupedAssets.sticker[0].src}
            alt="Rocket sticker"
            className="absolute right-8 top-8 h-20 w-auto rotate-[8deg]"
          />
          <img
            src={groupedAssets.scene[2].src}
            alt="Tree edge"
            className="absolute bottom-8 left-8 h-28 w-auto"
          />
          <img
            src={groupedAssets.mascot[0].src}
            alt="Mascot sprite"
            className="absolute bottom-10 right-24 h-16 w-auto"
          />
          <img
            src={groupedAssets.scene[1].src}
            alt="Flower accent"
            className="absolute bottom-8 right-8 h-16 w-auto"
          />

          <div className="relative z-10 max-w-2xl">
            <Badge tone="warning">
              Example composition
            </Badge>
            <h2 className="type-section mt-5 text-[var(--soc-ink)]">
              CSS does the heavy lifting. Assets finish the scene.
            </h2>
            <p className="type-body mt-4 text-[var(--soc-ink)]/78">
              This is the target balance:
              gradient background first,
              3–5 intentional assets second,
              and the reading surface always
              staying clear.
            </p>
          </div>
        </div>
      </Card>
    </section>
  </PageShell>
);

export default ThemeAssets;
