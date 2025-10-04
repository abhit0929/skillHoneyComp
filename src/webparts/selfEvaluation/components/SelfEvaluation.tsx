import * as React from 'react';
import HexagonalGrid from "./HexagonalGrid";
// Resolve image import in a way that works with different bundlers
const SkillBg = (require("../assets/page-background.png").default ?? require("../assets/page-background.png")) as string;
import { entities } from "../data/skillsData";
import { ISelfEvaluationProps } from './ISelfEvaluationProps';
import "../assets/global.css"; // Import global styles"
// ...existing code..

const SelfEvaluation: React.FC<ISelfEvaluationProps> = () => {
    //const [activeEntity, setActiveEntity] = React.useState<string>("all");
// const activeEntityState = React.useState<string>("all");
// const activeEntity = activeEntityState[0];
 const [activeEntity, setActiveEntity] = React.useState<string>("all");
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
  return (
    <div
      className="relative min-h-screen overflow-x-hidden overflow-y-auto"
      style={{ background: "#fcfcfc" }}
    >
      {/* Background with exact Figma styling */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${SkillBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "repeat-y",
          zIndex: 0,
        }}
      ></div>

      {/* Content */}
      <div className="relative px-8 pt-10 pb-10">
        {/* Header section with exact Figma spacing */}
        <div className="flex justify-between mb-2.5">
          <div>
            <h2 className="text-black text-[28px] font-light leading-normal">
              Skills honeycomb
            </h2>
            <p className="text-[#666] text-sm font-normal leading-5">
              Build your personalized career development plan
            </p>
          </div>
          <div className="pt-2.5 gap-2.5">
            <p className="flex-1 text-[#666] text-right text-xs font-normal leading-normal">
              Each entity offers varying potential to develop skills, with the
              highlighted having the greatest opportunity in this specific
              entity. Click below to see.
            </p>
            {/* Entity Tabs */}
            <div className="flex flex-wrap gap-2 mt-5 mb-2 justify-center">
              {entities.map((entity) => (
                <button
                  key={entity.id}
                  onClick={() => setActiveEntity(entity.id)}
                  className={`flex py-1 px-2 items-end gap-2.5 rounded-full border relative font-normal text-[12px] ${
                    activeEntity === entity.id
                      ? "border-gray-400 shadow-md"
                      : "border-transparent hover:border-gray-300"
                  }`}
                  style={{
                    borderColor: getBorderColor(entity.id),
                    background: `linear-gradient(0deg, ${entity.color} 0%, ${entity.color} 100%), #FFF`,
                    color: entity.textColor,
                  }}
                >
                  {entity.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Hexagonal Grid with exact positioning */}
        <div className="flex justify-center items-center pb-16">
          <HexagonalGrid activeEntity={activeEntity} />
        </div>
      </div>
    </div>
  );
}
export default SelfEvaluation;