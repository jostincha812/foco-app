import FlashcardsAPI from './FlashcardsAPI'
import FlashcardSetsAPI from './FlashcardSetsAPI'

export default api = {
  flashcards: FlashcardsAPI,
  flashcardSets: FlashcardSetsAPI
}

// export default (key) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       return resolve(data[key])
//     }, Math.floor(Math.random() * 3000))
//   })
// }
