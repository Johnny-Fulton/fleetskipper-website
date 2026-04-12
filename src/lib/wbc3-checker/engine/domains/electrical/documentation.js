/**
 * Electrical Documentation Requirements
 * Generated from UK-MARITIME-LIBRARY/03-CSV-DATABASES/SEAGOING/domains/electrical_v1/DOCS.csv
 * THIS FILE USES ONLY THE CSV DATA - NO MADE UP REQUIREMENTS
 * Following anchor mode pattern
 */

export function getElectricalDocumentationRequirements(vessel) {
  const requirements = [];
  
  // Only apply to seagoing vessels
  if (!vessel.operatingStatus || vessel.operatingStatus !== 'seagoing') {
    return requirements;
  }
  
  // ===== OPERATIONS DOCUMENTATION =====
  // From CSV row 8
  
  // Electrical Operations Manual - GUIDANCE
  requirements.push({
    id: 'electrical.doc.operations.manual',
    name: 'Electrical Operations Manual',
    category: 'Electrical Documentation',
    reference: 'WBC3 Appendix 8 1.1.6',
    mandatory: false, // GUIDANCE classification in CSV
    description: 'Procedures to ensure safe operation - Must exist. Job cards contain specific procedures'
  });
  
  // ===== MAINTENANCE DOCUMENTATION =====
  // From CSV row 9
  
  // Electrical Maintenance Procedures - GUIDANCE
  requirements.push({
    id: 'electrical.doc.maintenance.procedures',
    name: 'Electrical Maintenance Procedures',
    category: 'Electrical Documentation',
    reference: 'WBC3 Appendix 8 1.1.9',
    mandatory: false, // GUIDANCE classification in CSV
    description: 'Maintenance of vessel and equipment - Detailed procedures are on job cards in maintenance module'
  });
  
  // ===== MANUFACTURER DOCUMENTATION =====
  // From CSV row 10
  
  // Battery Manufacturer Instructions - GUIDANCE
  requirements.push({
    id: 'electrical.doc.battery.instructions',
    name: 'Battery Manufacturer Instructions',
    category: 'Electrical Documentation',
    reference: 'WBC3 9.3',
    mandatory: false, // GUIDANCE classification in CSV
    description: 'Battery operating and maintenance manual - Required for proper maintenance'
  });
  
  // ===== RISK ASSESSMENT =====
  // From CSV row 11
  
  // Electrical Hazards Risk Assessment - GUIDANCE
  requirements.push({
    id: 'electrical.doc.ra.hazards',
    name: 'Electrical Hazards Risk Assessment',
    category: 'Electrical Documentation',
    reference: 'WBC3 Appendix 8 3.1',
    mandatory: false, // GUIDANCE classification in CSV
    description: 'Identify risks to personnel vessels and the environment - Should include: shock risks; arc flash; fire risks; working at height on masts; isolation procedures'
  });
  
  // ===== TEST RECORDS =====
  // From CSV row 12
  
  // Emergency Lighting Test Records - GUIDANCE for vessels with central electrical
  if (vessel.hasAccommodation) {
    requirements.push({
      id: 'electrical.doc.emergency.lighting.test',
      name: 'Emergency Lighting Test Records',
      category: 'Electrical Documentation',
      reference: 'Good practice',
      mandatory: false, // GUIDANCE classification in CSV
      description: 'Monthly emergency lighting test results - Good practice for safety verification'
    });
  }
  
  // ===== HIGH VOLTAGE DOCUMENTATION =====
  // From CSV row 13
  
  // High Voltage System Documentation - MANDATORY if HV systems
  if (vessel.hasHighVoltage) {
    requirements.push({
      id: 'electrical.doc.hv.compliance',
      name: 'High Voltage System Documentation',
      category: 'Electrical Documentation',
      reference: 'WBC3 Definition/MIN 698',
      mandatory: true, // MANDATORY classification in CSV for HV systems
      description: 'Safety procedures and compliance for HV systems - High voltage means 1000V AC or 1500V DC'
    });
  }
  
  return requirements;
}