import { parseCategory } from './categoryHelpers.js';

/**
 * Flatten vessel configuration for requirements system
 * Converts nested structure to flat object expected by requirement functions
 */
export function flattenVesselConfig(vesselConfig) {
  if (!vesselConfig) return {};
  
  // Safe destructuring
  const cfg = vesselConfig || {};
  
  // Handle both nested and flat formats
  const flattened = {
    // Basic fields - check direct properties first, with safe fallbacks
    vesselName: cfg.vesselName || cfg.name || cfg.basic?.name,
    vesselType: cfg.vesselType || cfg.type || cfg.basic?.type,
    category: parseCategory(cfg.category || cfg.basic?.category),
    lengthOverall: parseFloat(cfg.lengthOverall || cfg.basic?.lengthOverall) || 0,
    grossTonnage: parseFloat(cfg.grossTonnage || cfg.basic?.grossTonnage) || 0,
    tonnage: parseFloat(cfg.grossTonnage || cfg.basic?.grossTonnage) || 0, // Alias for navigation domain
    operatingStatus: cfg.operatingStatus || cfg.basic?.operatingStatus || 'seagoing',
    
    // Engine/machinery fields - enhanced for unified propulsion system
    engineType: cfg.engineType || cfg.machinery?.engineType,
    engineLocation: cfg.engineLocation || cfg.enginePosition || cfg.machinery?.engineLocation,
    enginePosition: cfg.enginePosition || cfg.engineLocation || cfg.machinery?.engineLocation, // Both names for compatibility
    enginePowerKW: parseFloat(cfg.enginePowerKW || cfg.enginePower || cfg.machinery?.enginePowerKW || cfg.machinery?.enginePower) || 0,
    startMethod: cfg.startMethod || cfg.machinery?.startMethod,
    
    // NEW: Unified propulsion system fields
    propulsionConfiguration: cfg.propulsionConfiguration || '',
    driveType: cfg.driveType || cfg.propulsionMethod || '',
    
    // Derived engine flags (for FFE requirements)
    // Check propulsion type FIRST to determine outboard vs inboard
    hasOutboard: vesselConfig.propulsionType === 'outboard' ||
                 (vesselConfig.engineType || vesselConfig.machinery?.engineType) === 'outboard',
    hasInboardDiesel: vesselConfig.propulsionType !== 'outboard' &&
                      ['inboard_diesel', 'diesel', 'inboard'].includes(vesselConfig.engineType || vesselConfig.machinery?.engineType),
    engineAboveDeck: (vesselConfig.engineLocation || vesselConfig.enginePosition || vesselConfig.machinery?.engineLocation) === 'above_deck',
    engineBelowDeck: (vesselConfig.engineLocation || vesselConfig.enginePosition || vesselConfig.machinery?.engineLocation) === 'below_deck',
    
    // Machinery space - automatically set if inboard engine below deck
    hasMachinerySpace: vesselConfig.hasMachinerySpace || 
                      ((vesselConfig.engineLocation || vesselConfig.enginePosition || vesselConfig.machinery?.engineLocation) === 'below_deck' &&
                       ['inboard_diesel', 'diesel', 'inboard'].includes(vesselConfig.engineType || vesselConfig.machinery?.engineType)),
    
    // Accommodation fields
    hasAccommodation: vesselConfig.hasAccommodation || vesselConfig.accommodation?.hasAccommodation,
    hasSleeping: vesselConfig.hasSleeping || vesselConfig.accommodation?.hasSleeping,
    hasCooking: vesselConfig.hasCooking || vesselConfig.hasGalley || vesselConfig.accommodation?.hasCooking,
    hasHeating: vesselConfig.hasHeating || vesselConfig.accommodation?.hasHeating,
    
    // Read from simple field
    hasOpenFlame: vesselConfig.hasOpenFlame || vesselConfig.accommodation?.hasOpenFlame || 
                  (vesselConfig.galleyHeatSource === 'open_flame') ||
                  (vesselConfig.galleyHeatSource === 'gas') ||
                  // Legacy fallback
                  (vesselConfig.cookingType === 'gas' || vesselConfig.cookingType === 'open_flame' || vesselConfig.cookingType === 'liquid_fuel'),
    hasLithiumBattery: vesselConfig.hasLithiumBattery || vesselConfig.hasLithiumBatteries || vesselConfig.accommodation?.hasLithiumBattery,
    hasFireRiskArea: vesselConfig.hasFireRiskArea || 
                     (Array.isArray(vesselConfig.fireRiskAreas) && vesselConfig.fireRiskAreas.length > 0),
    hasAdditionalGasAppliances: Array.isArray(vesselConfig.additionalGasAppliances) && 
                                vesselConfig.additionalGasAppliances.length > 0,
    hasAdditionalExhaustRisks: Array.isArray(vesselConfig.additionalExhaustRisks) && 
                               vesselConfig.additionalExhaustRisks.length > 0,
    hasElectricalEquipmentAreas: Array.isArray(vesselConfig.electricalEquipmentAreas) && 
                                 vesselConfig.electricalEquipmentAreas.length > 0,
    
    // Gas and liquid fuel appliance detection - Read from simple field
    hasGasAppliance: vesselConfig.gasAppliances || vesselConfig.hasGasAppliance || 
                     (vesselConfig.galleyHeatSource === 'open_flame') ||
                     (vesselConfig.galleyHeatSource === 'gas') ||
                     // Legacy fallback
                     (vesselConfig.cookingType === 'gas' || vesselConfig.cookingType === 'open_flame'),
    hasLiquidFuelAppliance: vesselConfig.hasLiquidFuelAppliance || 
                           (vesselConfig.galleyHeatSource === 'liquid_fuel') ||
                           // Legacy fallback
                           (vesselConfig.cookingType === 'liquid_fuel'),
    
    // Open flame protection flags - NEW
    hasFireBlanket: !!vesselConfig.openFlameProtection?.blanket,
    hasFixedCookingSystem: !!vesselConfig.openFlameProtection?.fixedSystem,
    needsExtraExtForCooking: !!vesselConfig.openFlameProtection?.extraExtinguisher,
    
    // Pass through the full openFlameProtection object for detailed checks
    openFlameProtection: vesselConfig.openFlameProtection || {
      blanket: false,
      extraExtinguisher: false,
      fixedSystem: false
    },
    
    // FFE Gate Logic - DEFAULT TO OPEN BOAT BEHAVIOR (Progressive Configuration)
    // All vessels start as open boats until accommodation/enclosure is explicitly added
    isOpenBoat: vesselConfig.isOpenBoat !== undefined ? vesselConfig.isOpenBoat :
                vesselConfig.ffe?.isOpenBoat !== undefined ? vesselConfig.ffe?.isOpenBoat :
                // Default true for RIBs, workboats, tugs, pilot boats unless enclosure present
                (['rib', 'tug', 'pilot', 'patrol', 'survey'].includes(vesselConfig.vesselType) || 
                 ['rib', 'tug', 'pilot', 'patrol', 'survey'].includes(vesselConfig.basic?.type)) &&
                !vesselConfig.hasWheelhouse && !vesselConfig.enclosed_accommodation_present ? true :
                // Default true for all other vessels unless they have substantial enclosure
                !vesselConfig.hasWheelhouse && !vesselConfig.enclosed_accommodation_present,
    
    hasSubstantialEnclosure: vesselConfig.hasSubstantialEnclosure || vesselConfig.ffe?.hasSubstantialEnclosure || 
                            vesselConfig.hasWheelhouse || vesselConfig.enclosed_accommodation_present || false,
    hasFirePort: vesselConfig.hasFirePort || vesselConfig.ffe?.hasFirePort,
    choosesFixed: vesselConfig.choosesFixed || vesselConfig.ffe?.choosesFixed,
    hasFirePump: vesselConfig.hasFirePump || vesselConfig.equipment?.includes('fire_pump'),
    
    // Legacy fixed system flag (migrate to space-specific)
    hasFixedFireSystem: vesselConfig.hasFixedFireSystem || vesselConfig.equipment?.includes('fixed_firefighting'),
    
    // Space-specific fixed fire systems (WBC3 compliant)
    hasFixedFireEngine: !!vesselConfig.fixedFFE?.engine,
    hasFixedFireGalley: !!vesselConfig.fixedFFE?.galley || !!vesselConfig.openFlameProtection?.fixedSystem,
    hasFixedFireAccommodation: !!vesselConfig.fixedFFE?.accommodation,
    choosesFixedCooking: !!vesselConfig.openFlameProtection?.fixedSystem,
    
    // Operations
    operations: vesselConfig.operations || vesselConfig.operations?.operations || [],
    hasDangerousGoods: vesselConfig.hasDangerousGoods || vesselConfig.operations?.hasDangerousGoods,
    
    // Sea area configuration - prioritize gmdssSeaArea (primary field saved by Modal)
    seaArea: vesselConfig.gmdssSeaArea || vesselConfig.seaArea || vesselConfig.navcomms?.seaArea,
    gmdssSeaArea: vesselConfig.gmdssSeaArea || vesselConfig.seaArea || vesselConfig.navcomms?.seaArea,
    
    // Set sea area flags based on the selected sea area (prioritize gmdssSeaArea)
    // Each higher area includes all lower areas
    seaAreaA1: true, // All seagoing vessels operate in A1
    seaAreaA2: vesselConfig.seaAreaA2 ||
               ['A2', 'A3', 'A4', 'A1+A2', 'A1+A2+A3', 'A1+A2+A3+A4'].some(a =>
                 (vesselConfig.gmdssSeaArea || vesselConfig.seaArea || vesselConfig.navcomms?.seaArea || '').includes(a.replace('A1+', ''))
               ),
    seaAreaA3: vesselConfig.seaAreaA3 ||
               ['A3', 'A4', 'A1+A2+A3', 'A1+A2+A3+A4'].some(a =>
                 (vesselConfig.gmdssSeaArea || vesselConfig.seaArea || vesselConfig.navcomms?.seaArea || '').includes('A3') ||
                 (vesselConfig.gmdssSeaArea || vesselConfig.seaArea || vesselConfig.navcomms?.seaArea || '').includes('A4')
               ),
    seaAreaA4: vesselConfig.seaAreaA4 ||
               (vesselConfig.gmdssSeaArea || vesselConfig.seaArea || vesselConfig.navcomms?.seaArea || '').includes('A4'),
    
    // GMDSS related fields from navcomms
    hasECDIS: vesselConfig.hasECDIS || vesselConfig.navcomms?.hasECDIS,
    hasPaperCharts: vesselConfig.hasPaperCharts || vesselConfig.navcomms?.hasPaperCharts,
    hasElectronicPubs: vesselConfig.hasElectronicPubs || vesselConfig.navcomms?.hasElectronicPubs,
    hasPaperPubs: vesselConfig.hasPaperPubs || vesselConfig.navcomms?.hasPaperPubs,
    
    // Debug helpers for heat source testing - Read from simple field
    galleyHeatSource: vesselConfig.galleyHeatSource === 'gas' ? 
                      'open_flame' : 
                      (vesselConfig.galleyHeatSource || vesselConfig.cookingType || 'electric'),
    
    // Pass through any other properties that might be needed
    ...vesselConfig
  };
  
  // ============================================================================
  // DERIVED BOOLEAN FLAGS - Single source of truth for requirements and maintenance
  // ============================================================================
  
  // Compute the base engine/galley conditions first
  const hasInboardDiesel = flattened.hasInboardDiesel;
  const engineBelowDeck = flattened.engineBelowDeck;
  const engineAboveDeck = flattened.engineAboveDeck;
  
  // Derived choice gates for clean requirement/maintenance generation
  const hasFixedFireEngine_MANDATORY = !!(hasInboardDiesel && engineBelowDeck);
  const hasFixedFireEngine_CHOSEN = !!(
    engineAboveDeck && vesselConfig.engineBoxProtection?.fixedSystem === true
  );
  const hasFirePort_CHOSEN = !!(
    engineAboveDeck && vesselConfig.engineBoxProtection?.firePort === true
  );
  const hasGalleyFixed_CHOSEN = !!(
    vesselConfig.openFlameProtection 
      ? vesselConfig.openFlameProtection.fixedSystem === true
      : vesselConfig.fixedFFE?.galley === true // legacy fallback only if no openFlameProtection
  );
  
  // Add derived flags to flattened config
  flattened.hasFixedFireEngine_MANDATORY = hasFixedFireEngine_MANDATORY;
  flattened.hasFixedFireEngine_CHOSEN = hasFixedFireEngine_CHOSEN;
  flattened.hasFirePort_CHOSEN = hasFirePort_CHOSEN;
  flattened.hasGalleyFixed_CHOSEN = hasGalleyFixed_CHOSEN;
  
  // ============================================================================
  // NORMALIZATION - Clean up stale/conflicting legacy flags
  // ============================================================================
  
  // Normalize fixedFFE flags based on explicit choices to prevent ghost requirements
  if (!flattened.fixedFFE) {
    flattened.fixedFFE = { engine: false, galley: false, accommodation: false };
  }
  
  // If above deck and user selected fire port, ensure legacy fixed engine flag is false
  if (engineAboveDeck && hasFirePort_CHOSEN) {
    flattened.fixedFFE.engine = false;
  }
  
  // If above deck and user selected fixed system, ensure legacy flag matches
  if (engineAboveDeck && hasFixedFireEngine_CHOSEN) {
    flattened.fixedFFE.engine = true;
  }
  
  // If open-flame protection exists, let it be source of truth for galley fixed
  if (vesselConfig.openFlameProtection) {
    flattened.fixedFFE.galley = hasGalleyFixed_CHOSEN;
    flattened.hasFixedFireGalley = hasGalleyFixed_CHOSEN; // Legacy field
  }
  
  // ============================================================================
  // UNIFIED PROPULSION SYSTEM GATE CONDITIONS - Following RA's gate logic
  // ============================================================================
  
  // Map new propulsionConfiguration to gate conditions for existing requirement functions
  if (vesselConfig.propulsionConfiguration) {
    const config = vesselConfig.propulsionConfiguration;
    
    // ===== RA'S GATE LOGIC IMPLEMENTATION =====
    
    // Basic battery system detection
    flattened.hasBatteryElectricPropulsion = config.includes('battery_inboard') || config.includes('battery_outboard');
    flattened.hasBatteryHybridPropulsion = config.includes('hybrid_');
    flattened.hasAnyBatteryPropulsion = config.includes('battery_') || config.includes('hybrid_');
    
    // Specific requirements triggers
    flattened.requiresWBC3Annex1 = config.includes('battery_') || config.includes('hybrid_');
    flattened.requiresBMS = config.includes('battery_') || config.includes('hybrid_');
    flattened.requiresFixedFireSuppression = config.includes('battery_') || config.includes('hybrid_');
    flattened.requiresHybridPMS = config.includes('hybrid_');
    
    // CRITICAL: Update legacy fields that requirements depend on
    if (config.includes('diesel')) {
      flattened.engineType = config.includes('outboard') ? 'outboard' : 'diesel';
      flattened.propulsionType = 'diesel';
      flattened.isDieselPropulsion = true;
      flattened.hasInboardDiesel = config.includes('inboard');
      flattened.hasOutboard = config.includes('outboard');
    }
    
    if (config.includes('battery') && !config.includes('hybrid')) {
      flattened.engineType = 'battery_electric';
      flattened.propulsionType = 'battery_electric';
      flattened.isBatterySystem = true;
      flattened.requiresWBC3Annex1 = true;
      // CRITICAL: Battery electric systems do not have diesel engines
      flattened.hasInboardDiesel = false;
      flattened.hasOutboard = config.includes('outboard');
    }
    
    if (config.includes('hybrid')) {
      flattened.engineType = 'battery_hybrid';
      flattened.propulsionType = 'battery_hybrid';
      flattened.isBatterySystem = true;
      flattened.isDieselPropulsion = true; // Hybrid has both
      flattened.requiresWBC3Annex1 = true;
      flattened.hasInboardDiesel = config.includes('inboard'); // Diesel component
    }
    
    if (config.includes('petrol')) {
      flattened.engineType = 'petrol';
      flattened.propulsionType = 'petrol';
      flattened.isPetrolEngine = true;
      flattened.hasOutboard = true; // WBC3 requirement
    }
    
    // Update position fields
    if (config.includes('outboard')) {
      flattened.enginePosition = 'outboard';
      flattened.engineLocation = null; // Outboards don't have deck location
    } else if (config.includes('inboard')) {
      flattened.enginePosition = 'inboard';
      if (config.includes('above')) {
        flattened.engineLocation = 'above_deck';
        flattened.engineAboveDeck = true;
        flattened.engineBelowDeck = false;
      } else if (config.includes('below')) {
        flattened.engineLocation = 'below_deck';
        flattened.engineAboveDeck = false;
        flattened.engineBelowDeck = true;
        flattened.hasMachinerySpace = true; // Auto-set for below deck inboard
      }
    }
  }
  
  // Map driveType to maintenance/equipment flags
  if (vesselConfig.driveType) {
    const driveType = vesselConfig.driveType;
    
    flattened.hasShaftDrive = driveType === 'shaft';
    flattened.hasWaterJet = driveType === 'water_jet';
    flattened.hasPodDrive = driveType === 'pod_drive';
    flattened.hasOutboardMotor = driveType === 'outboard_motor';
    
    // Set maintenance flags based on drive type
    if (driveType === 'shaft') {
      flattened.requiresShaftMaintenance = true;
      flattened.requiresGearboxService = true;
    } else if (driveType === 'water_jet') {
      flattened.requiresImpellerInspection = true;
      flattened.requiresIntakeScreening = true;
    } else if (driveType === 'pod_drive') {
      flattened.requiresPodSealInspection = true;
      flattened.requiresRotationMaintenance = true;
    } else if (driveType === 'outboard_motor') {
      flattened.requiresLowerUnitService = true;
      flattened.requiresPropellerInspection = true;
    }
  }

  // ============================================================================
  // OPERATIONS-DERIVED FLAGS - Map operations[] array to boolean flags
  // Approved by Architecture Guardian 2025-11-29 (Option B - derive at consumption)
  // ============================================================================

  const operations = vesselConfig.operations || [];

  // Lifting/Crane operations - triggers crane maintenance jobs
  flattened.hasCrane = vesselConfig.hasCrane || operations.includes('lifting');
  flattened.hasLiftingDevice = vesselConfig.hasLiftingDevice || operations.includes('lifting');
  flattened.hasLiftingOps = vesselConfig.hasLiftingOps || operations.includes('lifting');

  // Dive support operations - triggers diver lift maintenance jobs
  flattened.hasDiverLift = vesselConfig.hasDiverLift || operations.includes('dive_support');

  // Towing operations - triggers towing gear maintenance jobs
  flattened.hasTowingOps = vesselConfig.hasTowingOps || operations.includes('towing_operations');

  // MGO/Fuel transfer operations - triggers MGO supply system maintenance jobs
  flattened.hasMGOSupplyEndorsement = vesselConfig.hasMGOSupplyEndorsement ||
                                      operations.includes('fuel_transfer') ||
                                      vesselConfig.vesselType === 'workboat_mgo_transfer_endorsed';

  // Pilot boat operations - triggers pilot equipment maintenance jobs
  flattened.isPilotBoat = vesselConfig.isPilotBoat ||
                          operations.includes('pilot_transfer') ||
                          vesselConfig.vesselType === 'pilot';

  // Police/patrol vessel operations - triggers police equipment maintenance jobs
  flattened.isPoliceVessel = vesselConfig.isPoliceVessel ||
                             operations.includes('patrol_operations') ||
                             vesselConfig.vesselType === 'police';

  // Personnel transfer operations - triggers gangway/transfer equipment maintenance jobs
  flattened.hasPersonnelTransfer = vesselConfig.hasPersonnelTransfer || operations.includes('personnel_transfer');

  // Dangerous goods operations - triggers DG equipment maintenance jobs
  // Note: hasDangerousGoods is also set at line 125, but we reinforce here with operations
  flattened.hasDangerousGoods = vesselConfig.hasDangerousGoods ||
                                operations.includes('dangerous_goods') ||
                                vesselConfig.operations?.hasDangerousGoods;

  // ============================================================================
  // SIZE-DERIVED FLAGS - Threshold-based flags for Environmental requirements
  // ============================================================================

  flattened.grossTonnageGT400 = (flattened.grossTonnage || 0) >= 400;
  flattened.lengthGT12 = (flattened.lengthOverall || 0) >= 12;

  // ============================================================================
  // PROPULSION-DERIVED FLAGS - For Machinery maintenance job conditions
  // Added 2025-11-29 per MACHINERY_JOB_CONDITIONS_PLAN.md
  // ============================================================================

  // Combustion engine flag - true for diesel, petrol, or hybrid (has diesel component)
  flattened.hasCombustionEngine = flattened.isDieselPropulsion ||
                                   flattened.isPetrolEngine ||
                                   flattened.hasBatteryHybridPropulsion;

  // Fuel system flag - true for vessels with fuel tanks/lines (not battery-only)
  flattened.hasFuelSystem = flattened.isDieselPropulsion || flattened.isPetrolEngine;

  // Rudder flag - derived from drive type (shaft drive = has rudder)
  // Water jet, pod drive, and outboard motor have integrated steering (no traditional rudder)
  flattened.hasRudder = flattened.hasShaftDrive === true;

  // ============================================================================
  // FINAL ASSERTION - Ensure critical derived flags aren't overwritten by spread
  // ============================================================================

  // CRITICAL: hasCooking must ALWAYS be true if hasGalley is true
  // The ...vesselConfig spread (line 140) may have overwritten this with explicit false
  if (vesselConfig.hasGalley) {
    flattened.hasCooking = true;
  }

  // ============================================================================
  // LEGACY VALUE HANDLING - WBC3 Heat Source Migration (Phase 1)
  // ============================================================================
  // WBC3 only recognizes 3 heat sources: electric, gas, liquid_fuel
  // Legacy values "open_flame" and "solid_fuel" are no longer in the dropdown
  // but existing vessels may still have them. Handle gracefully:

  if (vesselConfig.galleyHeatSource === 'open_flame' || vesselConfig.galleyHeatSource === 'solid_fuel') {

    // Ensure hasOpenFlame is set for legacy values
    flattened.hasOpenFlame = true;

    // Legacy "solid_fuel" should behave like liquid_fuel (no gas detector)
    // Legacy "open_flame" is ambiguous - treat as requiring protection but log warning
    if (vesselConfig.galleyHeatSource === 'solid_fuel') {
      flattened.hasLiquidFuelAppliance = true;
      flattened.hasGasAppliance = false;

    } else if (vesselConfig.galleyHeatSource === 'open_flame') {

    }
  }

  // ============================================================================
  // HAZARD ARRAYS - Pass through for location-specific requirement generation
  // ============================================================================
  // These arrays contain location-specific hazard data that requirements generators
  // can use to create location-specific requirements instead of generic ones
  flattened.fireRiskAreas = vesselConfig.fireRiskAreas || [];
  flattened.additionalGasAppliances = vesselConfig.additionalGasAppliances || [];
  flattened.additionalExhaustRisks = vesselConfig.additionalExhaustRisks || [];
  flattened.electricalEquipmentAreas = vesselConfig.electricalEquipmentAreas || [];

  // ============================================================================
  // REGULATORY GAP FIXES — Standalone tool additions
  // These fields address gaps identified by cross-referencing code against WBC3
  // and the domain CSV EQUIPMENT_REGISTER files.
  // ============================================================================

  // GAP #1: Engine Power — ensure enginePower alias is set for all domain files
  // Some domain files use vessel.enginePower instead of vessel.enginePowerKW
  flattened.enginePower = flattened.enginePowerKW;
  // Derived power threshold flags used by FFE and LSA CSVs
  flattened.enginePowerGT220 = (flattened.enginePowerKW || 0) > 220;
  flattened.enginePowerLT120 = (flattened.enginePowerKW || 0) < 120;
  flattened.installedPowerGT750 = (flattened.enginePowerKW || 0) > 750;

  // GAP #2: Voyage Duration — NAVTEX conditional (WBC3 Table 17.2.1 Note B)
  flattened.voyageGT12hours = vesselConfig.voyageDuration === 'over_12h' ||
                               vesselConfig.voyageDuration === 'mixed';
  flattened.voyageDurationLE12h = vesselConfig.voyageDuration === 'under_12h';

  // GAP #3: UK Waters — MF radio conditional (WBC3 Table 17.2.1 Note C)
  flattened.operatesUKWaters = vesselConfig.operatesUKWaters !== false;

  // GAP #4: Visual Alerting — EPIRB/PLB conditional (WBC3 Table 17.2.1 Notes A, C2)
  flattened.visualAlertingIneffective = vesselConfig.visualAlertingEffective === 'no' ||
                                        vesselConfig.visualAlertingEffective === 'uncertain';
  flattened.ineffectiveNonGMDSS = flattened.visualAlertingIneffective;

  // GAP #5: Weather Info — NAVTEX Cat 5-6 conditional (WBC3 Table 17.2.1 Notes C1, C3)
  flattened.canGetWeatherInfo = vesselConfig.alternativeWeatherInfo === 'available';

  // GAP #8: Water Temperature — TPA/immersion suit conditional (WBC3 14.5.2, 22.2.6)
  flattened.waterTempLE = vesselConfig.waterTemperature === 'at_or_below_10c' ? 10 : 15;

  // GAP #9: Night Operations — compass light, deck lighting (Navigation domain)
  flattened.operatesAtNight = !!vesselConfig.operatesAtNight;

  // GAP #10: Children on board — child lifejacket requirement (LSA domain)
  flattened.carriesChildren = !!vesselConfig.carriesChildren;
  flattened.pobChildrenGTE = vesselConfig.carriesChildren ? 1 : 0;

  // GAP #6 & #7: isOpenBoat and hasSleeping are already handled above
  // in the main flattened object (lines 94-106 and line 51)

  // Ensure maxPersons is always available
  flattened.maxPersons = parseInt(vesselConfig.maxPersons) || flattened.maxPersons || 1;

  return flattened;
}