import MockFlashcardsAPI from './MockFlashcardsAPI'
import MockUserFlashcardSetsAPI from './MockUserFlashcardSetsAPI'
import MockUserPrefsAPI from './MockUserPrefsAPI'

import JsFbFlashcardsAPI from './JsFbFlashcardsAPI'
import JsFbUserFlashcardSetsAPI from './JsFbUserFlashcardSetsAPI'
import JsFbUserPrefsAPI from './JsFbUserPrefsAPI'

const mockAPI = {
  flashcards: MockFlashcardsAPI,
  flashcardSets: MockUserFlashcardSetsAPI,
  userPrefs: MockUserPrefsAPI,
}

const jsFbAPI = {
  flashcards: JsFbFlashcardsAPI,
  flashcardSets: JsFbUserFlashcardSetsAPI,
  userPrefs: JsFbUserPrefsAPI,
}

export default mockAPI
console.log('Using MOCK API')

// export default jsFbAPI
// console.log('Using Javascript Firebase API')
