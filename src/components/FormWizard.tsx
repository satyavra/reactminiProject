import React, { useEffect } from 'react'
import { useFormContext } from '../context/FormContext'
import { useLanguage } from '../context/LanguageContext'
import { PersonalInfoStep } from './form/PersonalInfoStep'
import { AddressStep } from './form/AddressStep'
import { PreferencesStep } from './form/PreferencesStep'
import { ReviewStep } from './form/ReviewStep'
import './FormWizard.css'

const stepTitles = {
  'personal-info': 'personalInfo',
  'address': 'address',
  'preferences': 'preferences',
  'review': 'review'
}

const stepIcons = {
  'personal-info': '👤',
  'address': '📍',
  'preferences': '⚙️',
  'review': '✅'
}

export const FormWizard: React.FC = () => {
  const { 
    state, 
    nextStep, 
    prevStep, 
    goToStep, 
    validateStep, 
    resetForm 
  } = useFormContext()
  const { t } = useLanguage()

  const { currentStep, isSaved, lastSaved } = state
  const steps = Object.keys(stepTitles) as Array<keyof typeof stepTitles>
  const currentStepIndex = steps.indexOf(currentStep)
  const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100

  const handleNext = () => {
    if (validateStep(currentStep, t)) {
      nextStep()
    }
  }

  const handlePrev = () => {
    prevStep()
  }

  const handleStepClick = (step: keyof typeof stepTitles) => {
    const stepIndex = steps.indexOf(step)
    if (stepIndex <= currentStepIndex || validateStep(currentStep, t)) {
      goToStep(step)
    }
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'personal-info':
        return <PersonalInfoStep />
      case 'address':
        return <AddressStep />
      case 'preferences':
        return <PreferencesStep />
      case 'review':
        return <ReviewStep />
      default:
        return <PersonalInfoStep />
    }
  }

  const formatLastSaved = (date: Date | null) => {
    if (!date) return null
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffSecs = Math.floor(diffMs / 1000)
    
    if (diffSecs < 60) return t('autosave.justNow')
    if (diffSecs < 3600) return `${Math.floor(diffSecs / 60)} ${t('autosave.minutesAgo')}`
    return `${Math.floor(diffSecs / 3600)} ${t('autosave.hoursAgo')}`
  }

  return (
    <div className="form-wizard">
      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="progress-text">
          {t('progress.step')} {currentStepIndex + 1} {t('progress.of')} {steps.length} ({Math.round(progressPercentage)}%)
        </div>
      </div>

      {/* Step Navigation */}
      <div className="step-navigation">
        {steps.map((step, index) => (
          <button
            key={step}
            className={`step-button ${step === currentStep ? 'active' : ''} ${
              index < currentStepIndex ? 'completed' : ''
            }`}
            onClick={() => handleStepClick(step)}
            disabled={index > currentStepIndex}
          >
            <div className="step-icon">
              {index < currentStepIndex ? '✓' : stepIcons[step]}
            </div>
            <div className="step-info">
              <div className="step-number">{t('progress.step')} {index + 1}</div>
              <div className="step-title">{t(`step.${stepTitles[step]}`)}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Auto-save Indicator */}
      <div className={`autosave-indicator ${isSaved ? 'saved' : 'saving'}`}>
        <div className="autosave-icon">
          {isSaved ? '✓' : '⟳'}
        </div>
        <div className="autosave-text">
          {isSaved ? (
            <>
              {t('autosave.saved')}
              {lastSaved && (
                <span className="autosave-time">
                  ({formatLastSaved(lastSaved)})
                </span>
              )}
            </>
          ) : (
            t('autosave.saving')
          )}
        </div>
      </div>

      {/* Form Content */}
      <div className="form-content">
        {renderCurrentStep()}
      </div>

      {/* Navigation Buttons */}
      <div className="form-navigation">
        <div className="nav-buttons">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="nav-button prev"
          >
            {t('nav.previous')}
          </button>

          {currentStep === 'review' ? (
            <button
              type="button"
              onClick={resetForm}
              className="nav-button reset"
            >
              {t('nav.reset')}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="nav-button next"
            >
              {t('nav.next')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
