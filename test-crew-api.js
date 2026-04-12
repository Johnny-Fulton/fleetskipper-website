/**
 * Test script for the /api/crew/check endpoint
 *
 * Run with: node test-crew-api.js
 *
 * This will test the crew certification checker API with sample vessel data.
 */

// Sample vessel input data
const sampleVesselInput = {
  vesselName: "MV Test Workboat",
  vesselType: "workboat",
  category: "cat3",
  lengthOverall: 12.5,
  grossTonnage: 15,
  maxPersons: 8,
  propulsionConfiguration: "diesel_inboard_below",
  enginePowerKW: 250,
  crewCount: 2,
  internationalVoyages: false,
  operations: ["towing_operations"],
  hasRadar: true,
  hasElectronicCharts: true,
  hasStabilityBooklet: true,
  crewPreparesFood: false,
  isOpenBoat: false,
  operatesAtNight: true,
};

async function testCrewCheckAPI() {
  const API_URL = 'http://localhost:3002/api/crew/check';

  console.log('Testing Crew Check API...\n');
  console.log('Sending POST request to:', API_URL);
  console.log('Input:', JSON.stringify(sampleVesselInput, null, 2), '\n');

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sampleVesselInput),
    });

    const data = await response.json();

    console.log('Response Status:', response.status);
    console.log('Response Body:', JSON.stringify(data, null, 2));

    if (response.ok && data.success) {
      console.log('\n✅ SUCCESS: Crew requirements check completed');
      console.log('\nSummary:');
      console.log('- Total Requirements:', data.data.summary.totalRequirements);
      console.log('- Mandatory:', data.data.summary.mandatoryCount);
      console.log('- Recommended:', data.data.summary.recommendedCount);

      console.log('\nMaster Qualifications:');
      console.log('- Options:', data.data.masterQualifications.acceptableCertificates.length);

      console.log('\nSecond Person Required:', data.data.secondPerson.required);

      console.log('\nMandatory Training Courses:', data.data.mandatoryTraining.length);
      data.data.mandatoryTraining.forEach(t => {
        console.log(`  - ${t.name}${t.mandatory ? ' (MANDATORY)' : ''}`);
      });
    } else {
      console.log('\n❌ FAILED: Validation errors');
      if (data.errors) {
        data.errors.forEach(err => {
          console.log(`  - ${err.field || 'general'}: ${err.message}`);
        });
      }
    }

    if (data.warnings && data.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:');
      data.warnings.forEach(w => console.log(`  - ${w}`));
    }

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error('\nMake sure the dev server is running: npm run dev');
  }
}

// Test with invalid input
async function testInvalidInput() {
  const API_URL = 'http://localhost:3002/api/crew/check';

  console.log('\n\n=== Testing with INVALID input ===\n');

  const invalidInput = {
    vesselName: "Invalid Boat",
    vesselType: "invalid_type", // Invalid type
    category: "cat3",
    // Missing required fields
  };

  console.log('Input:', JSON.stringify(invalidInput, null, 2), '\n');

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invalidInput),
    });

    const data = await response.json();

    console.log('Response Status:', response.status);
    console.log('Response Body:', JSON.stringify(data, null, 2));

    if (response.status === 400 && !data.success) {
      console.log('\n✅ CORRECTLY REJECTED invalid input');
      console.log('Validation Errors:');
      data.errors.forEach(err => {
        console.log(`  - ${err.field || 'general'}: ${err.message}`);
      });
    } else {
      console.log('\n❌ Should have rejected invalid input');
    }

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
  }
}

// Run tests
console.log('='.repeat(60));
console.log('WBC3 Crew Certification Checker API Test');
console.log('='.repeat(60));

testCrewCheckAPI()
  .then(() => testInvalidInput())
  .then(() => {
    console.log('\n' + '='.repeat(60));
    console.log('Tests Complete');
    console.log('='.repeat(60));
  });
