/**
 * GMDSS Documentation Requirements
 * Generated from UK-MARITIME-LIBRARY/03-CSV-DATABASES/SEAGOING/domains/GMDSS_v1/DOCS.csv
 * THIS FILE USES ONLY THE CSV DATA - NO MADE UP REQUIREMENTS
 */

export function getGMDSSDocumentationRequirements(vessel) {
  const requirements = [];
  
  // Only apply to seagoing vessels
  if (!vessel.operatingStatus || vessel.operatingStatus !== 'seagoing') {
    return requirements;
  }
  
  // ===== MANDATORY DOCUMENTATION =====
  
  // Ships Radio Licence - ALL seagoing vessels
  requirements.push({
    id: 'gmdss.doc.radio.licence',
    name: 'Ships Radio Licence',
    category: 'GMDSS Documentation',
    reference: 'WBC3 17.9.1',
    mandatory: true,
    description: 'Issued with valid Ships\' Radio Licence - issued by OFCOM'
  });
  
  // Radio Survey Statement - vessels with GMDSS
  if (vessel.hasGMDSS) {
    requirements.push({
      id: 'gmdss.doc.radio.survey',
      name: 'Radio Survey Statement',
      category: 'GMDSS Documentation',
      reference: 'WBC3 17.10.1',
      mandatory: true,
      description: 'Statement of Compliance may be issued - every 5 years'
    });
  }
  
  // Radio Operator Certificates - ALL seagoing vessels
  requirements.push({
    id: 'gmdss.doc.operator.cert',
    name: 'Radio Operator Certificates',
    category: 'GMDSS Documentation',
    reference: 'WBC3 28.1',
    mandatory: true,
    description: 'Radio Operator\'s Certificate suitable for equipment - all radio operators'
  });
  
  // Distress Procedures Card - ALL seagoing vessels
  requirements.push({
    id: 'gmdss.doc.distress.card',
    name: 'Distress Procedures Card',
    category: 'GMDSS Documentation',
    reference: 'WBC3 17.3.5',
    mandatory: true,
    description: 'Summary of radio distress urgency safety procedures - at radio position'
  });
  
  // EPIRB Registration
  if (vessel.hasEPIRB) {
    requirements.push({
      id: 'gmdss.doc.epirb.registration',
      name: 'EPIRB Registration',
      category: 'GMDSS Documentation',
      reference: 'WBC3 17.5.4/MGN 665',
      mandatory: true,
      description: 'Meet mandatory registration requirements - UK EPIRB Registry'
    });
  }
  
  // PLB Registration
  if (vessel.hasPLB) {
    requirements.push({
      id: 'gmdss.doc.plb.registration',
      name: 'PLB Registration',
      category: 'GMDSS Documentation',
      reference: 'MGN 665',
      mandatory: true,
      description: 'PLB registration requirements - each PLB registered'
    });
  }
  
  // MMSI Documentation
  if (vessel.hasDSC) {
    requirements.push({
      id: 'gmdss.doc.mmsi',
      name: 'MMSI Documentation',
      category: 'GMDSS Documentation',
      reference: 'WBC3 17.3.4',
      mandatory: true,
      description: 'Maritime Mobile Service Identity (MMSI) - 9-digit number'
    });
  }
  
  // Battery Records for EPIRB/SART
  if (vessel.hasEPIRB || vessel.hasSART) {
    requirements.push({
      id: 'gmdss.doc.battery.records',
      name: 'Battery Records',
      category: 'GMDSS Documentation',
      reference: 'WBC3 17.5.3',
      mandatory: true,
      description: 'Batteries replaced as required - service station records'
    });
  }
  
  // ===== CONDITIONAL DOCUMENTATION =====
  
  // Shore Maintenance Agreement
  if (vessel.maintenanceOption === 'shore') {
    requirements.push({
      id: 'gmdss.doc.shore.agreement',
      name: 'Shore Maintenance Agreement',
      category: 'GMDSS Documentation',
      reference: 'IMO A.702(17)',
      mandatory: true,
      description: 'Shore-based maintenance - if shore option chosen'
    });
  }
  
  // ===== GUIDANCE DOCUMENTATION =====
  
  // Radio Operating Manual
  requirements.push({
    id: 'gmdss.doc.operating.manual',
    name: 'Radio Operating Manual',
    category: 'GMDSS Documentation',
    reference: 'Manufacturer requirement',
    mandatory: false,
    description: 'Good practice for operation - manufacturer\'s manual'
  });
  
  // Maintenance Log
  requirements.push({
    id: 'gmdss.doc.maintenance.log',
    name: 'Radio Maintenance Log',
    category: 'GMDSS Documentation',
    reference: 'WBC3 17.7.1',
    mandatory: false,
    description: 'Maintained regularly - service history'
  });
  
  // Radio Log Book
  requirements.push({
    id: 'gmdss.doc.radio.log',
    name: 'Radio Log Book',
    category: 'GMDSS Documentation',
    reference: 'GMDSS regulations',
    mandatory: false,
    description: 'Standard maritime practice - distress traffic record'
  });
  
  // False Alert Log
  requirements.push({
    id: 'gmdss.doc.false.alert.log',
    name: 'False Alert Log',
    category: 'GMDSS Documentation',
    reference: 'MGN 665',
    mandatory: false,
    description: 'False alert procedures - report to coastguard'
  });
  
  return requirements;
}