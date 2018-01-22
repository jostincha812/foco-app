import MockFlashcardsAPI from './MockFlashcardsAPI'
import MockCollectionsAPI from './MockCollectionsAPI'
import MockUserPrefsAPI from './MockUserPrefsAPI'

import JsFbFlashcardsAPI from './JsFbFlashcardsAPI'
import JsFbCollectionsAPI from './JsFbCollectionsAPI'
import JsFbUserPrefsAPI from './JsFbUserPrefsAPI'
import JsFbUserProfileAPI from './JsFbUserProfileAPI'
import jsFirebaseFeedbackAPI from './jsFirebaseFeedbackAPI'

const mockAPI = {
  flashcards: MockFlashcardsAPI,
  collections: MockCollectionsAPI,
  userPrefs: MockUserPrefsAPI,
  userProfile: null,
  feedback: null,
}

const jsFirebaseAPI = {
  flashcards: JsFbFlashcardsAPI,
  collections: JsFbCollectionsAPI,
  userPrefs: JsFbUserPrefsAPI,
  userProfile: JsFbUserProfileAPI,
  feedback: jsFirebaseFeedbackAPI,
}

// export default mockAPI
// console.log('Using MOCK API')

export default jsFirebaseAPI
console.log('Using Javascript Firebase API')
