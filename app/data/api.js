import MockFlashcardsAPI from './MockFlashcardsAPI'
import MockFlashcardSetsAPI from './MockFlashcardSetsAPI'
import MockUserPrefsAPI from './MockUserPrefsAPI'

import JsFbFlashcardsAPI from './JsFbFlashcardsAPI'
import JsFbFlashcardSetsAPI from './MockFlashcardSetsAPI'
import JsFbUserPrefsAPI from './JsFbUserPrefsAPI'

const mockAPI = {
  flashcards: MockFlashcardsAPI,
  flashcardSets: MockFlashcardSetsAPI,
  userPrefs: MockUserPrefsAPI,
}

const jsFbAPI = {
  flashcards: JsFbFlashcardsAPI,
  flashcardSets: JsFbFlashcardSetsAPI,
  userPrefs: JsFbUserPrefsAPI,
}

// export default mockAPI
// console.log('Using MOCK API')

export default jsFbAPI
console.log('Using Javascript Firebase API')

// export default (key) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       return resolve(data[key])
//     }, Math.floor(Math.random() * 3000))
//   })
// }
