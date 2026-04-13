/**
 * Master Qualifications — WBC3 Table A5.1
 *
 * Determines which master certificates are acceptable for the vessel's
 * area category. Implements certificate cumulation: higher-category certs
 * are always acceptable at lower categories.
 *
 * Key logic:
 *   - 13 certificate types with different category ranges
 *   - Tonnage gates: some certs limited to <200GT, <500GT, or <3GT
 *   - Day Skipper is daylight-only (Cat 4, Cat 6 only)
 *   - Local Authority Licence is Cat 6 only
 *   - Powerboat Level 2 is Cat 6 + <3GT open boats only
 *
 * Reference: WBC3 Appendix 5, Table A5.1 (lines 17124-17215)
 */

import { parseCategory } from '../categoryHelpers.js';

/**
 * Complete certificate definitions from WBC3 Table A5.1.
 * Each cert has a validity range (which categories it covers)
 * and optional restrictions.
 */
const MASTER_CERTIFICATES = [
  {
    id: 'stcw_master_workboat_500',
    name: 'STCW Master (Workboat <500GT unlimited area)',
    validForCategories: [0, 1, 2, 3, 4, 5, 6],
    tonnageLimit: 500,
    restrictions: null,
    notes: 'Note G — STCW route, workboat-specific endorsement',
    reference: 'WBC3 Table A5.1',
  },
  {
    id: 'stcw_master_code_200_unlimited',
    name: 'STCW Master (Code Vessels <200GT unlimited area)',
    validForCategories: [0, 1, 2, 3, 4, 5, 6],
    tonnageLimit: 200,
    restrictions: null,
    notes: 'Note E — unlimited area, limited to <200GT',
    reference: 'WBC3 Table A5.1',
  },
  {
    id: 'yachtmaster_ocean',
    name: 'RYA/MCA Yachtmaster Ocean Certificate of Competence',
    validForCategories: [0, 1, 2, 3, 4, 5, 6],
    tonnageLimit: null,
    restrictions: 'Motor vessels — commercial endorsement required',
    notes: 'Note A — commercial endorsement required for all RYA/MCA certificates',
    reference: 'WBC3 Table A5.1',
  },
  {
    id: 'stcw_master_code_200_150nm',
    name: 'STCW Master (Code Vessels <200GT limited to 150nm)',
    validForCategories: [1, 2, 3, 4, 5, 6],
    tonnageLimit: 200,
    restrictions: 'Limited to 150nm from safe haven',
    notes: 'Note E — not valid for Category 0 (unrestricted)',
    reference: 'WBC3 Table A5.1',
  },
  {
    id: 'yachtmaster_offshore',
    name: 'RYA/MCA Yachtmaster Offshore Certificate of Competence or Service',
    validForCategories: [1, 2, 3, 4, 5, 6],
    tonnageLimit: null,
    restrictions: null,
    notes: 'Note A — CoC or CoS acceptable, commercial endorsement required',
    reference: 'WBC3 Table A5.1',
  },
  {
    id: 'boatmasters_licence',
    name: 'MCA Boatmasters Licence',
    validForCategories: [2, 3, 4, 5, 6],
    tonnageLimit: null,
    restrictions: null,
    notes: 'Note B — issued under MSN 1853',
    reference: 'WBC3 Table A5.1',
  },
  {
    id: 'yachtmaster_coastal',
    name: 'RYA/MCA Yachtmaster Coastal Certificate of Competence or Service',
    validForCategories: [2, 3, 4, 5, 6],
    tonnageLimit: null,
    restrictions: null,
    notes: 'Note A — CoC or CoS acceptable, commercial endorsement required',
    reference: 'WBC3 Table A5.1',
  },
  {
    id: 'powerboat_advanced',
    name: 'RYA/MCA Powerboat Advanced Certificate of Competence',
    validForCategories: [3, 4, 5, 6],
    tonnageLimit: null,
    restrictions: null,
    notes: 'Note F, Note A — post-2005 CoC required, commercial endorsement required',
    reference: 'WBC3 Table A5.1',
  },
  {
    id: 'powerboat_advanced_pre2005',
    name: 'RYA/MCA Powerboat Advanced Practical Certificate (pre-2005)',
    validForCategories: [3, 4, 5, 6],
    tonnageLimit: null,
    restrictions: 'Pre-2005 certificates only',
    notes: 'Note F, Note A — legacy qualification',
    reference: 'WBC3 Table A5.1',
  },
  {
    id: 'competent_authority',
    name: 'Certificate of Competence for appropriate area (Competent Authority)',
    validForCategories: [3, 4, 5, 6],
    tonnageLimit: null,
    restrictions: 'Area-specific — must match operating area',
    notes: 'Note A, Note C — alternative qualification route',
    reference: 'WBC3 Table A5.1',
  },
  {
    id: 'day_skipper',
    name: 'RYA/MCA Day Skipper Theory & Practical',
    validForCategories: [4, 6],  // DAYLIGHT ONLY — NOT valid for Cat 5 (day/night)
    tonnageLimit: null,
    restrictions: 'Daylight operations only',
    notes: 'Note A — NOT valid for Cat 5 (which permits night operations)',
    reference: 'WBC3 Table A5.1',
  },
  {
    id: 'powerboat_level2',
    name: 'RYA/MCA Powerboat Level 2 Certificate',
    validForCategories: [6],
    tonnageLimit: 3,  // Small open boats only
    restrictions: 'Small open boats <3GT only',
    notes: 'Note H — Cat 6 only, restricted to small open boats',
    reference: 'WBC3 Table A5.1',
  },
  {
    id: 'local_authority_licence',
    name: 'Local Authority Licence for appropriate area',
    validForCategories: [6],
    tonnageLimit: null,
    restrictions: 'Local waters only — issued by local harbour/port authority',
    notes: 'Note A, Note D — area-specific, Cat 6 only',
    reference: 'WBC3 Table A5.1',
  },
];

const CATEGORY_DESCRIPTIONS = {
  0: 'Area Category 0 — Unrestricted',
  1: 'Area Category 1 — Up to 150nm from safe haven',
  2: 'Area Category 2 — Up to 60nm from safe haven',
  3: 'Area Category 3 — Up to 20nm from safe haven',
  4: 'Area Category 4 — Up to 20nm, daylight only',
  5: 'Area Category 5 — Up to 3nm, day and night',
  6: 'Area Category 6 — Up to 3nm, daylight only',
};

/**
 * Get acceptable master qualifications for a vessel.
 *
 * @param {Object} vessel - Normalized vessel input
 * @returns {Object} Master qualifications with cumulation applied
 */
export function getMasterQualifications(vessel) {
  const category = parseCategory(vessel.category);
  const tonnage = vessel.grossTonnage || 0;

  // Non-self-propelled platforms don't need a master
  if (vessel.vesselType === 'non_self_propelled') {
    return {
      acceptableCertificates: [],
      minimumRequired: null,
      categoryDescription: 'Non-self-propelled platform — no master qualification required',
      reference: 'WBC3 26.5.1.1',
    };
  }

  // Filter certificates: valid for this category AND within tonnage limit
  const acceptable = MASTER_CERTIFICATES
    .filter(cert => {
      // Must be valid for this category
      if (!cert.validForCategories.includes(category)) return false;

      // Tonnage gate
      if (cert.tonnageLimit !== null && tonnage >= cert.tonnageLimit) return false;

      // Powerboat Level 2 also requires open boat
      if (cert.id === 'powerboat_level2' && !vessel.isOpenBoat) return false;

      return true;
    })
    .map(cert => ({
      id: cert.id,
      name: cert.name,
      reference: cert.reference,
      restrictions: cert.restrictions,
      notes: cert.notes,
      mandatory: true,
    }));

  // Find the minimum required cert (last in the sorted list = lowest/most accessible)
  const minimumRequired = acceptable.length > 0
    ? acceptable[acceptable.length - 1].name
    : null;

  return {
    acceptableCertificates: acceptable,
    minimumRequired,
    categoryDescription: CATEGORY_DESCRIPTIONS[category] || `Area Category ${category}`,
    reference: 'WBC3 Table A5.1',
  };
}
