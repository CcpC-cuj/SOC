import pixelCloud from "./scene-cloud-pixel.svg";
import sparkleBurst from "./collectible-sparkle-burst.svg";
import pixelHeart from "./collectible-heart-pixel.svg";
import starPickup from "./collectible-star-pickup.svg";
import hillFooterStrip from "./scene-hill-footer-strip.svg";
import flowerTile from "./scene-flower-tile.svg";
import treePixel from "./scene-tree-pixel.svg";
import stickerRocket from "./sticker-rocket.svg";
import mascotCatSprite from "./mascot-cat-sprite.svg";

export const themeSceneAssets = [
  {
    id: "scene-cloud-pixel",
    name: "Pixel Cloud",
    file: "scene-cloud-pixel.svg",
    category: "scene",
    placement: "Hero edges, top corners, section dividers",
    notes:
      "Use for slow scenic drift and edge framing, not as repeated filler across the full page body.",
    src: pixelCloud,
  },
  {
    id: "collectible-sparkle-burst",
    name: "Sparkle Burst",
    file: "collectible-sparkle-burst.svg",
    category: "collectible",
    placement: "Hero accents, CTA edges, celebratory badges",
    notes:
      "Small highlight asset only. Keep count low to avoid visual noise.",
    src: sparkleBurst,
  },
  {
    id: "collectible-heart-pixel",
    name: "Pixel Heart",
    file: "collectible-heart-pixel.svg",
    category: "collectible",
    placement: "Friendly highlights, empty states, social callouts",
    notes:
      "Use only on public-facing, playful surfaces. Avoid in admin workflows.",
    src: pixelHeart,
  },
  {
    id: "collectible-star-pickup",
    name: "Star Pickup",
    file: "collectible-star-pickup.svg",
    category: "collectible",
    placement: "Hero corners, footer scenes, tiny heading accents",
    notes:
      "Reads like a game pickup. Best in sparse scenic compositions.",
    src: starPickup,
  },
  {
    id: "scene-hill-footer-strip",
    name: "Hill Footer Strip",
    file: "scene-hill-footer-strip.svg",
    category: "scene",
    placement: "Footer worlds, CTA endings, section-end scene bands",
    notes:
      "Keep this as a contained strip, not a full-page background.",
    src: hillFooterStrip,
  },
  {
    id: "scene-flower-tile",
    name: "Flower Tile",
    file: "scene-flower-tile.svg",
    category: "scene",
    placement: "Footer gardens, mascot scenes, calm decorative corners",
    notes:
      "Works best near the ground line or footer strips.",
    src: flowerTile,
  },
  {
    id: "scene-tree-pixel",
    name: "Pixel Tree",
    file: "scene-tree-pixel.svg",
    category: "scene",
    placement: "Large hero/footer edge framing",
    notes:
      "Use sparingly as a side anchor rather than a repeated icon.",
    src: treePixel,
  },
  {
    id: "sticker-rocket",
    name: "Rocket Sticker",
    file: "sticker-rocket.svg",
    category: "sticker",
    placement: "Poster-style hero corners and campaign callouts",
    notes:
      "Best for exploratory or launch-themed sections. Avoid data-heavy pages.",
    src: stickerRocket,
  },
  {
    id: "mascot-cat-sprite",
    name: "Cat Sprite Sheet",
    file: "mascot-cat-sprite.svg",
    category: "mascot",
    placement: "Hero bottom strip, footer landscape, empty/loading states",
    notes:
      "Reserve sprite animation for a single signature moment rather than multiple loops on one screen.",
    src: mascotCatSprite,
  },
];
