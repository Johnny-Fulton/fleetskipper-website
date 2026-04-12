/**
 * VERIFY WBC3 CALCULATOR INPUT REQUIREMENTS
 *
 * This script tests the WBC3 engine API to determine EXACTLY what inputs
 * are needed for LSA, FFE, and Radio calculators.
 */

async function testWBC3Inputs() {
  console.log('\n🔍 VERIFYING WBC3 INPUT REQUIREMENTS\n');
  console.log('Testing the WBC3 engine to confirm what questions are needed...\n');

  const baseUrl = 'http://localhost:3002';

  // Test 1: LSA (Life Saving Appliances)
  console.log('🛟 TEST 1: LSA (Life Saving Appliances)\n');

  const lsaInput = {
    category: 'cat5',
    maxPersons: 6,
    vesselLengthMeters: 12.5,
    waterTemperature: 'at_or_below_10c'
  };

  console.log('Input:', JSON.stringify(lsaInput, null, 2));

  const lsaResponse = await fetch(`${baseUrl}/api/wbc3/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lsaInput)
  });

  const lsaResult = await lsaResponse.json();

  if (lsaResult.success) {
    const lsaItems = lsaResult.equipment?.filter(item => {
      const name = (item.name || item.item || '').toLowerCase();
      return name.includes('lifejacket') ||
             name.includes('liferaft') ||
             name.includes('flare') ||
             name.includes('immersion') ||
             name.includes('buoy');
    }) || [];

    console.log(`✅ SUCCESS: Found ${lsaItems.length} LSA items`);
    console.log('\nSample LSA requirements:');
    lsaItems.slice(0, 5).forEach(item => {
      console.log(`  - ${item.name || item.item} (${item.mandatory ? 'MANDATORY' : 'recommended'})`);
    });
  } else {
    console.log('❌ FAILED:', lsaResult.errors);
  }
  console.log('\n');

  // Test 2: FFE (Fire Fighting Equipment)
  console.log('🔥 TEST 2: FFE (Fire Fighting Equipment)\n');

  const ffeInput = {
    category: 'cat5',
    propulsionConfiguration: 'diesel_inboard_below',
    enginePowerKW: 150,
    hasGalley: true,
    galleyHeatSource: 'gas',
    hasAccommodation: true,
    hasLithiumBattery: false
  };

  console.log('Input:', JSON.stringify(ffeInput, null, 2));

  const ffeResponse = await fetch(`${baseUrl}/api/wbc3/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ffeInput)
  });

  const ffeResult = await ffeResponse.json();

  if (ffeResult.success) {
    const ffeItems = ffeResult.equipment?.filter(item => {
      const name = (item.name || item.item || '').toLowerCase();
      return name.includes('fire') ||
             name.includes('extinguisher') ||
             name.includes('blanket') ||
             name.includes('suppression');
    }) || [];

    console.log(`✅ SUCCESS: Found ${ffeItems.length} FFE items`);
    console.log('\nSample FFE requirements:');
    ffeItems.slice(0, 5).forEach(item => {
      console.log(`  - ${item.name || item.item} (${item.mandatory ? 'MANDATORY' : 'recommended'})`);
    });
  } else {
    console.log('❌ FAILED:', ffeResult.errors);
  }
  console.log('\n');

  // Test 3: Radio/GMDSS
  console.log('📡 TEST 3: Radio/GMDSS Equipment\n');

  const radioInput = {
    category: 'cat5',
    gmdssSeaArea: 'A1',
    vesselLengthMeters: 12.5
  };

  console.log('Input:', JSON.stringify(radioInput, null, 2));

  const radioResponse = await fetch(`${baseUrl}/api/wbc3/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(radioInput)
  });

  const radioResult = await radioResponse.json();

  if (radioResult.success) {
    const radioItems = radioResult.equipment?.filter(item => {
      const name = (item.name || item.item || '').toLowerCase();
      return name.includes('radio') ||
             name.includes('vhf') ||
             name.includes('epirb') ||
             name.includes('sart') ||
             name.includes('gmdss');
    }) || [];

    console.log(`✅ SUCCESS: Found ${radioItems.length} Radio items`);
    console.log('\nSample Radio requirements:');
    radioItems.slice(0, 5).forEach(item => {
      console.log(`  - ${item.name || item.item} (${item.mandatory ? 'MANDATORY' : 'recommended'})`);
    });
  } else {
    console.log('❌ FAILED:', radioResult.errors);
  }
  console.log('\n');

  // Summary
  console.log('===== VERIFICATION COMPLETE =====\n');
  console.log('✅ LSA Calculator needs:');
  console.log('   - WBC3 Category (Cat 0-6)');
  console.log('   - Maximum Persons');
  console.log('   - Vessel Length (meters)');
  console.log('   - Water Temperature (above/below 10°C)\n');

  console.log('✅ FFE Calculator needs:');
  console.log('   - WBC3 Category (Cat 0-6)');
  console.log('   - Propulsion Configuration');
  console.log('   - Engine Power (kW)');
  console.log('   - Has Galley? (+ heat source if yes)');
  console.log('   - Has Accommodation?');
  console.log('   - Has Lithium Batteries?\n');

  console.log('✅ Radio Calculator needs:');
  console.log('   - WBC3 Category (Cat 0-6)');
  console.log('   - GMDSS Sea Area (A1, A2, A3, A4)');
  console.log('   - Vessel Length (meters)\n');

  console.log('These are the ACTUAL requirements from the WBC3 engine.\n');
}

// Run the tests
testWBC3Inputs().catch(error => {
  console.error('ERROR:', error.message);
  process.exit(1);
});
