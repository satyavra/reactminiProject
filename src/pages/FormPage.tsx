import React from 'react'
import { FormProvider } from '../context/FormContext'
import { ThemeProvider } from '../context/ThemeContext'
import { LanguageProvider } from '../context/LanguageContext'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { FormWizard } from '../components/FormWizard'
import { ThemeToggle } from '../components/ThemeToggle'
import { LanguageToggle } from '../components/LanguageToggle'
import './FormPage.css'

export const FormPage: React.FC = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <FormProvider>
          <ErrorBoundary>
            <div className="form-page">
              <header className="form-header">
                <div className="header-content">
                  <h1>User Onboarding</h1>
                  <p>Complete your profile in a few simple steps</p>
                </div>
                <div className="header-controls">
                  <LanguageToggle />
                  <ThemeToggle />
                </div>
              </header>
              
              <main className="form-main">
                <FormWizard />
              </main>
              
              <footer className="form-footer">
                <p>&copy; 2024 Multi-Step Form Wizard. All rights reserved.</p>
              </footer>
            </div>
          </ErrorBoundary>
        </FormProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}
