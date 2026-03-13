// Form data types for SMS Questionnaire

export interface QuestionnaireFormData {
  // Page 1: Company Information
  COMPANY_NAME: string
  COMPANY_ADDRESS: string
  CONTACT_NAME: string
  CONTACT_EMAIL: string
  CONTACT_PHONE: string

  // Page 2: Vessel Overview
  VESSEL_COUNT: number
  OPERATING_AREA: string
  PRIMARY_PORT: string
  OPERATION_TYPES: string[]

  // Page 3: Vessel Details (dynamic array)
  VESSELS: VesselDetails[]

  // Page 4: Personnel
  MASTER_NAME: string
  MASTER_QUALIFICATIONS: string
  CREW_COUNT: string
  CREW_NAMES?: string
  CREW_QUALIFICATIONS?: string
  EMERGENCY_CONTACT: string

  // Page 5: Operations & Safety
  OPERATING_HOURS?: string
  MAX_DISTANCE: string
  VHF_CHANNELS: string
  NEAREST_COASTGUARD: string
  SAFETY_EQUIPMENT: string[]
  INSURANCE_PROVIDER: string
  INSURANCE_POLICY: string

  // Page 6: Additional Information
  EXISTING_PROCEDURES: 'Yes' | 'No'
  LAST_INSPECTION?: string
  SPECIAL_REQUIREMENTS?: string
  REFERRAL_SOURCE?: string
}

export interface VesselDetails {
  VESSEL_NAME: string
  VESSEL_TYPE: string
  REGISTRATION: string
  YEAR_BUILT?: string
  LENGTH?: string
  MAX_CREW: string
  ENGINE?: string
}

export const OPERATION_TYPE_OPTIONS = [
  'Safety Boat',
  'Harbour Services',
  'Line Handling',
  'Towing',
  'Other'
]

export const VESSEL_TYPE_OPTIONS = [
  'RIB',
  'Workboat',
  'Safety Boat',
  'Tug',
  'Other'
]

export const SAFETY_EQUIPMENT_OPTIONS = [
  'Life jackets',
  'Fire extinguisher',
  'First aid kit',
  'Flares',
  'EPIRB',
  'VHF radio',
  'Liferaft',
  'MOB equipment'
]

export const REFERRAL_SOURCE_OPTIONS = [
  'Google Search',
  'Recommendation',
  'LinkedIn',
  'Industry Event',
  'Direct Contact',
  'Other'
]
