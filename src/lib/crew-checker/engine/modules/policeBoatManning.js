/**
 * Police Boat Alternative Manning — WBC3 Annex 3, Section 18
 *
 * Police boats have alternative manning paths for:
 *   - Radar training (18.3): <18m paper charts can use alternative routes
 *   - Engineering training (18.4): RYA Diesel Engine Course + familiarisation
 *   - Fire fighting training (18.5): Open boats with outboard can use alternative
 *   - Medical fitness (18.6): Police internal fitness test acceptable
 *   - Stability training (18.2): Not required for boats without SIB
 *   - High speed operations (18.8): Suitable qualifications and experience
 *
 * Reference: WBC3 Annex 3, Section 18 (lines 23240-23391)
 */

import { parseCategory } from '../categoryHelpers.js';

/**
 * Get police boat alternative manning options.
 * Returns null if vessel is not a police boat.
 *
 * @param {Object} vessel - Normalized vessel input
 * @returns {Object|null} Police alternative manning, or null
 */
export function getPoliceBoatManning(vessel) {
  if (vessel.vesselType !== 'police') return null;

  const category = parseCategory(vessel.category);
  const lengthM = vessel.lengthOverall || 0;
  const isOutboard = vessel.propulsionConfiguration &&
    (vessel.propulsionConfiguration.includes('outboard'));
  const isInboard = vessel.propulsionConfiguration &&
    (vessel.propulsionConfiguration.includes('inboard') || vessel.propulsionConfiguration.includes('hybrid'));
  const ops = vessel.operations || [];

  const alternatives = [];

  // ===== 18.3 RADAR TRAINING ALTERNATIVES =====
  if (vessel.hasRadar && lengthM < 18) {
    alternatives.push({
      id: 'police.radar_alternative',
      name: 'Alternative Radar Training (Police Boats <18m)',
      category: 'Police Alternative Manning',
      reference: 'WBC3 Annex 3, 18.3.1',
      mandatory: false,
      description: 'Police boats <18m using paper charts as primary navigation may meet radar training via alternative route instead of Table A5.3.',
      alternativeRoutes: [
        'Table A5.3 radar training requirements (standard route)',
        'RYA Day Skipper Theory & Practical + RYA radar qualification + Police-specific radar/ECS familiarisation',
        'RYA Day Skipper Theory + (Powerboat Advanced OR Powerboat Intermediate) + RYA radar qualification + Police-specific radar/ECS familiarisation',
      ],
    });
  }

  // ===== 18.4 ENGINEERING TRAINING ALTERNATIVES =====
  if (category === 2 && isInboard) {
    alternatives.push({
      id: 'police.engineering_cat2',
      name: 'Alternative Engineering Training (Police Cat 2)',
      category: 'Police Alternative Manning',
      reference: 'WBC3 Annex 3, 18.4.1',
      mandatory: true,
      description: 'At least one crew member must complete RYA Diesel Engine Course + Police-specific familiarisation.',
    });
  }

  if ((category === 3 || category === 5) && isInboard) {
    alternatives.push({
      id: 'police.engineering_cat35',
      name: 'Engineering Training Recommendation (Police Cat 3/5)',
      category: 'Police Alternative Manning',
      reference: 'WBC3 Annex 3, 18.4.1',
      mandatory: false,
      description: 'Strongly recommended: at least one crew member completes RYA one-day diesel engine course for inboard diesel vessels.',
    });
  }

  // ===== 18.5 FIRE FIGHTING ALTERNATIVES =====
  if (vessel.isOpenBoat && isOutboard) {
    alternatives.push({
      id: 'police.fire_fighting_open',
      name: 'Alternative Fire Fighting Training (Police Open Boats)',
      category: 'Police Alternative Manning',
      reference: 'WBC3 Annex 3, 18.5.1',
      mandatory: false,
      description: 'Open boats with outboard engine and no fixed firefighting system: may meet fire fighting requirements via vessel-specific safety procedures and drills instead of Table A5.3.',
      alternativeRoutes: [
        'Table A5.3 fire fighting requirements (standard route)',
        'Vessel-specific safety procedures and drills (Police alternative)',
      ],
    });
  }

  if (isInboard) {
    alternatives.push({
      id: 'police.fire_fighting_machinery',
      name: 'Alternative Fire Fighting Training (Police Machinery Space)',
      category: 'Police Alternative Manning',
      reference: 'WBC3 Annex 3, 18.5.2',
      mandatory: false,
      description: 'Police boats with machinery space(s): may meet fire fighting requirements via Table A5.3 standard route OR Police-specific fire fighting training.',
      alternativeRoutes: [
        'Table A5.3 fire fighting requirements (standard route)',
        'Police-specific fire fighting training',
      ],
    });
  }

  // ===== 18.6 MEDICAL FITNESS ALTERNATIVES =====
  alternatives.push({
    id: 'police.medical_fitness',
    name: 'Alternative Medical Fitness (Police Boats)',
    category: 'Police Alternative Manning',
    reference: 'WBC3 Annex 3, 18.6.1',
    mandatory: false,
    description: 'Police boats are not required to be commercially endorsed. Police internal medical fitness test may be used instead of ENG1/ML5. Suitable first aid: RYA first aid, STCW certificate, or equivalent Police-specific qualification.',
  });

  // ===== 18.2 STABILITY TRAINING =====
  if (!vessel.hasStabilityBooklet) {
    alternatives.push({
      id: 'police.stability_exemption',
      name: 'Stability Training Exemption (Police Boats)',
      category: 'Police Alternative Manning',
      reference: 'WBC3 Annex 3, 18.2.5',
      mandatory: false,
      description: 'Stability training in Table A5.3 is NOT required for Police Boats that do not require a Stability Information Booklet.',
    });
  }

  // ===== 18.8 HIGH SPEED OPERATIONS =====
  if (ops.includes('high_speed_ops') || ops.includes('patrol_operations')) {
    alternatives.push({
      id: 'police.high_speed',
      name: 'High Speed Operations (Police Boats)',
      category: 'Police Alternative Manning',
      reference: 'WBC3 Annex 3, 18.8.1',
      mandatory: true,
      description: 'Master must have suitable qualifications and experience of high-speed operations.',
    });
  }

  // ===== 18.6.3 OPERATIONAL ENDORSEMENT =====
  alternatives.push({
    id: 'police.operational_endorsement',
    name: 'Police Operational Endorsement',
    category: 'Police Alternative Manning',
    reference: 'WBC3 Annex 3, 18.6.3',
    mandatory: false,
    description: 'Police may voluntarily obtain commercial endorsement. If not commercially endorsed, qualifications valid for official police business only. 5-year refreshers and sea-time for revalidation managed internally by the Police Service.',
  });

  return {
    isPoliceVessel: true,
    alternatives,
    reference: 'WBC3 Annex 3, Section 18',
    description: 'Police boats have alternative manning paths under Annex 3 Section 18. These are IN ADDITION to standard requirements — operators may choose standard or alternative route.',
  };
}
