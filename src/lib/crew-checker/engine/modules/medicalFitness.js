/**
 * Medical Fitness Certificates — WBC3 28.1.5, MGN 640
 *
 * Determines which medical fitness certificate type is required for all crew:
 *   - ENG1: Cat 0-1 vessels, or any vessel on international voyages
 *   - ML5: Cat 2-6 domestic vessels
 *
 * Also determines medical training certificates for the master.
 *
 * Reference: WBC3 28.1.5, MGN 640, Table A5.3
 */

import { parseCategory } from '../categoryHelpers.js';

/**
 * Get medical fitness certificate requirements.
 *
 * @param {Object} vessel - Normalized vessel input
 * @returns {Object} Medical fitness requirements
 */
export function getMedicalFitness(vessel) {
  const category = parseCategory(vessel.category);

  // Non-self-propelled unmanned platforms
  if (vessel.vesselType === 'non_self_propelled' && (vessel.maxPersons || 0) === 0) {
    return {
      certificateType: null,
      appliesTo: null,
      reference: 'WBC3 26.5.1.1',
      validity: null,
      description: 'Unmanned platform — no medical fitness certificate required',
      mandatory: false,
      notes: null,
    };
  }

  // ENG1 for Cat 0-1 or international voyages
  if (category <= 1 || vessel.internationalVoyages) {
    return {
      certificateType: 'ENG1',
      appliesTo: 'ALL crew',
      reference: 'WBC3 28.1.5/MGN 640',
      validity: '2 years (1 year if over 65)',
      description: 'STCW compliant medical certificate for vessels >60 miles from shore or international voyages. Must be issued by MCA Approved Doctor.',
      mandatory: true,
      notes: 'Issued by MCA Approved Doctor only. NOT acceptable for domestic Cat 2-6 unless vessel also makes international voyages.',
    };
  }

  // ML5 for Cat 2-6 domestic
  return {
    certificateType: 'ML5',
    appliesTo: 'ALL crew',
    reference: 'WBC3 28.1.5/MGN 640',
    validity: '5 years (1 year if over 65)',
    description: 'Medical certificate for vessels ≤60 miles from shore (domestic voyages only). Can be issued by any UK GMC registered doctor.',
    mandatory: true,
    notes: 'NOT valid for vessels visiting foreign ports. If vessel makes international voyages, ENG1 is required instead.',
  };
}
