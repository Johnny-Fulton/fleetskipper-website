/**
 * Navigation Procedures Requirements
 * Generated from UK-MARITIME-LIBRARY/03-CSV-DATABASES/SEAGOING/domains/NAVIGATION_v1/DOCS.csv
 * 
 * Most procedures are GUIDANCE/RECOMMENDED items.
 * Police vessels have specific MANDATORY procedures per WBC3 Annex 3.
 */

export function getNavigationProceduresRequirements(vessel) {
  const requirements = [];
  
  // Police vessel mandatory passage plan communication
  if (vessel.vesselType === 'police' || vessel.type === 'police') {
    requirements.push({
      id: 'nav.doc.police.passage',
      name: 'Police Passage Plan Communication',
      category: 'Navigation Procedures',
      reference: 'WBC3 Annex 3 17.3',
      mandatory: true,
      description: 'Details of intended passage plan and number of persons on board communicated to police rep and coastguard/control room before departure'
    });
  }
  
  return requirements;
}