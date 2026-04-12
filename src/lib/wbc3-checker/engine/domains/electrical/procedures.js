/**
 * Electrical Procedures/Training Requirements
 * Generated from UK-MARITIME-LIBRARY/03-CSV-DATABASES/SEAGOING/domains/electrical_v1/DRILLS.csv
 * THIS FILE USES ONLY THE CSV DATA - NO MADE UP REQUIREMENTS
 * Following anchor mode pattern
 */

export function getElectricalProceduresRequirements(vessel) {
  const requirements = [];
  
  // Only apply to seagoing vessels
  if (!vessel.operatingStatus || vessel.operatingStatus !== 'seagoing') {
    return requirements;
  }
  
  // ===== ELECTRICAL TRAINING =====
  // From CSV row 8
  
  // Electrical System Familiarization - GUIDANCE
  requirements.push({
    id: 'electrical.drill.familiarization',
    name: 'Electrical System Familiarization',
    category: 'Electrical Training',
    reference: 'WBC3 14.11.3/Appendix 8 7.2',
    mandatory: false, // GUIDANCE classification in CSV
    description: 'Familiarisation training...emergency procedures - Includes: battery isolation; emergency lighting; power failure response; electrical fire response'
  });
  
  return requirements;
}