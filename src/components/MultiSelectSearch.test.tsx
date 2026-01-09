import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import MultiSelectSearch from './MultiSelectSearch'

// Mock alert for testing
global.alert = jest.fn()

describe('MultiSelectSearch Component', () => {
  const mockOptions = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
    { value: 'grape', label: 'Grape' }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    localStorageMock.clear()
  })

  // Test Case 1: Basic Rendering and Initial State
  test('renders correctly with initial state', () => {
    render(<MultiSelectSearch options={mockOptions} placeholder="Search fruits..." />)
    
    // Check if placeholder is visible
    expect(screen.getByPlaceholderText('Search fruits...')).toBeInTheDocument()
    
    // Check if no items are selected initially
    expect(screen.queryByText('Apple')).not.toBeInTheDocument()
    expect(screen.queryByText('Banana')).not.toBeInTheDocument()
    
    // Check if dropdown is closed initially
    expect(screen.queryByText('Apple')).not.toBeInTheDocument()
  })

  // Test Case 2: Search and Selection Functionality
  test('allows searching and selecting multiple items', async () => {
    const user = userEvent.setup()
    render(<MultiSelectSearch options={mockOptions} />)
    
    // Click on input to open dropdown
    const input = screen.getByPlaceholderText('Search and select items...')
    await user.click(input)
    
    // Type search query
    await user.type(input, 'app')
    
    // Check if filtered options appear
    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument()
    })
    
    // Select Apple
    await user.click(screen.getByText('Apple'))
    
    // Check if Apple is selected
    expect(screen.getByText('Apple')).toBeInTheDocument()
    expect(screen.getByText('×')).toBeInTheDocument()
    
    // Clear search and select another item
    await user.clear(input)
    await user.type(input, 'ban')
    
    await waitFor(() => {
      expect(screen.getByText('Banana')).toBeInTheDocument()
    })
    
    await user.click(screen.getByText('Banana'))
    
    // Check if both items are selected
    expect(screen.getByText('Apple')).toBeInTheDocument()
    expect(screen.getByText('Banana')).toBeInTheDocument()
    
    // Check selection summary
    expect(screen.getByText('2 items selected')).toBeInTheDocument()
  })

  // Test Case 3: Show Selected Functionality and Clear All
  test('shows selected values and allows clearing all', async () => {
    const user = userEvent.setup()
    render(<MultiSelectSearch options={mockOptions} />)
    
    const input = screen.getByPlaceholderText('Search and select items...')
    await user.click(input)
    
    // Select multiple items
    await user.click(screen.getByText('Apple'))
    await user.click(screen.getByText('Banana'))
    
    // Test show selected functionality
    const showSelectedButton = screen.getByText('🔍 Show Selected')
    await user.click(showSelectedButton)
    
    expect(global.alert).toHaveBeenCalledWith('Selected items: Apple, Banana')
    
    // Test clear all functionality
    const clearAllButton = screen.getByText('Clear all')
    await user.click(clearAllButton)
    
    // Check if all items are cleared
    expect(screen.queryByText('Apple')).not.toBeInTheDocument()
    expect(screen.queryByText('Banana')).not.toBeInTheDocument()
    expect(screen.queryByText('Clear all')).not.toBeInTheDocument()
    
    // Test show selected with no items
    await user.click(showSelectedButton)
    expect(global.alert).toHaveBeenCalledWith('No items selected yet!')
  })
})
