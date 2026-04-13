/**
 * Second Person Requirements — WBC3 Table A5.1
 *
 * Determines the minimum qualification required for the second person
 * on board, based on area category. Only applies when crewCount >= 2.
 *
 * Cat 0: Yachtmaster Offshore minimum
 * Cat 1: Yachtmaster Coastal minimum
 * Cat 2: Master decides competence (suitably experienced)
 * Cat 3-6: Owner/operator decides competence (experienced)
 *
 * Reference: WBC3 Table A5.1 additional manning requirements
 */

import { parseCategory } from '../categoryHelpers.js';

/**
 * Get second person qualification requirements.
 *
 * @param {Object} vessel - Normalized vessel input
 * @returns {Object} Second person requirements
 */
export function getSecondPersonRequirements(vessel) {
  const category = parseCategory(vessel.category);
  const crewCount = vessel.crewCount || 1;

  // Single-handed — no second person
  if (crewCount < 2) {
    return {
      required: false,
      minimumQualification: null,
      reference: 'WBC3 Table A5.1',
      description: 'Single-handed operation — no second person requirement. See single-handed operation restrictions.',
      mandatory: false,
    };
  }

  // Non-self-propelled
  if (vessel.vesselType === 'non_self_propelled') {
    return {
      required: false,
      minimumQualification: null,
      reference: 'WBC3 26.5.1.1',
      description: 'Non-self-propelled platform — second person requirements not applicable.',
      mandatory: false,
    };
  }

  switch (category) {
    case 0:
      return {
        required: true,
        minimumQualification: 'RYA/MCA Yachtmaster Offshore Certificate of Competence or Service',
        reference: 'WBC3 Table A5.1',
        description: 'Area Category 0 (unrestricted): Second person must hold minimum Yachtmaster Offshore or STCW Master (Code <200GT limited 150nm), Yachtmaster Ocean, or STCW Master (unlimited).',
        mandatory: true,
        acceptableQualifications: [
          'RYA/MCA Yachtmaster Offshore CoC/CoS',
          'RYA/MCA Yachtmaster Ocean CoC',
          'STCW Master (Code <200GT limited 150nm)',
          'STCW Master (Code <200GT unlimited)',
          'STCW Master (Workboat <500GT unlimited)',
        ],
      };

    case 1:
      return {
        required: true,
        minimumQualification: 'RYA/MCA Yachtmaster Coastal Certificate of Competence or Service',
        reference: 'WBC3 Table A5.1',
        description: 'Area Category 1 (150nm): Second person must hold minimum Yachtmaster Coastal or any higher qualification.',
        mandatory: true,
        acceptableQualifications: [
          'RYA/MCA Yachtmaster Coastal CoC/CoS',
          'RYA/MCA Yachtmaster Offshore CoC/CoS',
          'RYA/MCA Yachtmaster Ocean CoC',
          'STCW Master (Code <200GT limited 150nm)',
          'STCW Master (Code <200GT unlimited)',
          'STCW Master (Workboat <500GT unlimited)',
          'MCA Boatmasters Licence',
        ],
      };

    case 2:
      return {
        required: true,
        minimumQualification: 'Deemed competent by the master',
        reference: 'WBC3 Table A5.1',
        description: 'Area Category 2 (60nm): Second person must be deemed competent by the master, suitably experienced with the vessel type, familiar with weather, sea, and light conditions.',
        mandatory: true,
        acceptableQualifications: [
          'Master determines competence based on experience and vessel familiarity',
        ],
      };

    case 3:
    case 4:
    case 5:
    case 6:
    default:
      return {
        required: true,
        minimumQualification: 'Experienced and competent (at discretion of vessel owner/operator)',
        reference: 'WBC3 Table A5.1',
        description: `Area Category ${category} (coastal): Second person must be experienced and competent, at the discretion of the vessel owner/operator.`,
        mandatory: true,
        acceptableQualifications: [
          'Owner/operator determines competence based on experience',
        ],
      };
  }
}
