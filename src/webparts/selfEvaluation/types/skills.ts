export interface SkillEntity {
  id: string;
  name: string;
  color: string;
  textColor: string;
}

export interface Skill {
  id: string;
  name: string;
  type: "center" | "core" | "specialized";
  category?: string; // For specialized skills to connect to core skills
  entities: string[]; // Which entities this skill is relevant for
  description?: string;
  subSkillDescription?: string; // Description for specialized skills
  position: { x: number; y: number };
  ring?: number; // 0 = center, 1 = inner ring, 2+ = outer rings
  icon?: string; // For the arrow or other icons
}

export interface SkillsData {
  entities: SkillEntity[];
  skills: Skill[];
}

export interface SkillFilterState {
  activeEntity: string;
  selectedSkill: string | null;
  filteredSkills: Skill[];
}

export interface HexagonPosition {
  x: number;
  y: number;
  ring: number;
  index: number;
}

// Core skill categories that connect to specialized skills
export const CORE_SKILLS = [
  "safety",
  "commercial",
  "operations",
  "strategic-leadership",
  "stakeholder-regulatory",
  "technology-innovation",
] as const;

export type CoreSkillType = (typeof CORE_SKILLS)[number];