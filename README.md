# Multi-Step Form Wizard & Multi-Select Search Components

A comprehensive React application featuring a multi-step form wizard with advanced state management and a beautiful multi-select search component.

## 🚀 Features

### Multi-Step Form Wizard
- **4-Step Process**: Personal Info → Address → Preferences → Review & Submit
- **Advanced State Management**: React Context + Reducer pattern
- **Data Persistence**: Auto-save to localStorage with debouncing
- **Field Validation**: Real-time validation with inline error messages
- **Progress Tracking**: Visual progress bar and step indicators
- **Edit Functionality**: Edit any section from the review page
- **Dark Mode**: Theme toggle with system preference detection
- **Error Boundaries**: Graceful error handling
- **Responsive Design**: Mobile-friendly layout

### Multi-Select Search Component
- **Real-time Search**: Filter options as you type
- **Multiple Selection**: Select/deselect multiple items
- **Keyboard Navigation**: Arrow keys, Enter, Escape support
- **Beautiful UI**: Gradient design with smooth animations
- **Accessibility**: ARIA labels and keyboard support
- **Show Selected**: Display all selected values
- **Clear All**: Remove all selections at once

## 🛠️ Technology Stack

- **React 19.2.0** - UI library
- **TypeScript** - Type safety
- **Vite 7.2.4** - Build tool
- **React Router DOM** - Client-side routing
- **CSS** - Styling with CSS variables for theming

## 📁 Project Structure

```
src/
├── components/
│   ├── form/
│   │   ├── PersonalInfoStep.tsx      # Personal info form step
│   │   ├── AddressStep.tsx           # Address form step
│   │   ├── PreferencesStep.tsx       # Preferences form step
│   │   ├── ReviewStep.tsx            # Review & submit step
│   │   └── FormSteps.css             # Form step styles
│   ├── FormWizard.tsx                # Main form wizard component
│   ├── FormWizard.css                # Form wizard styles
│   ├── MultiSelectSearch.tsx         # Multi-select search component
│   ├── MultiSelectSearch.css         # Multi-select styles
│   ├── ThemeToggle.tsx               # Theme toggle component
│   ├── ThemeToggle.css               # Theme toggle styles
│   └── ErrorBoundary.tsx             # Error boundary component
├── context/
│   ├── FormContext.tsx               # Form state management
│   └── ThemeContext.tsx              # Theme state management
├── pages/
│   ├── FormPage.tsx                  # Form wizard page
│   └── FormPage.css                  # Form page styles
├── types/
│   └── form.ts                       # TypeScript type definitions
├── App.tsx                           # Main app component with routing
├── main.tsx                          # Application entry point
└── index.css                         # Global styles
```

## 🏗️ Component Architecture

### Form State Management
The form uses React Context with a reducer pattern for state management:

```typescript
// FormContext.tsx
interface FormState {
  currentStep: FormStep
  formData: FormData
  errors: FormErrors
  isSubmitting: boolean
  isSaved: boolean
  lastSaved: Date | null
}

// Actions for state updates
type FormAction = 
  | { type: 'SET_STEP'; payload: FormStep }
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<PersonalInfo> }
  | { type: 'UPDATE_ADDRESS'; payload: Partial<Address> }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<Preferences> }
  // ... more actions
```

### Validation System
Each step has comprehensive validation:

- **Personal Info**: Email format, phone format, required fields
- **Address**: ZIP code format, required fields
- **Preferences**: Optional fields with boolean and select inputs
- **Review**: Summary validation before submission

### Performance Optimizations
- **React.memo**: Used for form field components to prevent unnecessary re-renders
- **Debounced Auto-save**: Prevents excessive localStorage writes
- **Error Boundaries**: Catches and handles component errors gracefully

## 🎨 Styling & Theming

### CSS Architecture
- **Component-based CSS**: Each component has its own CSS file
- **CSS Variables**: Used for consistent theming
- **Dark Mode**: Automatic system preference detection with manual override
- **Responsive Design**: Mobile-first approach with breakpoints

### Theme System
```css
/* Light theme (default) */
:root {
  --bg-primary: #ffffff;
  --text-primary: #1f2937;
  --border-color: #e5e7eb;
}

/* Dark theme */
[data-theme="dark"] {
  --bg-primary: #1f2937;
  --text-primary: #f9fafb;
  --border-color: #374151;
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd reactminiProject
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Run tests with UI interface
npm run test:ui

# Run tests with coverage report
npm run test:coverage

# Run ESLint
npm run lint
```

## 🧪 Testing

### Test Coverage
The project includes comprehensive test suites for both major components:

#### Multi-Select Search Tests (`src/components/MultiSelectSearch.test.tsx`)
- **Test Case 1**: Basic rendering and initial state verification
- **Test Case 2**: Search functionality and multiple item selection
- **Test Case 3**: Show selected values and clear all functionality

#### Form Wizard Tests (`src/components/FormWizard.test.tsx`)
- **Test Case 1**: Initial rendering, progress tracking, and step navigation
- **Test Case 2**: Form validation and navigation between steps
- **Test Case 3**: Complete form flow with edit functionality and submission

### Running Tests

```bash
# Run all tests
npm run test

# Run tests with interactive UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

### Test Setup
- **Vitest**: Fast unit testing framework
- **React Testing Library**: Component testing utilities
- **Jest DOM**: Custom matchers for DOM assertions
- **User Event**: Advanced user interaction simulation
- **jsdom**: DOM environment for testing

### Mock Implementations
- **localStorage**: Mocked for form data persistence testing
- **matchMedia**: Mocked for dark mode detection
- **alert**: Mocked for user notification testing

## 📱 Usage

### Multi-Step Form Wizard
1. Navigate to `/form` route
2. Complete each step in order:
   - **Personal Info**: Enter personal details
   - **Address**: Provide address information
   - **Preferences**: Set communication and display preferences
   - **Review**: Review all information and submit
3. Use the "Edit" buttons in the review step to modify any section
4. Form data is automatically saved to localStorage

### Multi-Select Search
1. Navigate to the home page (`/`)
2. Click on the search input
3. Type to filter options
4. Click to select items (they appear as pills)
5. Use the "×" button to remove individual items
6. Use "Clear all" to remove all selections
7. Click "🔍 Show Selected" to see all selected values

## 🔧 Configuration

### Form Steps
The form steps are defined in `types/form.ts`:

```typescript
export type FormStep = 'personal-info' | 'address' | 'preferences' | 'review'
```

### Validation Rules
Validation logic is implemented in `context/FormContext.tsx` in the `validateStep` function.

### Theme Options
Theme settings are in `context/ThemeContext.tsx`:
- `light`: Force light theme
- `dark`: Force dark theme  
- `auto`: Follow system preference

## 🎯 Key Features Explained

### Auto-save System
- **Debounced**: Saves 1 second after last change
- **Visual Indicator**: Shows "All changes saved" or "Saving..."
- **Persistence**: Data survives page refresh
- **Cleanup**: Clears localStorage on successful submission

### Step Navigation
- **Visual Progress**: Progress bar shows completion percentage
- **Step Indicators**: Clickable steps with icons
- **Validation**: Cannot proceed without valid data
- **Edit Access**: Jump back to any completed step

### Error Handling
- **Form Validation**: Field-level error messages
- **Error Boundary**: Catches component errors
- **Network Errors**: Handles submission failures gracefully

## 🌟 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Android Chrome)

## 📝 Development Notes

### State Management Pattern
The form uses a centralized state management approach with:
- **Single Source of Truth**: All form data in one context
- **Immutable Updates**: State updates through actions
- **Type Safety**: Full TypeScript coverage

### Performance Considerations
- **Memoization**: Form fields use React.memo
- **Debouncing**: Auto-save prevents excessive writes
- **Lazy Loading**: Components load as needed

### Accessibility Features
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard access
- **Focus Management**: Proper focus handling
- **Color Contrast**: WCAG compliant colors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite for the fast build tool
- TypeScript for type safety
- CSS community for inspiration