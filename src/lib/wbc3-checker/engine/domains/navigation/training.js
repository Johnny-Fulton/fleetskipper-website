/**
 * Navigation Training Requirements
 * Generated from UK-MARITIME-LIBRARY/03-CSV-DATABASES/SEAGOING/domains/NAVIGATION_v1/DOCS.csv
 * THIS FILE USES ONLY THE CSV DATA - NO MADE UP REQUIREMENTS
 */

import { parseCategory } from '../../categoryHelpers.js';

export function getNavigationTrainingRequirements(vessel) {
  const requirements = [];
  const category = parseCategory(vessel.category);
  
  // Only apply to seagoing vessels
  if (!vessel.operatingStatus || vessel.operatingStatus !== 'seagoing') {
    return requirements;
  }
  
  // Radar Training Certificates - WBC3 28.1.4/Table A5.3 (MANDATORY if has radar)
  if (vessel.hasRadar || category <= 2) { // Cat 0-2 has mandatory radar
    requirements.push({
      id: 'nav.doc.training.radar',
      name: 'Radar Training Certificates',
      category: 'Navigation Training',
      reference: 'WBC3 28.1.4/Table A5.3',
      mandatory: true,
      description: 'All Masters and crew likely to use radar - MCA approved Small Ships Navigation and Radar course'
    });
  }
  
  // ECS Training Certificates - WBC3 28.1.4/Table A5.3 (MANDATORY if has ECS)
  if (vessel.hasECS || vessel.hasECDIS) {
    requirements.push({
      id: 'nav.doc.training.ecs',
      name: 'ECS Training Certificates',
      category: 'Navigation Training',
      reference: 'WBC3 28.1.4/Table A5.3',
      mandatory: true,
      description: 'All Masters and crew responsible for navigational watch - MCA approved ECS and Bridge Watchkeeping course'
    });
  }
  
  // Stability Training Certificate - WBC3 28.1.4/Table A5.3 (MANDATORY if has stability booklet)
  if (vessel.hasStabilityBooklet) {
    requirements.push({
      id: 'nav.doc.training.stability',
      name: 'Stability Training Certificate',
      category: 'Navigation Training',
      reference: 'WBC3 28.1.4/Table A5.3',
      mandatory: true,
      description: 'As a minimum the Master shall complete an MCA approved 1 day stability course'
    });
  }
  
  return requirements;
}