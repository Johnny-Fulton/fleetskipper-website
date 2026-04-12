/**
 * WBC3 & MARPOL Reference Text Mapping
 * Maps regulation references to their full text for display in modals
 * Source: UK-MARITIME-LIBRARY/01-SEAGOING-REGULATIONS/WBC3/Workboat_Code_Edition_3.md
 */

export interface RegulationReference {
  id: string
  title: string
  fullText: string
  sourceDocument: string
  url?: string
}

export const WBC3_REFERENCES: Record<string, RegulationReference> = {
  // Fire Fighting Equipment (FFE) References - Section 15 & 16
  'WBC3 15.6.2.1': {
    id: 'WBC3 15.6.2.1',
    title: 'WBC3 15.6.2.1 - Fire Detector Wheelhouse',
    fullText: 'A suitable automatic fire detector and alarm system shall be fitted in the wheelhouse of vessels with enclosed wheelhouses.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 15.6.2.4': {
    id: 'WBC3 15.6.2.4',
    title: 'WBC3 15.6.2.4 - Fire Detector Machinery Space',
    fullText: 'A suitable automatic fire detector and alarm system shall be fitted in machinery spaces where the power exceeds 100kW or where the space is unmanned.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 15.6.3.3': {
    id: 'WBC3 15.6.3.3',
    title: 'WBC3 15.6.3.3 - CO Detector Engine Room',
    fullText: 'Carbon monoxide detectors shall be fitted in machinery spaces containing internal combustion engines, with alarms audible in the wheelhouse and crew accommodation.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 15.8.1': {
    id: 'WBC3 15.8.1',
    title: 'WBC3 15.8.1 - Fire Control and Safety Plan',
    fullText: 'Fire control and safety plans shall be provided showing the location of fire-fighting equipment, fire detection systems, means of escape, and ventilation controls.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 16.2.1.2': {
    id: 'WBC3 16.2.1.2',
    title: 'WBC3 16.2.1.2 - Portable Fire Extinguisher Wheelhouse',
    fullText: 'At least one portable fire extinguisher of not less than 5A/34B capacity shall be provided in the wheelhouse.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 16.3.1.3.1': {
    id: 'WBC3 16.3.1.3.1',
    title: 'WBC3 16.3.1.3.1 - Fire Extinguisher Control Position',
    fullText: 'At least one portable multi-purpose fire extinguisher shall be located at each control position.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 16.4': {
    id: 'WBC3 16.4',
    title: 'WBC3 16.4 - Fixed Fire Extinguishing Systems',
    fullText: 'Machinery spaces shall be protected by a fixed fire extinguishing system appropriate to the fire hazards present (CO2, water mist, foam, etc.). The system shall be capable of being activated from outside the protected space.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 16.4.2.1': {
    id: 'WBC3 16.4.2.1',
    title: 'WBC3 16.4.2.1 - Fire Pump',
    fullText: 'A fire pump shall be provided capable of delivering water at the required pressure and flow rate to all parts of the vessel through the fire main system.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 16.4.2.4': {
    id: 'WBC3 16.4.2.4',
    title: 'WBC3 16.4.2.4 - Fire Hose',
    fullText: 'Fire hoses of adequate length shall be provided to reach all parts of the vessel. Hoses shall be of approved type with appropriate nozzles.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  // Navigation Equipment References
  'WBC3 19.2.7': {
    id: 'WBC3 19.2.7',
    title: 'WBC3 19.2.7 - Compass Light',
    fullText: 'For vessels certified to operate in area category of operation 0, 1, 2, 3 or 5, the magnetic compass shall have a light suitable for illuminating the compass card.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 19.6.1': {
    id: 'WBC3 19.6.1',
    title: 'WBC3 19.6.1 - Radar Reflector',
    fullText: 'A vessel shall be provided with a radar reflector of an appropriate standard. Small vessels may, subject to a satisfactory assessment by the Certifying Authority, be exempted from complying with this requirement.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 19.7.1.1': {
    id: 'WBC3 19.7.1.1',
    title: 'WBC3 19.7.1.1 - GPS/GNSS',
    fullText: 'A vessel which is certified to operate in area category of operation 0, 1 or 2 shall be provided with an electronic position fixing system (GPS), unless the requirement of paragraph 19.7.1.1 provides reliable distance measurements in the operating area(s).',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 19.7.1.2': {
    id: 'WBC3 19.7.1.2',
    title: 'WBC3 19.7.1.2 - Distance Log',
    fullText: 'A distance measuring log shall be provided unless the electronic position fixing system provides reliable distance measurements in the operating area(s).',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 19.7.1.3': {
    id: 'WBC3 19.7.1.3',
    title: 'WBC3 19.7.1.3 - 3cm Radar',
    fullText: 'A 3 cm radar of an appropriate standard shall be provided.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 19.7.1.4': {
    id: 'WBC3 19.7.1.4',
    title: 'WBC3 19.7.1.4 - AIS Transceiver',
    fullText: 'A suitable Automatic Identification System (AIS) transceiver shall be provided.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  // Environmental/Pollution Prevention References
  'WBC3 30.3.1': {
    id: 'WBC3 30.3.1',
    title: 'WBC3 30.3.1 - Garbage Management',
    fullText: 'All vessels shall comply with The Merchant Shipping (Prevention of Pollution by Garbage from Ships) Regulations 2020 (MARPOL Annex V), (SI 2020/621). Vessels shall have adequate facilities for the storage of garbage and shall display placards notifying crew and passengers of the discharge requirements.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 30.2.2': {
    id: 'WBC3 30.2.2',
    title: 'WBC3 30.2.2 - Sewage Holding Tank',
    fullText: 'A vessel which is not required to comply with 30.2.1 and operates in an area(s) where the direct discharge of sewage is prohibited shall be fitted with a holding tank of sufficient capacity.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 30.2.1': {
    id: 'WBC3 30.2.1',
    title: 'WBC3 30.2.1 - Sewage Treatment System',
    fullText: 'Vessels engaged on international voyages and vessels of 400 GT and above, or vessels of less than 400 GT certified to carry more than 15 persons, shall comply with MARPOL Annex IV requirements for sewage treatment systems.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 11.3.1': {
    id: 'WBC3 11.3.1',
    title: 'WBC3 11.3.1 - Bilge Alarm',
    fullText: 'All vessels with machinery compartments shall be fitted with a bilge high level alarm to provide early warning of water ingress.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  // MARPOL References
  'MARPOL Annex I Reg 12': {
    id: 'MARPOL Annex I Reg 12',
    title: 'MARPOL Annex I Regulation 12 - Oil Sludge Tank',
    fullText: 'Every ship of 400 gross tonnage and above shall be provided with a tank or tanks of adequate capacity for the storage of oil sludge and oil mixtures which cannot be discharged into the sea.',
    sourceDocument: 'MARPOL Annex I',
    url: 'https://www.imo.org/en/About/Conventions/Pages/International-Convention-for-the-Prevention-of-Pollution-from-Ships-(MARPOL).aspx'
  },

  'MARPOL Annex I Reg 14': {
    id: 'MARPOL Annex I Reg 14',
    title: 'MARPOL Annex I Regulation 14 - Oily Water Separator',
    fullText: 'Every ship of 400 gross tonnage and above shall be fitted with oily-water filtering equipment (15 ppm equipment) capable of producing effluent the oil content of which does not exceed 15 parts per million.',
    sourceDocument: 'MARPOL Annex I',
    url: 'https://www.imo.org/en/About/Conventions/Pages/International-Convention-for-the-Prevention-of-Pollution-from-Ships-(MARPOL).aspx'
  },

  'MARPOL Annex I': {
    id: 'MARPOL Annex I',
    title: 'MARPOL Annex I - Prevention of Pollution by Oil',
    fullText: 'MARPOL Annex I - Regulations for the Prevention of Pollution by Oil covers prevention of pollution by oil from operational measures as well as from accidental discharges.',
    sourceDocument: 'MARPOL Annex I',
    url: 'https://www.imo.org/en/About/Conventions/Pages/International-Convention-for-the-Prevention-of-Pollution-from-Ships-(MARPOL).aspx'
  },

  'MARPOL Annex IV': {
    id: 'MARPOL Annex IV',
    title: 'MARPOL Annex IV - Prevention of Pollution by Sewage',
    fullText: 'MARPOL Annex IV contains requirements to control pollution of the sea by sewage from ships. It applies to ships of 400 gross tonnage and above engaged on international voyages, or ships certified to carry more than 15 persons.',
    sourceDocument: 'MARPOL Annex IV',
    url: 'https://www.imo.org/en/About/Conventions/Pages/International-Convention-for-the-Prevention-of-Pollution-from-Ships-(MARPOL).aspx'
  },

  'MARPOL Annex V': {
    id: 'MARPOL Annex V',
    title: 'MARPOL Annex V - Prevention of Pollution by Garbage',
    fullText: 'MARPOL Annex V deals with different types of garbage and specifies the distances from land and the manner in which they may be disposed of. The requirements are much stricter in a number of "special areas".',
    sourceDocument: 'MARPOL Annex V',
    url: 'https://www.imo.org/en/About/Conventions/Pages/International-Convention-for-the-Prevention-of-Pollution-from-Ships-(MARPOL).aspx'
  },

  // MGN References
  'MGN 632': {
    id: 'MGN 632',
    title: 'MGN 632 - Garbage Management',
    fullText: 'MGN 632 (M+F) Amendment 2: The Merchant Shipping (Prevention of Pollution by Garbage from Ships) Regulations 2020 - provides guidance on MARPOL Annex V requirements for garbage management onboard ships.',
    sourceDocument: 'Marine Guidance Note 632',
    url: 'https://www.gov.uk/government/publications/mgn-632-mf-the-merchant-shipping-prevention-of-pollution-by-garbage-from-ships-regulations-2020'
  },

  'MGN 505': {
    id: 'MGN 505',
    title: 'MGN 505 - Hours of Rest',
    fullText: 'MGN 505 (M+F) Amendment 1: Provides guidance on seafarers hours of work and rest - implementing the requirements of the Maritime Labour Convention 2006 and EU Directive 1999/63/EC.',
    sourceDocument: 'Marine Guidance Note 505',
    url: 'https://www.gov.uk/government/publications/mgn-505-mf-seafarers-hours-of-work-and-rest'
  },

  'MGN 319': {
    id: 'MGN 319',
    title: 'MGN 319 - ECDIS',
    fullText: 'MGN 319 (M) provides guidance on the use of Electronic Chart Display and Information Systems (ECDIS) as an alternative to paper nautical charts.',
    sourceDocument: 'Marine Guidance Note 319',
    url: 'https://www.gov.uk/government/publications/mgn-319-m-the-use-of-electronic-chart-display-and-information-systems-ecdis'
  },

  // IMDG Code References
  'IMDG Code': {
    id: 'IMDG Code',
    title: 'IMDG Code - Dangerous Goods',
    fullText: 'The International Maritime Dangerous Goods (IMDG) Code governs the safe transport of dangerous goods by sea, covering packaging, labeling, stowage, and emergency procedures.',
    sourceDocument: 'IMDG Code',
    url: 'https://www.imo.org/en/Publications/Pages/IMDG.aspx'
  },

  // WBC3 Annex References
  'WBC3 Annex 2': {
    id: 'WBC3 Annex 2',
    title: 'WBC3 Annex 2 - Remotely Operated Vessels',
    fullText: 'WBC3 Annex 2 contains additional requirements for Remotely Operated or Unmanned Vessels (ROUV), including specific equipment and safety standards for unmanned operations.',
    sourceDocument: 'UK Workboat Code Edition 3 - Annex 2',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 Annex 3': {
    id: 'WBC3 Annex 3',
    title: 'WBC3 Annex 3 - Police Vessels',
    fullText: 'WBC3 Annex 3 contains specific requirements for police vessels, recognizing their unique operational requirements while maintaining safety standards.',
    sourceDocument: 'UK Workboat Code Edition 3 - Annex 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 Annex 3 13.1.1': {
    id: 'WBC3 Annex 3 13.1.1',
    title: 'WBC3 Annex 3 13.1.1 - Police Boat Compass Light',
    fullText: 'Police boats operating outside hours of daylight shall have a compass light suitable for illuminating the compass card.',
    sourceDocument: 'UK Workboat Code Edition 3 - Annex 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 Annex 3 13.4.1': {
    id: 'WBC3 Annex 3 13.4.1',
    title: 'WBC3 Annex 3 13.4.1 - Police Boat Barometer',
    fullText: 'An aneroid barometer shall be carried for weather monitoring on police vessels.',
    sourceDocument: 'UK Workboat Code Edition 3 - Annex 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 Annex 3 13.2.1': {
    id: 'WBC3 Annex 3 13.2.1',
    title: 'WBC3 Annex 3 13.2.1 - Police Electronic Publications',
    fullText: 'Publications MAY be carried as electronic copy in ruggedised device on police vessels as an alternative to paper publications.',
    sourceDocument: 'UK Workboat Code Edition 3 - Annex 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 Annex 3 13.3.1': {
    id: 'WBC3 Annex 3 13.3.1',
    title: 'WBC3 Annex 3 13.3.1 - Police Cat 5 Radar Reflector Exemption',
    fullText: 'Category 5 police vessels not fitted with radar reflector shall only operate in favourable weather conditions.',
    sourceDocument: 'UK Workboat Code Edition 3 - Annex 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 19.3.4/MGN 319': {
    id: 'WBC3 19.3.4/MGN 319',
    title: 'WBC3 19.3.4 / MGN 319 - ECDIS Alternative',
    fullText: 'ECDIS may be accepted as an alternative to paper charts subject to MGN 319 requirements for type-approved systems, proper training, and backup arrangements.',
    sourceDocument: 'UK Workboat Code Edition 3 / MGN 319',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  // Section 3 - Application and Certification References
  'WBC3 3.5.2': {
    id: 'WBC3 3.5.2',
    title: 'WBC3 3.5.2 - Vessel Maintenance',
    fullText: 'It is the responsibility of the vessel owner/operator to ensure that the vessel is maintained in accordance with manufacturer\'s recommendations or best engineering practice.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 3.5.3': {
    id: 'WBC3 3.5.3',
    title: 'WBC3 3.5.3 - Equipment Efficiency and Maintenance',
    fullText: 'A vessel, its machinery, equipment and fittings shall be designed to be efficient for its intended purpose and suitable for the intended area category of operation. This shall include an ongoing maintenance and inspection regime that ensures continued effective operation.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 3.5/SMS': {
    id: 'WBC3 3.5/SMS',
    title: 'WBC3 3.5 / Safety Management System',
    fullText: 'Vessels shall maintain a Safety Management System appropriate to their operations, including procedures for maintenance, examination, certification and operation in accordance with the Code requirements.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  // Section 4 - Certification and Examinations
  'WBC3 4.2.3': {
    id: 'WBC3 4.2.3',
    title: 'WBC3 4.2.3 - Compliance Examination Completion',
    fullText: 'Upon satisfactory completion of the compliance examination, a copy of the report form SWB2 signed by the authorised person and vessel owner/operator shall be forwarded to the Certifying Authority.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 4.3.1': {
    id: 'WBC3 4.3.1',
    title: 'WBC3 4.3.1 - Certificate Issuance Requirements',
    fullText: 'The Certifying Authority may issue a Certificate if provided with a signed SWB2, Stability Information Booklet or required stability information, and required fee payments.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 4.3.2': {
    id: 'WBC3 4.3.2',
    title: 'WBC3 4.3.2 - Certificate Validity Period',
    fullText: 'A Certificate or Certificate with Pilot Boat Endorsement shall be valid for not more than five years from the date of examination of the vessel by the authorised person.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 4.3.4': {
    id: 'WBC3 4.3.4',
    title: 'WBC3 4.3.4 - Annual Identification Disc',
    fullText: 'The Certifying Authority shall annually issue an identification disc which shall be prominently displayed and visible from outside the vessel.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 4.4.1.3': {
    id: 'WBC3 4.4.1.3',
    title: 'WBC3 4.4.1.3 - Annual Examination Satisfactory Completion',
    fullText: 'Where the authorised person is satisfied that arrangements, fittings and equipment are in satisfactory condition and the vessel is well-maintained, a signed SWB2 shall be forwarded to the Certifying Authority.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 4.5.1.3': {
    id: 'WBC3 4.5.1.3',
    title: 'WBC3 4.5.1.3 - Intermediate Examination Requirements',
    fullText: 'Intermediate examinations shall be carried out at intervals not exceeding 30 months from the compliance or renewal examination date, including out of water examination where required.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 4.6.4': {
    id: 'WBC3 4.6.4',
    title: 'WBC3 4.6.4 - Renewal Examination Documentation',
    fullText: 'Upon satisfactory completion of renewal examination, documentation shall be submitted to the Certifying Authority for renewal of the Certificate.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 4.8': {
    id: 'WBC3 4.8',
    title: 'WBC3 4.8 - Examination Regime',
    fullText: 'Vessels shall undergo regular examinations including compliance, annual, intermediate and renewal examinations as specified in the Code to maintain certification.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  // Section 8 - Machinery and Propulsion
  'WBC3 8.1.1': {
    id: 'WBC3 8.1.1',
    title: 'WBC3 8.1.1 - Propulsion System Suitability',
    fullText: 'A vessel shall be provided with a propulsion system suitable for marine use and appropriate for the vessel\'s intended operations and area category.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 8.8.1': {
    id: 'WBC3 8.8.1',
    title: 'WBC3 8.8.1 - Engine Starting System',
    fullText: 'A vessel\'s engine shall be started by mechanical, air, hand or electric means with independent batteries, or other equally effective means to the satisfaction of the Certifying Authority.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 8.8.2': {
    id: 'WBC3 8.8.2',
    title: 'WBC3 8.8.2 - Back-up Battery System',
    fullText: 'Where the sole means of starting an engine is by battery, a back-up battery and charging facility shall be available, connected via a change over switch with emergency link isolator.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 8.9.1': {
    id: 'WBC3 8.9.1',
    title: 'WBC3 8.9.1 - Kill Cord Requirement',
    fullText: 'Any inflatable boat, RIB, or vessel where there is risk of helmsperson falling overboard shall be fitted with a kill cord which shall be securely attached to the helmsperson and used at all times whilst the engine is running and in gear.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 8.10': {
    id: 'WBC3 8.10',
    title: 'WBC3 8.10 - Machinery Installation',
    fullText: 'Machinery, propulsion and fuel systems shall be installed to reduce risk of injury to persons during normal movement about the vessel.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 8.10.3': {
    id: 'WBC3 8.10.3',
    title: 'WBC3 8.10.3 - Fuel Isolation System',
    fullText: 'Means shall be provided to isolate a source of fuel which may feed a fire in a machinery space from outside the space.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 8.12': {
    id: 'WBC3 8.12',
    title: 'WBC3 8.12 - Fuel Tanks',
    fullText: 'Fuel tanks shall be of suitable construction, properly installed and secured, with appropriate venting and filling arrangements to prevent spillage and explosion risk.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  // Section 9 - Electrical Systems
  'WBC3 9.2.1': {
    id: 'WBC3 9.2.1',
    title: 'WBC3 9.2.1 - Electric Lighting System',
    fullText: 'An electric lighting system shall be installed capable of supplying adequate illumination for safe navigation and operation of the vessel.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 9.2.5': {
    id: 'WBC3 9.2.5',
    title: 'WBC3 9.2.5 - Deck Operations Lighting',
    fullText: 'For vessels carrying out deck operations at night, an appropriate level of lighting shall be provided to ensure safe working.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 9.3': {
    id: 'WBC3 9.3',
    title: 'WBC3 9.3 - Battery Systems',
    fullText: 'Battery systems including backup batteries shall be provided to an appropriate standard with protection, charging circuitry and disconnect switches as required.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 9.3.1.1': {
    id: 'WBC3 9.3.1.1',
    title: 'WBC3 9.3.1.1 - Battery System Standards',
    fullText: 'Battery systems including any back up battery system shall be provided to an appropriate standard suitable for marine use.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 9.3.1.3': {
    id: 'WBC3 9.3.1.3',
    title: 'WBC3 9.3.1.3 - Battery Overcharge Protection',
    fullText: 'All battery charging systems shall be fitted with circuitry to prevent overcharging of batteries.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 9.3.1.6': {
    id: 'WBC3 9.3.1.6',
    title: 'WBC3 9.3.1.6 - Battery Disconnect Switch',
    fullText: 'A battery disconnect switch shall be provided to simultaneously isolate all non-essential electrical circuits from the battery.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 9.3.2': {
    id: 'WBC3 9.3.2',
    title: 'WBC3 9.3.2 - Battery Carriage Requirements',
    fullText: 'Batteries shall be properly secured, ventilated and protected from the elements with appropriate access for maintenance and inspection.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 9.7.2.1': {
    id: 'WBC3 9.7.2.1',
    title: 'WBC3 9.7.2.1 - Emergency Lighting Duration',
    fullText: 'Emergency lighting shall be capable of providing illumination for a minimum period appropriate to the vessel\'s area category and operations.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 9.7.3.1': {
    id: 'WBC3 9.7.3.1',
    title: 'WBC3 9.7.3.1 - Emergency Power Supply',
    fullText: 'An emergency power supply shall be provided to maintain essential services in the event of main power failure.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  // Section 10 - Steering and Propulsion Control
  'WBC3 10.2.1': {
    id: 'WBC3 10.2.1',
    title: 'WBC3 10.2.1 - Steering System Type',
    fullText: 'The steering system may be either direct or remote control. Remote control systems shall include provision for emergency steering.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 10.2.2': {
    id: 'WBC3 10.2.2',
    title: 'WBC3 10.2.2 - Steering System Standards',
    fullText: 'Primary steering systems shall comply with an appropriate standard for small craft steering systems.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 10.3.1': {
    id: 'WBC3 10.3.1',
    title: 'WBC3 10.3.1 - Rudder System Design',
    fullText: 'Where fitted, the design, construction and fittings of a rudder system shall be to an appropriate standard and suitable for the vessel\'s operations.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  // Section 11 - Bilge Systems
  'WBC3 11.1.9': {
    id: 'WBC3 11.1.9',
    title: 'WBC3 11.1.9 - Alternative Bilge Pumping',
    fullText: 'The Certifying Authority may permit an alternative means of providing efficient bilge pumping appropriate to the vessel type and operations.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 11.2.1.1': {
    id: 'WBC3 11.2.1.1',
    title: 'WBC3 11.2.1.1 - Bilge Pump Carriage',
    fullText: 'All vessels shall carry bilge pumping equipment appropriate to the vessel size and area category of operation.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  // Section 14 - Life Saving Appliances (continued)
  'WBC3 14.2.4.2': {
    id: 'WBC3 14.2.4.2',
    title: 'WBC3 14.2.4.2 - Liferaft Capacity Cat 2-6',
    fullText: 'Vessels certified in area category 1 carrying fewer than 16 persons, or category 2-6, shall be provided with sufficient liferaft capacity to accommodate at minimum the total number of persons on board.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 14.3': {
    id: 'WBC3 14.3',
    title: 'WBC3 14.3 - Lifebuoys',
    fullText: 'Lifebuoys shall not be inflatable type, be marked with vessel identification, fitted with lights for categories 0-3 and 5, and comply with Table 14.1.2 carriage requirements.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 14.3 / Table 14.1.2': {
    id: 'WBC3 14.3 / Table 14.1.2',
    title: 'WBC3 14.3 - Lifebuoy Carriage Requirements',
    fullText: 'Lifebuoy carriage requirements vary by vessel size and area category: vessels under 16 persons require 2 lifebuoys, vessels 16+ persons require 4 lifebuoys, with specified numbers having lights and buoyant lines per Table 14.1.2.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 14.4': {
    id: 'WBC3 14.4',
    title: 'WBC3 14.4 - Lifejackets',
    fullText: 'Lifejackets shall be SOLAS/MER approved or BS EN standard, fitted with whistle and retro-reflective materials. All lifejackets shall have lights for categories 0-5. 100% provision required for all persons including children, plus 2 additional if inflatable type.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 14.4.4': {
    id: 'WBC3 14.4.4',
    title: 'WBC3 14.4.4 - Lifejacket Provision',
    fullText: 'A suitable lifejacket shall be provided for each person on board including those under 32kg. If inflatable type, an additional 2 lifejackets shall be provided per vessel.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 14.5.1': {
    id: 'WBC3 14.5.1',
    title: 'WBC3 14.5.1 - Thermal Protective Aids',
    fullText: 'Thermal Protective Aids (TPAs) shall be provided for 100% of persons on board for vessels in area categories 2-0, as specified in Table 14.1.2.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 14.7.1': {
    id: 'WBC3 14.7.1',
    title: 'WBC3 14.7.1 - Recovery of Persons from Water',
    fullText: 'An efficient means to enable recovery of persons (whether conscious or unconscious) from the water shall be physically demonstrated to the Certifying Authority at each compliance and renewal examination.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 14.8': {
    id: 'WBC3 14.8',
    title: 'WBC3 14.8 - Training Manual',
    fullText: 'A vessel\'s training manual shall be stowed at a control position and include detailed instructions on life-saving appliances, emergency procedures, and survival equipment use.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 14.9': {
    id: 'WBC3 14.9',
    title: 'WBC3 14.9 - Maintenance Manual',
    fullText: 'A vessel\'s instruction manual for on-board maintenance of life-saving appliances shall be stowed at a control position with inspection checklists, maintenance schedules and spare parts information.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 14.10': {
    id: 'WBC3 14.10',
    title: 'WBC3 14.10 - International Life-Saving Signals',
    fullText: 'All vessels shall carry a Table of International Life-Saving Signals in the form of either one SOLAS No.1 poster or two SOLAS No.2 posters.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 14.11.1': {
    id: 'WBC3 14.11.1',
    title: 'WBC3 14.11.1 - Fire and Abandon Ship Drills',
    fullText: 'On-board training including practice fire and abandon ship drills shall be regularly routinely carried out by crew. For vessels over 25 GT this shall be recorded in the Official Log Book.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 14.11.2': {
    id: 'WBC3 14.11.2',
    title: 'WBC3 14.11.2 - MOB and Liferaft Drills',
    fullText: 'Means of recovery of persons and physical deployment of each liferaft from water drills shall be regularly routinely carried out and recorded.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 14.11.3': {
    id: 'WBC3 14.11.3',
    title: 'WBC3 14.11.3 - Crew Familiarisation Training',
    fullText: 'All crew shall have familiarisation training on life-saving appliances and emergency procedures to ensure effective response in emergency situations.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 14.11.3/Appendix 8 7.2': {
    id: 'WBC3 14.11.3/Appendix 8 7.2',
    title: 'WBC3 14.11.3 / Appendix 8 7.2 - Familiarisation Training Content',
    fullText: 'Prior to first occasion of working on vessel, each worker must receive familiarisation training including emergency drills, MOB recovery, survival craft launching, evacuation procedures, lifejacket donning and fire-fighting equipment use.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 14.12.3': {
    id: 'WBC3 14.12.3',
    title: 'WBC3 14.12.3 - SART Requirement Cat 0-2',
    fullText: 'Vessels certified to operate in area categories 0, 1 or 2 shall carry a Search and Rescue Transponder (SART) - either Radar SART, AIS-SART or EPIRB-AIS beacon.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 14.12.4': {
    id: 'WBC3 14.12.4',
    title: 'WBC3 14.12.4 - Second SART Requirement',
    fullText: 'A second SART shall be carried unless the vessel operates in areas covered by dedicated SAR assets and the EPIRB has a 121.5 MHz locator beacon and is non-float free type for placing in a liferaft.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  // Section 15 - Fire Safety (additional references)
  'WBC3 15.1.1.4': {
    id: 'WBC3 15.1.1.4',
    title: 'WBC3 15.1.1.4 - Fire Safety Measures',
    fullText: 'Machinery spaces shall be fitted with appropriate fire detection, suppression and containment measures appropriate to the fire risk and vessel category.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  // Section 16 - Fire Fighting Equipment (additional)
  'WBC3 16.3.1.8/MGN 276': {
    id: 'WBC3 16.3.1.8/MGN 276',
    title: 'WBC3 16.3.1.8 / MGN 276 - Fire Extinguisher Servicing',
    fullText: 'Portable fire extinguishers shall be serviced and maintained in accordance with manufacturer instructions and MGN 276 guidance on fire safety equipment.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 16.4; Table 16.1.1.1': {
    id: 'WBC3 16.4; Table 16.1.1.1',
    title: 'WBC3 16.4 - Fixed Fire Extinguishing Systems',
    fullText: 'Machinery spaces shall be protected by fixed fire extinguishing systems (CO2, water mist, foam etc.) appropriate to fire hazards present. System shall be capable of activation from outside the protected space per Table 16.1.1.1.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  // Section 17 - Radio (additional references)
  'WBC3 17.3.5': {
    id: 'WBC3 17.3.5',
    title: 'WBC3 17.3.5 - Radio Distress Procedures Display',
    fullText: 'Fixed radio installations shall have a clear summary of radio distress, urgency and safety procedures displayed in full view of the radio operating position.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 17.4.1 / Table 17.2.1': {
    id: 'WBC3 17.4.1 / Table 17.2.1',
    title: 'WBC3 17.4.1 - Portable VHF Radio Requirement',
    fullText: 'A vessel shall carry at least one portable VHF radio fitted with Digital Selective Calling (DSC) facility, as specified in Table 17.2.1 for all area categories.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 17.5.1/Table 17.2.1': {
    id: 'WBC3 17.5.1/Table 17.2.1',
    title: 'WBC3 17.5.1 - EPIRB Installation',
    fullText: 'Vessels required to carry 406 MHz EPIRB per Table 17.2.1 shall install it to float free and activate automatically if vessel sinks, and be easily accessible for manual release into liferaft.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 17.6.1/17.6.2/Table 17.2.1': {
    id: 'WBC3 17.6.1/17.6.2/Table 17.2.1',
    title: 'WBC3 17.6.1/17.6.2 - Personal Locator Beacons',
    fullText: 'Vessels shall meet 406 MHz PLB carriage requirements per Table 17.2.1. PLBs equipped with GPS and light shall be worn by at least one crew member whilst on open deck.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 17.7.1': {
    id: 'WBC3 17.7.1',
    title: 'WBC3 17.7.1 - Radio Equipment Testing',
    fullText: 'Vessel owner/operator shall ensure radio equipment is tested and operating effectively prior to departure and maintained regularly according to manufacturer instructions.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 17.8.1': {
    id: 'WBC3 17.8.1',
    title: 'WBC3 17.8.1 - Radio Watches',
    fullText: 'A vessel while at sea shall maintain continuous radio watch on VHF DSC Channel 70, for MSI broadcasts, and where practicable on VHF Channels 16 and 13.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 17.9.1': {
    id: 'WBC3 17.9.1',
    title: 'WBC3 17.9.1 - Ships\' Radio Licence',
    fullText: 'A vessel shall be issued with a valid Ships\' Radio Licence by the relevant authority.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  // Section 18 - Navigation Lights
  'WBC3 18.1/SI 1996 No.75': {
    id: 'WBC3 18.1/SI 1996 No.75',
    title: 'WBC3 18.1 - COLREGS Compliance',
    fullText: 'All vessels shall comply with the Merchant Shipping (Distress Signals and Prevention of Collisions) Regulations 1996 (SI 1996 No. 75) as amended - the COLREGS requirements.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 18.1/Table 18.4': {
    id: 'WBC3 18.1/Table 18.4',
    title: 'WBC3 18.1 - Navigation Lights Table',
    fullText: 'Table 18.4 provides a summary of common navigation lights, shapes and sound signalling requirements. Vessel owner/operator must ensure full compliance with SI 1996 No.75.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 18.3/Table 18.4': {
    id: 'WBC3 18.3/Table 18.4',
    title: 'WBC3 18.3 - Sound Signals Under 12m',
    fullText: 'Vessels less than 12 metres in length are not obliged to carry sound signalling appliances required by COLREGS, but if not shall be provided with some other means of making an efficient sound signal.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  // Section 19 - Navigation Equipment (additional)
  'WBC3 19.1.1': {
    id: 'WBC3 19.1.1',
    title: 'WBC3 19.1.1 - Navigation Equipment Maintenance',
    fullText: 'All navigational equipment shall be routinely tested and maintained in accordance with manufacturer\'s instructions.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 19.2.1': {
    id: 'WBC3 19.2.1',
    title: 'WBC3 19.2.1 - Magnetic Compass',
    fullText: 'A vessel shall be fitted with a properly adjusted suitable magnetic marine compass with consistent deviation.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 19.2.3.2/footnote 73': {
    id: 'WBC3 19.2.3.2/footnote 73',
    title: 'WBC3 19.2.3.2 - Bearing Taking Capability',
    fullText: 'Means shall be provided for taking bearings as nearly as practicable over an arc of the horizon of 360 degrees. This may be met by a pelorus or in non-steel vessels a hand bearing compass.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 19.2.4': {
    id: 'WBC3 19.2.4',
    title: 'WBC3 19.2.4 - Compass Adjustment',
    fullText: 'Each magnetic compass shall be properly adjusted and deviation card available at all times. Adjustment required when first installed, becomes unreliable, after structural repairs, or biennially.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 19.2.6': {
    id: 'WBC3 19.2.6',
    title: 'WBC3 19.2.6 - Compass Deviation Record',
    fullText: 'A record of a vessel\'s compass deviations shall be maintained.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 19.3.1': {
    id: 'WBC3 19.3.1',
    title: 'WBC3 19.3.1 - Charts and Publications',
    fullText: 'Charts and nautical publications shall be kept up to date and accessible for the entire duration of the voyage.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 19.4.1': {
    id: 'WBC3 19.4.1',
    title: 'WBC3 19.4.1 - Signalling Lamp',
    fullText: 'A vessel shall be equipped with a waterproof electric lamp suitable for signalling.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 19.5.1': {
    id: 'WBC3 19.5.1',
    title: 'WBC3 19.5.1 - Echo Sounder',
    fullText: 'All vessels shall be fitted with an echo sounder or other effective means to measure the available depth of water.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  // Section 23 - Medical Stores
  'WBC3 23.1.1.3/MSN 1905': {
    id: 'WBC3 23.1.1.3/MSN 1905',
    title: 'WBC3 23.1.1.3 / MSN 1905 - Medical Stores',
    fullText: 'Vessels shall carry appropriate medical stores and equipment as specified in MSN 1905 based on vessel type, crew size and area of operation.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  // Section 28 - Manning and Qualifications
  'WBC3 28.1': {
    id: 'WBC3 28.1',
    title: 'WBC3 28.1 - Minimum Manning Requirements',
    fullText: 'A vessel shall be safely manned as a minimum in accordance with requirements specified for the vessel type and area category of operation.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 28.1.1': {
    id: 'WBC3 28.1.1',
    title: 'WBC3 28.1.1 - Safe Manning',
    fullText: 'A vessel shall be safely manned as a minimum in accordance with the requirements appropriate to the vessel\'s operations and certification.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 28.1.4/Table A5.3': {
    id: 'WBC3 28.1.4/Table A5.3',
    title: 'WBC3 28.1.4 - Familiarisation Training',
    fullText: 'Anyone employed or engaged in any capacity onboard shall complete appropriate familiarisation training as specified in Table A5.3 and Appendix 8.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 28.1.5/MIN 698': {
    id: 'WBC3 28.1.5/MIN 698',
    title: 'WBC3 28.1.5 - ENG1 Medical Certificate',
    fullText: 'Anyone employed or engaged onboard shall hold a valid ENG1 medical certificate or equivalent as detailed in MIN 698.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 28.1.8': {
    id: 'WBC3 28.1.8',
    title: 'WBC3 28.1.8 - Certificate Revalidation',
    fullText: 'All Certificates of Competency shall be revalidated every five years in accordance with applicable regulations.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  // Section 29 - Environmental Protection
  'WBC3 29.10.1.1': {
    id: 'WBC3 29.10.1.1',
    title: 'WBC3 29.10.1.1 - Oil Spillage Prevention Plan',
    fullText: 'A vessel shall carry on board an up to date plan of mechanisms to deal with oil spillage incidents.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 29.10.1.2': {
    id: 'WBC3 29.10.1.2',
    title: 'WBC3 29.10.1.2 - Oil Transfer Risk Assessment',
    fullText: 'Vessel owner/operator shall carry out a risk assessment for transfer of oil taking into account location, weather conditions and equipment used.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 29.10.1.3': {
    id: 'WBC3 29.10.1.3',
    title: 'WBC3 29.10.1.3 - Oil Transfer Procedures',
    fullText: 'Vessel owner/operator shall have documented procedures detailing the safe transfer of fuel including emergency shutdown procedures.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 29.10.1.4': {
    id: 'WBC3 29.10.1.4',
    title: 'WBC3 29.10.1.4 - Fuel Documentation',
    fullText: 'All fuel and products posing environmental risk shall be documented in accordance with applicable regulations.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 29.10.1.5': {
    id: 'WBC3 29.10.1.5',
    title: 'WBC3 29.10.1.5 - Spill Clean-up Equipment',
    fullText: 'A vessel shall carry suitable clean up equipment which shall be readily available for use in the event of oil spillage.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 30.3.1/MGN 632': {
    id: 'WBC3 30.3.1/MGN 632',
    title: 'WBC3 30.3.1 - Garbage Management with MGN 632',
    fullText: 'Vessels shall comply with MARPOL Annex V garbage regulations per SI 2020/621 and MGN 632, with adequate storage facilities and discharge requirement placards displayed.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  // Section 31 - Cyber Security
  'WBC3 31.3.1': {
    id: 'WBC3 31.3.1',
    title: 'WBC3 31.3.1 - Cyber Security Measures',
    fullText: 'Vessel owner/operator shall implement cyber security measures to protect vessel systems, networks and data from cyber threats.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 31.3.2': {
    id: 'WBC3 31.3.2',
    title: 'WBC3 31.3.2 - Cyber Security Proportionality',
    fullText: 'The required extent of cyber security measures shall be commensurate with the vessel\'s operational technology, connectivity and risk exposure.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 31.3.3': {
    id: 'WBC3 31.3.3',
    title: 'WBC3 31.3.3 - Cyber Risk Assessment',
    fullText: 'Vessel owner/operator shall carry out a cyber-security risk assessment identifying vulnerabilities and implementing appropriate protective measures.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  // Appendix 8 - Safety Management System
  'WBC3 Appendix 8 1.1.6': {
    id: 'WBC3 Appendix 8 1.1.6',
    title: 'Appendix 8 1.1.6 - SMS Vessel Operation Procedures',
    fullText: 'Safety Management System shall include documented procedures to ensure safe operation of a vessel covering equipment testing, navigation, maintenance, bunkering, integrity, stability, passenger/crew conduct and emergency towing.',
    sourceDocument: 'UK Workboat Code Edition 3 - Appendix 8',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 Appendix 8 1.1.6/1.1.9': {
    id: 'WBC3 Appendix 8 1.1.6/1.1.9',
    title: 'Appendix 8 1.1.6/1.1.9 - SMS Operational Procedures and Maintenance',
    fullText: 'SMS shall include procedures for safe vessel operation and documented maintenance program with inspection schedules, all activities to be recorded.',
    sourceDocument: 'UK Workboat Code Edition 3 - Appendix 8',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 Appendix 8 1.1.7': {
    id: 'WBC3 Appendix 8 1.1.7',
    title: 'Appendix 8 1.1.7 - SMS Emergencies',
    fullText: 'Clear procedures for responding to emergency situations shall be understood by all personnel, covering fire, flooding, collision, grounding, violent act, propulsion failure, MOB, abandon ship, medical emergency, aid to others and enclosed space rescue.',
    sourceDocument: 'UK Workboat Code Edition 3 - Appendix 8',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 Appendix 8 1.1.9': {
    id: 'WBC3 Appendix 8 1.1.9',
    title: 'Appendix 8 1.1.9 - SMS Vessel Maintenance',
    fullText: 'Vessel and equipment shall be maintained per Section 3.5. Owner/operator shall develop documented inspection and maintenance program with determined frequency, all activities recorded.',
    sourceDocument: 'UK Workboat Code Edition 3 - Appendix 8',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 Appendix 8 1.2.1': {
    id: 'WBC3 Appendix 8 1.2.1',
    title: 'Appendix 8 1.2.1 - Safety and Environmental Policy',
    fullText: 'A Safety and Environmental Protection Policy must address health, safety, working environment and environmental protection as they affect the company and staff both on shore and on board.',
    sourceDocument: 'UK Workboat Code Edition 3 - Appendix 8',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 Appendix 8 1.2.2': {
    id: 'WBC3 Appendix 8 1.2.2',
    title: 'Appendix 8 1.2.2 - Risk Assessment for Safe Working',
    fullText: 'Vessel owner/operator shall produce effective Risk Assessment(s) identifying risks to personnel, vessels and environment. Outcomes shall inform development of safe systems of work.',
    sourceDocument: 'UK Workboat Code Edition 3 - Appendix 8',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 Appendix 8 1.2.3': {
    id: 'WBC3 Appendix 8 1.2.3',
    title: 'Appendix 8 1.2.3 - Health and Safety Protection Policy',
    fullText: 'Vessel owner/operator shall produce a Health and Safety Protection Policy with a competent delegated person for health and safety, and policy on alcohol and drug abuse prevention.',
    sourceDocument: 'UK Workboat Code Edition 3 - Appendix 8',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 Appendix 8 3.1': {
    id: 'WBC3 Appendix 8 3.1',
    title: 'Appendix 8 3.1 - Risk Assessment Development',
    fullText: 'The vessel owner/operator shall produce effective Risk Assessment(s) identifying risks to personnel, vessels and environment. Risk assessment outcomes shall inform development of safe systems of work.',
    sourceDocument: 'UK Workboat Code Edition 3 - Appendix 8',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  // Additional cross-references
  'WBC3 Table 14.1.2': {
    id: 'WBC3 Table 14.1.2',
    title: 'WBC3 Table 14.1.2 - Life-Saving Appliances Table',
    fullText: 'Table 14.1.2 specifies minimum carriage requirements for all life-saving appliances including liferafts, lifebuoys, lifejackets, TPAs, portable VHF, EPIRB, PLBs, SART, pyrotechnics and training materials by area category.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 Table 17.2.1': {
    id: 'WBC3 Table 17.2.1',
    title: 'WBC3 Table 17.2.1 - Radio Equipment Carriage',
    fullText: 'Table 17.2.1 specifies minimum radiocommunication equipment carriage requirements based on GMDSS Sea Area including VHF DSC, portable VHF, EPIRB, SART, and optional MF/satellite equipment.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 Table A5.1': {
    id: 'WBC3 Table A5.1',
    title: 'WBC3 Table A5.1 - Minimum Qualifications',
    fullText: 'Table A5.1 specifies minimum qualification requirements for masters and crew based on vessel type, tonnage and area category of operation.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 Definitions': {
    id: 'WBC3 Definitions',
    title: 'WBC3 Section 2 - Definitions',
    fullText: 'Section 2 of the Code provides comprehensive definitions for terms used throughout WBC3 including vessel types, area categories, equipment standards and operational terms.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  },

  'WBC3 Footnote 49': {
    id: 'WBC3 Footnote 49',
    title: 'WBC3 Footnote 49 - MOB Drill Conditions',
    fullText: 'MOB drills shall be carried out in a range of daylight, low light (e.g. dusk) and weather conditions, which shall be noted in the Official Log Book and reviewed to satisfaction of Certifying Authority.',
    sourceDocument: 'UK Workboat Code Edition 3',
    url: 'https://www.gov.uk/government/publications/msn-1856-uk-workboat-code'
  }
}

/**
 * Get reference data by reference string
 * Handles multi-reference strings like "WBC3 19.2.7; Annex 3 13.1.1"
 */
export function getReferenceData(reference: string): RegulationReference | null {
  // Try exact match first
  if (WBC3_REFERENCES[reference]) {
    return WBC3_REFERENCES[reference]
  }

  // Try to extract first reference from multi-reference strings
  const firstRef = reference.split(';')[0].trim()
  if (WBC3_REFERENCES[firstRef]) {
    return WBC3_REFERENCES[firstRef]
  }

  // Try to extract reference from slashes (e.g., "WBC3 19.3.4/MGN 319")
  const slashRef = reference.split('/')[0].trim()
  if (WBC3_REFERENCES[slashRef]) {
    return WBC3_REFERENCES[slashRef]
  }

  // If still no match, check if it's a combined reference we have mapped
  if (WBC3_REFERENCES[reference]) {
    return WBC3_REFERENCES[reference]
  }

  return null
}

/**
 * Check if a reference has data available
 */
export function hasReferenceData(reference: string): boolean {
  return getReferenceData(reference) !== null
}
