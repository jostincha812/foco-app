import MockFlashcardsAPI from './MockFlashcardsAPI'
import MockUserCollectionsAPI from './MockUserCollectionsAPI'
import MockUserPrefsAPI from './MockUserPrefsAPI'

import JsFbFlashcardsAPI from './JsFbFlashcardsAPI'
import JsFbUserCollectionsAPI from './JsFbUserCollectionsAPI'
import JsFbUserPrefsAPI from './JsFbUserPrefsAPI'
import JsFbUserProfileAPI from './JsFbUserProfileAPI'

const mockAPI = {
  flashcards: MockFlashcardsAPI,
  collections: MockUserCollectionsAPI,
  userPrefs: MockUserPrefsAPI,
  userProfile: null,
}

const jsFbAPI = {
  flashcards: JsFbFlashcardsAPI,
  collections: JsFbUserCollectionsAPI,
  userPrefs: JsFbUserPrefsAPI,
  userProfile: JsFbUserProfileAPI,
}

// export default mockAPI
// console.log('Using MOCK API')

export default jsFbAPI
console.log('Using Javascript Firebase API')
