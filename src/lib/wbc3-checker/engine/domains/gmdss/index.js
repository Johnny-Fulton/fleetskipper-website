/**
 * GMDSS Domain Index
 * Barrel export for all GMDSS requirements
 */

export { getGMDSSEquipmentRequirements } from './equipment.js';
export { getGMDSSDocumentationRequirements } from './documentation.js';
export { getGMDSSTrainingRequirements } from './training.js';
export { getGMDSSProceduresRequirements } from './procedures.js';

// Convenience function to get all GMDSS requirements
export { getGMDSSEquipmentRequirements as getGMDSSRequirements } from './equipment.js';