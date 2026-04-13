/**
 * WBC3 Crew Certification Checker — Input Validator
 *
 * Three-level validation:
 *   1. Type validation — correct types, ranges, enum values
 *   2. Required field validation — required fields present, conditionals checked
 *   3. Semantic validation — warnings for suspicious combinations
 */

import { getInputSchema } from './inputSchema.js';

/**
 * Validate vessel input for the crew certification checker.
 *
 * @param {Object} input - Raw user input
 * @returns {{ isValid: boolean, errors: Array, warnings: Array, normalizedInput: Object }}
 */
export function validateInput(input) {
  const schema = getInputSchema();
  const errors = [];
  const warnings = [];
  const normalized = { ...input };

  if (!input || typeof input !== 'object') {
    return {
      isValid: false,
      errors: [{ field: '_root', message: 'Input must be a non-null object' }],
      warnings: [],
      normalizedInput: null,
    };
  }

  // Non-self-propelled platforms have minimal crew requirements
  if (input.vesselType === 'non_self_propelled') {
    // Only need vessel identity and type — skip most validation
    if (!input.vesselName) {
      errors.push({ field: 'vesselName', message: 'Vessel name is required' });
    }
    return {
      isValid: errors.length === 0,
      errors,
      warnings: [{ field: 'vesselType', message: 'Non-self-propelled platforms have minimal crew requirements per WBC3 26.5.1.1' }],
      normalizedInput: errors.length === 0 ? normalized : null,
    };
  }

  // ================================================================
  // Level 1: Type validation
  // ================================================================
  for (const [key, fieldDef] of Object.entries(schema.fields)) {
    const value = input[key];

    // Skip fields whose conditionals aren't met
    if (fieldDef.conditional && !evaluateCondition(fieldDef.conditional, input)) {
      continue;
    }

    if (value === undefined || value === null || value === '') {
      if (fieldDef.required) {
        errors.push({ field: key, message: `${fieldDef.label} is required` });
      }
      continue;
    }

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
          // Accept truthy/falsy
          normalized[key] = !!value;
        }
        break;

      case 'enum':
        const validValues = fieldDef.options.map(o => o.value);
        if (!validValues.includes(value)) {
          errors.push({ field: key, message: `${fieldDef.label} must be one of: ${validValues.join(', ')}` });
        }
        break;

      case 'multiselect':
        if (!Array.isArray(value)) {
          errors.push({ field: key, message: `${fieldDef.label} must be an array` });
        } else {
          const validOps = fieldDef.options.map(o => o.value);
          for (const v of value) {
            if (!validOps.includes(v)) {
              errors.push({ field: key, message: `${fieldDef.label}: invalid value "${v}"` });
            }
          }
        }
        break;
    }
  }

  // ================================================================
  // Level 2: Semantic warnings
  // ================================================================
  if (errors.length === 0) {
    const cat = input.category;
    const ops = input.operations || [];

    // Tug without towing operations
    if (input.vesselType === 'tug' && !ops.includes('towing_operations')) {
      warnings.push({ field: 'operations', message: 'Tug vessel without towing operations selected — is this correct?' });
    }

    // Police without patrol operations
    if (input.vesselType === 'police' && !ops.includes('patrol_operations')) {
      warnings.push({ field: 'operations', message: 'Police vessel without patrol operations selected — is this correct?' });
    }

    // Cat 0-1 without radar
    if ((cat === 'cat0' || cat === 'cat1') && !input.hasRadar) {
      warnings.push({ field: 'hasRadar', message: 'Cat 0-1 vessels typically have radar fitted — radar training may still be required' });
    }

    // Single-handed Cat 0-2
    if (input.crewCount === 1 && (cat === 'cat0' || cat === 'cat1' || cat === 'cat2')) {
      warnings.push({ field: 'crewCount', message: 'Single-handed operations are not permitted for Cat 0-2 vessels (WBC3 28.2.1.1)' });
    }

    // Cat 4/6 night operations flag
    if ((cat === 'cat4' || cat === 'cat6') && input.operatesAtNight) {
      warnings.push({ field: 'operatesAtNight', message: `${cat === 'cat4' ? 'Category 4' : 'Category 6'} is daylight-only — night operations would require upgrading the area category` });
    }

    // High engine power with outboard
    if (input.enginePowerKW > 1500 && (input.propulsionConfiguration === 'diesel_outboard' || input.propulsionConfiguration === 'petrol_outboard')) {
      warnings.push({ field: 'enginePowerKW', message: 'Engine power >1500kW is unusual for outboard vessels — please verify' });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    normalizedInput: errors.length === 0 ? normalized : null,
  };
}

/**
 * Evaluate a conditional expression against input values.
 *
 * @param {Object} condition - Condition definition from the schema
 * @param {Object} values - Current input values
 * @returns {boolean} Whether the condition is met
 */
export function evaluateCondition(condition, values) {
  if (!condition) return true;

  // { field: 'operations', contains: 'high_speed_ops' }
  if (condition.contains) {
    const arr = values[condition.field];
    return Array.isArray(arr) && arr.includes(condition.contains);
  }

  // { field: 'someField', value: 'someValue' }
  if (condition.value !== undefined) {
    return values[condition.field] === condition.value;
  }

  // { field: 'someField', notEmpty: true }
  if (condition.notEmpty) {
    const val = values[condition.field];
    return val !== undefined && val !== null && val !== '' && val !== false;
  }

  return true;
}
