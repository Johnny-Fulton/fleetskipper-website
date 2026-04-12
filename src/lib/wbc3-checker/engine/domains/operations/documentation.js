/**
 * Operations Documentation Requirements
 * Generated from UK-MARITIME-LIBRARY/03-CSV-DATABASES/SEAGOING/domains/OPERATIONS_v1/DOCS.csv
 * THIS FILE USES ONLY THE CSV DATA - NO MADE UP REQUIREMENTS
 * Following anchor mode pattern - max 300 lines
 */

export function getOperationsDocumentationRequirements(vessel) {
  const requirements = [];
  
  // Only apply to seagoing vessels
  if (!vessel.operatingStatus || vessel.operatingStatus !== 'seagoing') {
    return requirements;
  }
  
  // ===== LIFTING OPERATIONS DOCUMENTATION =====
  // From CSV rows 22-23
  
  if (vessel.hasLiftingOps || vessel.operations?.includes('lifting')) {
    // Lifting Equipment Operating Manual
    requirements.push({
      id: 'operations.doc.lifting.manual',
      name: 'Lifting Equipment Operating Manual',
      category: 'Operations Documentation',
      reference: 'WBC3 25.2.1.2',
      mandatory: true,
      description: "Manufacturer's operating manual and safety procedures - must be provided to master and crew"
    });
    
    
    // Lifting Equipment Thorough Examination Report
    requirements.push({
      id: 'operations.doc.lifting.examination',
      name: 'Lifting Equipment Thorough Examination Report',
      category: 'Operations Certificates',
      reference: 'MGN 332 Reg 15',
      mandatory: true,
      description: 'Annual thorough examination certificate - competent person certificate required',
      validity: 'Annual',
      retention: '2 years after next examination'
    });
    
    // Lifting Accessories Examination Report
    requirements.push({
      id: 'operations.doc.accessories.examination',
      name: 'Lifting Accessories Examination Report',
      category: 'Operations Certificates',
      reference: 'MGN 332 Reg 15',
      mandatory: true,
      description: '6-monthly examination certificate for lifting accessories',
      validity: '6 months',
      retention: '2 years'
    });
  }
  
  // ===== TOWING OPERATIONS DOCUMENTATION =====
  // From CSV rows 25-28, 37
  
  if (vessel.hasTowingOps || vessel.operations?.includes('towing') || 
      vessel.vesselType === 'tug' || vessel.type === 'tug') {
    
    // Towing Equipment Inspection Procedures
    requirements.push({
      id: 'operations.doc.towing.procedures',
      name: 'Towing Equipment Inspection Procedures',
      category: 'Operations Documentation',
      reference: 'WBC3 26.1.9',
      mandatory: true,
      description: 'Documented procedure for inspection, maintenance and routine testing'
    });
    
    // Emergency Towing Release Procedure
    requirements.push({
      id: 'operations.doc.towing.release',
      name: 'Emergency Towing Release Procedure',
      category: 'Operations Documentation',
      reference: 'WBC3 Table 26.2.1',
      mandatory: true,
      description: 'Documented and drilled procedure to release the tow - critical safety procedure'
    });
    
    // Towage Survey Report
    requirements.push({
      id: 'operations.doc.towage.survey',
      name: 'Towage Survey Report',
      category: 'Operations Documentation',
      reference: 'WBC3 26.1.10',
      mandatory: true,
      description: 'Survey by competent person before towing operations',
      retention: 'Until next survey'
    });
    
    
    // Towing Equipment Service Certificate
    requirements.push({
      id: 'operations.doc.towing.service',
      name: 'Towing Equipment Service Certificate',
      category: 'Operations Certificates',
      reference: 'WBC3 26.1.7',
      mandatory: true,
      description: 'Annual service certification for CA review',
      validity: 'Annual'
    });
  }
  
  // ===== PILOT BOAT DOCUMENTATION =====
  // From CSV rows 13-14, 38
  
  if (vessel.vesselType === 'pilot' || vessel.type === 'pilot' || vessel.isPilotBoat) {
    // Pilot Boat Certificate or Endorsement
    requirements.push({
      id: 'operations.doc.pilot.endorsement',
      name: 'Pilot Boat Certificate or Endorsement',
      category: 'Operations Certificates',
      reference: 'WBC3 27.1.1/3.10.4',
      mandatory: true,
      description: 'Pilot Boat Certificate or Certificate with Pilot Boat Endorsement',
      validity: '5 years'
    });
    
    // Note: Pilot procedures and risk assessments marked as GUIDANCE in CSV (rows 13-14)
    // These are SMS recommendations, not mandatory requirements
  }
  
  // ===== DIVING OPERATIONS DOCUMENTATION =====
  // From CSV rows 16-17
  
  if (vessel.hasDivingOps || vessel.operations?.includes('diving')) {
    // Note: Diving procedures and risk assessments marked as GUIDANCE in CSV
    // These are SMS recommendations, not mandatory requirements
  }
  
  // ===== POLICE BOAT DOCUMENTATION =====
  // From CSV rows 19-20
  
  if (vessel.vesselType === 'police' || vessel.type === 'police' || vessel.isPoliceVessel) {
    // Note: Police procedures and risk assessments marked as GUIDANCE in CSV
    // These are SMS recommendations, not mandatory requirements
  }
  
  // ===== UNIVERSAL FUEL TRANSFER REQUIREMENTS (WBC3 29.10.1) =====
  // AUTOMATIC for ALL seagoing vessels - all vessels receive fuel
  
  if (vessel.operatingStatus === 'seagoing') {
    
    // Universal Fuel Transfer Procedures
    requirements.push({
      id: 'operations.doc.universal.fuel.procedures',
      name: 'Fuel Transfer Procedures',
      category: 'Universal Fuel Safety',
      reference: 'WBC3 29.10.1.3',
      mandatory: true,
      description: 'Documented procedures for loading, discharging, handling and transferring fuel - kept on board at all times'
    });
    
    // Universal Oil Spillage Prevention Plan
    requirements.push({
      id: 'operations.doc.universal.fuel.spillage',
      name: 'Oil Spillage Prevention Plan',
      category: 'Universal Fuel Safety',
      reference: 'WBC3 29.10.1.1',
      mandatory: true,
      description: 'Up to date plan of mechanisms to deal with oil spillage during transfer - MEPC 54(32) compliance'
    });
    
    // Universal Fuel Transfer Risk Assessment
    requirements.push({
      id: 'operations.doc.universal.fuel.risk',
      name: 'Fuel Transfer Risk Assessment',
      category: 'Universal Fuel Safety',
      reference: 'WBC3 29.10.1.2',
      mandatory: true,
      description: 'Risk assessment including hose breakage, pollution, fire safety, training'
    });
    
    // Universal Fuel Transfer Record Book
    requirements.push({
      id: 'operations.doc.universal.fuel.record',
      name: 'Fuel Transfer Record Book',
      category: 'Universal Fuel Safety',
      reference: 'WBC3 29.10.1.4',
      mandatory: true,
      description: 'Record times, quantities on board and transferred for all fuel and products posing environmental risk',
      retention: '5 years'
    });
  }
  
  // ===== MGO TRANSFER ENDORSEMENT DOCUMENTATION (WBC3 29.10.2) =====
  // ONLY for vessels with MGO Transfer Endorsement
  
  if (vessel.hasMGOTransferEndorsement || vessel.vesselType === 'workboat_mgo_transfer_endorsed' || 
      vessel.vesselType === 'workboat_towing_mgo_transfer') {
    
    // MGO Transfer MSDS Documentation (transfer-specific requirement)
    requirements.push({
      id: 'operations.doc.mgo.transfer.msds',
      name: 'MGO Transfer MSDS Documentation',
      category: 'MGO Transfer Operations',
      reference: 'WBC3 29.10.2.5.3',
      mandatory: true,
      description: 'Up-to-date MSDS from fuel supplier, specific to fuel carried on board for transfer operations',
      retention: 'Current versions maintained'
    });
  }
  
  // ===== MGO TRANSFER TRAINING REQUIREMENTS (WBC3 29.10.2) =====
  // ONLY for vessels with MGO Transfer Endorsement
  
  if (vessel.hasMGOTransferEndorsement || vessel.vesselType === 'workboat_mgo_transfer_endorsed' || 
      vessel.vesselType === 'workboat_towing_mgo_transfer') {
    
    // 1. MGO Transfer Operations Training
    requirements.push({
      id: 'operations.training.mgo.transfer.operations',
      name: 'MGO Transfer Operations Training',
      category: 'MGO Transfer Training',
      reference: 'WBC3 29.10.2.5',
      mandatory: true,
      description: 'All crew trained in safe equipment use minimizing fire risks and pollution',
      retention: '3 years'
    });
    
    // 2. MGO Transfer Weather Assessment Training
    requirements.push({
      id: 'operations.training.mgo.transfer.weather',
      name: 'MGO Transfer Weather Assessment Training',
      category: 'MGO Transfer Training',
      reference: 'WBC3 29.10.2.5.2',
      mandatory: true,
      description: 'Training to identify appropriate weather conditions for equipment use',
      retention: '3 years'
    });
    
    // 3. MGO Transfer MSDS Training
    requirements.push({
      id: 'operations.training.mgo.transfer.msds',
      name: 'MGO Transfer MSDS Training',
      category: 'MGO Transfer Training',
      reference: 'WBC3 29.10.2.5.3',
      mandatory: true,
      description: 'Training on MSDS use for fuel being transferred to other vessels',
      retention: '3 years'
    });
  }
  
  // ===== MGO TRANSFER MAINTENANCE REQUIREMENTS (WBC3 29.10.2) =====
  // ONLY for vessels with MGO Transfer Endorsement
  
  if (vessel.hasMGOTransferEndorsement || vessel.vesselType === 'workboat_mgo_transfer_endorsed' || 
      vessel.vesselType === 'workboat_towing_mgo_transfer') {
    
    // 1. MGO Transfer Hose Annual Inspection
    requirements.push({
      id: 'operations.maintenance.mgo.transfer.hose_inspection',
      name: 'MGO Transfer Hose Annual Inspection',
      category: 'MGO Transfer Maintenance',
      reference: 'WBC3 29.10.1.9',
      mandatory: true,
      description: 'Inspect transfer hoses, check dry break couplings, verify bonding, MIN 698 compliance, replace if damaged',
      validity: 'Annual',
      retention: '2 years'
    });
    
    // 2. MGO Transfer System Monthly Check
    requirements.push({
      id: 'operations.maintenance.mgo.transfer.monthly_check',
      name: 'MGO Transfer System Monthly Check',
      category: 'MGO Transfer Maintenance',
      reference: 'WBC3 29.10.1',
      mandatory: true,
      description: 'Check pump operation, test emergency shutdown accessibility, inspect hose stowage, verify metering if fitted',
      validity: 'Monthly',
      retention: '2 years'
    });
  }
  
  // ===== GAS APPLIANCE DOCUMENTATION =====
  // From CSV row 39
  
  if (vessel.hasGasAppliance || vessel.equipment?.includes('gas_cooker') || 
      vessel.equipment?.includes('gas_heater')) {
    requirements.push({
      id: 'operations.doc.gas.safe',
      name: 'Gas Safe Certificate',
      category: 'Operations Certificates',
      reference: 'WBC3 15.2.8',
      mandatory: true,
      description: 'Annual gas appliance safety certificate - Gas Safe registered marine qualified technician',
      validity: 'Annual'
    });
  }
  
  // ===== MANDATORY SMS POLICIES =====
  // From OPERATIONS_v1/DOCS.csv lines 201-203 - WBC3 Appendix 8 requirements
  
  // Safety & Environmental Protection Policy
  requirements.push({
    id: 'operations.doc.policy.safety.environmental',
    name: 'Safety & Environmental Protection Policy',
    category: 'SMS Policies',
    reference: 'WBC3 Appendix 8 1.2.1',
    mandatory: true,
    description: 'SMS policy for safety and environmental protection',
    priority: 'critical',
    tags: ['SMS_AUDIT', 'POLICY'],
    note: 'Mandatory SMS policy requirement'
  });
  
  // Health & Safety Protection Policy
  requirements.push({
    id: 'operations.doc.policy.health.safety',
    name: 'Health & Safety Protection Policy',
    category: 'SMS Policies',
    reference: 'WBC3 Appendix 8 1.2.2',
    mandatory: true,
    description: 'SMS policy for health and safety protection',
    priority: 'critical',
    tags: ['SMS_AUDIT', 'POLICY'],
    note: 'Mandatory SMS policy requirement'
  });
  
  // Alcohol & Drug Abuse Prevention Policy
  requirements.push({
    id: 'operations.doc.policy.alcohol.drugs',
    name: 'Alcohol & Drug Abuse Prevention Policy',
    category: 'SMS Policies',
    reference: 'WBC3 Appendix 8 1.2.3',
    mandatory: true,
    description: 'SMS policy for alcohol and drug abuse prevention',
    priority: 'critical',
    tags: ['SMS_AUDIT', 'POLICY'],
    note: 'Mandatory SMS policy requirement'
  });
  
  // ===== MANDATORY CYBER SECURITY REQUIREMENTS =====
  // From OPERATIONS_v1/DOCS.csv lines 204-206 - WBC3 Section 31.3 requirements
  
  // Cyber Security Risk Assessment
  requirements.push({
    id: 'operations.doc.ra.cyber',
    name: 'Cyber Security Risk Assessment',
    category: 'Cyber Security',
    reference: 'WBC3 31.3.1',
    mandatory: true,
    description: 'Risk assessment for cyber security threats - identify vulnerabilities and establish appropriate safeguards',
    priority: 'critical',
    tags: ['SMS_AUDIT', 'RISK_ASSESSMENT'],
    note: 'Mandatory cyber security requirement'
  });
  
  // Cyber Security Back-up Plan
  requirements.push({
    id: 'operations.doc.cyber.backup',
    name: 'Cyber Security Back-up Plan',
    category: 'Cyber Security',
    reference: 'WBC3 31.3.2',
    mandatory: true,
    description: 'Back-up plan for cyber security incidents - measures to be taken in case of cyber failure',
    priority: 'critical',
    tags: ['SMS_AUDIT', 'PROCEDURES'],
    note: 'Mandatory cyber security requirement'
  });
  
  // Electronic Remote Access Log
  requirements.push({
    id: 'operations.doc.cyber.access.log',
    name: 'Electronic Remote Access Log',
    category: 'Cyber Security',
    reference: 'WBC3 31.3.3',
    mandatory: true,
    description: 'Log of all electronic remote access to vessel systems',
    priority: 'critical',
    tags: ['SMS_AUDIT', 'RECORDS'],
    note: 'Mandatory cyber security requirement',
    retention: 'As per company SMS requirements'
  });
  
  // ===== WBC3 ANNEX 1 - BATTERY PROPULSION DOCUMENTATION =====
  // Real documentation requirements from regulations assistant analysis
  
  if (vessel.requiresWBC3Annex1 || vessel.isBatterySystem) {
    
    // Risk Assessment - MANDATORY (submitted to Administration)
    requirements.push({
      id: 'operations.doc.battery.risk_assessment',
      name: 'Battery System Risk Assessment',
      category: 'Battery Documentation',
      reference: 'WBC3 Annex 1 Section 2.2.1',
      mandatory: true,
      description: 'Comprehensive risk assessment for battery propulsion system submitted to Administration',
      retention: 'Life of vessel'
    });
    
    // Battery Operating Manual - MANDATORY (at control positions)
    requirements.push({
      id: 'operations.doc.battery.operating_manual',
      name: 'Battery Operating Manual',
      category: 'Battery Documentation',
      reference: 'WBC3 Annex 1 Section 2.7.4.1',
      mandatory: true,
      description: 'Operating manual for battery systems available at control positions',
      retention: 'Current version maintained'
    });
    
    // Battery Lifetime Management Plan - MANDATORY
    requirements.push({
      id: 'operations.doc.battery.lifetime_plan',
      name: 'Battery Lifetime Management Plan',
      category: 'Battery Documentation',
      reference: 'WBC3 Annex 1 Section 2.7.4.2',
      mandatory: true,
      description: 'Plan for battery lifecycle management, maintenance, and replacement',
      retention: 'Life of vessel'
    });
    
    // Battery System Specifications Record - MANDATORY
    requirements.push({
      id: 'operations.doc.battery.specifications',
      name: 'Battery System Specifications Record',
      category: 'Battery Documentation',
      reference: 'WBC3 Annex 1 Section 2.7.3',
      mandatory: true,
      description: 'Technical specifications and configuration record for battery systems',
      retention: 'Life of vessel'
    });
    
    // Battery Manufacturer Instructions - MANDATORY
    requirements.push({
      id: 'operations.doc.battery.manufacturer_instructions',
      name: 'Battery Manufacturer Instructions',
      category: 'Battery Documentation',
      reference: 'WBC3 Annex 1 Section 2.3.4',
      mandatory: true,
      description: 'Manufacturer operating and maintenance instructions for battery systems',
      retention: 'Life of equipment'
    });
    
    // Emergency Contingency Plan - MANDATORY
    requirements.push({
      id: 'operations.doc.battery.emergency_plan',
      name: 'Battery Emergency Contingency Plan',
      category: 'Battery Documentation',
      reference: 'WBC3 Annex 1 Section 2.8.2',
      mandatory: true,
      description: 'Emergency procedures for battery system failures and incidents',
      retention: 'Current version maintained'
    });
  }
  
  // ===== WBC3 ANNEX 1 - BATTERY PROPULSION TRAINING =====
  // Real training requirements from regulations assistant analysis
  
  if (vessel.requiresWBC3Annex1 || vessel.isBatterySystem) {
    
    // Battery Alarm Response Training - MANDATORY (≥1 person)
    requirements.push({
      id: 'operations.training.battery.alarm_response',
      name: 'Battery Alarm Response Training',
      category: 'Battery Training',
      reference: 'WBC3 Annex 1 Section 2.7.5',
      mandatory: true,
      description: 'Training for at least one person onboard in battery system alarm response procedures',
      validity: 'Annual refresher recommended',
      retention: 'Training records per SMS requirements'
    });
    
    // Emergency Procedures Training - MANDATORY (all crew)
    requirements.push({
      id: 'operations.training.battery.emergency_procedures',
      name: 'Battery Emergency Procedures Training',
      category: 'Battery Training',
      reference: 'WBC3 Annex 1 Section 2.7.6',
      mandatory: true,
      description: 'Emergency procedures training for all crew members operating battery propulsion vessels',
      validity: 'Annual refresher recommended',
      retention: 'Training records per SMS requirements'
    });
    
    // Remote Operations Training - CONDITIONAL (if applicable)
    if (vessel.hasRemoteOperations) {
      requirements.push({
        id: 'operations.training.battery.remote_operations',
        name: 'Remote Operations Training',
        category: 'Battery Training',
        reference: 'WBC3 Annex 1 Section 2.7.6',
        mandatory: true,
        description: 'Training for remote operation of battery propulsion systems if applicable',
        validity: 'Annual refresher recommended',
        retention: 'Training records per SMS requirements'
      });
    }
  }
  
  // ===== HIGH-SPEED OPERATIONS DOCUMENTATION (WBC3 25.4) =====
  // ONLY for vessels with High-Speed Endorsement
  
  if (vessel.hasHighSpeedEndorsement || vessel.vesselType === 'workboat_high_speed_endorsed' || 
      vessel.vesselType === 'workboat_pilot_high_speed') {
    
    // 1. High-Speed Operations Risk Assessment
    requirements.push({
      id: 'operations.doc.high_speed.risk_assessment',
      name: 'High-Speed Operations Risk Assessment',
      category: 'High-Speed Documentation',
      reference: 'WBC3 25.4.2',
      mandatory: true,
      description: 'Risk assessment for high-speed operations covering vibration, shock, crew fatigue and hazards specific to high-speed operations',
      retention: 'Current'
    });
    
    // 2. High-Speed Vibration Assessment
    requirements.push({
      id: 'operations.doc.high_speed.vibration_assessment',
      name: 'High-Speed Vibration Assessment',
      category: 'High-Speed Documentation',
      reference: 'WBC3 25.4.1/MGN 436',
      mandatory: true,
      description: 'Compliance with Merchant Shipping and Fishing Vessels (Control of Vibration at Work) Regulations 2007, using Code of Practice for Controlling Risks due to Whole body Vibration on Ships',
      retention: 'Current'
    });
    
    // 3. High-Speed Operating Procedures
    requirements.push({
      id: 'operations.doc.high_speed.operating_procedures',
      name: 'High-Speed Operating Procedures',
      category: 'High-Speed Documentation',
      reference: 'WBC3 25.4.4',
      mandatory: true,
      description: 'All persons must remain seated during high-speed operations, standing only over jockey seats as appropriate, movement only for specific operational purposes',
      retention: 'Current'
    });
    
    // 4. High-Speed Weather Assessment Procedures
    requirements.push({
      id: 'operations.doc.high_speed.weather_assessment',
      name: 'High-Speed Weather Assessment Procedures',
      category: 'High-Speed Documentation',
      reference: 'WBC3 22.3.4/25.4',
      mandatory: true,
      description: 'Weather and sea state conditions must be continually assessed, ambient sea conditions and whole body vibration monitored throughout voyage',
      retention: 'Current'
    });
    
    // 5. RIB High-Speed Restrictions (conditional)
    if (vessel.hullType === 'RIB' || vessel.hullType === 'INFLATABLE' || vessel.vesselType === 'rib') {
      requirements.push({
        id: 'operations.doc.high_speed.rib_restrictions',
        name: 'RIB High-Speed Restrictions',
        category: 'High-Speed Documentation',
        reference: 'WBC3 25.4.5',
        mandatory: true,
        description: 'For RIB/inflatable boats: Only designated inboard seats permitted, excludes gunwales or tubes',
        retention: 'Current'
      });
    }
  }
  
  // ===== HIGH-SPEED OPERATIONS TRAINING (WBC3 25.4) =====
  // ONLY for vessels with High-Speed Endorsement
  
  if (vessel.hasHighSpeedEndorsement || vessel.vesselType === 'workboat_high_speed_endorsed' || 
      vessel.vesselType === 'workboat_pilot_high_speed') {
    
    // 1. High-Speed Master Qualification
    requirements.push({
      id: 'operations.training.high_speed.master_qualification',
      name: 'High-Speed Master Qualification',
      category: 'High-Speed Training',
      reference: 'WBC3 Table A5.1 Note F',
      mandatory: true,
      description: 'RYA/MCA Advanced Powerboat Certificate with suitable experience of relevant high-speed operations, training completed in high-speed vessel',
      retention: '5 years'
    });
    
    // 2. High-Speed Operations Training
    requirements.push({
      id: 'operations.training.high_speed.operations_training',
      name: 'High-Speed Operations Training',
      category: 'High-Speed Training',
      reference: 'WBC3 25.4/Manning Tables',
      mandatory: true,
      description: 'Training must be vessel-type specific for high-speed operations, including heavy weather vessel handling',
      retention: '5 years'
    });
  }
  
  // ===== HIGH-SPEED OPERATIONS MAINTENANCE (WBC3 25.4) =====
  // ONLY for vessels with High-Speed Endorsement
  
  if (vessel.hasHighSpeedEndorsement || vessel.vesselType === 'workboat_high_speed_endorsed' || 
      vessel.vesselType === 'workboat_pilot_high_speed') {
    
    // 1. High-Speed Seating Annual Inspection
    requirements.push({
      id: 'operations.maintenance.high_speed.seating_inspection',
      name: 'High-Speed Seating Annual Inspection',
      category: 'High-Speed Maintenance',
      reference: 'WBC3 25.4',
      mandatory: true,
      description: 'Inspect individual seating systems, check shock absorption effectiveness, verify effective bracing and lateral support',
      validity: 'Annual',
      retention: '2 years'
    });
    
    // 2. High-Speed Vibration Control Check
    requirements.push({
      id: 'operations.maintenance.high_speed.vibration_check',
      name: 'High-Speed Vibration Control Check',
      category: 'High-Speed Maintenance',
      reference: 'WBC3 25.4.1',
      mandatory: true,
      description: 'Check headrests, footrests, movable armrests condition, verify shock absorbent seating effectiveness',
      validity: 'Monthly',
      retention: '2 years'
    });
  }
  
  return requirements;
}