/**
 * FFE Certificates Requirements
 * Fire equipment service records and certifications
 */

export function getFFECertificatesRequirements(vessel) {
  const requirements = [];
  
  if (vessel.operatingStatus === 'seagoing') {
    // Fixed System Service Records
    if (vessel.hasFixedFireSystem) {
      requirements.push({
        id: 'ffe_doc_fixed_service',
        name: 'Fixed System Service Records',
        category: 'FFE Certificates',
        reference: 'WBC3 16.4.1.2',
        mandatory: true,
        description: 'Annual service documentation - service certificates required, serviced at minimum on an annual interval'
      });
    }
    
    // Extinguisher Service Records
    requirements.push({
      id: 'ffe_doc_extinguisher_service',
      name: 'Extinguisher Service Records',
      category: 'FFE Certificates',
      reference: 'WBC3 16.3.1.8/MGN 276',
      mandatory: true,
      description: 'Evidence of servicing by competent person - annual service per MGN 276'
    });
  }
  
  return requirements;
}