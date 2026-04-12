/**
 * Main vessel requirements aggregator
 * Commercial-grade modular architecture
 * Each domain is in its own folder with files < 300 lines
 */

import { flattenVesselConfig } from './flattenInput.js';

// Basic requirements that apply to all vessels
import { 
  getBasicEquipmentRequirements,
  getBasicCertificatesRequirements,
  getBasicDocumentationRequirements
} from './domains/basic/index.js';

// FFE Domain - complete
import {
  getFFERequirements,
  getFFETrainingRequirements,
  getFFEProceduresRequirements,
  getFFECertificatesRequirements,
  getFFEDocumentationRequirements,
  getFFERiskAssessmentRequirements
} from './domains/ffe/index.js';

// Navigation Domain - complete
import {
  getNavigationRequirements,
  getNavigationDocumentationRequirements,
  getNavigationTrainingRequirements,
  getNavigationProceduresRequirements,
  getNavigationRiskAssessmentRequirements
} from './domains/navigation/index.js';

// GMDSS Domain - complete
import {
  getGMDSSRequirements,
  getGMDSSDocumentationRequirements,
  getGMDSSTrainingRequirements,
  getGMDSSProceduresRequirements
} from './domains/gmdss/index.js';

// LSA Domain - complete
import {
  getLSAEquipmentRequirements,
  getLSADocumentationRequirements,
  getLSADrillsRequirements
} from './domains/lsa/index.js';

// Electrical Domain - complete
import {
  getElectricalEquipmentRequirements,
  getElectricalDocumentationRequirements,
  getElectricalProceduresRequirements
} from './domains/electrical/index.js';

// Machinery Domain - complete
import {
  getMachineryEquipmentRequirements,
  getMachineryDocumentationRequirements
} from './domains/machinery/index.js';

// Medical Domain - complete
import {
  getMedicalEquipmentRequirements,
  getMedicalDocumentationRequirements,
  getMedicalCrewCertificationRequirements
} from './domains/medical/index.js';

// Environmental Domain - complete
import {
  getEnvironmentalEquipmentRequirements,
  getEnvironmentalDocumentationRequirements
} from './domains/environmental/index.js';

// Operations Domain - complete
import {
  getOperationsEquipmentRequirements,
  getOperationsDocumentationRequirements,
  getOperationsRiskAssessmentRequirements
} from './domains/operations/index.js';

// Battery requirements now distributed across electrical, ffe, and operations domains
// No separate battery domain needed - using proper WBC3 Annex 1 requirements

// Surveys Domain - complete
import {
  getSurveysDocumentationRequirements
} from './domains/surveys/index.js';

// Crew Domain - complete
import {
  getCrewDocumentationRequirements,
  getCrewCertificationRequirements
} from './domains/crew/index.js';

// Import stub functions from old file temporarily
// These will be refactored into their own domain modules
import {
  getTrainingRequirements,
  getRiskAssessmentRequirements
} from './tempStubs.js';

/**
 * Main function to get all vessel requirements
 * This is the public API that other modules use
 */
export function getHardcodedVesselRequirements(vesselConfig) {
  // Flatten the vessel configuration for consistent field names
  const vessel = flattenVesselConfig(vesselConfig);
  
  
  // === SELECTIVE ASSESSMENT FOR NON-SELF-PROPELLED PLATFORMS (WBC3 26.5.1.1) ===
  // Non-self-propelled platforms follow different regulatory framework
  if (vessel.vesselType === 'non_self_propelled' || vessel.baseCertificate === 'non_self_propelled') {

    // Return minimal platform-specific requirements only (15 items vs 50+ for manned vessels)
    return {
      basicEquipment: [
        {
          name: 'Emergency Towline (Pre-rigged)',
          description: 'Pre-rigged emergency towline suitable for continuing tow',
          reference: 'WBC3 Section 26.4.4',
          category: 'platform_safety',
          mandatory: true,
          type: 'equipment'
        },
        {
          name: 'Emergency Anchor and Cable',
          description: 'Anchor and cable suitable for holding tow in emergency',
          reference: 'WBC3 Section 26.4.4',
          category: 'platform_safety',
          mandatory: true,
          type: 'equipment'
        },
        {
          name: 'Emergency Lifebuoys with Lines (2)',
          description: 'Two lifebuoys with lines for emergency use',
          reference: 'WBC3 Section 26.4.4',
          category: 'platform_safety',
          mandatory: true,
          type: 'equipment'
        },
        {
          name: 'Forward End Marking (2000mm x 150mm white bars)',
          description: 'White bars clearly visible from towing vessel',
          reference: 'WBC3 Section 26.5.2.3',
          category: 'platform_marking',
          mandatory: true,
          type: 'equipment'
        },
        {
          name: 'Load Line Marking (excluding draught marks)',
          description: 'Load line marking per Section 13.3',
          reference: 'WBC3 Section 26.5.2.2',
          category: 'platform_marking',
          mandatory: true,
          type: 'equipment'
        }
      ],
      basicCertificates: [
        {
          name: 'Non-Self-Propelled Workboat Certificate',
          description: 'Workboat Certificate for unmanned platform assessed for appropriate WBC3 parts',
          reference: 'WBC3 Section 26.5.1.1',
          category: 'platform_certification',
          mandatory: true,
          type: 'certificate'
        },
        {
          name: 'Load Line Certificate or Exemption',
          description: 'Conditional Load Line or Load Line Exemption Certificate for towed voyage',
          reference: 'WBC3 Section 26.4.1',
          category: 'platform_certification',
          mandatory: true,
          type: 'certificate'
        }
      ],
      basicDocumentation: [
        {
          name: 'Platform Stability Assessment',
          description: 'Stability assessment for platform with suitable margin of safety for towing',
          reference: 'WBC3 Section 26.4.6',
          category: 'platform_assessment',
          mandatory: true,
          type: 'documentation'
        },
        {
          name: 'Selective WBC3 Assessment',
          description: 'Assessment determining appropriate parts of WBC3 for commercial operation',
          reference: 'WBC3 Section 26.5.1.1',
          category: 'platform_assessment',
          mandatory: true,
          type: 'documentation'
        },
        {
          name: 'Towing Safety Procedures',
          description: 'Documented procedures for towing operations and emergency response',
          reference: 'WBC3 Section 26.3',
          category: 'platform_procedures',
          mandatory: true,
          type: 'documentation'
        },
        {
          name: 'Towing Risk Assessment',
          description: 'Risk assessment for towing operations covering platform-specific hazards',
          reference: 'WBC3 Section 26.3',
          category: 'platform_procedures',
          mandatory: true,
          type: 'documentation'
        }
      ],
      // Platform-specific maintenance tasks
      riskAssessments: [
        {
          name: 'Platform Towing Operations Risk Assessment',
          description: 'Risk assessment covering platform-specific towing hazards and emergency procedures',
          reference: 'WBC3 Section 26.3',
          category: 'platform_operations',
          mandatory: true,
          type: 'risk_assessment'
        }
      ],
      // No universal equipment, training, procedures, or manned vessel requirements
      equipment: [], // No universal LSA, FFE, navigation, GMDSS for unmanned platforms
      training: [], // No crew training for unmanned platforms
      procedures: [], // No universal procedures for unmanned platforms
      certificates: [], // No crew certificates for unmanned platforms
      assessments: [], // No operational assessments for unmanned platforms
      restrictions: [
        {
          name: 'No Crew Requirements',
          description: 'Unmanned platform - no familiarisation, STCW certificates, or hours of rest required',
          reference: 'WBC3 Section 26.5.1.1',
          category: 'platform_restriction'
        },
        {
          name: 'No Universal WBC3 Requirements',
          description: 'Universal manned vessel requirements do not apply to unmanned working platforms',
          reference: 'WBC3 Section 26.5.1.1',
          category: 'platform_restriction'
        },
        {
          name: 'Towing Vessel Required',
          description: 'Platform must be towed by properly certificated towing vessel',
          reference: 'WBC3 Section 26.4',
          category: 'platform_restriction'
        }
      ],
      documentation: [], // Covered in basicDocumentation
      areaCategoryEquipment: [], // No navigation equipment for unmanned platforms
      crewCertificationByArea: [] // No crew for unmanned platforms
    };
  }
  
  // Initialize requirements structure
  const requirements = {
    basicEquipment: [],
    basicCertificates: [],
    basicDocumentation: [],
    riskAssessments: [],
    equipment: [],
    training: [],
    procedures: [],
    certificates: [],
    assessments: [],
    restrictions: [],
    documentation: [],
    areaCategoryEquipment: [],
    crewCertificationByArea: []
  };

  // Basic requirements (ALL vessels)
  requirements.basicEquipment = getBasicEquipmentRequirements(vessel);
  requirements.basicCertificates = getBasicCertificatesRequirements(vessel);
  requirements.basicDocumentation = getBasicDocumentationRequirements(vessel);
  
  // Conditional equipment requirements from all domains
  requirements.equipment = [
    ...getFFERequirements(vessel),
    ...getGMDSSRequirements(vessel),
    ...getLSAEquipmentRequirements(vessel),  // Only LSA equipment, not training/docs
    ...getElectricalEquipmentRequirements(vessel),
    ...getMachineryEquipmentRequirements(vessel),
    // Battery requirements now properly distributed across electrical/ffe/operations domains
    ...getMedicalEquipmentRequirements(vessel),
    ...getEnvironmentalEquipmentRequirements(vessel),
    ...getOperationsEquipmentRequirements(vessel)
  ];
  
  // Area category specific navigation equipment
  requirements.areaCategoryEquipment = getNavigationRequirements(vessel);
  
  // Training requirements - includes FFE, Navigation, GMDSS training
  // LSA drills are included in procedures section below
  requirements.training = [
    ...getTrainingRequirements(vessel),
    ...getFFETrainingRequirements(vessel),
    ...getNavigationTrainingRequirements(vessel),
    ...getGMDSSTrainingRequirements(vessel)
  ];
  
  // Risk assessments - includes general, FFE, Navigation, and Operations risk assessments
  requirements.riskAssessments = [
    ...getRiskAssessmentRequirements(vessel),
    ...getFFERiskAssessmentRequirements(vessel),
    ...getNavigationRiskAssessmentRequirements(vessel),
    ...getOperationsRiskAssessmentRequirements(vessel)
  ];
  
  // Procedures - includes FFE, Navigation, GMDSS, Electrical procedures, and LSA drills
  requirements.procedures = [
    ...getFFEProceduresRequirements(vessel),
    ...getNavigationProceduresRequirements(vessel),
    ...getGMDSSProceduresRequirements(vessel),
    ...getElectricalProceduresRequirements(vessel),
    ...getLSADrillsRequirements(vessel)
  ];
  
  // Certificates - includes FFE service records  
  requirements.certificates = getFFECertificatesRequirements(vessel);
  
  // Documentation - includes FFE, Navigation, GMDSS, Electrical, Machinery, Medical, Environmental, Operations, LSA, Surveys, and Crew documentation
  requirements.documentation = [
    ...getFFEDocumentationRequirements(vessel),
    ...getNavigationDocumentationRequirements(vessel),
    ...getGMDSSDocumentationRequirements(vessel),
    ...getElectricalDocumentationRequirements(vessel),
    ...getMachineryDocumentationRequirements(vessel),
    ...getMedicalDocumentationRequirements(vessel),
    ...getEnvironmentalDocumentationRequirements(vessel),
    ...getOperationsDocumentationRequirements(vessel),
    ...getLSADocumentationRequirements(vessel),
    ...getSurveysDocumentationRequirements(vessel),
    ...getCrewDocumentationRequirements(vessel)
  ];
  
  // Assessments and surveys - now using stub as assessments, surveys moved to documentation
  requirements.assessments = [];
  
  // Crew certification requirements by area - includes medical and crew training certificates
  requirements.crewCertificationByArea = [
    ...getMedicalCrewCertificationRequirements(vessel),
    ...getCrewCertificationRequirements(vessel)
  ];
  
  return requirements;
}

