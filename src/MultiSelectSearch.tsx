import { useState, useRef, useEffect, KeyboardEvent, ChangeEvent, FocusEvent } from 'react'
import './MultiSelectSearch.css'

interface Option {
  value: string
  label: string
}

interface MultiSelectSearchProps {
  options?: Option[]
  placeholder?: string
}

const MultiSelectSearch = ({ options = [], placeholder = "Search and select items..." }: MultiSelectSearchProps) => {
  const [selectedItems, setSelectedItems] = useState<Option[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedItems.some(selected => selected.value === option.value)
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setHighlightedIndex(-1)
  }, [searchTerm])

  const handleSelect = (option: Option) => {
    setSelectedItems([...selectedItems, option])
    setSearchTerm('')
    setHighlightedIndex(-1)
    inputRef.current?.focus()
  }

  const handleRemove = (optionToRemove: Option) => {
    setSelectedItems(selectedItems.filter(item => item.value !== optionToRemove.value))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter') {
        e.preventDefault()
        setIsOpen(true)
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        break
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    if (!isOpen) {
      setIsOpen(true)
    }
  }

  const handleInputFocus = (e: FocusEvent<HTMLInputElement>) => {
    setIsOpen(true)
  }

  const handleClearAll = () => {
    setSelectedItems([])
    inputRef.current?.focus()
  }

  const handleShowSelected = () => {
    if (selectedItems.length === 0) {
      alert('No items selected yet!')
    } else {
      const selectedValues = selectedItems.map(item => item.label).join(', ')
      alert(`Selected items: ${selectedValues}`)
    }
  }

  return (
    <div className="multi-select-container" ref={dropdownRef}>
      <div className="multi-select-input-wrapper">
        <div className="selected-items">
          {selectedItems.map((item, index) => (
            <div key={item.value} className="selected-item">
              <span className="selected-item-label">{item.label}</span>
              <button
                className="remove-button"
                onClick={() => handleRemove(item)}
                aria-label={`Remove ${item.label}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        
        <input
          ref={inputRef}
          type="text"
          className="multi-select-input"
          placeholder={selectedItems.length === 0 ? placeholder : ""}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          aria-label="Search options"
        />
        
        {selectedItems.length > 0 && (
          <button
            className="clear-all-button"
            onClick={handleClearAll}
            aria-label="Clear all selections"
          >
            Clear all
          </button>
        )}
        
        <button
          className="show-selected-button"
          onClick={handleShowSelected}
          aria-label="Show selected items"
        >
          🔍 Show Selected
        </button>
        
        <button
          className={`dropdown-toggle ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle dropdown"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <path d="M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z"/>
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          {filteredOptions.length === 0 ? (
            <div className="no-results">
              {searchTerm ? 'No results found' : 'All options selected'}
            </div>
          ) : (
            <ul className="options-list">
              {filteredOptions.map((option, index) => (
                <li
                  key={option.value}
                  className={`option-item ${index === highlightedIndex ? 'highlighted' : ''}`}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      
      {selectedItems.length > 0 && (
        <div className="selection-summary">
          {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
        </div>
      )}
    </div>
  )
}

export default MultiSelectSearch
