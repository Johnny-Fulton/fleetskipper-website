/**
 * WBC3 Crew Certification Checker — Input Schema
 *
 * Defines all input fields, sections, types, conditionals, and options.
 * The web orchestrator reads this to build the questionnaire UI.
 *
 * 6 sections, ~18 fields
 */

export function getInputSchema() {
  return {
    sections: [
      { id: 'vesselIdentity', label: 'Vessel Identity', order: 1 },
      { id: 'vesselDimensions', label: 'Vessel Dimensions & Capacity', order: 2 },
      { id: 'areaOfOperation', label: 'Area of Operation', order: 3 },
      { id: 'propulsion', label: 'Propulsion & Machinery', order: 4 },
      { id: 'operationsEquipment', label: 'Operations & Equipment', order: 5 },
      { id: 'vesselClassification', label: 'Vessel Classification', order: 6 },
    ],

    fields: {
      // ================================================================
      // Section 1: Vessel Identity
      // ================================================================
      vesselName: {
        section: 'vesselIdentity',
        order: 1,
        type: 'string',
        label: 'Vessel Name',
        required: true,
        helpText: 'Official name of the vessel',
      },
      vesselType: {
        section: 'vesselIdentity',
        order: 2,
        type: 'enum',
        label: 'Vessel Type',
        required: true,
        options: [
          { value: 'workboat', label: 'Workboat' },
          { value: 'pilot', label: 'Pilot Boat' },
          { value: 'tug', label: 'Tug' },
          { value: 'police', label: 'Police Boat' },
          { value: 'safety_standby', label: 'Safety/Standby Vessel' },
          { value: 'non_self_propelled', label: 'Non-Self-Propelled Platform' },
        ],
        helpText: 'Select the vessel classification. Police boats have alternative manning options under Annex 3.',
      },

      // ================================================================
      // Section 2: Vessel Dimensions & Capacity
      // ================================================================
      lengthOverall: {
        section: 'vesselDimensions',
        order: 1,
        type: 'number',
        label: 'Length Overall (metres)',
        required: true,
        min: 1,
        max: 100,
        helpText: 'Length overall in metres. Affects fire fighting training threshold (15m).',
      },
      grossTonnage: {
        section: 'vesselDimensions',
        order: 2,
        type: 'number',
        label: 'Gross Tonnage (GT)',
        required: true,
        min: 0,
        max: 3000,
        helpText: 'Gross tonnage. Affects which master qualifications are acceptable (<3GT, <200GT, <500GT).',
      },
      maxPersons: {
        section: 'vesselDimensions',
        order: 3,
        type: 'number',
        label: 'Maximum Persons on Board',
        required: true,
        min: 0,
        max: 500,
        helpText: 'Maximum number of persons on board including crew. 0 for unmanned platforms.',
      },

      // ================================================================
      // Section 3: Area of Operation
      // ================================================================
      category: {
        section: 'areaOfOperation',
        order: 1,
        type: 'enum',
        label: 'Area Category',
        required: true,
        options: [
          { value: 'cat0', label: 'Category 0 — Unrestricted' },
          { value: 'cat1', label: 'Category 1 — Up to 150nm from safe haven' },
          { value: 'cat2', label: 'Category 2 — Up to 60nm from safe haven' },
          { value: 'cat3', label: 'Category 3 — Up to 20nm from safe haven' },
          { value: 'cat4', label: 'Category 4 — Up to 20nm, daylight only' },
          { value: 'cat5', label: 'Category 5 — Up to 3nm, day and night' },
          { value: 'cat6', label: 'Category 6 — Up to 3nm, daylight only' },
        ],
        helpText: 'The area of operation determines which master and engineering qualifications are required.',
      },
      internationalVoyages: {
        section: 'areaOfOperation',
        order: 2,
        type: 'boolean',
        label: 'International Voyages',
        required: false,
        default: false,
        helpText: 'Does the vessel make international voyages (>60nm from UK safe haven or visiting foreign ports)? Affects medical certificate type (ENG1 required).',
      },

      // ================================================================
      // Section 4: Propulsion & Machinery
      // ================================================================
      propulsionConfiguration: {
        section: 'propulsion',
        order: 1,
        type: 'enum',
        label: 'Propulsion Configuration',
        required: true,
        options: [
          { value: 'diesel_inboard_below', label: 'Diesel Inboard (below deck)' },
          { value: 'diesel_inboard_above', label: 'Diesel Inboard (above deck)' },
          { value: 'diesel_outboard', label: 'Diesel Outboard' },
          { value: 'petrol_outboard', label: 'Petrol Outboard' },
          { value: 'battery_inboard', label: 'Battery Electric' },
          { value: 'hybrid_inboard_below', label: 'Hybrid (Diesel + Battery)' },
        ],
        helpText: 'Select the main propulsion type. Inboard engines affect engineering qualification requirements.',
      },
      enginePowerKW: {
        section: 'propulsion',
        order: 2,
        type: 'number',
        label: 'Total Engine Power (kW)',
        required: true,
        min: 1,
        max: 10000,
        helpText: 'Total installed engine power in kilowatts. Engineering qualifications are tiered at <1500kW, 1500-3000kW, and >3000kW.',
      },

      // ================================================================
      // Section 5: Operations & Equipment
      // ================================================================
      crewCount: {
        section: 'operationsEquipment',
        order: 1,
        type: 'number',
        label: 'Number of Crew',
        required: true,
        min: 1,
        max: 100,
        helpText: 'Total number of crew on board. Affects second person requirements and single-handed operation eligibility.',
      },
      operations: {
        section: 'operationsEquipment',
        order: 2,
        type: 'multiselect',
        label: 'Vessel Operations',
        required: false,
        default: [],
        options: [
          { value: 'towing_operations', label: 'Towing Operations' },
          { value: 'high_speed_ops', label: 'High Speed Operations (>25 knots)' },
          { value: 'dangerous_goods', label: 'Dangerous Goods Carriage' },
          { value: 'mgo_supply', label: 'Marine Gas Oil (MGO) Supply' },
          { value: 'pilot_transfer', label: 'Pilot Transfer' },
          { value: 'lifting_operations', label: 'Lifting Operations (cargo >1000kg)' },
          { value: 'dive_support', label: 'Dive Support' },
          { value: 'personnel_transfer', label: 'Personnel Transfer at Sea' },
          { value: 'patrol_operations', label: 'Patrol Operations' },
        ],
        helpText: 'Select all operations the vessel is engaged in. Towing, lifting, and cargo >1000kg classify the vessel as "Power Vessel W" for engineering requirements.',
      },
      hasRadar: {
        section: 'operationsEquipment',
        order: 3,
        type: 'boolean',
        label: 'Radar Fitted',
        required: false,
        default: false,
        helpText: 'Is radar equipment fitted? Triggers mandatory radar training for master and crew who use it.',
      },
      hasElectronicCharts: {
        section: 'operationsEquipment',
        order: 4,
        type: 'boolean',
        label: 'Electronic Chart System Fitted',
        required: false,
        default: false,
        helpText: 'Is an electronic chart plotter/ECS fitted? Triggers mandatory ECS training for navigational watch crew.',
      },
      hasStabilityBooklet: {
        section: 'operationsEquipment',
        order: 5,
        type: 'boolean',
        label: 'Stability Information Booklet Required',
        required: false,
        default: false,
        helpText: 'Does the vessel have/require a Stability Information Booklet? Required for: Cat 0-1 vessels, >=16 POB, cargo >1000kg, lifting devices, towing vessels.',
      },
      crewPreparesFood: {
        section: 'operationsEquipment',
        order: 6,
        type: 'boolean',
        label: 'Crew Prepares Food',
        required: false,
        default: false,
        helpText: 'Do any crew members prepare food on board? Triggers food hygiene/catering training requirement.',
      },
      maxSpeed: {
        section: 'operationsEquipment',
        order: 7,
        type: 'number',
        label: 'Maximum Speed (knots)',
        required: false,
        min: 0,
        max: 80,
        conditional: {
          field: 'operations',
          contains: 'high_speed_ops',
        },
        helpText: 'Maximum vessel speed in knots. Relevant for high-speed operations qualification.',
      },

      // ================================================================
      // Section 6: Vessel Classification
      // ================================================================
      isOpenBoat: {
        section: 'vesselClassification',
        order: 1,
        type: 'boolean',
        label: 'Open Boat',
        required: false,
        default: false,
        helpText: 'Is this an open boat (no substantial enclosure)? Affects police boat fire fighting alternatives.',
      },
      operatesAtNight: {
        section: 'vesselClassification',
        order: 2,
        type: 'boolean',
        label: 'Operates at Night',
        required: false,
        default: false,
        helpText: 'Does the vessel operate at night? Day Skipper certificate only valid for daylight operations (Cat 4 and 6).',
      },
    },
  };
}
