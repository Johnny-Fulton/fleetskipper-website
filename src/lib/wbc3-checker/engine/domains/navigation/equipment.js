/**
 * Navigation Equipment Requirements
 * Generated from UK-MARITIME-LIBRARY/03-CSV-DATABASES/SEAGOING/domains/NAVIGATION_v1/EQUIPMENT_REGISTER.csv
 * THIS FILE USES ONLY THE CSV DATA - NO MADE UP REQUIREMENTS
 *
 * This file returns ONLY category-specific navigation equipment.
 * Basic navigation equipment that applies to ALL vessels is in basic/index.js
 */

import { parseCategory } from '../../categoryHelpers.js';

export function getNavigationEquipmentRequirements(vessel) {
  const requirements = [];
  const category = parseCategory(vessel.category);
  
  // Non-self-propelled platforms follow selective assessment (WBC3 26.5.1.1) - no navigation equipment for towed platforms
  if (vessel.vesselType === 'non_self_propelled' || vessel.baseCertificate === 'non_self_propelled') {

    return requirements; // No GPS, compass, radar, or navigation equipment for towed platforms
  }
  
  // Only apply to seagoing vessels
  if (!vessel.operatingStatus || vessel.operatingStatus !== 'seagoing') {
    return requirements;
  }
  
  // ===== CATEGORY-SPECIFIC EQUIPMENT =====

  // Compass Light - WBC3 19.2.7 (Category specific: 0, 1, 2, 3, 5) OR Police boats at night
  if (category <= 3 || category === 5 ||
      ((vessel.vesselType === 'police' || vessel.type === 'police') && vessel.operatesAtNight)) {
    requirements.push({
      id: 'nav.compass.light',
      name: 'Compass Light',
      category: 'Navigation',
      reference: 'WBC3 19.2.7; Annex 3 13.1.1',
      mandatory: true,
      description: vessel.vesselType === 'police' ? 
        'Police boat operating outside hours of daylight' : 
        'Area category 0, 1, 2, 3 or 5'
    });
  }
  
  // Radar Reflector - WBC3 19.6.1 (All except Cat 6)
  if (category !== 6) {
    requirements.push({
      id: 'nav.radar.reflector',
      name: 'Radar Reflector',
      category: 'Navigation',
      reference: 'WBC3 19.6.1',
      mandatory: true,
      description: 'Provided with a radar reflector of an appropriate standard'
    });
  }
  
  // ===== CATEGORY 0-2 ADVANCED EQUIPMENT =====
  if (category <= 2) {
    // GPS/GNSS - WBC3 19.7.1.1
    requirements.push({
      id: 'nav.gps',
      name: 'GPS/GNSS',
      category: 'Navigation',
      reference: 'WBC3 19.7.1.1',
      mandatory: true,
      description: 'Electronic position fixing system GPS'
    });
    
    // Distance Log - WBC3 19.7.1.2 (unless GPS provides)
    if (!vessel.gpsProvideDistance) {
      requirements.push({
        id: 'nav.log.distance',
        name: 'Distance Log',
        category: 'Navigation',
        reference: 'WBC3 19.7.1.2',
        mandatory: true,
        description: 'Distance measuring log (unless GPS provides)'
      });
    }
    
    // 3cm Radar - WBC3 19.7.1.3
    requirements.push({
      id: 'nav.radar.3cm',
      name: '3cm Radar',
      category: 'Navigation',
      reference: 'WBC3 19.7.1.3',
      mandatory: true,
      description: '3 cm radar of an appropriate standard'
    });
    
    // AIS Transceiver - WBC3 19.7.1.4
    requirements.push({
      id: 'nav.ais.transceiver',
      name: 'AIS Transceiver',
      category: 'Navigation',
      reference: 'WBC3 19.7.1.4',
      mandatory: true,
      description: 'Suitable Automatic Identification System (AIS) transceiver'
    });
  }
  
  // ===== OPTIONAL EQUIPMENT (Based on configuration) =====
  
  // ECDIS (optional alternative to paper charts)
  if (vessel.hasECDIS && !vessel.hasPaperCharts) {
    requirements.push({
      id: 'nav.ecdis',
      name: 'ECDIS',
      category: 'Navigation',
      reference: 'WBC3 19.3.4/MGN 319',
      mandatory: false,
      description: 'ECDIS may be accepted as alternative to paper charts'
    });
  }
  
  // ===== POLICE VESSEL SPECIFIC =====
  
  // Police boat barometer - WBC3 Annex 3 13.4.1
  if (vessel.vesselType === 'police' || vessel.type === 'police') {
    requirements.push({
      id: 'nav.barometer.police',
      name: 'Barometer (Police Boat)',
      category: 'Navigation',
      reference: 'WBC3 Annex 3 13.4.1',
      mandatory: true,
      description: 'An aneroid barometer shall be carried for weather monitoring'
    });
  }
  
  // Police vessel electronic publications alternative
  if ((vessel.vesselType === 'police' || vessel.type === 'police') && 
      vessel.hasElectronicPubs && !vessel.hasPaperPubs) {
    requirements.push({
      id: 'nav.publications.police.alternative',
      name: 'Publications Alternative (Police)',
      category: 'Navigation',
      reference: 'WBC3 Annex 3 13.2.1',
      mandatory: false,
      description: 'MAY be carried as electronic copy in ruggedised device'
    });
  }
  
  // Police vessel Cat 5 radar reflector exemption (informational)
  if ((vessel.vesselType === 'police' || vessel.type === 'police') &&
      category === 5 && !vessel.hasRadarReflector && vessel.favourableWeatherOnly) {
    requirements.push({
      id: 'nav.radar.reflector.police.cat5',
      name: 'Radar Reflector Exemption (Police Cat 5)',
      category: 'Navigation',
      reference: 'WBC3 Annex 3 13.3.1',
      mandatory: false,
      description: 'Cat 5 not fitted...only operate in favourable weather'
    });
  }
  
  return requirements;
}