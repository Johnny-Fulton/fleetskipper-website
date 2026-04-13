/**
 * Smoke Test — Quick sanity check that the engine loads and runs
 *
 * Run: node src/smoke-test.js
 */

import { checkCrewRequirements, getQuestionnaireSchema, getNextQuestions } from './index.js';

console.log('=== WBC3 Crew Certification Checker — Smoke Test ===\n');

// Test 1: Schema loads
const schema = getQuestionnaireSchema();
console.log(`1. Schema: ${schema.sections.length} sections, ${Object.keys(schema.fields).length} fields`);

// Test 2: Progressive disclosure
const next = getNextQuestions({ vesselName: 'Test', vesselType: 'workboat' });
console.log(`2. Next questions: ${next.nextQuestions.length} remaining, ${next.completionPercentage}% complete`);

// Test 3: Simple Cat 6 workboat
const cat6 = checkCrewRequirements({
  vesselName: 'Simple Boat',
  vesselType: 'workboat',
  category: 'cat6',
  lengthOverall: 8,
  grossTonnage: 5,
  maxPersons: 4,
  propulsionConfiguration: 'diesel_outboard',
  enginePowerKW: 100,
  crewCount: 2,
});
console.log(`\n3. Cat 6 workboat (2 crew): success=${cat6.success}`);
if (cat6.success) {
  console.log(`   Master certs: ${cat6.data.masterQualifications.acceptableCertificates.length} acceptable`);
  console.log(`   Minimum required: ${cat6.data.masterQualifications.minimumRequired}`);
  console.log(`   Second person: ${cat6.data.secondPerson.required ? cat6.data.secondPerson.minimumQualification : 'N/A'}`);
  console.log(`   Training items: ${cat6.data.mandatoryTraining.length}`);
  console.log(`   Medical: ${cat6.data.medicalFitness.certificateType}`);
  console.log(`   Engineering certs: ${cat6.data.engineeringQualifications.acceptableCertificates.length}`);
  console.log(`   Summary: ${cat6.data.summary.totalRequirements} total (${cat6.data.summary.mandatoryCount} mandatory)`);
}

// Test 4: Cat 0 tug with towing
const cat0 = checkCrewRequirements({
  vesselName: 'Ocean Tug',
  vesselType: 'tug',
  category: 'cat0',
  lengthOverall: 30,
  grossTonnage: 300,
  maxPersons: 12,
  propulsionConfiguration: 'diesel_inboard_below',
  enginePowerKW: 2000,
  crewCount: 6,
  operations: ['towing_operations'],
  hasRadar: true,
  hasElectronicCharts: true,
  hasStabilityBooklet: true,
  crewPreparesFood: true,
  internationalVoyages: true,
});
console.log(`\n4. Cat 0 tug (6 crew, towing, international): success=${cat0.success}`);
if (cat0.success) {
  console.log(`   Master certs: ${cat0.data.masterQualifications.acceptableCertificates.length} acceptable`);
  console.log(`   Minimum required: ${cat0.data.masterQualifications.minimumRequired}`);
  console.log(`   Engineering: ${cat0.data.engineeringQualifications.powerTier} / ${cat0.data.engineeringQualifications.vesselClass}`);
  console.log(`   Training items: ${cat0.data.mandatoryTraining.length}`);
  console.log(`   Medical: ${cat0.data.medicalFitness.certificateType}`);
  console.log(`   Special ops: ${cat0.data.specialOperations.length}`);
  console.log(`   Summary: ${cat0.data.summary.totalRequirements} total (${cat0.data.summary.mandatoryCount} mandatory)`);
}

// Test 5: Police vessel
const police = checkCrewRequirements({
  vesselName: 'Police Launch',
  vesselType: 'police',
  category: 'cat5',
  lengthOverall: 12,
  grossTonnage: 15,
  maxPersons: 6,
  propulsionConfiguration: 'diesel_inboard_below',
  enginePowerKW: 400,
  crewCount: 3,
  operations: ['patrol_operations'],
  hasRadar: true,
  isOpenBoat: false,
});
console.log(`\n5. Police vessel Cat 5: success=${police.success}`);
if (police.success) {
  console.log(`   Police alternatives: ${police.data.policeBoatManning?.alternatives?.length || 0}`);
  console.log(`   Summary: ${police.data.summary.totalRequirements} total`);
}

// Test 6: Single-handed Cat 5
const single = checkCrewRequirements({
  vesselName: 'Solo Vessel',
  vesselType: 'workboat',
  category: 'cat5',
  lengthOverall: 6,
  grossTonnage: 2,
  maxPersons: 1,
  propulsionConfiguration: 'diesel_outboard',
  enginePowerKW: 50,
  crewCount: 1,
});
console.log(`\n6. Single-handed Cat 5: success=${single.success}`);
if (single.success) {
  console.log(`   Single-handed permitted: ${single.data.singleHanded.permitted}`);
  console.log(`   Mandatory items: ${single.data.singleHanded.mandatoryRequirements?.length || 0}`);
  console.log(`   Second person required: ${single.data.secondPerson.required}`);
}

// Test 7: Validation failure
const bad = checkCrewRequirements({});
console.log(`\n7. Empty input: success=${bad.success}, errors=${bad.errors?.length}`);

console.log('\n=== Smoke Test Complete ===');
