/**
 * Navigation Domain - Navigation Equipment and Documentation Requirements
 * Exports all navigation-related requirement functions
 */

import { getNavigationEquipmentRequirements } from './equipment.js';
import { getNavigationDocumentationRequirements } from './documentation.js';
import { getNavigationTrainingRequirements } from './training.js';
import { getNavigationProceduresRequirements } from './procedures.js';
import { getNavigationRiskAssessmentRequirements } from './riskAssessments.js';

// Re-export all functions
export {
  getNavigationEquipmentRequirements,
  getNavigationDocumentationRequirements,
  getNavigationTrainingRequirements,
  getNavigationProceduresRequirements,
  getNavigationRiskAssessmentRequirements
};

/**
 * Main navigation requirements aggregator
 * Returns equipment requirements (called from mainIndex as areaCategoryEquipment)
 */
export function getNavigationRequirements(vessel) {
  // For backward compatibility, this returns equipment only
  // Other navigation requirements are called separately
  return getNavigationEquipmentRequirements(vessel);
}

/**
 * Get all navigation domain requirements
 * Useful for getting everything navigation-related
 */
export function getAllNavigationRequirements(vessel) {
  return {
    equipment: getNavigationEquipmentRequirements(vessel),
    documentation: getNavigationDocumentationRequirements(vessel),
    training: getNavigationTrainingRequirements(vessel),
    procedures: getNavigationProceduresRequirements(vessel),
    riskAssessments: getNavigationRiskAssessmentRequirements(vessel)
  };
}