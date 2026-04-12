/**
 * LSA Drills Requirements
 * Generated from UK-MARITIME-LIBRARY/03-CSV-DATABASES/SEAGOING/domains/LSA_v2/DRILLS.csv
 * THIS FILE USES ONLY THE CSV DATA - NO MADE UP REQUIREMENTS
 * Following anchor mode pattern
 */

import { parseCategory } from '../../categoryHelpers.js';

export function getLSADrillsRequirements(vessel) {
  const requirements = [];

  // Only apply to seagoing vessels
  if (!vessel.operatingStatus || vessel.operatingStatus !== 'seagoing') {
    return requirements;
  }

  const category = parseCategory(vessel.category);
  const pobCount = parseInt(vessel.maxPersons) || 1;
  const tonnage = parseFloat(vessel.grossTonnage) || 0;
  
  // ===== EMERGENCY DRILLS =====
  // From CSV rows 8-10
  
  // Abandon Ship Drill - GUIDANCE (company determines frequency)
  requirements.push({
    id: 'lsa.drill.abandon.ship',
    name: 'Abandon Ship Drill',
    category: 'LSA Drills',
    reference: 'WBC3 14.11.1',
    mandatory: false, // GUIDANCE classification in CSV
    description: 'Fire and abandon ship drills shall be regularly routinely carried out - company determines frequency'
  });
  
  // Fire Drill - GUIDANCE (company determines frequency)
  requirements.push({
    id: 'lsa.drill.fire',
    name: 'Fire Drill',
    category: 'LSA Drills',
    reference: 'WBC3 14.11.1',
    mandatory: false, // GUIDANCE classification in CSV
    description: 'Practice fire and abandon ship drills shall be regularly routinely carried out - company determines frequency'
  });
  
  // Man Overboard Drill - GUIDANCE
  requirements.push({
    id: 'lsa.drill.mob',
    name: 'Man Overboard Drill',
    category: 'LSA Drills',
    reference: 'WBC3 Footnote 49',
    mandatory: false, // GUIDANCE classification in CSV
    description: 'MOB drills shall be carried out in a range of daylight low light - various conditions required'
  });
  
  // ===== RECOVERY DRILLS =====
  // From CSV rows 11-12
  
  // Recovery of Persons Drill - GUIDANCE
  requirements.push({
    id: 'lsa.drill.recovery',
    name: 'Recovery of Persons Drill',
    category: 'LSA Drills',
    reference: 'WBC3 14.11.2',
    mandatory: false, // GUIDANCE classification in CSV
    description: 'Means of recovery of persons … drills shall be regularly routinely carried out - see MGN 544 for guidance'
  });
  
  // Rescue Boat Launch Drill - if rescue boat fitted
  if (vessel.hasRescueBoat || vessel.rescue_boat_fitted) {
    requirements.push({
      id: 'lsa.drill.rescue.boat',
      name: 'Rescue Boat Launch Drill',
      category: 'LSA Drills',
      reference: 'WBC3 14.11.2',
      mandatory: false, // GUIDANCE classification in CSV
      description: 'Recovery of persons … drills shall be regularly routinely carried out - includes launch and recovery'
    });
  }
  
  // ===== EQUIPMENT DRILLS =====
  // From CSV rows 13-15
  
  // Liferaft Deployment Drill - if liferaft fitted
  if (vessel.hasLiferaft || vessel.category <= 6) {
    requirements.push({
      id: 'lsa.drill.liferaft.deployment',
      name: 'Liferaft Deployment Drill',
      category: 'LSA Drills',
      reference: 'WBC3 14.11.2',
      mandatory: false, // GUIDANCE classification in CSV
      description: 'Physical deployment of each liferaft from water drills shall be regularly routinely carried out - without actual inflation'
    });
  }
  
  // Immersion Suit Donning Practice - if immersion suits fitted
  if (vessel.hasImmersionSuits) {
    requirements.push({
      id: 'lsa.drill.immersion.suit',
      name: 'Immersion Suit Donning Practice',
      category: 'LSA Drills',
      reference: 'WBC3 14.11.3',
      mandatory: false, // GUIDANCE classification in CSV
      description: 'Familiarisation training … emergency procedures - part of LSA familiarisation'
    });
  }
  
  // Pyrotechnic Familiarisation - GUIDANCE
  requirements.push({
    id: 'lsa.drill.pyrotechnic',
    name: 'Pyrotechnic Familiarisation',
    category: 'LSA Drills',
    reference: 'WBC3 14.11.3',
    mandatory: false, // GUIDANCE classification in CSV
    description: 'Familiarisation training on Life-Saving Appliances - without actual use'
  });
  
  // ===== TRAINING =====
  // From CSV row 16
  
  // LSA Familiarisation Training - MANDATORY
  requirements.push({
    id: 'lsa.drill.familiarisation',
    name: 'LSA Familiarisation Training',
    category: 'LSA Training',
    reference: 'WBC3 14.11.3',
    mandatory: true, // MANDATORY classification in CSV
    description: 'All crew … shall have familiarisation training on Life-Saving Appliances - required for all crew'
  });
  
  // ===== DRILL RECORDING =====
  // From CSV row 17
  
  // Drill Recording - if vessel >25 GT
  if (tonnage > 25) {
    requirements.push({
      id: 'lsa.drill.logging',
      name: 'Drill Recording',
      category: 'LSA Records',
      reference: 'WBC3 14.11.1',
      mandatory: true, // MANDATORY classification in CSV
      description: 'Vessels over 25 GT … recorded in the Official Log Book'
    });
  }
  
  // ===== ENHANCED DRILLS (GUIDANCE) =====
  // From CSV rows 18-23
  
  // Combined Emergency Exercise - for larger crews
  if (pobCount >= 36) {
    requirements.push({
      id: 'lsa.drill.combined',
      name: 'Combined Emergency Exercise',
      category: 'LSA Drills',
      reference: 'Good Practice',
      mandatory: false, // GUIDANCE classification in CSV
      description: 'Good practice for crew readiness - realistic scenarios'
    });
  }
  
  // Night Emergency Drill - Cat 0/1
  if (category === 0 || category === 1) {
    requirements.push({
      id: 'lsa.drill.night',
      name: 'Night Emergency Drill',
      category: 'LSA Drills',
      reference: 'Good Practice',
      mandatory: false, // GUIDANCE classification in CSV
      description: 'Good practice for night operations - enhanced training'
    });
  }
  
  // Cold Water Survival Training - if cold water
  if (vessel.waterTempLE <= 10) {
    requirements.push({
      id: 'lsa.drill.cold.water',
      name: 'Cold Water Survival Training',
      category: 'LSA Drills',
      reference: 'Good Practice',
      mandatory: false, // GUIDANCE classification in CSV
      description: 'Good practice for cold water areas - hypothermia awareness'
    });
  }
  
  // Passenger Muster Drill - if carries passengers
  if (vessel.hasPassengers || vessel.carriesPassengers) {
    requirements.push({
      id: 'lsa.drill.passenger.muster',
      name: 'Passenger Muster Drill',
      category: 'LSA Drills',
      reference: 'Good Practice',
      mandatory: false, // GUIDANCE classification in CSV
      description: 'Good practice for passenger safety - within 24 hours of departure'
    });
  }
  
  // Helicopter Rescue Practice - if helideck
  if (vessel.hasHeliDeck) {
    requirements.push({
      id: 'lsa.drill.helicopter',
      name: 'Helicopter Rescue Practice',
      category: 'LSA Drills',
      reference: 'Good Practice',
      mandatory: false, // GUIDANCE classification in CSV
      description: 'Good practice for helicopter operations - winching procedures'
    });
  }
  
  return requirements;
}