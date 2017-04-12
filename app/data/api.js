import MockUserActivities from './MockUserActivities';
import MockFlashcards from './MockFlashcards';
import MockFlashcardsTags from './MockFlashcardsTags';

const data = {
  userActivites: MockUserActivities,
  flashcards: MockFlashcards,
  flashcardsTags: MockFlashcardsTags,
}

export default (key) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(data[key])
    }, Math.floor(Math.random() * 3000))
  })
}
