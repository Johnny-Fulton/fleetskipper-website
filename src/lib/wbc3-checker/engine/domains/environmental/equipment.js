/**
 * Environmental Equipment Requirements
 * Generated from UK-MARITIME-LIBRARY/03-CSV-DATABASES/SEAGOING/domains/ENVIRONMENTAL_v1/EQUIPMENT_REGISTER.csv
 * THIS FILE USES ONLY THE CSV DATA - NO MADE UP REQUIREMENTS
 * Following anchor mode pattern - max 300 lines
 */

export function getEnvironmentalEquipmentRequirements(vessel) {
  const requirements = [];
  
  // Only apply to seagoing vessels
  if (!vessel.operatingStatus || vessel.operatingStatus !== 'seagoing') {
    return requirements;
  }
  
  const length = vessel.lengthOverall || vessel.lengthOverall || 0;
  const tonnage = vessel.tonnage || vessel.grossTonnage || 0;
  const pob = vessel.personCapacity || vessel.POB || 0;
  
  // ===== GARBAGE MANAGEMENT =====
  // From CSV rows 9-10
  
  // Garbage Receptacles - always required
  requirements.push({
    id: 'environmental.garbage.receptacles',
    name: 'Garbage Receptacles',
    category: 'Pollution Prevention',
    reference: 'WBC3 30.3.1',
    mandatory: true,
    description: 'Adequate storage for garbage types'
  });
  
  // Garbage Disposal Placards - for ALL seagoing vessels per WBC3 30.3.1
  requirements.push({
    id: 'environmental.garbage.placards',
    name: 'Garbage Disposal Placards',
    category: 'Pollution Prevention',
    reference: 'WBC3 30.3.1/MGN 632',
    mandatory: true,
    description: 'Display disposal restrictions - ALL vessels shall comply'
  });
  
  // ===== SEWAGE MANAGEMENT =====
  // From CSV rows 12-13
  
  // Sewage Holding Tank - for prohibited discharge areas without IMO system
  if (vessel.hasProhibitedDischargeArea && !vessel.hasIMOSewageSystem) {
    requirements.push({
      id: 'environmental.sewage.holding.tank',
      name: 'Sewage Holding Tank',
      category: 'Pollution Prevention',
      reference: 'WBC3 30.2.2',
      mandatory: true,
      description: 'Holding tank of sufficient capacity - where direct discharge prohibited'
    });
  }
  
  // Sewage Treatment System - for larger vessels or international voyages
  if ((tonnage >= 400 || (tonnage < 400 && pob > 15)) && vessel.internationalVoyages) {
    requirements.push({
      id: 'environmental.sewage.treatment.system',
      name: 'Sewage Treatment System',
      category: 'Pollution Prevention',
      reference: 'WBC3 30.2.1',
      mandatory: true,
      description: 'MARPOL Annex IV requirement for international voyages'
    });
  }
  
  // ===== OIL POLLUTION PREVENTION - GENERAL =====
  // From CSV rows 15-16
  
  // Oil Sludge Tank - MARPOL Annex I Reg 12 applies to vessels ≥400GT
  if (tonnage >= 400 && (vessel.hasOilySludge || vessel.engineType === 'diesel')) {
    requirements.push({
      id: 'environmental.oil.sludge.tank',
      name: 'Oil Sludge Tank',
      category: 'Pollution Prevention',
      reference: 'MARPOL Annex I Reg 12',
      mandatory: true,
      description: 'Sludge and oil mixture storage - vessels ≥400GT'
    });
  }
  
  // Standard Discharge Connection - for vessels ≥400GT
  if (tonnage >= 400) {
    requirements.push({
      id: 'environmental.oil.standard.discharge',
      name: 'Standard Discharge Connection',
      category: 'Pollution Prevention',
      reference: 'MARPOL Annex I',
      mandatory: true,
      description: 'Universal flange for shore reception facilities'
    });
  }

  // Note: WBC3 30.6 requires general oil pollution prevention measures but does not specify
  // particular equipment items. Specific requirements are covered by other items in this file.

  // ===== OIL POLLUTION PREVENTION - MACHINERY SPACE =====
  // From CSV rows 18-19
  
  // Oil Bilge Alarm - for ALL vessels with machinery compartments per WBC3 11.3.1
  if (vessel.hasMachinerySpace || vessel.engineLocation === 'below_deck') {
    requirements.push({
      id: 'environmental.oil.bilge.alarm',
      name: 'Oil Bilge Alarm',
      category: 'Pollution Prevention',
      reference: 'WBC3 11.3.1',
      mandatory: true,
      description: 'Bilge alarm required for all vessels with machinery compartments'
    });
  }
  
  // Oily Water Separator - MARPOL Annex I Reg 14 for vessels ≥400GT with machinery spaces
  if (tonnage >= 400 && (vessel.hasMachinerySpace || vessel.engineLocation === 'below_deck')) {
    requirements.push({
      id: 'environmental.oil.bilge.separator',
      name: 'Oily Water Separator (15ppm)',
      category: 'Pollution Prevention',
      reference: 'MARPOL Annex I Reg 14',
      mandatory: true,
      description: 'Oily water filtering equipment for vessels ≥400GT with machinery spaces'
    });
  }

  // Oily Water Separator - ROUV specific requirement (WBC3 Annex 2)
  if ((vessel.isUnmanned || vessel.vesselType === 'rouv') && tonnage < 400) {
    requirements.push({
      id: 'environmental.oil.bilge.separator.rouv',
      name: 'Oily Water Separator (ROUV)',
      category: 'Pollution Prevention',
      reference: 'WBC3 Annex 2',
      mandatory: true,
      description: '15ppm separator equipment for ROUV'
    });
  }
  
  // ===== DANGEROUS GOODS EQUIPMENT =====
  // From CSV rows 21-23
  
  if (vessel.hasDangerousGoods || vessel.operations?.includes('dangerous_goods')) {
    // DG Fire Extinguisher
    requirements.push({
      id: 'environmental.dg.fire.extinguisher',
      name: 'DG Fire Extinguisher',
      category: 'Safety Equipment',
      reference: 'IMDG Code',
      mandatory: true,
      description: 'Suitable for DG carried - additional to normal FFE',
      quantity: 2
    });
    
    // DG First Aid Kit
    requirements.push({
      id: 'environmental.dg.first.aid',
      name: 'DG First Aid Kit',
      category: 'Medical Equipment',
      reference: 'IMDG Code',
      mandatory: true,
      description: 'Enhanced for DG hazards - additional medical supplies'
    });
    
    // DG Personal Protective Equipment
    requirements.push({
      id: 'environmental.dg.ppe',
      name: 'DG Personal Protective Equipment',
      category: 'Safety Equipment',
      reference: 'IMDG Code',
      mandatory: true,
      description: 'PPE appropriate to DG classes handled'
    });
  }
  
  // Note: Fuel transfer pollution prevention equipment (rows 25-27) marked as GUIDANCE in CSV
  // These are recommendations, not mandatory requirements
  
  return requirements;
}