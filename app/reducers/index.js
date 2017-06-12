import { combineReducers } from 'redux'

import FlashcardReducer from './FlashcardReducer'
import UserFlashcardSetsReducer from './UserFlashcardSetsReducer'
import UserFlashcardPrefsReducer from './UserFlashcardPrefsReducer'
import UserProfileReducer from './UserProfileReducer'

const rootReducer = combineReducers({
  flashcards: FlashcardReducer,
  flashcardSets: UserFlashcardSetsReducer,
  userFlashcardPrefs: UserFlashcardPrefsReducer,
  userProfile: UserProfileReducer
})

export default rootReducer;
