/**
 * Smoke test — verify the full public API works end-to-end
 */
import { checkVesselRequirements, getQuestionnaireSchema, getNextQuestions } from './index.js';

console.log('=== TEST 1: Simple Cat 6 Workboat ===');
const result1 = checkVesselRequirements({
  vesselName: 'MV Test Workboat',
  vesselType: 'workboat',
  category: 'cat6',
  gmdssSeaArea: 'A1',
  lengthOverall: 10,
  grossTonnage: 15,
  maxPersons: 6,
  propulsionConfiguration: 'diesel_inboard_below',
  enginePowerKW: 150,
  driveType: 'shaft',
  isOpenBoat: false,
  hasWheelhouse: true,
  hasAccommodation: false,
  hasGalley: false,
  hasHeating: false,
  hasLithiumBattery: false,
  lifejacketType: 'foam',
  waterTemperature: 'above_10c',
  operations: [],
});

if (result1.success) {
  console.log(`  Total requirements: ${result1.data.summary.totalRequirements}`);
  console.log(`  Mandatory: ${result1.data.summary.mandatoryCount}`);
  console.log(`  Recommended: ${result1.data.summary.recommendedCount}`);
  console.log(`  Engine version: ${result1.data._meta.engineVersion}`);
  console.log('  By category:', JSON.stringify(result1.data.summary.byCategory, null, 2));
  if (result1.warnings.length > 0) {
    console.log('  Warnings:', result1.warnings);
  }
} else {
  console.error('  FAILED:', result1.errors);
}

console.log('\n=== TEST 2: Cat 2 Pilot Boat (complex) ===');
const result2 = checkVesselRequirements({
  vesselName: 'MV Pilot King',
  vesselType: 'pilot',
  category: 'cat2',
  gmdssSeaArea: 'A1+A2',
  lengthOverall: 18,
  grossTonnage: 45,
  maxPersons: 12,
  propulsionConfiguration: 'diesel_inboard_below',
  enginePowerKW: 800,
  driveType: 'water_jet',
  isOpenBoat: false,
  hasWheelhouse: true,
  hasAccommodation: true,
  hasSleeping: true,
  hasGalley: true,
  galleyHeatSource: 'gas',
  openFlameProtection: { blanket: true, extraExtinguisher: false, fixedSystem: false },
  hasHeating: true,
  hasLithiumBattery: false,
  lifejacketType: 'inflatable',
  waterTemperature: 'at_or_below_10c',
  voyageDuration: 'over_12h',
  operatesUKWaters: true,
  operations: ['pilot_transfer'],
  operatesAtNight: true,
});

if (result2.success) {
  console.log(`  Total requirements: ${result2.data.summary.totalRequirements}`);
  console.log(`  Mandatory: ${result2.data.summary.mandatoryCount}`);
  console.log(`  Recommended: ${result2.data.summary.recommendedCount}`);
  console.log('  By category:', JSON.stringify(result2.data.summary.byCategory, null, 2));
} else {
  console.error('  FAILED:', result2.errors);
}

console.log('\n=== TEST 3: Non-Self-Propelled Platform ===');
const result3 = checkVesselRequirements({
  vesselName: 'Platform Alpha',
  vesselType: 'non_self_propelled',
  category: 'cat6',
  gmdssSeaArea: 'A1',
  lengthOverall: 20,
  grossTonnage: 100,
  maxPersons: 0,
  lifejacketType: 'foam',
  waterTemperature: 'above_10c',
});

if (result3.success) {
  console.log(`  Total requirements: ${result3.data.summary.totalRequirements}`);
  console.log(`  Equipment: ${result3.data.basicEquipment.length} basic items`);
  console.log(`  Restrictions: ${result3.data.restrictions.length} restrictions`);
} else {
  console.error('  FAILED:', result3.errors);
}

console.log('\n=== TEST 4: Validation Error ===');
const result4 = checkVesselRequirements({
  vesselName: 'Bad Input',
  // Missing required fields
});

if (!result4.success) {
  console.log(`  Correctly rejected with ${result4.errors.length} errors:`);
  result4.errors.slice(0, 5).forEach(e => console.log(`    - ${e.field}: ${e.message}`));
} else {
  console.error('  ERROR: Should have failed validation');
}

console.log('\n=== TEST 5: getQuestionnaireSchema() ===');
const schema = getQuestionnaireSchema();
console.log(`  Sections: ${schema.sections.length}`);
console.log(`  Fields: ${Object.keys(schema.fields).length}`);

console.log('\n=== TEST 6: getNextQuestions() ===');
const next = getNextQuestions({ vesselName: 'Test', vesselType: 'workboat' });
console.log(`  Answered: ${next.answeredCount}`);
console.log(`  Next questions: ${next.nextQuestions.length}`);
console.log(`  Completion: ${next.completionPercentage}%`);
console.log(`  First 3 questions: ${next.nextQuestions.slice(0, 3).map(q => q.label).join(', ')}`);

console.log('\n=== ALL SMOKE TESTS COMPLETE ===');
