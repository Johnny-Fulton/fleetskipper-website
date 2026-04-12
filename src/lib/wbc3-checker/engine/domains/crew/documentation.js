/**
 * Crew Documentation Requirements
 * Generated from UK-MARITIME-LIBRARY/03-CSV-DATABASES/SEAGOING/domains/CREW_v1/DOCS.csv
 * THIS FILE USES ONLY THE CSV DATA - NO MADE UP REQUIREMENTS
 * Following anchor mode pattern - max 300 lines
 */

import { parseCategory } from '../../categoryHelpers.js';

export function getCrewDocumentationRequirements(vessel) {
  const requirements = [];

  // Only apply to seagoing vessels
  if (!vessel.operatingStatus || vessel.operatingStatus !== 'seagoing') {
    return requirements;
  }

  // Parse category to handle 'cat3', 3, '3', 'CAT3', 'IWW' formats
  const category = parseCategory(vessel.category ?? vessel.areaCategory);
  const tonnage = vessel.tonnage || vessel.grossTonnage || 0;
  const hasMultipleCrew = vessel.hasMinimumCrew >= 2 || vessel.crewCount >= 2;
  
  // ===== MANNING DOCUMENTATION =====
  
  // Safe Manning Document - all seagoing vessels
  requirements.push({
    id: 'crew.doc.safe.manning',
    name: 'Safe Manning Document',
    category: 'Manning Documents',
    reference: 'WBC3 28.1.1',
    mandatory: true,
    description: 'Minimum safe manning certificate - Tables A5.1 and A5.2 requirements'
  });
  
  // Crew List - all seagoing vessels
  requirements.push({
    id: 'crew.doc.crew.list',
    name: 'Crew List',
    category: 'Manning Documents',
    reference: 'Port Regs',
    mandatory: true,
    description: 'List of all crew on board - names positions certificates'
  });
  
  // ===== MASTER QUALIFICATIONS BY AREA CATEGORY =====
  
  // Category 0 (Unrestricted) - Multiple options
  if (category === 0) {
    if (tonnage < 500) {
      requirements.push({
        id: 'crew.doc.master.stcw.workboat.500',
        name: 'STCW Master Workboat <500GT',
        category: 'Master Cat 0',
        reference: 'WBC3 Table A5.1',
        mandatory: true,
        description: 'Master certificate unlimited area - workboat specific'
      });
    }
    
    if (tonnage < 200) {
      requirements.push({
        id: 'crew.doc.master.stcw.code.200',
        name: 'STCW Master Code <200GT',
        category: 'Master Cat 0',
        reference: 'WBC3 Table A5.1',
        mandatory: true,
        description: 'Master certificate unlimited area - limited to 200GT'
      });
    }
    
    requirements.push({
      id: 'crew.doc.master.yachtmaster.ocean',
      name: 'Yachtmaster Ocean CoC',
      category: 'Master Cat 0',
      reference: 'WBC3 Table A5.1',
      mandatory: true,
      description: 'RYA/MCA certificate - motor vessels, commercial endorsement required'
    });
  }
  
  // Category 1 (150nm from safe haven)
  if (category === 1) {
    if (tonnage < 200) {
      requirements.push({
        id: 'crew.doc.master.stcw.code.150',
        name: 'STCW Master Code 150nm',
        category: 'Master Cat 1',
        reference: 'WBC3 Table A5.1',
        mandatory: true,
        description: 'Master certificate limited 150nm - 150nm from safe haven'
      });
    }
    
    requirements.push({
      id: 'crew.doc.master.yachtmaster.offshore',
      name: 'Yachtmaster Offshore',
      category: 'Master Cat 1',
      reference: 'WBC3 Table A5.1',
      mandatory: true,
      description: 'RYA/MCA certificate or service - CoC or CoS acceptable'
    });
  }
  
  // Category 2 (60nm from safe haven)
  if (category === 2) {
    requirements.push({
      id: 'crew.doc.master.boatmasters',
      name: 'Boatmasters Licence',
      category: 'Master Cat 2',
      reference: 'WBC3 Table A5.1',
      mandatory: true,
      description: 'MCA Boatmasters licence - MSN 1853 requirements'
    });
    
    requirements.push({
      id: 'crew.doc.master.yachtmaster.coastal',
      name: 'Yachtmaster Coastal',
      category: 'Master Cat 2',
      reference: 'WBC3 Table A5.1',
      mandatory: true,
      description: 'RYA/MCA certificate or service - CoC or CoS acceptable'
    });
  }
  
  // Category 3 (20nm from safe haven)
  if (category === 3) {
    requirements.push({
      id: 'crew.doc.master.powerboat.advanced.cat3',
      name: 'Powerboat Advanced CoC',
      category: 'Master Cat 3',
      reference: 'WBC3 Table A5.1',
      mandatory: true,
      description: 'RYA/MCA advanced powerboat - post 2005 CoC required'
    });
    
    requirements.push({
      id: 'crew.doc.master.competent.authority.cat3',
      name: 'Competent Authority Certificate',
      category: 'Master Cat 3',
      reference: 'WBC3 Table A5.1',
      mandatory: true,
      description: 'Area-specific certificate - alternative qualification'
    });
  }
  
  // Category 4 (20nm daylight only)
  if (category === 4) {
    requirements.push({
      id: 'crew.doc.master.day.skipper.cat4',
      name: 'Day Skipper Certificate',
      category: 'Master Cat 4',
      reference: 'WBC3 Table A5.1',
      mandatory: true,
      description: 'Theory and practical certificate - daylight operations only'
    });
    
    requirements.push({
      id: 'crew.doc.master.powerboat.advanced.cat4',
      name: 'Powerboat Advanced CoC',
      category: 'Master Cat 4',
      reference: 'WBC3 Table A5.1',
      mandatory: true,
      description: 'RYA/MCA advanced powerboat - post 2005 CoC required'
    });
    
    requirements.push({
      id: 'crew.doc.master.competent.authority.cat4',
      name: 'Competent Authority Certificate',
      category: 'Master Cat 4',
      reference: 'WBC3 Table A5.1',
      mandatory: true,
      description: 'Area-specific certificate - alternative qualification'
    });
  }
  
  // Category 5 (3nm day/night)
  if (category === 5) {
    requirements.push({
      id: 'crew.doc.master.powerboat.advanced.cat5',
      name: 'Powerboat Advanced CoC',
      category: 'Master Cat 5',
      reference: 'WBC3 Table A5.1',
      mandatory: true,
      description: 'RYA/MCA advanced powerboat - 3nm operations day/night'
    });
  }
  
  // Category 6 (3nm daylight only) - only if category is exactly 6
  if (category === 6) {
    requirements.push({
      id: 'crew.doc.master.day.skipper.cat6',
      name: 'Day Skipper Certificate',
      category: 'Master Cat 6',
      reference: 'WBC3 Table A5.1',
      mandatory: true,
      description: 'Theory and practical certificate - daylight operations only, 3nm'
    });
    
    if (tonnage < 3) {
      requirements.push({
        id: 'crew.doc.master.powerboat.level2',
        name: 'Powerboat Level 2',
        category: 'Master Cat 6',
        reference: 'WBC3 Table A5.1',
        mandatory: true,
        description: 'RYA/MCA Level 2 certificate - small open boats only'
      });
    }
    
    requirements.push({
      id: 'crew.doc.master.local.authority',
      name: 'Local Authority Licence',
      category: 'Master Cat 6',
      reference: 'WBC3 Table A5.1',
      mandatory: true,
      description: 'Approved local licence - local waters only'
    });
  }
  
  // ===== SECOND PERSON REQUIREMENTS =====
  
  if (hasMultipleCrew) {
    if (category === 0) {
      requirements.push({
        id: 'crew.doc.second.cat0',
        name: 'Second Person Cat 0',
        category: 'Second Person',
        reference: 'WBC3 Table A5.1',
        mandatory: true,
        description: 'Yachtmaster Offshore minimum - unrestricted waters'
      });
    }
    
    if (category === 1) {
      requirements.push({
        id: 'crew.doc.second.cat1',
        name: 'Second Person Cat 1',
        category: 'Second Person',
        reference: 'WBC3 Table A5.1',
        mandatory: true,
        description: 'Yachtmaster Coastal minimum - 150nm from haven'
      });
    }
    
    if (category === 2) {
      requirements.push({
        id: 'crew.doc.second.cat2',
        name: 'Second Person Cat 2',
        category: 'Second Person',
        reference: 'WBC3 Table A5.1',
        mandatory: true,
        description: 'Master decides competence - 60nm from haven'
      });
    }
    
    if (category >= 3 && category <= 6) {
      requirements.push({
        id: 'crew.doc.second.cat3to6',
        name: 'Second Person Cat 3-6',
        category: 'Second Person',
        reference: 'WBC3 Table A5.1',
        mandatory: true,
        description: 'Owner decides competence - coastal waters'
      });
    }
  }
  
  // ===== SPECIAL OPERATIONS MASTER REQUIREMENTS =====
  
  if (vessel.hasTowingOps || vessel.operations?.includes('towing')) {
    requirements.push({
      id: 'crew.doc.master.towing',
      name: 'Master Towing Operations',
      category: 'Special Operations',
      reference: 'WBC3 26.1.5',
      mandatory: true,
      description: 'Advanced powerboat with towing - suitable towing experience'
    });
  }
  
  if (vessel.hasHighSpeedOps || vessel.maxSpeed >= 25) {
    requirements.push({
      id: 'crew.doc.master.high.speed',
      name: 'Master High Speed Ops',
      category: 'Special Operations',
      reference: 'WBC3 25.4',
      mandatory: true,
      description: 'High speed vessel qualification - >25 knots operations'
    });
  }
  
  // ===== MEDICAL CERTIFICATES =====
  
  requirements.push({
    id: 'crew.doc.medical.fitness',
    name: 'Medical Fitness Certificate',
    category: 'Medical Certificates',
    reference: 'WBC3 28.1.5/MIN 698',
    mandatory: true,
    description: 'Valid medical fitness certificate - ENG1 or ML5 as appropriate'
  });
  
  return requirements;
}