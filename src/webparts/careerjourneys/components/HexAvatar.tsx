import * as React from "react";

interface HexAvatarProps {
  imageUrl: string;
  alt?: string;
  size?: number; // Controls width; height is derived for a point-up hexagon
  borderColor?: string;
  innerBorderColor?: string;
  borderWidth?: number;
  innerBorderWidth?: number;
  className?: string;
}

/**
 * Renders an image cropped inside a point-up hexagon with optional double borders.
 * The implementation relies on CSS custom properties so the shape can be reused
 * across the landing cards as well as the detailed profile view.
 */
export function HexAvatar({
  imageUrl,
  alt,
  size = 186,
  borderColor,
  innerBorderColor,
  borderWidth,
  innerBorderWidth,
  className,
}: HexAvatarProps) {
  const style = {
    "--shc-hex-size": `${size}px`,
  } as React.CSSProperties;

  if (typeof borderColor === "string") {
    (style as Record<string, string>)["--shc-hex-border-color"] = borderColor;
  }

  if (typeof innerBorderColor === "string") {
    (style as Record<string, string>)["--shc-hex-inner-border-color"] =
      innerBorderColor;
  }

  if (typeof borderWidth === "number") {
    (style as Record<string, string>)["--shc-hex-border-width"] =
      `${borderWidth}px`;
  }

  if (typeof innerBorderWidth === "number") {
    (style as Record<string, string>)["--shc-hex-inner-border-width"] =
      `${innerBorderWidth}px`;
  }

  return (
    <div className={`shc-hex-avatar ${className ?? ""}`.trim()} style={style}>
      <div className="shc-hex-avatar__outer">
        <div className="shc-hex-avatar__inner">
          <div className="shc-hex-avatar__media">
            <img src={imageUrl} alt={alt ?? ""} loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HexAvatar;
