/**
 * FFE Procedures Requirements
 * Fire fighting operational and maintenance procedures
 */

export function getFFEProceduresRequirements(vessel) {
  const requirements = [];
  
  if (vessel.operatingStatus === 'seagoing') {
    // FFE Operations Manual
    requirements.push({
      id: 'ffe_doc_operations_manual',
      name: 'FFE Operations Manual',
      category: 'FFE Procedures',
      reference: 'WBC3 Appendix 8 1.1.6',
      mandatory: false,
      description: 'Operational procedures for fire equipment - procedures to ensure safe operation (job cards contain specific procedures)'
    });
    
    // FFE Maintenance Procedures
    requirements.push({
      id: 'ffe_doc_maintenance_procedures',
      name: 'FFE Maintenance Procedures',
      category: 'FFE Procedures',
      reference: 'WBC3 Appendix 8 1.1.9',
      mandatory: false,
      description: 'Maintenance procedures for fire equipment - detailed procedures are on job cards in maintenance module'
    });
    
    // Fire Emergency Procedures
    requirements.push({
      id: 'ffe_doc_emergency_procedures',
      name: 'Fire Emergency Procedures',
      category: 'FFE Procedures',
      reference: 'WBC3 Appendix 8 1.1.7',
      mandatory: false,
      description: 'Response procedures for fire emergencies - should cover fire response muster equipment deployment'
    });
    
    // Hot Work Policy
    if (vessel.hasHotWorkOperations) {
      requirements.push({
        id: 'ffe_doc_policy_hot_work',
        name: 'Hot Work Policy',
        category: 'FFE Procedures',
        reference: 'WBC3 15.3/SMS',
        mandatory: false,
        description: 'Policy for hot work operations including permit procedures, fire watch requirements, isolation procedures'
      });
    }
  }
  
  return requirements;
}