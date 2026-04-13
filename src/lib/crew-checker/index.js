/**
 * WBC3 Crew Certification Checker
 *
 * Standalone tool that determines master qualifications, engineering
 * requirements, mandatory training, and medical fitness certificates
 * for UK workboat crew under Workboat Code Edition 3.
 *
 * Public API:
 *   checkCrewRequirements(input)   — Run the full crew certification check
 *   getQuestionnaireSchema()       — Get the input schema for building a UI
 *   getNextQuestions(partialInput)  — Progressive disclosure: what to ask next
 */

import { getInputSchema } from './schema/inputSchema.js';
import { validateInput, evaluateCondition } from './schema/inputValidator.js';
import { getCrewCertificationRequirements } from './engine/crewEngine.js';

const ENGINE_VERSION = '1.0.0';
const WBC3_EDITION = '3';

/**
 * Check crew certification requirements against WBC3.
 *
 * @param {Object} vesselInput - User's answers (see inputSchema.js for field definitions)
 * @returns {{ success: boolean, data?: Object, warnings?: Array, errors?: Array }}
 */
export function checkCrewRequirements(vesselInput) {
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
  const rawRequirements = getCrewCertificationRequirements(validation.normalizedInput);

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
        enginePowerKW: vesselInput.enginePowerKW,
        crewCount: vesselInput.crewCount,
      },
      // Include equipment flags for results page display
      hasRadar: validation.normalizedInput.hasRadar,
      hasElectronicCharts: validation.normalizedInput.hasElectronicCharts,
      hasStabilityBooklet: validation.normalizedInput.hasStabilityBooklet,
      crewPreparesFood: validation.normalizedInput.crewPreparesFood,
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
  let totalRequirements = 0;
  let mandatoryCount = 0;
  let recommendedCount = 0;
  const byCategory = {};

  // Master qualifications
  const masterCerts = requirements.masterQualifications?.acceptableCertificates || [];
  byCategory.masterQualifications = masterCerts.length;
  totalRequirements += masterCerts.length;
  masterCerts.forEach(c => c.mandatory ? mandatoryCount++ : recommendedCount++);

  // Second person
  if (requirements.secondPerson?.required) {
    byCategory.secondPerson = 1;
    totalRequirements += 1;
    mandatoryCount += 1;
  } else {
    byCategory.secondPerson = 0;
  }

  // Engineering
  const engCerts = requirements.engineeringQualifications?.acceptableCertificates || [];
  const engGeneral = requirements.engineeringQualifications?.generalRequirement ? 1 : 0;
  byCategory.engineering = engCerts.length + engGeneral;
  totalRequirements += engCerts.length + engGeneral;
  engCerts.forEach(c => c.mandatory ? mandatoryCount++ : recommendedCount++);
  if (engGeneral) mandatoryCount++;

  // Mandatory training
  const training = requirements.mandatoryTraining || [];
  byCategory.mandatoryTraining = training.length;
  totalRequirements += training.length;
  training.forEach(t => t.mandatory ? mandatoryCount++ : recommendedCount++);

  // Medical fitness
  if (requirements.medicalFitness?.mandatory) {
    byCategory.medicalFitness = 1;
    totalRequirements += 1;
    mandatoryCount += 1;
  } else {
    byCategory.medicalFitness = 0;
  }

  // Special operations
  const specialOps = requirements.specialOperations || [];
  byCategory.specialOperations = specialOps.length;
  totalRequirements += specialOps.length;
  specialOps.forEach(s => s.mandatory ? mandatoryCount++ : recommendedCount++);

  // Single-handed mandatory requirements
  const singleHandedReqs = requirements.singleHanded?.mandatoryRequirements || [];
  byCategory.singleHanded = singleHandedReqs.length;
  totalRequirements += singleHandedReqs.length;
  singleHandedReqs.forEach(s => s.mandatory ? mandatoryCount++ : recommendedCount++);

  // Police alternatives
  const policeAlts = requirements.policeBoatManning?.alternatives || [];
  byCategory.policeAlternatives = policeAlts.length;
  totalRequirements += policeAlts.length;
  policeAlts.forEach(p => p.mandatory ? mandatoryCount++ : recommendedCount++);

  // Manning documents
  const manningDocs = requirements.manningDocuments || [];
  byCategory.manningDocuments = manningDocs.length;
  totalRequirements += manningDocs.length;
  manningDocs.forEach(d => d.mandatory ? mandatoryCount++ : recommendedCount++);

  return {
    totalRequirements,
    mandatoryCount,
    recommendedCount,
    byCategory,
  };
}
