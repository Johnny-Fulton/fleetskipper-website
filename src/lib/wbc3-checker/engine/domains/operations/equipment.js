/**
 * Operations Equipment Requirements
 * Generated from UK-MARITIME-LIBRARY/03-CSV-DATABASES/SEAGOING/domains/OPERATIONS_v1/EQUIPMENT_REGISTER.csv
 * THIS FILE USES ONLY THE CSV DATA - NO MADE UP REQUIREMENTS
 * Following anchor mode pattern - max 300 lines
 */

export function getOperationsEquipmentRequirements(vessel) {
  const requirements = [];
  
  // Only apply to seagoing vessels
  if (!vessel.operatingStatus || vessel.operatingStatus !== 'seagoing') {
    return requirements;
  }
  
  // ===== LIFTING OPERATIONS =====
  // From CSV rows 9-13
  // NOTE: Light Duty Workboat Certificates PROHIBIT lifting devices (WBC3 Section 3.9.3.5)
  
  // Crane - if vessel has crane (blocked for Light Duty certificates)
  if ((vessel.hasCrane || vessel.equipment?.includes('crane')) && vessel.vesselType !== 'light_duty_workboat') {
    requirements.push({
      id: 'operations.equipment.crane',
      name: 'Crane',
      category: 'Deck Equipment',
      reference: 'WBC3 25.2',
      mandatory: true,
      description: 'Vessel fitted with crane for lifting operations'
    });
  }
  
  // Lifting device (other than crane) - blocked for Light Duty certificates
  if ((vessel.hasLiftingDevice || vessel.equipment?.includes('lifting_device')) && 
      !(vessel.hasCrane || vessel.equipment?.includes('crane')) &&
      vessel.vesselType !== 'light_duty_workboat') {
    requirements.push({
      id: 'operations.equipment.lifting.device',
      name: 'Lifting device (other than crane)',
      category: 'Deck Equipment',
      reference: 'WBC3 25.2',
      mandatory: true,
      description: 'Other lifting devices including davits or hoists'
    });
  }
  
  // Diver lift - blocked for Light Duty certificates
  if ((vessel.hasDiverLift || vessel.equipment?.includes('diver_lift')) && vessel.vesselType !== 'light_duty_workboat') {
    requirements.push({
      id: 'operations.equipment.diver.lift',
      name: 'Diver lift',
      category: 'Deck Equipment',
      reference: 'WBC3 25.3',
      mandatory: true,
      description: 'Lift system for diver recovery operations'
    });
  }
  
  // General lifting equipment and accessories - blocked for Light Duty certificates
  if ((vessel.hasLiftingOps || vessel.operations?.includes('lifting') || 
      vessel.hasCrane || vessel.hasLiftingDevice || vessel.hasDiverLift) &&
      vessel.vesselType !== 'light_duty_workboat') {
    requirements.push({
      id: 'operations.equipment.lifting.equipment',
      name: 'General lifting equipment',
      category: 'Deck Equipment',
      reference: 'WBC3 25.2',
      mandatory: true,
      description: 'General category for lifting equipment not specified above'
    });
    
    requirements.push({
      id: 'operations.equipment.lifting.accessories',
      name: 'Lifting accessories',
      category: 'Deck Equipment',
      reference: 'WBC3 25.2/LOLER',
      mandatory: true,
      description: 'Includes slings, shackles, strops, hooks, eyebolts etc'
    });
  }
  
  // ===== TOWING OPERATIONS =====
  // From CSV rows 15-20
  // NOTE: Light Duty Workboat Certificates PROHIBIT standard towing operations (WBC3 Section 3.9.3.5)
  // NOTE: WBC3 Section 26.1.5 requires vessels engaged in towing to have endorsement
  
  const hasTowingEndorsement = vessel.vesselType === 'workboat_towing_endorsed' || vessel.vesselType === 'tug';
  const hasTowingOperation = vessel.hasTowingOps || vessel.operations?.includes('towing');
  
  if ((hasTowingOperation || vessel.vesselType === 'tug' || vessel.type === 'tug') &&
      vessel.vesselType !== 'light_duty_workboat' &&
      hasTowingEndorsement) {
    
    // Main towline
    requirements.push({
      id: 'operations.equipment.towline.main',
      name: 'Main towline',
      category: 'Towing Equipment',
      reference: 'WBC3 26',
      mandatory: true,
      description: 'Primary towline for towing operations'
    });
    
    // Emergency towline
    requirements.push({
      id: 'operations.equipment.towline.emergency',
      name: 'Emergency towline',
      category: 'Towing Equipment',
      reference: 'WBC3 26.4.4',
      mandatory: true,
      description: 'Pre-rigged emergency towline for backup'
    });
    
    // Towing winch
    requirements.push({
      id: 'operations.equipment.towing.winch',
      name: 'Towing winch',
      category: 'Towing Equipment',
      reference: 'WBC3 26',
      mandatory: true,
      description: 'Winch for controlled towing operations'
    });
    
    // Towing hook
    requirements.push({
      id: 'operations.equipment.towing.hook',
      name: 'Towing hook',
      category: 'Towing Equipment',
      reference: 'WBC3 26',
      mandatory: true,
      description: 'Quick release towing hook'
    });
    
    // Gob/Gog rope
    requirements.push({
      id: 'operations.equipment.gob.rope',
      name: 'Gob/Gog rope',
      category: 'Towing Equipment',
      reference: 'WBC3 26',
      mandatory: true,
      description: 'Anti-girting rope to prevent capsizing'
    });
    
    // Towing bollard/bitt
    requirements.push({
      id: 'operations.equipment.towing.bollard',
      name: 'Towing bollard/bitt',
      category: 'Towing Equipment',
      reference: 'WBC3 26',
      mandatory: true,
      description: 'Heavy duty bollard for towing operations'
    });
  }
  
  // ===== DIVING OPERATIONS =====
  // From CSV rows 22-23
  
  // Dive basket/platform
  if (vessel.hasDiveBasket || vessel.equipment?.includes('dive_basket')) {
    requirements.push({
      id: 'operations.equipment.dive.basket',
      name: 'Dive basket/platform',
      category: 'Deck Equipment',
      reference: 'WBC3 25.3',
      mandatory: true,
      description: 'Platform or basket for diver deployment/recovery'
    });
  }
  
  // Dive ladder
  if (vessel.hasDiveLadder || vessel.equipment?.includes('dive_ladder')) {
    requirements.push({
      id: 'operations.equipment.dive.ladder',
      name: 'Dive ladder',
      category: 'Deck Equipment',
      reference: 'WBC3 25.3',
      mandatory: true,
      description: 'Ladder for diver water access'
    });
  }
  
  // ===== PILOT BOAT OPERATIONS =====
  // From CSV rows 25-27
  
  if (vessel.vesselType === 'pilot' || vessel.vesselType === 'pilot_boat_dedicated' || vessel.vesselType === 'workboat_pilot_endorsed' || vessel.type === 'pilot' || vessel.isPilotBoat) {
    // Compact stretcher
    requirements.push({
      id: 'operations.equipment.pilot.stretcher',
      name: 'Compact stretcher',
      category: 'Medical Equipment',
      reference: 'WBC3 Table 27.2.3',
      mandatory: true,
      description: 'Compact stretcher for pilot boat operations'
    });
    
    // Searchlight
    requirements.push({
      id: 'operations.equipment.pilot.searchlight',
      name: 'Searchlight (pilot boat)',
      category: 'Navigation Equipment',
      reference: 'WBC3 Table 27.2.3',
      mandatory: true,
      description: 'Searchlight for pilot transfer operations'
    });
    
    // Recovery ladder/steps
    requirements.push({
      id: 'operations.equipment.pilot.recovery',
      name: 'Recovery ladder/steps',
      category: 'Deck Equipment',
      reference: 'WBC3 Table 27.2.3 14.7',
      mandatory: true,
      description: 'Transom steps/ladder or scrambling net for MOB recovery'
    });
  }
  
  // ===== UNIVERSAL FUEL SPILL EQUIPMENT (WBC3 29.10.1) =====
  // AUTOMATIC for ALL seagoing vessels - all vessels receive fuel
  
  if (vessel.operatingStatus === 'seagoing') {
    requirements.push({
      id: 'operations.equipment.universal.fuel.cleanup',
      name: 'Fuel Spill Cleanup Equipment',
      category: 'Universal Fuel Safety',
      reference: 'WBC3 29.10.1.5',
      mandatory: true,
      qtyRequired: 1,
      description: 'Suitable clean up equipment readily available when transferring fuel, includes scupper plugs'
    });
  }
  
  // ===== MGO TRANSFER ENDORSEMENT EQUIPMENT (WBC3 29.10.2) =====
  // ONLY for vessels with MGO Transfer Endorsement
  
  if (vessel.hasMGOTransferEndorsement || vessel.vesselType === 'workboat_mgo_transfer_endorsed' || 
      vessel.vesselType === 'workboat_towing_mgo_transfer') {
    
    // 1. MGO Transfer Pump with Emergency Shutdown
    requirements.push({
      id: 'operations.equipment.mgo.transfer.pump',
      name: 'MGO Transfer Pump with Emergency Shutdown',
      category: 'MGO Transfer Equipment',
      reference: 'WBC3 29.10.1.6',
      mandatory: true,
      qtyRequired: 1,
      description: 'Emergency shut-down button easily accessible from permanently manned position during transfer'
    });
    
    // 2. MGO Transfer Hose (Dry Break)
    requirements.push({
      id: 'operations.equipment.mgo.transfer.hose',
      name: 'MGO Transfer Hose (Dry Break)',
      category: 'MGO Transfer Equipment',
      reference: 'WBC3 29.10.1.8',
      mandatory: true,
      qtyRequired: 'as_required',
      description: 'Dry break coupling fitted, comply with MIN 698 standards, bonded, suitable for product/pressure/height'
    });
    
    // 3. MGO Hose Stowage System
    requirements.push({
      id: 'operations.equipment.mgo.transfer.stowage',
      name: 'MGO Hose Stowage System',
      category: 'MGO Transfer Equipment',
      reference: 'WBC3 29.10.1.7',
      mandatory: true,
      qtyRequired: 1,
      description: 'Suitable stowage provided for fuel transfer hoses'
    });
    
    // 4. MGO Metering System (conditional)
    if (vessel.transfersFromOwnTanks || vessel.mgoOperations?.includes('OWN_TANK_TRANSFER')) {
      requirements.push({
        id: 'operations.equipment.mgo.transfer.metering',
        name: 'MGO Metering System',
        category: 'MGO Transfer Equipment',
        reference: 'WBC3 29.10.2.4',
        mandatory: true,
        qtyRequired: 1,
        description: 'Metering arrangements to ensure sufficient fuel remains for normal/emergency operations'
      });
    }
  }
  
  // ===== POLICE BOAT OPERATIONS =====
  // From CSV row 34
  
  if (vessel.vesselType === 'police' || vessel.vesselType === 'police_boat' || vessel.type === 'police' || vessel.isPoliceVessel) {
    requirements.push({
      id: 'operations.equipment.police.searchlight',
      name: 'Searchlight (police boat)',
      category: 'Navigation Equipment',
      reference: 'WBC3 Annex 3 13.5.1',
      mandatory: true,
      description: 'Fixed or portable searchlight for MOB operations'
    });
  }
  
  // ===== PERSONNEL TRANSFER OPERATIONS =====
  // From CSV rows 36-37
  
  // Gangway/brow
  if (vessel.hasPersonnelTransfer || vessel.operations?.includes('personnel_transfer')) {
    requirements.push({
      id: 'operations.equipment.gangway',
      name: 'Gangway/brow',
      category: 'Deck Equipment',
      reference: 'WBC3 25.5',
      mandatory: true,
      description: 'Gangway for personnel transfer operations'
    });
  }
  
  // Bow fendering for personnel transfer operations (WBC3 25.5.2)
  // SPECIFIC to vessels intended for transfer of persons over the bow
  if (vessel.hasPersonnelTransferOverBow || 
      (vessel.hasPersonnelTransfer && vessel.transferMethod === 'bow') ||
      vessel.operations?.includes('bow_personnel_transfer')) {
    requirements.push({
      id: 'operations.equipment.bow.fendering',
      name: 'Bow Fendering (Personnel Transfer)',
      category: 'Deck Equipment',
      reference: 'WBC3 25.5.2',
      mandatory: true,
      description: 'Foredeck and bow fendering arrangements for personnel transfer over the bow'
    });
  }
  
  // ===== HIGH-SPEED OPERATIONS EQUIPMENT (WBC3 25.4) =====
  // ONLY for vessels with High-Speed Endorsement
  
  if (vessel.hasHighSpeedEndorsement || vessel.vesselType === 'workboat_high_speed_endorsed' || 
      vessel.vesselType === 'workboat_pilot_high_speed') {
    
    // 1. High-Speed Individual Inboard Seating
    requirements.push({
      id: 'operations.equipment.high_speed.seating',
      name: 'High-Speed Individual Inboard Seating',
      category: 'High-Speed Equipment',
      reference: 'WBC3 25.4.3',
      mandatory: true,
      qtyRequired: 'passenger_capacity',
      description: 'Individual inboard seating for all persons on board with effective bracing and lateral support, located to avoid greatest shock loads'
    });
    
    // 2. High-Speed Headrests
    requirements.push({
      id: 'operations.equipment.high_speed.headrests',
      name: 'High-Speed Headrests',
      category: 'High-Speed Equipment',
      reference: 'WBC3 22.3.5/25.4.1',
      mandatory: true,
      qtyRequired: 'passenger_capacity',
      description: 'Headrests required for vibration control during high-speed operations'
    });
    
    // 3. High-Speed Footrests
    requirements.push({
      id: 'operations.equipment.high_speed.footrests',
      name: 'High-Speed Footrests',
      category: 'High-Speed Equipment',
      reference: 'WBC3 22.3.5/25.4.1',
      mandatory: true,
      qtyRequired: 'passenger_capacity',
      description: 'Footrests required for effective bracing during high-speed operations'
    });
    
    // 4. High-Speed Movable Armrests
    requirements.push({
      id: 'operations.equipment.high_speed.armrests',
      name: 'High-Speed Movable Armrests',
      category: 'High-Speed Equipment',
      reference: 'WBC3 22.3.5/25.4.1',
      mandatory: true,
      qtyRequired: 'passenger_capacity',
      description: 'Movable armrests required for vibration control'
    });
    
    // 5. High-Speed Shock Absorbent Seating
    requirements.push({
      id: 'operations.equipment.high_speed.shock_seating',
      name: 'High-Speed Shock Absorbent Seating',
      category: 'High-Speed Equipment',
      reference: 'WBC3 22.3.5/25.4.1',
      mandatory: true,
      qtyRequired: 'passenger_capacity',
      description: 'Shock absorbent seating with individual ergonomic design for vibration control'
    });
  }
  
  return requirements;
}