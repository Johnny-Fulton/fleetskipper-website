/**
 * FFE Documentation Requirements
 * Fire safety documentation and record keeping
 */

export function getFFEDocumentationRequirements(vessel) {
  const requirements = [];
  
  if (vessel.operatingStatus === 'seagoing') {
    // FFE Maintenance Log
    requirements.push({
      id: 'ffe_doc_log_maintenance',
      name: 'FFE Maintenance Log',
      category: 'FFE Documentation',
      reference: 'WBC3 3.5/SMS',
      mandatory: false,
      description: 'Record of fire equipment maintenance - app maintains automatically, good practice for SMS audit'
    });
    
    // Extinguisher Location Plan (for larger vessels)
    if (vessel.pob > 25 || vessel.lengthOverall > 24) {
      requirements.push({
        id: 'ffe_doc_extinguisher_locations',
        name: 'Extinguisher Location Plan',
        category: 'FFE Documentation',
        reference: 'Good practice',
        mandatory: false,
        description: 'Plan showing extinguisher locations - helps crew locate equipment quickly, good practice for larger vessels'
      });
    }
    
    // Fire Equipment Register
    requirements.push({
      id: 'ffe_doc_equipment_register',
      name: 'Fire Equipment Register',
      category: 'FFE Documentation',
      reference: 'Good practice',
      mandatory: false,
      description: 'List of all fire equipment on board - helps manage compliance and maintenance'
    });
  }
  
  return requirements;
}