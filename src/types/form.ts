export interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface Preferences {
  newsletter: boolean
  notifications: boolean
  theme: 'light' | 'dark' | 'auto'
  language: string
}

export interface FormData {
  personalInfo: PersonalInfo
  address: Address
  preferences: Preferences
}

export interface FormErrors {
  personalInfo?: Partial<Record<keyof PersonalInfo, string>>
  address?: Partial<Record<keyof Address, string>>
  preferences?: Partial<Record<keyof Preferences, string>>
}

export type FormStep = 'personal-info' | 'address' | 'preferences' | 'review'

export interface FormState {
  currentStep: FormStep
  formData: FormData
  errors: FormErrors
  isSubmitting: boolean
  isSaved: boolean
  lastSaved: Date | null
}

export type FormAction =
  | { type: 'SET_STEP'; payload: FormStep }
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<PersonalInfo> }
  | { type: 'UPDATE_ADDRESS'; payload: Partial<Address> }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<Preferences> }
  | { type: 'SET_ERRORS'; payload: FormErrors }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'SET_SAVED'; payload: boolean }
  | { type: 'LOAD_SAVED_DATA'; payload: FormData }
  | { type: 'RESET_FORM' }

export type Language = 'en' | 'hi'

export interface LanguageContextType {
  currentLanguage: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}
