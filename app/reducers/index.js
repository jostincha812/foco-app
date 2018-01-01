import { combineReducers } from 'redux'

import FlashcardsReducer from './flashcards'
import CollectionsReducer from './collections'
import UserPrefsReducer from './userPrefs'
import UserProfileReducer from './userProfile'

const rootReducer = combineReducers({
  flashcards: FlashcardsReducer,
  collections: CollectionsReducer,
  userPrefs: UserPrefsReducer,
  userProfile: UserProfileReducer
})

export default rootReducer;
