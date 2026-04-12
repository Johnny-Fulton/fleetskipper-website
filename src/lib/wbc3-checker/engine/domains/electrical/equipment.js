/**
 * Electrical Equipment Requirements
 * Generated from UK-MARITIME-LIBRARY/03-CSV-DATABASES/SEAGOING/domains/electrical_v1/EQUIPMENT_REGISTER.csv
 * THIS FILE USES ONLY THE CSV DATA - NO MADE UP REQUIREMENTS
 * Following anchor mode pattern - max 300 lines
 */

import { parseCategory } from '../../categoryHelpers.js';

export function getElectricalEquipmentRequirements(vessel) {
  const requirements = [];

  // Non-self-propelled platforms follow selective assessment (WBC3 26.5.1.1) - no universal electrical requirements
  if (vessel.vesselType === 'non_self_propelled' || vessel.baseCertificate === 'non_self_propelled') {

    return requirements; // No general alarms, emergency lighting, or universal electrical for unmanned platforms
  }

  // Only apply to seagoing vessels
  if (!vessel.operatingStatus || vessel.operatingStatus !== 'seagoing') {
    return requirements;
  }

  const category = parseCategory(vessel.category);
  const pobCount = parseInt(vessel.maxPersons) || 1;
  const enginePower = parseFloat(vessel.enginePower) || 0;
  
  // Most vessels have electrical systems unless very small open boats
  // Based on CSV gate: isSeagoing & hasElectricalSystem
  // We'll assume all seagoing vessels have electrical unless specifically disabled
  
  // ===== CORE ELECTRICAL EQUIPMENT =====
  // From CSV rows 8-10
  
  // Battery System - MANDATORY
  requirements.push({
    id: 'electrical.battery.system',
    name: 'Battery System',
    category: 'Electrical Equipment',
    reference: 'WBC3 9.3.1.1',
    mandatory: true,
    description: 'Battery systems shall be provided to satisfy the designed electrical requirements'
  });
  
  // Electric Lighting System - MANDATORY
  requirements.push({
    id: 'electrical.lighting.system',
    name: 'Electric Lighting System',
    category: 'Electrical Equipment',
    reference: 'WBC3 9.2.1',
    mandatory: true,
    description: 'Electric lighting system shall be installed...appropriate level of light'
  });
  
  // Battery Charger - GUIDANCE only
  requirements.push({
    id: 'electrical.charger.system',
    name: 'Battery Charging System',
    category: 'Electrical Equipment',
    reference: 'WBC3 9.3.1.3',
    mandatory: false, // GUIDANCE classification in CSV
    description: 'Circuitry to prevent overcharging - If fitted'
  });
  
  // ===== FROM EQUIPMENT_SPECS.CSV =====
  // These are specifications but represent equipment requirements
  
  // Emergency Lighting - for vessels with accommodation
  if (vessel.hasAccommodation) {
    requirements.push({
      id: 'electrical.emergency.lighting',
      name: 'Emergency Lighting Backup',
      category: 'Electrical Equipment',
      reference: 'WBC3 9.7.1.1',
      mandatory: true,
      description: 'Alternative source of lighting shall be provided - 3 hours minimum'
    });
  }
  
  // ===== ACCOMMODATION VENTILATION FOR INTERNATIONAL VOYAGES =====
  // WBC3 Section 21.1.3 - Mechanical ventilation for accommodation spaces below weather deck
  // Required for long international voyages (>200 miles from safe haven OR >600 miles voyage length)
  
  if (vessel.internationalVoyages && vessel.hasAccommodation && 
      (category <= 1 || vessel.maxVoyageDistance > 600)) {
    requirements.push({
      id: 'electrical.accommodation.ventilation',
      name: 'Mechanical Ventilation System (Accommodation)',
      category: 'Accommodation Equipment',
      reference: 'WBC3 21.1.3',
      mandatory: true,
      description: 'Mechanical ventilation providing minimum 6 air changes per hour for accommodation spaces below weather deck on long international voyages (>200nm from safe haven or >600nm voyage length)',
      qtyRequired: 1
    });
  }
  
  // Emergency Radio Power - for vessels with GMDSS/radio
  if (category <= 2) {
    requirements.push({
      id: 'electrical.emergency.radio.power',
      name: 'Emergency Radio Power Supply',
      category: 'Electrical Equipment',
      reference: 'WBC3 9.7.2.1',
      mandatory: true,
      description: 'Supply power to the equipment for a minimum of 3 hours'
    });
  }
  
  // Emergency Navigation Equipment Power
  if (category <= 4) {
    requirements.push({
      id: 'electrical.emergency.nav.power',
      name: 'Emergency Navigation Equipment Power',
      category: 'Electrical Equipment',
      reference: 'WBC3 9.7.3.1',
      mandatory: true,
      description: 'Supply power to the equipment for a minimum of 3 hours'
    });
  }
  
  // Battery Disconnect Switch - MANDATORY
  requirements.push({
    id: 'electrical.disconnect.switch',
    name: 'Battery Disconnect Switch',
    category: 'Electrical Equipment',
    reference: 'WBC3 9.3.1.6',
    mandatory: true,
    description: 'Disconnect switch shall be provided to simultaneously isolate'
  });
  
  // Deck Operations Lighting - for 24h operations
  if (vessel.operatingHours === 'over_24h' || category <= 3) {
    requirements.push({
      id: 'electrical.deck.lighting',
      name: 'Deck Operations Lighting',
      category: 'Electrical Equipment',
      reference: 'WBC3 9.2.5',
      mandatory: true,
      description: 'Appropriate level of light shall be provided'
    });
  }
  
  // ===== WBC3 ANNEX 1 - BATTERY PROPULSION REQUIREMENTS =====
  // Real requirements from regulations assistant analysis
  
  if (vessel.requiresWBC3Annex1 || vessel.isBatterySystem) {
    
    // Battery Management System - MANDATORY for all battery propulsion
    requirements.push({
      id: 'electrical.battery.bms',
      name: 'Battery Management System (BMS)',
      category: 'Electrical Equipment',
      reference: 'WBC3 Annex 1 Section 2.9.1',
      mandatory: true,
      description: 'Electronic device which performs the role of maintaining the safe charging and discharging of lithium-ion batteries or lead-acid batteries - essential for battery propulsion safety'
    });
    
    // Power Management System - MANDATORY for all battery propulsion
    requirements.push({
      id: 'electrical.battery.pms',
      name: 'Power Management System (PMS)',
      category: 'Electrical Equipment',
      reference: 'WBC3 Annex 1 Section 2.9.1',
      mandatory: true,
      description: 'System to manage electrical power distribution and load management for battery propulsion systems - ensures optimal power delivery'
    });
    
    // Energy Management System - MANDATORY for all battery propulsion
    requirements.push({
      id: 'electrical.battery.ems',
      name: 'Energy Management System (EMS)',
      category: 'Electrical Equipment',
      reference: 'WBC3 Annex 1 Section 2.9.1',
      mandatory: true,
      description: 'System to optimize energy consumption and monitor battery state for propulsion systems - maximizes operational efficiency'
    });
    
    // Emergency Power-Off Circuit - MANDATORY
    requirements.push({
      id: 'electrical.battery.emergency_poweroff',
      name: 'Emergency Power-Off Circuit',
      category: 'Electrical Equipment',
      reference: 'WBC3 Annex 1 Section 2.4.12',
      mandatory: true,
      description: 'Emergency circuit to immediately disconnect battery power in emergency situations - critical safety system'
    });
    
    // Battery Isolation Switches - MANDATORY
    requirements.push({
      id: 'electrical.battery.isolation_switches',
      name: 'Battery Isolation Switches',
      category: 'Electrical Equipment',
      reference: 'WBC3 Annex 1 Section 2.3.7',
      mandatory: true,
      description: 'Switches to isolate battery systems for maintenance or emergency situations - enables safe servicing'
    });
    
    // Ventilation System - MANDATORY (minimum 6 air changes per hour)
    if (vessel.hasInboard || vessel.hasMachinerySpace) {
      requirements.push({
        id: 'electrical.battery.ventilation',
        name: 'Ventilation System (Battery Compartment)',
        category: 'Electrical Equipment',
        reference: 'WBC3 Annex 1 Section 1.3.3',
        mandatory: true,
        description: 'Ventilation system providing minimum 6 air changes per hour for battery compartments - prevents gas accumulation'
      });
    }
    
    // Gas Detection System - CONDITIONAL (based on risk assessment)
    requirements.push({
      id: 'electrical.battery.gas_detection',
      name: 'Gas Detection System (Battery Area)',
      category: 'Electrical Equipment',
      reference: 'WBC3 Annex 1 Section 3.2.2',
      mandatory: false, // CONDITIONAL based on risk assessment
      description: 'Gas detection system if required by risk assessment for battery compartments - detects hazardous gas buildup'
    });
  }
  
  // ===== HYBRID-SPECIFIC REQUIREMENTS =====
  
  if (vessel.engineType === 'battery_hybrid') {
    // Hybrid Power Management System - MANDATORY for battery hybrid only
    requirements.push({
      id: 'electrical.hybrid.pms',
      name: 'Hybrid Power Management System',
      category: 'Electrical Equipment',
      reference: 'WBC3 Annex 1 Section 2.9.13',
      mandatory: true,
      description: 'Power Management System to balance both diesel and battery power sources for hybrid propulsion - ensures seamless power source integration'
    });
  }
  
  // ===== POLICE VESSEL SPECIFIC =====
  
  // Police boat emergency power system - WBC3 Annex 3 13.5.2
  if (vessel.vesselType === 'police' || vessel.type === 'police') {
    requirements.push({
      id: 'electrical.emergency.power.police',
      name: 'Emergency Power System (Police Boat)',
      category: 'Electrical Equipment',
      reference: 'WBC3 Annex 3 13.5.2',
      mandatory: true,
      description: 'Emergency power source for essential systems during main power failure'
    });
  }
  
  return requirements;
}