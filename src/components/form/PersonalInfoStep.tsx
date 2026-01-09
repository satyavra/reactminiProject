import React from 'react'
import { useFormContext } from '../../context/FormContext'
import { useLanguage } from '../../context/LanguageContext'
import './FormSteps.css'

interface FormFieldProps {
  label: string
  name: string
  type?: string
  value: string
  onChange: (value: string) => void
  error?: string
  required?: string
}

const FormField: React.FC<FormFieldProps> = React.memo(({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  error, 
  required 
}) => {
  return (
    <div className="form-field">
      <label htmlFor={name} className="form-label">
        {label} {required && <span className="required">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`form-input ${error ? 'error' : ''}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <span id={`${name}-error`} className="error-message" role="alert">
          {error}
        </span>
      )}
    </div>
  )
})

FormField.displayName = 'FormField'

export const PersonalInfoStep: React.FC = () => {
  const { state, updatePersonalInfo } = useFormContext()
  const { t } = useLanguage()
  const { personalInfo } = state.formData
  const errors = state.errors.personalInfo || {}

  return (
    <div className="form-step">
      <h2>{t('personalInfo.title')}</h2>
      <p>{t('personalInfo.subtitle')}</p>
      
      <div className="form-grid">
        <FormField
          label={t('personalInfo.firstName')}
          name="firstName"
          value={personalInfo.firstName}
          onChange={(value) => updatePersonalInfo({ firstName: value })}
          error={errors.firstName}
          required="*"
        />
        
        <FormField
          label={t('personalInfo.lastName')}
          name="lastName"
          value={personalInfo.lastName}
          onChange={(value) => updatePersonalInfo({ lastName: value })}
          error={errors.lastName}
          required="*"
        />
        
        <FormField
          label={t('personalInfo.email')}
          name="email"
          type="email"
          value={personalInfo.email}
          onChange={(value) => updatePersonalInfo({ email: value })}
          error={errors.email}
          required="*"
        />
        
        <FormField
          label={t('personalInfo.phone')}
          name="phone"
          type="tel"
          value={personalInfo.phone}
          onChange={(value) => updatePersonalInfo({ phone: value })}
          error={errors.phone}
          required="*"
        />
        
        <FormField
          label={t('personalInfo.dateOfBirth')}
          name="dateOfBirth"
          type="date"
          value={personalInfo.dateOfBirth}
          onChange={(value) => updatePersonalInfo({ dateOfBirth: value })}
          error={errors.dateOfBirth}
          required="*"
        />
      </div>
    </div>
  )
}
