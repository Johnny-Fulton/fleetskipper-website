/**
 * Crew Training and Certification Requirements
 * Generated from UK-MARITIME-LIBRARY/03-CSV-DATABASES/SEAGOING/domains/CREW_v1/DOCS.csv
 * THIS FILE USES ONLY THE CSV DATA - NO MADE UP REQUIREMENTS
 * Following anchor mode pattern - max 300 lines
 */

import { parseCategory } from '../../categoryHelpers.js';

export function getCrewCertificationRequirements(vessel) {
  const requirements = [];

  // Only apply to seagoing vessels
  if (!vessel.operatingStatus || vessel.operatingStatus !== 'seagoing') {
    return requirements;
  }

  // Parse category to handle 'cat3', 3, '3', 'CAT3', 'IWW' formats
  const category = parseCategory(vessel.category ?? vessel.areaCategory);
  const hasMultipleCrew = vessel.hasMinimumCrew >= 2 || vessel.crewCount >= 2;
  
  // ===== MANDATORY TRAINING (WBC3 Table A5.3) =====
  
  // Sea Survival Training - ALL crew members required
  requirements.push({
    id: 'crew.doc.training.sea.survival',
    name: 'Sea Survival Training',
    category: 'Training Certificates',
    reference: 'WBC3 Table A5.3',
    mandatory: true,
    description: 'Basic sea survival course - everyone on board (valid 5 years)'
  });
  
  // Fire Fighting Training - at least one crew member (varies by vessel)
  requirements.push({
    id: 'crew.doc.training.fire.fighting',
    name: 'Fire Fighting Training',
    category: 'Training Certificates',
    reference: 'WBC3 Table A5.3',
    mandatory: true,
    description: 'Basic fire fighting course - minimum one person (valid 5 years)'
  });
  
  // First Aid Training - at least one crew member
  // Category determines level: Cat 0-2 = Medical Care, Cat 3-6 = Elementary
  const firstAidLevel = category <= 2 ? 'Medical Care' : 'Elementary';
  requirements.push({
    id: 'crew.doc.training.first.aid',
    name: 'First Aid Training',
    category: 'Training Certificates',
    reference: 'WBC3 Table A5.3',
    mandatory: true,
    description: `${firstAidLevel} first aid - at least one crew member (valid 5 years)`
  });
  
  // ===== CATERING TRAINING =====
  
  if (vessel.hasFoodPreparation || vessel.hasGalley || vessel.operations?.includes('catering')) {
    requirements.push({
      id: 'crew.doc.training.catering',
      name: 'Catering Training',
      category: 'Training Certificates',
      reference: 'WBC3 Table A5.3',
      mandatory: true,
      description: 'Basic food hygiene or food safety level 2 - all food preparation crew'
    });
  }
  
  // ===== RADIO OPERATOR CERTIFICATES =====
  
  if (vessel.hasVHF || vessel.hasGMDSS || category <= 3) {
    requirements.push({
      id: 'crew.doc.radio.operator',
      name: 'Radio Operator Certificate',
      category: 'Radio Certificates',
      reference: 'WBC3 28.1.8',
      mandatory: true,
      description: 'At least one qualified person - SRC for VHF or ROC/GOC for GMDSS'
    });
  }
  
  // ===== DANGEROUS GOODS TRAINING =====
  
  if (vessel.hasDangerousGoods || vessel.operations?.includes('dangerous_goods')) {
    requirements.push({
      id: 'crew.doc.training.dangerous.goods',
      name: 'Dangerous Goods Training',
      category: 'Dangerous Goods',
      reference: 'WBC3 App 6 4.1.2',
      mandatory: true,
      description: 'IMDG Code Chapter 1.3 training - all DG handlers (refresher every 2 years)'
    });
  }
  
  // ===== ENGINEERING QUALIFICATIONS =====
  
  if (vessel.hasInboardEngine && category <= 2) {
    requirements.push({
      id: 'crew.doc.eng.approved.course',
      name: 'Approved Engine Course',
      category: 'Engineering',
      reference: 'WBC3 Table A5.2',
      mandatory: false,
      description: 'Engineering qualification - at least one crew member recommended'
    });
  }
  
  // ===== FAMILIARIZATION TRAINING =====
  
  requirements.push({
    id: 'crew.doc.training.familiarization',
    name: 'Familiarization Training',
    category: 'Familiarization',
    reference: 'WBC3 14.11.3',
    mandatory: true,
    description: 'LSA and emergency procedures training - all crew on joining vessel'
  });
  
  // ===== HOURS OF REST RECORDS =====
  
  if (hasMultipleCrew) {
    requirements.push({
      id: 'crew.doc.hours.rest',
      name: 'Hours of Rest Records',
      category: 'Hours of Rest',
      reference: 'MLC 2006',
      mandatory: true,
      description: 'Work and rest hour records - monthly records required for multi-crew vessels'
    });
  }
  
  // ===== MLC COMPLIANCE FOR INTERNATIONAL VOYAGES =====
  // MLC compliance required for international voyages >60nm from UK safe haven
  // Only applies to Area Categories 0, 1, or 2 (vessels operating further from shore)
  
  if (vessel.internationalVoyages && category <= 2) {
    requirements.push({
      id: 'crew.doc.mlc.compliance',
      name: 'MLC Inspection Report',
      category: 'Maritime Labour Compliance',
      reference: 'MLC 2006',
      mandatory: true,
      description: 'Valid Maritime Labour Convention inspection report - required for international voyages >60nm from UK safe haven (Area Categories 0-2 only)',
      validity: '5 years'
    });
  }
  
  return requirements;
}