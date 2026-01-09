import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import './LanguageToggle.css'

export const LanguageToggle: React.FC = () => {
  const { currentLanguage, setLanguage } = useLanguage()

  const handleLanguageChange = (language: 'en' | 'hi') => {
    setLanguage(language)
  }

  return (
    <div className="language-toggle">
      <div className="language-toggle-label">Language:</div>
      <div className="language-options">
        <button
          className={`language-option ${currentLanguage === 'en' ? 'active' : ''}`}
          onClick={() => handleLanguageChange('en')}
          aria-label="English language"
        >
          🇺🇸 English
        </button>
        <button
          className={`language-option ${currentLanguage === 'hi' ? 'active' : ''}`}
          onClick={() => handleLanguageChange('hi')}
          aria-label="Hindi language"
        >
          🇮🇳 हिंदी
        </button>
      </div>
    </div>
  )
}
