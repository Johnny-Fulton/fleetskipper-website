/**
 * WBC3 Vessel Requirements Checker — Output Schema
 *
 * Documents the structure returned by checkVesselRequirements().
 * This file is informational — the web orchestrator uses it to understand
 * what data the engine returns and how to display it.
 */

/**
 * @typedef {Object} RequirementItem
 * @property {string} name - Human-readable requirement name
 * @property {string} [id] - Unique identifier (when available)
 * @property {string} category - Domain/classification grouping
 * @property {string} reference - WBC3 or regulatory reference (e.g., 'WBC3 16.3.1.3.1')
 * @property {string} [source] - Alternative reference field (some domains use 'source' instead)
 * @property {boolean} mandatory - true = mandatory under WBC3, false = recommended/guidance
 * @property {string} description - What the requirement is and why
 * @property {string} [type] - Requirement type: equipment | documentation | training | certificate | procedure | risk_assessment
 * @property {number} [qtyRequired] - Quantity required (for equipment items)
 * @property {string} [location] - Physical location (for space-specific items)
 */

/**
 * @typedef {Object} RequirementsOutput
 * @property {Object} _meta - Engine metadata
 * @property {string} _meta.engineVersion - Package version
 * @property {string} _meta.wbc3Edition - WBC3 edition number
 * @property {string} _meta.generatedAt - ISO timestamp
 * @property {Object} _meta.vesselSummary - Key vessel details
 *
 * @property {RequirementItem[]} basicEquipment - Always-required equipment (all vessels)
 * @property {RequirementItem[]} basicCertificates - Always-required certificates
 * @property {RequirementItem[]} basicDocumentation - Always-required documentation
 * @property {RequirementItem[]} equipment - Conditional equipment (FFE, GMDSS, LSA, electrical, etc.)
 * @property {RequirementItem[]} areaCategoryEquipment - Navigation equipment by area category
 * @property {RequirementItem[]} training - Training requirements
 * @property {RequirementItem[]} procedures - Required procedures and drills
 * @property {RequirementItem[]} certificates - Equipment service certificates
 * @property {RequirementItem[]} documentation - Required documentation
 * @property {RequirementItem[]} riskAssessments - Required risk assessments
 * @property {RequirementItem[]} assessments - Other assessments
 * @property {RequirementItem[]} crewCertificationByArea - Crew certification requirements
 * @property {RequirementItem[]} restrictions - Operational restrictions
 *
 * @property {Object} summary - Aggregated counts
 * @property {number} summary.totalRequirements - Total requirement count
 * @property {number} summary.mandatoryCount - Count of mandatory items
 * @property {number} summary.recommendedCount - Count of recommended/guidance items
 * @property {Object} summary.byCategory - Counts grouped by output category
 */

/**
 * Output category keys and their descriptions
 */
export const OUTPUT_CATEGORIES = {
  basicEquipment: 'Core equipment required for all seagoing vessels',
  basicCertificates: 'Certificates required for all crew/vessels',
  basicDocumentation: 'Documentation required for all vessels',
  equipment: 'Conditional equipment based on vessel configuration',
  areaCategoryEquipment: 'Navigation equipment required by area category',
  training: 'Training and familiarisation requirements',
  procedures: 'Required procedures, drills, and checklists',
  certificates: 'Equipment service and inspection certificates',
  documentation: 'Operational and compliance documentation',
  riskAssessments: 'Required risk assessments',
  assessments: 'Other assessments and surveys',
  crewCertificationByArea: 'Crew training and certification by role/area',
  restrictions: 'Operational restrictions and limitations',
};
