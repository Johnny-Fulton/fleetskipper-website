/**
 * GMDSS Training Requirements
 * Generated from UK-MARITIME-LIBRARY/03-CSV-DATABASES/SEAGOING/domains/GMDSS_v1/DRILLS.csv
 * THIS FILE USES ONLY THE CSV DATA - NO MADE UP REQUIREMENTS
 * 
 * Note: DRILLS.csv contains training/qualification requirements, not actual drills
 */

export function getGMDSSTrainingRequirements(vessel) {
  const requirements = [];
  
  // Only apply to seagoing vessels
  if (!vessel.operatingStatus || vessel.operatingStatus !== 'seagoing') {
    return requirements;
  }
  
  // Radio Operator Qualification - ALL seagoing vessels
  requirements.push({
    id: 'gmdss.cert.operator',
    name: 'Radio Operator Qualification',
    category: 'GMDSS Training',
    reference: 'WBC3 28.1.8',
    mandatory: true,
    description: 'One person qualified for distress and safety radio communication - license or CoC required'
  });
  
  // Remote Operation Centre Manning - Unmanned vessels only
  if (vessel.isUnmanned) {
    requirements.push({
      id: 'gmdss.cert.remote.centre',
      name: 'Remote Operation Centre Manning',
      category: 'GMDSS Training',
      reference: 'WBC3 Annex 2 7.1',
      mandatory: true,
      description: 'Remote Operation Centre shall be manned with at least one person - for unmanned vessels only'
    });
  }
  
  // Radio Watch Keeping - ALL seagoing vessels
  requirements.push({
    id: 'gmdss.watch.continuous',
    name: 'Radio Watch Keeping',
    category: 'GMDSS Operations',
    reference: 'WBC3 17.8.1',
    mandatory: true,
    description: 'While at sea shall maintain continuous radio watch - VHF Ch70 DSC required'
  });
  
  // Watch Specific Channels - ALL seagoing vessels
  requirements.push({
    id: 'gmdss.watch.channels',
    name: 'Watch Specific Channels',
    category: 'GMDSS Operations',
    reference: 'WBC3 17.8.1',
    mandatory: true,
    description: 'VHF DSC Channel 70 … MSI … Channel 16 … Channel 13 - multiple channels listed'
  });
  
  return requirements;
}