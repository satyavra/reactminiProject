import React from 'react'
import { useFormContext } from '../../context/FormContext'
import { useLanguage } from '../../context/LanguageContext'
import './FormSteps.css'

interface CheckboxProps {
  label: string
  name: string
  checked: boolean
  onChange: (checked: boolean) => void
}

const CheckboxField: React.FC<CheckboxProps> = React.memo(({ 
  label, 
  name, 
  checked, 
  onChange 
}) => {
  return (
    <div className="checkbox-field">
      <label htmlFor={name} className="checkbox-label">
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="checkbox-input"
        />
        <span className="checkbox-text">{label}</span>
      </label>
    </div>
  )
})

CheckboxField.displayName = 'CheckboxField'

interface SelectProps {
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
}

const SelectField: React.FC<SelectProps> = React.memo(({ 
  label, 
  name, 
  value, 
  onChange, 
  options 
}) => {
  return (
    <div className="form-field">
      <label htmlFor={name} className="form-label">{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-select"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
})

SelectField.displayName = 'SelectField'

export const PreferencesStep: React.FC = () => {
  const { state, updatePreferences } = useFormContext()
  const { t } = useLanguage()
  const { preferences } = state.formData

  const themeOptions = [
    { value: 'light', label: t('preferences.theme.light') },
    { value: 'dark', label: t('preferences.theme.dark') },
    { value: 'auto', label: t('preferences.theme.auto') }
  ]

  const languageOptions = [
    { value: 'en', label: t('preferences.language.en') },
    { value: 'es', label: t('preferences.language.es') },
    { value: 'fr', label: t('preferences.language.fr') },
    { value: 'de', label: t('preferences.language.de') },
    { value: 'zh', label: t('preferences.language.zh') },
    { value: 'ja', label: t('preferences.language.ja') }
  ]

  return (
    <div className="form-step">
      <h2>{t('preferences.title')}</h2>
      <p>{t('preferences.subtitle')}</p>
      
      <div className="preferences-section">
        <h3>{t('preferences.communication')}</h3>
        <div className="checkbox-group">
          <CheckboxField
            label={t('preferences.newsletter')}
            name="newsletter"
            checked={preferences.newsletter}
            onChange={(checked) => updatePreferences({ newsletter: checked })}
          />
          
          <CheckboxField
            label={t('preferences.notifications')}
            name="notifications"
            checked={preferences.notifications}
            onChange={(checked) => updatePreferences({ notifications: checked })}
          />
        </div>
      </div>
      
      <div className="preferences-section">
        <h3>{t('preferences.display')}</h3>
        <div className="form-grid">
          <SelectField
            label={t('preferences.theme')}
            name="theme"
            value={preferences.theme}
            onChange={(value) => updatePreferences({ theme: value as 'light' | 'dark' | 'auto' })}
            options={themeOptions}
          />
          
          <SelectField
            label={t('preferences.language')}
            name="language"
            value={preferences.language}
            onChange={(value) => updatePreferences({ language: value })}
            options={languageOptions}
          />
        </div>
      </div>
    </div>
  )
}
