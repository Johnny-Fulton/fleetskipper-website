/**
 * LSA Documentation Requirements
 * Generated from UK-MARITIME-LIBRARY/03-CSV-DATABASES/SEAGOING/domains/LSA_v2/DOCS.csv
 * THIS FILE USES ONLY THE CSV DATA - NO MADE UP REQUIREMENTS
 * Following anchor mode pattern
 */

export function getLSADocumentationRequirements(vessel) {
  const requirements = [];
  
  // Only apply to seagoing vessels
  if (!vessel.operatingStatus || vessel.operatingStatus !== 'seagoing') {
    return requirements;
  }
  
  // ===== MANUALS AND INSTRUCTIONS =====
  // From CSV rows 9-11
  
  // LSA Training Manual - always required
  requirements.push({
    id: 'lsa.doc.training.manual',
    name: 'LSA Training Manual',
    category: 'LSA Documentation',
    reference: 'WBC3 14.8',
    mandatory: true,
    description: 'Training manual shall be stowed at a control position - contains manufacturer instructions'
  });
  
  // LSA Maintenance Instructions - always required
  requirements.push({
    id: 'lsa.doc.maintenance.instructions',
    name: 'LSA Maintenance Instructions',
    category: 'LSA Documentation',
    reference: 'WBC3 14.9',
    mandatory: true,
    description: 'Instruction manual for on board maintenance … shall be stowed at a control position'
  });
  
  // Table of Life-Saving Signals - always required
  requirements.push({
    id: 'lsa.doc.lifesaving.signals',
    name: 'Table of Life-Saving Signals',
    category: 'LSA Documentation',
    reference: 'WBC3 14.10',
    mandatory: true,
    description: 'All vessels shall carry a Table of International Life-Saving Signals - SOLAS poster or MCA leaflet'
  });
  
  // ===== CERTIFICATES =====
  // From CSV rows 12-16
  
  // EPIRB Registration - if EPIRB fitted
  if (vessel.hasEPIRB || vessel.category <= 2) {
    requirements.push({
      id: 'lsa.doc.epirb.registration',
      name: 'EPIRB Registration Document',
      category: 'LSA Certificates',
      reference: 'WBC3 17.5.4',
      mandatory: true,
      description: 'All EPIRBs shall meet the mandatory registration requirements - per MGN 665'
    });
  }
  
  // Pyrotechnic Approval Certificates - always required
  requirements.push({
    id: 'lsa.doc.pyro.approval',
    name: 'Pyrotechnic Approval Certificates',
    category: 'LSA Certificates',
    reference: 'WBC3 Table 14.1.2',
    mandatory: true,
    description: 'Shall be MER approved (Wheelmarked) - or MSN 1676 compliance'
  });
  
  // Liferaft Service Certificate - if liferaft fitted
  if (vessel.hasLiferaft || vessel.category <= 6) {
    requirements.push({
      id: 'lsa.doc.liferaft.certificate',
      name: 'Liferaft Service Certificate',
      category: 'LSA Certificates',
      reference: 'WBC3 14.2.1.1',
      mandatory: true,
      description: 'All liferafts shall be serviced at a service station approved by the manufacturer - annual service required'
    });
  }
  
  // HRU Service Certificate - if HRU fitted
  if ((vessel.hasLiferaft && vessel.hasFloatFree) || vessel.category <= 2) {
    requirements.push({
      id: 'lsa.doc.hru.certificate',
      name: 'HRU Service Certificate',
      category: 'LSA Certificates',
      reference: 'WBC3 14.2.1.3',
      mandatory: true,
      description: 'HRU … shall be serviced at a maximum of annual intervals - annual service or replacement'
    });
  }
  
  return requirements;
}