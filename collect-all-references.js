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

const result = checkVesselRequirements(testInput);

if (result.success) {
  const allReferences = new Set();
  
  // Collect from all categories
  const categories = ['equipment', 'basicEquipment', 'areaCategoryEquipment', 'documentation', 'training', 'procedures', 'certificates'];
  
  categories.forEach(cat => {
    const items = result.data[cat] || [];
    items.forEach(item => {
      if (item.reference) {
        allReferences.add(item.reference);
      }
    });
  });
  
  console.log('Total unique references found:', allReferences.size);
  console.log('\nAll references:');
  Array.from(allReferences).sort().forEach(ref => {
    console.log('  ' + ref);
  });
}
