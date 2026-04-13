/**
 * Single-Handed Operation Rules — WBC3 28.2
 *
 * Determines whether single-handed operation is permitted and what
 * conditions/restrictions apply.
 *
 * NOT permitted when:
 *   - Area categories 0, 1, or 2
 *   - Voyage duration exceeds 8 hours
 *   - Watch system necessary for safe navigation
 *   - Operating in restricted visibility
 *   - Engaged in towing
 *   - Dedicated Pilot Boat
 *   - Transfer of personnel at sea
 *   - Used as diving platform
 *   - Certifying Authority deems unsuitable
 *
 * If permitted, mandatory requirements:
 *   - Lifejacket worn at all times
 *   - 406 MHz PLB with GPS and light
 *   - No overside working
 *   - Voyage plan left ashore
 *   - Regular comms with person ashore
 *   - Certificate endorsed "Suitable for single handed operation"
 *
 * Reference: WBC3 28.2 (lines 13932-14081)
 */

import { parseCategory } from '../categoryHelpers.js';

/**
 * Assess single-handed operation eligibility.
 *
 * @param {Object} vessel - Normalized vessel input
 * @returns {Object} Single-handed assessment
 */
export function getSingleHandedAssessment(vessel) {
  const category = parseCategory(vessel.category);
  const crewCount = vessel.crewCount || 1;
  const ops = vessel.operations || [];

  // If crew count > 1, single-handed doesn't apply
  if (crewCount > 1) {
    return {
      applicable: false,
      permitted: null,
      restrictions: [],
      mandatoryRequirements: [],
      reference: 'WBC3 28.2',
      description: 'Vessel has multiple crew — single-handed operation assessment not applicable.',
    };
  }

  // Check all prohibition conditions
  const prohibitions = [];

  if (category <= 2) {
    prohibitions.push({
      reason: `Operating in Area Category ${category} (0, 1, or 2)`,
      reference: 'WBC3 28.2.1.1',
    });
  }

  if (ops.includes('towing_operations')) {
    prohibitions.push({
      reason: 'Engaged in towing operations',
      reference: 'WBC3 28.2.1.5',
    });
  }

  if (vessel.vesselType === 'pilot') {
    prohibitions.push({
      reason: 'Dedicated Pilot Boat or undertaking Pilot Boat duties',
      reference: 'WBC3 28.2.1.6',
    });
  }

  if (ops.includes('personnel_transfer')) {
    prohibitions.push({
      reason: 'Involved in transfer of personnel at sea',
      reference: 'WBC3 28.2.1.7',
    });
  }

  if (ops.includes('dive_support')) {
    prohibitions.push({
      reason: 'Used as diving platform',
      reference: 'WBC3 28.2.1.8',
    });
  }

  // Administration does not recommend single-handed operations
  const adminWarning = 'The Administration does not recommend single-handed operations (WBC3 28.2)';

  if (prohibitions.length > 0) {
    return {
      applicable: true,
      permitted: false,
      restrictions: prohibitions,
      mandatoryRequirements: [],
      reference: 'WBC3 28.2',
      description: `Single-handed operation is NOT PERMITTED. ${prohibitions.length} prohibition(s) apply.`,
      warning: adminWarning,
    };
  }

  // Permitted with conditions
  return {
    applicable: true,
    permitted: true,
    restrictions: [
      { reason: 'Restricted to Area Categories 3, 4, 5, or 6', reference: 'WBC3 28.2.2' },
      { reason: 'Operations restricted to 8 hours maximum duration', reference: 'WBC3 28.2.2' },
      { reason: 'No operations in restricted visibility', reference: 'WBC3 28.2.2' },
      { reason: 'No overside working while operating single-handed', reference: 'WBC3 28.2.5' },
    ],
    mandatoryRequirements: [
      {
        id: 'single.lifejacket',
        name: 'Lifejacket Worn at All Times',
        reference: 'WBC3 28.2.5',
        mandatory: true,
        description: 'Lifejacket meeting requirements of Section 14.4 must be worn at all times.',
      },
      {
        id: 'single.plb',
        name: '406 MHz Personal Locator Beacon (PLB)',
        reference: 'WBC3 28.2.5',
        mandatory: true,
        description: 'PLB with GPS and light must be worn on open deck at sea.',
      },
      {
        id: 'single.voyage_plan',
        name: 'Voyage Details Left Ashore',
        reference: 'WBC3 28.2.5',
        mandatory: true,
        description: 'Departure time, departure point, voyage plan, and ETA must be left with a person ashore who is notified of safe arrival.',
      },
      {
        id: 'single.comms_schedule',
        name: 'Regular Communications Schedule',
        reference: 'WBC3 28.2.5',
        mandatory: true,
        description: 'Communication with person ashore or vessel in company at regular agreed intervals.',
      },
      {
        id: 'single.certificate_endorsement',
        name: 'Workboat Certificate Endorsement',
        reference: 'WBC3 28.2.5',
        mandatory: true,
        description: 'Workboat Certificate must be endorsed "Suitable for single handed operation".',
      },
    ],
    reference: 'WBC3 28.2',
    description: 'Single-handed operation may be permitted subject to Certifying Authority approval and mandatory conditions.',
    warning: adminWarning,
  };
}
