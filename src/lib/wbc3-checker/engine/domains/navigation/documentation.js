/**
 * Navigation Documentation Requirements
 * Generated from UK-MARITIME-LIBRARY/03-CSV-DATABASES/SEAGOING/domains/NAVIGATION_v1/DOCS.csv
 * THIS FILE USES ONLY THE CSV DATA - NO MADE UP REQUIREMENTS
 */

export function getNavigationDocumentationRequirements(vessel) {
  const requirements = [];
  
  // Only apply to seagoing vessels
  if (!vessel.operatingStatus || vessel.operatingStatus !== 'seagoing') {
    return requirements;
  }
  
  // Compass Deviation Card - WBC3 19.2.4 (MANDATORY)
  requirements.push({
    id: 'nav.doc.compass.deviation',
    name: 'Compass Deviation Card',
    category: 'Navigation Documentation',
    reference: 'WBC3 19.2.4',
    mandatory: true,
    description: 'Deviation card available at all times - must be current'
  });
  
  // Compass Deviation Record - WBC3 19.2.6 (MANDATORY)
  requirements.push({
    id: 'nav.doc.compass.record',
    name: 'Compass Deviation Record',
    category: 'Navigation Documentation',
    reference: 'WBC3 19.2.6',
    mandatory: true,
    description: 'Record of vessel compass deviations shall be maintained'
  });
  
  // Nautical Charts & Publications - WBC3 19.3.1 (MANDATORY except Cat 6)
  if (vessel.category !== 6) {
    requirements.push({
      id: 'nav.doc.charts',
      name: 'Nautical Charts',
      category: 'Navigation Documentation',
      reference: 'WBC3 19.3.1',
      mandatory: true,
      description: 'Charts and nautical publications shall be kept up to date and accessible'
    });
    
    requirements.push({
      id: 'nav.doc.publications',
      name: 'Nautical Publications',
      category: 'Navigation Documentation',
      reference: 'WBC3 19.3.1',
      mandatory: true,
      description: 'Charts and nautical publications shall be kept up to date and accessible'
    });
  }
  
  // Single-handed Voyage Plan - WBC3 26.2.3.4 (MANDATORY for single-handed)
  if (vessel.minCrew === 1 || vessel.pob === 1) {
    requirements.push({
      id: 'nav.doc.single.voyage',
      name: 'Single-handed Voyage Plan',
      category: 'Navigation Documentation',
      reference: 'WBC3 26.2.3.4',
      mandatory: true,
      description: 'Details of time/point of departure/voyage plan/ETA left with person ashore'
    });
  }
  
  // Police Passage Plan Communication - WBC3 Annex 3 17.3 (MANDATORY for police vessels)
  if (vessel.vesselType === 'police') {
    requirements.push({
      id: 'nav.doc.police.passage',
      name: 'Police Passage Plan Communication',
      category: 'Navigation Documentation',
      reference: 'WBC3 Annex 3 17.3',
      mandatory: true,
      description: 'Details of intended passage plan and number of persons communicated to shore'
    });
  }
  
  // Equipment Manuals - WBC3 19.1.1 (GUIDANCE/RECOMMENDED)
  requirements.push({
    id: 'nav.doc.manuals',
    name: 'Equipment Manuals',
    category: 'Navigation Documentation',
    reference: 'WBC3 19.1.1',
    mandatory: false,
    description: 'Manufacturer instructions for maintenance reference'
  });
  
  // Navigation Operations Manual - WBC3 Appendix 8 1.1.6 (SMS GUIDANCE)
  requirements.push({
    id: 'nav.doc.operations.manual',
    name: 'Navigation Operations Manual',
    category: 'Navigation Documentation',
    reference: 'WBC3 Appendix 8 1.1.6',
    mandatory: false,
    description: 'Procedures to ensure safe operation - passage planning, watch keeping, bridge procedures'
  });
  
  // Navigation Maintenance Procedures - WBC3 Appendix 8 1.1.9 (SMS GUIDANCE)
  requirements.push({
    id: 'nav.doc.maintenance.procedures',
    name: 'Navigation Maintenance Procedures',
    category: 'Navigation Documentation',
    reference: 'WBC3 Appendix 8 1.1.9',
    mandatory: false,
    description: 'Maintenance procedures for navigation equipment'
  });
  
  // Navigation Emergency Procedures - WBC3 Appendix 8 1.1.7 (SMS GUIDANCE)
  requirements.push({
    id: 'nav.doc.emergency.procedures',
    name: 'Navigation Emergency Procedures',
    category: 'Navigation Documentation',
    reference: 'WBC3 Appendix 8 1.1.7',
    mandatory: false,
    description: 'Response procedures for navigation failures - GPS, radar, compass failure'
  });
  
  return requirements;
}