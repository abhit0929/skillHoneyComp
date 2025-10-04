import { useEffect, useState, useMemo } from "react";
import FigmaHexagon from "./FigmaHexagon";
import { SkillModal } from "../components/SkillModal";
import { skills, entities } from "../data/skillsData";

interface HexagonalGridProps {
  activeEntity: string;
}

interface SkillCategory {
  id: string;
  label: string;
  position: { x: number; y: number };
  type: "center" | "primary";
  subSkills?: string[];
}

const OUTER_HEX_SIZE = 77; // Reduced by 10px for smaller hexagons (was 87px)
const HEX_ROTATION_DEG = -60; // Same default rotation used by FigmaHexagon

// Utility: generate hexagon polygon points for a given center, size and rotation
function getHexPoints(
  cx: number,
  cy: number,
  size: number,
  rotationDeg: number,
) {
  const pts: { x: number; y: number }[] = [];
  const rot = (rotationDeg * Math.PI) / 180;
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3 + rot;
    pts.push({
      x: cx + Math.cos(angle) * size,
      y: cy + Math.sin(angle) * size,
    });
  }
  return pts;
}

// Get the center point of the hexagon edge closest to the target direction
function getHexEdgeIntersection(
  from: { x: number; y: number },
  to: { x: number; y: number },
  size = OUTER_HEX_SIZE,
  rotationDeg = HEX_ROTATION_DEG,
  forceEdgeIndex?: number, // Optional parameter to force a specific edge
) {
  const hex = getHexPoints(from.x, from.y, size, rotationDeg);

  // If a specific edge is forced, use that edge
  if (
    forceEdgeIndex !== undefined &&
    forceEdgeIndex >= 0 &&
    forceEdgeIndex < 6
  ) {
    const edgeA = hex[forceEdgeIndex];
    const edgeB = hex[(forceEdgeIndex + 1) % 6];

    return {
      x: (edgeA.x + edgeB.x) / 2,
      y: (edgeA.y + edgeB.y) / 2,
    };
  }

  // Calculate the direction vector from hexagon center to target
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const targetAngle = Math.atan2(dy, dx);

  // Find the edge that is most aligned with the target direction
  let bestEdgeIndex = 0;
  let smallestAngleDiff = Infinity;

  for (let i = 0; i < 6; i++) {
    const a = hex[i];
    const b = hex[(i + 1) % 6];

    // Calculate the center point of this edge
    const edgeCenterX = (a.x + b.x) / 2;
    const edgeCenterY = (a.y + b.y) / 2;

    // Calculate the angle from hexagon center to edge center
    const edgeAngle = Math.atan2(edgeCenterY - from.y, edgeCenterX - from.x);

    // Calculate the absolute difference between target angle and edge angle
    let angleDiff = Math.abs(targetAngle - edgeAngle);
    // Handle angle wrapping (ensure we get the smaller angle difference)
    if (angleDiff > Math.PI) angleDiff = 2 * Math.PI - angleDiff;

    if (angleDiff < smallestAngleDiff) {
      smallestAngleDiff = angleDiff;
      bestEdgeIndex = i;
    }
  }

  // Return the center point of the best-aligned edge
  const edgeA = hex[bestEdgeIndex];
  const edgeB = hex[(bestEdgeIndex + 1) % 6];

  return {
    x: (edgeA.x + edgeB.x) / 2,
    y: (edgeA.y + edgeB.y) / 2,
  };
}

export default function HexagonalGrid({ activeEntity }: HexagonalGridProps) {
  // Initialize with all primary skills expanded (always-expanded state)
  const expandedCategories = new Set([
    "safety",
    "commercial",
    "operations",
    "strategic",
    "technology",
    "stakeholder",
  ]);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [viewBox, setViewBox] = useState({
    x: 600,
    y: -500,
    width: 1200,
    height: 1000,
  });
  const [selectedSkill, setSelectedSkill] = useState<{
    id: string;
    name: string;
    category: string;
    entityIds?: string[];
  } | null>(null);
  const [modalOpener, setModalOpener] = useState<HTMLElement | null>(null);

  // Determine which skills are active for the current entity
  const getSkillActiveState = (skill: any) => {
    if (activeEntity === "all") {
      return true; // All skills are active when "All C&P entities" is selected
    }
    return skill.entities.includes(activeEntity);
  };

  // Get core and center skills directly from skillsData - truly data-driven
  const skillCategories: SkillCategory[] = useMemo(() => {
    // Get core skills (ring 0 and 1) from skillsData
   const coreSkills = skills.filter(skill => (skill.ring ?? 0) <= 1);


    // Create category mapping for specialized skills
    const categoryMapping: Record<string, string> = {
      center: "center",
      safety: "safety",
      commercial: "commercial",
      operations: "operations",
      "strategic-leadership": "strategic",
      "technology-innovation": "technology",
      "stakeholder-regulatory": "stakeholder",
    };

    return coreSkills.map((skill) => {
      const categoryId = categoryMapping[skill.id] || skill.id;

      // Get specialized skills for this category
      const subSkills =
        skill.type === "center"
          ? undefined
          : skills
              .filter(
                (s) => s.category === skill.id && s.type === "specialized",
              )
              .map((s) => s.name);

      return {
        id: categoryId,
        label: skill.name,
        position: skill.position,
        type:
          skill.type === "center" ? ("center" as const) : ("primary" as const),
        subSkills,
      };
    });
  }, [skills]);

  // Check if a skill category is active (has any skills for the current entity)
  const isCategoryActive = (categoryId: string) => {
    if (activeEntity === "all") return true;

    // For center, it should NEVER be disabled regardless of entity selection
    if (categoryId === "center") {
      return true; // Always active
    }

    // For other categories, check if the core skill is available for this entity
    const coreSkillId =
      categoryId === "strategic"
        ? "strategic-leadership"
        : categoryId === "technology"
          ? "technology-innovation"
          : categoryId === "stakeholder"
            ? "stakeholder-regulatory"
            : categoryId;

    const coreSkill = skills.find((skill) => skill.id === coreSkillId);
    return coreSkill ? getSkillActiveState(coreSkill) : false;
  };

  const handleHexagonHover = (categoryId: string | null) => {
    // Keep hover functionality for visual feedback
    setHoveredCategory(categoryId);
  };

  const handleSubSkillClick = (
    subSkillName: string,
    categoryId: string,
    opener?: HTMLElement,
  ) => {
    const parentCategory = skillCategories.find((c) => c.id === categoryId);

    if (parentCategory) {
      // Create a kebab-case ID from the skill name
      const skillId = subSkillName
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "") // Remove special characters
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens

      // Find the related skill from skillsData to get entities
      const relatedSkill = skills.find(
        (skill) =>
          skill.category === categoryId ||
          skill.name.toLowerCase().includes(categoryId),
      );

      setSelectedSkill({
        id: skillId,
        name: subSkillName,
        category: categoryId,
        entityIds: relatedSkill?.entities || ["all"],
      });

      // Store the opener element for focus management
      setModalOpener(opener || null);
    }
  };

  // Data-driven positioning: Get sub-skill positions directly from skillsData.tsx
  const getSubSkillPositions = (categoryId: string) => {
    // Map category names to their corresponding skillsData category values
    const categoryMapping: Record<string, string> = {
      safety: "safety",
      commercial: "commercial",
      operations: "operations",
      strategic: "strategic-leadership",
      technology: "technology-innovation",
      stakeholder: "stakeholder-regulatory",
    };

    const mappedCategory = categoryMapping[categoryId];
    if (!mappedCategory) return [];

    // Get all specialized skills for this category from skillsData
    const specializedSkills = skills
      .filter(
        (skill) =>
          skill.category === mappedCategory && skill.type === "specialized",
      )
      .map((skill) => ({
        name: skill.name,
        position: skill.position,
        id: skill.id,
      }));

    // Return positions in the same order as they appear in the skillCategories subSkills array
    const categoryData = skillCategories.find((cat) => cat.id === categoryId);
    if (!categoryData?.subSkills) return [];

    return categoryData.subSkills.map((subSkillName) => {
      const skillData = specializedSkills.find(
        (skill) => skill.name === subSkillName,
      );
      return skillData ? skillData.position : { x: 0, y: 0 }; // Fallback position
    });
  };

  // Precompute sub-skill positions for expanded categories (memoized for perf and stability during animations)
  const expandedPositions = useMemo(() => {
    const map = new Map<string, { x: number; y: number }[]>();
    expandedCategories.forEach((categoryId) => {
      const positions = getSubSkillPositions(categoryId);
      map.set(categoryId, positions);
    });
    return map;
  }, [skillCategories, skills]);

  // Compute dynamic positioning and viewBox to ensure all expanded content is fully visible
  useEffect(() => {
    const halfWidth = OUTER_HEX_SIZE; // Approximate hex half-width
    const halfHeight = (Math.sqrt(3) / 2) * OUTER_HEX_SIZE; // ~66.68
    const padding = 40; // Increased padding for better visibility

    let minLeft = Infinity;
    let maxRight = -Infinity;
    let minTop = Infinity;
    let maxBottom = -Infinity;

    // Calculate bounds for all parent hexagons
    skillCategories.forEach((category) => {
      minLeft = Math.min(minLeft, category.position.x - halfWidth);
      maxRight = Math.max(maxRight, category.position.x + halfWidth);
      minTop = Math.min(minTop, category.position.y - halfHeight);
      maxBottom = Math.max(maxBottom, category.position.y + halfHeight);
    });

    // Calculate bounds for all expanded children
    expandedCategories.forEach((categoryId) => {
      const parentCategory = skillCategories.find((c) => c.id === categoryId);
      if (!parentCategory) return;

      const positions = getSubSkillPositions(categoryId);

      for (const p of positions) {
        minLeft = Math.min(minLeft, p.x - halfWidth);
        maxRight = Math.max(maxRight, p.x + halfWidth);
        minTop = Math.min(minTop, p.y - halfHeight);
        maxBottom = Math.max(maxBottom, p.y + halfHeight);
      }

      // Consider the connector line extents for specific categories
      // For commercial, consider the connector line extent
      if (categoryId === "commercial" && positions[2]) {
        const lineEndX = positions[2].x;
        maxRight = Math.max(maxRight, lineEndX + halfWidth);
      }

      // For operations, consider the connector line extent
      if (categoryId === "operations" && positions[1]) {
        const lineEndX = positions[1].x;
        const lineEndY = positions[1].y;
        maxRight = Math.max(maxRight, lineEndX + halfWidth);
        maxBottom = Math.max(maxBottom, lineEndY + halfHeight);
      }

      // For strategic, consider the connector line extent
      if (categoryId === "strategic" && positions[1]) {
        const lineEndX = positions[1].x;
        const lineEndY = positions[1].y;
        maxRight = Math.max(maxRight, lineEndX + halfWidth);
        maxBottom = Math.max(maxBottom, lineEndY + halfHeight);
      }

      // For technology, consider the connector line extent
      if (categoryId === "technology" && positions[1]) {
        const lineEndX = positions[1].x;
        const lineEndY = positions[1].y;
        minLeft = Math.min(minLeft, lineEndX - halfWidth);
      }

      // For stakeholder, consider the connector line extent
      if (categoryId === "stakeholder" && positions[0]) {
        const lineEndX = positions[0].x;
        const lineEndY = positions[0].y;
        minLeft = Math.min(minLeft, lineEndX - halfWidth);
        minTop = Math.min(minTop, lineEndY - halfHeight);
      }
    });

    // Calculate required viewBox dimensions with padding
    const requiredWidth = maxRight - minLeft + 2 * padding;
    const requiredHeight = maxBottom - minTop + 2 * padding;

    // Ensure minimum dimensions
    const finalWidth = Math.max(600, requiredWidth);
    const finalHeight = Math.max(600, requiredHeight);

    // Calculate viewBox position to center the content
    const viewBoxX = minLeft - padding - (finalWidth - requiredWidth) / 2;
    const viewBoxY = minTop - padding - (finalHeight - requiredHeight) / 2;

    // Calculate any additional offset needed for optimal positioning
    let newOffsetX = 0;
    let newOffsetY = 0;

    // If content is too far right/left, shift it
    const contentCenterX = (minLeft + maxRight) / 2;
    const viewBoxCenterX = viewBoxX + finalWidth / 2;
    if (Math.abs(contentCenterX - viewBoxCenterX) > 50) {
      newOffsetX = viewBoxCenterX - contentCenterX;
    }

    // If content is too far up/down, shift it
    const contentCenterY = (minTop + maxBottom) / 2;
    const viewBoxCenterY = viewBoxY + finalHeight / 2;
    if (Math.abs(contentCenterY - viewBoxCenterY) > 50) {
      newOffsetY = viewBoxCenterY - contentCenterY;
    }

    setViewBox({
      x: viewBoxX,
      y: viewBoxY,
      width: finalWidth,
      height: finalHeight,
    });
    setOffsetX(newOffsetX);
    setOffsetY(newOffsetY);
  }, [skillCategories]);

  // Helper function to check if a category line should be active
  const getCategoryLineActiveState = (categoryId: string) => {
    // Check if ANY sub-skill in the category is active for the current entity
    const parentCategory = skillCategories.find((cat) => cat.id === categoryId);
    const hasAnyActiveSubSkill =
      parentCategory?.subSkills?.some((subSkillName) => {
        const subSkillData = skills.find(
          (skill) => skill.name === subSkillName,
        );
        return subSkillData ? getSkillActiveState(subSkillData) : false;
      }) || false;

    // Also check if the parent category is active
    const categoryMapping: Record<string, string> = {
      safety: "safety",
      commercial: "commercial",
      operations: "operations",
      strategic: "strategic-leadership",
      technology: "technology-innovation",
      stakeholder: "stakeholder-regulatory",
    };

    const parentCategoryId = categoryMapping[categoryId];
    const parentCategoryData = skills.find(
      (skill) => skill.id === parentCategoryId,
    );
    const isParentCategoryActive = parentCategoryData
      ? getSkillActiveState(parentCategoryData)
      : false;

    // Line is active if parent category is active AND any sub-skill is active
    return isParentCategoryActive && hasAnyActiveSubSkill;
  };

  // Helper function to check if a sub-skill is active based on current entity filter
  const getSubSkillActiveState = (subSkillName: string, categoryId: string) => {
    const subSkillData = skills.find((skill) => skill.name === subSkillName);
    if (!subSkillData) return false;

    // Check if the sub-skill itself is active for the current entity
    const isSubSkillActive = getSkillActiveState(subSkillData);

    // Also check if the parent category is active for the current entity
    const categoryMapping: Record<string, string> = {
      safety: "safety",
      commercial: "commercial",
      operations: "operations",
      strategic: "strategic-leadership",
      technology: "technology-innovation",
      stakeholder: "stakeholder-regulatory",
    };

    const parentCategoryId = categoryMapping[categoryId];
    const parentCategoryData = skills.find(
      (skill) => skill.id === parentCategoryId,
    );
    const isParentCategoryActive = parentCategoryData
      ? getSkillActiveState(parentCategoryData)
      : false;

    // Line should only be active if BOTH parent category AND sub-skill are active
    return isSubSkillActive && isParentCategoryActive;
  };

  // Helper function to create standardized 58px line with endpoint circle
  const createStandardizedLine = (
    start: { x: number; y: number },
    end: { x: number; y: number },
    key: string,
    isActive: boolean = true,
  ) => {
    // Calculate direction vector
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Normalize to exactly 58px length
    const normalizedX = (dx / distance) * 58;
    const normalizedY = (dy / distance) * 58;

    // Calculate actual end point
    const actualEnd = {
      x: start.x + normalizedX,
      y: start.y + normalizedY,
    };

    // Dynamic styling based on active state
    const lineColor = isActive ? "#999999" : "#D0D0D0"; // Light grey for inactive lines
    const circleColor = isActive ? "#999999" : "#D0D0D0"; // Light grey for inactive circles
    const opacity = isActive ? 1 : 0.6; // Slightly reduce opacity for inactive lines

    return (
      <g key={key} style={{ opacity }}>
        <line
          x1={start.x}
          y1={start.y}
          x2={actualEnd.x}
          y2={actualEnd.y}
          stroke={lineColor}
          strokeWidth="2"
        />
        <circle cx={actualEnd.x} cy={actualEnd.y} r="5" fill={circleColor} />
      </g>
    );
  };

  const renderConnectingLines = () => {
    // Always render connecting lines since honeycomb is always expanded
    return (
      <g
        className="connecting-lines"
        width="450"
        height="490"
        key={`lines-${activeEntity}`} // Force re-render when entity changes
        style={{
          transform: "translate(-225px, -245px)", // Center the 450x490 container
          transformOrigin: "center center",
        }}
      >
        <rect
          x="0"
          y="0"
          width="450"
          height="490"
          fill="transparent"
          stroke="transparent"
        />
        <g transform="translate(225, 245)">
          {" "}
          {/* Re-center the content within the container */}
          {Array.from(expandedCategories).map((categoryId) => {
            const parentCategory = skillCategories.find(
              (cat) => cat.id === categoryId,
            );
            if (!parentCategory?.subSkills) return null;

            const subSkillPositions = expandedPositions.get(categoryId) || [];
            return (
              <g key={`${categoryId}-lines-${activeEntity}`}>
                {renderCategoryLines(
                  parentCategory,
                  subSkillPositions,
                  categoryId,
                )}
              </g>
            );
          })}
        </g>
      </g>
    );
  };

  const renderCategoryLines = (
    parentCategory: any,
    subSkillPositions: any[],
    categoryId: string,
  ) => {
    if (categoryId === "safety") {
      const subPos = subSkillPositions[0];
      if (!subPos) return null;

      const isActive = getCategoryLineActiveState(categoryId);

      const start = getHexEdgeIntersection(parentCategory.position, subPos);
      return createStandardizedLine(start, subPos, `safety-lines`, isActive);
    }

    if (categoryId === "commercial") {
      const subPos = subSkillPositions[2]; // Connect to 'Commercial and financial acumen' (index 2)
      if (!subPos) return null;

      const isActive = getCategoryLineActiveState(categoryId);

      const start = getHexEdgeIntersection(parentCategory.position, subPos);
      return createStandardizedLine(
        start,
        subPos,
        `commercial-lines`,
        isActive,
      );
    }

    if (categoryId === "operations") {
      const subPos = subSkillPositions[3]; // Connect to 'Global team leadership' (index 3)
      if (!subPos) return null;

      const isActive = getCategoryLineActiveState(categoryId);

      // Force use of edge 1 (right bottom edge) for Operations
      const start = getHexEdgeIntersection(
        parentCategory.position,
        subPos,
        OUTER_HEX_SIZE,
        HEX_ROTATION_DEG,
        1,
      );
      return createStandardizedLine(
        start,
        subPos,
        `operations-lines`,
        isActive,
      );
    }

    if (categoryId === "strategic") {
      const subPos = subSkillPositions[4]; // Connect to 'Cross functional collaboration' (index 4)
      if (!subPos) return null;

      const isActive = getCategoryLineActiveState(categoryId);

      // Force use of edge 2 (bottom center edge) for Strategic leadership
      const start = getHexEdgeIntersection(
        parentCategory.position,
        subPos,
        OUTER_HEX_SIZE,
        HEX_ROTATION_DEG,
        2,
      );
      return createStandardizedLine(start, subPos, `strategic-lines`, isActive);
    }

    if (categoryId === "technology") {
      const subPos = subSkillPositions[1]; // Connect to 'Digital transformation and technology implementation' (index 1)
      if (!subPos) return null;

      const isActive = getCategoryLineActiveState(categoryId);

      const start = getHexEdgeIntersection(parentCategory.position, subPos);
      return createStandardizedLine(
        start,
        subPos,
        `technology-lines`,
        isActive,
      );
    }

    if (categoryId === "stakeholder") {
      const subPos = subSkillPositions[0]; // Connect to 'Stakeholder and partnership management' (index 0)
      if (!subPos) return null;

      const isActive = getCategoryLineActiveState(categoryId);

      const start = getHexEdgeIntersection(parentCategory.position, subPos);
      return createStandardizedLine(
        start,
        subPos,
        `stakeholder-lines`,
        isActive,
      );
    }

    // This should never be reached since all categories are explicitly handled above
    return null;
  };

  return (
    <>
      <SkillModal
        skill={selectedSkill}
        onClose={() => {
          setSelectedSkill(null);
          setModalOpener(null);
        }}
        opener={modalOpener}
        skillsData={skills}
        entitiesData={entities}
      />
      <div
        className="relative w-full mx-auto h-[1000px] sm:h-[500px] lg:h-[1000px] overflow-hidden"
        style={{ maxWidth: "100vw" }}
      >
        <svg
          viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
          className="w-full h-full transition-all duration-500 ease-in-out"
          style={{ overflow: "hidden" }}
          preserveAspectRatio="xMidYMid meet"
        >
          <rect
            x={viewBox.x}
            y={viewBox.y}
            width={viewBox.width}
            height={viewBox.height}
            fill="transparent"
          />

          <g
            transform={`translate(${offsetX}, ${offsetY})`}
            className="transition-transform duration-500 ease-in-out"
          >
            {/* Main hexagons (below connectors and close buttons) */}
            {skillCategories.map((category) => {
              const isHovered = hoveredCategory === category.id;
              const isExpanded = expandedCategories.has(category.id);
              const isActive = isCategoryActive(category.id);
              // Core skills and center are non-clickable in always-expanded state
              const isClickable = false;

              return (
                <g key={category.id}>
                  <FigmaHexagon
                    label={category.label}
                    position={category.position}
                    type={category.type}
                    isHovered={isHovered && isActive}
                    isExpanded={isExpanded}
                    onClick={(e) => {
                      e.stopPropagation();
                      // No action - core skills are non-clickable
                    }}
                    onMouseEnter={() =>
                      isActive && handleHexagonHover(category.id)
                    }
                    onMouseLeave={() => handleHexagonHover(null)}
                    isClickable={isClickable}
                    rotationDeg={HEX_ROTATION_DEG}
                    isDisabled={!isActive}
                  />
                </g>
              );
            })}

            {/* Connecting lines (without close buttons since always expanded) */}
            {renderConnectingLines()}

            {/* Expanded sub-skill hexagons for all expanded categories */}
            {Array.from(expandedCategories).map((categoryId) => {
              const parentCategory = skillCategories.find(
                (cat) => cat.id === categoryId,
              );
              if (!parentCategory?.subSkills) return null;

              const subSkillPositions = expandedPositions.get(categoryId) || [];

              return (
                <g
                  key={`${categoryId}-subskills`}
                  className="animate-in fade-in duration-300"
                >
                  {parentCategory.subSkills.map((subSkill, index) => {
                    if (parentCategory.id === "safety" && index > 0)
                      return null;

                    // Check if this specific sub-skill is active for the current entity
                    const subSkillData = skills.find(
                      (skill) => skill.name === subSkill,
                    );
                    const isSubSkillActive = subSkillData
                      ? getSkillActiveState(subSkillData)
                      : false;
                    const isHovered =
                      hoveredCategory === `${categoryId}-${index}`;

                    return (
                      <FigmaHexagon
                        key={`${categoryId}-${index}`}
                        label={subSkill}
                        position={subSkillPositions[index]}
                        type="secondary"
                        isHovered={isHovered && isSubSkillActive}
                        isExpanded={false}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isSubSkillActive) {
                            handleSubSkillClick(
                              subSkill,
                              categoryId,
                              e.currentTarget as HTMLElement,
                            );
                          }
                        }}
                        onMouseEnter={() =>
                          isSubSkillActive &&
                          handleHexagonHover(`${categoryId}-${index}`)
                        }
                        onMouseLeave={() => handleHexagonHover(null)}
                        isClickable={isSubSkillActive}
                        rotationDeg={HEX_ROTATION_DEG}
                        isDisabled={!isSubSkillActive}
                      />
                    );
                  })}
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </>
  );
}