/**
 * GMDSS Procedures Requirements
 * Generated from UK-MARITIME-LIBRARY/03-CSV-DATABASES/SEAGOING/domains/GMDSS_v1/DOCS.csv
 * THIS FILE USES ONLY THE CSV DATA - NO MADE UP REQUIREMENTS
 * 
 * SMS procedure requirements from DOCS.csv
 */

export function getGMDSSProceduresRequirements(vessel) {
  const requirements = [];
  
  // Only apply to seagoing vessels
  if (!vessel.operatingStatus || vessel.operatingStatus !== 'seagoing') {
    return requirements;
  }
  
  // GMDSS Operation & Maintenance Procedures - Guidance
  requirements.push({
    id: 'gmdss.doc.sms.ops.maint',
    name: 'GMDSS Operation & Maintenance Procedures',
    category: 'GMDSS Procedures',
    reference: 'WBC3 Appendix 8 1.1.6/1.1.9',
    mandatory: false,
    description: 'Procedures to ensure safe operation & maintenance of vessel and equipment - should include watch keeping/maintenance/operation'
  });
  
  // Emergency Communication Procedures - Guidance
  requirements.push({
    id: 'gmdss.doc.sms.emergency',
    name: 'Emergency Communication Procedures',
    category: 'GMDSS Procedures',
    reference: 'WBC3 Appendix 8 1.1.7',
    mandatory: false,
    description: 'Emergencies - including MAYDAY/PAN/SECURITE procedures'
  });
  
  return requirements;
}