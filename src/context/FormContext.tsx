import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { FormState, FormAction, FormData, FormStep } from '../types/form'

const initialFormData: FormData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: ''
  },
  address: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  },
  preferences: {
    newsletter: false,
    notifications: false,
    theme: 'auto',
    language: 'en'
  }
}

const initialState: FormState = {
  currentStep: 'personal-info',
  formData: initialFormData,
  errors: {},
  isSubmitting: false,
  isSaved: true,
  lastSaved: null
}

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload }
    
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        formData: {
          ...state.formData,
          personalInfo: { ...state.formData.personalInfo, ...action.payload }
        },
        isSaved: false
      }
    
    case 'UPDATE_ADDRESS':
      return {
        ...state,
        formData: {
          ...state.formData,
          address: { ...state.formData.address, ...action.payload }
        },
        isSaved: false
      }
    
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        formData: {
          ...state.formData,
          preferences: { ...state.formData.preferences, ...action.payload }
        },
        isSaved: false
      }
    
    case 'SET_ERRORS':
      return { ...state, errors: action.payload }
    
    case 'CLEAR_ERRORS':
      return { ...state, errors: {} }
    
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.payload }
    
    case 'SET_SAVED':
      return { ...state, isSaved: action.payload, lastSaved: action.payload ? new Date() : null }
    
    case 'LOAD_SAVED_DATA':
      return { ...state, formData: action.payload, isSaved: true, lastSaved: new Date() }
    
    case 'RESET_FORM':
      return { ...initialState }
    
    default:
      return state
  }
}

interface FormContextType {
  state: FormState
  dispatch: React.Dispatch<FormAction>
  nextStep: () => void
  prevStep: () => void
  goToStep: (step: FormStep) => void
  updatePersonalInfo: (data: Partial<FormData['personalInfo']>) => void
  updateAddress: (data: Partial<FormData['address']>) => void
  updatePreferences: (data: Partial<FormData['preferences']>) => void
  validateStep: (step: FormStep, t: (key: string) => string) => boolean
  submitForm: () => Promise<void>
  resetForm: () => void
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export const useFormContext = () => {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider')
  }
  return context
}

interface FormProviderProps {
  children: React.ReactNode
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState)

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('multiStepForm')
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        dispatch({ type: 'LOAD_SAVED_DATA', payload: parsedData })
      } catch (error) {
        console.error('Error loading saved form data:', error)
      }
    }
  }, [])

  // Auto-save to localStorage when form data changes
  useEffect(() => {
    if (!state.isSaved) {
      const timer = setTimeout(() => {
        localStorage.setItem('multiStepForm', JSON.stringify(state.formData))
        dispatch({ type: 'SET_SAVED', payload: true })
      }, 1000) // Debounce for 1 second

      return () => clearTimeout(timer)
    }
  }, [state.formData, state.isSaved])

  const nextStep = () => {
    const steps: FormStep[] = ['personal-info', 'address', 'preferences', 'review']
    const currentIndex = steps.indexOf(state.currentStep)
    if (currentIndex < steps.length - 1) {
      dispatch({ type: 'SET_STEP', payload: steps[currentIndex + 1] })
    }
  }

  const prevStep = () => {
    const steps: FormStep[] = ['personal-info', 'address', 'preferences', 'review']
    const currentIndex = steps.indexOf(state.currentStep)
    if (currentIndex > 0) {
      dispatch({ type: 'SET_STEP', payload: steps[currentIndex - 1] })
    }
  }

  const goToStep = (step: FormStep) => {
    dispatch({ type: 'SET_STEP', payload: step })
  }

  const updatePersonalInfo = (data: Partial<FormData['personalInfo']>) => {
    dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: data })
  }

  const updateAddress = (data: Partial<FormData['address']>) => {
    dispatch({ type: 'UPDATE_ADDRESS', payload: data })
  }

  const updatePreferences = (data: Partial<FormData['preferences']>) => {
    dispatch({ type: 'UPDATE_PREFERENCES', payload: data })
  }

  const validateStep = (step: FormStep, t: (key: string) => string): boolean => {
    const errors: FormErrors = {}

    switch (step) {
      case 'personal-info':
        const { personalInfo } = state.formData
        if (!personalInfo.firstName.trim()) {
          errors.personalInfo = { ...errors.personalInfo, firstName: t('personalInfo.firstName.required') }
        }
        if (!personalInfo.lastName.trim()) {
          errors.personalInfo = { ...errors.personalInfo, lastName: t('personalInfo.lastName.required') }
        }
        if (!personalInfo.email.trim()) {
          errors.personalInfo = { ...errors.personalInfo, email: t('personalInfo.email.required') }
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)) {
          errors.personalInfo = { ...errors.personalInfo, email: t('personalInfo.email.invalid') }
        }
        if (!personalInfo.phone.trim()) {
          errors.personalInfo = { ...errors.personalInfo, phone: t('personalInfo.phone.required') }
        } else if (!/^\+?[\d\s\-\(\)]+$/.test(personalInfo.phone)) {
          errors.personalInfo = { ...errors.personalInfo, phone: t('personalInfo.phone.invalid') }
        }
        if (!personalInfo.dateOfBirth) {
          errors.personalInfo = { ...errors.personalInfo, dateOfBirth: t('personalInfo.dateOfBirth.required') }
        }
        break

      case 'address':
        const { address } = state.formData
        if (!address.street.trim()) {
          errors.address = { ...errors.address, street: t('address.street.required') }
        }
        if (!address.city.trim()) {
          errors.address = { ...errors.address, city: t('address.city.required') }
        }
        if (!address.state.trim()) {
          errors.address = { ...errors.address, state: t('address.state.required') }
        }
        if (!address.zipCode.trim()) {
          errors.address = { ...errors.address, zipCode: t('address.zipCode.required') }
        } else if (!/^\d{5}(-\d{4})?$/.test(address.zipCode)) {
          errors.address = { ...errors.address, zipCode: t('address.zipCode.invalid') }
        }
        if (!address.country.trim()) {
          errors.address = { ...errors.address, country: t('address.country.required') }
        }
        break

      case 'preferences':
        // Preferences are mostly optional, no validation needed
        break

      case 'review':
        // Review step doesn't need validation as it's a summary
        break
    }

    dispatch({ type: 'SET_ERRORS', payload: errors })
    return Object.keys(errors).length === 0
  }

  const submitForm = async () => {
    dispatch({ type: 'SET_SUBMITTING', payload: true })
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Clear localStorage on successful submission
      localStorage.removeItem('multiStepForm')
      
      alert('Form submitted successfully!')
      dispatch({ type: 'RESET_FORM' })
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Error submitting form. Please try again.')
    } finally {
      dispatch({ type: 'SET_SUBMITTING', payload: false })
    }
  }

  const resetForm = () => {
    localStorage.removeItem('multiStepForm')
    dispatch({ type: 'RESET_FORM' })
  }

  const value: FormContextType = {
    state,
    dispatch,
    nextStep,
    prevStep,
    goToStep,
    updatePersonalInfo,
    updateAddress,
    updatePreferences,
    validateStep,
    submitForm,
    resetForm
  }

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  )
}
