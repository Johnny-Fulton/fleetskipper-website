/**
 * FFE Training Requirements
 * Fire fighting training, drills, and instruction requirements
 */

export function getFFETrainingRequirements(vessel) {
  const requirements = [];
  
  if (vessel.operatingStatus === 'seagoing') {
    // Monthly fire drill for Class XI vessels
    if (vessel.isClass === 'XI') {
      requirements.push({
        id: 'ffe_drill_fire_monthly',
        name: 'Monthly Fire Drill',
        category: 'FFE Drills',
        reference: 'SI 1999/2722 Reg 8(2) & 11',
        mandatory: true,
        description: 'Fire drill including all required elements - each member of the crew shall participate in at least one fire drill every month'
      });
      
      // Initial training for new crew
      requirements.push({
        id: 'ffe_training_initial',
        name: 'Initial Fire Equipment Training Records',
        category: 'FFE Training',
        reference: 'SI 1999/2722 Reg 12(2)',
        mandatory: true,
        description: 'Records of training within 2 weeks of joining - for Class XI on international voyages'
      });
      
      // Regular instruction
      requirements.push({
        id: 'ffe_training_instruction',
        name: 'Regular Fire Equipment Instruction Records',
        category: 'FFE Training',
        reference: 'SI 1999/2722 Reg 12(4)',
        mandatory: true,
        description: 'Records of monthly fire equipment instruction - shall be given at the same interval as the drills required'
      });
    }
    
    // 24-hour drill requirement for crew changes >25%
    if (vessel.crewChangePercent > 25) {
      requirements.push({
        id: 'ffe_drill_24hour_requirement',
        name: '24-hour Drill Requirement',
        category: 'FFE Drills',
        reference: 'SI 1999/2722 Reg 8(4)',
        mandatory: true,
        description: 'Fire and abandon drills if >25% crew haven\'t participated - within 24 hours of the ship leaving a port unless impracticable'
      });
    }
  }
  
  return requirements;
}