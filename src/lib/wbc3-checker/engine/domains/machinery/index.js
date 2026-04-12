/**
 * Machinery Domain Aggregator
 * Following anchor mode modular pattern
 * Combines all machinery sub-modules into a single export
 */

import { getMachineryEquipmentRequirements } from './equipment.js';
import { getMachineryDocumentationRequirements } from './documentation.js';

/**
 * Get all machinery requirements for a vessel
 * @param {Object} vessel - Vessel configuration
 * @returns {Array} Combined machinery requirements
 */
export function getMachineryRequirements(vessel) {
  return [
    ...getMachineryEquipmentRequirements(vessel),
    ...getMachineryDocumentationRequirements(vessel)
  ];
}

// Export individual functions for specific needs
export {
  getMachineryEquipmentRequirements,
  getMachineryDocumentationRequirements
};