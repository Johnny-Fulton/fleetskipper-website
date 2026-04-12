/**
 * Drills Domain Aggregator
 * Following Domain Spine v2 architecture pattern
 * Main entry point for drill requirements
 */

import { generateDrillRequirements, DRILL_TYPES, COMPLIANCE_LEVELS } from './requirements.js';

/**
 * Get drill requirements for a vessel
 * This is the main export that matches the existing getDrillRequirements function
 * @param {Object} vesselConfig - Vessel configuration
 * @param {Object} equipmentRegister - Optional equipment register for cross-reference
 * @returns {Object} Map of drill type to requirement
 */
export function getDrillRequirements(vesselConfig, equipmentRegister = null) {
  return generateDrillRequirements(vesselConfig, equipmentRegister);
}

/**
 * Get drill frequency in days (legacy compatibility)
 * @param {string} drillType - Type of drill
 * @param {Object} vesselConfig - Vessel configuration
 * @returns {number|null} Frequency in days or null if not applicable
 */
export function getDrillFrequencyDays(drillType, vesselConfig) {
  const requirements = getDrillRequirements(vesselConfig);
  return requirements[drillType]?.frequency_days || null;
}

/**
 * Check if drill is required for vessel
 * @param {Object} vesselConfig - Vessel configuration
 * @param {string} drillType - Type of drill
 * @returns {boolean} True if drill is required
 */
export function isDrillRequired(vesselConfig, drillType) {
  const requirements = getDrillRequirements(vesselConfig);
  return requirements[drillType]?.compliance_level === COMPLIANCE_LEVELS.REQUIRED;
}

/**
 * Get compliance status for drill
 * @param {Object} vesselConfig - Vessel configuration
 * @param {string} drillType - Type of drill
 * @returns {Object|null} Drill requirement or null
 */
export function getDrillComplianceStatus(vesselConfig, drillType) {
  const requirements = getDrillRequirements(vesselConfig);
  return requirements[drillType] || null;
}

/**
 * Get all applicable drill types for vessel
 * @param {Object} vesselConfig - Vessel configuration
 * @returns {Array<string>} Array of drill types
 */
export function getApplicableDrillTypes(vesselConfig) {
  const requirements = getDrillRequirements(vesselConfig);
  return Object.keys(requirements).filter(key => !key.startsWith('_')); // Filter out info entries
}

/**
 * Get human-readable requirement description
 * @param {Object} requirement - Drill requirement object
 * @returns {string} Human-readable description
 */
export function getRequirementDescription(requirement) {
  if (!requirement) return 'Not Required';
  
  const { frequency_days, compliance_level } = requirement;
  const interval = frequency_days <= 30 ? 'Monthly' : 
                  frequency_days <= 90 ? 'Quarterly' : 'Bi-Annually';
  
  return `${compliance_level} ${interval}`;
}

/**
 * Legacy requirement levels (for backward compatibility)
 */
export const DRILL_REQUIREMENTS = {
  REQUIRED_MONTHLY: 'required_monthly',
  REQUIRED_QUARTERLY: 'required_quarterly', 
  RECOMMENDED_MONTHLY: 'recommended_monthly',
  RECOMMENDED_QUARTERLY: 'recommended_quarterly',
  NOT_REQUIRED: 'not_required'
};

/**
 * Convert new compliance data to legacy format (for existing components)
 * @param {Object} requirement - Drill requirement object
 * @returns {string} Legacy requirement level
 */
export function getLegacyRequirement(requirement) {
  if (!requirement) return DRILL_REQUIREMENTS.NOT_REQUIRED;
  
  const { frequency_days, compliance_level } = requirement;
  
  if (compliance_level === COMPLIANCE_LEVELS.REQUIRED) {
    return frequency_days <= 30 ? DRILL_REQUIREMENTS.REQUIRED_MONTHLY : DRILL_REQUIREMENTS.REQUIRED_QUARTERLY;
  } else if (compliance_level === COMPLIANCE_LEVELS.RECOMMENDED) {
    return frequency_days <= 30 ? DRILL_REQUIREMENTS.RECOMMENDED_MONTHLY : DRILL_REQUIREMENTS.RECOMMENDED_QUARTERLY;
  }
  
  return DRILL_REQUIREMENTS.NOT_REQUIRED;
}

// Re-export core constants for external use
export { DRILL_TYPES, COMPLIANCE_LEVELS } from './requirements.js';

// Export the main generator function with a more domain-specific name
export { generateDrillRequirements } from './requirements.js';

/**
 * Main drills requirements aggregator
 * This matches the pattern used by other domains like LSA and FFE
 * @param {Object} vessel - Vessel configuration
 * @returns {Array} Array of drill requirements (for consistency with other domains)
 */
export function getDrillsRequirements(vessel) {
  const requirementsMap = getDrillRequirements(vessel);
  
  // Convert map to array format for consistency with other domains
  return Object.entries(requirementsMap)
    .filter(([key]) => !key.startsWith('_')) // Filter out info entries
    .map(([drillType, requirement]) => ({
      ...requirement,
      id: `drill_${drillType}`,
      type: 'drill',
      domain: 'drills'
    }));
}

// Default export for module
export default {
  getDrillRequirements,
  getDrillsRequirements,
  generateDrillRequirements,
  getDrillFrequencyDays,
  isDrillRequired,
  getDrillComplianceStatus,
  getApplicableDrillTypes,
  getRequirementDescription,
  getLegacyRequirement,
  DRILL_TYPES,
  COMPLIANCE_LEVELS,
  DRILL_REQUIREMENTS
};