import MockFlashcardsAPI from './MockFlashcardsAPI'
import MockUserFlashcardSetsAPI from './MockUserFlashcardSetsAPI'
import MockUserPrefsAPI from './MockUserPrefsAPI'

import JsFbFlashcardsAPI from './JsFbFlashcardsAPI'
import JsFbUserFlashcardSetsAPI from './JsFbUserFlashcardSetsAPI'
import JsFbUserPrefsAPI from './JsFbUserPrefsAPI'
import JsFbUserProfileAPI from './JsFbUserProfileAPI'

const mockAPI = {
  flashcards: MockFlashcardsAPI,
  flashcardSets: MockUserFlashcardSetsAPI,
  userPrefs: MockUserPrefsAPI,
  userProfile: null,
}

const jsFbAPI = {
  flashcards: JsFbFlashcardsAPI,
  flashcardSets: JsFbUserFlashcardSetsAPI,
  userPrefs: JsFbUserPrefsAPI,
  userProfile: JsFbUserProfileAPI,
}

// export default mockAPI
// console.log('Using MOCK API')

export default jsFbAPI
console.log('Using Javascript Firebase API')
