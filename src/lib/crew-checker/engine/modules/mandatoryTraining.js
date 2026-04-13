/**
 * Mandatory Training Requirements — WBC3 Table A5.3
 *
 * Determines mandatory training courses for crew based on vessel
 * configuration, equipment fitted, and operations.
 *
 * Key thresholds:
 *   - Fire fighting: <15m = 1 crew, >=15m = ALL crew
 *   - First aid: MLC vs Non-MLC, Cat 0-1 vs Cat 2-6
 *   - Radar: only if radar fitted
 *   - Stability: only if SIB required
 *   - ECS: only if electronic chart plotters fitted
 *   - Catering: only if crew prepares food
 *   - DG: only if dangerous goods operations
 *   - Radio: at least one person for distress/safety comms
 *
 * Reference: WBC3 Table A5.3 (lines 17349-17392), Section 28.1.4, 28.1.8
 */

import { parseCategory } from '../categoryHelpers.js';

/**
 * Get mandatory training requirements for crew.
 *
 * @param {Object} vessel - Normalized vessel input
 * @returns {Array} Mandatory training requirement items
 */
export function getMandatoryTraining(vessel) {
  const requirements = [];
  const category = parseCategory(vessel.category);
  const lengthM = vessel.lengthOverall || 0;
  const ops = vessel.operations || [];

  // ===== SEA SURVIVAL TRAINING — ALL crew =====
  requirements.push({
    id: 'training.sea_survival',
    name: 'Sea Survival Training',
    category: 'Mandatory Training',
    reference: 'WBC3 Table A5.3',
    mandatory: true,
    appliesTo: 'ALL crew',
    validity: '5 years',
    description: 'STCW route: MCA approved Personal Survival Techniques course. Non-STCW route: RYA Basic Sea Survival OR MCA approved Personal Survival Techniques.',
    acceptableCourses: [
      'RYA Basic Sea Survival',
      'MCA approved Personal Survival Techniques (STCW)',
    ],
  });

  // ===== FIRE FIGHTING TRAINING =====
  // Key threshold: vessels <15m = minimum ONE crew member; vessels >=15m = ALL crew
  const fireAppliesTo = lengthM >= 15 ? 'ALL crew' : 'AT LEAST ONE crew member';
  requirements.push({
    id: 'training.fire_fighting',
    name: 'Fire Fighting Training',
    category: 'Mandatory Training',
    reference: 'WBC3 Table A5.3',
    mandatory: true,
    appliesTo: fireAppliesTo,
    validity: '5 years',
    description: `Vessels ${lengthM >= 15 ? '>=15m' : '<15m'}: ${fireAppliesTo} must hold fire fighting certificate.`,
    acceptableCourses: [
      'MCA one-day fire fighting course',
      'STCW Fire Fighting and Prevention',
      'Equivalent Royal Navy course',
    ],
  });

  // ===== FIRST AID TRAINING =====
  // Three paths:
  //   - MLC compliant vessels: STCW medical certificate
  //   - Non-MLC Cat 0-1: Master holds Proficiency in Medical Care
  //   - Non-MLC Cat 2-6: At least one person with Elementary First Aid
  if (vessel.internationalVoyages && category <= 1) {
    // MLC path — international vessels Cat 0-1
    requirements.push({
      id: 'training.first_aid_mlc',
      name: 'Medical First Aid (MLC)',
      category: 'Mandatory Training',
      reference: 'WBC3 Table A5.3',
      mandatory: true,
      appliesTo: 'AT LEAST ONE crew member',
      validity: '5 years',
      description: 'MLC compliant vessels: at least one person competent in medical care or first aid holding STCW certificate.',
      acceptableCourses: [
        'STCW Medical First Aid',
        'Proficiency in Medical Care Certificate',
      ],
    });
  } else if (category <= 1) {
    // Non-MLC Cat 0-1
    requirements.push({
      id: 'training.first_aid_cat01',
      name: 'Proficiency in Medical Care',
      category: 'Mandatory Training',
      reference: 'WBC3 Table A5.3',
      mandatory: true,
      appliesTo: 'MASTER',
      validity: '5 years',
      description: 'Master must hold Proficiency in Medical Care Certificate (or Ship Captain\'s Medical Certificate) unless another crew member holds equivalent or higher medical qualification.',
      acceptableCourses: [
        'Proficiency in Medical Care Certificate',
        'Ship Captain\'s Medical Certificate',
      ],
    });
  } else {
    // Cat 2-6
    requirements.push({
      id: 'training.first_aid_cat26',
      name: 'Elementary First Aid',
      category: 'Mandatory Training',
      reference: 'WBC3 Table A5.3',
      mandatory: true,
      appliesTo: 'AT LEAST ONE crew member',
      validity: '5 years',
      description: 'At least one person must hold first aid certificate covering Category C medical stores.',
      acceptableCourses: [
        'MCA Elementary First Aid',
        'First Aid at Sea',
        'Medical First Aid',
        'RYA First Aid',
        'SeaFish Basic First Aid Certificate',
      ],
    });
  }

  // ===== RADAR TRAINING — if radar fitted =====
  if (vessel.hasRadar) {
    requirements.push({
      id: 'training.radar',
      name: 'Radar Training',
      category: 'Mandatory Training',
      reference: 'WBC3 Table A5.3',
      mandatory: true,
      appliesTo: 'ALL masters and crew likely to use radar',
      validity: 'Lifetime (no expiry)',
      description: 'MCA approved Small Ships Navigation and Radar: Radar and Meteorology course, or equivalent recognised in MIN 698.',
      acceptableCourses: [
        'MCA Small Ships Navigation and Radar: Radar and Meteorology',
        'Any course recognised in MIN 698',
      ],
    });
  }

  // ===== STABILITY TRAINING — if SIB required =====
  if (vessel.hasStabilityBooklet) {
    requirements.push({
      id: 'training.stability',
      name: 'Stability Training',
      category: 'Mandatory Training',
      reference: 'WBC3 Table A5.3',
      mandatory: true,
      appliesTo: 'MASTER (minimum)',
      validity: 'Lifetime (no expiry)',
      description: 'Master must complete MCA approved 1-day stability course. Required when vessel has Stability Information Booklet.',
      acceptableCourses: [
        'MCA approved 1-day stability course',
      ],
    });
  }

  // ===== ELECTRONIC CHART SYSTEMS TRAINING — if ECS fitted =====
  if (vessel.hasElectronicCharts) {
    requirements.push({
      id: 'training.ecs',
      name: 'Electronic Chart Systems Training',
      category: 'Mandatory Training',
      reference: 'WBC3 Table A5.3',
      mandatory: true,
      appliesTo: 'ALL masters and crew responsible for navigational watch',
      validity: 'Lifetime (no expiry)',
      description: 'MCA approved Small Ships Navigation and Radar: Electronic Chart Systems and Bridge Watchkeeping course, or equivalent in MIN 698. Plus equipment-specific familiarisation.',
      acceptableCourses: [
        'MCA Small Ships Navigation and Radar: ECS and Bridge Watchkeeping',
        'Any course recognised in MIN 698',
      ],
    });
  }

  // ===== CATERING TRAINING — if crew prepares food =====
  if (vessel.crewPreparesFood) {
    requirements.push({
      id: 'training.catering',
      name: 'Catering Training',
      category: 'Mandatory Training',
      reference: 'WBC3 Table A5.3',
      mandatory: true,
      appliesTo: 'ALL crew engaged in food preparation',
      validity: 'No expiry specified',
      description: 'All crew engaged in food preparation must hold food hygiene certificate.',
      acceptableCourses: [
        'Basic Food Hygiene Certificate',
        'Food Safety Level 2',
      ],
    });
  }

  // ===== DANGEROUS GOODS TRAINING — if DG operations =====
  if (ops.includes('dangerous_goods')) {
    requirements.push({
      id: 'training.dangerous_goods',
      name: 'Dangerous Goods Training',
      category: 'Mandatory Training',
      reference: 'WBC3 App 6 4.1.2',
      mandatory: true,
      appliesTo: 'ALL crew handling dangerous goods',
      validity: '2 years (refresher)',
      description: 'IMDG Code Chapter 1.3 training for all dangerous goods handlers.',
      acceptableCourses: [
        'IMDG Code familiarisation and safety training',
      ],
    });
  }

  // ===== RADIO OPERATOR CERTIFICATE — WBC3 28.1.8 =====
  requirements.push({
    id: 'training.radio_operator',
    name: 'Radio Operator Certificate',
    category: 'Radio Certificates',
    reference: 'WBC3 28.1.8',
    mandatory: true,
    appliesTo: 'AT LEAST ONE crew member',
    validity: 'Lifetime',
    description: 'At least one person qualified for distress and safety radio communication. SRC for VHF; ROC/GOC for GMDSS.',
    acceptableCourses: [
      'Short Range Certificate (SRC) — VHF',
      'Restricted Operators Certificate (ROC) — GMDSS',
      'General Operators Certificate (GOC) — GMDSS',
    ],
  });

  // ===== FAMILIARISATION TRAINING — ALL crew =====
  requirements.push({
    id: 'training.familiarisation',
    name: 'Familiarisation Training',
    category: 'Mandatory Training',
    reference: 'WBC3 14.11.3',
    mandatory: true,
    appliesTo: 'ALL crew on joining vessel',
    validity: 'On joining',
    description: 'LSA and emergency procedures familiarisation training for all crew on joining the vessel.',
    acceptableCourses: [
      'Vessel-specific induction and familiarisation',
    ],
  });

  return requirements;
}
