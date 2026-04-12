/**
 * Machinery Equipment Requirements
 * Generated from UK-MARITIME-LIBRARY/03-CSV-DATABASES/SEAGOING/domains/MACHINERY_v1/EQUIPMENT_REGISTER.csv
 * THIS FILE USES ONLY THE CSV DATA - NO MADE UP REQUIREMENTS
 * Following anchor mode pattern - max 300 lines
 */

import { parseCategory } from '../../categoryHelpers.js';

export function getMachineryEquipmentRequirements(vessel) {
  const requirements = [];

  // Only apply to seagoing vessels
  if (!vessel.operatingStatus || vessel.operatingStatus !== 'seagoing') {
    return requirements;
  }

  const category = parseCategory(vessel.category);
  
  // ===== CORE PROPULSION & STEERING =====
  // From CSV rows 7-8
  
  // Main Propulsion System - MANDATORY
  requirements.push({
    id: 'machinery.propulsion.main',
    name: 'Propulsion',
    category: 'Machinery',
    reference: 'WBC3 8.1.1',
    mandatory: true,
    description: 'Shall be provided with a propulsion system - Marine use engine/motor'
  });
  
  // Steering System - MANDATORY
  requirements.push({
    id: 'machinery.steering.system',
    name: 'Steering',
    category: 'Machinery',
    reference: 'WBC3 10.2.1',
    mandatory: true,
    description: 'Steering system may either be direct or remote - Primary steering system'
  });
  
  // ===== FUEL SYSTEM =====
  // From CSV row 9
  
  // Fuel Tanks - MANDATORY (only for conventional fuel engines, not battery electric)
  if (vessel.engineType !== 'battery_electric') {
    requirements.push({
      id: 'machinery.fuel.tanks',
      name: 'Fuel System',
      category: 'Machinery',
      reference: 'WBC3 8.12',
      mandatory: true,
      description: 'Fuel Tanks - Permanent or portable per vessel size'
    });
  }
  
  // ===== SAFETY EQUIPMENT =====
  // From CSV row 10
  
  // Kill Cord System - for open steering positions
  if (vessel.steeringPosition === 'open' || vessel.steeringPosition === 'both' || category <= 3) {
    requirements.push({
      id: 'machinery.killcord',
      name: 'Kill Cord System',
      category: 'Machinery',
      reference: 'WBC3 8.9.1',
      mandatory: true,
      description: 'Fitted with a kill cord - Open steering positions'
    });
  }
  
  // ===== BILGE SYSTEM =====
  // From CSV rows 11-13
  
  // Hand Bilge Pump - MANDATORY
  requirements.push({
    id: 'machinery.bilge.pump.hand',
    name: 'Hand Bilge Pump',
    category: 'Machinery',
    reference: 'WBC3 11.2.1.1',
    mandatory: true,
    description: 'At least one hand bilge pump - Each separate space'
  });
  
  // Powered Bilge Pump - MANDATORY
  requirements.push({
    id: 'machinery.bilge.pump.powered',
    name: 'Powered Bilge Pump',
    category: 'Machinery',
    reference: 'WBC3 11.2.1.1',
    mandatory: true,
    description: 'One engine driven or independently powered bilge pump'
  });
  
  // Bilge Alarm - for machinery spaces
  if (vessel.hasMachinerySpace || vessel.hasEnclosedSpaces) {
    requirements.push({
      id: 'machinery.bilge.alarm',
      name: 'Bilge Alarm',
      category: 'Machinery',
      reference: 'WBC3 11.3.1',
      mandatory: true,
      description: 'Bilge alarm shall be fitted - Watertight compartments with machinery'
    });
  }
  
  // ===== RUDDER SYSTEM =====
  // From CSV row 14
  
  // Rudder System - if fitted
  if (vessel.hasRudder || vessel.steeringType === 'rudder') {
    requirements.push({
      id: 'machinery.rudder.system',
      name: 'Rudder System',
      category: 'Machinery',
      reference: 'WBC3 10.3.1',
      mandatory: true,
      description: 'Where fitted, the design...of a rudder system - Blade, stock and fittings'
    });
  }
  
  // ===== ENGINE STARTING =====
  // From CSV rows 15-17
  
  // Engine Starting System - MANDATORY (not applicable to battery electric propulsion)
  if (vessel.engineType !== 'battery_electric') {
    requirements.push({
      id: 'machinery.engine.starting',
      name: 'Engine Starting System',
      category: 'Machinery',
      reference: 'WBC3 8.8.1',
      mandatory: true,
      description: 'Engine shall be started either - Mechanical/air/electric'
    });
  }
  
  // Backup Starting Battery - for electric start (not needed for battery electric propulsion)
  if ((vessel.engineStartMethod === 'electric' || vessel.engineType === 'diesel') && vessel.engineType !== 'battery_electric') {
    requirements.push({
      id: 'machinery.battery.backup',
      name: 'Backup Starting Battery',
      category: 'Machinery',
      reference: 'WBC3 8.8.2',
      mandatory: true,
      description: 'Back-up battery and charging facility - For battery-only starting'
    });
  }
  
  // Air Start Receivers - for air start
  if (vessel.engineStartMethod === 'air') {
    requirements.push({
      id: 'machinery.air.receivers',
      name: 'Air Start Receivers',
      category: 'Machinery',
      reference: 'WBC3 8.8.3',
      mandatory: true,
      description: '2 air receivers each with sufficient capacity - 6 consecutive starts each'
    });
  }
  
  // ===== VENTILATION =====
  // From CSV row 18
  
  // Machinery Space Ventilation - for machinery spaces
  if (vessel.hasMachinerySpace || vessel.hasEnclosedSpaces) {
    const description = vessel.engineType === 'battery_electric'
      ? 'Adequate ventilation for battery/electrical compartments - Remote stop capability'
      : 'Fans within machinery space(s) - Remote stop capability';
    
    requirements.push({
      id: 'machinery.ventilation.machinery',
      name: 'Machinery Space Ventilation',
      category: 'Machinery',
      reference: 'WBC3 15.1.1.4',
      mandatory: true,
      description: description
    });
  }
  
  // ===== FUEL ISOLATION =====
  // From CSV row 19
  
  // Fuel Isolation Valve - for machinery spaces with fuel systems (not battery electric)
  if ((vessel.hasMachinerySpace || vessel.hasEnclosedSpaces) && vessel.engineType !== 'battery_electric') {
    requirements.push({
      id: 'machinery.fuel.isolation',
      name: 'Fuel Isolation Valve',
      category: 'Machinery',
      reference: 'WBC3 8.10.3',
      mandatory: true,
      description: 'Means shall be provided to isolate a source of fuel - Outside machinery space'
    });
  }
  
  return requirements;
}