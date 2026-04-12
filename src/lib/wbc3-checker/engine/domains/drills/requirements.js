/**
 * Drills Domain - Drill Requirements
 * Following Domain Spine v2 architecture
 * 
 * CRITICAL COMPLIANCE NOTE:
 * Fire and Abandon Ship drills are MANDATORY MONTHLY per SI 1999/2722 Regulation 8(2)
 * NO exceptions for crew size. Each crew member must participate at least once per month.
 */

import { COMPLIANCE_CONSTANTS } from '../../../complianceConstants';
import { determineRegulatoryFramework } from '../../../regulatoryFramework';

// Core drill types per WBC3 requirements
export const DRILL_TYPES = {
  FIRE: 'fire',
  ABANDON_SHIP: 'abandon_ship',
  MOB: 'mob',
  POLLUTION_RESPONSE: 'pollution_response',
  GMDSS_DSC: 'gmdss_dsc',
  MEDICAL_EMERGENCY: 'medical_emergency',
  FLOODING: 'flooding',
  STEERING_NAV_FAIL: 'steering_nav_fail',
  ELECTRICAL_BLACKOUT: 'electrical_blackout',
  ENCLOSED_SPACE_ENTRY: 'enclosed_space_entry',
  TOWING_EMERGENCY: 'towing_emergency',
  COLLISION: 'collision',
  GROUNDING: 'grounding'
};

// Compliance levels per regulatory guidance
export const COMPLIANCE_LEVELS = {
  REQUIRED: 'Required',      // Legally mandated under WBC3 or ISM
  RECOMMENDED: 'Recommended', // Best practice or commonly required by SMS
  OPTIONAL: 'Optional'       // Operator-defined or based on unusual vessel config
};

/**
 * Normalize vessel type for consistent comparison
 */
const normalizeVesselType = (type) => {
  return (type || '').toLowerCase().trim();
};

/**
 * Get fire drill requirements
 */
const getFireDrillRequirement = (vesselData) => {
  // MANDATORY MONTHLY per SI 1999/2722 Regulation 8(2)
  return {
    drill_type: 'fire',
    frequency_days: COMPLIANCE_CONSTANTS.DRILLS.FIRE_DRILL_DAYS,
    compliance_level: COMPLIANCE_LEVELS.REQUIRED,
    risk_dependent: false,
    regulatory_source: 'SI 1999/2722 Regulation 8(2)',
    note: 'Monthly drills required by law - each crew member must participate at least once per month',
    configurable: false,
    warning: '⚠️ MANDATORY: Fire drills must be conducted monthly per UK regulations. NO exceptions for crew size.'
  };
};

/**
 * Get abandon ship drill requirements
 */
const getAbandonShipDrillRequirement = (vesselData) => {
  // MANDATORY MONTHLY per SI 1999/2722 Regulation 8(2)
  return {
    drill_type: 'abandon_ship',
    frequency_days: COMPLIANCE_CONSTANTS.DRILLS.ABANDON_SHIP_DAYS,
    compliance_level: COMPLIANCE_LEVELS.REQUIRED,
    risk_dependent: false,
    regulatory_source: 'SI 1999/2722 Regulation 8(2)',
    note: 'Monthly drills required by law - each crew member must participate at least once per month',
    configurable: false,
    warning: '⚠️ MANDATORY: Abandon ship drills must be conducted monthly (30 days) per UK regulations. NO exceptions for crew size.'
  };
};

/**
 * Get MOB drill requirements
 */
const getMOBDrillRequirement = (vesselData) => {
  // MOB drills "regularly routinely" per WBC3 Section 14.11.2
  return {
    drill_type: 'mob',
    frequency_days: COMPLIANCE_CONSTANTS.DRILLS.MAN_OVERBOARD_DAYS,
    compliance_level: COMPLIANCE_LEVELS.REQUIRED,
    risk_dependent: false,
    regulatory_source: 'WBC3 Section 14.11.2',
    note: 'Required "regularly routinely" - industry practice is quarterly (90 days)',
    configurable: true,
    warning: 'Frequency based on industry practice and risk assessment. May be adjusted based on vessel operations.'
  };
};

/**
 * Get pollution response drill requirements
 */
const getPollutionResponseDrillRequirement = (vesselData) => {
  const { SOPEP_applicable, oil_capacity_litres } = vesselData;
  const requiresSOPEP = SOPEP_applicable || (oil_capacity_litres && oil_capacity_litres > 400);
  
  if (requiresSOPEP) {
    return {
      drill_type: 'pollution_response',
      frequency_days: 180,
      compliance_level: COMPLIANCE_LEVELS.RECOMMENDED,
      risk_dependent: true,
      regulatory_source: 'MARPOL, SOPEP, WBC3 Section 10.1.10',
      note: 'Recommended if SOPEP applicable or oil capacity >400L'
    };
  } else {
    return {
      drill_type: 'pollution_response',
      frequency_days: 180,
      compliance_level: COMPLIANCE_LEVELS.OPTIONAL,
      risk_dependent: true,
      regulatory_source: 'WBC3 Section 10.1.10 + MARPOL',
      note: 'Optional - no oil capacity or SOPEP requirement'
    };
  }
};

/**
 * Check if pollution response drill is applicable
 */
const isPollutionResponseApplicable = (vesselData) => {
  const { SOPEP_applicable, oil_capacity_litres } = vesselData;
  return SOPEP_applicable || (oil_capacity_litres && oil_capacity_litres > 400);
};

/**
 * Get GMDSS DSC drill requirements
 */
const getGMDSSDrillRequirement = (vesselData) => {
  return {
    drill_type: 'gmdss_dsc',
    frequency_days: COMPLIANCE_CONSTANTS.DRILLS.MAN_OVERBOARD_DAYS,
    compliance_level: COMPLIANCE_LEVELS.RECOMMENDED,
    risk_dependent: true,
    regulatory_source: 'MGN 683, ISM Section 8',
    note: 'Recommended for GMDSS-equipped vessels or Cat 0-3'
  };
};

/**
 * Check if GMDSS drill is applicable
 */
const isGMDSSApplicable = (vesselData) => {
  const { GMDSS_equipped, vessel_category } = vesselData;
  const requiresGMDSS = ['Cat 0', 'Cat 1', 'Cat 2', 'Cat 3'].includes(vessel_category);
  return GMDSS_equipped || requiresGMDSS;
};

/**
 * Get medical emergency drill requirements
 */
const getMedicalEmergencyDrillRequirement = (vesselData) => {
  const { medical_stores_category, passenger_count, SOLAS_applicable, vessel_type } = vesselData;
  const hasMedicalStores = ['A', 'B'].includes(medical_stores_category);
  
  // High-risk vessel types requiring enhanced medical preparedness
  const highRiskTypes = ['safety_standby', 'dive_support', 'dredger'];
  const isHighRiskVessel = highRiskTypes.includes(normalizeVesselType(vessel_type));
  
  // Enhanced frequency for SOLAS vessels or high-risk operations
  if (SOLAS_applicable || isHighRiskVessel) {
    return {
      drill_type: 'medical_emergency',
      frequency_days: COMPLIANCE_CONSTANTS.DRILLS.MAN_OVERBOARD_DAYS,
      compliance_level: COMPLIANCE_LEVELS.RECOMMENDED,
      risk_dependent: true,
      regulatory_source: SOLAS_applicable ? 'WBC3 Section 10.1.10 / SOLAS' : 'WBC3 Section 10.1.10 / High-Risk Operations',
      note: `Recommended - Enhanced frequency for ${SOLAS_applicable ? 'SOLAS' : 'high-risk'} operations`
    };
  }
  
  if (hasMedicalStores) {
    return {
      drill_type: 'medical_emergency',
      frequency_days: 180,
      compliance_level: COMPLIANCE_LEVELS.RECOMMENDED,
      risk_dependent: true,
      regulatory_source: 'SCMG 24th Ed',
      note: 'Recommended for vessels with Category A or B medical stores'
    };
  } else if (passenger_count > 12) {
    return {
      drill_type: 'medical_emergency',
      frequency_days: 180,
      compliance_level: COMPLIANCE_LEVELS.RECOMMENDED,
      risk_dependent: true,
      regulatory_source: 'SCMG, WBC3 Section 10.1.10',
      note: 'Recommended for passenger vessels - risk assessment dependent'
    };
  } else {
    return {
      drill_type: 'medical_emergency',
      frequency_days: 180,
      compliance_level: COMPLIANCE_LEVELS.RECOMMENDED,
      risk_dependent: true,
      regulatory_source: 'Best Practice',
      note: 'Risk assessment dependent'
    };
  }
};

/**
 * Check if medical emergency drill is applicable
 */
const isMedicalEmergencyApplicable = (vesselData) => {
  const { medical_stores_category, passenger_count, SOLAS_applicable, vessel_type, vessel_category } = vesselData;
  const hasMedicalStores = ['A', 'B'].includes(medical_stores_category);
  const highRiskTypes = ['safety_standby', 'dive_support', 'dredger'];
  const isHighRiskVessel = highRiskTypes.includes(normalizeVesselType(vessel_type));
  
  return hasMedicalStores || passenger_count > 12 || SOLAS_applicable || isHighRiskVessel || vessel_category !== 'Cat 6';
};

/**
 * Get flooding drill requirements
 */
const getFloodingDrillRequirement = (vesselData) => {
  const { SOLAS_applicable, vessel_type } = vesselData;
  
  // High-risk vessel types with enhanced flooding risk
  const highRiskTypes = ['safety_standby', 'dive_support', 'dredger'];
  const isHighRiskVessel = highRiskTypes.includes(normalizeVesselType(vessel_type));
  
  // Enhanced frequency for SOLAS vessels or high-risk operations
  if (SOLAS_applicable || isHighRiskVessel) {
    return {
      drill_type: 'flooding',
      frequency_days: COMPLIANCE_CONSTANTS.DRILLS.MAN_OVERBOARD_DAYS,
      compliance_level: COMPLIANCE_LEVELS.RECOMMENDED,
      risk_dependent: true,
      regulatory_source: SOLAS_applicable ? 'WBC3 Section 10.1.10 / SOLAS' : 'WBC3 Section 10.1.10 / High-Risk Operations',
      note: `Enhanced frequency for ${SOLAS_applicable ? 'SOLAS' : 'high-risk'} operations with flooding risk`
    };
  }
  
  return {
    drill_type: 'flooding',
    frequency_days: 180,
    compliance_level: COMPLIANCE_LEVELS.RECOMMENDED,
    risk_dependent: true,
    regulatory_source: 'WBC3 Section 10.1.10',
    note: 'As per vessel\'s risk assessment'
  };
};

/**
 * Check if flooding drill is applicable
 */
const isFloodingApplicable = (vesselData) => {
  const { vessel_category, length, SOLAS_applicable, vessel_type } = vesselData;
  const isLargeVessel = length && length > 10;
  const isOffshore = ['Cat 0', 'Cat 1', 'Cat 2'].includes(vessel_category);
  const highRiskTypes = ['safety_standby', 'dive_support', 'dredger'];
  const isHighRiskVessel = highRiskTypes.includes(normalizeVesselType(vessel_type));
  
  return isLargeVessel || isOffshore || SOLAS_applicable || isHighRiskVessel;
};

/**
 * Get steering/nav failure drill requirements
 */
const getSteeringNavFailDrillRequirement = (vesselData) => {
  const { SOLAS_applicable, emergency_steering } = vesselData;
  
  // 1. SOLAS-applicable vessels: 90 days, Recommended
  if (SOLAS_applicable) {
    return {
      drill_type: 'steering_nav_fail',
      frequency_days: COMPLIANCE_CONSTANTS.DRILLS.MAN_OVERBOARD_DAYS,
      compliance_level: COMPLIANCE_LEVELS.RECOMMENDED,
      risk_dependent: true,
      regulatory_source: 'SOLAS Chapter II-1 Regulation 29.3',
      note: 'Recommended for SOLAS vessels with emergency steering systems'
    };
  }
  
  // 2. Non-SOLAS vessels with emergency steering arrangements: 180 days, Recommended
  if (emergency_steering) {
    return {
      drill_type: 'steering_nav_fail',
      frequency_days: 180,
      compliance_level: COMPLIANCE_LEVELS.RECOMMENDED,
      risk_dependent: true,
      regulatory_source: 'Workboat Code Edition 3 Section 10.1.10',
      note: 'Recommended for vessels with emergency steering arrangements'
    };
  }
  
  // Should not reach here due to applicableFor logic, but provide fallback
  return {
    drill_type: 'steering_nav_fail',
    frequency_days: 180,
    compliance_level: COMPLIANCE_LEVELS.RECOMMENDED,
    risk_dependent: true,
    regulatory_source: 'Best Practice',
    note: 'Risk assessment dependent'
  };
};

/**
 * Check if steering/nav failure drill is applicable
 */
const isSteeringNavFailApplicable = (vesselData) => {
  const { SOLAS_applicable, emergency_steering } = vesselData;
  return SOLAS_applicable || emergency_steering;
};

/**
 * Get electrical blackout drill requirements
 */
const getElectricalBlackoutDrillRequirement = (vesselData) => {
  return {
    drill_type: 'electrical_blackout',
    frequency_days: 180,
    compliance_level: COMPLIANCE_LEVELS.RECOMMENDED,
    risk_dependent: true,
    regulatory_source: 'WBC3 Section 9.7 / Best Practice',
    note: 'Required if centralised electrical system, emergency generator, or DP systems'
  };
};

/**
 * Check if electrical blackout drill is applicable
 */
const isElectricalBlackoutApplicable = (vesselData) => {
  // Check for specific electrical systems that would trigger this drill
  const hasCentralizedElectrical = vesselData.centralizedElectrical || vesselData.power_critical_systems;
  const hasEmergencyGenerator = vesselData.emergencyGenerator || vesselData.hasEmergencyGenerator;
  const hasDPSystems = vesselData.dpSystem || vesselData.dynamicPositioning || 
                      (vesselData.optionalEquipment && vesselData.optionalEquipment.includes('dynamic_positioning'));
  const hasElectricPropulsion = vesselData.electricPropulsion || vesselData.hybridPropulsion;
  const hasBatteryBackup = vesselData.batteryBackup || vesselData.navigationBatteryBackup;
  const hasBowThruster = vesselData.bowThruster || 
                        (vesselData.optionalEquipment && vesselData.optionalEquipment.includes('bow_thruster'));
  
  // Return true if any electrical dependency exists
  return hasCentralizedElectrical || hasEmergencyGenerator || hasDPSystems || 
         hasElectricPropulsion || hasBatteryBackup || hasBowThruster;
};

/**
 * Get enclosed space entry drill requirements
 */
const getEnclosedSpaceEntryDrillRequirement = (vesselData) => {
  return {
    drill_type: 'enclosed_space_entry',
    frequency_days: 180,
    compliance_level: COMPLIANCE_LEVELS.RECOMMENDED,
    risk_dependent: true,
    regulatory_source: 'Best Practice',
    note: 'As per vessel\'s risk assessment'
  };
};

/**
 * Check if enclosed space entry drill is applicable
 */
const isEnclosedSpaceEntryApplicable = (vesselData) => {
  return vesselData.enclosed_spaces_present === true;
};

/**
 * Get towing emergency drill requirements
 */
const getTowingEmergencyDrillRequirement = (vesselData) => {
  return {
    drill_type: 'towing_emergency',
    frequency_days: 180,
    compliance_level: COMPLIANCE_LEVELS.RECOMMENDED,
    risk_dependent: true,
    regulatory_source: 'Best Practice',
    note: 'As per vessel\'s risk assessment'
  };
};

/**
 * Check if towing emergency drill is applicable
 */
const isTowingEmergencyApplicable = (vesselData) => {
  const towingTypes = ['tug', 'utility', 'multipurpose', 'support'];
  return vesselData.towing_capable === true || 
         towingTypes.includes(normalizeVesselType(vesselData.vessel_type));
};

/**
 * Get collision drill requirements
 */
const getCollisionDrillRequirement = (vesselData) => {
  return {
    drill_type: 'collision',
    frequency_days: 180,
    compliance_level: COMPLIANCE_LEVELS.RECOMMENDED,
    risk_dependent: true,
    regulatory_source: 'WBC3 Section 10.1.10 + SMS best practice',
    note: 'Recommended for vessels with collision risk exposure'
  };
};

/**
 * Check if collision drill is applicable
 */
const isCollisionApplicable = (vesselData) => {
  const { vessel_category, vessel_type } = vesselData;
  const isOffshore = ['Cat 0', 'Cat 1', 'Cat 2', 'Cat 3'].includes(vessel_category);
  const highRiskTypes = ['cargo', 'tug', 'dredger', 'multipurpose'];
  const isHighRiskType = highRiskTypes.includes(normalizeVesselType(vessel_type));
  
  return isOffshore || isHighRiskType;
};

/**
 * Get grounding drill requirements
 */
const getGroundingDrillRequirement = (vesselData) => {
  return {
    drill_type: 'grounding',
    frequency_days: 180,
    compliance_level: COMPLIANCE_LEVELS.RECOMMENDED,
    risk_dependent: true,
    regulatory_source: 'WBC3 Section 10.1.10 + SMS best practice',
    note: 'Recommended for vessels operating in shallow or constrained waters'
  };
};

/**
 * Check if grounding drill is applicable
 */
const isGroundingApplicable = (vesselData) => {
  const { vessel_category, vessel_type } = vesselData;
  const isOffshore = ['Cat 0', 'Cat 1', 'Cat 2', 'Cat 3'].includes(vessel_category);
  const groundingRiskTypes = ['cargo', 'tug', 'dredger', 'multipurpose', 'pilot'];
  const isGroundingRiskType = groundingRiskTypes.includes(normalizeVesselType(vessel_type));
  
  return isOffshore || isGroundingRiskType;
};

/**
 * Main function to generate drill requirements
 * @param {Object} vesselConfig - Vessel configuration
 * @param {Object} equipmentRegister - Optional equipment register for cross-reference
 * @returns {Object} Map of drill type to requirement
 */
export function generateDrillRequirements(vesselConfig, equipmentRegister = null) {
  // First determine which regulatory framework applies
  const framework = determineRegulatoryFramework(vesselConfig);
  
  // Check if this is an inland waterways vessel
  if (vesselConfig.operatingStatus === 'inland') {
    return generateInlandDrillRequirements(vesselConfig, framework);
  }
  
  // Check if this is a passenger vessel
  if (normalizeVesselType(vesselConfig.type) === 'pax' || normalizeVesselType(vesselConfig.type) === 'passenger') {
    return generatePassengerVesselDrillRequirements(vesselConfig, framework);
  }
  
  // For workboats, use the standard matrix
  const vesselData = {
    crew_count: vesselConfig.crewCount || vesselConfig.crew_count || 3,
    passenger_count: vesselConfig.passengerCapacity || vesselConfig.passenger_count || 0,
    vessel_category: `Cat ${vesselConfig.category}`,
    vessel_type: vesselConfig.type || vesselConfig.vesselType,
    SOLAS_applicable: vesselConfig.SOLAS_applicable || false,
    GMDSS_equipped: vesselConfig.GMDSS_equipped || (vesselConfig.category <= 3),
    SOPEP_applicable: vesselConfig.SOPEP_applicable || false,
    oil_capacity_litres: vesselConfig.oil_capacity_litres || vesselConfig.oilCapacity || 0,
    medical_stores_category: vesselConfig.medical_stores_category || vesselConfig.medicalCategory || 'none',
    power_critical_systems: vesselConfig.power_critical_systems || false,
    enclosed_spaces_present: vesselConfig.enclosed_spaces_present || vesselConfig.hasEnclosedSpaces || false,
    towing_capable: vesselConfig.towing_capable || (normalizeVesselType(vesselConfig.type || vesselConfig.vesselType) === 'tug'),
    emergency_steering: vesselConfig.emergency_steering || vesselConfig.hasEmergencySteering || vesselConfig.SOLAS_applicable || false,
    emergencyGenerator: vesselConfig.emergencyGenerator || false,
    centralizedElectrical: vesselConfig.power_critical_systems || false,
    optionalEquipment: vesselConfig.optionalEquipment || [],
    policy_overrides: vesselConfig.policy_overrides !== false,
    length: vesselConfig.length || vesselConfig.lengthOverall || 0
  };

  const requirements = {};

  // Fire drill - always required
  requirements[DRILL_TYPES.FIRE] = getFireDrillRequirement(vesselData);

  // Abandon ship drill - always required
  requirements[DRILL_TYPES.ABANDON_SHIP] = getAbandonShipDrillRequirement(vesselData);

  // MOB drill - always required
  requirements[DRILL_TYPES.MOB] = getMOBDrillRequirement(vesselData);

  // Pollution response drill - conditional
  if (isPollutionResponseApplicable(vesselData)) {
    requirements[DRILL_TYPES.POLLUTION_RESPONSE] = getPollutionResponseDrillRequirement(vesselData);
  }

  // GMDSS DSC drill - conditional
  if (isGMDSSApplicable(vesselData)) {
    requirements[DRILL_TYPES.GMDSS_DSC] = getGMDSSDrillRequirement(vesselData);
  }

  // Medical emergency drill - conditional
  if (isMedicalEmergencyApplicable(vesselData)) {
    requirements[DRILL_TYPES.MEDICAL_EMERGENCY] = getMedicalEmergencyDrillRequirement(vesselData);
  }

  // Flooding drill - conditional
  if (isFloodingApplicable(vesselData)) {
    requirements[DRILL_TYPES.FLOODING] = getFloodingDrillRequirement(vesselData);
  }

  // Steering/Nav failure drill - conditional
  if (isSteeringNavFailApplicable(vesselData)) {
    requirements[DRILL_TYPES.STEERING_NAV_FAIL] = getSteeringNavFailDrillRequirement(vesselData);
  }

  // Electrical blackout drill - conditional
  if (isElectricalBlackoutApplicable(vesselData)) {
    requirements[DRILL_TYPES.ELECTRICAL_BLACKOUT] = getElectricalBlackoutDrillRequirement(vesselData);
  }

  // Enclosed space entry drill - conditional
  if (isEnclosedSpaceEntryApplicable(vesselData)) {
    requirements[DRILL_TYPES.ENCLOSED_SPACE_ENTRY] = getEnclosedSpaceEntryDrillRequirement(vesselData);
  }

  // Towing emergency drill - conditional
  if (isTowingEmergencyApplicable(vesselData)) {
    requirements[DRILL_TYPES.TOWING_EMERGENCY] = getTowingEmergencyDrillRequirement(vesselData);
  }

  // Collision drill - conditional
  if (isCollisionApplicable(vesselData)) {
    requirements[DRILL_TYPES.COLLISION] = getCollisionDrillRequirement(vesselData);
  }

  // Grounding drill - conditional
  if (isGroundingApplicable(vesselData)) {
    requirements[DRILL_TYPES.GROUNDING] = getGroundingDrillRequirement(vesselData);
  }

  // Apply company-required drill overrides
  if (vesselConfig.companyRequiredDrills?.length > 0) {
    vesselConfig.companyRequiredDrills.forEach(drillType => {
      if (requirements[drillType] && requirements[drillType].compliance_level === COMPLIANCE_LEVELS.RECOMMENDED) {
        requirements[drillType] = {
          ...requirements[drillType],
          compliance_level: COMPLIANCE_LEVELS.REQUIRED,
          regulatory_source: requirements[drillType].regulatory_source + ' + Company SMS Policy',
          note: requirements[drillType].note + ' (Company Required)'
        };
      }
    });
  }

  // Add custom company drills
  if (vesselConfig.companyCustomDrills?.length > 0) {
    vesselConfig.companyCustomDrills.forEach(customDrill => {
      requirements[customDrill.id] = {
        drill_type: customDrill.id,
        frequency_days: customDrill.frequency_days,
        compliance_level: COMPLIANCE_LEVELS.REQUIRED,
        risk_dependent: false,
        regulatory_source: 'Company SMS Policy',
        note: `Custom drill: ${customDrill.name}`,
        configurable: true,
        custom: true,
        customName: customDrill.name
      };
    });
  }

  return requirements;
}

/**
 * Generate drill requirements for inland waterways vessels
 */
function generateInlandDrillRequirements(vesselConfig, framework) {
  const requirements = {};
  const vesselType = normalizeVesselType(vesselConfig.type || vesselConfig.vesselType);
  
  // Special handling for hire boats - NO DRILLS by default
  if (vesselType === 'hire_boat' || vesselType === 'hire boat') {
    return requirements; // Return empty - no drills
  }
  
  // Determine drill profile based on vessel type
  const isPassengerVessel = vesselType === 'pax' || vesselType === 'passenger' || 
                           vesselConfig.passengerCapacity > 0;
  const isCommercial = vesselConfig.commercialOperations !== false && 
                      vesselType !== 'private' && vesselType !== 'leisure';
  
  // Fire drills - OPTIONAL best practice (no regulatory requirement)
  if (isCommercial || isPassengerVessel) {
    requirements.fire = {
      drill_type: 'fire',
      frequency_days: 30,
      compliance_level: COMPLIANCE_LEVELS.OPTIONAL,
      risk_dependent: false,
      regulatory_source: 'Company Policy - No regulatory requirement',
      note: 'Optional: Monthly fire drills are best practice but NOT required for inland vessels',
      configurable: true
    };
  }
  
  // MOB - OPTIONAL best practice (no regulatory requirement)
  if (isCommercial || isPassengerVessel) {
    requirements.mob = {
      drill_type: 'mob',
      frequency_days: 90,
      compliance_level: COMPLIANCE_LEVELS.OPTIONAL,
      risk_dependent: true,
      regulatory_source: 'Company Policy - No regulatory requirement',
      note: 'Optional: Quarterly MOB drills are best practice but NOT required for inland vessels',
      configurable: true
    };
  }
  
  // Apply company-required drill overrides
  if (vesselConfig.companyRequiredDrills) {
    vesselConfig.companyRequiredDrills.forEach(drillType => {
      if (requirements[drillType]) {
        requirements[drillType].compliance_level = COMPLIANCE_LEVELS.REQUIRED;
        requirements[drillType].regulatory_source += ' + Company Policy';
        requirements[drillType].note += ' (Company Required)';
        requirements[drillType].configurable = false;
      }
    });
  }
  
  // Add custom company drills
  if (vesselConfig.companyCustomDrills?.length > 0) {
    vesselConfig.companyCustomDrills.forEach(customDrill => {
      requirements[customDrill.id] = {
        drill_type: customDrill.id,
        frequency_days: customDrill.frequency_days,
        compliance_level: COMPLIANCE_LEVELS.REQUIRED,
        risk_dependent: false,
        regulatory_source: 'Company SMS Policy',
        note: `Custom drill: ${customDrill.name}`,
        configurable: true,
        custom: true,
        customName: customDrill.name
      };
    });
  }
  
  return requirements;
}

/**
 * Generate drill requirements for passenger vessels
 */
function generatePassengerVesselDrillRequirements(vesselConfig, framework) {
  const requirements = {};
  
  // Fire and Abandon Ship - ALWAYS monthly for ALL vessels
  requirements.fire = {
    drill_type: 'fire',
    frequency_days: 30,
    compliance_level: COMPLIANCE_LEVELS.REQUIRED,
    risk_dependent: false,
    regulatory_source: 'SI 1999/2722 Regulation 8(2)',
    note: 'Monthly drills required by law for ALL vessels',
    configurable: false
  };
  
  requirements.abandon_ship = {
    drill_type: 'abandon_ship',
    frequency_days: 30,
    compliance_level: COMPLIANCE_LEVELS.REQUIRED,
    risk_dependent: false,
    regulatory_source: 'SI 1999/2722 Regulation 8(2)',
    note: 'Monthly drills required by law for ALL vessels',
    configurable: false
  };
  
  // MOB - Required but frequency per SMS
  requirements.mob = {
    drill_type: 'mob',
    frequency_days: 90,
    compliance_level: COMPLIANCE_LEVELS.REQUIRED,
    risk_dependent: false,
    regulatory_source: 'Company SMS',
    note: 'Required - frequency per SMS interpretation',
    configurable: true
  };
  
  // Additional drills - ALL are SMS-based, not regulatory
  if (vesselConfig.medical_stores_category && vesselConfig.medical_stores_category !== 'none') {
    requirements.medical_emergency = {
      drill_type: 'medical_emergency',
      frequency_days: 180,
      compliance_level: COMPLIANCE_LEVELS.RECOMMENDED,
      risk_dependent: true,
      regulatory_source: 'Company SMS / Risk Assessment',
      note: 'Recommended based on medical stores carried',
      configurable: true
    };
  }
  
  if (vesselConfig.emergency_steering) {
    requirements.steering_nav_fail = {
      drill_type: 'steering_nav_fail',
      frequency_days: 180,
      compliance_level: COMPLIANCE_LEVELS.RECOMMENDED,
      risk_dependent: true,
      regulatory_source: 'Company SMS / Risk Assessment',
      note: 'Recommended for vessels with emergency steering',
      configurable: true
    };
  }
  
  return requirements;
}