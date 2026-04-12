const { checkVesselRequirements } = require('./src/lib/wbc3-checker/index.js');

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

console.log('Running WBC3 checker with complete input...\n');

const result = checkVesselRequirements(testInput);

if (result.success) {
  console.log('✅ Checker succeeded!\n');

  // Check equipment array
  const equipment = result.data.equipment || [];
  console.log('Total equipment items: ' + equipment.length + '\n');

  // Count how many have references
  let withRef = 0;
  let withoutRef = 0;

  console.log('=== CHECKING FIRST 10 EQUIPMENT ITEMS ===\n');
  equipment.slice(0, 10).forEach((item, i) => {
    console.log((i + 1) + '. ' + item.name);
    console.log('   ID: ' + item.id);
    console.log('   Reference: ' + (item.reference || 'NONE'));
    console.log('   Has "reference" property: ' + ('reference' in item));
    console.log('');

    if (item.reference) withRef++;
    else withoutRef++;
  });

  console.log('=== SUMMARY ===');
  console.log('Equipment with references: ' + withRef + '/10');
  console.log('Equipment without references: ' + withoutRef + '/10');
} else {
  console.log('❌ Validation failed:', result.errors);
}
