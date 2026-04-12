/**
 * Medical Crew Certification Requirements
 * These are CREW certificates, not vessel documentation
 * Based on WBC3 28.1.5 - ALL crew need the same medical certificate type
 */

import { parseCategory } from '../../categoryHelpers.js';

export function getMedicalCrewCertificationRequirements(vessel) {
  const requirements = [];

  // Only apply to seagoing vessels
  if (!vessel.operatingStatus || vessel.operatingStatus !== 'seagoing') {
    return requirements;
  }

  const category = parseCategory(vessel.category);
  
  // ===== MEDICAL FITNESS CERTIFICATES FOR ALL CREW =====
  // WBC3 28.1.5: "Anyone employed or engaged in any capacity onboard a vessel shall hold a valid medical fitness certificate"
  
  // ENG1 Medical Certificate - for ALL CREW on Cat 0-1 or international vessels
  if (category === 0 || category === 1 || vessel.internationalVoyages) {
    requirements.push({
      id: 'crew.medical.eng1',
      name: 'ENG1 Medical Certificate',
      category: 'Medical Fitness',
      reference: 'WBC3 28.1.5/MGN 640',
      mandatory: true,
      appliesTo: 'ALL CREW',
      description: 'STCW compliant medical for vessels >60 miles from shore or international voyages',
      validity: '2 years (1 year if over 65)',
      notes: 'Issued by MCA Approved Doctor only'
    });
  }
  
  // ML5 Medical Certificate - for ALL CREW on Cat 2-6 domestic vessels
  else if (category >= 2 && category <= 6 && !vessel.internationalVoyages) {
    requirements.push({
      id: 'crew.medical.ml5',
      name: 'ML5 Medical Certificate',
      category: 'Medical Fitness',
      reference: 'WBC3 28.1.5/MGN 640',
      mandatory: true,
      appliesTo: 'ALL CREW',
      description: 'Medical certificate for vessels ≤60 miles from shore (domestic only)',
      validity: '5 years (1 year if over 65)',
      notes: 'Can be issued by any UK GMC registered doctor. NOT valid for foreign ports'
    });
  }
  
  // ===== MEDICAL TRAINING CERTIFICATES =====
  
  // Medical Care Certificate - Master on Cat 0-1 vessels
  if (category === 0 || category === 1) {
    requirements.push({
      id: 'crew.medical.care.master',
      name: 'Proficiency in Medical Care Certificate',
      category: 'Medical Training',
      reference: 'WBC3 28.1.4/Table A5.3',
      mandatory: true,
      appliesTo: 'MASTER',
      description: 'Required for master unless crew has medical/nursing qualification',
      validity: '5 years',
      notes: 'STCW compliant medical care training'
    });
  }
  
  // Elementary First Aid - At least one person on Cat 2-6 vessels
  else if (category >= 2 && category <= 6) {
    requirements.push({
      id: 'crew.firstaid.elementary',
      name: 'Elementary First Aid Certificate',
      category: 'Medical Training',
      reference: 'WBC3 28.1.4/Table A5.3',
      mandatory: true,
      appliesTo: 'AT LEAST ONE CREW MEMBER',
      description: 'MCA Elementary First Aid or equivalent',
      validity: '5 years',
      notes: 'RYA or SeaFish First Aid also acceptable'
    });
  }
  
  return requirements;
}