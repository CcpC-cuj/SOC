import { cn } from "../../lib/cn";
import {
  themeSceneAssets,
} from "../../assets/theme-scene";

const spriteAsset =
  themeSceneAssets.find(
    (asset) =>
      asset.id === "mascot-cat-sprite"
  )?.src;

const PixelMascotWalk = ({
  className,
  size = 64,
}) => (
  <div
    aria-hidden="true"
    className={cn("soc-mascot-sprite", className)}
    style={{
      width: `${size}px`,
      height: `${size}px`,
      backgroundImage: `url(${spriteAsset})`,
      backgroundSize: `${size * 4}px ${size}px`,
    }}
  />
);

export default PixelMascotWalk;
