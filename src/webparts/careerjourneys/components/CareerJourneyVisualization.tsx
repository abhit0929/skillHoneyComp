import React, { useState, useRef } from "react";
import { DetailedSuccessStory } from "../types";
import { getDepartmentEntity } from "../shared/utils/skillsDataAccess";
import { CareerPathModal } from "../shared/components/CareerPathModal";
import { entities } from "../../selfEvaluation/data/skillsData";

interface CareerJourneyVisualizationProps {
  storyData?: DetailedSuccessStory;
}

interface CareerNode {
  id: string;
  label: string | null;
  type: "map-start" | "hex-gray" | "role" | "map-end";
  color: string;
  textColor: string;
  position: { x: number; y: number };
  hexOffset?: { x: number; y: number };
  badgeOffset?: { x: number; y: number };
  hasGlobe?: boolean;
}

const generateCareerNodes = (
  storyData?: DetailedSuccessStory,
): CareerNode[] => {
  if (!storyData?.careerPath) return [];

  const nodes: CareerNode[] = [];

  // Add start node
  nodes.push({
    id: "start",
    label: null,
    type: "map-start",
    color: "#FFFF00",
    textColor: "#000000",
    position: { x: 70, y: 448 },
  });

  // Add career path nodes
  storyData.careerPath.forEach((step, index) => {
    if (!step.position) return; // Skip if no position data

    const entity = getDepartmentEntity(step.department);
    const badgeColor = entity?.color || "#BBBBBB";
    const badgeTextColor = entity?.textColor || "#000000";

    // Use exact entity colors for all badges

    nodes.push({
      id: `step-${index}`,
      label: step.role,
      type: index === 0 ? "hex-gray" : "role",
      color: badgeColor,
      textColor: badgeTextColor,
      position: { x: step.position.x - 92, y: step.position.y },
      hexOffset: step.hexOffset,
      badgeOffset: step.badgeOffset,
      hasGlobe: step.countryMobility === "Yes",
    });
  });

  // Add end node
  const lastStep = storyData.careerPath[storyData.careerPath.length - 1];
  if (lastStep?.position) {
    nodes.push({
      id: "end",
      label: null,
      type: "map-end",
      color: "#007F00",
      textColor: "#FFFFFF",
      position: {
        x: lastStep.position.x + 2 - 100,
        y: lastStep.position.y - 22,
      },
    });
  }

  return nodes;
};

// Transform global entities data to filter categories format
const getFilterCategories = () => {
  return entities.map((entity) => ({
    label: entity.name,
    color: `bg-[${entity.color}] ${entity.textColor === "#FFFFFF" ? "text-white" : "text-black"} border-[${entity.color}]`,
  }));
};

const getBadgeStyles = (color: string, textColor: string) => {
  return {
    backgroundColor: color,
    color: textColor,
    borderColor: "rgba(0, 0, 0, 0.2)",
  };
};

const getHexagonColor = (color: string) => {
  return color || "#CCCCCC";
};

const getConnectorColor = (color: string) => {
  return color || "#BBBBBB";
};

export default function CareerJourneyVisualization({
  storyData,
}: CareerJourneyVisualizationProps) {
  const careerNodes = generateCareerNodes(storyData);
  const [selectedCareerStep, setSelectedCareerStep] = useState<any>(null);
  const [modalOpener, setModalOpener] = useState<HTMLElement | null>(null);

  const handleCareerStepClick = (step: any, element: HTMLElement) => {
    setSelectedCareerStep(step);
    setModalOpener(element);
  };

  const handleModalClose = () => {
    setSelectedCareerStep(null);
    setModalOpener(null);
  };

  return (
    <div className="relative h-[550px] w-full max-w-[1003px] bg-transparent">
      {/* Dotted SVG Path connecting all nodes */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ zIndex: 5 }}
      >
        <path
          d={careerNodes
            .map((node, i) => {
              let x = node.position.x;
              let y = node.position.y;

              if (node.type === "map-start" || node.type === "map-end") {
                x += 36;
                y += 40;
              } else if (node.type === "hex-gray") {
                x += (node.hexOffset?.x || 0) + 10; // center of 20px width
                y += (node.hexOffset?.y || 0) + 10; // center of 20px height
              } else {
                x += (node.hexOffset?.x || 0) + 10; // center of 20px width
                y += (node.hexOffset?.y || 0) + 10; // center of 20px height
              }

              return `${i === 0 ? "M" : "L"} ${x} ${y}`;
            })
            .join(" ")}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={2}
          strokeDasharray="8,8"
          opacity={0.95}
          strokeLinecap="round"
        />
      </svg>

      {/* Circle dot at start of dotted line - positioned above the path */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ zIndex: 15 }}
      >
        {careerNodes.length > 0 &&
          (() => {
            const startNode = careerNodes[0];
            if (startNode.type === "map-start") {
              const x = startNode.position.x + 36;
              const y = startNode.position.y + 40;
              return (
                <circle
                  cx={x}
                  cy={y}
                  r="5"
                  fill="white"
                  stroke="rgba(0, 0, 0, 0.3)"
                  strokeWidth="0.5"
                  opacity={1}
                />
              );
            }
            return null;
          })()}
      </svg>

      {/* Career Journey Nodes */}
      {careerNodes.map((node, index) => {
        if (node.type === "map-start") {
          return (
            <div
              key={node.id}
              className="absolute z-10"
              style={{
                top: `${node.position.y - 8}px`,
                left: `${node.position.x + 7}px`,
              }}
            >
              <div className="relative">
                <div className="h-[20px] w-[22px] flex items-center justify-center">
                  <svg
                    width="20"
                    height="22"
                    viewBox="0 0 20 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.723 9.34471C11.723 8.1581 10.7611 7.19594 9.5742 7.19588C8.38728 7.19588 7.42537 8.15806 7.42537 9.34471C7.42557 10.5312 8.3874 11.4935 9.5742 11.4935C10.761 11.4935 11.7228 10.5312 11.723 9.34471ZM13.6298 9.34471C13.6297 11.5841 11.8136 13.399 9.5742 13.399C7.33473 13.399 5.51875 11.5841 5.51855 9.34471C5.51855 7.10511 7.33461 5.28906 9.5742 5.28906C11.8137 5.28912 13.6298 7.10515 13.6298 9.34471Z"
                      fill="#FFE600"
                    />
                    <path
                      d="M9.57783 0.128909C13.6134 0.131754 17.7447 2.51628 18.8353 7.33466C20.0964 12.9061 16.6154 17.5115 13.813 20.2024C11.4443 22.4867 7.69988 22.4836 5.32406 20.2024L5.32273 20.201C2.53057 17.5103 -0.950228 12.895 0.311014 7.32402L0.312343 7.32269C1.40875 2.50464 5.54226 0.126181 9.57783 0.128909ZM9.5765 2.03573C6.2576 2.03348 3.03303 3.95404 2.16996 7.74422C1.14449 12.2738 3.94851 16.2291 6.64447 18.8274L6.80005 18.9697C8.44424 20.4008 10.9137 20.3513 12.4912 18.8288L12.4926 18.8274C15.1984 16.2293 18.0005 12.284 16.9751 7.75485C16.1169 3.96389 12.8958 2.03807 9.5765 2.03573Z"
                      fill="#FFE600"
                    />
                  </svg>
                </div>
              </div>
            </div>
          );
        }

        if (node.type === "map-end") {
          return (
            <div
              key={node.id}
              className="absolute z-10"
              style={{
                top: `${node.position.y + 6}px`,
                left: `${node.position.x + 6}px`,
              }}
            >
              <div className="relative">
                <div className="h-[20px] w-[22px] flex items-center justify-center">
                  <svg
                    width="20"
                    height="22"
                    viewBox="0 0 20 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.723 9.34471C11.723 8.1581 10.7611 7.19594 9.5742 7.19588C8.38728 7.19588 7.42537 8.15806 7.42537 9.34471C7.42557 10.5312 8.3874 11.4935 9.5742 11.4935C10.761 11.4935 11.7228 10.5312 11.723 9.34471ZM13.6298 9.34471C13.6297 11.5841 11.8136 13.399 9.5742 13.399C7.33473 13.399 5.51875 11.5841 5.51855 9.34471C5.51855 7.10511 7.33461 5.28906 9.5742 5.28906C11.8137 5.28912 13.6298 7.10515 13.6298 9.34471Z"
                      fill="#007F00"
                    />
                    <path
                      d="M9.57783 0.128909C13.6134 0.131754 17.7447 2.51628 18.8353 7.33466C20.0964 12.9061 16.6154 17.5115 13.813 20.2024C11.4443 22.4867 7.69988 22.4836 5.32406 20.2024L5.32273 20.201C2.53057 17.5103 -0.950228 12.895 0.311014 7.32402L0.312343 7.32269C1.40875 2.50464 5.54226 0.126181 9.57783 0.128909ZM9.5765 2.03573C6.2576 2.03348 3.03303 3.95404 2.16996 7.74422C1.14449 12.2738 3.94851 16.2291 6.64447 18.8274L6.80005 18.9697C8.44424 20.4008 10.9137 20.3513 12.4912 18.8288L12.4926 18.8274C15.1984 16.2293 18.0005 12.284 16.9751 7.75485C16.1169 3.96389 12.8958 2.03807 9.5765 2.03573Z"
                      fill="#007F00"
                    />
                  </svg>
                </div>
              </div>
            </div>
          );
        }

        if (node.type === "hex-gray" || node.type === "role") {
          return (
            <div
              key={node.id}
              className="absolute"
              style={{
                top: `${node.position.y}px`,
                left: `${node.position.x}px`,
              }}
            >
              <div className="relative">
                {/* Hexagon */}
                <div
                  className="absolute z-10"
                  style={{
                    top: `${node.hexOffset?.y || 0}px`,
                    left: `${node.hexOffset?.x || 0}px`,
                    width: "20px",
                    height: "20px",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    className="h-full w-full"
                  >
                    <polygon
                      points="5,1 15,1 20,10 15,19 5,19 0,10"
                      fill={getHexagonColor(node.color)}
                      stroke="rgba(0, 0, 0, 0.2)"
                      strokeWidth="1"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Connector line from hexagon to badge */}
                {node.hexOffset &&
                  node.badgeOffset &&
                  (() => {
                    const hexX = (node.hexOffset?.x || 0) + 10; // center of hexagon
                    const hexY = (node.hexOffset?.y || 0) + 10; // center of hexagon
                    const badgeX = (node.badgeOffset?.x || 0) + 30; // center of badge (approx)
                    const badgeY = (node.badgeOffset?.y || 0) + 15; // center of badge (approx)

                    const dx = badgeX - hexX;
                    const dy = badgeY - hexY;
                    const color = getConnectorColor(node.color);

                    // Calculate edge-to-edge connection points
                    if (
                      Math.abs(dy) > 20 ||
                      (Math.abs(dx) > 80 && Math.abs(dy) > 10)
                    ) {
                      // Vertical line - connect from hexagon top/bottom edge to badge top/bottom edge
                      let hexEdgeY, badgeEdgeY;

                      if (dy > 0) {
                        // Badge is below hexagon
                        hexEdgeY = hexY + 9; // bottom edge of hexagon
                        badgeEdgeY = badgeY - 15; // top edge of badge
                      } else {
                        // Badge is above hexagon
                        hexEdgeY = hexY - 9; // top edge of hexagon
                        badgeEdgeY = badgeY + 15; // bottom edge of badge
                      }

                      const top = Math.min(hexEdgeY, badgeEdgeY);
                      const height = Math.abs(badgeEdgeY - hexEdgeY);
                      const left = hexX - 1;

                      if (height > 0) {
                        return (
                          <div
                            className="absolute z-10"
                            style={{
                              left,
                              top,
                              width: 2,
                              height,
                              backgroundColor: color,
                            }}
                          />
                        );
                      }
                    } else {
                      // Horizontal line - connect from hexagon left/right edge to badge left/right edge
                      let hexEdgeX, badgeEdgeX;

                      if (dx > 0) {
                        // Badge is to the right of hexagon
                        hexEdgeX = hexX + 10; // right edge of hexagon
                        badgeEdgeX = badgeX - 30; // left edge of badge
                      } else {
                        // Badge is to the left of hexagon
                        hexEdgeX = hexX - 10; // left edge of hexagon
                        badgeEdgeX = badgeX + 30; // right edge of badge (approximate)
                      }

                      const left = Math.min(hexEdgeX, badgeEdgeX);
                      const width = Math.abs(badgeEdgeX - hexEdgeX);
                      const top = hexY - 1;

                      if (width > 0) {
                        return (
                          <div
                            className="absolute z-10"
                            style={{
                              left,
                              top,
                              width,
                              height: 2,
                              backgroundColor: color,
                            }}
                          />
                        );
                      }
                    }
                    return null;
                  })()}

                {/* Badge */}
                <button
                  className="group absolute z-20 cursor-pointer transition-transform duration-200"
                  style={{
                    top: `${node.badgeOffset?.y || 0}px`,
                    left: `${node.badgeOffset?.x || 0}px`,
                  }}
                  onClick={(e) => {
                    const stepIndex = parseInt(node.id.replace("step-", ""));
                    const careerStep = storyData?.careerPath[stepIndex];
                    if (careerStep) {
                      handleCareerStepClick(careerStep, e.currentTarget);
                    }
                  }}
                >
                  <div
                    className="flex items-center gap-2 rounded-md border px-2.5 py-1 text-sm"
                    style={getBadgeStyles(node.color, node.textColor)}
                  >
                    {node.hasGlobe && (
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_74797_25675)">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.62097 14.9088C3.7544 14.9087 0.620117 11.7737 0.620117 7.90711C0.620378 4.04073 3.75456 0.90634 7.62097 0.90625C11.4875 0.90625 14.6224 4.04068 14.6227 7.9071C14.6227 11.7738 11.4876 14.9088 7.62097 14.9088ZM9.00696 7.20728C8.95341 5.80904 8.74325 4.57644 8.44214 3.6731C8.26581 3.14418 8.07135 2.76609 7.88928 2.53491C7.79988 2.42152 7.72662 2.3604 7.67822 2.33069C7.65545 2.31673 7.63995 2.3109 7.63208 2.30847C7.62489 2.30629 7.62097 2.30591 7.62097 2.30591C7.62097 2.30591 7.6172 2.30652 7.61072 2.30847C7.60292 2.31085 7.58675 2.31657 7.56372 2.33069C7.51532 2.36045 7.44277 2.42169 7.35352 2.53491C7.17139 2.76607 6.9762 3.14398 6.7998 3.6731C6.49871 4.57643 6.28938 5.8091 6.23584 7.20728H9.00696ZM13.1769 7.20727C12.9139 5.09932 11.4816 3.35436 9.54785 2.646C9.62782 2.83177 9.70234 3.02746 9.77002 3.23047C10.1258 4.29787 10.3543 5.68551 10.4083 7.20727H13.1769ZM4.83362 7.20728C4.88769 5.68556 5.11615 4.29786 5.47192 3.23047C5.53955 3.02761 5.61334 2.83164 5.69324 2.646C3.75997 3.35461 2.32802 5.09967 2.06506 7.20728H4.83362ZM9.54871 13.1674C11.4821 12.4586 12.9141 10.7147 13.1769 8.60693L10.4083 8.60693C10.3543 10.1288 10.1258 11.5171 9.77002 12.5846C9.70255 12.787 9.62839 12.9821 9.54871 13.1674ZM7.63208 13.5066C7.63995 13.5042 7.65531 13.4976 7.67822 13.4835C7.72665 13.4537 7.79999 13.3935 7.88928 13.2802C8.07141 13.0489 8.26575 12.6703 8.44214 12.1411C8.74319 11.2377 8.95346 10.0051 9.00696 8.60693H6.23584C6.28933 10.0051 6.49877 11.2377 6.79981 12.1411C6.97621 12.6703 7.17137 13.0489 7.35352 13.2802C7.4426 13.3932 7.51532 13.4537 7.56372 13.4835C7.58673 13.4976 7.60287 13.5042 7.61072 13.5066C7.61715 13.5085 7.62097 13.5083 7.62097 13.5083C7.62097 13.5083 7.62482 13.5088 7.63208 13.5066ZM5.69324 13.1674C5.61356 12.9821 5.53939 12.787 5.47192 12.5846C5.11613 11.5171 4.88764 10.1288 4.83362 8.60693L2.06506 8.60693C2.32779 10.7146 3.76002 12.4586 5.69324 13.1674Z"
                            fill="black"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_74797_25675">
                            <rect
                              width="14"
                              height="14"
                              fill="white"
                              transform="translate(0.621094 0.908203)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    )}
                    <span className="whitespace-nowrap">{node.label}</span>
                    <svg
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                    >
                      <path
                        d="M2.85571 8.5H14.1443M10.5002 12.8571L14.1443 8.5L10.5002 4.14285"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          );
        }

        return null;
      })}

      {/* Career Path Modal */}
      <CareerPathModal
        careerStep={selectedCareerStep}
        onClose={handleModalClose}
        opener={modalOpener}
      />
    </div>
  );
}
