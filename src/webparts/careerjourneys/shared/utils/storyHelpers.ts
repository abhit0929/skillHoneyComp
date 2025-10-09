/**
 * Simple Success Story Helpers (following skillsData.ts pattern)
 */

import { getSkillName, getSkillEntity, getDepartmentEntity } from  '../../shared/utils/skillsDataAccess'
import type { DetailedSuccessStory, CareerPathStep } from '../../shared/types/unified-data';

/**
 * Get skill name for display (simple function)
 */
export const getSkillDisplayName = (skillId: string): string => {
  return getSkillName(skillId);
};

/**
 * Get category name for display
 */
export const getCategoryDisplayName = (categoryId: string): string => {
  return getSkillName(categoryId);
};

/**
 * Get entity info for department
 */
export const getDepartmentInfo = (department: string) => {
  const entity = getDepartmentEntity(department);
  return {
    name: entity?.name || department,
    color: entity?.color || '#000000',
    textColor: entity?.textColor || '#FFFFFF'
  };
};

/**
 * Get primary entity info for story
 */
export const getPrimaryEntityInfo = (entityId?: string) => {
  if (!entityId) return null;
  const entity = getSkillEntity(entityId);
  return entity ? {
    name: entity.name,
    color: entity.color,
    textColor: entity.textColor
  } : null;
};

/**
 * Simple function to get enriched career step
 */
export const enrichCareerStep = (step: CareerPathStep) => {
  const deptInfo = getDepartmentInfo(step.department);
  return {
    ...step,
    departmentName: deptInfo.name,
    departmentColor: deptInfo.color,
    departmentTextColor: deptInfo.textColor
  };
};