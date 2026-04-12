/**
 * GMDSS Equipment Requirements
 * Generated from UK-MARITIME-LIBRARY/03-CSV-DATABASES/SEAGOING/domains/GMDSS_v1/EQUIPMENT_REGISTER.csv
 * THIS FILE USES ONLY THE CSV DATA - NO MADE UP REQUIREMENTS
 */

import { parseCategory } from '../../categoryHelpers.js';

export function getGMDSSEquipmentRequirements(vessel) {
  const requirements = [];
  const category = parseCategory(vessel.category);
  
  // Only apply to seagoing vessels
  if (!vessel.operatingStatus || vessel.operatingStatus !== 'seagoing') {
    return requirements;
  }
  
  // ===== VHF RADIO EQUIPMENT =====
  
  // Fixed VHF DSC Radio Installation
  // From Table 17.2.1: Required for Cat 0-5 (shows "1"), optional for Cat 6 (shows "1 or")
  // Category 6 can choose to have EITHER fixed OR rely on the mandatory portable
  if (vessel.seaAreaA1 || vessel.seaAreaA2 || vessel.seaAreaA3 || vessel.seaAreaA4) {
    if (category !== 6) {
      // Categories 0-5: Fixed VHF is mandatory
      requirements.push({
        id: 'gmdss.vhf.fixed.dsc',
        name: 'Fixed VHF DSC Radio Installation',
        category: 'Communications',
        reference: 'WBC3 Table 17.2.1',
        mandatory: true,
        description: 'Fixed VHF Radio installation with DSC - required for Categories 0-5'
      });
    } else if (category === 6) {
      // Category 6: Fixed VHF is optional (table shows "1 or" meaning they can use portable instead)
      requirements.push({
        id: 'gmdss.vhf.fixed.dsc.optional',
        name: 'Fixed VHF DSC Radio Installation (Optional)',
        category: 'Communications',
        reference: 'WBC3 Table 17.2.1',
        mandatory: false,
        description: 'Category 6 can choose fixed VHF as alternative to relying solely on portable'
      });
    }
    
    // VHF Channel 70 DSC Watch - Required for ALL categories (0-6)
    // Table 17.2.1 shows "1" for all categories in all sea areas
    requirements.push({
      id: 'gmdss.vhf.ch70.watch',
      name: 'VHF Channel 70 DSC Watch Installation',
      category: 'Communications',
      reference: 'WBC3 Table 17.2.1',
      mandatory: true,
      description: 'Continuous VHF Ch70 DSC watch capability - required for ALL vessels'
    });
  }
  
  // Additional Portable VHF for multiple liferafts
  // Note: Basic portable VHF moved to basic/index.js as it applies to ALL vessels
  if (vessel.hasMultipleLiferafts) {
    requirements.push({
      id: 'gmdss.vhf.portable.multiple',
      name: 'Additional Portable VHF (Multiple Rafts)',
      category: 'Communications',
      reference: 'WBC3 17.4.8',
      mandatory: true,
      description: 'Where vessel equipped with more than one liferaft shall carry one portable VHF per liferaft'
    });
  }
  
  // ===== MF/HF RADIO EQUIPMENT =====
  
  // MF Radio with DSC - Sea Area A2 or Cat 0 in A1
  if (vessel.seaAreaA2 || (vessel.seaAreaA1 && category === 0)) {
    requirements.push({
      id: 'gmdss.mf.dsc',
      name: 'MF Radio with DSC',
      category: 'Communications',
      reference: 'WBC3 17.2.1/Table 17.2.1',
      mandatory: !vessel.hasSatellite, // Alternative to satellite
      description: 'MF radio installation with DSC - alternative to satellite'
    });
  }
  
  // MF/HF Radio with DSC and NBDP - Sea Areas A3/A4
  if (vessel.seaAreaA3 || vessel.seaAreaA4) {
    requirements.push({
      id: 'gmdss.mfhf.dsc.nbdp',
      name: 'MF/HF Radio DSC/NBDP',
      category: 'Communications',
      reference: 'WBC3 17.2.1/Table 17.2.1',
      mandatory: true,
      description: 'MF/HF radio installation with DSC with NBDP - A3/A4 areas'
    });
  }
  
  // ===== SATELLITE EQUIPMENT =====
  
  // Mobile Satellite Service - Alternative to MF in A2/A3
  if ((vessel.seaAreaA2 || vessel.seaAreaA3) && !vessel.hasMF) {
    requirements.push({
      id: 'gmdss.satellite.service',
      name: 'Mobile Satellite Service',
      category: 'Communications',
      reference: 'WBC3 17.2.1/Table 17.2.1',
      mandatory: false, // Alternative option
      description: 'Recognised mobile satellite service - alternative to MF/HF'
    });
  }
  
  // ===== DISTRESS ALERTING EQUIPMENT =====
  
  // EPIRB 406MHz - Complex gate logic
  if ((category <= 2) ||
      ((category === 3 || category === 4) && !vessel.seaAreaA1) ||
      category === 5) {
    requirements.push({
      id: 'gmdss.epirb.mandatory',
      name: 'EPIRB 406MHz',
      category: 'Distress Alerting',
      reference: 'WBC3 17.5.1/Table 17.2.1',
      mandatory: true,
      description: 'EPIRB 1 - Float-free required'
    });
  }
  
  // EPIRB Recommended for Cat 3-4 in A1
  if ((category === 3 || category === 4) &&
      vessel.seaAreaA1 && vessel.ineffectiveNonGMDSS) {
    requirements.push({
      id: 'gmdss.epirb.recommended',
      name: 'EPIRB 406MHz (Recommended)',
      category: 'Distress Alerting',
      reference: 'WBC3 Table 17.2.1 Notes',
      mandatory: false,
      description: 'Vessels in Sea Area A1 Cat 3-4 where visual/non-GMDSS alerting ineffective EPIRB recommended'
    });
  }
  
  // Second EPIRB - Cat 0 manned vessels
  if (category === 0 && vessel.isManned) {
    requirements.push({
      id: 'gmdss.epirb.second',
      name: 'Second EPIRB',
      category: 'Distress Alerting',
      reference: 'WBC3 17.5.2',
      mandatory: true,
      description: 'Operating in area category 0 shall carry second EPIRB - stowed accessible'
    });
  }
  
  // PLB 406MHz - Complex requirements
  if (category <= 4) {
    requirements.push({
      id: 'gmdss.plb.mandatory',
      name: 'PLB 406MHz',
      category: 'Personal Distress',
      reference: 'WBC3 17.6.1/17.6.2/Table 17.2.1',
      mandatory: true,
      description: 'PLB equipped with GPS and light shall be worn by at least one crew member whilst on open deck'
    });
  }
  
  // PLB for Cat 5 - depends on sea area
  if (category === 5) {
    if (vessel.seaAreaA1) {
      requirements.push({
        id: 'gmdss.plb.recommended.cat5',
        name: 'PLB 406MHz (Recommended)',
        category: 'Personal Distress',
        reference: 'WBC3 Table 17.2.1',
        mandatory: false,
        description: 'Recommended for all crew on deck'
      });
    } else {
      requirements.push({
        id: 'gmdss.plb.mandatory.cat5',
        name: 'PLB 406MHz',
        category: 'Personal Distress',
        reference: 'WBC3 Table 17.2.1/17.6.2',
        mandatory: true,
        description: 'Cat 5 outside A1 - min 1 required, recommended all crew'
      });
    }
  }
  
  // PLB for Cat 6 - conditional
  if (category === 6 && vessel.ineffectiveNonGMDSS) {
    requirements.push({
      id: 'gmdss.plb.conditional.cat6',
      name: 'PLB 406MHz (Conditional)',
      category: 'Personal Distress',
      reference: 'WBC3 Table 17.2.1 Note C2',
      mandatory: false,
      description: 'Recommended where visual/non-GMDSS alerting ineffective'
    });
  }
  
  // ===== SEARCH AND RESCUE EQUIPMENT =====
  
  // SART - Cat 0-2
  if (category <= 2) {
    requirements.push({
      id: 'gmdss.sart',
      name: 'SART',
      category: 'Search & Rescue',
      reference: 'WBC3 14.12.3',
      mandatory: true,
      description: 'Shall carry a Search and Rescue Transponder - Radar or AIS type'
    });
    
    // Second SART with exemptions
    requirements.push({
      id: 'gmdss.sart.second',
      name: 'Second SART',
      category: 'Search & Rescue',
      reference: 'WBC3 14.12.4',
      mandatory: true,
      description: 'A second SART shall also be carried unless: .1 vessel operates in SAR coverage AND .2 EPIRB has 121.5MHz locator'
    });
  }
  
  // ===== MSI RECEPTION EQUIPMENT =====
  
  // NAVTEX Receiver - Complex gate logic
  if ((category <= 3) &&
      (vessel.seaAreaA2 || vessel.seaAreaA3 || vessel.seaAreaA4)) {
    requirements.push({
      id: 'gmdss.navtex.mandatory',
      name: 'NAVTEX Receiver',
      category: 'MSI Reception',
      reference: 'WBC3 17.2.1/Table 17.2.1',
      mandatory: true,
      description: 'NAVTEX receiver 1 - Required for Cat 0-3 outside A1'
    });
  }
  
  // NAVTEX Conditional A1
  if ((category <= 3) && vessel.seaAreaA1 && vessel.voyageGT12hours) {
    requirements.push({
      id: 'gmdss.navtex.conditional.a1',
      name: 'NAVTEX Receiver (Conditional A1)',
      category: 'MSI Reception',
      reference: 'WBC3 Table 17.2.1 Note B',
      mandatory: true,
      description: 'Required if voyage >12hrs'
    });
  }
  
  // NAVTEX Conditional Cat 5
  if (category === 5 && !vessel.canGetWeatherInfo) {
    requirements.push({
      id: 'gmdss.navtex.conditional.cat5',
      name: 'NAVTEX Receiver (Conditional Cat5)',
      category: 'MSI Reception',
      reference: 'WBC3 Table 17.2.1 Note C1',
      mandatory: false,
      description: 'Where navigation/weather info cannot be obtained'
    });
  }
  
  // ===== POLICE VESSEL SPECIFIC =====
  
  if (vessel.vesselType === 'police' || vessel.type === 'police') {
    // Additional Portable VHF DSC for police
    requirements.push({
      id: 'gmdss.vhf.portable.police',
      name: 'Additional Portable VHF DSC (Police)',
      category: 'Communications',
      reference: 'WBC3 Annex 3 13.4.2',
      mandatory: true,
      description: 'Carry an additional portable VHF DSC - fully charged before departure'
    });
    
    // VHF Waterproof Protection for police
    if (vessel.hasPortableVHF) {
      requirements.push({
        id: 'gmdss.vhf.portable.protection',
        name: 'VHF Waterproof Protection',
        category: 'Communications',
        reference: 'WBC3 Annex 3 Note 4',
        mandatory: true,
        description: 'Protect portable VHF DSC from water damage e.g. waterproof cover'
      });
    }
    
    // Fixed VHF Exemption for inland police
    if (vessel.operatesInlandOnly && !vessel.hasFixedVHF) {
      requirements.push({
        id: 'gmdss.vhf.fixed.police.exempt',
        name: 'Fixed VHF Exemption (Police Inland)',
        category: 'Communications',
        reference: 'WBC3 Annex 3 13.5',
        mandatory: false,
        description: 'Operating in inland waters only not required fitted with VHF DSC fixed'
      });
    }
  }
  
  // ===== ROUV SPECIFIC =====
  
  // ROC GMDSS Operator for ROUV
  if (vessel.isROUV && vessel.hasROC) {
    requirements.push({
      id: 'gmdss.roc.operator',
      name: 'ROC GMDSS Operator',
      category: 'Communications',
      reference: 'WBC3 Annex 2 7.1.3',
      mandatory: true,
      description: 'ROC manned with at least one person qualified for distress and safety radio - per watch requirement'
    });
  }
  
  return requirements;
}