/**
 * FFE Equipment Requirements
 * Fire Fighting Equipment requirements from FFE_v2 domain (35 verified items)
 */

export function getFFEEquipmentRequirements(vessel) {

  const requirements = [];
  
  // Non-self-propelled platforms follow selective assessment (WBC3 26.5.1.1) - no universal FFE requirements
  if (vessel.vesselType === 'non_self_propelled' || vessel.baseCertificate === 'non_self_propelled') {

    return requirements; // No fire extinguishers, detectors, or universal FFE for unmanned platforms
  }
  
  // Only apply to seagoing vessels
  if (!vessel.operatingStatus || vessel.operatingStatus !== 'seagoing') {

    return requirements;
  }
  
  // UNIVERSAL CONTROL POSITION EXTINGUISHER - WBC3 16.3.1.3.1
  // Required for ALL seagoing vessels regardless of configuration
  requirements.push({
    id: 'ffe_extinguisher_control_position',
    name: 'Portable Fire Extinguisher - Multi-Purpose (Control Position)',
    category: 'FFE',
    reference: 'WBC3 16.3.1.3.1',
    mandatory: true,
    description: '1x multi-purpose fire extinguisher within 2m of main control position (universal requirement for all vessels) - protects against electrical fires, navigation equipment fires, and provides general emergency response capability'
  });
  
  // Open Boat requirement (ONLY if no cooking) - WBC3 Table 16.1.1.1 Note d
  const isOpenBoatUnder8mNoCooking = vessel.isOpenBoat && vessel.lengthOverall < 8 && 
                                     !vessel.hasSubstantialEnclosure && !vessel.hasCooking;

  if (isOpenBoatUnder8mNoCooking) {

    requirements.push({
      id: 'ffe_extinguisher_openboat_le8m',
      name: 'Portable Fire Extinguishers (2x 34B)',
      category: 'Fire Extinguisher',
      reference: 'WBC3 Table 16.1.1.1 Note d',
      mandatory: true,
      description: 'Open Boat ≤8m Protection',
      details: 'Minimum of two 34B portable fire extinguishers for open boats <8m without cooking'
    });
  } else {
    // Fire Extinguishers - Engine Based (WBC3 Table 16.1.1.1)
    // INTERPRETATION B: Position-based requirements override power-based for engines ≥120kW

    if (vessel.hasOutboard && !(vessel.enginePowerKW > 220)) {
      requirements.push({
        id: 'ffe_extinguisher_outboard_le220kw',
        name: 'Portable Fire Extinguishers (1x 34B)',
        category: 'Fire Extinguisher',
        reference: 'WBC3 Table 16.1.1.1',
        mandatory: true,
        description: 'Outboard Engine ≤220kW Protection',
        details: '1x 34B portable fire extinguisher for single outboard ≤220kW'
      });
    }
  
    if (vessel.hasOutboard && vessel.enginePowerKW > 220) {
      requirements.push({
        id: 'ffe_extinguisher_outboard_gt220kw',
        name: 'Fire Extinguisher - Outboard >220kW',
        category: 'FFE',
        reference: 'WBC3 Table 16.1.1.1',
        mandatory: true,
        description: 'Portable fire extinguisher(s) total B capacity = 0.3P (P is aggregate power kW)'
      });
    }
    
    // Basic portable extinguisher ONLY for low-power engines (<120kW)
    if (vessel.hasInboardDiesel && vessel.enginePowerKW < 120) {
      requirements.push({
        id: 'ffe_extinguisher_inboard_lt120kw',
        name: 'Fire Extinguisher - Inboard Diesel <120kW',
        category: 'FFE',
        reference: 'WBC3 Table 16.1.1.1',
        mandatory: true,
        description: '1x multi-purpose fire extinguisher of appropriate size, located adjacent to entrance (basic protection for low-power engines only)'
      });
    }
    
    // INTERPRETATION B: Inboard diesel ≥120kW uses position-based requirements INSTEAD OF basic extinguisher
    // Above deck: Fire port OR fixed system | Below deck: Fixed system mandatory
    
    // Position-based requirement for ALL above-deck engines (any power)
    if (vessel.hasInboardDiesel && vessel.engineAboveDeck) {
      // CONCRETE EQUIPMENT ITEMS: Create individual items for each selected protection method
      
      if (vessel.engineBoxProtection?.firePort) {
        requirements.push({
          id: 'ffe_extinguisher_fire_port_engine',
          name: 'Portable Fire Extinguishers (Fire Port Access)',
          category: 'FFE',
          reference: 'WBC3 Table 16.1.1.1',
          mandatory: true,
          description: 'Portable fire extinguishers with fire port access to engine box - user selected protection method'
        });
      }
      
      if (vessel.engineBoxProtection?.fixedSystem) {
        requirements.push({
          id: 'ffe_fixed_system_engine_above_deck',
          name: 'Fixed Fire System (Engine Box - Above Deck)',
          category: 'FFE',
          reference: 'WBC3 16.4',
          mandatory: true,
          description: 'Fixed fire extinguishing system for above deck engine box - user selected protection method'
        });
      }
    }
  }
  
  // Fixed Fire Systems - Space Specific (WBC3 16.4)
  // Engine Space Fixed System - Only add when:
  // 1. Mandatory: inboard diesel below deck (WBC3 requirement)
  // 2. Chosen: DIESEL above deck AND user explicitly selected fixed system
  // CRITICAL: Only diesel engines can have fixed systems per WBC3 Table 16.1.1.1
  if (
    (vessel.hasInboardDiesel && vessel.engineBelowDeck) ||
    (vessel.hasInboardDiesel && vessel.engineAboveDeck && vessel.engineBoxProtection?.fixedSystem === true)
  ) {
    requirements.push({
      id: 'ffe_fixed_system_engine',
      name: 'Engine Space Fixed Fire System',
      category: 'FFE',
      reference: 'WBC3 16.4; Table 16.1.1.1',
      mandatory: vessel.engineBelowDeck === true, // true if below deck (mandatory), false if above deck (chosen)
      description: vessel.engineBelowDeck 
        ? 'Fixed fire extinguishing system for engine/machinery space - mandatory for ALL below deck diesel engines (any power) - replaces basic extinguisher for engines ≥120kW'
        : 'Fixed fire extinguishing system for engine/machinery space - chosen protection method for above deck engine'
    });
  }

  // REMOVED: Galley Fixed System standalone card (was causing duplication)
  // The galley fixed system is now ONLY represented inside the "Additional Open Flame Protection"
  // requirement (ffe_protection_open_flame) as one of three protection choices.
  // Equipment Register has fallback logic (equipmentRegisterMapper.js:156-162) that creates
  // the fixed system equipment item from ffe_protection_open_flame when ffe_fixed_system_galley
  // doesn't exist, so Equipment Register and Maintenance still work correctly.

  // Accommodation Fixed System (if installed)
  if (vessel.fixedFFE?.accommodation) {
    requirements.push({
      id: 'ffe_fixed_system_accommodation',
      name: 'Accommodation Fixed Fire System',
      category: 'FFE',
      reference: 'WBC3 16.4',
      mandatory: false, // Optional enhancement
      description: 'Fixed fire extinguishing system for accommodation spaces - additional protection'
    });
  }
  
  // Accommodation Fire Protection (WBC3 16.2.1.2)
  // PER SPACE REQUIREMENT: WBC3 requires "one 5A/34B rated portable fire extinguisher shall be located in each accommodation space"
  // Generate separate requirements for each accommodation space (like fire detectors)
  // Note: Galley extinguishers are handled separately (different ratings for open flame)

  if (vessel.hasAccommodation) {
    // Sleeping/living quarters extinguisher
    requirements.push({
      id: 'ffe_extinguisher_accommodation_sleeping',
      name: 'Portable Fire Extinguisher - 5A/34B (Sleeping Quarters)',
      category: 'FFE',
      reference: 'WBC3 16.2.1.2',
      mandatory: true,
      description: 'One 5A/34B rated portable fire extinguisher required in sleeping/living quarters (separate from galley protection)'
    });
  }

  if (vessel.hasWheelhouse) {
    // Wheelhouse extinguisher (accommodation space per WBC3 definition)
    requirements.push({
      id: 'ffe_extinguisher_accommodation_wheelhouse',
      name: 'Portable Fire Extinguisher - 5A/34B (Wheelhouse)',
      category: 'FFE',
      reference: 'WBC3 16.2.1.2',
      mandatory: true,
      description: 'One 5A/34B rated portable fire extinguisher required in wheelhouse (accommodation space - crew working area, separate from galley protection)'
    });
  }
  
  // Cooking/Heating Fire Protection (WBC3 Table 16.2.3.1)
  if ((vessel.hasCooking || vessel.hasHeating) && !vessel.hasOpenFlame) {
    requirements.push({
      id: 'ffe_extinguisher_cooking_noflame',
      name: 'Portable Fire Extinguisher - 5A/34B OR Fixed System (Electric Galley)',
      category: 'FFE',
      reference: 'WBC3 Table 16.2.3.1',
      mandatory: true,
      description: 'One 5A/34B rated portable fire extinguisher OR a fixed system per 16.4 (electric/induction)'
    });
  }
  
  if ((vessel.hasCooking || vessel.hasHeating) && vessel.hasOpenFlame) {
    // BASE REQUIREMENT: Always need the 5A/34B extinguisher when cooking/heating with open flame
    requirements.push({
      id: 'ffe_extinguisher_cooking_flame',
      name: 'Portable Fire Extinguisher - 5A/34B (Galley - Base Requirement)',
      category: 'FFE',
      reference: 'WBC3 16.3.1',
      mandatory: true,
      description: 'One 5A/34B rated portable fire extinguisher (base requirement for cooking with open flame)'
    });
    
    // CONCRETE EQUIPMENT ITEMS: Create individual items for each selected protection method
    // Instead of abstract requirement, create actual equipment based on user choices
    
    if (vessel.openFlameProtection?.blanket) {
      requirements.push({
        id: 'ffe_fire_blanket_galley',
        name: 'Fire Blanket (Galley)',
        category: 'FFE',
        reference: 'WBC3 16.3.1',
        mandatory: true,
        description: 'Fire blanket for open flame cooking protection - user selected additional protection'
      });
    }
    
    if (vessel.openFlameProtection?.extraExtinguisher) {
      requirements.push({
        id: 'ffe_extinguisher_8a68b_galley',
        name: 'Portable Fire Extinguisher - 8A/68B (Galley)',
        category: 'FFE',
        reference: 'WBC3 16.3.1',
        mandatory: true,
        description: 'Additional 8A/68B extinguisher for open flame cooking - user selected additional protection'
      });
    }
    
    if (vessel.openFlameProtection?.fixedSystem) {
      requirements.push({
        id: 'ffe_fixed_system_galley',
        name: 'Fixed Fire System (Galley)',
        category: 'FFE',
        reference: 'WBC3 16.4',
        mandatory: true,
        description: 'Fixed fire suppression system for galley - user selected additional protection'
      });
    }
  }
  
  // Fire Pump (WBC3 16.4.2.1)
  const firePumpExempt = vessel.isOpenBoat && vessel.lengthOverall < 8 && !vessel.hasSubstantialEnclosure;

  if (!firePumpExempt) {
    requirements.push({
      id: 'ffe_fire_pump_required',
      name: 'Fire Pump',
      category: 'FFE',
      reference: 'WBC3 16.4.2.1',
      mandatory: true,
      description: 'All vessels must be fitted with 1x power or hand pump (exempt only if open boat AND <8m AND no enclosure)'
    });

    // Fire Hose (WBC3 16.4.2.4) - Required wherever fire pump is required
    requirements.push({
      id: 'ffe_fire_hose_fitted',
      name: 'Fire Hose',
      category: 'FFE',
      reference: 'WBC3 16.4.2.4',
      mandatory: true,
      description: 'One fire hose of adequate length with 10mm + spray nozzles'
    });
  }
  
  // Fire Buckets (WBC3 16.6.1) - Manual selections
  if (vessel.isPracticable || vessel.deemedNecessary || vessel.companyRequiresBuckets) {
    const reason = vessel.isPracticable ? 'practicable per WBC3 16.6.1' :
                   vessel.deemedNecessary ? 'deemed necessary by Certifying Authority' :
                   'required by company SMS';

    requirements.push({
      id: 'ffe_fire_buckets_fitted',
      name: 'Fire Buckets',
      category: 'FFE',
      reference: 'WBC3 16.6.1',
      mandatory: vessel.isPracticable || vessel.deemedNecessary, // Mandatory if regulation requires, optional if company choice
      description: `Fire buckets of at least 9 litres capacity - ${reason}`
    });
  }

  // Fire Blankets for Fire Risk Areas (WBC3 16.5.2) - Location specific
  if (Array.isArray(vessel.fireRiskAreas) && vessel.fireRiskAreas.length > 0) {
    vessel.fireRiskAreas.forEach((area) => {
      if (area.spaceName) {

        requirements.push({
          id: `ffe_fire_blanket_${area.spaceName.toLowerCase().replace(/\s+/g, '_')}`,
          name: `Fire Blanket - ${area.spaceName}`,
          location: area.spaceName.toLowerCase().replace(/\s+/g, '_'),
          category: 'FFE',
          reference: 'WBC3 16.5.2',
          mandatory: true,
          description: `Fire blanket required in ${area.spaceName} (${area.riskType || 'fire risk area'})`,
          installationGuidance: `Mount fire blanket in accessible location within ${area.spaceName}`
        });
      }
    });
  } else if (vessel.hasFireRiskArea) {
    // Fallback for legacy boolean flag
    requirements.push({
      id: 'ffe_fire_blanket_risk_area',
      name: 'Fire Blanket - Risk Area',
      category: 'FFE',
      reference: 'WBC3 16.5.2',
      mandatory: true,
      description: 'Fire blanket required in area identified as fire risk'
    });
  }

  // Fire Control Plan (WBC3 15.8.1)
  requirements.push({
    id: 'ffe_plan_fire_control',
    name: 'Fire Control and Safety Plan',
    category: 'FFE',
    reference: 'WBC3 15.8.1',
    mandatory: true,
    description: 'Fire control and safety plan(s) which shall be prominently displayed at control position, showing all fire equipment locations'
  });
  
  // Escape Route Marking (WBC3 15.7.4)
  if (vessel.hasEscapeRoute) {
    requirements.push({
      id: 'ffe_escape_route_marking',
      name: 'Escape Route Marking',
      category: 'FFE',
      reference: 'WBC3 15.7.4',
      mandatory: true,
      description: 'Means of escape shall be clearly marked for its purpose on both sides'
    });
  }
  
  // Dangerous Goods Requirements (WBC3 29.8.1 & 29.7.1)
  // NOTE: Light Duty Workboat Certificates PROHIBIT dangerous goods carriage (WBC3 Section 3.9.3.5)
  if (vessel.hasDangerousGoods && vessel.vesselType !== 'light_duty_workboat') {
    requirements.push({
      id: 'ffe_fire_pump_dangerous_goods',
      name: 'Fire Pump - Dangerous Goods',
      category: 'FFE',
      reference: 'WBC3 29.8.1',
      mandatory: true,
      description: 'A second powered fire pump shall be provided - required for all DG vessels'
    });
    
    if (vessel.dgNearAccommodation) {
      requirements.push({
        id: 'ffe_insulation_a60_dangerous_goods',
        name: 'A-60 Insulation - Dangerous Goods',
        category: 'FFE',
        reference: 'WBC3 29.7.1',
        mandatory: true,
        description: 'Bulkhead or deck shall be insulated to A-60 standard - DG within 3m of fuel/machinery/accommodation'
      });
    }
  }
  
  // Pilot Boat Specific Requirements (WBC3 27.2.3)
  if (vessel.vesselType === 'pilot' || vessel.vesselType === 'pilot_boat_dedicated' || vessel.vesselType === 'workboat_pilot_endorsed' || vessel.type === 'pilot') {
    if (vessel.hasPetrolEngine) {
      requirements.push({
        id: 'ffe_extinguisher_pilot_boat_no_petrol',
        name: 'Pilot Boat - No Petrol Engine',
        category: 'FFE',
        reference: 'WBC3 27.2.3 Table 8.6',
        mandatory: true,
        description: 'PROHIBITED: A pilot boat shall not be fitted with a petrol engine - safety requirement',
        classification: 'PROHIBITED'
      });
    }
    
    // NOTE: Pilot boat flares moved to LSA domain as specialized pyrotechnics
    // They replace standard category-based requirements per WBC3 Table 27.2.3
  }
  
  // ===== WBC3 ANNEX 1 - BATTERY PROPULSION FIRE PROTECTION =====
  // Real fire protection requirements from regulations assistant analysis
  
  if (vessel.requiresWBC3Annex1 || vessel.isBatterySystem) {
    
    // Fixed Fire Suppression System - MANDATORY for all battery vessels
    requirements.push({
      id: 'ffe.battery.fixed_suppression',
      name: 'Fixed Fire Suppression System (Battery Compartment)',
      category: 'FFE',
      reference: 'WBC3 Annex 1 Section 3.4.1',
      mandatory: true,
      description: 'Fixed fire suppression system required for all battery electric and hybrid propulsion vessels - protects against battery fires and thermal runaway events'
    });
    
    // Battery Fire Detection - MANDATORY
    requirements.push({
      id: 'ffe.battery.fire_detection',
      name: 'Fire Detection System (Battery Compartment)',
      category: 'FFE',
      reference: 'WBC3 Annex 1 Section 3.2.1',
      mandatory: true,
      description: 'Fire detection system (smoke/heat/flame detection) for battery compartments - early warning for battery fires'
    });
    
    // Portable Fire Extinguishers - MANDATORY (minimum of two 34B extinguishers)
    requirements.push({
      id: 'ffe.battery.portable_extinguishers',
      name: 'Portable Fire Extinguisher - 2x 34B (Battery Area)',
      category: 'FFE',
      reference: 'WBC3 Annex 1 Section 3.5.2',
      mandatory: true,
      description: 'Minimum of two portable fire extinguishers with minimum 34B rating readily accessible for battery box or battery room (in addition to Section 16 requirements). Follow manufacturer requirements for extinguisher types permitted in battery areas.'
    });
    
    // Thermal Runaway Protection - MANDATORY
    requirements.push({
      id: 'ffe.battery.thermal_runaway_protection',
      name: 'Thermal Runaway Protection (Battery System)',
      category: 'FFE',
      reference: 'WBC3 Annex 1 Section 3.4.8',
      mandatory: true,
      description: 'Protection system to prevent and contain thermal runaway events in battery systems - critical safety requirement'
    });
  }
  
  return requirements;
}