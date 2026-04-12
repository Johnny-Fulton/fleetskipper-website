/**
 * Surveys Documentation Requirements
 * Generated from UK-MARITIME-LIBRARY/03-CSV-DATABASES/SEAGOING/domains/SURVEYS_v1/DOCS.csv
 * THIS FILE USES ONLY THE CSV DATA - NO MADE UP REQUIREMENTS
 * Following anchor mode pattern - max 300 lines
 */

export function getSurveysDocumentationRequirements(vessel) {
  const requirements = [];
  
  // Only apply to seagoing vessels
  if (!vessel.operatingStatus || vessel.operatingStatus !== 'seagoing') {
    return requirements;
  }
  
  // ===== EXAMINATION FORMS AND REPORTS =====
  
  // SWB1 Application Form - always required for first examination
  requirements.push({
    id: 'surveys.doc.swb1',
    name: 'SWB1 Application Form',
    category: 'Examination Forms',
    reference: 'WBC3 Definitions',
    mandatory: true,
    description: 'Application for examination of vessel - required to request examination'
  });
  
  // SWB2 Compliance Report - foundation document for all examinations
  requirements.push({
    id: 'surveys.doc.swb2.compliance',
    name: 'SWB2 Compliance Report',
    category: 'Examination Reports',
    reference: 'WBC3 4.2.3',
    mandatory: true,
    description: 'Report form for compliance examination - signed by authorised person and owner'
  });
  
  // SWB2 Annual Report - for annual examinations
  requirements.push({
    id: 'surveys.doc.swb2.annual',
    name: 'SWB2 Annual Report',
    category: 'Examination Reports',
    reference: 'WBC3 4.4.1.3',
    mandatory: true,
    description: 'Report form for annual examination - annual examination record'
  });
  
  // SWB2 Intermediate Report - for 3-year cycle hull examinations
  requirements.push({
    id: 'surveys.doc.swb2.intermediate',
    name: 'SWB2 Intermediate Report',
    category: 'Examination Reports',
    reference: 'WBC3 4.5.1.3',
    mandatory: true,
    description: 'Report form for intermediate examination - hull examination evidence'
  });
  
  // SWB2 Renewal Report - for 5-year renewal cycle
  requirements.push({
    id: 'surveys.doc.swb2.renewal',
    name: 'SWB2 Renewal Report',
    category: 'Examination Reports',
    reference: 'WBC3 4.6.4',
    mandatory: true,
    description: 'Report form for renewal examination - new 5-year cycle begins'
  });
  
  // ===== CERTIFICATES =====
  
  // Main vessel certificate - for standard workboats
  if (!vessel.isPilotBoat && vessel.vesselType !== 'pilot') {
    requirements.push({
      id: 'surveys.doc.workboat.cert',
      name: 'Workboat Certificate',
      category: 'Certificates',
      reference: 'WBC3 4.3.2',
      mandatory: true,
      description: 'Main vessel certificate - primary operating authority (valid 5 years)'
    });
  }
  
  // Pilot Boat Certificate - for dedicated pilot boats
  if (vessel.isPilotBoat || vessel.vesselType === 'pilot') {
    requirements.push({
      id: 'surveys.doc.pilot.cert',
      name: 'Pilot Boat Certificate',
      category: 'Certificates',
      reference: 'WBC3 4.3.2',
      mandatory: true,
      description: 'Dedicated pilot boat certificate - for dedicated pilot boats (valid 5 years)'
    });
  }
  
  // Annual identification disc - all seagoing vessels
  requirements.push({
    id: 'surveys.doc.id.disc',
    name: 'Identification Disc',
    category: 'Certificates',
    reference: 'WBC3 4.3.4',
    mandatory: true,
    description: 'Annual identification disc from CA - must be prominently displayed'
  });
  
  // Radio Survey Statement - for vessels with GMDSS
  if (vessel.hasGMDSS || vessel.category <= 2) {
    requirements.push({
      id: 'surveys.doc.radio.compliance',
      name: 'Radio Survey Statement of Compliance',
      category: 'Radio Documentation',
      reference: 'WBC3 17.10.1',
      mandatory: true,
      description: 'Statement from radio survey - GMDSS compliance document (valid 5 years)'
    });
  }
  
  // ===== DIVING COMPANY DOCUMENTATION =====
  // For vessels requiring in-water examinations
  
  if (vessel.hasInWaterExam || vessel.category >= 3) {
    // Diving Company Certificate
    requirements.push({
      id: 'surveys.doc.diving.cert',
      name: 'Diving Company Certificate',
      category: 'In-Water Exam Docs',
      reference: 'WBC3 4.5.2.2',
      mandatory: true,
      description: 'Certificate for company performing in-water exam - from UK RO classification society'
    });
    
    // Diving Examination Report
    requirements.push({
      id: 'surveys.doc.diving.report',
      name: 'Diving Examination Report',
      category: 'In-Water Exam Docs',
      reference: 'WBC3 4.5.2.3',
      mandatory: true,
      description: 'Written report from diving company - details hull condition'
    });
  }
  
  // Hull Condition Report - for vessels 15+ years old with in-water exams
  const vesselAge = vessel.vesselAge || vessel.buildYear ? (new Date().getFullYear() - vessel.buildYear) : 0;
  if ((vessel.hasInWaterExam || vessel.category >= 3) && vesselAge > 15) {
    requirements.push({
      id: 'surveys.doc.hull.report',
      name: 'Hull Condition Report (15+ years)',
      category: 'In-Water Exam Docs',
      reference: 'WBC3 4.5.2.1',
      mandatory: true,
      description: 'Detailed hull report for older vessels - age-related requirement'
    });
  }
  
  // ===== INCIDENT DOCUMENTATION =====
  // These are conditional based on incidents
  
  if (vessel.hasIncident) {
    // Incident Report
    requirements.push({
      id: 'surveys.doc.incident.report',
      name: 'Incident Report',
      category: 'Incident Documentation',
      reference: 'WBC3 4.7.1',
      mandatory: true,
      description: 'Report of incident affecting safety - before any further voyage'
    });
    
    // Emergency Examination Report - if CA requires emergency exam
    if (vessel.hasEmergencyExam) {
      requirements.push({
        id: 'surveys.doc.emergency.exam',
        name: 'Emergency Examination Report',
        category: 'Incident Documentation',
        reference: 'WBC3 4.7.2',
        mandatory: true,
        description: 'Report from emergency examination - post-incident clearance'
      });
    }
  }
  
  // ===== CONSTRUCTION AND STABILITY =====
  
  // Stability Information Booklet - always required for seagoing vessels
  requirements.push({
    id: 'surveys.doc.stability.booklet',
    name: 'Stability Information Booklet',
    category: 'Construction Docs',
    reference: 'WBC3 4.3.1',
    mandatory: true,
    description: 'Vessel stability documentation - required for certificate issue'
  });
  
  // Construction Survey Records - only if built under survey
  if (vessel.hasConstructionSurvey) {
    requirements.push({
      id: 'surveys.doc.construction.survey',
      name: 'Construction Survey Records',
      category: 'Construction Docs',
      reference: 'WBC3 4.3.3',
      mandatory: false,
      description: 'Records from vessel construction survey - build verification'
    });
  }
  
  // ===== DECLARATIONS AND SCHEDULES =====
  
  // Required Declarations - all seagoing vessels
  requirements.push({
    id: 'surveys.doc.declarations',
    name: 'Required Declarations',
    category: 'Declarations',
    reference: 'WBC3 4.2.3',
    mandatory: true,
    description: 'All declarations required by Code - multiple declarations needed'
  });
  
  // Examination Schedule - recommended for planning
  requirements.push({
    id: 'surveys.doc.exam.schedule',
    name: 'Examination Schedule',
    category: 'Survey Planning',
    reference: 'WBC3 4.8',
    mandatory: false,
    description: 'Schedule of all required examinations - operator planning tool'
  });
  
  // Deficiency Log - if deficiencies found
  if (vessel.hasDeficiencies) {
    requirements.push({
      id: 'surveys.doc.deficiency.log',
      name: 'Deficiency Log',
      category: 'Deficiency Management',
      reference: 'WBC3 4.4.2.3',
      mandatory: true,
      description: 'Record of examination deficiencies - must report to CA'
    });
  }
  
  // ===== TRANSFER DOCUMENTATION =====
  
  // Vessel Transfer Examination - only when changing CA
  if (vessel.hasCATransfer) {
    requirements.push({
      id: 'surveys.doc.transfer.report',
      name: 'Vessel Transfer Examination',
      category: 'Transfer Documentation',
      reference: 'WBC3 3.8.7',
      mandatory: false,
      description: 'Examination report when changing CA - new CA determines scope'
    });
  }
  
  return requirements;
}