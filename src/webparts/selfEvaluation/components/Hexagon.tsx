interface HexagonProps {
  label: string;
  position: { x: number; y: number };
  type: "center" | "primary" | "secondary";
  isExpanded: boolean;
  onClick: (e: any) => void;
  isClickable: boolean;
}

export default function Hexagon({
  label,
  position,
  type,
  isExpanded,
  onClick,
  isClickable,
}: HexagonProps) {
  const size = type === "center" ? 50 : type === "primary" ? 45 : 35;

  // Create hexagon path
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    const x = Math.cos(angle) * size;
    const y = Math.sin(angle) * size;
    points.push(`${x},${y}`);
  }
  const pathData = `M ${points.join(" L ")} Z`;

  const getHexagonColor = () => {
    switch (type) {
      case "center":
        return "#004F00"; // Dark green
      case "primary":
        return isExpanded ? "#8BC34A" : "#7CB342"; // Lime green, darker when expanded
      case "secondary":
        return "#FFD600"; // Yellow
      default:
        return "#8BC34A";
    }
  };

  const getHoverColor = () => {
    switch (type) {
      case "center":
        return "#005500";
      case "primary":
        return "#9CCC65";
      case "secondary":
        return "#FFDD33";
      default:
        return "#9CCC65";
    }
  };

  const textColor = type === "secondary" ? "#000" : "#FFF";
  const fontSize =
    type === "center" ? "11px" : type === "primary" ? "9px" : "7px";

  return (
    <g
      transform={`translate(${position.x}, ${position.y})`}
      className={`transition-all duration-200 ${isClickable ? "cursor-pointer" : ""}`}
      onClick={isClickable ? onClick : undefined}
    >
      {/* Hexagon shape */}
      <path
        d={pathData}
        fill={getHexagonColor()}
        stroke={isExpanded ? "#FFD600" : "transparent"}
        strokeWidth={isExpanded ? "2" : "0"}
        className={`transition-all duration-200 ${
          isClickable ? "hover:brightness-110" : ""
        }`}
        style={{
          filter: isExpanded
            ? "drop-shadow(0 0 8px rgba(255, 214, 0, 0.4))"
            : "none",
        }}
      />

      {/* Text label */}
      <text
        x="0"
        y="0"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={textColor}
        fontSize={fontSize}
        fontWeight="400"
        className="pointer-events-none select-none"
      >
        {label.length > 20 ? (
          <>
            <tspan x="0" dy="-0.3em">
              {label.substring(0, label.lastIndexOf(" "))}
            </tspan>
            <tspan x="0" dy="1em">
              {label.substring(label.lastIndexOf(" ") + 1)}
            </tspan>
          </>
        ) : label.length > 12 ? (
          <>
            <tspan x="0" dy="-0.3em">
              {label.substring(0, Math.ceil(label.length / 2))}
            </tspan>
            <tspan x="0" dy="1em">
              {label.substring(Math.ceil(label.length / 2))}
            </tspan>
          </>
        ) : (
          label
        )}
      </text>

      {/* Arrow indicator for expandable hexagons */}
      {isClickable && (
        <g
          className="transition-transform duration-200"
          transform={isExpanded ? "rotate(180)" : "rotate(0)"}
        >
          <path
            d="M -8 8 L 0 0 L 8 8"
            stroke={textColor}
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(0, 25)"
            className="pointer-events-none"
          />
        </g>
      )}
    </g>
  );
}