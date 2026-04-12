/**
 * FFE Risk Assessment Requirements
 * Fire safety risk assessments for various hazards
 */

export function getFFERiskAssessmentRequirements(vessel) {
  const requirements = [];
  
  if (vessel.operatingStatus === 'seagoing') {
    // FFE Operational Risk Assessment
    requirements.push({
      id: 'ffe_ra_operations',
      name: 'FFE Operational Risk Assessment',
      category: 'FFE Risk Assessment',
      reference: 'WBC3 Appendix 8 3.1',
      mandatory: true,
      description: 'Risk assessment for fire equipment use including extinguisher discharge risks, fire pump operation risks, fire drill risks, equipment failure risks'
    });
    
    // Fixed Fire System Risk Assessment
    if (vessel.hasFixedFireSystem) {
      requirements.push({
        id: 'ffe_ra_fixed_system',
        name: 'Fixed Fire System Risk Assessment',
        category: 'FFE Risk Assessment',
        reference: 'WBC3 Appendix 8 3.1',
        mandatory: true,
        description: 'Risk assessment for fixed suppression systems including accidental discharge risks, confined space risks, system isolation risks, maintenance hazards'
      });
    }
    
    // Lithium Battery Fire Risk Assessment
    if (vessel.hasLithiumBattery) {
      requirements.push({
        id: 'ffe_ra_lithium',
        name: 'Lithium Battery Fire Risk Assessment',
        category: 'FFE Risk Assessment',
        reference: 'WBC3 Appendix 8 3.1/Annex 1',
        mandatory: true,
        description: 'Risk assessment for lithium battery fire hazards including thermal runaway risks, storage risks, charging risks, suppression limitations'
      });
    }
    
    // Gas Detection Risk Assessment
    if (vessel.hasGasAppliance || vessel.hasGasLeakRisk) {
      requirements.push({
        id: 'ffe_ra_gas_detection',
        name: 'Gas Detection Risk Assessment',
        category: 'FFE Risk Assessment',
        reference: 'WBC3 Appendix 8 3.1',
        mandatory: true,
        description: 'Risk assessment for gas hazards including gas accumulation risks, detector placement, alarm response, ventilation requirements'
      });
    }
    
    // Hot Work Risk Assessment
    if (vessel.hasHotWorkOperations) {
      requirements.push({
        id: 'ffe_ra_hot_work',
        name: 'Hot Work Risk Assessment',
        category: 'FFE Risk Assessment',
        reference: 'WBC3 Appendix 8 3.1/15.3',
        mandatory: true,
        description: 'Risk assessment for hot work including fire risks, explosion risks, adjacent space risks, PPE requirements'
      });
    }
  }
  
  return requirements;
}