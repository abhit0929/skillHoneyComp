/**
 * Simple types for Success Stories (following skillsData.ts pattern)
 */

// Basic types
export type ProficiencyLevel = "Basic" | "Intermediate" | "Advanced" | "Excellent";
export type MovementType = "Lateral" | "Vertical";
export type Department =
  | "Castrol"
  | "FS&M"
  | "Aviation"
  | "M&C"
  | "Pulse"
  | "Tech"
  | "Finance"
  | "Procurement"
  | "Biofuels"
  | "All C&P entities"
  | "Marketing"
  | "Outside C&P"
  | "Outside bp"
  | "NA";

// Simple skill reference (just ID and proficiency)
export interface SkillReference {
  skillId: string;
  proficiencyLevel: ProficiencyLevel;
}

// Simple skill category reference
export interface SkillCategoryReference {
  categoryId: string;
  ratings: string;
  skills: SkillReference[];
}

// Career path step
export interface CareerPathStep {
  role: string;
  description: string;
  department: Department;
  countryMobility: "Yes" | "No";
  movementType: MovementType;
  learningMilestones: string;
  position?: { x: number; y: number };
  hexOffset?: { x: number; y: number };
  badgeOffset?: { x: number; y: number };
}

// Success story for list view
export interface SuccessStoryListItem {
  id: string;
  name: string;
  careerJourney: string;
  description: string;
  imageUrl?: string;
  primaryEntityId?: string;
}

// Detailed success story
export interface DetailedSuccessStory {
  id: string;
  name: string;
  careerJourney: string;
  testimonial: string;
  quote: string;
  imageUrl?: string;
  primaryEntityId?: string;
  skillsBackpack: SkillCategoryReference[];
  careerPath: CareerPathStep[];
}
