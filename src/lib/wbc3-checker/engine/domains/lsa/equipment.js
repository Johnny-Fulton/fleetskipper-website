/**
 * LSA Equipment Requirements
 * Generated from UK-MARITIME-LIBRARY/03-CSV-DATABASES/SEAGOING/domains/LSA_v2/EQUIPMENT_REGISTER.csv
 * THIS FILE USES ONLY THE CSV DATA - NO MADE UP REQUIREMENTS
 * Following anchor mode pattern - max 300 lines
 */

import { parseCategory } from '../../categoryHelpers.js';

export function getLSAEquipmentRequirements(vessel) {
  const requirements = [];

  // Non-self-propelled platforms follow selective assessment (WBC3 26.5.1.1) - no universal LSA requirements
  if (vessel.vesselType === 'non_self_propelled' || vessel.baseCertificate === 'non_self_propelled') {

    return requirements; // No lifejackets, liferafts, or universal LSA for unmanned platforms
  }

  // Only apply to seagoing vessels
  if (!vessel.operatingStatus || vessel.operatingStatus !== 'seagoing') {
    return requirements;
  }

  const category = parseCategory(vessel.category);
  const pobCount = parseInt(vessel.maxPersons) || 1;
  const lengthOverall = parseFloat(vessel.lengthOverall) || 0;
  
  // ===== LIFEJACKETS =====
  // From CSV rows 7-9
  
  // Adult lifejackets - 100% POB (always required)
  // Dynamic name and description based on selected lifejacket type
  const lifejacketType = vessel.lifejacketType || 'foam';
  const typeNames = {
    foam: 'Foam Lifejackets',
    inflatable: 'Inflatable Lifejackets'
  };
  const typeDescriptions = {
    foam: 'Foam (inherent buoyancy) lifejackets - A suitable lifejacket shall be provided for each person on board',
    inflatable: 'Inflatable lifejackets - A suitable lifejacket shall be provided for each person on board (requires 2 additional spare lifejackets)'
  };
  
  requirements.push({
    id: 'lsa.lifejackets.adult',
    name: typeNames[lifejacketType] || 'Lifejackets',
    category: 'Life-Saving Appliances',
    reference: 'WBC3 14.4.4',
    mandatory: true,
    description: typeDescriptions[lifejacketType] || 'A suitable lifejacket shall be provided for each person on board',
    qtyRequired: pobCount,
    lifejacketType: lifejacketType
  });
  
  // Child lifejackets - if children carried
  if (vessel.pobChildrenGTE >= 1 || vessel.carriesChildren) {
    requirements.push({
      id: 'lsa.lifejackets.child',
      name: 'Lifejackets (Child)',
      category: 'Life-Saving Appliances',
      reference: 'WBC3 14.4.4',
      mandatory: true,
      description: 'Suitable lifejacket provided for each person on board under 32kg'
    });
  }
  
  // Spare lifejackets for inflatable types
  const isInflatable = lifejacketType === 'inflatable';
  if (isInflatable && (vessel.hasInflatableLifejackets || vessel.lsaEquipment?.includes('inflatable_lifejackets'))) {
    requirements.push({
      id: 'lsa.lifejackets.spare',
      name: 'Spare Lifejackets (Inflatable)',
      category: 'Life-Saving Appliances',
      reference: 'WBC3 14.4.4',
      mandatory: true,
      description: 'If lifejackets are of inflatable type … additional 2 lifejackets'
    });
  }
  
  // ===== LIFEBUOYS =====
  // From CSV row 10
  
  const lifebuoyCount = pobCount >= 16 ? 4 : 2;
  requirements.push({
    id: 'lsa.lifebuoys.standard',
    name: `Lifebuoys (${lifebuoyCount})`,
    category: 'Life-Saving Appliances',
    reference: 'WBC3 14.3 / Table 14.1.2',
    mandatory: true,
    description: `<16 persons: 2 lifebuoys; ≥16 persons: 4 lifebuoys`
  });
  
  // ===== LIFERAFTS =====
  // From CSV rows 11-14
  
  if (category === 0) {
    // Cat 0: 200% capacity
    requirements.push({
      id: 'lsa.liferafts.cat0',
      name: 'Liferafts (Cat 0) - 200% POB',
      category: 'Life-Saving Appliances',
      reference: 'WBC3 14.2.4.1',
      mandatory: true,
      description: 'Sufficient certified capacity in the remaining liferafts - redundancy required'
    });
  } else if (category === 1) {
    if (pobCount >= 16) {
      // Cat 1 with 16+ POB: 200% capacity
      requirements.push({
        id: 'lsa.liferafts.cat1.pob16plus',
        name: 'Liferafts (Cat 1 ≥16 POB) - 200% POB',
        category: 'Life-Saving Appliances',
        reference: 'WBC3 14.2.4.1',
        mandatory: true,
        description: 'Area category of operation 1 carrying 16 or more persons - redundancy required'
      });
    } else {
      // Cat 1 with <16 POB: 100% capacity
      requirements.push({
        id: 'lsa.liferafts.cat1.pobunder16',
        name: 'Liferafts (Cat 1 <16 POB) - 100% POB',
        category: 'Life-Saving Appliances',
        reference: 'WBC3 14.2.4.2',
        mandatory: true,
        description: 'Carrying fewer than 16 persons … accommodate … total number'
      });
    }
  } else if (category >= 2 && category <= 6) {
    // Cat 2-6: 100% capacity
    requirements.push({
      id: 'lsa.liferafts.cat2to6',
      name: 'Liferafts (Cat 2-6) - 100% POB',
      category: 'Life-Saving Appliances',
      reference: 'WBC3 14.2.4.2',
      mandatory: true,
      description: 'Area category of operation 2, 3, 4, 5 or 6 - standard capacity'
    });
  }
  
  // ===== RESCUE CRAFT =====
  // From CSV rows 15-16
  
  if (vessel.hasRescueBoat || vessel.rescue_boat_fitted) {
    requirements.push({
      id: 'lsa.rescue.boat',
      name: 'Rescue Boat',
      category: 'Life-Saving Appliances',
      reference: 'WBC3 14.7.1',
      mandatory: true,
      description: 'Efficient means to enable recovery of persons … from water'
    });
  }
  
  // Add lifeboat requirement if fitted (Step 5 wizard persistence fix)
  if (vessel.lifeboat_fitted) {
    requirements.push({
      id: 'lsa.lifeboat',
      name: 'Lifeboat',
      category: 'Life-Saving Appliances',
      reference: 'SOLAS III/31',
      mandatory: true,
      description: 'Totally enclosed lifeboat with mechanical propulsion system'
    });
  }
  
  if (vessel.hasFastRescueBoat) {
    requirements.push({
      id: 'lsa.fast.rescue.boat',
      name: 'Fast Rescue Boat',
      category: 'Life-Saving Appliances',
      reference: 'WBC3 14.7.1',
      mandatory: true,
      description: 'Efficient means to enable recovery … physically demonstrated'
    });
  }
  
  // ===== IMMERSION SUITS =====
  // From CSV row 17
  
  if (vessel.hasImmersionSuits || (vessel.lsaEquipment && vessel.lsaEquipment.includes('immersion_suits'))) {
    requirements.push({
      id: 'lsa.immersion.suits',
      name: 'Immersion Suits',
      category: 'Life-Saving Appliances',
      reference: 'WBC3 14.5.7',
      mandatory: true,
      description: 'Where vessel carries immersion suit(s) … compatible with lifejackets'
    });
  }
  
  // ===== THERMAL PROTECTIVE AIDS (TPA) =====
  // From CSV rows 18-20
  
  if (category <= 5) {
    // Categories 0-5: always required
    requirements.push({
      id: 'lsa.tpa.cats0to5',
      name: 'TPA (Categories 0-5)',
      category: 'Life-Saving Appliances',
      reference: 'WBC3 14.5.1',
      mandatory: true,
      description: 'A TPA shall be provided for each person on board'
    });
  } else if (category === 6) {
    // Category 6: conditional
    if (vessel.waterTempLE <= 10) {
      requirements.push({
        id: 'lsa.tpa.cat6.cold',
        name: 'TPA (Cat 6 Cold Water)',
        category: 'Life-Saving Appliances',
        reference: 'WBC3 14.5.2.1',
        mandatory: true,
        description: 'Sea surface temperature is 10 degrees centigrade or less'
      });
    }
    if (vessel.hasOpenLiferaft) {
      requirements.push({
        id: 'lsa.tpa.cat6.openraft',
        name: 'TPA (Cat 6 Open Raft)',
        category: 'Life-Saving Appliances',
        reference: 'WBC3 14.5.2.2',
        mandatory: true,
        description: 'The vessel has open reversible liferaft(s)'
      });
    }
  }
  
  // Additional TPA requirement when selected in wizard (Step 5 wizard persistence fix)
  if (vessel.lsaEquipment && vessel.lsaEquipment.includes('thermal_protective_aids')) {
    requirements.push({
      id: 'lsa.tpa.wizard',
      name: 'TPA (Wizard Selected)',
      category: 'Life-Saving Appliances',
      reference: 'WBC3 14.5',
      mandatory: true,
      description: 'Thermal protective aids selected in vessel configuration wizard'
    });
  }
  
  // ===== PYROTECHNICS =====
  // From CSV row 21 - References Table 14.1.2 / Table 27.2.3
  
  if (vessel.vesselType === 'pilot' || vessel.vesselType === 'pilot_boat_dedicated' || vessel.vesselType === 'workboat_pilot_endorsed' || vessel.type === 'pilot' || vessel.isPilotBoat) {
    // WBC3 Table 27.2.3 - Alternative requirements for pilot boats (REPLACES standard category requirements)
    requirements.push({
      id: 'lsa.pyrotechnics.pilot.white',
      name: 'White Parachute Flares (Pilot Boat)',
      category: 'Life-Saving Appliances',
      reference: 'WBC3 Table 27.2.3 14.1',
      mandatory: true,
      description: '4 parachute white illuminating flares shall be provided - for emergency use in rescues at night'
    });
    
    requirements.push({
      id: 'lsa.pyrotechnics.pilot.red',
      name: 'Red Rocket Parachute Flares (Pilot Boat)',
      category: 'Life-Saving Appliances', 
      reference: 'WBC3 Table 27.2.3 14.1',
      mandatory: true,
      description: '6 red rocket parachute flares shall be provided - emergency signaling'
    });
  } else {
    // Standard category-based requirements (all vessels except pilot boats)
    requirements.push({
      id: 'lsa.pyrotechnics.flares',
      name: 'Distress Pyrotechnics',
      category: 'Life-Saving Appliances',
      reference: 'WBC3 Table 14.1.2',
      mandatory: true,
      description: 'Parachute flares … Red hand flares … Smoke signals - per category table'
    });
  }
  
  // ===== EPIRB =====
  // From CSV rows 22-23
  
  if (category === 0) {
    requirements.push({
      id: 'lsa.epirb.cat0',
      name: 'EPIRB Cat 0 (2 required)',
      category: 'Life-Saving Appliances',
      reference: 'WBC3 17.5.1/Table 17.2.1',
      mandatory: true,
      description: 'EPIRB … Cat 0: 2'
    });
  } else if (category === 1 || category === 2) {
    requirements.push({
      id: 'lsa.epirb.cat1to2',
      name: 'EPIRB Cat 1-2',
      category: 'Life-Saving Appliances',
      reference: 'WBC3 17.5.1/Table 17.2.1',
      mandatory: true,
      description: 'EPIRB … Cat 1-2: 1'
    });
  }
  
  // ===== SART =====
  // From CSV row 24
  
  if (category <= 2) {
    requirements.push({
      id: 'lsa.sart',
      name: 'SART or AIS-SART',
      category: 'Life-Saving Appliances',
      reference: 'WBC3 14.12.3',
      mandatory: true,
      description: 'Vessels … area categories 0, 1 or 2 shall carry … SART'
    });
  }
  
  // ===== GENERAL ALARM =====
  // From CSV rows 25-26
  
  const enginePower = parseFloat(vessel.enginePower) || 0;
  if ((category <= 2 && pobCount >= 16) || enginePower >= 750) {
    requirements.push({
      id: 'lsa.general.alarm',
      name: 'General Alarm System',
      category: 'Life-Saving Appliances',
      reference: 'WBC3 14.6.1',
      mandatory: true,
      description: 'Vessel shall have general alarm … 16 or more persons or … 750 kW'
    });
    
    // PA System goes with general alarm
    requirements.push({
      id: 'lsa.pa.system',
      name: 'Public Address System',
      category: 'Life-Saving Appliances',
      reference: 'WBC3 14.6.2',
      mandatory: true,
      description: 'General alarm shall be audible in all parts of vessel'
    });
  }
  
  // ===== LINE THROWING =====
  // From CSV row 28 - GUIDANCE only
  
  if (vessel.hasLineThrowing || (vessel.lsaEquipment && vessel.lsaEquipment.includes('line_throwing_apparatus'))) {
    requirements.push({
      id: 'lsa.line.throwing',
      name: 'Line Throwing Apparatus',
      category: 'Life-Saving Appliances',
      reference: 'MIN 698',
      mandatory: false, // GUIDANCE classification in CSV
      description: 'Line throwing apparatus … recommended - guidance only'
    });
  }
  
  // ===== MOB RECOVERY (HIERARCHICAL REQUIREMENTS) =====
  // From updated CSV - MANDATORY hierarchical system per WBC3
  
  // 1. UNIVERSAL BASELINE - ALL SEAGOING VESSELS (MANDATORY)
  requirements.push({
    id: 'lsa.recovery.equipment',
    name: 'MOB Recovery Equipment',
    category: 'Life-Saving Appliances',
    reference: 'WBC3 14.7.1',
    mandatory: true,
    description: 'An efficient means to enable the recovery of persons (whether conscious or unconscious) from the water shall be physically demonstrated',
    qtyRequired: 1
  });
  
  // 2. PILOT BOAT ADDITIONAL REQUIREMENTS (Enhanced from CSV)
  if (vessel.vesselType === 'pilot' || vessel.vesselType === 'pilot_boat_dedicated' || vessel.vesselType === 'workboat_pilot_endorsed' || vessel.type === 'pilot' || vessel.isPilotBoat) {
    // Existing buoyant lifelines requirement
    requirements.push({
      id: 'lsa.pilot.lifelines',
      name: 'Buoyant Lifelines (Pilot Boat)',
      category: 'Life-Saving Appliances',
      reference: 'WBC3 Table 27.2.3 14.7',
      mandatory: true,
      description: 'At least 2 buoyant lifelines not less than 18 metres with quoit',
      qtyRequired: '2 x 18m lines with quoit'
    });
    
    // NEW: Line throwing apparatus (pilot boats only)
    requirements.push({
      id: 'lsa.line.throwing.pilot',
      name: 'Line Throwing Apparatus (Pilot Boats)',
      category: 'Life-Saving Appliances',
      reference: 'WBC3 Table 27.2.3',
      mandatory: true,
      description: '2 line throwing appliances (half a set) shall be provided',
      qtyRequired: '2 appliances (half set)'
    });
    
    // NEW: Enhanced pilot recovery equipment
    requirements.push({
      id: 'lsa.recovery.pilot.equipment',
      name: 'Pilot Recovery Equipment',
      category: 'Life-Saving Appliances',
      reference: 'WBC3 Table 27.2.3 Section 14.7.1',
      mandatory: true,
      description: 'Transom steps and/or ladder or equivalent side ladder or scrambling net + propeller guard',
      qtyRequired: 'recovery system + propeller guard'
    });
    
    // NEW: MOB fall prevention (conditional on guardrails)
    if (!vessel.hasGuardrails) {
      requirements.push({
        id: 'lsa.mob.prevention.pilot',
        name: 'MOB Fall Prevention (Pilot)',
        category: 'Life-Saving Appliances',
        reference: 'WBC3 22.2.3',
        mandatory: true,
        description: 'Suitable fall prevention equipment to prevent MOB where bulwarks or guardrails are not fitted',
        qtyRequired: 'fall prevention equipment'
      });
    }
  }
  
  // 3. POLICE BOAT ADDITIONAL REQUIREMENTS (Enhanced from CSV)
  if (vessel.vesselType === 'police' || vessel.vesselType === 'police_boat' || vessel.type === 'police' || vessel.isPoliceBoat) {
    // Existing additional throw line
    requirements.push({
      id: 'lsa.throw.line.police',
      name: 'Additional Throw Line Police',
      category: 'Life-Saving Appliances',
      reference: 'WBC3 Annex 3 Table 11.1',
      mandatory: true,
      description: 'Additional buoyant line/throw line',
      qtyRequired: 1
    });
    
    // NEW: Enhanced MOB recovery for unconscious persons
    requirements.push({
      id: 'lsa.recovery.police.unconscious',
      name: 'Enhanced MOB Recovery (Police)',
      category: 'Life-Saving Appliances',
      reference: 'WBC3 Annex 3 15.3.1',
      mandatory: true,
      description: 'An efficient means to aid the recovery of an unconscious person from the water shall be provided',
      qtyRequired: 'unconscious person recovery'
    });
    
    // NEW: General police MOB equipment
    requirements.push({
      id: 'lsa.mob.police.general',
      name: 'MOB Equipment (Police)',
      category: 'Life-Saving Appliances',
      reference: 'WBC3 Annex 3 20.4.1',
      mandatory: true,
      description: 'Man-overboard/rescue equipment shall be carried on board',
      qtyRequired: 'MOB/rescue equipment'
    });
    
    // NEW: Low freeboard recovery (conditional)
    if (vessel.lowFreeboard) {
      requirements.push({
        id: 'lsa.recovery.police.freeboard',
        name: 'Low Freeboard Recovery (Police)',
        category: 'Life-Saving Appliances',
        reference: 'WBC3 Annex 3 20.4.2',
        mandatory: true,
        description: 'Where Police Boat\'s freeboard does not allow ready recovery...fitted with means for retrieval proven by practical testing',
        qtyRequired: 'practical tested retrieval'
      });
    }
  }
  
  // ===== EVACUATION SYSTEM =====
  // From CSV row 31 - GUIDANCE only for large passenger vessels
  
  if (vessel.passengerVessel && pobCount >= 250) {
    requirements.push({
      id: 'lsa.evacuation.system',
      name: 'Marine Evacuation System',
      category: 'Life-Saving Appliances',
      reference: 'SOLAS',
      mandatory: false, // GUIDANCE classification in CSV
      description: 'Large passenger vessel requirement'
    });
  }
  
  return requirements;
}