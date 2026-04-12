/**
 * Machinery Documentation Requirements
 * Generated from UK-MARITIME-LIBRARY/03-CSV-DATABASES/SEAGOING/domains/MACHINERY_v1/DOCS.csv
 * THIS FILE USES ONLY THE CSV DATA - NO MADE UP REQUIREMENTS
 * Following anchor mode pattern
 */

export function getMachineryDocumentationRequirements(vessel) {
  const requirements = [];
  
  // Only apply to seagoing vessels
  if (!vessel.operatingStatus || vessel.operatingStatus !== 'seagoing') {
    return requirements;
  }
  
  // ===== ENGINE DOCUMENTATION =====
  // From CSV rows 7-8
  
  // Engine operation manual - MANDATORY
  requirements.push({
    id: 'machinery.doc.engine.manual',
    name: 'Engine operation manual',
    category: 'Machinery Documentation',
    reference: 'WBC3 3.5.2',
    mandatory: true,
    description: 'Maintained in accordance with manufacturer\'s recommendations or best engineering practice'
  });
  
  // Engine maintenance manual - MANDATORY
  requirements.push({
    id: 'machinery.doc.engine.maint',
    name: 'Engine maintenance manual',
    category: 'Machinery Documentation',
    reference: 'WBC3 3.5.2',
    mandatory: true,
    description: 'Service intervals and procedures'
  });
  
  // ===== SMS PROCEDURES =====
  // From CSV rows 9-12
  
  // SMS machinery operation procedures - MANDATORY
  requirements.push({
    id: 'machinery.doc.sms.operation',
    name: 'SMS machinery operation procedures',
    category: 'Machinery Documentation',
    reference: 'WBC3 Appendix 8 1.1.6',
    mandatory: true,
    description: 'Procedures to ensure safe operation of a vessel - Engine start/stop/emergency procedures'
  });
  
  // SMS machinery maintenance procedures - MANDATORY
  requirements.push({
    id: 'machinery.doc.sms.maintenance',
    name: 'SMS machinery maintenance procedures',
    category: 'Machinery Documentation',
    reference: 'WBC3 Appendix 8 1.1.9',
    mandatory: true,
    description: 'Maintenance of the vessel and equipment - Planned maintenance system for machinery'
  });
  
  // SMS fuel handling procedures - MANDATORY
  requirements.push({
    id: 'machinery.doc.sms.fuel',
    name: 'SMS fuel handling procedures',
    category: 'Machinery Documentation',
    reference: 'WBC3 Appendix 8 1.1.6',
    mandatory: true,
    description: 'Procedures to ensure safe operation - Bunkering and fuel transfer procedures'
  });
  
  // SMS emergency steering procedures - for remote control vessels
  if (vessel.steeringControlType === 'electronic' || vessel.steeringType === 'remote') {
    requirements.push({
      id: 'machinery.doc.sms.emergency.steering',
      name: 'SMS emergency steering procedures',
      category: 'Machinery Documentation',
      reference: 'WBC3 Appendix 8 1.1.7',
      mandatory: true,
      description: 'Emergencies - Emergency steering drill procedures'
    });
  }
  
  // ===== MAINTENANCE RECORDS =====
  // From CSV rows 13-14
  
  // Engine maintenance log - MANDATORY
  requirements.push({
    id: 'machinery.doc.engine.log',
    name: 'Engine maintenance log',
    category: 'Machinery Documentation',
    reference: 'WBC3 3.5.3',
    mandatory: true,
    description: 'Ongoing maintenance and inspection regime - Record of all maintenance performed'
  });
  
  // Propeller shaft examination record - for pilot boats
  if (vessel.vesselType === 'pilot' || vessel.type === 'pilot' || vessel.hasWorkboatPilotEndorsement) {
    requirements.push({
      id: 'machinery.doc.shaft.record',
      name: 'Propeller shaft examination record',
      category: 'Machinery Documentation',
      reference: 'WBC3 4.10.1',
      mandatory: true,
      description: 'Drawn for examination - Certificate from authorised person'
    });
  }
  
  // ===== TECHNICAL DIAGRAMS =====
  // From CSV rows 15-16
  
  // Fuel system diagram - for machinery spaces
  if (vessel.hasMachinerySpace || vessel.hasEnclosedSpaces) {
    requirements.push({
      id: 'machinery.doc.fuel.diagram',
      name: 'Fuel system diagram',
      category: 'Machinery Documentation',
      reference: 'WBC3 8.10',
      mandatory: true,
      description: 'Installation - Shows tanks/pipes/isolation valves'
    });
  }
  
  // Bilge pumping arrangement - MANDATORY
  requirements.push({
    id: 'machinery.doc.bilge.diagram',
    name: 'Bilge pumping arrangement',
    category: 'Machinery Documentation',
    reference: 'WBC3 11.1.9',
    mandatory: true,
    description: 'Full information on the bilge pumping system - Shows pump locations and piping'
  });
  
  // ===== SYSTEM MANUALS =====
  // From CSV row 17
  
  // Steering system manual - MANDATORY
  requirements.push({
    id: 'machinery.doc.steering.manual',
    name: 'Steering system manual',
    category: 'Machinery Documentation',
    reference: 'WBC3 10.2.2',
    mandatory: true,
    description: 'Comply with an appropriate standard - Manufacturer\'s instructions'
  });
  
  // ===== ELECTRICAL DOCUMENTATION =====
  // From CSV row 18
  
  // Battery installation certificate - for electric start
  if (vessel.engineStartMethod === 'electric' || vessel.engineType === 'diesel') {
    requirements.push({
      id: 'machinery.doc.battery.cert',
      name: 'Battery installation certificate',
      category: 'Machinery Documentation',
      reference: 'WBC3 9.3.2',
      mandatory: true,
      description: 'Battery installations - Installation to appropriate standard'
    });
  }
  
  // ===== VENTILATION DOCUMENTATION =====
  // From CSV row 19
  
  // Machinery space ventilation plan - for machinery spaces
  if (vessel.hasMachinerySpace || vessel.hasEnclosedSpaces) {
    requirements.push({
      id: 'machinery.doc.ventilation.plan',
      name: 'Machinery space ventilation plan',
      category: 'Machinery Documentation',
      reference: 'WBC3 15.1.1.4',
      mandatory: true,
      description: 'Fans within machinery space(s) - Shows fan locations and remote stops'
    });
  }
  
  // ===== PILOT BOAT SPECIFIC =====
  // From CSV row 20
  
  // Oil analysis records - for pilot boats with oil lubricated shaft
  if ((vessel.vesselType === 'pilot' || vessel.type === 'pilot' || vessel.hasWorkboatPilotEndorsement) && vessel.hasOilLubricatedShaft) {
    requirements.push({
      id: 'machinery.doc.pilot.oil.analysis',
      name: 'Oil analysis records',
      category: 'Machinery Documentation',
      reference: 'WBC3 4.10.3',
      mandatory: true,
      description: 'Annual oil analysis or similar testing records - Demonstrate insignificant wear'
    });
  }
  
  // ===== RECOMMENDED DOCUMENTATION =====
  // From CSV row 21
  
  // Pre-departure machinery checklist - RECOMMENDED
  requirements.push({
    id: 'machinery.doc.predeparture.checklist',
    name: 'Pre-departure machinery checklist',
    category: 'Machinery Documentation',
    reference: 'Good practice',
    mandatory: false, // RECOMMENDED classification
    description: 'Engine/bilge/steering/fuel checks'
  });
  
  return requirements;
}