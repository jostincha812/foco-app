import { combineReducers } from 'redux'

import FlashcardReducer from './FlashcardReducer'
import UserFlashcardPrefsReducer from './UserFlashcardPrefsReducer'
import UserProfileReducer from './UserProfileReducer'

const rootReducer = combineReducers({
  flashcards: FlashcardReducer,
  userFlashcardPrefs: UserFlashcardPrefsReducer,
  userProfile: UserProfileReducer
})

export default rootReducer;
