/**
 * FFE Detection Requirements
 * Fire detection systems, CO detectors, gas detectors
 */

/**
 * Determine exhaust leak risk based on vessel configuration
 * WBC3 15.6.3.3: "spaces where exhaust gases may accumulate in the event of an exhaust leak"
 */
function determineExhaustLeakRisk(vessel) {
  // Engine below deck = exhaust routing through vessel = leak risk
  if (vessel.engineBelowDeck || vessel.enginePosition === 'inboard_below') {
    return {
      hasRisk: true,
      reason: 'Engine below deck creates exhaust leak risk',
      regulation: 'WBC3 15.6.3.3'
    };
  }
  
  // Inboard diesel with enclosed engine spaces
  if (vessel.hasInboardDiesel && vessel.hasEnclosedEngineSpace) {
    return {
      hasRisk: true,
      reason: 'Enclosed engine space with inboard diesel',
      regulation: 'WBC3 15.6.3.3'
    };
  }
  
  // Accommodation areas close to engine exhaust routing
  if (vessel.hasInboardDiesel && vessel.hasAccommodation && vessel.accommodationNearEngine) {
    return {
      hasRisk: true,
      reason: 'Accommodation near engine exhaust routing',
      regulation: 'WBC3 15.6.3.3'
    };
  }
  
  // Manual override (preserves user settings)
  if (vessel.hasExhaustLeakRisk) {
    return {
      hasRisk: true,
      reason: 'Manually configured exhaust leak risk areas',
      regulation: 'WBC3 15.6.3.3'
    };
  }
  
  return {
    hasRisk: false,
    reason: 'No exhaust leak risk identified',
    regulation: null
  };
}

export function getFFEDetectionRequirements(vessel) {
  const requirements = [];
  
  // Only apply to seagoing vessels
  if (!vessel.operatingStatus || vessel.operatingStatus !== 'seagoing') {
    return requirements;
  }
  
  // ============================================================================
  // Fire Detection - Location-Specific Accommodation Spaces (WBC3 15.6.2.1.2)
  // ============================================================================
  // WBC3 15.6.2.1.2: "In each accommodation space"
  // WBC3 defines "accommodation space" as any enclosed space provided for use of persons on-board
  // This includes: Galley, Sleeping Quarters, Mess Room, Wheelhouse (if enclosed)

  // Fire Detector - Galley
  // Fire Detector - Galley (Consolidated requirement)
  // Single detector satisfies BOTH accommodation space (15.6.2.1.2) AND open flame (15.6.2.1.3) requirements
  if (vessel.hasGalley) {
    const hasOpenFlameAppliances = vessel.hasOpenFlame || vessel.hasGasAppliance || vessel.hasLiquidFuelAppliance;
    const references = hasOpenFlameAppliances
      ? 'WBC3 15.6.2.1 & 15.6.2.1.3'
      : 'WBC3 15.6.2.1';
    const description = hasOpenFlameAppliances
      ? 'Fire detector required in galley (accommodation space with open flame/gas/liquid fuel cooking appliances)'
      : 'Fire detector required in galley (accommodation space)';

    requirements.push({
      id: 'ffe_detector_fire_galley',
      name: 'Fire Detector - Galley',
      location: 'galley',
      category: 'FFE',
      reference: references,
      mandatory: true,
      description: description,
      installationGuidance: 'Install in galley ceiling, away from steam/cooking fumes per manufacturer specifications'
    });
  }

  // Fire Detector - Sleeping Quarters
  if (vessel.hasAccommodation) {

    requirements.push({
      id: 'ffe_detector_fire_sleeping',
      name: 'Fire Detector - Sleeping Quarters',
      location: 'sleeping_quarters',
      category: 'FFE',
      reference: 'WBC3 15.6.2.1',
      mandatory: true,
      description: 'Fire detector required in sleeping/living quarters (accommodation space)',
      installationGuidance: 'Install in cabin/berth area ceiling per manufacturer specifications'
    });
  }

  // Fire Detector - Wheelhouse
  // WBC3 defines wheelhouse as "substantial enclosure incorporating control position"
  // This is an accommodation space per WBC3 definition (enclosed space for use of persons on-board)
  if (vessel.hasWheelhouse) {

    requirements.push({
      id: 'ffe_detector_fire_wheelhouse',
      name: 'Fire Detector - Wheelhouse',
      location: 'wheelhouse',
      category: 'FFE',
      reference: 'WBC3 15.6.2.1',
      mandatory: true,
      description: 'Fire detector required in wheelhouse (accommodation space - crew working area)',
      installationGuidance: 'Install in wheelhouse ceiling per manufacturer specifications'
    });
  }
  
  // Fire Detection - Machinery (WBC3 15.6.2.4)

  if (vessel.hasMachinerySpace) {

    requirements.push({
      id: 'ffe_detector_machinery',
      name: 'Fire Detector - Machinery Space',
      category: 'FFE',
      reference: 'WBC3 15.6.2.4',
      mandatory: true,
      description: 'Fire detector(s) which detect smoke and heat, or flame detectors'
    });
  }
  
  // ============================================================================
  // Fire Detection - Open Flame Protection (WBC3 15.6.2.1.3)
  // ============================================================================
  // WBC3 15.6.2.1.3: "all spaces containing open flame, gas or liquid fuel appliances"
  // NOTE: Galley open flame protection is now CONSOLIDATED into the main galley detector above
  // (single detector satisfies both accommodation space AND open flame requirements)
  
  // Fire Detection - Electrical Areas (WBC3 15.6.2.1) - Location specific
  if (Array.isArray(vessel.electricalEquipmentAreas) && vessel.electricalEquipmentAreas.length > 0) {
    vessel.electricalEquipmentAreas.forEach((area) => {
      if (area.spaceName) {

        requirements.push({
          id: `ffe_detector_fire_electrical_${area.spaceName.toLowerCase().replace(/\s+/g, '_')}`,
          name: `Fire Detector - ${area.spaceName}`,
          location: area.spaceName.toLowerCase().replace(/\s+/g, '_'),
          category: 'FFE',
          reference: 'WBC3 15.6.2.1',
          mandatory: true,
          description: `Fire detector required in ${area.spaceName} (${area.equipmentType || 'electrical equipment concentration'})`,
          installationGuidance: `Install in ${area.spaceName} ceiling per manufacturer specifications`
        });
      }
    });
  } else if (vessel.hasConcentratedElectrical) {
    // Fallback for legacy boolean flag
    requirements.push({
      id: 'ffe_detector_electrical_concentration',
      name: 'Fire Detector - Electrical Areas',
      category: 'FFE',
      reference: 'WBC3 15.6.2.1',
      mandatory: true,
      description: 'Fire detectors in all areas of concentrated electrical equipment'
    });
  }
  
  // ============================================================================
  // CO Detectors - Location-Specific (WBC3 15.6.3.1)
  // ============================================================================
  // WBC3 15.6.3.1: "Where open flame, gas or liquid fuel appliances are installed in, or adjacent to accommodation areas"

  // CO Detector - Galley (near cooking appliances)
  if (vessel.hasGalley && (vessel.hasOpenFlame || vessel.hasGasAppliance || vessel.hasLiquidFuelAppliance)) {

    requirements.push({
      id: 'ffe_detector_co_galley',
      name: 'CO Detector - Galley',
      location: 'galley',
      category: 'FFE',
      reference: 'WBC3 15.6.3.1',
      mandatory: true,
      description: 'CO detector required in galley where gas/liquid fuel cooking appliances are installed',
      installationGuidance: 'Install within or adjacent to galley, per manufacturer specifications (typically head height)'
    });
  }
  
  // CO Detectors - Exhaust Risk (WBC3 15.6.3.3) - SMART DETERMINATION
  const exhaustRisk = determineExhaustLeakRisk(vessel);

  if (exhaustRisk.hasRisk) {
    // Determine specific location based on vessel config
    const exhaustLocation = vessel.engineBelowDeck ? 'Engine Room' : 
                            vessel.hasAccommodation ? 'Accommodation Spaces' :
                            vessel.hasEnclosedSpaces ? 'Enclosed Spaces' : 'Risk Areas';

    requirements.push({
      id: 'ffe_detector_co_exhaust_primary',
      name: `CO Detector - ${exhaustLocation}`,
      location: exhaustLocation.toLowerCase().replace(/\s+/g, '_'),
      category: 'FFE',
      reference: 'WBC3 15.6.3.3',
      mandatory: true,
      description: `CO detector required in ${exhaustLocation} where exhaust gases may accumulate`,
      explanation: `💡 Applied because: ${exhaustRisk.reason}`,
      autoApplied: exhaustRisk.reason !== 'Manually configured exhaust leak risk areas',
      installationGuidance: `Install at head height in ${exhaustLocation} per manufacturer specifications`
    });
  }
  
  // Additional exhaust risk areas from manual selection
  if (Array.isArray(vessel.additionalExhaustRisks) && vessel.additionalExhaustRisks.length > 0) {
    vessel.additionalExhaustRisks.forEach((risk) => {
      if (risk.affectedSpace) {

        requirements.push({
          id: `ffe_detector_co_${risk.affectedSpace.toLowerCase().replace(/\s+/g, '_')}`,
          name: `CO Detector - ${risk.affectedSpace}`,
          location: risk.affectedSpace.toLowerCase().replace(/\s+/g, '_'),
          category: 'FFE',
          reference: 'WBC3 15.6.3.3',
          mandatory: true,
          description: `CO detector required in ${risk.affectedSpace} (exhaust from ${risk.source || 'equipment'})`,
          installationGuidance: `Install at head height in ${risk.affectedSpace}`
        });
      }
    });
  }
  
  // ============================================================================
  // Hydrocarbon Gas Detectors - Location-Specific (WBC3 15.6.4.1)
  // ============================================================================
  // WBC3 15.6.4.1: "Any space which contains gas consuming appliances or into which flammable gas may leak"

  // Hydrocarbon Gas Detector - Galley (where gas appliances located)
  if (vessel.hasGalley && vessel.hasGasAppliance) {

    requirements.push({
      id: 'ffe_detector_gas_galley',
      name: 'Hydrocarbon Gas Detector - Galley',
      location: 'galley',
      category: 'FFE',
      reference: 'WBC3 15.6.4.1',
      mandatory: true,
      description: 'Gas detector required in galley where gas cooking appliances are installed',
      installationGuidance: 'Install low level in galley (gas heavier than air), near gas appliance and potential leak points'
    });
  }

  // Hydrocarbon Gas Detector - Gas Bottle Storage (if applicable)
  if (vessel.hasGasLeakRisk && !vessel.hasGalley) {

    requirements.push({
      id: 'ffe_detector_gas_storage',
      name: 'Hydrocarbon Gas Detector - Gas Storage',
      location: 'gas_storage',
      category: 'FFE',
      reference: 'WBC3 15.6.4.1',
      mandatory: true,
      description: 'Gas detector required in space where gas may leak (e.g., gas bottle storage)',
      installationGuidance: 'Install low level near gas bottles/storage area'
    });
  }
  
  // Additional Gas Appliances - Location specific
  if (Array.isArray(vessel.additionalGasAppliances) && vessel.additionalGasAppliances.length > 0) {
    vessel.additionalGasAppliances.forEach((appliance) => {
      if (appliance.location) {

        requirements.push({
          id: `ffe_detector_gas_${appliance.location.toLowerCase().replace(/\s+/g, '_')}`,
          name: `Hydrocarbon Gas Detector - ${appliance.location}`,
          location: appliance.location.toLowerCase().replace(/\s+/g, '_'),
          category: 'FFE',
          reference: 'WBC3 15.6.4.1',
          mandatory: true,
          description: `Gas detector required for ${appliance.applianceType || 'gas appliance'} in ${appliance.location}`,
          installationGuidance: `Install at low level in ${appliance.location} near ${appliance.applianceType || 'appliance'}`
        });
      }
    });
  }
  
  // Li-ion Battery Detection (WBC3 Annex 1 3.2.1)
  if (vessel.hasLithiumBatteries || vessel.hasLithiumBattery) {
    requirements.push({
      id: 'ffe_detector_lithium_system',
      name: 'Fire Detection System - Li-ion Battery',
      category: 'FFE',
      reference: 'WBC3 Annex 1 3.2.1',
      mandatory: true,
      description: 'Smoke AND heat AND flame detectors - all three types required'
    });
  }
  
  return requirements;
}