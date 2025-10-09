/**
 * Skills Data Access - Simple utility functions
 * 
 * Helper functions to work with skillsData.ts as single source of truth
 */

import { skillsData } from '../../../selfEvaluation/data/skillsData';

// =============================================================================
// BASIC DATA ACCESS (like skillsData.ts style)
// =============================================================================

/**
 * Get skill entity by ID
 */
export const getSkillEntity = (id: string) => {
  return skillsData.entities.find(entity => entity.id === id);
};

/**
 * Get skill by ID
 */
export const getSkill = (id: string) => {
  return skillsData.skills.find(skill => skill.id === id);
};

/**
 * Get skill name by ID
 */
export const getSkillName = (id: string): string => {
  const skill = getSkill(id);
  return skill?.name || id;
};

/**
 * Get specialized skills for a category
 */
export const getSubSkills = (categoryId: string) => {
  return skillsData.skills.filter(skill => 
    skill.type === 'specialized' && skill.category === categoryId
  );
};

// =============================================================================
// DEPARTMENT MAPPING (simple and clear)
// =============================================================================

/**
 * Department name to entity ID mapping
 */
export const departmentMap = {
  "Castrol": "castrol",
  "FS&M": "fsm", 
  "Aviation": "aviation",
  "M&C": "mc",
  "Pulse": "pulse",
  "Tech": "tech",
  "Finance": "finance",
  "Procurement": "procurement",
  "Biofuels": "biofuels",
  "All C&P entities": "all",
  "Marketing": "marketing",
  "Outside C&P": "outsidecp",
  "Outside bp": "outsidebp",
  "NA": ""
} as const;

/**
 * Get entity data for department name
 */
export const getDepartmentEntity = (department: string) => {
  const entityId = departmentMap[department as keyof typeof departmentMap];
  
  // Handle "NA" department - return a fallback entity with gray colors
  if (department === "NA" || !entityId) {
    return {
      id: "na",
      name: "NA", 
      color: "#BBBBBB",
      textColor: "#000000"
    };
  }
  
  return getSkillEntity(entityId) || getSkillEntity('all');
};

// =============================================================================
// SIMPLE VALIDATION (no complex types)
// =============================================================================

/**
 * Check if skill exists
 */
export const skillExists = (skillId: string): boolean => {
  return !!getSkill(skillId);
};

/**
 * Check if entity exists  
 */
export const entityExists = (entityId: string): boolean => {
  return !!getSkillEntity(entityId);
};
