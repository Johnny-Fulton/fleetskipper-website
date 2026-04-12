/**
 * Category Helper Functions
 *
 * Handles conversion between 'cat3' string format and numeric category values.
 * Created to fix VesselSettingsModal persistence issue where Modal saves 'cat3'
 * but many files expect numeric category for comparisons.
 *
 * @see /Maritime-Agents/seaready-app/reports/VESSEL_SETTINGS_PERSISTENCE_FIX_PLAN.md
 */

/**
 * Parse vessel category to numeric value
 * Handles both 'cat3' format and numeric '3' format
 *
 * @param {string|number|undefined} category - Category value in any format
 * @returns {number} Numeric category (0-6), defaults to 6
 *
 * @example
 * parseCategory('cat3')  // returns 3
 * parseCategory('3')     // returns 3
 * parseCategory(3)       // returns 3
 * parseCategory('CAT3')  // returns 3
 * parseCategory(undefined) // returns 6
 * parseCategory('IWW')   // returns 6 (default for non-numeric)
 */
export function parseCategory(category) {
  if (category === null || category === undefined || category === '') return 6;

  const str = String(category).toLowerCase().trim();

  // Handle special case 'IWW' (Inland Waterways)
  if (str === 'iww') return 7; // Special category for inland waterways

  // Strip 'cat' prefix if present and parse
  const num = parseInt(str.replace('cat', ''), 10);

  return isNaN(num) ? 6 : num;
}

/**
 * Get category as string with 'cat' prefix
 * Used when saving to ensure consistent format
 *
 * @param {string|number|undefined} category - Category value in any format
 * @returns {string} Category string with 'cat' prefix (e.g., 'cat3')
 *
 * @example
 * formatCategory(3)      // returns 'cat3'
 * formatCategory('3')    // returns 'cat3'
 * formatCategory('cat3') // returns 'cat3'
 * formatCategory(undefined) // returns 'cat6'
 */
export function formatCategory(category) {
  if (category === null || category === undefined || category === '') return 'cat6';

  const str = String(category).toLowerCase().trim();

  // Handle special case 'IWW'
  if (str === 'iww') return 'IWW';

  // Already has 'cat' prefix
  if (str.startsWith('cat')) return str;

  // Add 'cat' prefix
  const num = parseInt(str, 10);
  return isNaN(num) ? 'cat6' : `cat${num}`;
}

/**
 * Compare category against a threshold
 * Convenience function for common comparison patterns
 *
 * @param {string|number|undefined} category - Category value
 * @param {number} threshold - Numeric threshold to compare against
 * @param {string} operator - Comparison operator: '<', '<=', '>', '>=', '===', '!=='
 * @returns {boolean} Result of comparison
 *
 * @example
 * compareCategory('cat3', 2, '<=')  // returns false (3 is not <= 2)
 * compareCategory('cat2', 3, '<=')  // returns true (2 is <= 3)
 * compareCategory('cat6', 6, '===') // returns true
 */
export function compareCategory(category, threshold, operator = '<=') {
  const cat = parseCategory(category);

  switch (operator) {
    case '<': return cat < threshold;
    case '<=': return cat <= threshold;
    case '>': return cat > threshold;
    case '>=': return cat >= threshold;
    case '===': return cat === threshold;
    case '!==': return cat !== threshold;
    default: return cat <= threshold;
  }
}

/**
 * Check if category is within a range (inclusive)
 *
 * @param {string|number|undefined} category - Category value
 * @param {number} min - Minimum category (inclusive)
 * @param {number} max - Maximum category (inclusive)
 * @returns {boolean} True if category is within range
 *
 * @example
 * isCategoryInRange('cat3', 0, 3) // returns true
 * isCategoryInRange('cat4', 0, 3) // returns false
 */
export function isCategoryInRange(category, min, max) {
  const cat = parseCategory(category);
  return cat >= min && cat <= max;
}

/**
 * Check if this is a "near coastal" category (0-3)
 * Common regulatory threshold
 *
 * @param {string|number|undefined} category - Category value
 * @returns {boolean} True if category is 0, 1, 2, or 3
 */
export function isNearCoastal(category) {
  return parseCategory(category) <= 3;
}

/**
 * Check if this is Category 6 (sheltered waters)
 *
 * @param {string|number|undefined} category - Category value
 * @returns {boolean} True if category is 6
 */
export function isCategory6(category) {
  return parseCategory(category) === 6;
}
