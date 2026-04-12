/**
 * WBC3 Vessel Requirements Checker
 *
 * Standalone tool that determines equipment, documentation, training, and
 * certification requirements for UK workboats under Workboat Code Edition 3.
 *
 * Public API:
 *   checkVesselRequirements(input)  — Run the full requirements check
 *   getQuestionnaireSchema()        — Get the input schema for building a UI
 *   getNextQuestions(partialInput)   — Progressive disclosure: what to ask next
 */

import { getInputSchema } from './schema/inputSchema.js';
import { validateInput, evaluateCondition } from './schema/inputValidator.js';
import { getHardcodedVesselRequirements } from './engine/mainEngine.js';

const ENGINE_VERSION = '1.0.0';
const WBC3_EDITION = '3';

/**
 * Check vessel requirements against WBC3.
 *
 * @param {Object} vesselInput - User's answers (see inputSchema.js for field definitions)
 * @returns {{ success: boolean, data?: Object, warnings?: Array, errors?: Array }}
 */
export function checkVesselRequirements(vesselInput) {
  // Step 1: Validate input
  const validation = validateInput(vesselInput);
  if (!validation.isValid) {
    return {
      success: false,
      errors: validation.errors,
      warnings: validation.warnings,
    };
  }

  // Step 2: Run the engine
  const rawRequirements = getHardcodedVesselRequirements(validation.normalizedInput);

  // Step 3: Add metadata and summary
  const data = {
    _meta: {
      engineVersion: ENGINE_VERSION,
      wbc3Edition: WBC3_EDITION,
      generatedAt: new Date().toISOString(),
      vesselSummary: {
        name: vesselInput.vesselName,
        type: vesselInput.vesselType,
        category: vesselInput.category,
        lengthOverall: vesselInput.lengthOverall,
        grossTonnage: vesselInput.grossTonnage,
        maxPersons: vesselInput.maxPersons,
        gmdssSeaArea: vesselInput.gmdssSeaArea,
        propulsion: vesselInput.propulsionConfiguration,
      },
    },

    // Pass through all requirement categories from the engine
    ...rawRequirements,

    // Aggregated summary for UI display
    summary: buildSummary(rawRequirements),
  };

  return {
    success: true,
    data,
    warnings: validation.warnings,
  };
}

/**
 * Get the input schema definition.
 * The web orchestrator uses this to build the questionnaire UI.
 *
 * @returns {Object} Schema with sections and fields
 */
export function getQuestionnaireSchema() {
  return getInputSchema();
}

/**
 * Get the next questions to show based on answers so far.
 * Enables progressive disclosure in the UI.
 *
 * @param {Object} partialInput - Answers provided so far
 * @returns {{ nextQuestions: Array, completionPercentage: number, answeredCount: number, totalCount: number }}
 */
export function getNextQuestions(partialInput) {
  const schema = getInputSchema();
  const input = partialInput || {};

  const allFieldKeys = Object.keys(schema.fields);
  const answered = allFieldKeys.filter(k => input[k] !== undefined && input[k] !== null);
  const unanswered = [];

  for (const [key, fieldDef] of Object.entries(schema.fields)) {
    if (answered.includes(key)) continue;

    // Check if this field's condition is met
    if (fieldDef.conditional) {
      if (!evaluateCondition(fieldDef.conditional, input)) continue;
    }

    unanswered.push({
      key,
      ...fieldDef,
    });
  }

  // Sort by section order, then field order
  const sectionOrder = {};
  for (const s of schema.sections) {
    sectionOrder[s.id] = s.order;
  }
  unanswered.sort((a, b) => {
    const sectionDiff = (sectionOrder[a.section] || 99) - (sectionOrder[b.section] || 99);
    if (sectionDiff !== 0) return sectionDiff;
    return (a.order || 99) - (b.order || 99);
  });

  // Count how many applicable fields there are (for percentage)
  const applicableCount = answered.length + unanswered.length;

  return {
    nextQuestions: unanswered,
    completionPercentage: applicableCount > 0
      ? Math.round((answered.length / applicableCount) * 100)
      : 0,
    answeredCount: answered.length,
    totalCount: applicableCount,
  };
}

// ============================================================================
// Internal helpers
// ============================================================================

function buildSummary(requirements) {
  const categories = [
    'basicEquipment', 'basicCertificates', 'basicDocumentation',
    'equipment', 'areaCategoryEquipment',
    'training', 'procedures', 'certificates', 'documentation',
    'riskAssessments', 'assessments', 'crewCertificationByArea', 'restrictions',
  ];

  let totalRequirements = 0;
  let mandatoryCount = 0;
  let recommendedCount = 0;
  const byCategory = {};

  for (const cat of categories) {
    const items = requirements[cat];
    if (!Array.isArray(items)) {
      byCategory[cat] = 0;
      continue;
    }
    byCategory[cat] = items.length;
    totalRequirements += items.length;
    for (const item of items) {
      if (item.mandatory === true) mandatoryCount++;
      else recommendedCount++;
    }
  }

  return {
    totalRequirements,
    mandatoryCount,
    recommendedCount,
    byCategory,
  };
}
