/**
 * Temporary stub functions
 * These will be refactored into their own domain modules
 * Returns empty arrays until properly implemented
 */

/**
 * Get Life Saving Appliance requirements
 * TODO: Implement LSA domain
 */
export function getLSARequirements() {
  return []; // To be implemented
}

/**
 * Get Radio/GMDSS requirements
 * IMPLEMENTED: Moved to domains/gmdss
 */
export function getRadioRequirements() {
  return []; // Implemented in domains/gmdss
}

/**
 * Get Electrical requirements
 * TODO: Implement Electrical domain
 */
export function getElectricalRequirements() {
  return []; // To be implemented
}

/**
 * Get Machinery requirements
 * TODO: Implement Machinery domain
 */
export function getMachineryRequirements() {
  return []; // To be implemented
}

/**
 * Get Environmental requirements
 * TODO: Implement Environmental domain
 */
export function getEnvironmentalRequirements() {
  return []; // To be implemented
}

/**
 * Get Survey requirements
 * TODO: Implement Survey domain
 */
export function getSurveyRequirements() {
  return []; // To be implemented
}

/**
 * Get training requirements
 * TODO: Implement Training domain
 */
export function getTrainingRequirements() {
  return []; // To be implemented
}

/**
 * Get Special Operations requirements
 * Based on UK-MARITIME-LIBRARY/03-CSV-DATABASES/SEAGOING/domains/OPERATIONS_v1/EQUIPMENT_REGISTER.csv
 */
export function getSpecialOperationsRequirements(vessel) {
  const requirements = [];
  
  // Only apply to seagoing vessels
  if (!vessel || !vessel.operatingStatus || vessel.operatingStatus !== 'seagoing') {
    return requirements;
  }
  
  // ===== POLICE VESSEL OPERATIONS =====
  if (vessel.vesselType === 'police' || vessel.type === 'police') {
    requirements.push({
      id: 'operations.equipment.police.searchlight',
      name: 'Searchlight (Police Operations)',
      category: 'Operations Equipment',
      reference: 'WBC3 Annex 3 13.5.1',
      mandatory: true,
      description: 'Fixed or portable searchlight for MOB operations - police vessel requirement'
    });
  }
  
  // ===== PILOT BOAT OPERATIONS =====
  if (vessel.vesselType === 'pilot' || vessel.type === 'pilot') {
    requirements.push({
      id: 'operations.equipment.pilot.stretcher',
      name: 'Compact Stretcher',
      category: 'Medical Equipment',
      reference: 'WBC3 Table 27.2.3',
      mandatory: true,
      description: 'Compact stretcher for pilot boat operations'
    });
    
    requirements.push({
      id: 'operations.equipment.pilot.searchlight',
      name: 'Searchlight (Pilot Operations)',
      category: 'Operations Equipment',
      reference: 'WBC3 Table 27.2.3',
      mandatory: true,
      description: 'Searchlight for pilot transfer operations'
    });
    
    requirements.push({
      id: 'operations.equipment.pilot.recovery',
      name: 'Recovery Ladder/Steps',
      category: 'Operations Equipment',
      reference: 'WBC3 Table 27.2.3 14.7',
      mandatory: true,
      description: 'Transom steps/ladder or scrambling net for MOB recovery'
    });
  }
  
  // ===== TOWING OPERATIONS =====
  if (vessel.hasTowingOps || vessel.vesselType === 'tug' || vessel.type === 'tug') {
    requirements.push({
      id: 'operations.equipment.towline.main',
      name: 'Main Towline',
      category: 'Towing Equipment',
      reference: 'WBC3 26',
      mandatory: true,
      description: 'Primary towline for towing operations'
    });
    
    requirements.push({
      id: 'operations.equipment.towline.emergency',
      name: 'Emergency Towline',
      category: 'Towing Equipment',
      reference: 'WBC3 26.4.4',
      mandatory: true,
      description: 'Pre-rigged emergency towline for backup'
    });
  }
  
  return requirements;
}

/**
 * Get risk assessment requirements (non-FFE)
 * TODO: Implement Risk Assessment domain
 */
export function getRiskAssessmentRequirements() {
  return []; // To be implemented
}