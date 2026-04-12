/**
 * Navigation Risk Assessment Requirements
 * Extracted from UK-MARITIME-LIBRARY/03-CSV-DATABASES/SEAGOING/domains/NAVIGATION_v1/DOCS.csv
 * Contains risk assessments that were missing from initial domain extraction
 */

export function getNavigationRiskAssessmentRequirements(vessel) {
  const requirements = [];
  
  if (vessel.operatingStatus === 'seagoing') {
    // Navigation Operational Risk Assessment
    requirements.push({
      id: 'nav.doc.ra.operations',
      name: 'Navigation Operational Risk Assessment',
      category: 'Navigation Risk Assessment',
      reference: 'WBC3 Appendix 8 3.1',
      mandatory: false,
      description: 'Risk assessment for navigation operations - should include equipment failure risks, collision risks, grounding risks, weather navigation risks'
    });
    
    // Radar Operations Risk Assessment
    if (vessel.hasRadar || vessel.equipment?.includes('radar')) {
      requirements.push({
        id: 'nav.doc.ra.radar',
        name: 'Radar Operations Risk Assessment',
        category: 'Navigation Risk Assessment',
        reference: 'WBC3 Appendix 8 3.1',
        mandatory: false,
        description: 'Risk assessment for radar use - should include over-reliance risks, interpretation errors, failure modes, blind sectors'
      });
    }
    
    // Electronic Chart Risk Assessment
    if (vessel.hasECS || vessel.equipment?.includes('ecs')) {
      requirements.push({
        id: 'nav.doc.ra.ecs',
        name: 'Electronic Chart Risk Assessment',
        category: 'Navigation Risk Assessment',
        reference: 'WBC3 Appendix 8 3.1',
        mandatory: false,
        description: 'Risk assessment for electronic charts - should include system failure, data currency, over-reliance, backup procedures'
      });
    }
    
    // Single-handed Operations Risk Assessment
    if (vessel.minCrew === 1 || vessel.pob === 1) {
      requirements.push({
        id: 'nav.doc.ra.single',
        name: 'Single-handed Operations Risk Assessment',
        category: 'Navigation Risk Assessment',
        reference: 'WBC3 Appendix 8 3.1',
        mandatory: false,
        description: 'Risk assessment for single-handed operations - should include fatigue, emergency response, watch keeping, communication'
      });
    }
  }
  
  return requirements;
}