import MockFlashcardsAPI from './MockFlashcardsAPI'
import MockCollectionsAPI from './MockCollectionsAPI'
import MockUserPrefsAPI from './MockUserPrefsAPI'

import JsFbFlashcardsAPI from './JsFbFlashcardsAPI'
import JsFbCollectionsAPI from './JsFbCollectionsAPI'
import JsFbUserPrefsAPI from './JsFbUserPrefsAPI'
import JsFbUserProfileAPI from './JsFbUserProfileAPI'

const mockAPI = {
  flashcards: MockFlashcardsAPI,
  collections: MockCollectionsAPI,
  userPrefs: MockUserPrefsAPI,
  userProfile: null,
}

const jsFbAPI = {
  flashcards: JsFbFlashcardsAPI,
  collections: JsFbCollectionsAPI,
  userPrefs: JsFbUserPrefsAPI,
  userProfile: JsFbUserProfileAPI,
}

// export default mockAPI
// console.log('Using MOCK API')

export default jsFbAPI
console.log('Using Javascript Firebase API')
