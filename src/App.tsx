import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { FormPage } from './pages/FormPage'
import MultiSelectSearch from './MultiSelectSearch'
import './App.css'

interface Option {
  value: string
  label: string
}

const sampleOptions: Option[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'blueberry', label: 'Blueberry' },
  { value: 'mango', label: 'Mango' },
  { value: 'pineapple', label: 'Pineapple' },
  { value: 'watermelon', label: 'Watermelon' },
  { value: 'kiwi', label: 'Kiwi' },
  { value: 'peach', label: 'Peach' },
  { value: 'plum', label: 'Plum' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'lemon', label: 'Lemon' },
  { value: 'lime', label: 'Lime' }
]

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="app-nav">
          <Link to="/" className="nav-link">Multi-Select Demo</Link>
          <Link to="/form" className="nav-link">Form Wizard</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={
            <div className="container">
              <header className="header">
                <h1>Multi-Select Search Component</h1>
                <p>A beautiful, accessible multi-select dropdown with search functionality</p>
              </header>
              
              <main className="main-content">
                <div className="demo-section">
                  <h2>Fruits Selection</h2>
                  <p>Search and select multiple fruits from the dropdown below:</p>
                  
                  <MultiSelectSearch 
                    options={sampleOptions}
                    placeholder="Search for fruits..."
                  />
                  
                  <div className="features">
                    <h3>Features:</h3>
                    <ul>
                      <li>🔍 Real-time search filtering</li>
                      <li>✨ Beautiful gradient design</li>
                      <li>⌨️ Keyboard navigation (Arrow keys, Enter, Escape)</li>
                      <li>🖱️ Click to select, click × to deselect</li>
                      <li>📱 Responsive and mobile-friendly</li>
                      <li>🌙 Dark mode support</li>
                      <li>♿ Accessibility features</li>
                      <li>🎯 Clear all selections at once</li>
                      <li>📋 Show selected values button</li>
                    </ul>
                  </div>
                </div>
              </main>
            </div>
          } />
          <Route path="/form" element={<FormPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
