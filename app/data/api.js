import MockFlashcardsAPI from './MockFlashcardsAPI'
import MockFlashcardSetsAPI from './MockFlashcardSetsAPI'
import MockUserPrefsAPI from './MockUserPrefsAPI'

const mockAPI = {
  flashcards: MockFlashcardsAPI,
  flashcardSets: MockFlashcardSetsAPI,
  userPrefs: MockUserPrefsAPI,
}

const firebaseAPI = {

}

export default mockAPI

// export default (key) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       return resolve(data[key])
//     }, Math.floor(Math.random() * 3000))
//   })
// }
