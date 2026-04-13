/**
 * Engineering Qualifications — WBC3 Table A5.2
 *
 * Determines engineering manning requirements based on:
 *   - Engine power: <1500kW, 1500-3000kW, >=3000kW
 *   - Vessel class: Power Vessel W vs Power Vessel SL
 *   - Area category: determines which tier applies
 *
 * Power Vessel W: Employed in towing, lifting, or carriage of cargo >1000kg
 * Power Vessel SL: All other power vessels
 *
 * Reference: WBC3 Appendix 5, Table A5.2 (lines 17263-17293)
 */

import { parseCategory } from '../categoryHelpers.js';

/**
 * Determine if vessel is Power Vessel W.
 * W = towing operations, lifting operations, or carriage of cargo >1000kg
 */
function isPowerVesselW(vessel) {
  const ops = vessel.operations || [];
  return ops.includes('towing_operations') ||
         ops.includes('lifting_operations');
  // Note: cargo >1000kg not explicitly asked in our schema but covered by lifting_operations
}

/**
 * Get engineering qualification requirements.
 *
 * @param {Object} vessel - Normalized vessel input
 * @returns {Object} Engineering qualifications by power tier
 */
export function getEngineeringQualifications(vessel) {
  const category = parseCategory(vessel.category);
  const powerKW = vessel.enginePowerKW || 0;
  const isInboard = vessel.propulsionConfiguration &&
    (vessel.propulsionConfiguration.includes('inboard') || vessel.propulsionConfiguration.includes('hybrid'));
  const isW = isPowerVesselW(vessel);
  const vesselClass = isW ? 'Power Vessel W' : 'Power Vessel SL';

  // General requirement applies to ALL categories (Note 5: "In all cases")
  const generalRequirement = {
    name: 'Machinery Familiarisation',
    description: 'At least one crew member shall be sufficiently familiar with the operation and maintenance of the vessel\'s machinery to ensure safe passage',
    reference: 'WBC3 Table A5.2 Note 5',
    mandatory: true,
    appliesTo: 'AT LEAST ONE CREW MEMBER',
  };

  // Non-self-propelled vessels have no engineering requirements
  if (vessel.vesselType === 'non_self_propelled') {
    return {
      powerTier: 'N/A',
      vesselClass: 'N/A',
      acceptableCertificates: [],
      generalRequirement: null,
      reference: 'WBC3 Table A5.2',
    };
  }

  // WBC3 Table A5.2: formal engineering certs ONLY apply to Categories 0, 1, 2
  // Categories 3-6 have no formal cert requirement but Note 5 machinery familiarisation still applies
  if (category >= 3 && category <= 6) {
    return {
      powerTier: 'N/A',
      vesselClass,
      acceptableCertificates: [],
      generalRequirement,
      reasoning: 'No formal engineering qualification required for Categories 3-6 per WBC3 Table A5.2. Machinery familiarisation (Note 5) still applies — this is a familiarisation item, not a certificate requirement.',
      reference: 'WBC3 Table A5.2',
    };
  }

  const acceptableCertificates = [];

  // Determine power tier and applicable certifications
  if (powerKW < 1500) {
    // ===== <1500kW =====
    // Note: Only Categories 0, 1, 2 reach this point due to early return above
    if (category === 2) {
      if (isW) {
        // Cat 2 Power Vessel W: MEOL or equivalent
        acceptableCertificates.push({
          id: 'eng_meol',
          name: 'Marine Engine Operator Licence (MEOL)',
          reference: 'WBC3 Table A5.2',
          mandatory: true,
          appliesTo: 'AT LEAST ONE CREW MEMBER',
          notes: 'Note 7 — or equivalent (STCW III/4, AEC Part 1 & 2). For Power Vessel W.',
          restrictions: null,
        });
      } else {
        // Cat 2 Power Vessel SL: AEC Part 1
        acceptableCertificates.push({
          id: 'eng_aec_part1',
          name: 'Approved Engine Course (Part 1)',
          reference: 'WBC3 Table A5.2',
          mandatory: true,
          appliesTo: 'AT LEAST ONE CREW MEMBER',
          notes: 'Notes 2, 3, 4 — equivalent experience may be accepted. For Power Vessel SL.',
          restrictions: null,
        });
      }
    }

    if (category === 1) {
      if (isW) {
        // Cat 1 Power Vessel W: MEOL or equivalent
        acceptableCertificates.push({
          id: 'eng_meol',
          name: 'Marine Engine Operator Licence (MEOL)',
          reference: 'WBC3 Table A5.2',
          mandatory: true,
          appliesTo: 'AT LEAST ONE CREW MEMBER',
          notes: 'Note 7 — or equivalent (STCW III/4, AEC Part 1 & 2).',
          restrictions: null,
        });
      } else {
        // Cat 1 Power Vessel SL: AEC Part 1
        acceptableCertificates.push({
          id: 'eng_aec_part1',
          name: 'Approved Engine Course (Part 1)',
          reference: 'WBC3 Table A5.2',
          mandatory: true,
          appliesTo: 'AT LEAST ONE CREW MEMBER',
          notes: 'Notes 2, 3, 4 — equivalent experience may be accepted. For Power Vessel SL.',
          restrictions: null,
        });
      }
    }

    if (category === 0) {
      // Cat 0: No specific entry in Table A5.2 for <1500kW at Cat 0
      // However, general requirement applies
    }

    return {
      powerTier: '<1500kW',
      vesselClass,
      acceptableCertificates,
      generalRequirement,
      reference: 'WBC3 Table A5.2',
    };
  }

  if (powerKW >= 1500 && powerKW < 3000) {
    // ===== 1500-3000kW =====
    // Note: Only Categories 0, 1, 2 reach this point due to early return above
    if (category === 2) {
      if (isW) {
        acceptableCertificates.push({
          id: 'eng_smeol',
          name: 'Senior Marine Engine Operators Licence (SMEOL)',
          reference: 'WBC3 Table A5.2',
          mandatory: true,
          appliesTo: 'AT LEAST ONE CREW MEMBER',
          notes: 'Note 9, 7 — or STCW C/Eng (Y4). For Power Vessel W.',
          restrictions: null,
        });
        acceptableCertificates.push({
          id: 'eng_sv_second_engineer',
          name: 'Small Vessel Second Engineer CoC',
          reference: 'WBC3 Table A5.2',
          mandatory: true,
          appliesTo: 'AT LEAST ONE CREW MEMBER',
          notes: 'Note 9, 7 — alternative to SMEOL. For Power Vessel W.',
          restrictions: null,
        });
      }
    }

    if (category <= 1) {
      // Cat 0-1: Same as Cat 2 Power Vessel W (both W and SL at this power range)
      acceptableCertificates.push({
        id: 'eng_smeol',
        name: 'Senior Marine Engine Operators Licence (SMEOL)',
        reference: 'WBC3 Table A5.2',
        mandatory: true,
        appliesTo: 'AT LEAST ONE CREW MEMBER',
        notes: 'Note 9, 7 — or STCW C/Eng (Y4).',
        restrictions: null,
      });
      acceptableCertificates.push({
        id: 'eng_sv_second_engineer',
        name: 'Small Vessel Second Engineer CoC',
        reference: 'WBC3 Table A5.2',
        mandatory: true,
        appliesTo: 'AT LEAST ONE CREW MEMBER',
        notes: 'Note 9, 7 — alternative to SMEOL.',
        restrictions: null,
      });
    }

    return {
      powerTier: '1500-3000kW',
      vesselClass,
      acceptableCertificates,
      generalRequirement,
      reference: 'WBC3 Table A5.2',
    };
  }

  // ===== >=3000kW =====
  // Note: Only Categories 0, 1, 2 reach this point due to early return above
  if (category <= 2) {
    acceptableCertificates.push({
      id: 'eng_stcw_iii2_chief',
      name: 'STCW III/2 Small Vessel Chief Engineer',
      reference: 'WBC3 Table A5.2',
      mandatory: true,
      appliesTo: 'AT LEAST ONE CREW MEMBER',
      notes: 'For vessels >=3000kW & <9000kW (<3000GT).',
      restrictions: 'Vessels <3000GT',
    });
  }

  return {
    powerTier: '>=3000kW',
    vesselClass,
    acceptableCertificates,
    generalRequirement,
    reference: 'WBC3 Table A5.2',
  };
}
