/**
 * FFE Domain - Fire Fighting Equipment Requirements
 * Exports all FFE-related requirement functions
 */

import { getFFEEquipmentRequirements } from './equipment.js';
import { getFFEDetectionRequirements } from './detection.js';
import { getFFETrainingRequirements } from './training.js';
import { getFFEProceduresRequirements } from './procedures.js';
import { getFFECertificatesRequirements } from './certificates.js';
import { getFFEDocumentationRequirements } from './documentation.js';
import { getFFERiskAssessmentRequirements } from './riskAssessments.js';

// Re-export all functions
export {
  getFFEEquipmentRequirements,
  getFFEDetectionRequirements,
  getFFETrainingRequirements,
  getFFEProceduresRequirements,
  getFFECertificatesRequirements,
  getFFEDocumentationRequirements,
  getFFERiskAssessmentRequirements
};

/**
 * Main FFE requirements aggregator
 * Combines equipment and detection requirements
 */
export function getFFERequirements(vessel) {
  return [
    ...getFFEEquipmentRequirements(vessel),
    ...getFFEDetectionRequirements(vessel)
  ];
}