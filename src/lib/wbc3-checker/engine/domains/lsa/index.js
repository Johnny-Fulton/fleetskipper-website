/**
 * LSA (Life-Saving Appliances) Domain Aggregator
 * Following anchor mode modular pattern
 * Combines all LSA sub-modules into a single export
 */

import { getLSAEquipmentRequirements } from './equipment.js';
import { getLSADocumentationRequirements } from './documentation.js';
import { getLSADrillsRequirements } from './drills.js';

/**
 * Get all LSA requirements for a vessel
 * @param {Object} vessel - Vessel configuration
 * @returns {Array} Combined LSA requirements
 */
export function getLSARequirements(vessel) {
  return [
    ...getLSAEquipmentRequirements(vessel),
    ...getLSADocumentationRequirements(vessel),
    ...getLSADrillsRequirements(vessel)
  ];
}

// Export individual functions for specific needs
export {
  getLSAEquipmentRequirements,
  getLSADocumentationRequirements,
  getLSADrillsRequirements
};