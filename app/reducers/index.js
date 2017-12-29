import { combineReducers } from 'redux'

import FlashcardReducer from './FlashcardReducer'
import UserCollectionsReducer from './UserCollectionsReducer'
import UserFlashcardPrefsReducer from './UserFlashcardPrefsReducer'
import UserProfileReducer from './UserProfileReducer'

const rootReducer = combineReducers({
  flashcards: FlashcardReducer,
  collections: UserCollectionsReducer,
  userFlashcardPrefs: UserFlashcardPrefsReducer,
  userProfile: UserProfileReducer
})

export default rootReducer;
