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

export const AddressStep: React.FC = () => {
  const { state, updateAddress } = useFormContext()
  const { t } = useLanguage()
  const { address } = state.formData
  const errors = state.errors.address || {}

  return (
    <div className="form-step">
      <h2>{t('address.title')}</h2>
      <p>{t('address.subtitle')}</p>
      
      <div className="form-grid">
        <FormField
          label={t('address.street')}
          name="street"
          value={address.street}
          onChange={(value) => updateAddress({ street: value })}
          error={errors.street}
          required="*"
        />
        
        <FormField
          label={t('address.city')}
          name="city"
          value={address.city}
          onChange={(value) => updateAddress({ city: value })}
          error={errors.city}
          required="*"
        />
        
        <FormField
          label={t('address.state')}
          name="state"
          value={address.state}
          onChange={(value) => updateAddress({ state: value })}
          error={errors.state}
          required="*"
        />
        
        <FormField
          label={t('address.zipCode')}
          name="zipCode"
          value={address.zipCode}
          onChange={(value) => updateAddress({ zipCode: value })}
          error={errors.zipCode}
          required="*"
        />
        
        <FormField
          label={t('address.country')}
          name="country"
          value={address.country}
          onChange={(value) => updateAddress({ country: value })}
          error={errors.country}
          required="*"
        />
      </div>
    </div>
  )
}
