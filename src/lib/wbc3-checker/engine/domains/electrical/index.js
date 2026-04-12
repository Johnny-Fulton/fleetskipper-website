/**
 * Electrical Domain Aggregator
 * Following anchor mode modular pattern
 * Combines all electrical sub-modules into a single export
 */

import { getElectricalEquipmentRequirements } from './equipment.js';
import { getElectricalDocumentationRequirements } from './documentation.js';
import { getElectricalProceduresRequirements } from './procedures.js';

/**
 * Get all electrical requirements for a vessel
 * @param {Object} vessel - Vessel configuration
 * @returns {Array} Combined electrical requirements
 */
export function getElectricalRequirements(vessel) {
  return [
    ...getElectricalEquipmentRequirements(vessel),
    ...getElectricalDocumentationRequirements(vessel),
    ...getElectricalProceduresRequirements(vessel)
  ];
}

// Export individual functions for specific needs
export {
  getElectricalEquipmentRequirements,
  getElectricalDocumentationRequirements,
  getElectricalProceduresRequirements
};