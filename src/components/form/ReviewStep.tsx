import React from 'react'
import { useFormContext } from '../../context/FormContext'
import { useLanguage } from '../../context/LanguageContext'
import './FormSteps.css'

export const ReviewStep: React.FC = () => {
  const { state, submitForm, isSubmitting, goToStep } = useFormContext()
  const { t } = useLanguage()
  const { formData } = state

  const handleSubmit = async () => {
    await submitForm()
  }

  const formatPhone = (phone: string) => {
    // Basic phone formatting
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
    }
    return phone
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not provided'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getNewsletterStatus = () => {
    return formData.preferences.newsletter ? t('review.newsletter.subscribed') : t('review.newsletter.notSubscribed')
  }

  const getNotificationStatus = () => {
    return formData.preferences.notifications ? t('review.notifications.enabled') : t('review.notifications.disabled')
  }

  const getThemeDisplay = () => {
    return formData.preferences.theme.charAt(0).toUpperCase() + formData.preferences.theme.slice(1)
  }

  return (
    <div className="form-step">
      <h2>{t('review.title')}</h2>
      <p>{t('review.subtitle')}</p>
      
      <div className="review-sections">
        <div className="review-section">
          <div className="review-section-header">
            <h3>{t('review.personalInfo')}</h3>
            <button 
              className="edit-button"
              onClick={() => goToStep('personal-info')}
              aria-label={t('review.edit')}
            >
              ✏️ {t('review.edit')}
            </button>
          </div>
          <div className="review-grid">
            <div className="review-item">
              <label>{t('review.name')}:</label>
              <span>{formData.personalInfo.firstName} {formData.personalInfo.lastName}</span>
            </div>
            <div className="review-item">
              <label>{t('review.email')}:</label>
              <span>{formData.personalInfo.email}</span>
            </div>
            <div className="review-item">
              <label>{t('review.phone')}:</label>
              <span>{formatPhone(formData.personalInfo.phone)}</span>
            </div>
            <div className="review-item">
              <label>{t('review.dateOfBirth')}:</label>
              <span>{formatDate(formData.personalInfo.dateOfBirth)}</span>
            </div>
          </div>
        </div>
        
        <div className="review-section">
          <div className="review-section-header">
            <h3>{t('review.address')}</h3>
            <button 
              className="edit-button"
              onClick={() => goToStep('address')}
              aria-label={t('review.edit')}
            >
              ✏️ {t('review.edit')}
            </button>
          </div>
          <div className="review-grid">
            <div className="review-item">
              <label>{t('review.street')}:</label>
              <span>{formData.address.street}</span>
            </div>
            <div className="review-item">
              <label>{t('review.city')}:</label>
              <span>{formData.address.city}</span>
            </div>
            <div className="review-item">
              <label>{t('review.state')}:</label>
              <span>{formData.address.state}</span>
            </div>
            <div className="review-item">
              <label>{t('review.zipCode')}:</label>
              <span>{formData.address.zipCode}</span>
            </div>
            <div className="review-item">
              <label>{t('review.country')}:</label>
              <span>{formData.address.country}</span>
            </div>
          </div>
        </div>
        
        <div className="review-section">
          <div className="review-section-header">
            <h3>{t('review.preferences')}</h3>
            <button 
              className="edit-button"
              onClick={() => goToStep('preferences')}
              aria-label={t('review.edit')}
            >
              ✏️ {t('review.edit')}
            </button>
          </div>
          <div className="review-grid">
            <div className="review-item">
              <label>{t('review.newsletter')}:</label>
              <span>{getNewsletterStatus()}</span>
            </div>
            <div className="review-item">
              <label>{t('review.notifications')}:</label>
              <span>{getNotificationStatus()}</span>
            </div>
            <div className="review-item">
              <label>{t('review.theme')}:</label>
              <span>{getThemeDisplay()}</span>
            </div>
            <div className="review-item">
              <label>{t('review.language')}:</label>
              <span>{formData.preferences.language.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="submit-section">
        <div className="submit-notice">
          <p>
            <strong>{t('review.notice')}</strong>
          </p>
        </div>
        
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="submit-button"
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              {t('review.submitting')}
            </>
          ) : (
            t('review.submit')
          )}
        </button>
      </div>
    </div>
  )
}
