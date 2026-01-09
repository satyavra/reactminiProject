import React, { createContext, useContext, useState, useEffect } from 'react'
import { Language, LanguageContextType } from '../types/form'

// Translation dictionary
const translations = {
  en: {
    // Navigation and Header
    'app.title': 'User Onboarding',
    'app.subtitle': 'Complete your profile in a few simple steps',
    'nav.multiSelect': 'Multi-Select Demo',
    'nav.formWizard': 'Form Wizard',
    
    // Form Steps
    'step.personalInfo': 'Personal Info',
    'step.address': 'Address',
    'step.preferences': 'Preferences',
    'step.review': 'Review',
    
    // Personal Info Step
    'personalInfo.title': 'Personal Information',
    'personalInfo.subtitle': 'Please provide your personal details below.',
    'personalInfo.firstName': 'First Name',
    'personalInfo.lastName': 'Last Name',
    'personalInfo.email': 'Email Address',
    'personalInfo.phone': 'Phone Number',
    'personalInfo.dateOfBirth': 'Date of Birth',
    'personalInfo.firstName.required': 'First name is required',
    'personalInfo.lastName.required': 'Last name is required',
    'personalInfo.email.required': 'Email is required',
    'personalInfo.email.invalid': 'Invalid email format',
    'personalInfo.phone.required': 'Phone is required',
    'personalInfo.phone.invalid': 'Invalid phone format',
    'personalInfo.dateOfBirth.required': 'Date of birth is required',
    
    // Address Step
    'address.title': 'Address Information',
    'address.subtitle': 'Please provide your current address details.',
    'address.street': 'Street Address',
    'address.city': 'City',
    'address.state': 'State/Province',
    'address.zipCode': 'ZIP/Postal Code',
    'address.country': 'Country',
    'address.street.required': 'Street address is required',
    'address.city.required': 'City is required',
    'address.state.required': 'State is required',
    'address.zipCode.required': 'ZIP code is required',
    'address.zipCode.invalid': 'Invalid ZIP code format',
    'address.country.required': 'Country is required',
    
    // Preferences Step
    'preferences.title': 'Preferences',
    'preferences.subtitle': 'Customize your experience with these preferences.',
    'preferences.communication': 'Communication',
    'preferences.display': 'Display',
    'preferences.newsletter': 'Subscribe to newsletter',
    'preferences.notifications': 'Enable email notifications',
    'preferences.theme': 'Theme',
    'preferences.language': 'Language',
    'preferences.theme.light': 'Light',
    'preferences.theme.dark': 'Dark',
    'preferences.theme.auto': 'Auto (System)',
    'preferences.language.en': 'English',
    'preferences.language.es': 'Spanish',
    'preferences.language.fr': 'French',
    'preferences.language.de': 'German',
    'preferences.language.zh': 'Chinese',
    'preferences.language.ja': 'Japanese',
    
    // Review Step
    'review.title': 'Review & Submit',
    'review.subtitle': 'Please review your information before submitting the form. You can edit any section by clicking the edit button.',
    'review.edit': 'Edit',
    'review.personalInfo': 'Personal Information',
    'review.address': 'Address',
    'review.preferences': 'Preferences',
    'review.name': 'Name',
    'review.email': 'Email',
    'review.phone': 'Phone',
    'review.dateOfBirth': 'Date of Birth',
    'review.street': 'Street',
    'review.city': 'City',
    'review.state': 'State',
    'review.zipCode': 'ZIP Code',
    'review.country': 'Country',
    'review.newsletter': 'Newsletter',
    'review.notifications': 'Notifications',
    'review.theme': 'Theme',
    'review.language': 'Language',
    'review.newsletter.subscribed': 'Subscribed',
    'review.newsletter.notSubscribed': 'Not subscribed',
    'review.notifications.enabled': 'Enabled',
    'review.notifications.disabled': 'Disabled',
    'review.notice': 'Important: By submitting this form, you confirm that all information provided is accurate and complete.',
    'review.submit': 'Submit Form',
    'review.submitting': 'Submitting...',
    'review.success': 'Form submitted successfully!',
    'review.error': 'Error submitting form. Please try again.',
    
    // Navigation
    'nav.previous': '← Previous',
    'nav.next': 'Next →',
    'nav.reset': 'Reset Form',
    
    // Progress
    'progress.step': 'Step',
    'progress.of': 'of',
    'progress.complete': 'Complete',
    
    // Auto-save
    'autosave.saved': 'All changes saved',
    'autosave.saving': 'Saving...',
    'autosave.justNow': 'Just now',
    'autosave.minutesAgo': 'min ago',
    'autosave.hoursAgo': 'hours ago',
    
    // Form validation
    'validation.required': 'This field is required',
    'validation.email': 'Please enter a valid email address',
    'validation.phone': 'Please enter a valid phone number',
    'validation.zipCode': 'Please enter a valid ZIP code',
    
    // Multi-select
    'multiselect.placeholder': 'Search and select items...',
    'multiselect.noResults': 'No results found',
    'multiselect.allSelected': 'All options selected',
    'multiselect.showSelected': 'Show Selected',
    'multiselect.clearAll': 'Clear all',
    'multiselect.noSelection': 'No items selected yet!',
    'multiselect.selectedItems': 'Selected items',
    'multiselect.itemSelected': 'item',
    'multiselect.itemsSelected': 'items',
    'multiselect.selected': 'selected',
  },
  hi: {
    // Navigation and Header
    'app.title': 'उपयोगकर्ता ऑनबोर्डिंग',
    'app.subtitle': 'कुछ सरल चरणों में अपनी प्रोफ़ाइल पूरी करें',
    'nav.multiSelect': 'मल्टी-सेलेक्ट डेमो',
    'nav.formWizard': 'फॉर्म विज़ार्ड',
    
    // Form Steps
    'step.personalInfo': 'व्यक्तिगत जानकारी',
    'step.address': 'पता',
    'step.preferences': 'प्राथमिकताएं',
    'step.review': 'समीक्षा',
    
    // Personal Info Step
    'personalInfo.title': 'व्यक्तिगत जानकारी',
    'personalInfo.subtitle': 'कृपया नीचे अपनी व्यक्तिगत जानकारी प्रदान करें।',
    'personalInfo.firstName': 'पहला नाम',
    'personalInfo.lastName': 'अंतिम नाम',
    'personalInfo.email': 'ईमेल पता',
    'personalInfo.phone': 'फोन नंबर',
    'personalInfo.dateOfBirth': 'जन्म तिथि',
    'personalInfo.firstName.required': 'पहला नाम आवश्यक है',
    'personalInfo.lastName.required': 'अंतिम नाम आवश्यक है',
    'personalInfo.email.required': 'ईमेल आवश्यक है',
    'personalInfo.email.invalid': 'अमान्य ईमेल प्रारूप',
    'personalInfo.phone.required': 'फोन आवश्यक है',
    'personalInfo.phone.invalid': 'अमान्य फोन प्रारूप',
    'personalInfo.dateOfBirth.required': 'जन्म तिथि आवश्यक है',
    
    // Address Step
    'address.title': 'पता की जानकारी',
    'address.subtitle': 'कृपया अपना वर्तमान पता विवरण प्रदान करें।',
    'address.street': 'स्ट्रीट पता',
    'address.city': 'शहर',
    'address.state': 'राज्य/प्रांत',
    'address.zipCode': 'जिप/पोस्टल कोड',
    'address.country': 'देश',
    'address.street.required': 'स्ट्रीट पता आवश्यक है',
    'address.city.required': 'शहर आवश्यक है',
    'address.state.required': 'राज्य आवश्यक है',
    'address.zipCode.required': 'जिप कोड आवश्यक है',
    'address.zipCode.invalid': 'अमान्य जिप कोड प्रारूप',
    'address.country.required': 'देश आवश्यक है',
    
    // Preferences Step
    'preferences.title': 'प्राथमिकताएं',
    'preferences.subtitle': 'इन प्राथमिकताओं के साथ अपना अनुभव अनुकूलित करें।',
    'preferences.communication': 'संचार',
    'preferences.display': 'प्रदर्शन',
    'preferences.newsletter': 'न्यूज़लेटर की सदस्यता लें',
    'preferences.notifications': 'ईमेल सूचनाएं सक्षम करें',
    'preferences.theme': 'थीम',
    'preferences.language': 'भाषा',
    'preferences.theme.light': 'लाइट',
    'preferences.theme.dark': 'डार्क',
    'preferences.theme.auto': 'ऑटो (सिस्टम)',
    'preferences.language.en': 'अंग्रेज़ी',
    'preferences.language.es': 'स्पैनिश',
    'preferences.language.fr': 'फ्रेंच',
    'preferences.language.de': 'जर्मन',
    'preferences.language.zh': 'चीनी',
    'preferences.language.ja': 'जापानी',
    
    // Review Step
    'review.title': 'समीक्षा और जमा करें',
    'review.subtitle': 'फॉर्म जमा करने से पहले कृपया अपनी जानकारी की समीक्षा करें। आप किसी भी अनुभाग को संपादित करने के लिए संपादन बटन पर क्लिक कर सकते हैं।',
    'review.edit': 'संपादित करें',
    'review.personalInfo': 'व्यक्तिगत जानकारी',
    'review.address': 'पता',
    'review.preferences': 'प्राथमिकताएं',
    'review.name': 'नाम',
    'review.email': 'ईमेल',
    'review.phone': 'फोन',
    'review.dateOfBirth': 'जन्म तिथि',
    'review.street': 'स्ट्रीट',
    'review.city': 'शहर',
    'review.state': 'राज्य',
    'review.zipCode': 'जिप कोड',
    'review.country': 'देश',
    'review.newsletter': 'न्यूज़लेटर',
    'review.notifications': 'सूचनाएं',
    'review.theme': 'थीम',
    'review.language': 'भाषा',
    'review.newsletter.subscribed': 'सदस्यता ली गई',
    'review.newsletter.notSubscribed': 'सदस्यता नहीं ली गई',
    'review.notifications.enabled': 'सक्षम',
    'review.notifications.disabled': 'अक्षम',
    'review.notice': 'महत्वपूर्ण: इस फॉर्म को जमा करके, आप पुष्टि करते हैं कि प्रदान की गई सभी जानकारी सटीक और पूर्ण है।',
    'review.submit': 'फॉर्म जमा करें',
    'review.submitting': 'जमा हो रहा है...',
    'review.success': 'फॉर्म सफलतापूर्वक जमा हो गया!',
    'review.error': 'फॉर्म जमा करने में त्रुटि। कृपया फिर से कोशिश करें।',
    
    // Navigation
    'nav.previous': '← पिछला',
    'nav.next': 'अगला →',
    'nav.reset': 'फॉर्म रीसेट करें',
    
    // Progress
    'progress.step': 'चरण',
    'progress.of': 'का',
    'progress.complete': 'पूर्ण',
    
    // Auto-save
    'autosave.saved': 'सभी परिवर्तन सहेजे गए',
    'autosave.saving': 'सहेजा जा रहा है...',
    'autosave.justNow': 'अभी अभी',
    'autosave.minutesAgo': 'मिनट पहले',
    'autosave.hoursAgo': 'घंटे पहले',
    
    // Form validation
    'validation.required': 'यह फ़ील्ड आवश्यक है',
    'validation.email': 'कृपया एक वैध ईमेल पता दर्ज करें',
    'validation.phone': 'कृपया एक वैध फोन नंबर दर्ज करें',
    'validation.zipCode': 'कृपया एक वैध जिप कोड दर्ज करें',
    
    // Multi-select
    'multiselect.placeholder': 'खोजें और आइटम चुनें...',
    'multiselect.noResults': 'कोई परिणाम नहीं मिला',
    'multiselect.allSelected': 'सभी विकल्प चुने गए',
    'multiselect.showSelected': 'चुने गए दिखाएं',
    'multiselect.clearAll': 'सभी को हटाएं',
    'multiselect.noSelection': 'अभी तक कोई आइटम नहीं चुना गया!',
    'multiselect.selectedItems': 'चुने गए आइटम',
    'multiselect.itemSelected': 'आइटम',
    'multiselect.itemsSelected': 'आइटम',
    'multiselect.selected': 'चुना गया',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

interface LanguageProviderProps {
  children: React.ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language')
    return (saved as Language) || 'en'
  })

  useEffect(() => {
    localStorage.setItem('language', currentLanguage)
  }, [currentLanguage])

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language)
  }

  const t = (key: string): string => {
    return translations[currentLanguage][key] || key
  }

  const value: LanguageContextType = {
    currentLanguage,
    setLanguage,
    t
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
