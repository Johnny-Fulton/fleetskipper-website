/**
 * WBC3 Vessel Requirements Checker — Input Schema
 *
 * Defines all questions the user must answer to determine vessel requirements.
 * The web orchestrator uses this schema to build the questionnaire UI.
 *
 * Each field includes:
 *   - type: 'string' | 'number' | 'boolean' | 'enum' | 'multi_enum' | 'object'
 *   - required: whether the field must be answered
 *   - conditional: conditions under which this field is shown/required
 *   - label: human-readable question text
 *   - help: additional context for the user
 *   - options: for enum/multi_enum types
 *   - min/max: for number types
 *   - properties: for object types (nested fields)
 */

export function getInputSchema() {
  return {
    version: '1.0.0',
    wbc3Edition: '3',
    sections: [
      {
        id: 'vessel_identity',
        title: 'Vessel Identity',
        description: 'Basic vessel identification and classification',
        order: 1,
      },
      {
        id: 'vessel_dimensions',
        title: 'Vessel Dimensions',
        description: 'Physical characteristics and capacity',
        order: 2,
      },
      {
        id: 'area_of_operation',
        title: 'Area of Operation',
        description: 'Operating area category and GMDSS sea area',
        order: 3,
      },
      {
        id: 'propulsion_machinery',
        title: 'Propulsion & Machinery',
        description: 'Engine type, power, and drive configuration',
        order: 4,
      },
      {
        id: 'vessel_structure',
        title: 'Vessel Structure',
        description: 'Boat type, enclosure, and accommodation',
        order: 5,
      },
      {
        id: 'galley_fire_risk',
        title: 'Galley & Fire Risk',
        description: 'Cooking facilities, heating, and fire hazards',
        order: 6,
      },
      {
        id: 'life_saving',
        title: 'Life Saving Appliances',
        description: 'Lifejacket type and environmental conditions',
        order: 7,
      },
      {
        id: 'gmdss_conditionals',
        title: 'Communication Conditions',
        description: 'Voyage duration and alerting conditions for GMDSS requirements',
        order: 8,
      },
      {
        id: 'operations',
        title: 'Operations',
        description: 'Vessel operations and endorsements',
        order: 9,
      },
      {
        id: 'engine_protection',
        title: 'Engine & Galley Protection',
        description: 'Fire protection choices for engine and galley spaces',
        order: 10,
        conditional: { or: [
          { field: 'propulsionConfiguration', in: ['diesel_inboard_above', 'hybrid_inboard_above'] },
          { field: 'galleyHeatSource', in: ['gas', 'liquid_fuel'] },
        ]},
      },
    ],

    fields: {
      // =====================================================================
      // SECTION 1: Vessel Identity
      // =====================================================================
      vesselName: {
        section: 'vessel_identity',
        type: 'string',
        required: true,
        label: 'Vessel Name',
        order: 1,
      },
      vesselType: {
        section: 'vessel_identity',
        type: 'enum',
        required: true,
        label: 'Vessel Type / Certificate Type',
        help: 'Select the type that matches your Workboat Certificate or intended operation',
        order: 2,
        options: [
          { value: 'workboat', label: 'Workboat', description: 'Standard Workboat Certificate' },
          { value: 'tug', label: 'Tug', description: 'Tug vessel' },
          { value: 'pilot', label: 'Pilot Boat', description: 'Dedicated pilot boat (WBC3 Section 27)' },
          { value: 'police', label: 'Police / Patrol Vessel', description: 'Police vessel (WBC3 Annex 3)' },
          { value: 'safety_standby', label: 'Safety / Standby Vessel', description: 'Safety or standby operations' },
          { value: 'ctv', label: 'Crew Transfer Vessel', description: 'Wind farm crew transfer vessel' },
          { value: 'survey', label: 'Survey Vessel', description: 'Survey or research vessel' },
          { value: 'rib', label: 'RIB', description: 'Rigid inflatable boat' },
          { value: 'non_self_propelled', label: 'Non-Self-Propelled Platform', description: 'Unmanned towed platform (WBC3 26.5.1.1)' },
        ],
      },

      // =====================================================================
      // SECTION 2: Vessel Dimensions
      // =====================================================================
      lengthOverall: {
        section: 'vessel_dimensions',
        type: 'number',
        required: true,
        label: 'Length Overall (metres)',
        help: 'The overall length of the vessel in metres',
        min: 1,
        max: 100,
        unit: 'metres',
        order: 1,
      },
      grossTonnage: {
        section: 'vessel_dimensions',
        type: 'number',
        required: true,
        label: 'Gross Tonnage (GT)',
        help: 'Gross tonnage as per the vessel\'s tonnage certificate',
        min: 0,
        max: 10000,
        unit: 'GT',
        order: 2,
      },
      maxPersons: {
        section: 'vessel_dimensions',
        type: 'number',
        required: true,
        label: 'Maximum Persons on Board',
        help: 'Total crew plus passengers as per the vessel\'s certificate. 0 for unmanned platforms.',
        min: 0,
        max: 500,
        order: 3,
      },
      carriesChildren: {
        section: 'vessel_dimensions',
        type: 'boolean',
        required: false,
        default: false,
        label: 'Will the vessel carry children (under 32kg)?',
        help: 'Triggers child-size lifejacket requirements',
        order: 4,
      },

      // =====================================================================
      // SECTION 3: Area of Operation
      // =====================================================================
      category: {
        section: 'area_of_operation',
        type: 'enum',
        required: true,
        label: 'Area Category of Operation',
        help: 'The operational area category as defined by WBC3. Cat 0 = Unlimited ocean, Cat 6 = Sheltered waters',
        order: 1,
        options: [
          { value: 'cat0', label: 'Category 0 — Unlimited', description: 'Unrestricted service' },
          { value: 'cat1', label: 'Category 1 — up to 150 miles from a safe haven', description: 'Extended offshore' },
          { value: 'cat2', label: 'Category 2 — up to 60 miles from a safe haven', description: 'Offshore' },
          { value: 'cat3', label: 'Category 3 — up to 20 miles from a safe haven', description: 'Coastal' },
          { value: 'cat4', label: 'Category 4 — up to 20 miles, favourable weather', description: 'Coastal, fair weather' },
          { value: 'cat5', label: 'Category 5 — up to 3 miles from a safe haven', description: 'Near coastal' },
          { value: 'cat6', label: 'Category 6 — to the satisfaction of the CA', description: 'Sheltered waters / estuarial' },
        ],
      },
      gmdssSeaArea: {
        section: 'area_of_operation',
        type: 'enum',
        required: true,
        label: 'GMDSS Sea Area',
        help: 'The GMDSS sea area(s) in which the vessel operates. Each higher area includes all lower areas.',
        order: 2,
        options: [
          { value: 'A1', label: 'Sea Area A1', description: 'Within range of VHF coast stations (~30 miles)' },
          { value: 'A1+A2', label: 'Sea Area A1 + A2', description: 'Within range of MF coast stations (~150 miles)' },
          { value: 'A1+A2+A3', label: 'Sea Area A1 + A2 + A3', description: 'Within INMARSAT coverage' },
          { value: 'A1+A2+A3+A4', label: 'Sea Area A1 + A2 + A3 + A4', description: 'Unlimited / polar' },
        ],
      },
      internationalVoyages: {
        section: 'area_of_operation',
        type: 'boolean',
        required: false,
        default: false,
        label: 'Does the vessel undertake international voyages?',
        help: 'Affects certain documentation and certification requirements',
        order: 3,
      },

      // =====================================================================
      // SECTION 4: Propulsion & Machinery
      // =====================================================================
      propulsionConfiguration: {
        section: 'propulsion_machinery',
        type: 'enum',
        required: true,
        label: 'Propulsion Configuration',
        help: 'Select the primary propulsion type and engine location',
        order: 1,
        conditional: { field: 'vesselType', notIn: ['non_self_propelled'] },
        options: [
          { value: 'diesel_inboard_below', label: 'Diesel Inboard — Below Deck', description: 'Inboard diesel engine(s) in machinery space below deck' },
          { value: 'diesel_inboard_above', label: 'Diesel Inboard — Above Deck', description: 'Inboard diesel engine(s) in engine box above deck' },
          { value: 'diesel_outboard', label: 'Diesel Outboard', description: 'Outboard diesel engine(s)' },
          { value: 'petrol_outboard', label: 'Petrol Outboard', description: 'Outboard petrol engine(s) — restricted operations (WBC3 8.6)' },
          { value: 'battery_inboard', label: 'Battery Electric — Inboard', description: 'Full battery electric propulsion, inboard (WBC3 Annex 1)' },
          { value: 'battery_outboard', label: 'Battery Electric — Outboard', description: 'Full battery electric propulsion, outboard (WBC3 Annex 1)' },
          { value: 'hybrid_inboard_below', label: 'Hybrid (Diesel + Battery) — Below Deck', description: 'Hybrid diesel-electric, below deck (WBC3 Annex 1)' },
          { value: 'hybrid_inboard_above', label: 'Hybrid (Diesel + Battery) — Above Deck', description: 'Hybrid diesel-electric, above deck (WBC3 Annex 1)' },
        ],
      },
      enginePowerKW: {
        section: 'propulsion_machinery',
        type: 'number',
        required: true,
        label: 'Total Aggregate Engine Power (kW)',
        help: 'Combined power of all propulsion engines in kilowatts. Critical for fire extinguisher sizing (WBC3 Table 16.1.1.1) and general alarm requirement (>750 kW).',
        min: 0,
        max: 50000,
        unit: 'kW',
        order: 2,
        conditional: { field: 'vesselType', notIn: ['non_self_propelled'] },
      },
      driveType: {
        section: 'propulsion_machinery',
        type: 'enum',
        required: true,
        label: 'Drive Type',
        help: 'How engine power is transmitted to the water',
        order: 3,
        conditional: { field: 'vesselType', notIn: ['non_self_propelled'] },
        options: [
          { value: 'shaft', label: 'Shaft Drive', description: 'Traditional propeller shaft with gearbox' },
          { value: 'water_jet', label: 'Water Jet', description: 'Water jet propulsion' },
          { value: 'pod_drive', label: 'Pod Drive', description: 'Azimuth pod propulsion' },
          { value: 'outboard_motor', label: 'Outboard Motor', description: 'Outboard motor (engine and drive combined)' },
        ],
      },

      // =====================================================================
      // SECTION 5: Vessel Structure
      // =====================================================================
      isOpenBoat: {
        section: 'vessel_structure',
        type: 'boolean',
        required: true,
        default: true,
        label: 'Is this an open boat?',
        help: 'An open boat has no substantial superstructure or enclosure. Affects fire extinguisher requirements (WBC3 Table 16.1.1.1 Note d).',
        order: 1,
        conditional: { field: 'vesselType', notIn: ['non_self_propelled'] },
      },
      hasWheelhouse: {
        section: 'vessel_structure',
        type: 'boolean',
        required: true,
        default: false,
        label: 'Does the vessel have a wheelhouse?',
        order: 2,
        conditional: { field: 'vesselType', notIn: ['non_self_propelled'] },
      },
      hasAccommodation: {
        section: 'vessel_structure',
        type: 'boolean',
        required: true,
        default: false,
        label: 'Does the vessel have accommodation spaces?',
        help: 'Spaces providing shelter, rest areas, or living facilities for crew',
        order: 3,
        conditional: { field: 'vesselType', notIn: ['non_self_propelled'] },
      },
      hasSleeping: {
        section: 'vessel_structure',
        type: 'boolean',
        required: false,
        default: false,
        label: 'Does the vessel have sleeping berths?',
        help: 'Affects fire detection and escape route requirements (WBC3 15.7.5, 16.2.2)',
        order: 4,
        conditional: { field: 'hasAccommodation', equals: true },
      },

      // =====================================================================
      // SECTION 6: Galley & Fire Risk
      // =====================================================================
      hasGalley: {
        section: 'galley_fire_risk',
        type: 'boolean',
        required: true,
        default: false,
        label: 'Does the vessel have a galley / cooking facility?',
        order: 1,
        conditional: { field: 'vesselType', notIn: ['non_self_propelled'] },
      },
      galleyHeatSource: {
        section: 'galley_fire_risk',
        type: 'enum',
        required: true,
        label: 'Galley Heat Source',
        help: 'The primary cooking fuel type — determines fire protection and detector requirements',
        order: 2,
        conditional: { field: 'hasGalley', equals: true },
        options: [
          { value: 'electric', label: 'Electric', description: 'Electric cooking appliances only' },
          { value: 'gas', label: 'Gas (LPG/CNG)', description: 'Gas-fuelled cooking — triggers gas detection and fire blanket requirements' },
          { value: 'liquid_fuel', label: 'Liquid Fuel', description: 'Liquid fuel (paraffin, diesel) — triggers CO detection' },
        ],
      },
      hasHeating: {
        section: 'galley_fire_risk',
        type: 'boolean',
        required: false,
        default: false,
        label: 'Does the vessel have heating appliances?',
        order: 3,
        conditional: { field: 'vesselType', notIn: ['non_self_propelled'] },
      },
      hasLithiumBattery: {
        section: 'galley_fire_risk',
        type: 'boolean',
        required: false,
        default: false,
        label: 'Are there lithium batteries on board (non-propulsion)?',
        help: 'Portable or installed lithium batteries (not propulsion batteries which are covered by Annex 1)',
        order: 4,
        conditional: { field: 'vesselType', notIn: ['non_self_propelled'] },
      },

      // =====================================================================
      // SECTION 7: Life Saving Appliances
      // =====================================================================
      lifejacketType: {
        section: 'life_saving',
        type: 'enum',
        required: true,
        label: 'Lifejacket Type',
        help: 'The primary lifejacket type carried on board',
        order: 1,
        conditional: { field: 'vesselType', notIn: ['non_self_propelled'] },
        options: [
          { value: 'foam', label: 'Foam (Inherently Buoyant)', description: 'No servicing required, always ready' },
          { value: 'inflatable', label: 'Inflatable', description: 'Requires annual servicing and spare cylinders' },
        ],
      },
      waterTemperature: {
        section: 'life_saving',
        type: 'enum',
        required: true,
        label: 'Expected Sea Surface Temperature',
        help: 'Affects thermal protective aid and immersion suit requirements (WBC3 14.5.2, 22.2.6)',
        order: 2,
        conditional: { field: 'vesselType', notIn: ['non_self_propelled'] },
        options: [
          { value: 'above_10c', label: 'Above 10\u00B0C', description: 'Standard temperature range' },
          { value: 'at_or_below_10c', label: 'At or below 10\u00B0C', description: 'Cold water — additional immersion protection required' },
        ],
      },

      // =====================================================================
      // SECTION 8: GMDSS Conditionals
      // =====================================================================
      voyageDuration: {
        section: 'gmdss_conditionals',
        type: 'enum',
        required: false,
        label: 'Typical Voyage Duration',
        help: 'Affects NAVTEX requirements (WBC3 Table 17.2.1 Note B). Voyages over 12 hours require NAVTEX in Sea Area A1.',
        order: 1,
        conditional: { field: 'category', in: ['cat3', 'cat4', 'cat5', 'cat6'] },
        options: [
          { value: 'under_12h', label: 'Under 12 hours', description: 'All voyages under 12 hours' },
          { value: 'over_12h', label: 'Over 12 hours', description: 'Some or all voyages exceed 12 hours' },
          { value: 'mixed', label: 'Mixed', description: 'Both short and long voyages' },
        ],
      },
      operatesUKWaters: {
        section: 'gmdss_conditionals',
        type: 'boolean',
        required: false,
        default: true,
        label: 'Does the vessel operate in UK waters?',
        help: 'HM Coastguard does not monitor MF in UK waters — affects MF radio requirement (WBC3 Table 17.2.1 Note C)',
        order: 2,
      },
      visualAlertingEffective: {
        section: 'gmdss_conditionals',
        type: 'enum',
        required: false,
        label: 'Is visual/VHF alerting to shore reliable in your operating area?',
        help: 'Where visual or non-GMDSS alerting is ineffective, EPIRB/PLB requirements change (WBC3 Table 17.2.1 Notes A, C2)',
        order: 3,
        conditional: { field: 'category', in: ['cat3', 'cat4', 'cat5', 'cat6'] },
        options: [
          { value: 'yes', label: 'Yes — reliable shore contact', description: 'VHF/visual alerting to shore is reliable' },
          { value: 'no', label: 'No — unreliable', description: 'Cannot reliably alert shore by visual/VHF means' },
          { value: 'uncertain', label: 'Uncertain', description: 'Not sure — conservative (assume unreliable)' },
        ],
      },
      alternativeWeatherInfo: {
        section: 'gmdss_conditionals',
        type: 'enum',
        required: false,
        label: 'Can up-to-date weather/navigation info be reliably obtained by other means?',
        help: 'Where weather info is unavailable by other means, NAVTEX becomes mandatory for Cat 5-6 (WBC3 Table 17.2.1 Notes C1, C3)',
        order: 4,
        conditional: { field: 'category', in: ['cat5', 'cat6'] },
        options: [
          { value: 'available', label: 'Yes — available by other means', description: 'Internet, phone, local forecast services' },
          { value: 'not_available', label: 'No — not reliably available', description: 'No reliable alternative source' },
          { value: 'uncertain', label: 'Uncertain', description: 'Not sure — conservative (assume unavailable)' },
        ],
      },

      // =====================================================================
      // SECTION 9: Operations
      // =====================================================================
      operations: {
        section: 'operations',
        type: 'multi_enum',
        required: false,
        label: 'Vessel Operations (select all that apply)',
        help: 'Each operation type adds specific equipment and certification requirements',
        order: 1,
        conditional: { field: 'vesselType', notIn: ['non_self_propelled'] },
        options: [
          { value: 'towing_operations', label: 'Towing Operations', description: 'WBC3 Section 26 — towline, winch, gob rope requirements' },
          { value: 'pilot_transfer', label: 'Pilot Transfer', description: 'WBC3 Section 27 — pilot ladder, recovery equipment' },
          { value: 'personnel_transfer', label: 'Personnel Transfer', description: 'Gangway, fendering, transfer procedures' },
          { value: 'lifting', label: 'Lifting Operations', description: 'Cranes, lifting devices — LOLER compliance' },
          { value: 'dive_support', label: 'Dive Support', description: 'Dive basket, platform, ladder requirements' },
          { value: 'dangerous_goods', label: 'Dangerous Goods', description: 'WBC3 Section 29 — additional FFE, A-60 insulation, DG certificate' },
          { value: 'fuel_transfer', label: 'Fuel Transfer (MGO)', description: 'MGO supply — transfer pump, hose, metering requirements' },
          { value: 'patrol_operations', label: 'Patrol Operations', description: 'WBC3 Annex 3 — searchlight, enhanced MOB recovery' },
        ],
      },
      operatesAtNight: {
        section: 'operations',
        type: 'boolean',
        required: false,
        default: false,
        label: 'Does the vessel operate at night?',
        help: 'Affects compass light and deck lighting requirements',
        order: 2,
        conditional: { field: 'vesselType', notIn: ['non_self_propelled'] },
      },

      // =====================================================================
      // SECTION 10: Engine & Galley Protection (conditional)
      // =====================================================================
      engineBoxProtection: {
        section: 'engine_protection',
        type: 'object',
        required: false,
        label: 'Engine Box Fire Protection',
        help: 'For above-deck inboard engines: choose fire access method',
        order: 1,
        conditional: { field: 'propulsionConfiguration', in: ['diesel_inboard_above', 'hybrid_inboard_above'] },
        properties: {
          firePort: {
            type: 'boolean',
            label: 'Fire port access to engine box?',
            help: 'A port through which a fire extinguisher nozzle can be inserted',
            default: false,
          },
          fixedSystem: {
            type: 'boolean',
            label: 'Fixed fire suppression system for engine box?',
            help: 'Automatic or manual fixed system within the engine box',
            default: false,
          },
        },
      },
      openFlameProtection: {
        section: 'engine_protection',
        type: 'object',
        required: false,
        label: 'Open Flame / Cooking Protection',
        help: 'Fire protection measures for gas or liquid fuel cooking',
        order: 2,
        conditional: { field: 'galleyHeatSource', in: ['gas', 'liquid_fuel'] },
        properties: {
          blanket: {
            type: 'boolean',
            label: 'Fire blanket fitted near cooking area?',
            default: false,
          },
          extraExtinguisher: {
            type: 'boolean',
            label: 'Additional 8A/68B fire extinguisher near cooking area?',
            default: false,
          },
          fixedSystem: {
            type: 'boolean',
            label: 'Fixed fire suppression system for galley?',
            default: false,
          },
        },
      },
    },
  };
}
