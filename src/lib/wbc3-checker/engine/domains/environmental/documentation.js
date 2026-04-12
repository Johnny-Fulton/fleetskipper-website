/**
 * Environmental Documentation Requirements
 * Generated from UK-MARITIME-LIBRARY/03-CSV-DATABASES/SEAGOING/domains/ENVIRONMENTAL_v1/DOCS.csv
 * THIS FILE USES ONLY THE CSV DATA - NO MADE UP REQUIREMENTS
 * Following anchor mode pattern - max 300 lines
 */

export function getEnvironmentalDocumentationRequirements(vessel) {
  const requirements = [];
  
  // Only apply to seagoing vessels
  if (!vessel.operatingStatus || vessel.operatingStatus !== 'seagoing') {
    return requirements;
  }
  
  const length = vessel.lengthOverall || vessel.lengthOverall || 0;
  const tonnage = vessel.tonnage || vessel.grossTonnage || 0;
  const pob = vessel.personCapacity || vessel.POB || 0;
  
  // ===== GARBAGE MANAGEMENT DOCUMENTATION =====
  // From CSV rows 9-11
  
  // Garbage Management Plan - for vessels ≥100GT or ≥15 POB
  if (tonnage >= 100 || pob >= 15) {
    requirements.push({
      id: 'environmental.doc.garbage.plan',
      name: 'Garbage Management Plan',
      category: 'Environmental Documentation',
      reference: 'MGN 632',
      mandatory: true,
      description: 'Written procedures for garbage handling - MARPOL Annex V requirement'
    });
  }
  
  // Garbage Record Book - for vessels ≥100GT with international voyages
  if (tonnage >= 100 && vessel.internationalVoyages) {
    requirements.push({
      id: 'environmental.doc.garbage.record',
      name: 'Garbage Record Book',
      category: 'Environmental Documentation',
      reference: 'MGN 632',
      mandatory: true,
      description: 'Record of all garbage operations - Part I and Part II required',
      retention: '2 years'
    });
  }
  
  // Garbage Disposal Placards - for vessels >12m
  if (length > 12) {
    requirements.push({
      id: 'environmental.doc.garbage.placards',
      name: 'Garbage Disposal Placards',
      category: 'Environmental Documentation',
      reference: 'MGN 632',
      mandatory: true,
      description: 'Posted notices on garbage disposal - multiple languages may be required'
    });
  }
  
  // ===== OIL POLLUTION PREVENTION DOCUMENTATION =====
  // From CSV rows 13-17
  
  if (tonnage >= 400) {
    // Oil Record Book Part I
    requirements.push({
      id: 'environmental.doc.oil.record',
      name: 'Oil Record Book Part I',
      category: 'Environmental Documentation',
      reference: 'MARPOL Annex I',
      mandatory: true,
      description: 'Machinery space oil operations record - every operation recorded',
      retention: '5 years'
    });
    
    // SOPEP
    requirements.push({
      id: 'environmental.doc.sopep',
      name: 'SOPEP',
      category: 'Environmental Documentation',
      reference: 'MARPOL Annex I',
      mandatory: true,
      description: 'Shipboard Oil Pollution Emergency Plan - IMO approved format'
    });
    
    // OWS Type Approval Certificate
    requirements.push({
      id: 'environmental.doc.ows.certificate',
      name: 'OWS Type Approval Certificate',
      category: 'Environmental Certificates',
      reference: 'MARPOL Annex I',
      mandatory: true,
      description: 'Oily water separator approval certificate - MEPC approval certificate'
    });
    
    // SOPEP - for vessels ≥400GT per WBC3 30.6.3
    requirements.push({
      id: 'environmental.doc.sopep',
      name: 'SOPEP',
      category: 'Environmental Documentation',
      reference: 'WBC3 30.6.3',
      mandatory: true,
      description: 'Shipboard Oil Pollution Emergency Plan - required for 400GT+'
    });
    
    // IOPP Certificate - for international voyages
    if (vessel.internationalVoyages) {
      requirements.push({
        id: 'environmental.doc.oil.discharge.certificate',
        name: 'IOPP Certificate',
        category: 'Environmental Certificates',
        reference: 'MARPOL Annex I',
        mandatory: true,
        description: 'International Oil Pollution Prevention Certificate - with Form A or B',
        validity: '5 years'
      });
    }
  }
  
  // ===== SEWAGE DOCUMENTATION =====
  // From CSV rows 18-19
  
  if ((tonnage >= 400 || pob > 15) && vessel.internationalVoyages) {
    // ISPP Certificate
    requirements.push({
      id: 'environmental.doc.sewage.certificate',
      name: 'ISPP Certificate',
      category: 'Environmental Certificates',
      reference: 'MARPOL Annex IV',
      mandatory: true,
      description: 'International Sewage Pollution Prevention Certificate',
      validity: '5 years'
    });
  }
  
  if (tonnage >= 400 || pob > 15) {
    // Sewage System Type Approval
    requirements.push({
      id: 'environmental.doc.sewage.type.approval',
      name: 'Sewage System Type Approval',
      category: 'Environmental Certificates',
      reference: 'MARPOL Annex IV',
      mandatory: true,
      description: 'Treatment plant type approval certificate - MEPC resolution compliance'
    });
  }
  
  // ===== DANGEROUS GOODS DOCUMENTATION =====
  // From CSV rows 21-24
  
  if (vessel.hasDangerousGoods || vessel.operations?.includes('dangerous_goods')) {
    // Document of Compliance for DG
    requirements.push({
      id: 'environmental.doc.dg.compliance',
      name: 'Document of Compliance for DG',
      category: 'Environmental Certificates',
      reference: 'IMDG Code',
      mandatory: true,
      description: 'Certificate for carriage of dangerous goods - lists permitted DG classes',
      validity: '5 years'
    });
    
    // Dangerous Goods Manifest
    requirements.push({
      id: 'environmental.doc.dg.manifest',
      name: 'Dangerous Goods Manifest',
      category: 'Environmental Documentation',
      reference: 'IMDG Code',
      mandatory: true,
      description: 'List of dangerous goods carried - location and class of DG',
      retention: 'Until discharge'
    });
    
    // DG Stowage Plan
    requirements.push({
      id: 'environmental.doc.dg.stowage.plan',
      name: 'DG Stowage Plan',
      category: 'Environmental Documentation',
      reference: 'IMDG Code',
      mandatory: true,
      description: 'Shows DG locations on vessel - segregation requirements met',
      retention: 'Until discharge'
    });
    
    // DG Training Records
    requirements.push({
      id: 'environmental.doc.dg.training',
      name: 'DG Training Records',
      category: 'Environmental Documentation',
      reference: 'IMDG Code 1.3',
      mandatory: true,
      description: 'Crew dangerous goods training records - IMDG Code training',
      retention: '5 years'
    });
  }
  
  // ===== ANTI-FOULING DOCUMENTATION =====
  // From CSV rows 31-32
  
  // AFS Certificate - for vessels ≥24m
  if (length >= 24) {
    requirements.push({
      id: 'environmental.doc.afs.certificate',
      name: 'AFS Certificate',
      category: 'Environmental Certificates',
      reference: 'AFS Convention',
      mandatory: true,
      description: 'Anti-fouling System Certificate - TBT-free certification',
      validity: '5 years'
    });
  }
  // AFS Declaration - for vessels 10-24m
  else if (length >= 10 && length < 24) {
    requirements.push({
      id: 'environmental.doc.afs.declaration',
      name: 'AFS Declaration',
      category: 'Environmental Documentation',
      reference: 'AFS Convention',
      mandatory: true,
      description: 'Anti-fouling System Declaration - self-declaration of compliance',
      validity: '5 years'
    });
  }
  
  // ===== PORT WASTE RECEPTION =====
  // From CSV rows 34-35
  
  // Waste Notification Form
  requirements.push({
    id: 'environmental.doc.waste.notification',
    name: 'Waste Notification Form',
    category: 'Environmental Documentation',
    reference: 'Port Regs',
    mandatory: true,
    description: 'Advance notification to port - 24 hours before arrival (EU/UK port requirement)'
  });
  
  // Waste Disposal Receipt
  requirements.push({
    id: 'environmental.doc.waste.receipt',
    name: 'Waste Disposal Receipt',
    category: 'Environmental Documentation',
    reference: 'Port Regs',
    mandatory: true,
    description: 'Receipt for waste discharged to port - from reception facility',
    retention: '1 year'
  });
  
  // Note: Fuel transfer documentation (rows 26-29) marked as GUIDANCE in CSV, not mandatory
  
  return requirements;
}