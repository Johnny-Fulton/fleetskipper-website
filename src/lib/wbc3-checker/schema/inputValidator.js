/**
 * WBC3 Vessel Requirements Checker — Input Validator
 *
 * Three-level validation:
 *   Level 1: Type validation (field types, ranges, enum values)
 *   Level 2: Required field validation (including conditional requirements)
 *   Level 3: Semantic validation (warnings for suspicious combinations)
 */

import { getInputSchema } from './inputSchema.js';

/**
 * Validate and normalize vessel input
 * @param {Object} input - Raw user input
 * @returns {{ isValid: boolean, errors: Array, warnings: Array, normalizedInput: Object }}
 */
export function validateInput(input) {
  const schema = getInputSchema();
  const errors = [];
  const warnings = [];

  if (!input || typeof input !== 'object') {
    return { isValid: false, errors: [{ field: '_root', message: 'Input must be a non-null object' }], warnings, normalizedInput: null };
  }

  // Build normalized copy
  const normalized = { ...input };

  // ---- Level 1: Type Validation ----
  for (const [key, fieldDef] of Object.entries(schema.fields)) {
    const value = input[key];
    if (value === undefined || value === null) continue;

    switch (fieldDef.type) {
      case 'string':
        if (typeof value !== 'string') {
          errors.push({ field: key, message: `${fieldDef.label} must be a string` });
        }
        break;

      case 'number':
        const num = typeof value === 'string' ? parseFloat(value) : value;
        if (typeof num !== 'number' || isNaN(num)) {
          errors.push({ field: key, message: `${fieldDef.label} must be a number` });
        } else {
          normalized[key] = num;
          if (fieldDef.min !== undefined && num < fieldDef.min) {
            errors.push({ field: key, message: `${fieldDef.label} must be at least ${fieldDef.min}` });
          }
          if (fieldDef.max !== undefined && num > fieldDef.max) {
            errors.push({ field: key, message: `${fieldDef.label} must be at most ${fieldDef.max}` });
          }
        }
        break;

      case 'boolean':
        if (typeof value !== 'boolean') {
          // Accept truthy/falsy strings
          if (value === 'true' || value === 1) normalized[key] = true;
          else if (value === 'false' || value === 0) normalized[key] = false;
          else errors.push({ field: key, message: `${fieldDef.label} must be true or false` });
        }
        break;

      case 'enum':
        const validValues = fieldDef.options.map(o => o.value);
        if (!validValues.includes(value)) {
          errors.push({ field: key, message: `${fieldDef.label} must be one of: ${validValues.join(', ')}` });
        }
        break;

      case 'multi_enum':
        if (!Array.isArray(value)) {
          errors.push({ field: key, message: `${fieldDef.label} must be an array` });
        } else {
          const validOpts = fieldDef.options.map(o => o.value);
          for (const v of value) {
            if (!validOpts.includes(v)) {
              errors.push({ field: key, message: `${fieldDef.label} contains invalid value: ${v}` });
            }
          }
        }
        break;

      case 'object':
        if (typeof value !== 'object' || Array.isArray(value)) {
          errors.push({ field: key, message: `${fieldDef.label} must be an object` });
        }
        break;
    }
  }

  // ---- Level 2: Required Field Validation ----
  for (const [key, fieldDef] of Object.entries(schema.fields)) {
    if (!fieldDef.required) continue;

    // Check conditional — skip required check if condition not met
    if (fieldDef.conditional && !evaluateCondition(fieldDef.conditional, normalized)) {
      continue;
    }

    const value = normalized[key];
    if (value === undefined || value === null || value === '') {
      errors.push({ field: key, message: `${fieldDef.label} is required` });
    }
  }

  // Apply defaults for missing optional fields
  for (const [key, fieldDef] of Object.entries(schema.fields)) {
    if (normalized[key] === undefined && fieldDef.default !== undefined) {
      normalized[key] = fieldDef.default;
    }
  }

  // Ensure operations is always an array
  if (!Array.isArray(normalized.operations)) {
    normalized.operations = [];
  }

  // ---- Level 3: Semantic Validation (Warnings) ----
  if (normalized.enginePowerKW === 0 && normalized.vesselType !== 'non_self_propelled') {
    warnings.push({ field: 'enginePowerKW', message: 'Engine power is 0 kW — fire extinguisher sizing may be inaccurate' });
  }

  if (normalized.category === 'cat0' && normalized.gmdssSeaArea === 'A1') {
    warnings.push({ field: 'gmdssSeaArea', message: 'Category 0 (Unlimited) vessels typically operate in Sea Area A2 or higher' });
  }

  if (normalized.vesselType === 'pilot' && normalized.propulsionConfiguration === 'petrol_outboard') {
    warnings.push({ field: 'propulsionConfiguration', message: 'Petrol engines are prohibited on pilot boats (WBC3 Section 27)' });
  }

  if (normalized.vesselType === 'non_self_propelled' && normalized.operations && normalized.operations.length > 0) {
    warnings.push({ field: 'operations', message: 'Non-self-propelled platforms do not typically have operational endorsements' });
  }

  const hasGas = normalized.galleyHeatSource === 'gas' || normalized.galleyHeatSource === 'liquid_fuel';
  if (hasGas && !normalized.openFlameProtection) {
    warnings.push({ field: 'openFlameProtection', message: 'Gas/liquid fuel cooking without specifying fire protection — defaults will be applied' });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    normalizedInput: errors.length === 0 ? normalized : null,
  };
}

/**
 * Evaluate a conditional expression against the current input values
 * @param {Object} condition - The conditional definition from the schema
 * @param {Object} values - Current input values
 * @returns {boolean} Whether the condition is met (field should be shown/required)
 */
export function evaluateCondition(condition, values) {
  if (!condition) return true;

  // Simple field equals
  if (condition.field && condition.equals !== undefined) {
    return values[condition.field] === condition.equals;
  }

  // Field is in a set
  if (condition.field && condition.in) {
    return condition.in.includes(values[condition.field]);
  }

  // Field is NOT in a set
  if (condition.field && condition.notIn) {
    return !condition.notIn.includes(values[condition.field]);
  }

  // OR combination
  if (condition.or) {
    return condition.or.some(sub => evaluateCondition(sub, values));
  }

  // AND combination
  if (condition.and) {
    return condition.and.every(sub => evaluateCondition(sub, values));
  }

  // NOT
  if (condition.not) {
    return !evaluateCondition(condition.not, values);
  }

  return true;
}
