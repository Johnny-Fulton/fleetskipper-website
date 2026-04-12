/**
 * Medical Equipment Requirements
 * Generated from UK-MARITIME-LIBRARY/03-CSV-DATABASES/SEAGOING/domains/MEDICAL_v1/EQUIPMENT_REGISTER.csv
 * THIS FILE USES ONLY THE CSV DATA - NO MADE UP REQUIREMENTS
 * Following anchor mode pattern - max 300 lines
 */

import { parseCategory } from '../../categoryHelpers.js';

export function getMedicalEquipmentRequirements(vessel) {
  const requirements = [];

  // Only apply to seagoing vessels
  if (!vessel.operatingStatus || vessel.operatingStatus !== 'seagoing') {
    return requirements;
  }

  const category = parseCategory(vessel.category);
  
  // ===== MEDICAL STORES BY CATEGORY =====
  // From CSV rows 7-9
  
  // Medical Stores Category A - for Category 0 (unlimited voyage)
  if (category === 0) {
    requirements.push({
      id: 'medical.stores.cat.a',
      name: 'Medical Stores Category A',
      category: 'Medical Stores',
      reference: 'WBC3 23.1.1.1/MSN 1905',
      mandatory: true,
      description: 'Category of Medicines and Medical Stores A - Unlimited voyage vessels'
    });
  }
  
  // Medical Stores Category B - for Category 1 (up to 150nm)
  if (category === 1) {
    requirements.push({
      id: 'medical.stores.cat.b',
      name: 'Medical Stores Category B',
      category: 'Medical Stores',
      reference: 'WBC3 23.1.1.2/MSN 1905',
      mandatory: true,
      description: 'Category of Medicines and Medical Stores B - Vessels <150nm from port'
    });
  }
  
  // Medical Stores Category C - for Categories 2-6 (near shore)
  if (category >= 2 && category <= 6) {
    requirements.push({
      id: 'medical.stores.cat.c',
      name: 'Medical Stores Category C',
      category: 'Medical Stores',
      reference: 'WBC3 23.1.1.3/MSN 1905',
      mandatory: true,
      description: 'Category of Medicines and Medical Stores C - Near shore/harbour vessels'
    });
  }
  
  // ===== DANGEROUS GOODS MEDICAL =====
  // From CSV rows 10-11
  
  // Dangerous Goods Medical Kit - if carrying dangerous goods
  if (vessel.hasDangerousGoods || vessel.operations?.includes('dangerous_goods')) {
    requirements.push({
      id: 'medical.dg.kit',
      name: 'Dangerous Goods Medical Kit',
      category: 'Dangerous Goods',
      reference: 'WBC3 29.9.1/MSN 1905 Annex 4',
      mandatory: true,
      description: 'Comply with the IMDG Code - Per MFAG guidance'
    });
    
    // Specific Antidotes - if DG exceeds limits
    if (vessel.dgExceedsLimits) {
      requirements.push({
        id: 'medical.dg.antidotes',
        name: 'Specific Antidotes',
        category: 'Dangerous Goods',
        reference: 'WBC3 29.9.2',
        mandatory: true,
        description: 'Correct antidote to the substance - For DG exceeding IMDG limits'
      });
    }
  }
  
  // ===== SPECIAL VESSEL MEDICAL EQUIPMENT =====
  // From CSV rows 12-14
  
  // First Aid Kit for Police PWC
  if ((vessel.vesselType === 'police' || vessel.type === 'police') && vessel.isPWC) {
    requirements.push({
      id: 'medical.firstaid.police.pwc',
      name: 'First Aid Kit (Police PWC)',
      category: 'Special Equipment',
      reference: 'WBC3 Annex 3 22.6.3.2',
      mandatory: true,
      description: 'First aid kit equipped to an agreed standard - For Police Personal Watercraft'
    });
  }
  
  // Compact Stretcher for Pilot Boats
  if (vessel.vesselType === 'pilot' || vessel.type === 'pilot' || vessel.hasWorkboatPilotEndorsement) {
    requirements.push({
      id: 'medical.stretcher.pilot',
      name: 'Compact Stretcher',
      category: 'Special Equipment',
      reference: 'WBC3 Table 27.2.3',
      mandatory: true,
      description: 'Compact stretcher shall be carried on a pilot boat'
    });
  }
  
  // Portable Medical Kit for ROUV
  if (vessel.isUnmanned && vessel.hasRemoteBoarding) {
    requirements.push({
      id: 'medical.kit.rouv',
      name: 'Portable Medical Kit (ROUV)',
      category: 'Special Equipment',
      reference: 'WBC3 Annex 2 6.4.2',
      mandatory: true,
      description: 'Portable medical kit - For ROUV boarding operations'
    });
  }
  
  return requirements;
}