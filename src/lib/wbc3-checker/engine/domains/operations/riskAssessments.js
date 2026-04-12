/**
 * Operations Risk Assessment Requirements
 * Extracted from UK-MARITIME-LIBRARY/03-CSV-DATABASES/SEAGOING/domains/OPERATIONS_v1/DOCS.csv
 * Contains risk assessments that were missing from initial domain extraction
 */

export function getOperationsRiskAssessmentRequirements(vessel) {
  const requirements = [];
  
  if (vessel.operatingStatus === 'seagoing') {
    // Lifting Operations Risk Assessment - MANDATORY
    if (vessel.hasLiftingOps || vessel.operations?.includes('lifting')) {
      requirements.push({
        id: 'operations.doc.ra.lifting',
        name: 'Lifting Operations Risk Assessment',
        category: 'Operations Risk Assessment',
        reference: 'WBC3 25.2.2.1',
        mandatory: true,
        description: 'Risk assessment required before any lifting operation'
      });
    }
    
    // Towing Operations Risk Assessment - MANDATORY
    if (vessel.hasTowingOps || vessel.operations?.includes('towing') || vessel.vesselType === 'tug') {
      requirements.push({
        id: 'operations.doc.ra.towing',
        name: 'Towing Operations Risk Assessment',
        category: 'Operations Risk Assessment',
        reference: 'WBC3 26.3.1',
        mandatory: true,
        description: 'Risk assessment and plan required for every towing voyage - must include weather conditions'
      });
    }
    
    // Pilot Transfer Risk Assessment - GUIDANCE
    if (vessel.vesselType === 'pilot' || vessel.operations?.includes('pilot_transfer')) {
      requirements.push({
        id: 'operations.doc.ra.pilot',
        name: 'Pilot Transfer Risk Assessment',
        category: 'Operations Risk Assessment',
        reference: 'WBC3 Appendix 8 3.1/Section 27',
        mandatory: false,
        description: 'Risk assessment for pilot transfer operations - weather limits, approach speeds, MOB risks'
      });
    }
    
    // Diving Operations Risk Assessment - GUIDANCE
    if (vessel.hasDivingOps || vessel.operations?.includes('diving_support')) {
      requirements.push({
        id: 'operations.doc.ra.diving',
        name: 'Diving Operations Risk Assessment',
        category: 'Operations Risk Assessment',
        reference: 'WBC3 Appendix 8 3.1/Section 25.3',
        mandatory: false,
        description: 'Risk assessment for diving support - diver injury, entanglement, weather limits'
      });
    }
    
    // Police Operations Risk Assessment - GUIDANCE
    if (vessel.vesselType === 'police' || vessel.operations?.includes('police_operations')) {
      requirements.push({
        id: 'operations.doc.ra.police',
        name: 'Police Operations Risk Assessment',
        category: 'Operations Risk Assessment',
        reference: 'WBC3 Appendix 8 3.1/Annex 3',
        mandatory: false,
        description: 'Risk assessment for police operations - high speed risks, pursuit hazards'
      });
    }
    
    // Fuel Transfer Risk Assessment
    if (vessel.hasFuelTransfer || vessel.operations?.includes('fuel_transfer')) {
      requirements.push({
        id: 'operations.doc.ra.fuel.transfer',
        name: 'Fuel Transfer Risk Assessment',
        category: 'Operations Risk Assessment',
        reference: 'WBC3 Appendix 8 3.1',
        mandatory: false,
        description: 'Risk assessment for transfer of oil operations - includes multiple hazards'
      });
    }
    
    // Personnel Transfer Risk Assessment - WBC3 22.3.3 references SMS
    if (vessel.hasPersonnelTransfer || vessel.operations?.includes('personnel_transfer') || 
        vessel.vesselType === 'ctv' || vessel.vesselType === 'crew_transfer') {
      requirements.push({
        id: 'operations.doc.ra.personnel.transfer',
        name: 'Personnel Transfer Risk Assessment',
        category: 'Operations Risk Assessment',
        reference: 'WBC3 22.3.3/SMS',
        mandatory: false,
        description: 'Risk assessment for personnel transfer operations - weather limits, transfer methods, emergency procedures'
      });
    }
    
    // ===== GENERAL MARITIME OPERATIONS RISK ASSESSMENTS =====
    // SMS Best Practice - not explicitly required by WBC3 but recommended for comprehensive SMS
    if (vessel.includeGeneralOperationsRA || vessel.smsLevel === 'comprehensive') {
      
      // Mooring Operations Risk Assessment
      requirements.push({
        id: 'operations.doc.ra.mooring',
        name: 'Mooring Operations Risk Assessment',
        category: 'Operations Risk Assessment',
        reference: 'SMS Best Practice',
        mandatory: false,
        description: 'Risk assessment for mooring operations - line handling, weather conditions, vessel positioning, crew safety'
      });
      
      // Maneuvering Risk Assessment
      requirements.push({
        id: 'operations.doc.ra.maneuvering',
        name: 'Maneuvering Risk Assessment',
        category: 'Operations Risk Assessment',
        reference: 'SMS Best Practice',
        mandatory: false,
        description: 'Risk assessment for vessel maneuvering - close quarters, traffic, weather, engine failure scenarios'
      });
      
      // Anchoring Operations Risk Assessment
      requirements.push({
        id: 'operations.doc.ra.anchoring',
        name: 'Anchoring Operations Risk Assessment',
        category: 'Operations Risk Assessment',
        reference: 'SMS Best Practice',
        mandatory: false,
        description: 'Risk assessment for anchoring operations - anchor handling, weather holding, dragging risks, crew safety'
      });
      
      // General Deck Work Risk Assessment
      requirements.push({
        id: 'operations.doc.ra.deck.work',
        name: 'General Deck Work Risk Assessment',
        category: 'Operations Risk Assessment',
        reference: 'SMS Best Practice',
        mandatory: false,
        description: 'Risk assessment for routine deck operations - maintenance, cleaning, equipment handling, working at height'
      });
      
      // Watch Keeping Risk Assessment
      requirements.push({
        id: 'operations.doc.ra.watch.keeping',
        name: 'Watch Keeping Risk Assessment',
        category: 'Operations Risk Assessment',
        reference: 'SMS Best Practice',
        mandatory: false,
        description: 'Risk assessment for bridge watch keeping - fatigue, single-handed operations, lookout, collision avoidance'
      });
      
      // Cargo/Passenger Operations Risk Assessment (if applicable)
      if (vessel.vesselType === 'passenger' || vessel.carriesPassengers || vessel.hasCargoOps) {
        requirements.push({
          id: 'operations.doc.ra.cargo.passenger',
          name: 'Cargo/Passenger Operations Risk Assessment',
          category: 'Operations Risk Assessment',
          reference: 'SMS Best Practice',
          mandatory: false,
          description: 'Risk assessment for cargo/passenger operations - loading, stability, emergency procedures, crowd control'
        });
      }
    }
  }
  
  return requirements;
}