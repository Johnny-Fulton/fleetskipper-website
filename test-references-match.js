const { checkVesselRequirements } = require('./src/lib/wbc3-checker/index.js');
const { WBC3_REFERENCES, hasReferenceData } = require('./src/lib/wbc3-checker/references/wbc3-references.ts');

const testInput = {
  vesselName: 'Test Vessel',
  vesselType: 'workboat',
  category: 'cat2',
  lengthOverall: 20,
  grossTonnage: 100,
  maxPersons: 12,
  gmdssSeaArea: 'A1',
  propulsionConfiguration: 'diesel_inboard_below',
  enginePowerKW: 200,
  operations: [],
  driveType: 'shaft',
  isOpenBoat: false,
  hasWheelhouse: true,
  hasAccommodation: false,
  hasGalley: false,
  lifejacketType: 'foam',
  waterTemperature: 'above_10c'
};

console.log('Running WBC3 checker...\n');

const result = checkVesselRequirements(testInput);

if (result.success) {
  const equipment = result.data.equipment || [];

  console.log('=== CHECKING REFERENCE MATCHING ===\n');
  console.log('Total WBC3_REFERENCES entries:', Object.keys(WBC3_REFERENCES).length);
  console.log('Sample keys from WBC3_REFERENCES:');
  Object.keys(WBC3_REFERENCES).slice(0, 5).forEach(key => {
    console.log('  -', key);
  });

  console.log('\n=== CHECKING FIRST 5 EQUIPMENT REFERENCES ===\n');

  equipment.slice(0, 5).forEach((item, i) => {
    if (item.reference) {
      const hasData = hasReferenceData(item.reference);
      console.log((i + 1) + '. ' + item.name);
      console.log('   Reference ID: "' + item.reference + '"');
      console.log('   hasReferenceData(): ' + hasData);
      console.log('   Found in WBC3_REFERENCES: ' + (item.reference in WBC3_REFERENCES));
      console.log('');
    }
  });
} else {
  console.log('Validation failed:', result.errors);
}
