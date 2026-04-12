/**
 * Basic Requirements Domain
 * Requirements that apply to ALL vessels regardless of configuration
 */

import { parseCategory } from '../../categoryHelpers.js';

/**
 * Get basic equipment requirements (ALL vessels)
 */
export function getBasicEquipmentRequirements(vessel) {
  const requirements = [];
  const category = parseCategory(vessel.category);
  
  // Only apply to seagoing vessels
  if (!vessel.operatingStatus || vessel.operatingStatus !== 'seagoing') {
    return requirements;
  }
  
  // ===== COMMUNICATIONS (ALL VESSELS) =====
  
  // Portable VHF DSC Radio - ALL seagoing vessels
  // From Table 17.2.1 - Required for ALL categories (0-6) in ALL sea areas
  // This is the ONLY VHF requirement that applies to every single vessel
  requirements.push({
    id: 'gmdss.vhf.portable.dsc',
    name: 'Portable VHF DSC Radio',
    category: 'Communications',
    reference: 'WBC3 17.4.1 / Table 17.2.1',
    mandatory: true,
    description: 'ALL vessels must carry at least one portable VHF radio fitted with DSC'
  });
  
  // ===== NAVIGATION EQUIPMENT (ALL SEAGOING VESSELS) =====
  // From UK-MARITIME-LIBRARY/03-CSV-DATABASES/SEAGOING/domains/NAVIGATION_v1/EQUIPMENT_REGISTER.csv
  
  // Magnetic Compass - WBC3 19.2.1
  requirements.push({
    id: 'nav.compass.magnetic',
    name: 'Magnetic Compass',
    category: 'Navigation',
    reference: 'WBC3 19.2.1',
    mandatory: true,
    description: 'Fitted with a properly adjusted suitable magnetic marine compass'
  });
  
  // Bearing Equipment - WBC3 19.2.3.2
  requirements.push({
    id: 'nav.compass.bearing',
    name: 'Bearing Equipment',
    category: 'Navigation',
    reference: 'WBC3 19.2.3.2/footnote 73',
    mandatory: true,
    description: 'Means for taking bearings - pelorus or hand bearing compass'
  });
  
  // Signalling Lamp - WBC3 19.4.1
  requirements.push({
    id: 'nav.lamp.signalling',
    name: 'Signalling Lamp',
    category: 'Navigation',
    reference: 'WBC3 19.4.1',
    mandatory: true,
    description: 'Equipped with a waterproof electric lamp suitable for signalling'
  });
  
  // Echo Sounder - WBC3 19.5.1
  requirements.push({
    id: 'nav.echo.sounder',
    name: 'Echo Sounder',
    category: 'Navigation',
    reference: 'WBC3 19.5.1',
    mandatory: true,
    description: 'Fitted with an echo sounder or other effective means'
  });
  
  // Navigation Lights - WBC3 18.1
  requirements.push({
    id: 'nav.lights',
    name: 'Navigation Lights',
    category: 'Navigation',
    reference: 'WBC3 18.1/SI 1996 No.75',
    mandatory: true,
    description: 'Comply with requirements of SI 1996 No. 75 (COLREGS)'
  });
  
  // Day Shapes - WBC3 18.1
  requirements.push({
    id: 'nav.shapes.day',
    name: 'Day Shapes',
    category: 'Navigation',
    reference: 'WBC3 18.1/Table 18.4',
    mandatory: true,
    description: 'Day shapes as per COLREGS (anchor, NUC, etc.)'
  });
  
  // Sound Signals - WBC3 18.3
  requirements.push({
    id: 'nav.sound.signal',
    name: 'Sound Signals',
    category: 'Navigation',
    reference: 'WBC3 18.3/Table 18.4',
    mandatory: true,
    description: 'Means of making an efficient sound signal (whistle/bell per size)'
  });
  
  // Nautical Charts - WBC3 19.3.1 (All except Cat 6)
  if (category !== 6) {
    requirements.push({
      id: 'nav.charts',
      name: 'Nautical Charts',
      category: 'Navigation',
      reference: 'WBC3 19.3.1',
      mandatory: true,
      description: 'Charts and nautical publications shall be kept up to date'
    });
    
    requirements.push({
      id: 'nav.publications.nautical',
      name: 'Nautical Publications',
      category: 'Navigation',
      reference: 'WBC3 19.3.1',
      mandatory: true,
      description: 'Charts and nautical publications shall be kept up to date'
    });
  }
  
  // ===== LSA EQUIPMENT (ALL VESSELS) =====
  requirements.push({
    id: 'basic_lifejackets',
    name: 'Personal Flotation Devices',
    category: 'LSA',
    reference: 'WBC3 14.4',
    mandatory: true,
    description: 'Sufficient lifejackets for all persons on board'
  });
  
  requirements.push({
    id: 'basic_lifebuoy',
    name: 'Lifebuoys',
    category: 'LSA',
    reference: 'WBC3 14.3',
    mandatory: true,
    description: 'At least 1 lifebuoy with light and line'
  });
  
  return requirements;
}

/**
 * Get basic certificates requirements (ALL crew)
 */
export function getBasicCertificatesRequirements(vessel) {
  const requirements = [
    {
      id: 'cert_medical',
      name: 'Medical Certificate',
      category: 'Crew Certification',
      reference: 'MGN 640',
      mandatory: true,
      description: 'Valid medical certificate for all crew'
    },
    {
      id: 'cert_competency',
      name: 'Certificate of Competency',
      category: 'Crew Certification',
      reference: 'MSN 1856',
      mandatory: true,
      description: 'Appropriate CoC for vessel type and area'
    }
  ];
  
  // FFE Training Certificates (from DOCS.csv)
  if (vessel.operatingStatus === 'seagoing') {
    // Fire Fighting Training for vessels <15m (minimum one crew member)
    if (vessel.lengthOverall < 15) {
      requirements.push({
        id: 'ffe_cert_firefighting_small',
        name: 'Fire Fighting Training Certificate (<15m)',
        category: 'FFE Training',
        reference: 'WBC3 28.1.4/Table A5.3',
        mandatory: true,
        description: 'Minimum one crew member shall complete an MCA approved one day fire fighting course'
      });
    }
    
    // Fire Fighting Training for vessels ≥15m (all crew members)
    if (vessel.lengthOverall >= 15) {
      requirements.push({
        id: 'ffe_cert_firefighting_large',
        name: 'Fire Fighting Training Certificate (≥15m)',
        category: 'FFE Training',
        reference: 'WBC3 28.1.4/Table A5.3',
        mandatory: true,
        description: 'All crew members shall complete an MCA approved one day fire fighting course'
      });
    }
    
    // Police vessel alternative training
    if (vessel.vesselType === 'police' || vessel.type === 'police') {
      requirements.push({
        id: 'ffe_cert_police_firefighting',
        name: 'Police Fire Fighting Training Certification',
        category: 'FFE Training',
        reference: 'WBC3 Annex 3 18.5',
        mandatory: true,
        description: 'Police-specific fire training or equivalent as alternative to Table A5.3 training'
      });
    }
  }
  
  return requirements;
}

/**
 * Get basic documentation requirements (ALL vessels)
 */
export function getBasicDocumentationRequirements(vessel) {
  const requirements = [
    {
      id: 'doc_wbc_cert',
      name: 'UK Workboat Code Certificate',
      category: 'Vessel Certificate',
      reference: 'WBC3',
      mandatory: true,
      description: 'Valid WBC3 certificate for commercial operation'
    },
    {
      id: 'doc_radio_licence',
      name: 'Ship Radio Licence',
      category: 'Documentation',
      reference: 'WT Act 2006',
      mandatory: true,
      description: 'Radio licence for VHF equipment'
    },
    {
      id: 'doc_insurance',
      name: 'Insurance Certificate',
      category: 'Documentation',
      reference: 'WBC3 24.1',
      mandatory: true,
      description: 'Valid insurance covering commercial operations'
    }
  ];
  
  // FFE Mandatory Documentation (from DOCS.csv)
  if (vessel.operatingStatus === 'seagoing') {
    // Fire Control Plan - mandatory for all seagoing vessels
    requirements.push({
      id: 'ffe_doc_fire_control_plan',
      name: 'Fire Control Plan',
      category: 'FFE Documentation',
      reference: 'WBC3 15.8.3',
      mandatory: true,
      description: 'Fire control and safety plan(s) shall be kept up to date and accessible'
    });
    
    // Crew Fire Safety Familiarisation Records
    requirements.push({
      id: 'ffe_doc_training_familiarisation',
      name: 'Crew Fire Safety Familiarisation Records',
      category: 'FFE Training',
      reference: 'WBC3 14.11.3',
      mandatory: true,
      description: 'Records of familiarisation training for all crew on Life-Saving Appliances and emergency procedures'
    });
    
    // Fire Drill Records for vessels with log book
    if (vessel.grossTonnage > 25) {
      requirements.push({
        id: 'ffe_doc_drill_log',
        name: 'Fire Drill and Training Log',
        category: 'FFE Records',
        reference: 'SI 1999/2722 Reg 13',
        mandatory: true,
        description: 'Record of all drills and training in Official Log Book - must record date and details'
      });
    } else {
      // Fire Drill Records for smaller vessels
      requirements.push({
        id: 'ffe_doc_drill_record_small',
        name: 'Fire Drill Records (Small Vessels)',
        category: 'FFE Records',
        reference: 'SI 1999/2722 Reg 13(2)',
        mandatory: true,
        description: 'Written drill records for vessels without log book - retained not less than 12 months'
      });
    }
  }
  
  return requirements;
}