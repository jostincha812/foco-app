import MockFlashcardsAPI from './MockFlashcardsAPI'
import MockFlashcardSetsAPI from './MockFlashcardSetsAPI'
import MockUserFlashcardPrefsAPI from './MockUserFlashcardPrefsAPI'

const mockAPI = {
  flashcards: MockFlashcardsAPI,
  flashcardSets: MockFlashcardSetsAPI,
  userFlashcardPrefs: MockUserFlashcardPrefsAPI,
}

const fbAPI = {

}

export default mockAPI

// export default (key) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       return resolve(data[key])
//     }, Math.floor(Math.random() * 3000))
//   })
// }
