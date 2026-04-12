/**
 * Medical Documentation Requirements
 * Generated from UK-MARITIME-LIBRARY/03-CSV-DATABASES/SEAGOING/domains/MEDICAL_v1/DOCS.csv
 * THIS FILE USES ONLY THE CSV DATA - NO MADE UP REQUIREMENTS
 * Following anchor mode pattern - max 300 lines
 */

import { parseCategory } from '../../categoryHelpers.js';

export function getMedicalDocumentationRequirements(vessel) {
  const requirements = [];

  // Only apply to seagoing vessels
  if (!vessel.operatingStatus || vessel.operatingStatus !== 'seagoing') {
    return requirements;
  }

  const category = parseCategory(vessel.category);
  
  // ===== MEDICAL STORES DOCUMENTATION =====
  // From CSV rows 8-9
  
  // Medical Stores Checklist - for Cat 0-1
  if (category === 0 || category === 1) {
    requirements.push({
      id: 'medical.doc.checklist',
      name: 'Medical Stores Checklist',
      category: 'Medical Documentation',
      reference: 'WBC3 23.1.4',
      mandatory: true,
      description: 'Carry an annually reviewed checklist - Updated annually'
    });
    
    // Omissions Record - for Cat 0-1 (if items omitted)
    requirements.push({
      id: 'medical.doc.omissions',
      name: 'Omissions Record',
      category: 'Medical Documentation',
      reference: 'WBC3 23.1.6',
      mandatory: true,
      description: 'Stated on the checklist - If items omitted'
    });
  }
  
  // Note: Medical training and fitness certificates moved to crewCertification.js
  // They are crew certificates, not vessel documentation
  
  // ===== MEDICAL GUIDES =====
  // From CSV rows 14-15
  
  // Ship Captain's Medical Guide - for Cat 0-1
  if (category === 0 || category === 1) {
    requirements.push({
      id: 'medical.doc.guide.captain',
      name: "Ship Captain's Medical Guide",
      category: 'Medical Guides',
      reference: 'MSN 1905 Annex 5',
      mandatory: true,
      description: 'Medical reference guide - 23rd edition or later'
    });
  }
  
  // Medical First Aid Guide (MFAG) - for dangerous goods
  if (vessel.hasDangerousGoods || vessel.operations?.includes('dangerous_goods')) {
    requirements.push({
      id: 'medical.doc.guide.mfag',
      name: 'Medical First Aid Guide',
      category: 'Medical Guides',
      reference: 'WBC3 29.9.1',
      mandatory: true,
      description: 'IMO Medical First Aid Guide - For DG accidents'
    });
  }
  
  // ===== MEDICAL RECORDS =====
  // From CSV rows 16-18 (Note: rows 16 and 18 are GUIDANCE/OPTIONAL)
  
  // Controlled Drugs Register - if carrying controlled drugs
  if (vessel.hasControlledDrugs) {
    requirements.push({
      id: 'medical.doc.controlled.drugs',
      name: 'Controlled Drugs Register',
      category: 'Medical Records',
      reference: 'MSN 1905 Annex 8',
      mandatory: true,
      description: 'Controlled drugs register - If carrying controlled drugs'
    });
  }
  
  // ===== RISK ASSESSMENTS =====
  // From CSV row 22
  
  // Medical Omissions Risk Assessment - for Cat 0-1 if items omitted
  if (category === 0 || category === 1) {
    requirements.push({
      id: 'medical.doc.ra.omissions',
      name: 'Medical Omissions Risk Assessment',
      category: 'Medical SMS',
      reference: 'WBC3 23.1.6',
      mandatory: true,
      description: 'Subject to satisfactory risk assessment - Required if any items omitted from checklist'
    });
  }
  
  // Note: Rows 19-21, 23-24 are marked as GUIDANCE/RECOMMENDED so not included as mandatory
  
  return requirements;
}