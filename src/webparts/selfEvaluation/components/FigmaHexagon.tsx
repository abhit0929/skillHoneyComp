interface FigmaHexagonProps {
  label: string;
  position: { x: number; y: number };
  type: "center" | "primary" | "secondary";
  isHovered: boolean;
  isExpanded: boolean;
  onClick: (e: any) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isClickable: boolean;
  rotationDeg?: number;
  isDisabled?: boolean;
}

export default function FigmaHexagon({
  label,
  position,
  type,
  isHovered,
  isExpanded,
  onClick,
  onMouseEnter,
  onMouseLeave,
  isClickable,
  rotationDeg = -60,
  isDisabled = false,
}: FigmaHexagonProps) {
  // Create hexagon path (rotation configurable to match Figma per-variant)
  const createHexagonPath = (size: number) => {
    const points: string[] = [];
    const rotationRad = (rotationDeg * Math.PI) / 180;
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3 + rotationRad;
      const x = Math.cos(angle) * size;
      const y = Math.sin(angle) * size;
      points.push(`${x},${y}`);
    }
    return `M ${points.join(" L ")} Z`;
  };

  const getHexagonFill = () => {
    if (isDisabled) return "#EBEBEB"; // Consistent disabled background color
    if (type === "center") return "#007F00"; // Primary Green - non-clickable
    if (type === "secondary") return isClickable ? "#FFC84C" : "#EBEBEB"; // Yellow if clickable, gray if not
    if (isHovered || isExpanded) return "rgba(0, 127, 0, 0.8)"; // Primary Yellow on hover/expanded
    return "#99CC00"; // Primary Lime Green - non-clickable core skills
  };

  const getHexagonStroke = () => {
    if (isDisabled) return "#A0A0A0"; // Consistent disabled stroke color
    if (type === "center") return "#99CC00";
    if (type === "secondary") return isClickable ? "#007F00" : "#999999";
    if (isExpanded) return "#007F00";
    return "#007F00";
  };

  const getStrokeOpacity = () => {
    if (isDisabled) return 0.8;
    if (type === "center") return 0.5;
    if (type === "secondary") return isClickable ? 0.2 : 0.5;
    return 0.2;
  };

  const getTextColor = () => {
    if (isDisabled) return "#A0A0A0"; // Consistent disabled text color
    if (type === "center") return "#FFE600"; // Yellow text on green background
    if (type === "secondary") return isClickable ? "#000" : "#666666"; // Black if clickable, gray if not
    if (isHovered || isExpanded) return "#fff"; // Black text on yellow background
    return "#000"; // Black text on lime background
  };

  const getFontSize = () => {
    if (type === "center") return "24px";
    return "14px";
  };

  const getFontWeight = () => {
    if (type === "center") return "600";
    return "400";
  };

  const getLineHeight = () => {
    return "19px"; // 135.714% of 14px
  };

  const outerSize = 77; // Reduced by 10px for smaller hexagons (was 87px)
  const innerSize = 70; // Reduced proportionally for inner stroke hexagon (was 76px)

  // Text clipping and layout inside the inner hexagon (stay within border)
  const borderPadding = 6; // Reverted to original value to prevent text cutting
  const textClipSize = innerSize - borderPadding; // hex radius for the clip path
  const clipWidth = textClipSize * 2;
  const clipHeight = Math.sqrt(3) * textClipSize; // bounding box height for a flat-top hexagon
  const contentPadding = 8; // Reverted to original value to prevent text cutting

  // Unique clip-path id per hexagon
  const sanitize = (s: string) => s.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  const clipId = `hex-clip-${sanitize(label)}-${Math.round(position.x)}-${Math.round(position.y)}`;

  // Estimate-based wrapping and autosizing so text fits inside the clipped area
  const baseFontSize = parseInt(getFontSize());
  const minFontSize = 14; // Text won't shrink below 14px for better readability
  const avgCharWidthFactor = 0.55; // rough average glyph width factor relative to font-size
  const lineHeightFactor = 1.35;
  const contentWidth = clipWidth - contentPadding * 2;
  const contentHeight = clipHeight - contentPadding * 2;

  const wrapWords = (text: string, maxChars: number) => {
    const words = text.split(/\s+/);
    const lines: string[] = [];
    let current = "";

    const pushCurrent = () => {
      if (current.trim().length) lines.push(current.trim());
      current = "";
    };

    for (const word of words) {
      if (word.length > maxChars) {
        // break long word into chunks
        const chunks: string[] = [];
        let i = 0;
        while (i < word.length) {
          chunks.push(word.slice(i, i + maxChars));
          i += maxChars;
        }
        for (const ch of chunks) {
          if ((current + " " + ch).trim().length <= maxChars) {
            current = (current + " " + ch).trim();
          } else {
            pushCurrent();
            current = ch;
          }
        }
      } else {
        if ((current + " " + word).trim().length <= maxChars) {
          current = (current + " " + word).trim();
        } else {
          pushCurrent();
          current = word;
        }
      }
    }
    pushCurrent();
    return lines;
  };

  const computeFittingLayout = () => {
    // For secondary hexagons, ALWAYS use 14px - no scaling whatsoever
    if (type === "secondary") {
      const fs = 14;
      const lineHeight = fs * lineHeightFactor;
      // Use standard character calculation for wrapping
      const maxChars = Math.max(
        6,
        Math.floor(contentWidth / (avgCharWidthFactor * fs)),
      );
      const lines = wrapWords(label, maxChars);
      return { fs, lineHeight, lines };
    }

    // For center hexagon, use the original scaling logic
    for (let fs = baseFontSize; fs >= minFontSize; fs--) {
      const maxChars = Math.max(
        1,
        Math.floor(contentWidth / (avgCharWidthFactor * fs)),
      );
      const lines = wrapWords(label, maxChars);
      const lineHeight = fs * lineHeightFactor;
      const totalHeight = lines.length * lineHeight;
      if (totalHeight <= contentHeight) {
        return { fs, lineHeight, lines };
      }
    }
    // fallback to min size for center hexagon
    const fs = minFontSize;
    const maxChars = Math.max(
      1,
      Math.floor(contentWidth / (avgCharWidthFactor * fs)),
    );
    const lines = wrapWords(label, maxChars);
    const lineHeight = fs * lineHeightFactor;
    return { fs, lineHeight, lines };
  };

  const { fs, lineHeight, lines } = computeFittingLayout();
  const wrappedText = lines.join("\n");

  // Calculate dynamic arrow position based on content height
  const contentTextHeight = lines.length * lineHeight;
  const dynamicArrowY = Math.max(30, contentTextHeight / 2 + 5); // At least 30px down, or content height/2 + 20px

  return (
    <g
      transform={`translate(${position.x}, ${position.y})`}
      className={`transition-all duration-300 ${isClickable && !isDisabled ? "cursor-pointer hover:opacity-80" : "cursor-default"}`}
      onClick={isClickable && !isDisabled ? onClick : undefined}
      onMouseEnter={isClickable && !isDisabled ? onMouseEnter : undefined}
      onMouseLeave={isClickable && !isDisabled ? onMouseLeave : undefined}
      style={{ opacity: isDisabled ? 0.5 : isClickable ? 1 : 0.8 }}
    >
      {/* Outer hexagon */}
      <path
        d={createHexagonPath(outerSize)}
        fill={getHexagonFill()}
        className="transition-all duration-300"
      />

      {/* Inner stroke hexagon */}
      <path
        d={createHexagonPath(innerSize)}
        fill="none"
        //stroke={getHexagonStroke()}
        strokeWidth="1"
        //opacity={getStrokeOpacity()}
        className="transition-all duration-300"
      />

      {/* ClipPath to ensure text never exceeds inner hex border */}
      <defs>
        <clipPath id={clipId}>
          <path d={createHexagonPath(textClipSize)} />
        </clipPath>
      </defs>

      {/* Text content inside a clipped foreignObject for robust wrapping */}
      <foreignObject
        x={-clipWidth / 2}
        y={-clipHeight / 2}
        width={clipWidth}
        height={clipHeight}
        clipPath={`url(#${clipId})`}
        className="pointer-events-none select-none"
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: `${contentPadding}px`,
          }}
        >
          <div
            style={{
              color: getTextColor(),
              fontSize: `${fs}px`,
              fontWeight: parseInt(getFontWeight()),
              lineHeight: `${lineHeight}px`,
              fontFamily:
                "Roboto, -apple-system, Roboto, Helvetica, sans-serif",
              textAlign: "center",
              wordBreak: "break-word",
              hyphens: "auto",
              whiteSpace: "pre-wrap",
              overflow: "hidden", // Reverted to prevent text overflow
              transform: "none", // Prevent any CSS transforms that might scale text
              zoom: 1, // Prevent browser zoom scaling
            }}
          >
            {wrappedText}
          </div>
        </div>
      </foreignObject>

      {/* Arrow indicator for clickable hexagons only */}
      {isClickable && !isDisabled && type === "secondary" && (
        <g transform={`translate(-8, ${dynamicArrowY})`} className="opacity-80">
          <svg
            width="16"
            height="16"
            viewBox="0 0 17 17"
            style={{
              transition: "transform 0.3s ease",
              transform: isHovered ? "translateX(8px)" : "translateX(0px)",
              willChange: "transform",
            }}
          >
            <g clipPath="url(#clip0_arrow)">
              <path
                d="M11.2383 2.60048C10.9259 2.28815 10.4198 2.28809 10.1074 2.60048C9.79516 2.91289 9.79513 3.41896 10.1074 3.73134L13.8857 7.50869H1.41406C0.97254 7.50895 0.613413 7.86694 0.613281 8.30849C0.613281 8.75016 0.972459 9.10803 1.41406 9.1083H13.8838L10.1074 12.8847C9.79505 13.1971 9.79502 13.7041 10.1074 14.0165C10.4003 14.3092 10.8636 14.3274 11.1777 14.0712L11.2383 14.0165L16.3809 8.87392C16.5308 8.72396 16.6152 8.52057 16.6152 8.30849C16.6152 8.09638 16.5308 7.89308 16.3809 7.74306L11.2383 2.60048Z"
                fill={isHovered ? "#007F00" : "#252530"}
                style={{ transition: "fill 0.3s ease" }}
              />
            </g>
            <defs>
              <clipPath id="clip0_arrow">
                <rect
                  width="16"
                  height="16"
                  fill="white"
                  transform="translate(0.614258 0.308594)"
                />
              </clipPath>
            </defs>
          </svg>
        </g>
      )}
    </g>
  );
}