import * as React from 'react';
import HexagonalGrid from "./HexagonalGrid";
// Resolve image import in a way that works with different bundlers
const SkillBg = (require("../assets/page-background.png").default ?? require("../assets/page-background.png")) as string;
import { entities } from "../data/skillsData";
import { ISelfEvaluationProps } from './ISelfEvaluationProps';
import "../assets/global.css"; // Import global styles"
// ...existing code..

const SelfEvaluation: React.FC<ISelfEvaluationProps> = () => {
     // Start with no active entity so the page loads with all hexes highlighted
     const [activeEntity, setActiveEntity] = React.useState<string>("");
  // Helper function to get exact border colors from Figma
  const getBorderColor = (entityId: string): string => {
    const borderColors: Record<string, string> = {
      all: "#013201",
      finance: "#8A8AD7",
      procurement: "#4D1478",
      aviation: "#77AD3D",
      biofuels: "#008B68",
      fsm: "#FFFF00",
      tech: "#9B8D04",
      castrol: "#2E5F1B",
      pulse: "#82E650",
      mc: "#B6EDB6",
    };
    return borderColors[entityId] || "#000";
  };

  // Hide SharePoint command bar while this web part is mounted by toggling a body class.
  React.useEffect(() => {
    try {
      document.body.classList.add('shc-hide-commandbar');
    } catch (e) {
      // ignore in restricted environments
    }
    return () => {
      try {
        document.body.classList.remove('shc-hide-commandbar');
      } catch (e) {
        // ignore
      }
    };
  }, []);
  // Use CSS media-queries (shc-dynamic-min) instead of JS-driven minWidth
//  const getBorderColor = (id) => (activeEntity === id ? "#013201" : "transparent");

  return (
    <div
      className="shc-root -mt-[3.125em]"
      style={{
        backgroundImage: `url(${SkillBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "repeat-y",
      }}
    >
      <div className="shc-overlay">
        {/* === HEADER (Single Row Layout) === */}
        <div className="shc-header-container">
          {/* LEFT: Title + Subtitle */}
          <div className="shc-left">
            <h2 className="text-black text-[28px] font-light leading-normal">
              Skills honeycomb
            </h2>
            <p className="text-[#333] text-sm font-normal leading-5">
              Build your personalized career development plan
            </p>
          </div>

          {/* RIGHT: Paragraph + Buttons */}
          <div className="shc-right">
            <p className="text-[#666] text-xs font-normal leading-normal text-right mb-2">
              Each entity offers varying potential to develop skills, with the highlighted
              having the greatest opportunity in this specific entity. Click below to see.
            </p>
            <div className="shc-entity-buttons" style={{ textAlign: "right" }}>
              {entities.map((entity) => (
                <button
                  key={entity.id}
                  onClick={() => setActiveEntity(entity.id)}
                  className={`py-1 px-3 mr-2 rounded-full border text-[12px] font-normal transition-all duration-200 ${
                    activeEntity === entity.id
                      ? "border-gray-400 shadow-md"
                      : "border-transparent hover:border-gray-300"
                  }`}
                  style={{
                    borderColor: getBorderColor(entity.id),
                    background: `linear-gradient(0deg, ${entity.color} 0%, ${entity.color} 100%)`,
                    color: entity.textColor,
                    whiteSpace: "nowrap",
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span className="shc-entity-name">{entity.name}</span>
                  {activeEntity === entity.id && (
                    <span
                      className="shc-entity-close"
                      role="button"
                      aria-label={`Clear ${entity.name}`}
                      onClick={(e) => { e.stopPropagation(); setActiveEntity(''); }}
                      style={{ marginLeft: '6px', fontWeight: 700 }}
                    >
                      ×
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* === HONEYCOMB === */}
        <div className="shc-honeycomb-wrapper">
          <HexagonalGrid activeEntity={activeEntity} />
        </div>
      </div>
    </div>
  );
};

export default SelfEvaluation;
// export default SelfEvaluation;