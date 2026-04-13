/**
 * Crew Certification Engine — Main Orchestrator
 *
 * Calls all 8 sub-modules and assembles the complete crew
 * certification requirements output.
 *
 * Modules:
 *   1. masterQualifications — Table A5.1 (with cumulation)
 *   2. engineeringQualifications — Table A5.2 (power tiers)
 *   3. mandatoryTraining — Table A5.3
 *   4. medicalFitness — ENG1/ML5
 *   5. secondPerson — Second person requirements
 *   6. specialOperations — Towing, DG, MGO, etc.
 *   7. singleHanded — WBC3 28.2 restrictions
 *   8. policeBoatManning — Annex 3 S.18 alternatives
 */

import { getMasterQualifications } from './modules/masterQualifications.js';
import { getEngineeringQualifications } from './modules/engineeringQualifications.js';
import { getMandatoryTraining } from './modules/mandatoryTraining.js';
import { getMedicalFitness } from './modules/medicalFitness.js';
import { getSecondPersonRequirements } from './modules/secondPerson.js';
import { getSpecialOperationsRequirements } from './modules/specialOperations.js';
import { getSingleHandedAssessment } from './modules/singleHanded.js';
import { getPoliceBoatManning } from './modules/policeBoatManning.js';

/**
 * Run the complete crew certification check.
 *
 * @param {Object} vessel - Normalized and validated vessel input
 * @returns {Object} Complete crew certification requirements
 */
export function getCrewCertificationRequirements(vessel) {
  // Non-self-propelled platforms — minimal requirements
  if (vessel.vesselType === 'non_self_propelled') {
    return {
      masterQualifications: getMasterQualifications(vessel),
      secondPerson: getSecondPersonRequirements(vessel),
      engineeringQualifications: getEngineeringQualifications(vessel),
      mandatoryTraining: [],
      medicalFitness: getMedicalFitness(vessel),
      specialOperations: [],
      singleHanded: {
        applicable: false,
        permitted: null,
        restrictions: [],
        mandatoryRequirements: [],
        reference: 'WBC3 26.5.1.1',
        description: 'Non-self-propelled platform — single-handed assessment not applicable.',
      },
      policeBoatManning: null,
      manningDocuments: [
        {
          id: 'doc.platform_restrictions',
          name: 'Platform Operational Restrictions',
          category: 'Manning Documents',
          reference: 'WBC3 26.5.1.1',
          mandatory: true,
          description: 'Non-self-propelled platforms have specific operational restrictions. No crew-specific requirements beyond platform supervision.',
        },
      ],
    };
  }

  // Run all modules
  const masterQualifications = getMasterQualifications(vessel);
  const secondPerson = getSecondPersonRequirements(vessel);
  const engineeringQualifications = getEngineeringQualifications(vessel);
  const mandatoryTraining = getMandatoryTraining(vessel);
  const medicalFitness = getMedicalFitness(vessel);
  const specialOperations = getSpecialOperationsRequirements(vessel);
  const singleHanded = getSingleHandedAssessment(vessel);
  const policeBoatManning = getPoliceBoatManning(vessel);

  // Manning documents — always required for seagoing vessels
  const manningDocuments = [
    {
      id: 'doc.safe_manning',
      name: 'Safe Manning Document',
      category: 'Manning Documents',
      reference: 'WBC3 28.1.1',
      mandatory: true,
      description: 'Minimum safe manning certificate per Tables A5.1 and A5.2 requirements.',
    },
    {
      id: 'doc.crew_list',
      name: 'Crew List',
      category: 'Manning Documents',
      reference: 'Port Regulations',
      mandatory: true,
      description: 'List of all crew on board — names, positions, certificates.',
    },
  ];

  return {
    masterQualifications,
    secondPerson,
    engineeringQualifications,
    mandatoryTraining,
    medicalFitness,
    specialOperations,
    singleHanded,
    policeBoatManning,
    manningDocuments,
  };
}
