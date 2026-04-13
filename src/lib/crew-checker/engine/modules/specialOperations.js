/**
 * Special Operations Crew Requirements
 *
 * Additional qualifications required for specific operations:
 *   - Towing: Advanced powerboat + towing experience
 *   - High speed (>25 knots): High-speed vessel qualification
 *   - Dangerous goods: IMDG Code training
 *   - MGO supply: 3 specific certifications
 *   - Hours of rest: MLC compliance for multi-crew
 *
 * Reference: WBC3 26.1.5 (towing), 25.4 (high speed), App 6 (DG), 29.10 (MGO)
 */

/**
 * Get special operations crew requirements.
 *
 * @param {Object} vessel - Normalized vessel input
 * @returns {Array} Special operations requirement items
 */
export function getSpecialOperationsRequirements(vessel) {
  const requirements = [];
  const ops = vessel.operations || [];
  const crewCount = vessel.crewCount || 1;

  // ===== TOWING OPERATIONS — WBC3 26.1.5 =====
  if (ops.includes('towing_operations')) {
    requirements.push({
      id: 'special.towing_master',
      name: 'Master Towing Operations Qualification',
      category: 'Special Operations',
      reference: 'WBC3 26.1.5',
      mandatory: true,
      appliesTo: 'MASTER',
      validity: '5 years',
      description: 'Master must hold advanced powerboat qualification with suitable towing experience and competence.',
    });
  }

  // ===== HIGH SPEED OPERATIONS — WBC3 25.4 =====
  if (ops.includes('high_speed_ops')) {
    requirements.push({
      id: 'special.high_speed_master',
      name: 'High Speed Vessel Qualification',
      category: 'Special Operations',
      reference: 'WBC3 25.4',
      mandatory: true,
      appliesTo: 'MASTER',
      validity: '5 years',
      description: `Master must have suitable qualifications and experience for high-speed operations (>25 knots). Max speed: ${vessel.maxSpeed || '>25'} knots.`,
    });
  }

  // ===== MGO SUPPLY OPERATIONS — WBC3 29.10.2.5 =====
  if (ops.includes('mgo_supply')) {
    requirements.push({
      id: 'special.mgo_operations',
      name: 'MGO Supply Operations Training',
      category: 'Special Operations',
      reference: 'WBC3 29.10.2.5',
      mandatory: true,
      appliesTo: 'ALL crew involved in MGO operations',
      validity: '3 years',
      description: 'General marine gas oil supply operations training certificate.',
    });
    requirements.push({
      id: 'special.mgo_weather',
      name: 'MGO Supply Weather Assessment Training',
      category: 'Special Operations',
      reference: 'WBC3 29.10.2.5',
      mandatory: true,
      appliesTo: 'ALL crew involved in MGO operations',
      validity: '3 years',
      description: 'Weather assessment training specific to MGO supply operations.',
    });
    requirements.push({
      id: 'special.mgo_msds',
      name: 'MGO Supply MSDS Training',
      category: 'Special Operations',
      reference: 'WBC3 29.10.2.5',
      mandatory: true,
      appliesTo: 'ALL crew involved in MGO operations',
      validity: '3 years',
      description: 'Material Safety Data Sheet training for MGO supply operations.',
    });
  }

  // ===== HOURS OF REST — MLC 2006 =====
  if (crewCount >= 2) {
    requirements.push({
      id: 'special.hours_of_rest',
      name: 'Hours of Rest Records',
      category: 'Crew Documentation',
      reference: 'MLC 2006',
      mandatory: true,
      appliesTo: 'ALL crew',
      validity: 'Monthly records',
      description: 'Work and rest hour records must be maintained monthly for multi-crew vessels.',
    });
  }

  // ===== MLC COMPLIANCE — International voyages Cat 0-2 =====
  if (vessel.internationalVoyages) {
    const category = typeof vessel.category === 'string'
      ? parseInt(vessel.category.replace('cat', ''), 10)
      : (vessel.category || 6);
    if (category <= 2) {
      requirements.push({
        id: 'special.mlc_inspection',
        name: 'MLC Inspection Report',
        category: 'Maritime Labour Compliance',
        reference: 'MLC 2006',
        mandatory: true,
        appliesTo: 'VESSEL',
        validity: '5 years',
        description: 'Valid Maritime Labour Convention inspection report required for international voyages >60nm from UK safe haven (Area Categories 0-2).',
      });
    }
  }

  return requirements;
}
