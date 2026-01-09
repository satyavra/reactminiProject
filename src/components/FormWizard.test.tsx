import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { FormProvider } from '../context/FormContext'
import { ThemeProvider } from '../context/ThemeContext'
import { FormWizard } from './FormWizard'

// Mock alert for testing
global.alert = jest.fn()

// Test wrapper component
const TestFormWizard: React.FC = () => (
  <ThemeProvider>
    <FormProvider>
      <FormWizard />
    </FormProvider>
  </ThemeProvider>
)

describe('FormWizard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorageMock.clear()
  })

  // Test Case 1: Initial Rendering and Progress Tracking
  test('renders correctly with initial state and progress', () => {
    render(<TestFormWizard />)
    
    // Check if current step is displayed
    expect(screen.getByText('Step 1 of 4 (25%)')).toBeInTheDocument()
    
    // Check if step navigation is rendered
    expect(screen.getByText('Personal Info')).toBeInTheDocument()
    expect(screen.getByText('Address')).toBeInTheDocument()
    expect(screen.getByText('Preferences')).toBeInTheDocument()
    expect(screen.getByText('Review')).toBeInTheDocument()
    
    // Check if first step is active
    expect(screen.getByText('Personal Information')).toBeInTheDocument()
    
    // Check if progress bar exists
    const progressBar = document.querySelector('.progress-fill')
    expect(progressBar).toHaveStyle('width: 25%')
    
    // Check if autosave indicator is present
    expect(screen.getByText('All changes saved')).toBeInTheDocument()
  })

  // Test Case 2: Form Navigation and Validation
  test('handles form navigation with validation', async () => {
    const user = userEvent.setup()
    render(<TestFormWizard />)
    
    // Try to go to next step without filling required fields
    const nextButton = screen.getByText('Next →')
    await user.click(nextButton)
    
    // Should stay on same step due to validation
    expect(screen.getByText('Personal Information')).toBeInTheDocument()
    expect(screen.getByText('Step 1 of 4 (25%)')).toBeInTheDocument()
    
    // Fill in required fields
    await user.type(screen.getByPlaceholderText('First Name'), 'John')
    await user.type(screen.getByPlaceholderText('Last Name'), 'Doe')
    await user.type(screen.getByPlaceholderText('Email Address'), 'john@example.com')
    await user.type(screen.getByPlaceholderText('Phone Number'), '1234567890')
    await user.type(screen.getByPlaceholderText('Date of Birth'), '1990-01-01')
    
    // Now try to go to next step
    await user.click(nextButton)
    
    // Should move to address step
    await waitFor(() => {
      expect(screen.getByText('Address Information')).toBeInTheDocument()
      expect(screen.getByText('Step 2 of 4 (50%)')).toBeInTheDocument()
    })
    
    // Check if previous button works
    const prevButton = screen.getByText('← Previous')
    await user.click(prevButton)
    
    // Should go back to personal info step
    await waitFor(() => {
      expect(screen.getByText('Personal Information')).toBeInTheDocument()
      expect(screen.getByText('Step 1 of 4 (25%)')).toBeInTheDocument()
    })
  })

  // Test Case 3: Complete Form Flow and Edit Functionality
  test('completes full form flow with edit functionality', async () => {
    const user = userEvent.setup()
    render(<TestFormWizard />)
    
    // Fill Personal Info
    await user.type(screen.getByPlaceholderText('First Name'), 'John')
    await user.type(screen.getByPlaceholderText('Last Name'), 'Doe')
    await user.type(screen.getByPlaceholderText('Email Address'), 'john@example.com')
    await user.type(screen.getByPlaceholderText('Phone Number'), '1234567890')
    await user.type(screen.getByPlaceholderText('Date of Birth'), '1990-01-01')
    
    // Go to Address step
    await user.click(screen.getByText('Next →'))
    
    // Fill Address
    await user.type(screen.getByPlaceholderText('Street Address'), '123 Main St')
    await user.type(screen.getByPlaceholderText('City'), 'New York')
    await user.type(screen.getByPlaceholderText('State/Province'), 'NY')
    await user.type(screen.getByPlaceholderText('ZIP/Postal Code'), '10001')
    await user.type(screen.getByPlaceholderText('Country'), 'USA')
    
    // Go to Preferences step
    await user.click(screen.getByText('Next →'))
    
    // Fill Preferences
    await user.click(screen.getByLabelText('Subscribe to newsletter'))
    await user.click(screen.getByLabelText('Enable email notifications'))
    
    // Go to Review step
    await user.click(screen.getByText('Next →'))
    
    // Check if review step is displayed
    await waitFor(() => {
      expect(screen.getByText('Review & Submit')).toBeInTheDocument()
      expect(screen.getByText('Step 4 of 4 (100%)')).toBeInTheDocument()
    })
    
    // Check if data is displayed correctly
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
    expect(screen.getByText('123 Main St')).toBeInTheDocument()
    expect(screen.getByText('New York')).toBeInTheDocument()
    
    // Test edit functionality
    const editPersonalInfoButton = screen.getAllByText('✏️ Edit')[0]
    await user.click(editPersonalInfoButton)
    
    // Should go back to personal info step
    await waitFor(() => {
      expect(screen.getByText('Personal Information')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('First Name')).toHaveValue('John')
    })
    
    // Go back to review step
    await user.click(screen.getByText('Next →')) // Address
    await user.click(screen.getByText('Next →')) // Preferences
    await user.click(screen.getByText('Next →')) // Review
    
    // Test submission
    const submitButton = screen.getByText('Submit Form')
    await user.click(submitButton)
    
    // Check if submission process starts
    await waitFor(() => {
      expect(screen.getByText('Submitting...')).toBeInTheDocument()
    })
    
    // Wait for submission to complete (mocked)
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Form submitted successfully!')
    }, { timeout: 3000 })
  })
})
