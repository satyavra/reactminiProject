import React from 'react'
import { useTheme } from '../context/ThemeContext'
import './ThemeToggle.css'

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme()

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'auto') => {
    setTheme(newTheme)
  }

  return (
    <div className="theme-toggle">
      <div className="theme-toggle-label">Theme:</div>
      <div className="theme-options">
        <button
          className={`theme-option ${theme === 'light' ? 'active' : ''}`}
          onClick={() => handleThemeChange('light')}
          aria-label="Light theme"
        >
          ☀️ Light
        </button>
        <button
          className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
          onClick={() => handleThemeChange('dark')}
          aria-label="Dark theme"
        >
          🌙 Dark
        </button>
        <button
          className={`theme-option ${theme === 'auto' ? 'active' : ''}`}
          onClick={() => handleThemeChange('auto')}
          aria-label="Auto theme"
        >
          🔄 Auto
        </button>
      </div>
    </div>
  )
}
